export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2.5rem 2rem",
        borderTop: "1px solid rgba(139,92,246,0.1)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 80,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
          margin: "0 auto 1.5rem",
        }}
      />

      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontWeight: 900,
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      >
        <span style={{ color: "#8b5cf6" }}>{"<"}</span>
        <span className="neon-text">PL</span>
        <span style={{ color: "#8b5cf6" }}>{"/>"}</span>
      </div>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          color: "#1e293b",
        }}
      >
        {"// crafted with "}
        <span style={{ color: "#ec4899" }}>{"<3"}</span>
        {` by Pedro Lubacheski © ${year}`}
      </p>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        style={{
          marginTop: "1.5rem",
          background: "rgba(139,92,246,0.08)",
          border: "1px solid rgba(139,92,246,0.22)",
          borderRadius: "50%",
          width: 38,
          height: 38,
          cursor: "pointer",
          color: "#8b5cf6",
          fontSize: "0.9rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(139,92,246,0.2)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 0 16px rgba(139,92,246,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(139,92,246,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <i className="fas fa-chevron-up" aria-hidden="true" />
      </button>
    </footer>
  );
}
