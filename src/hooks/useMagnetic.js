import { useEffect } from "react";
import { hasFinePointer, prefersReducedMotion } from "../utils/motion";

/**
 * Faz o elemento "grudar" levemente no cursor quando ele passa por cima.
 * O filho marcado com [data-magnetic-inner] se move um pouco mais, criando profundidade.
 *
 * @param {React.RefObject<HTMLElement>} ref
 * @param {number} strength intensidade do efeito (0–1)
 */
export default function useMagnetic(ref, strength = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !strength || !hasFinePointer() || prefersReducedMotion()) return;

    const inner = el.querySelector("[data-magnetic-inner]");

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
      if (inner)
        inner.style.transform = `translate3d(${dx * strength * 0.45}px, ${dy * strength * 0.45}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = "";
      if (inner) inner.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength]);
}
