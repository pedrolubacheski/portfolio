import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../utils/motion";

const MIN_DURATION = 1400;
const MAX_WAIT = 3500;

/**
 * Contador 0 → 100 enquanto as fontes carregam, depois a cortina sobe
 * e o <html> recebe "is-loaded", que dispara a entrada do Hero.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | leaving | done

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.classList.remove("is-loading");
      root.classList.add("is-loaded");
      window.dispatchEvent(new CustomEvent("app:loaded"));
    };

    if (prefersReducedMotion()) {
      finish();
      setPhase("done");
      return;
    }

    root.classList.add("is-loading");

    let fontsReady = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => (fontsReady = true));

    const timers = [];
    let raf;
    const t0 = performance.now();

    const tick = (now) => {
      const elapsed = now - t0;
      const p = Math.min(elapsed / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      // Segura em 99 até as fontes chegarem (com limite de espera)
      const ready = fontsReady || elapsed > MAX_WAIT;
      setCount(p < 1 || ready ? Math.round(eased * 100) : 99);

      if (p < 1 || !ready) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setPhase("leaving");
      timers.push(setTimeout(finish, 450));
      timers.push(setTimeout(() => setPhase("done"), 1400));
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "leaving" ? "is-leaving" : ""}`}
      aria-hidden="true"
    >
      <div className="preloader__panel">
        <div className="preloader__row">
          <span className="preloader__name">Pedro Lubacheski</span>
          <span className="preloader__role">Portfólio</span>
        </div>
        <span className="preloader__count">
          {String(count).padStart(2, "0")}
        </span>
        <div className="preloader__bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
