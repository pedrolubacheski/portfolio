import useTypewriter from "../hooks/useTypewriter";

const TYPED_WORDS = [
  "Engenheiro de Software",
  "Dev Frontend",
  "Amante de UI/UX",
];

const TECH_PILLS = [
  { icon: "fa-html5", label: "HTML5" },
  { icon: "fa-css3-alt", label: "CSS3" },
  { icon: "fa-js", label: "JavaScript" },
  { icon: "fa-react", label: "React" },
  { icon: "fa-git-alt", label: "Git" },
];

function Orb({ style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(40px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

export default function Hero() {
  const typed = useTypewriter(TYPED_WORDS);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "6rem 2rem 2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Orb
        style={{
          top: "18%",
          left: "8%",
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(139,92,246,.14) 0%, transparent 70%)",
        }}
      />
      <Orb
        style={{
          bottom: "15%",
          right: "8%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(236,72,153,.11) 0%, transparent 70%)",
        }}
      />
      <Orb
        style={{
          top: "55%",
          left: "45%",
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle, rgba(34,211,238,.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1200,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="hero-text">
          <p className="section-label" style={{ marginBottom: "1rem" }}>
            {"// hello_world.js 👾"}
          </p>

          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900,
              lineHeight: 1.08,
              fontSize: "clamp(2.6rem, 6.5vw, 5rem)",
              marginBottom: "1.1rem",
            }}
          >
            <span style={{ color: "#f8fafc" }}>Pedro</span>
            <br />
            <span className="neon-text">Lubacheski</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minHeight: "2.6rem",
              marginBottom: "1.6rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              {typed}
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 2,
                height: "1.5rem",
                background: "#8b5cf6",
                borderRadius: 1,
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>

          <p
            style={{
              color: "#475569",
              fontSize: "1.1rem",
              lineHeight: 1.85,
              maxWidth: 480,
              marginBottom: "2.6rem",
            }}
          >
            Desenvolvimento web com foco em{" "}
            <span style={{ color: "#a78bfa" }}>
              interfaces que impressionam
            </span>
            , código limpo e performance que se sente.
          </p>

          <div
            className="hero-actions"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            <button
              className="btn-glow"
              onClick={() => scrollTo("projetos")}
              style={{ padding: "14px 34px" }}
            >
              Ver Projetos ↓
            </button>
            <button
              className="btn-ghost"
              onClick={() => scrollTo("contato")}
              style={{ padding: "14px 34px" }}
            >
              Fale Comigo
            </button>
          </div>

          <div
            className="hero-pills"
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
          >
            {TECH_PILLS.map((t) => (
              <span key={t.label} className="tech-pill">
                <i className={`fab ${t.icon}`} aria-hidden="true" />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div
          className="hero-photo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
          }}
        >
          <div
            style={{
              width: 270,
              height: 270,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899, #22d3ee)",
              padding: 3,
              animation:
                "float 4.5s ease-in-out infinite, pulse-glow 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#0d0d1a",
              }}
            >
              <img
                src="./img/profile.png"
                alt="Foto de Pedro Lubacheski"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  const wrap = e.target.parentNode;
                  wrap.style.cssText += `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `;
                  const fallback = document.createElement("span");
                  fallback.style.cssText = `
                    font-family: 'Orbitron', monospace;
                    font-size: 4rem;
                    font-weight: 900;
                    background: linear-gradient(135deg, #a78bfa, #ec4899);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  `;
                  fallback.textContent = "PL";
                  wrap.appendChild(fallback);
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 20,
              padding: "8px 18px",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#10b981",
                animation: "status-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "#10b981",
              }}
            >
              Disponível para oportunidades
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
