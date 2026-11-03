const skills = [
  "Suporte e TI",
  "Troubleshooting",
  "ERP",
  "IA aplicada",
  "React",
  "Tailwind CSS",
  "HTML & CSS",
  "JavaScript",
  "Git",
];

function Experience({ date, company, role, children }) {
  return (
    <article className="timeline-item">
      <div className="timeline-date">{date}</div>
      <div>
        <p className="timeline-company">{company}</p>
        <h3>{role}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <section id="sobre" className="section section-wrap">
      <div className="section-heading">
        <p className="eyebrow">Perfil profissional</p>
        <h2>Suporte com visão de <em>produto.</em></h2>
      </div>

      <div className="about-intro">
        <p>Atuo no ponto em que tecnologia e operação se encontram: escuto o contexto, investigo a causa e entrego uma resolução que faça sentido para quem depende do sistema.</p>
        <p>Minha trajetória reúne atendimento ao cliente, troubleshooting, suporte a ERP, manutenção de computadores e automações com IA local e prompt engineering para otimizar fluxos de trabalho.</p>
      </div>

      <div className="about-grid">
        <div className="experience-block">
          <div className="block-label">Experiência</div>
          <div className="timeline">
            <Experience date="Jul 2026 — atual" company="MX Soluções" role="Estagiário de Suporte">
              Atendimento por chat e telefone, diagnóstico de problemas de sistema e continuidade operacional. Desenvolvi o “Diário de Bordo” em React, centralizando ocorrências e gerando relatórios em PDF para a gestão.
            </Experience>
            <Experience date="Out 2025 — Abr 2026" company="Almmati Sistemas" role="Analista de Suporte">
              Suporte a usuários de software de gestão ERP, documentação de processos de negócio e tradução de questões técnicas em orientações acessíveis.
            </Experience>
          </div>
        </div>

        <aside className="capability-card">
          <div className="block-label">Competências</div>
          <div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          <div className="education">
            <p className="block-label">Formação</p>
            <h3>Bacharelado em Engenharia de Software</h3>
            <p>FAG · Fundação Assis Gurgacz, Cascavel, PR</p>
            <strong>2024 — 2027 <small>previsão de conclusão</small></strong>
            <hr />
            <p>Inglês avançado · Certificação em Analista de Requisitos (FAG, 2025)</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
