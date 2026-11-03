import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projetos" className="section projects-section">
      <div className="section-wrap">
        <div className="projects-header">
          <div className="section-heading"><p className="eyebrow">Trabalho selecionado</p><h2>Projetos que<br /><em>viraram prática.</em></h2></div>
          <p>Explorações de frontend que mostram como estudo interfaces, organizo componentes e cuido da experiência de uso.</p>
        </div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
        <a className="github-line" href="https://github.com/pedrolubacheski" target="_blank" rel="noreferrer"><i className="fa-brands fa-github" aria-hidden="true" /> Acessar todos os repositórios <span>↗</span></a>
      </div>
    </section>
  );
}
