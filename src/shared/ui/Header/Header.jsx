import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './Header.module.scss'

const SECTIONS = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'experience',   label: 'Experience' },
  { id: 'skills',       label: 'Skills' },
  { id: 'projects',     label: 'Projects' },
  { id: 'contacts',     label: 'Contacts' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('presentation')
  const ioRef = useRef(null)


  const handleNavClick = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

 
  useEffect(() => {
    const els = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return
    const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64

    ioRef.current = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) setActive(visible.target.id)
    }, {
      root: null,
      threshold: [0.25, 0.5, 0.75],
      rootMargin: `-${headerH + 4}px 0px -40% 0px`, 
    })

    els.forEach(el => ioRef.current.observe(el))
    return () => ioRef.current?.disconnect()
  }, [])

  
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = useMemo(() => SECTIONS.map(s => (
    <a
      key={s.id}
      href={`#${s.id}`}
      onClick={handleNavClick(s.id)}
      className={`${styles.link} ${active === s.id ? styles.active : ''}`}
    >
      {s.label}
    </a>
  )), [active])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand} onClick={handleNavClick('presentation')}>
          Portfolio
        </div>

        <nav className={styles.navDesktop}>
          {links}
        </nav>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

   
      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`}>
        <nav className={styles.navMobile}>
          {links}
        </nav>
      </div>
    </header>
  )
}
