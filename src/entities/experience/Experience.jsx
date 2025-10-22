import { useEffect, useRef, useState } from 'react'
import styles from './Experience.module.scss'

function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function Experience() {
  const [items, setItems] = useState([])
  const refs = useRef([])

  useEffect(() => {
    import('../../shared/data/experience.json').then((m) => {
      setItems(Array.isArray(m.default) ? m.default : [])
    })
  }, [])

 
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <section id="experience" className={styles.section}>
      <h2 className={styles.title}>My Experience</h2>

      <div className={styles.timeline}>
        <div className={styles.line} />

        <ul className={styles.list}>
          {items.map((it, idx) => {
            const sideClass = idx % 2 === 0 ? styles.right : styles.left
            const revealSide = idx % 2 === 0 ? styles.revealRight : styles.revealLeft

            return (
              <li
                key={it.id ?? idx}
                className={`${styles.item} ${sideClass} ${styles.reveal} ${revealSide}`}
                ref={(el) => (refs.current[idx] = el)}
              >
                <span className={styles.dot} />

                <article className={styles.card}>
                  <header className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <BriefcaseIcon />
                    </div>
                    <div className={styles.meta}>
                      {(it.date || it.period) && (
                        <div className={styles.date}>{it.date || it.period}</div>
                      )}
                      <h3 className={styles.cardTitle}>{it.title || it.position || 'Experience'}</h3>
                      {(it.company || it.org) && (
                        <div className={styles.company}>{it.company || it.org}</div>
                      )}
                    </div>
                  </header>

                  {(it.description || it.desc) && (
                    <p className={styles.desc}>{it.description || it.desc}</p>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
