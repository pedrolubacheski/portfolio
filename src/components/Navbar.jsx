import { useEffect, useLayoutEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

const GITHUB = "https://github.com/pedrolubacheski";

export default function Navbar() {
  const [active, setActive] = useState("inicio");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  /* Esconde ao rolar para baixo, mostra ao rolar para cima */
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = null;
    const update = () => {
      raf = null;
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Destaca a seção visível */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Move a pílula de destaque até o link ativo */
  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current;
      const ind = indicatorRef.current;
      if (!list || !ind) return;
      const link = list.querySelector(`[data-id="${active}"]`);
      if (!link) return;
      ind.style.width = `${link.offsetWidth}px`;
      ind.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  /* Menu mobile: trava a rolagem e fecha com Esc */
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const classes = [
    "nav",
    scrolled && "nav--scrolled",
    hidden && !menuOpen && "nav--hidden",
    menuOpen && "nav--open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="nav__bar">
        <a href="#inicio" className="nav__brand" aria-label="Pedro Lubacheski, voltar ao início">
          <span className="nav__mark">PL</span>
          <span className="nav__name">Pedro Lubacheski</span>
        </a>

        <nav className="nav__center" aria-label="Seções">
          <div ref={listRef} className="nav__track">
          <span ref={indicatorRef} className="nav__indicator" aria-hidden="true" />
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  data-id={link.id}
                  className={`nav__link ${active === link.id ? "is-active" : ""}`}
                  aria-current={active === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          </div>
        </nav>

        <div className="nav__end">
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="nav__github">
            <i className="fab fa-github" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="menu-mobile" className="nav__overlay" aria-hidden={!menuOpen}>
        <ul>
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} style={{ "--i": i }}>
              <a
                href={`#${link.id}`}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__overlay-foot" style={{ "--i": NAV_LINKS.length }}>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
            GitHub
          </a>
          <a href="https://linkedin.com/in/pedro-lubacheski-5b80912b7" target="_blank" rel="noopener noreferrer" tabIndex={menuOpen ? 0 : -1}>
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
