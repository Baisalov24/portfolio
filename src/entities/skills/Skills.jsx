import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.scss'

import {
  SiReact, SiTypescript, SiJavascript, SiRedux, SiHtml5, SiCss3,
  SiGit, SiDocker, SiMui, SiTailwindcss, SiAuth0
} from 'react-icons/si'

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
      { threshold: 0.15 }
    )
    cardsRef.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [skills])

  if (!skills.length) return null

  return (
    <section id="skills" className={styles.section}>
      <h2 className={styles.title}>Toolkit Arsenal</h2>
      <p className={styles.description}>Tools and libraries I use in production.</p>
     

      <ul className={styles.list}>
        {skills.map((s, i) => {
          const Icon = ICONS[s.icon] || ICONS.react
          return (
            <li
              key={s.id || i}
              className={`${styles.item} ${styles.reveal}`}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className={styles.iconWrap} aria-hidden>
                <Icon />
              </div>

              <h3 className={styles.name}>{s.title || 'Skill'}</h3>
              {s.desc && <p className={styles.itemDesc}>{s.desc}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
