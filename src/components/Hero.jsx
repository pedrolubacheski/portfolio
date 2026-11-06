import { useEffect, useRef } from "react";
import DotField from "./DotField";
import RotatingWords from "./RotatingWords";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";
import { asset, hasFinePointer, prefersReducedMotion } from "../utils/motion";
import { whatsappLink } from "../utils/whatsapp";

const WORDS = [
  "IA aplicada ao suporte",
  "automação de processos",
  "modelos de IA locais",
];

const RING_TEXT = "disponível para oportunidades ✦ disponível para oportunidades ✦ ";

/**
 * Nome gigante cujas letras mudam de peso e largura conforme o cursor se aproxima
 * (a fonte Bricolage Grotesque é variável nos eixos wght e wdth).
 */
function useVariableName(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const letters = [...el.querySelectorAll(".split__item")];
    let raf = null;
    let mx = 0;
    let my = 0;

    const update = () => {
      raf = null;
      letters.forEach((l) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const f = Math.max(0, 1 - d / 260);
        const wght = Math.round(800 - f * 560);
        const wdth = Math.round(82 + f * 18);
        l.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}, "opsz" 96`;
      });
    };
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (raf === null) raf = requestAnimationFrame(update);
    };
    const onLeave = () => letters.forEach((l) => (l.style.fontVariationSettings = ""));

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}

export default function Hero() {
  const nameRef = useRef(null);
  useVariableName(nameRef);

  return (
    <section id="inicio" className="hero">
      <DotField />

      <div className="hero__inner container">
        <div className="hero__badge">
          <div className="badge">
            <svg className="badge__ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="ring-path" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
              </defs>
              <text>
                <textPath href="#ring-path">{RING_TEXT}</textPath>
              </text>
            </svg>
            <img
              className="badge__photo"
              src={asset("img/profile.png")}
              alt="Foto de Pedro Lubacheski"
              width="400"
              height="400"
            />
            <span className="badge__status" aria-hidden="true" />
          </div>
          <span className="sr-only">Disponível para oportunidades</span>
        </div>

        <h1 ref={nameRef} className="hero__name">
          <SplitText text="Pedro" className="hero__line" delay={0} stagger={45} />
          <SplitText text="Lubacheski" className="hero__line hero__line--2" delay={180} stagger={45} />
        </h1>

        <div className="hero__rule" aria-hidden="true" />

        <div className="hero__bottom">
          <p className="hero__intro">
            Uso IA para tudo. Agora estudo
            <br />
            <RotatingWords words={WORDS} />
          </p>

          <div className="hero__actions">
            <Button href="#projetos">Ver projetos</Button>
            <Button
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              <i className="fab fa-whatsapp" aria-hidden="true" /> Falar no WhatsApp
            </Button>
          </div>
        </div>

        <a href="#sobre" className="hero__scroll" aria-label="Rolar para a seção Sobre">
          <span className="hero__scroll-line" aria-hidden="true" />
          <span>Role para explorar</span>
        </a>
      </div>
    </section>
  );
}
