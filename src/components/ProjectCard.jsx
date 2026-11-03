import { useState } from "react";

export default function ProjectCard({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a className={`project-card project-card--${index + 1}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title} em uma nova aba`}>
      <div className="project-image">
        {imageFailed ? (
          <div className="project-media-fallback" aria-label={`Prévia indisponível de ${project.title}`}>
            <i className="fa-solid fa-image" aria-hidden="true" />
            <span>Prévia indisponível</span>
          </div>
        ) : (
          <img className="project-media" src={project.image} alt={`Prévia do projeto ${project.title}`} onError={() => setImageFailed(true)} />
        )}
        <span>{project.type}</span>
      </div>
      <div className="project-info">
        <div>
          <h3>{project.title}</h3>
          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </div>
        <p>{project.description}</p>
        <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </div>
    </a>
  );
}
