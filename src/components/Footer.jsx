import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";
import SplitText from "./ui/SplitText";

const timeFormat = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

/** Horário local do Pedro, atualizado a cada 30s */
function useLocalTime() {
  const [time, setTime] = useState(() => timeFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(timeFormat.format(new Date())), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const wordRef = useRef(null);
  useReveal(wordRef, 0.3);
  const time = useLocalTime();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__meta">
          <span>© {year} Pedro Lubacheski</span>
          <span>Paraná, Brasil, {time}</span>
          <button
            type="button"
            className="footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Voltar ao topo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div ref={wordRef} className="footer__word" aria-hidden="true">
        <SplitText text="Lubacheski" stagger={40} />
      </div>
    </footer>
  );
}
