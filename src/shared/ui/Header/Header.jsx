import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.link}>Home</NavLink>
        <NavLink to="/projects" className={styles.link}>Projects</NavLink>
        <NavLink to="/about" className={styles.link}>About</NavLink>
        <NavLink to="/contact" className={styles.link}>Contact</NavLink>
      </nav>
    </header>
  )
}
