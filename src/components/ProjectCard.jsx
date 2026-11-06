import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";
import Arrow from "./ui/Arrow";
import { asset, hasFinePointer, prefersReducedMotion } from "../utils/motion";

const domainOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Alterna entre várias capturas de tela com transição suave, só enquanto visível */
function Gallery({ images, title }) {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (images.length < 2 || prefersReducedMotion()) return;
    let id = null;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(id);
      if (e.isIntersecting)
        id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3200);
    });
    io.observe(ref.current);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [images.length]);

  return (
    <div ref={ref} className="gallery">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={asset(img.src)}
          alt={`${title}: ${img.alt}`}
          loading="lazy"
          className={i === index ? "is-active" : ""}
        />
      ))}
      {images.length > 1 && (
        <span className="gallery__dots" aria-hidden="true">
          {images.map((img, i) => (
            <i key={img.src} className={i === index ? "is-active" : ""} />
          ))}
        </span>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const { title, kind, description, video, poster, image, images, url, label, note, tags, tint, accent } =
    project;
  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  useReveal(cardRef, 0.25);

  const isRepo = Boolean(url?.includes("github.com/"));
  const MediaWrap = url ? "a" : "div";

  /* Vídeo só toca enquanto está visível */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  /* Inclinação 3D da prévia seguindo o cursor */
  useEffect(() => {
    const el = mediaRef.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const frame = el.querySelector(".browser");
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`;
      frame.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      frame.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
    };
    const onLeave = () => (frame.style.transform = "");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="project"
      style={{ "--tint": tint, "--p-accent": accent }}
    >
      <div className="project__info">
        <p className="project__kind">
          <span className="project__dot" aria-hidden="true" />
          {kind}
        </p>
        <SplitText as="h3" text={title} by="word" stagger={70} className="project__title" />
        <p className="project__desc">{description}</p>
        <ul className="project__tags" aria-label="Tecnologias">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {url ? (
          <Button href={url} target="_blank" rel="noopener noreferrer" variant="light">
            {isRepo ? (
              <>
                <i className="fab fa-github" aria-hidden="true" /> Ver código
              </>
            ) : (
              "Abrir projeto"
            )}
            <Arrow size={16} />
          </Button>
        ) : (
          note && <p className="project__note">{note}</p>
        )}
      </div>

      <MediaWrap
        ref={mediaRef}
        {...(url
          ? {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-cursor": isRepo ? "Código" : "Abrir",
              "aria-label": `Abrir ${title} em nova aba`,
              tabIndex: -1,
            }
          : {})}
        className="project__media"
      >
        <div className="browser">
          <div className="browser__bar" aria-hidden="true">
            <span className="browser__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="browser__url">{label ?? domainOf(url)}</span>
          </div>
          <div className="browser__screen">
            {images ? (
              <Gallery images={images} title={title} />
            ) : video ? (
              <video
                ref={videoRef}
                src={asset(video)}
                poster={asset(poster)}
                muted
                loop
                playsInline
                preload="none"
                aria-label={`Prévia em vídeo do projeto ${title}`}
              />
            ) : (
              <img src={asset(image)} alt={`Prévia do projeto ${title}`} loading="lazy" />
            )}
          </div>
          <span className="browser__glare" aria-hidden="true" />
        </div>
      </MediaWrap>
    </article>
  );
}
