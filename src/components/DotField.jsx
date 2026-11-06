import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils/motion";

const MUTED = [140, 146, 180];
const ACCENT = [124, 140, 255];
const SUN = [255, 203, 71];

const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/**
 * Malha de pontos em <canvas> que reage ao cursor:
 * - os pontos fogem do mouse e acendem em lavanda/amarelo;
 * - um clique (ou toque) solta uma onda que atravessa a malha;
 * - uma ondulação lenta mantém o fundo vivo.
 * Pausa sozinho quando sai da tela ou a aba fica oculta.
 */
export default function DotField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = prefersReducedMotion();

    let w = 0;
    let h = 0;
    let dots = [];
    let raf = null;
    let inView = true;
    const mouse = { x: -9999, y: -9999, active: false };
    const ripples = [];
    const RADIUS = 170;
    const RIPPLE_LIFE = 1800;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = w < 700 ? 28 : 34;
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      dots = [];
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          dots.push({ x: ox + c * gap, y: oy + r * gap, dx: 0, dy: 0, e: 0 });
      if (reduce) draw(0);
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);

      // brilho suave sob o cursor
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, RADIUS * 1.6);
        g.addColorStop(0, "rgba(124,140,255,0.10)");
        g.addColorStop(1, "rgba(124,140,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = ripples.length - 1; i >= 0; i--)
        if (now - ripples[i].t > RIPPLE_LIFE) ripples.splice(i, 1);

      for (const d of dots) {
        let tx = 0;
        let ty = 0;
        let energy = 0;

        if (mouse.active) {
          const ax = d.x - mouse.x;
          const ay = d.y - mouse.y;
          const dist = Math.hypot(ax, ay);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            const push = f * f * 28;
            tx += (ax / (dist || 1)) * push;
            ty += (ay / (dist || 1)) * push;
            energy = f;
          }
        }

        for (const rp of ripples) {
          const age = now - rp.t;
          const radius = age * 0.75;
          const rx = d.x - rp.x;
          const ry = d.y - rp.y;
          const rd = Math.hypot(rx, ry);
          const band = Math.abs(rd - radius);
          if (band < 60) {
            const k = (1 - band / 60) * (1 - age / RIPPLE_LIFE);
            tx += (rx / (rd || 1)) * k * 20;
            ty += (ry / (rd || 1)) * k * 20;
            energy = Math.max(energy, k);
          }
        }

        const wave = reduce ? 0 : Math.sin(now * 0.0011 + d.x * 0.011 + d.y * 0.007);
        ty += wave * 1.6;

        d.dx += (tx - d.dx) * 0.12;
        d.dy += (ty - d.dy) * 0.12;
        d.e += (energy - d.e) * 0.14;

        let rgb = MUTED;
        if (d.e > 0.02) {
          rgb = mix(MUTED, ACCENT, Math.min(d.e * 1.7, 1));
          if (d.e > 0.55) rgb = mix(rgb, SUN, (d.e - 0.55) / 0.45);
        }
        const alpha = 0.2 + (wave + 1) * 0.06 + d.e * 0.75;

        ctx.fillStyle = `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x + d.dx, d.y + d.dy, 1.1 + d.e * 1.9, 0, 6.2832);
        ctx.fill();
      }
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf !== null || !inView || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const toLocal = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom };
    };
    const onMove = (e) => {
      const p = toLocal(e);
      mouse.x = p.x;
      mouse.y = p.y;
      mouse.active = p.inside;
    };
    const onLeave = () => (mouse.active = false);
    const onDown = (e) => {
      if (e.target.closest("a, button, input, textarea")) return;
      const p = toLocal(e);
      if (p.inside) ripples.push({ x: p.x, y: p.y, t: performance.now() });
    };
    // onda de abertura quando o preloader termina
    const onLoaded = () => {
      setTimeout(() => ripples.push({ x: w * 0.3, y: h * 0.55, t: performance.now() }), 250);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      inView ? start() : stop();
    });
    io.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("app:loaded", onLoaded);

    build();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("app:loaded", onLoaded);
    };
  }, []);

  return <canvas ref={canvasRef} className="dotfield" aria-hidden="true" />;
}
