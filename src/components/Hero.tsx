import { profile } from '../content'

export function Hero() {
  return (
    <section id="top" className="hero">
      <h1>{profile.name}</h1>
      <p className="hero-tagline">{profile.tagline}</p>
      <p className="hero-summary">{profile.summary}</p>
      <div className="button-row">
        {profile.resumeUrl && (
          <a
            className="button button--primary"
            href={profile.resumeUrl}
            download={profile.resumeFileName}
          >
            Download resume
          </a>
        )}
        <a
          className={profile.resumeUrl ? 'button' : 'button button--primary'}
          href={profile.links.github}
        >
          GitHub
        </a>
        <a className="button" href={profile.links.linkedin}>
          LinkedIn
        </a>
      </div>
    </section>
  )
}
