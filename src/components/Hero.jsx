const focusAreas = ["Suporte técnico", "IA aplicada", "Engenharia de software"];

export default function Hero() {
  return (
    <section id="inicio" className="hero section-wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot" /> Disponível para oportunidades em tecnologia</p>
        <h1>Pedro Paulo<br /><em>Lubacheski</em></h1>
        <p className="hero-title">Analista de Suporte Técnico e TI <span>·</span> IA Aplicada <span>·</span> Estudante de Engenharia de Software</p>
        <p className="hero-summary">Experiência em suporte ao cliente, troubleshooting e sistemas ERP, combinando raciocínio técnico e IA aplicada para tornar a operação mais clara, ágil e confiável.</p>

        <div className="hero-cta">
          <a className="button button--primary" href="#projetos">Ver projetos <span>↓</span></a>
          <a className="text-link" href="#contato">Contato <span>→</span></a>
        </div>

        <ul className="focus-list" aria-label="Áreas de atuação">
          {focusAreas.map((area) => <li key={area}>{area}</li>)}
        </ul>
      </div>
    </section>
  );
}
