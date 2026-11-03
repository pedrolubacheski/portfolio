export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-wrap">
        <a className="brand" href="#inicio" aria-label="Voltar ao início">PL<span>_</span></a>
        <p>© {new Date().getFullYear()} Pedro Paulo Lubacheski</p>
        <span className="ai-badge"><i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> Arquitetado com apoio de IA</span>
      </div>
    </footer>
  );
}
