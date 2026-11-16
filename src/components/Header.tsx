import { profile } from '../content'

export function Header() {
  return (
    <header className="header">
      <a className="brand" href="#top">
        {profile.githubUser}
      </a>
      <nav className="nav" aria-label="Main">
        <a href="#history">History</a>
        <a href="#achievements">Achievements</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        {profile.resumeUrl && (
          <a className="nav-accent" href={profile.resumeUrl}>
            Resume (PDF)
          </a>
        )}
      </nav>
    </header>
  )
}
