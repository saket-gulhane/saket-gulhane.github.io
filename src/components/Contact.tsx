import { profile } from '../content'

export function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <h2 className="contact-title">Write the next commit with me</h2>
      <p className="lede">LinkedIn is the quickest way to reach me.</p>
      <div className="button-row">
        <a className="button button--primary" href={profile.links.linkedin}>
          Message me on LinkedIn
        </a>
        <a className="button" href={profile.links.github}>
          GitHub
        </a>
        {profile.resumeUrl && (
          <a className="button" href={profile.resumeUrl}>
            Download resume
          </a>
        )}
      </div>
    </section>
  )
}
