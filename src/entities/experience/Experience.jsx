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

  // Подтягиваем данные из JSON (как договорились)
  useEffect(() => {
    import('../../shared/data/experience.json').then((m) => {
      const arr = Array.isArray(m.default) ? m.default : []
      setItems(arr)
    })
  }, [])

  // Анимация появления карточек при скролле
  useEffect(() => {
    if (!refs.current?.length) return
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
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <section id="experience" className={styles.section}>
      <h2 className={styles.title}>My Experience</h2>

      <div className={styles.timeline}>
        {/* центральная вертикальная линия */}
        <div className={styles.line} />

        <ul className={styles.list}>
          {items.map((it, idx) => {
            const date = it.date || it.period || ''
            const title = it.title || it.position || 'Experience'
            const company = it.company || it.org || ''
            const description = it.description || it.desc || ''

            return (
              <li
                key={it.id || idx}
                className={`${styles.item} ${styles.reveal}`}
                ref={(el) => (refs.current[idx] = el)}
              >
                {/* точка на линии */}
                <span className={styles.dot} />

                {/* карточка справа от линии */}
                <article className={styles.card}>
                  <header className={styles.cardHeader}>
                    <div className={styles.iconWrap}>
                      <BriefcaseIcon />
                    </div>
                    <div className={styles.meta}>
                      {date && <div className={styles.date}>{date}</div>}
                      <h3 className={styles.cardTitle}>{title}</h3>
                      {company && <div className={styles.company}>{company}</div>}
                    </div>
                  </header>

                  {description && <p className={styles.desc}>{description}</p>}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
