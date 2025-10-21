import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.scss'

import { SiReact, SiTypescript, SiJavascript, SiRedux, SiHtml5, SiCss3, SiGit, SiDocker, SiMui, SiTailwindcss, SiAuth0 } from 'react-icons/si'

const ICONS = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  redux: SiRedux,
  html: SiHtml5,
  css: SiCss3,
  git: SiGit,
  docker: SiDocker,
  mui: SiMui,
  tailwind: SiTailwindcss,
  auth0: SiAuth0,
}

export function Skills() {
  const [skills, setSkills] = useState([])
  const cardsRef = useRef([])

  useEffect(() => {
    import('../../shared/data/skills.json').then((m) => {
      const arr = Array.isArray(m.default) ? m.default : []
      setSkills(arr)
    })
  }, [])


  useEffect(() => {
    if (!cardsRef.current?.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cardsRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [skills])

  if (!skills.length) return null

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.title}>Skills</h2>

      <ul className={styles.grid}>
        {skills.map((s, i) => {
          const Icon = ICONS[s.icon] || ICONS.react
          return (
            <li
              key={s.id || i}
              className={`${styles.card} ${styles.reveal}`}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className={styles.iconWrap} aria-hidden>
                <Icon />
              </div>
              <div className={styles.meta}>
                <div className={styles.name}>{s.title || 'Skill'}</div>
                {s.desc && <div className={styles.desc}>{s.desc}</div>}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
