import { useRef } from "react";
import useReveal from "../hooks/useReveal";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

export default function Projects() {
  const headerRef = useRef(null);
  useReveal(headerRef);

  return (
    <section
      id="projetos"
      style={{
        padding: "8rem 2rem",
        position: "relative",
        zIndex: 1,
        background: "rgba(139,92,246,0.015)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p className="section-label">{"// projects.map(p => <Card />)"}</p>
          <h2 className="section-title neon-text">Meus Projetos</h2>
          <div className="section-divider" />
          <p
            style={{
              color: "#475569",
              fontSize: "1.05rem",
              marginTop: "1.2rem",
            }}
          >
            Cada projeto é uma oportunidade de aprender e evoluir.
          </p>
        </div>

        <div
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.8rem",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} {...project} delay={i * 100} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a
            href="https://github.com/pedrolubacheski"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
              padding: "12px 32px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <i className="fab fa-github" aria-hidden="true" />
            Ver todos no GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
