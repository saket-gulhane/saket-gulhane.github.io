import { skills } from '../content'

export function Skills() {
  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <dl className="rows rows--spaced">
        {skills.map((s) => (
          <div key={s.area} className="row">
            <dt className="row-title row-title--narrow">{s.area}</dt>
            <dd className="row-text">{s.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
