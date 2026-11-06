import { useEffect, useRef, useState } from "react";
import { hasFinePointer, prefersReducedMotion } from "../utils/motion";

/**
 * Cursor personalizado: um ponto preciso + um anel que segue com atraso.
 * - Em links/botões o anel cresce.
 * - Em elementos com data-cursor="Texto" o anel vira uma etiqueta.
 * - Em campos de texto ele some para o cursor de digitação aparecer.
 * Só é ativado em dispositivos com mouse e sem "reduzir movimento".
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (hasFinePointer() && !prefersReducedMotion()) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf;
    let shown = false;

    const setState = (state) => {
      ringRef.current.dataset.state = state;
      dotRef.current.dataset.state = state;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        root.classList.add("cursor-visible");
      }

      const target = e.target.closest?.(
        "[data-cursor], a, button, input, textarea, select, label",
      );
      if (!target) return setState("");
      if (target.matches("input, textarea, select")) return setState("text");
      if (target.dataset.cursor) {
        labelRef.current.textContent = target.dataset.cursor;
        return setState("label");
      }
      setState("link");
    };

    const onLeave = () => {
      shown = false;
      root.classList.remove("cursor-visible");
    };
    const onDown = () => root.classList.add("cursor-down");
    const onUp = () => root.classList.remove("cursor-down");

    const loop = () => {
      rx += (x - rx) * 0.17;
      ry += (y - ry) * 0.17;
      dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor", "cursor-visible", "cursor-down");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring__circle">
          <span ref={labelRef} className="cursor-ring__label" />
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
