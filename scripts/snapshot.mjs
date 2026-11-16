// Writes public/github-snapshot.json: the data the site falls back to when a
// visitor's browser can't reach the GitHub API (usually the hourly rate limit).
// The deploy workflow runs this before each build. If a request fails, the
// existing snapshot is kept, so a failure here never breaks a deploy.

import { writeFile } from 'node:fs/promises'

const USER = 'saket-gulhane'
const EXTRA_REPOS = ['Devs-Not-Wizards/Freehand.io']
const OUT = new URL('../public/github-snapshot.json', import.meta.url)

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': `${USER}-site-snapshot` }
// In GitHub Actions this is the run's own token. It is only used here, at build
// time, and is never shipped to the browser.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

async function getJson(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${url} answered ${res.status}`)
  return res.json()
}

const trim = (r) => ({
  name: r.name,
  full_name: r.full_name,
  html_url: r.html_url,
  description: r.description,
  language: r.language,
  stargazers_count: r.stargazers_count,
  forks_count: r.forks_count,
  fork: r.fork,
  pushed_at: r.pushed_at,
})

try {
  const api = 'https://api.github.com'
  const [user, repos, ...extra] = await Promise.all([
    getJson(`${api}/users/${USER}`, { headers }),
    getJson(`${api}/users/${USER}/repos?per_page=100&sort=pushed`, { headers }),
    ...EXTRA_REPOS.map((full) => getJson(`${api}/repos/${full}`, { headers })),
  ])

  let contributions = []
  let contributionsTotal = null
  try {
    const c = await getJson(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
    contributions = c.contributions.map(({ date, count, level }) => ({ date, count, level }))
    contributionsTotal = c.total?.lastYear ?? null
  } catch (err) {
    console.warn(`Contributions not refreshed: ${err.message}`)
  }

  const snapshot = {
    user: { public_repos: user.public_repos, followers: user.followers },
    repos: repos.map(trim),
    extra: extra.map(trim),
    contributions,
    contributionsTotal,
    source: 'snapshot',
  }
  await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`Snapshot written: ${repos.length} repos, ${contributions.length} days`)
} catch (err) {
  console.warn(`Snapshot not refreshed, keeping the existing file: ${err.message}`)
}
