import { useEffect, useState } from "react";
import styles from "./Projects.module.scss";
import { FaGlobe, FaGithub } from "react-icons/fa";

export function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    import("../../shared/data/projects.json").then((m) => {
      const arr = Array.isArray(m.default) ? m.default : [];
      setProjects(arr);
    });
  }, []);

  if (!projects.length) return null;

  const open = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.title}>Projects</h2>
      <ul className={styles.list}>
        {projects.map((p, i) => {
          const title = p.title || p.name || "Project";
          const desc = p.description || p.desc || "";
          const demo = p.demo || p.url || p.live || "";
          const github = p.github || p.repo || "";
          const imagePath = p.image
            ? new URL(`../../assets/images/${p.image}`, import.meta.url).href
            : null;

          return (
            <li
              key={p.id || title || i}
              className={styles.item}
              onClick={() => open(demo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" ? open(demo) : null)}
            >
              <div className={styles.images}>
                {imagePath ? (
                  <img src={imagePath} alt={title} loading="lazy" />
                ) : (
                  <div className={styles.placeholder}>{title}</div>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.projectTitle}>{title}</h3>
                {desc && <p className={styles.projectDesc}>{desc}</p>}

                <div
                  className={styles.actions}
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    className={`${styles.btn} ${styles.btnDemo}`}
                    href={demo || "#"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!demo) e.preventDefault();
                    }}
                  >
                    <FaGlobe aria-hidden />
                    <span>Live Demo</span>
                  </a>

                  <a
                    className={`${styles.btn} ${styles.btnGithub}`}
                    href={github || "#"}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => {
                      if (!github) e.preventDefault();
                    }}
                  >
                    <FaGithub aria-hidden />
                    <span>GitHub Repo</span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
