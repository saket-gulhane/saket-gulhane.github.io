import { profile } from '../content'
import type { ContributionDay } from '../lib/github'
import type { GitHubState } from '../lib/useGitHub'

function Calendar({ days, total }: { days: ContributionDay[]; total: number | null }) {
  // Pad the first week so every column starts on a Sunday.
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
  const count = total ?? days.reduce((sum, d) => sum + d.count, 0)
  const label = `${count.toLocaleString('en')} contributions in the last year`

  return (
    <figure className="calendar">
      <div className="calendar-scroll">
        <div className="calendar-grid" role="img" aria-label={label}>
          {Array.from({ length: offset }, (_, i) => (
            <span key={`pad-${i}`} className="day day--pad" />
          ))}
          {days.map((d) => (
            <span
              key={d.date}
              className={`day day--${Math.max(0, Math.min(4, d.level))}`}
              title={`${d.date}: ${d.count}`}
            />
          ))}
        </div>
      </div>
      <figcaption>
        <span>{label}</span>
        <span className="legend" aria-hidden="true">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`day day--${l}`} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  )
}

export function Activity({ github }: { github: GitHubState }) {
  const data = github.status === 'ready' ? github.data : null
  const stars = data
    ? [...data.repos.filter((r) => !r.fork), ...data.extra].reduce(
        (sum, r) => sum + r.stargazers_count,
        0,
      )
    : null

  const stats: { label: string; value: number | null }[] = [
    { label: 'Public repositories', value: data?.user.public_repos ?? null },
    { label: 'Stars on my projects', value: stars },
    { label: 'Followers', value: data?.user.followers ?? null },
  ]

  return (
    <section id="github" className="section">
      <h2>GitHub activity</h2>

      {github.status === 'error' ? (
        <p className="lede">
          GitHub didn't answer just now. The numbers are on{' '}
          <a className="accent-link" href={profile.links.github}>
            my GitHub profile
          </a>
          .
        </p>
      ) : (
        <>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value === null ? '–' : s.value.toLocaleString('en')}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
          {data && data.contributions.length > 0 && (
            <Calendar days={data.contributions} total={data.contributionsTotal} />
          )}
        </>
      )}
    </section>
  )
}
