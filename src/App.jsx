import { Header } from './shared/ui/Header/Header.jsx'
import { Presentation } from './entities/presentation/Presentation.jsx'
import { Experience } from './entities/experience/Experience.jsx'
import { Skills } from './entities/skills/Skills.jsx'
import { ProjectList } from './entities/project/ProjectList.jsx'
import { Contacts } from './entities/contacts/Contacts.jsx'

export default function App() {
  return (
    <div>
      <Header />

      <main style={{ paddingTop: 'var(--header-h)' }}>
        <section id="presentation">
          <Presentation />
        </section>

        <Experience />
        <Skills />

        <section id="projects" style={{ paddingTop: 32 }}>
          <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 18 }}>Projects</h2>
          <ProjectList />
        </section>

        <Contacts />
      </main>
    </div>
  )
}
