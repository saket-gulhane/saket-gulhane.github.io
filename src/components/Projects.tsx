import { featured, profile } from '../content'
import type { Repo } from '../lib/github'
import type { GitHubState } from '../lib/useGitHub'

function repoMeta(repo: Repo | undefined): string {
  if (!repo) return ''
  const parts: string[] = []
  if (repo.language) parts.push(repo.language)
  if (repo.stargazers_count > 0) {
    parts.push(`${repo.stargazers_count} ${repo.stargazers_count === 1 ? 'star' : 'stars'}`)
  }
  return parts.join(', ')
}

export function Projects({ github }: { github: GitHubState }) {
  const data = github.status === 'ready' ? github.data : null
  const byName = new Map<string, Repo>()
  for (const r of [...(data?.repos ?? []), ...(data?.extra ?? [])]) {
    byName.set(r.full_name.toLowerCase(), r)
  }

  const featuredNames = new Set(featured.map((f) => f.repo.toLowerCase()))
  const recent = (data?.repos ?? [])
    .filter((r) => !r.fork && !featuredNames.has(r.full_name.toLowerCase()))
    .filter((r) => !r.name.endsWith('.github.io') && r.name !== profile.githubUser)
    .slice(0, 6)

  const allReposUrl = `${profile.links.github}?tab=repositories`

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <h2>Projects</h2>
        <a className="accent-link" href={allReposUrl}>
          {data ? `All ${data.user.public_repos} repositories` : 'All repositories'}
        </a>
      </div>

      <div className="rows">
        {featured.map((f) => {
          const repo = byName.get(f.repo.toLowerCase())
          const text = f.blurb ?? repo?.description ?? ''
          return (
            <a
              key={f.repo}
              className="row row--link"
              href={repo?.html_url ?? `https://github.com/${f.repo}`}
            >
              <span className="row-title">{f.title}</span>
              <span className="row-text">{text}</span>
              <span className="row-meta">{repoMeta(repo)}</span>
            </a>
          )
        })}
      </div>

      {recent.length > 0 && (
        <>
          <h3 className="subhead">Recently updated</h3>
          <div className="card-grid card-grid--small">
            {recent.map((r) => (
              <a key={r.full_name} className="card card--link" href={r.html_url}>
                <span className="card-title">{r.name}</span>
                {r.description && <span className="card-text">{r.description}</span>}
                <span className="card-meta">{repoMeta(r)}</span>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
