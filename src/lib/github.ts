import { extraRepos, profile } from '../content'

// GitHub data is read live in the visitor's browser, with no token.
// Unauthenticated calls are limited to 60 an hour per IP, so results are cached
// for an hour, and a snapshot written at deploy time is the fallback.

export interface Repo {
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  pushed_at: string
}

export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface GitHubData {
  user: { public_repos: number; followers: number }
  repos: Repo[]
  extra: Repo[]
  contributions: ContributionDay[]
  contributionsTotal: number | null
  source: 'live' | 'snapshot'
}

const API = 'https://api.github.com'
const CONTRIBUTIONS_API = 'https://github-contributions-api.jogruber.de/v4'
const CACHE_KEY = 'github-data-v1'
const CACHE_TTL_MS = 60 * 60 * 1000

function trimRepo(r: Repo): Repo {
  return {
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    fork: r.fork,
    pushed_at: r.pushed_at,
  }
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${url} answered ${res.status}`)
  return (await res.json()) as T
}

function readCache(): GitHubData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { savedAt, data } = JSON.parse(raw) as { savedAt: number; data: GitHubData }
    return Date.now() - savedAt < CACHE_TTL_MS ? data : null
  } catch {
    return null
  }
}

function writeCache(data: GitHubData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Storage can be unavailable (private mode, quota). The site works without it.
  }
}

let snapshotPromise: Promise<GitHubData> | null = null
function loadSnapshot(): Promise<GitHubData> {
  snapshotPromise ??= getJson<GitHubData>(`${import.meta.env.BASE_URL}github-snapshot.json`).then(
    (s) => ({ ...s, source: 'snapshot' as const }),
  )
  return snapshotPromise
}

async function loadLiveRepos(): Promise<Pick<GitHubData, 'user' | 'repos' | 'extra'>> {
  const user = profile.githubUser
  const [u, repos, ...extra] = await Promise.all([
    getJson<{ public_repos: number; followers: number }>(`${API}/users/${user}`),
    getJson<Repo[]>(`${API}/users/${user}/repos?per_page=100&sort=pushed`),
    ...extraRepos.map((full) => getJson<Repo>(`${API}/repos/${full}`)),
  ])
  return {
    user: { public_repos: u.public_repos, followers: u.followers },
    repos: repos.map(trimRepo),
    extra: extra.map(trimRepo),
  }
}

async function loadLiveContributions(): Promise<
  Pick<GitHubData, 'contributions' | 'contributionsTotal'>
> {
  const data = await getJson<{
    total: Record<string, number>
    contributions: ContributionDay[]
  }>(`${CONTRIBUTIONS_API}/${profile.githubUser}?y=last`)
  return {
    contributions: data.contributions.map(({ date, count, level }) => ({ date, count, level })),
    contributionsTotal: data.total.lastYear ?? null,
  }
}

export async function loadGitHub(): Promise<GitHubData> {
  const cached = readCache()
  if (cached) return cached

  const [repoResult, contributionResult] = await Promise.allSettled([
    loadLiveRepos(),
    loadLiveContributions(),
  ])

  const bothLive =
    repoResult.status === 'fulfilled' && contributionResult.status === 'fulfilled'
  // Only fetch the snapshot when something live failed.
  const snapshot = bothLive ? null : await loadSnapshot().catch(() => null)

  const repoPart =
    repoResult.status === 'fulfilled'
      ? repoResult.value
      : snapshot && { user: snapshot.user, repos: snapshot.repos, extra: snapshot.extra }
  if (!repoPart) throw new Error('GitHub data is unavailable')

  const contributionPart =
    contributionResult.status === 'fulfilled'
      ? contributionResult.value
      : {
          contributions: snapshot?.contributions ?? [],
          contributionsTotal: snapshot?.contributionsTotal ?? null,
        }

  const data: GitHubData = {
    ...repoPart,
    ...contributionPart,
    source: repoResult.status === 'fulfilled' ? 'live' : 'snapshot',
  }
  if (bothLive) writeCache(data)
  return data
}
