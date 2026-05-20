import { useRef } from "react";
import useReveal from "../hooks/useReveal";

const SKILLS = [
  { name: "HTML / CSS", pct: 99, color: "#f97316" },
  { name: "JavaScript", pct: 70, color: "#eab308" },
  { name: "React", pct: 70, color: "#22d3ee" },
  { name: "Git & GitHub", pct: 85, color: "#8b5cf6" },
  { name: "UI/UX Design", pct: 85, color: "#ec4899" },
];

const STATS = [
  { val: "3+", desc: "Projetos publicados" },
  { val: "∞", desc: "Vontade de aprender" },
];

function SkillBar({ name, pct, color, index }) {
  const fillRef = useRef(null);

  const observerRef = useRef(null);
  const setup = (el) => {
    if (!el) return;
    fillRef.current = el;
    if (observerRef.current) observerRef.current.disconnect();

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.width = pct + "%";
          }, index * 120);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el.parentElement);
    observerRef.current = obs;
  };

  return (
    <div style={{ marginBottom: "1.6rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#e2e8f0",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.78rem",
            color,
          }}
        >
          {pct}%
        </span>
      </div>

      <div
        style={{
          height: 6,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          ref={setup}
          style={{
            height: "100%",
            width: "0%",
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            boxShadow: `0 0 10px ${color}55`,
            transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const skillsRef = useRef(null);

  useReveal(headerRef);
  useReveal(cardRef);
  useReveal(skillsRef);

  return (
    <section
      id="sobre"
      style={{ padding: "8rem 2rem", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          ref={headerRef}
          className="reveal"
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p className="section-label">{"// about_me.js"}</p>
          <h2 className="section-title neon-text">Sobre Mim</h2>
          <div className="section-divider" />
        </div>

        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3.5rem",
            alignItems: "start",
          }}
        >
          <div
            ref={cardRef}
            className="glass-card reveal"
            style={{ padding: "2.5rem" }}
          >
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#8b5cf6",
                fontSize: "0.8rem",
                marginBottom: "1.2rem",
              }}
            >
              {"const pedro = {"}
            </p>

            <div style={{ paddingLeft: "1.4rem" }}>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  marginBottom: "1.2rem",
                }}
              >
                Sempre tive interesse por tecnologia e por entender como as
                coisas funcionam. Tenho experiência profissional na área e estou
                direcionando minha carreira para{" "}
                <span style={{ color: "#a78bfa" }}>desenvolvimento web</span> e{" "}
                <span style={{ color: "#ec4899" }}>análise de dados</span>.
              </p>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                }}
              >
                Desenvolvendo projetos próprios para evoluir constantemente.
                Busco uma oportunidade para colocar em prática o que aprendo e
                crescer com uma{" "}
                <span style={{ color: "#22d3ee" }}>equipe de tecnologia</span>.
              </p>
            </div>

            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#8b5cf6",
                fontSize: "0.8rem",
                marginTop: "1.2rem",
              }}
            >
              {"};"}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.desc}
                  style={{
                    background: "rgba(139,92,246,0.07)",
                    border: "1px solid rgba(139,92,246,0.18)",
                    borderRadius: 12,
                    padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: "1.8rem",
                      fontWeight: 900,
                      color: "#a78bfa",
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "#64748b",
                      marginTop: 4,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsRef} className="reveal">
            <p className="section-label" style={{ marginBottom: "1.5rem" }}>
              {"// skills[]"}
            </p>

            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
