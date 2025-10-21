import styles from './Presentation.module.scss'

export function Presentation() {
  return (
    <section className={styles.presentation}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          Frontend developer with 2+ years of experience
        </h1>

        <p className={styles.text}>
          Hi, my name is Temirlan, and I am a frontend developer with 2+ years of
          experience in modern web technologies. I specialize in building seamless,
          responsive, and high-performance web applications using React, JavaScript,
          TypeScript, Redux Toolkit, and RTK Query. I have a strong understanding of
          UI/UX principles and thrive in Agile environments, collaborating with backend
          developers, designers, and stakeholders to deliver high-quality solutions.
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
