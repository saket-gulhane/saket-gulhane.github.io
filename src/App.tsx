import { Achievements } from './components/Achievements'
import { Activity } from './components/Activity'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { History } from './components/History'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useGitHub } from './lib/useGitHub'

export default function App() {
  const github = useGitHub()

  return (
    <div className="page">
      <a className="skip-link" href="#history">
        Skip to history
      </a>
      <Header />
      <main>
        <Hero />
        <History />
        <Achievements />
        <Skills />
        <Projects github={github} />
        <Activity github={github} />
        <Contact />
      </main>
      <footer className="footer">
        <span>Built with Vite, React and TypeScript. Hosted on GitHub Pages.</span>
        <a href="https://github.com/saket-gulhane/saket-gulhane.github.io">Source code</a>
      </footer>
    </div>
  )
}
