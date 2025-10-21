import { useEffect, useState } from 'react'
import { ProjectCard } from './ProjectCard'

export function ProjectList() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // динамический импорт, чтобы vite сделал отдельный чанк (и можно будет менять JSON без ребилда)
    import('../../shared/data/projects.json').then((m) => {
      const arr = Array.isArray(m.default) ? m.default : []
      setProjects(arr)
    })
  }, [])

  if (!projects.length) {
    return (
      <div style={{ color: 'var(--muted)', textAlign: 'center', marginTop: 16 }}>
        No projects yet.
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {projects.map((p, idx) => (
        <ProjectCard key={p.id || p.title || idx} project={p} />
      ))}
    </div>
  )
}
