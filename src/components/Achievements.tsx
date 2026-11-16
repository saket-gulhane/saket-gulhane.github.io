import { achievements } from '../content'

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <h2>Achievements</h2>
      <p className="lede">The tagged releases.</p>
      <div className="card-grid">
        {achievements.map((a) => (
          <article key={a.tag} className="card">
            <span className="pill pill--mono">{a.tag}</span>
            <h3>{a.title}</h3>
            <p>{a.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
