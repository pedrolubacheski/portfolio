import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "../utils/motion";

const ITEMS = [
  "IA aplicada",
  "Engenharia de prompt",
  "Modelos locais",
  "Automação",
  "Suporte de TI",
  "ERP",
  "Python",
  "React",
];

/**
 * Faixa de tecnologias que corre sem parar. A velocidade acompanha a rolagem,
 * o sentido inverte quando você rola para cima e o texto inclina com a força.
 */
export default function Marquee() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const track = trackRef.current;
    let x = 0;
    let raf;
    let lastY = window.scrollY;
    let velocity = 0;
    let dir = 1;
    let skew = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrapRef.current);

    const loop = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      velocity += (Math.abs(dy) - velocity) * 0.08;
      skew += (clamp(-dy * 0.35, -14, 14) - skew) * 0.1;

      if (visible) {
        const half = track.scrollWidth / 2;
        x -= (0.7 + velocity * 0.4) * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={wrapRef} className="marquee" aria-label="Temas com que trabalho">
      <p className="sr-only">{ITEMS.join(", ")}</p>
      <div ref={trackRef} className="marquee__track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="marquee__group" key={group}>
            {ITEMS.map((item, i) => (
              <span key={item} className="marquee__item">
                <span className={i % 2 ? "marquee__text marquee__text--outline" : "marquee__text"}>
                  {item}
                </span>
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
