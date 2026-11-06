import { useRef } from "react";
import useReveal from "../hooks/useReveal";
import ScrollText from "./ScrollText";
import SplitText from "./ui/SplitText";

const STATEMENT =
  "Hoje uso IA para tudo: programar, depurar, documentar, estudar e resolver os problemas do dia a dia no suporte. Foi assim que criei o Diário de Bordo, um sistema interno da MX Soluções. O front-end deixou de ser meu foco. Agora quero entender a IA a fundo, da engenharia de prompt aos modelos rodando na minha própria máquina, e aplicá-la em suporte e automação.";

const FACTS = [
  { term: "Foco", desc: "IA aplicada a suporte e automação" },
  { term: "Hoje", desc: "Estagiário de suporte na MX Soluções" },
  { term: "Antes", desc: "Analista de suporte ERP na Almmati Sistemas" },
  { term: "Formação", desc: "Engenharia de Software na FAG, 2024 a 2027" },
  { term: "Extras", desc: "Inglês avançado e certificação em Analista de Requisitos (FAG, 2025)" },
  { term: "Status", desc: "Disponível para oportunidades", live: true },
];

const STACK = [
  {
    title: "Uso IA para",
    items: [
      { label: "Programar" },
      { label: "Depurar código" },
      { label: "Documentar" },
      { label: "Estudar" },
      { label: "Engenharia de prompt" },
    ],
  },
  {
    title: "Estudando agora",
    items: [
      { label: "Modelos de IA locais" },
      { label: "Automação de processos" },
      { label: "Python", icon: "fa-python" },
    ],
  },
  {
    title: "Suporte e TI",
    items: [
      { label: "Troubleshooting" },
      { label: "Suporte a ERP" },
      { label: "Manutenção de computadores" },
      { label: "Documentação de processos" },
    ],
  },
  {
    title: "Web, com apoio de IA",
    items: [
      { label: "HTML", icon: "fa-html5" },
      { label: "CSS", icon: "fa-css3-alt" },
      { label: "JavaScript", icon: "fa-js" },
      { label: "React", icon: "fa-react" },
      { label: "Git", icon: "fa-git-alt" },
    ],
  },
];

export default function About() {
  const headRef = useRef(null);
  const factsRef = useRef(null);
  const stackRef = useRef(null);
  useReveal(headRef, 0.4);
  useReveal(factsRef, 0.2);
  useReveal(stackRef, 0.2);

  let chip = 0;

  return (
    <section id="sobre" className="section about">
      <div className="container">
        <div className="about__top">
          <div ref={headRef} className="section-head">
            <SplitText as="h2" text="Sobre" className="section-title" stagger={40} />
          </div>
          <ScrollText text={STATEMENT} className="about__statement" />
        </div>

        <div className="about__grid">
          <dl ref={factsRef} className="facts">
            {FACTS.map((f, i) => (
              <div key={f.term} className="facts__row" style={{ "--i": i }}>
                <dt>{f.term}</dt>
                <dd>
                  {f.live && <span className="live-dot" aria-hidden="true" />}
                  {f.desc}
                </dd>
              </div>
            ))}
          </dl>

          <div ref={stackRef} className="stack">
            {STACK.map((group) => (
              <div key={group.title} className="stack__group">
                <h3 className="stack__title">{group.title}</h3>
                <ul className="stack__list">
                  {group.items.map((item) => (
                    <li key={item.label} className="chip" style={{ "--i": chip++ }}>
                      {item.icon && <i className={`fab ${item.icon}`} aria-hidden="true" />}
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
