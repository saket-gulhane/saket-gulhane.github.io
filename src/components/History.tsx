import { useState } from 'react'
import { commits } from '../content'
import type { Commit } from '../content'

function CommitDetails({ commit, headingLevel }: { commit: Commit; headingLevel: 'h3' | 'none' }) {
  return (
    <>
      {headingLevel === 'h3' && (
        <>
          <div className="details-meta">
            <span>commit {commit.hash}</span>
            {commit.date && <span>{commit.date}</span>}
          </div>
          <h3 className="details-title">{commit.message}</h3>
        </>
      )}
      {commit.client && (
        <p className="details-client">
          <span className="pill pill--solid">{commit.client}</span>
        </p>
      )}
      <p className="details-text">{commit.detail}</p>
      {commit.bullets && (
        <ul className="details-list">
          {commit.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {commit.stack && (
        <ul className="chips" aria-label="Stack">
          {commit.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export function History() {
  const [activeHash, setActiveHash] = useState(commits[0].hash)
  const active = commits.find((c) => c.hash === activeHash) ?? commits[0]

  return (
    <section id="history" className="section">
      <h2>History</h2>
      <p className="lede">
        Newest first. Point at a commit, tab to it or tap it to see the details. Milestones, like
        joining a company, are in amber. The white branch is competitive programming.
      </p>

      <div className="history">
        <ol className="commit-list">
          {commits.map((c) => {
            const isActive = c.hash === active.hash
            const classes = [
              'commit',
              `commit--${c.branch ?? 'main'}`,
              c.milestone ? 'commit--milestone' : '',
              isActive ? 'is-active' : '',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <li key={c.hash} className={classes}>
                <div className="rail" aria-hidden="true">
                  <span className="rail-main" />
                  <span className="rail-side" />
                  <span className="rail-link" />
                  <span className="rail-dot" />
                </div>
                <div className="commit-body">
                  <button
                    type="button"
                    className="commit-row"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveHash(c.hash)}
                    onFocus={() => setActiveHash(c.hash)}
                    onClick={() => setActiveHash(c.hash)}
                  >
                    <span className="commit-hash">{c.hash}</span>
                    <span className="commit-message">{c.message}</span>
                    {c.client && <span className="commit-client">{c.client}</span>}
                    {c.date && <span className="commit-date">{c.date}</span>}
                  </button>
                  {/* On narrow screens the details open under the selected commit. */}
                  {isActive && (
                    <div className="commit-inline">
                      <CommitDetails commit={c} headingLevel="none" />
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>

        {/* On wide screens the details sit in a panel beside the list. */}
        <aside className="commit-panel" aria-live="polite">
          <CommitDetails commit={active} headingLevel="h3" />
        </aside>
      </div>
    </section>
  )
}
