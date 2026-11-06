/** Utilidades compartilhadas pelas animações */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export const lerp = (a, b, t) => a + (b - a) * t;

/** Caminho para arquivos da pasta /public respeitando o "base" do Vite */
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, "")}`;
