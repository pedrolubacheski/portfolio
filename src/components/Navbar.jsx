import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1rem 2rem",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(8, 8, 16, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(139, 92, 246, 0.18)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#inicio"
          style={{
            textDecoration: "none",
            fontFamily: "'Orbitron', monospace",
            fontWeight: 900,
            fontSize: "1.15rem",
          }}
        >
          <span style={{ color: "#8b5cf6" }}>{"<"}</span>
          <span className="neon-text">PL</span>
          <span style={{ color: "#8b5cf6" }}>{"/>"}</span>
        </a>

        <div
          className="nav-desktop"
          style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}
        >
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={link.href} className="nav-link">
              <span style={{ color: "#8b5cf6", fontSize: "0.68rem" }}>
                0{i + 1}.
              </span>{" "}
              {link.label}
            </a>
          ))}

          <a
            href="https://github.com/pedrolubacheski"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{
              padding: "8px 20px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            GitHub ↗
          </a>
        </div>

        <button
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid rgba(139,92,246,0.35)",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
            color: "#a78bfa",
            fontSize: "1.1rem",
          }}
          className="nav-hamburger"
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`} />
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            background: "rgba(8,8,16,0.97)",
            borderTop: "1px solid rgba(139,92,246,0.15)",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.4rem",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={handleLinkClick}
              style={{ fontSize: "1rem" }}
            >
              <span style={{ color: "#8b5cf6", fontSize: "0.74rem" }}>
                0{i + 1}.
              </span>{" "}
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/pedrolubacheski"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            onClick={handleLinkClick}
            style={{
              padding: "10px 20px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            GitHub ↗
          </a>
        </div>
      )}
    </nav>
  );
}
