import { useEffect, useRef } from "react";
import { clamp, prefersReducedMotion } from "../utils/motion";

/**
 * Parágrafo cujas palavras acendem uma a uma conforme a rolagem.
 * Só uma variável CSS (--p) é atualizada por quadro; o CSS calcula
 * a opacidade de cada palavra a partir do índice dela.
 */
export default function ScrollText({ text, className = "" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--p", 1);
      return;
    }
    let raf = null;
    const update = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={`scroll-text ${className}`} style={{ "--n": words.length }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="scroll-text__word" style={{ "--i": i }}>
            {w}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}
