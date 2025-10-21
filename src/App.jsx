import { Presentation } from './entities/presentation/Presentation.jsx'
import { Experience } from './entities/experience/Experience.jsx'
import { Skills } from './entities/skills/Skills.jsx'
import { ProjectList } from './entities/project/ProjectList.jsx'

export default function App() {
  return (
    <div>
      <Presentation />
      <Experience />
      <Skills />

      <section id="projects" style={{ paddingTop: 32 }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 18 }}>Projects</h2>
        <ProjectList />
      </section>

    </div>
  )
}
