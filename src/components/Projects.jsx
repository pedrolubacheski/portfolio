import { useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";
import ProjectCard from "./ProjectCard";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";
import projects from "../data/projects";
import { clamp, prefersReducedMotion } from "../utils/motion";

/**
 * Cartões empilhados: cada projeto gruda no topo e o anterior
 * encolhe e escurece enquanto o próximo passa por cima.
 */
function useStack(listRef) {
  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const items = [...list.querySelectorAll(".stack-item")];
    let raf = null;

    const update = () => {
      raf = null;
      const desktop = window.innerWidth > 900;
      items.forEach((item, i) => {
        const card = item.firstElementChild;
        const next = items[i + 1];
        if (!desktop || !next) {
          card.style.transform = "";
          card.style.setProperty("--dim", 0);
          return;
        }
        const stickTop = parseFloat(getComputedStyle(next).top) || 0;
        const start = window.innerHeight;
        const p = clamp((start - next.getBoundingClientRect().top) / (start - stickTop), 0, 1);
        card.style.transform = `scale(${1 - p * 0.06})`;
        card.style.setProperty("--dim", (p * 0.6).toFixed(3));
      });
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [listRef]);
}

export default function Projects() {
  const headRef = useRef(null);
  const listRef = useRef(null);
  useReveal(headRef, 0.4);
  useStack(listRef);

  return (
    <section id="projetos" className="section projects">
      <div className="container">
        <div ref={headRef} className="section-head section-head--split">
          <h2 className="section-title">
            <SplitText text="Projetos" stagger={40} />
            <sup className="section-count">({String(projects.length).padStart(2, "0")})</sup>
          </h2>
          <p className="section-lead">
            Do sistema que uso no trabalho aos estudos de interface. Os mais recentes foram
            feitos com apoio de IA, que hoje faz parte de tudo o que desenvolvo.
          </p>
        </div>

        <ol ref={listRef} className="stack-list">
          {projects.map((project, i) => (
            <li key={project.id} className="stack-item" style={{ "--i": i }}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ol>

        <div className="projects__more">
          <Button
            href="https://github.com/pedrolubacheski"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            <i className="fab fa-github" aria-hidden="true" /> Ver todos no GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
