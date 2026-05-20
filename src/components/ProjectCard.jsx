import { useRef } from "react";
import useReveal from "../hooks/useReveal";

/**
 * @param {object}   props
 * @param {string}   props.title
 * @param {string}   props.description
 * @param {string}   props.image
 * @param {string}   props.url
 * @param {string[]} props.tags
 * @param {string}   props.gradient
 * @param {number}   [props.delay=0]
 */
export default function ProjectCard({
  title,
  description,
  image,
  url,
  tags,
  gradient,
  delay = 0,
}) {
  const cardRef = useRef(null);
  const imgWrapRef = useRef(null);

  useReveal(cardRef);

  const handleImgError = (e) => {
    e.target.style.display = "none";
    const wrap = imgWrapRef.current;
    if (!wrap) return;
    wrap.style.background = gradient;
    wrap.style.display = "flex";
    wrap.style.alignItems = "center";
    wrap.style.justifyContent = "center";

    if (!wrap.querySelector(".img-fallback-label")) {
      const label = document.createElement("span");
      label.className = "img-fallback-label";
      label.style.cssText = `
        font-family: 'Orbitron', monospace;
        font-size: .82rem;
        font-weight: 700;
        color: rgba(255,255,255,.4);
        letter-spacing: .1em;
        text-transform: uppercase;
      `;
      label.textContent = title.slice(0, 20);
      wrap.appendChild(label);
    }
  };

  return (
    <article
      ref={cardRef}
      className="project-card reveal"
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      role="link"
      tabIndex={0}
      aria-label={`Abrir projeto ${title}`}
      onKeyDown={(e) =>
        e.key === "Enter" && window.open(url, "_blank", "noopener,noreferrer")
      }
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={imgWrapRef}
        style={{ height: 210, overflow: "hidden", position: "relative" }}
      >
        <img
          src={image}
          alt={`Preview do projeto ${title}`}
          className="p-img"
          onError={handleImgError}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,8,16,.9) 0%, transparent 55%)",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(8,8,16,.6)",
            backdropFilter: "blur(8px)",
            borderRadius: 8,
            padding: "5px 12px",
            border: "1px solid rgba(139,92,246,.35)",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#a78bfa",
            }}
          >
            abrir ↗
          </span>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#f8fafc",
            marginBottom: "0.6rem",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "#475569",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            marginBottom: "1.1rem",
          }}
        >
          {description}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.22)",
                borderRadius: 5,
                padding: "2px 9px",
                fontSize: "0.7rem",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#8b5cf6",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
