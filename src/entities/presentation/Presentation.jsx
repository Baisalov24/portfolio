import styles from './Presentation.module.scss'

export function Presentation() {
  return (
    <section id='presentation' className={styles.presentation}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Frontend developer
        </h1>

        <p className={styles.text}>
          Hi, my name is Temirlan — a frontend developer focused on building production-ready, scalable web applications. I specialize in React with TypeScript and follow the Feature-Sliced Design (FSD) architecture to ensure clean, maintainable, and easily extensible code. I use Redux Toolkit & RTK Query for state and data management, and I containerize applications with Docker for consistent and reliable deployment. I prioritize performance optimization, DX/UX quality, and write code that is easy to support and scale. I actively collaborate with designers and backend engineers in Agile teams, delivering business-focused features efficiently and predictably.
        </p>

        <a
          href="https://github.com/Baisalov24"
          target="_blank"
          rel="noreferrer"
          className={styles.btn}
        >
          GitHub account
        </a>
      </div>
    </section>
  )
}
