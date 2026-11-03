import { useEffect, useState } from "react";

const navigation = [
  ["Perfil", "#sobre"],
  ["Projetos", "#projetos"],
  ["Contato", "#contato"],
];

export default function Navbar({ theme, onThemeChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <header className={`topbar ${isScrolled ? "topbar--solid" : ""}`}>
      <nav className="nav-wrap" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="Ir ao início">
          PL<span>_</span>
        </a>

        <div className="nav-links">
          {navigation.map(([label, href], index) => (
            <a key={href} href={href}>
              <small>0{index + 1}</small>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-switch"
            type="button"
            onClick={onThemeChange}
            aria-label="Alternar tema visual"
          >
            <i className={`fa-solid ${theme === "professional" ? "fa-microchip" : "fa-briefcase"}`} aria-hidden="true" />
            <span>{theme === "professional" ? "Modo cyber" : "Modo pro"}</span>
          </button>
          <a className="nav-github" href="https://github.com/pedrolubacheski" target="_blank" rel="noreferrer">
            GitHub <span>↗</span>
          </a>
          <button className="menu-button" type="button" aria-expanded={isMenuOpen} aria-label="Abrir menu" onClick={() => setIsMenuOpen((open) => !open)}>
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
