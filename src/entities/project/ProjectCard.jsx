import styles from './ProjectCard.module.scss'

export function ProjectCard({ project }) {
  const id = project.id || project._id || project.key || project.title
  const title = project.title || project.name || 'Untitled project'
  const description = project.description || project.desc || ''
  const demo = project.demo || project.url || project.live || '#'
  const github = project.github || project.repo || project.repository || ''

  const image = project.image || project.cover || project.preview || ''

  const onCardClick = (e) => {
    const isButton = e.target?.closest('a,button')
    if (isButton && isButton.dataset?.role === 'cta') return
    if (demo && demo !== '#') window.open(demo, '_blank', 'noopener,noreferrer')
  }

  return (
    <article className={styles.card} onClick={onCardClick} role="button" tabIndex={0}>
      {image ? (
        <div className={styles.coverWrap}>
          <img className={styles.cover} src={image} alt={title} />
        </div>
      ) : null}

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}

        <div className={styles.actions}>
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className={styles.btn}
              data-role="cta"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </a>
          ) : null}

          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className={styles.btnOutline}
              data-role="cta"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
