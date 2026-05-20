import { useEffect, useRef } from "react";

const ICONS = [
  "fa-html5",
  "fa-css3-alt",
  "fa-js",
  "fa-github",
  "fa-react",
  "fa-node-js",
  "fa-git-alt",
  "fa-npm",
  "fa-python",
];

export default function FloatingIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawn = () => {
      const div = document.createElement("div");
      const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
      const size = Math.random() * 13 + 11;
      const dur = Math.random() * 9 + 9;

      div.style.cssText = `
        position: fixed;
        top: -70px;
        left: ${Math.random() * (window.innerWidth - 40)}px;
        font-size: ${size}px;
        animation: fall ${dur}s linear forwards;
        pointer-events: none;
        z-index: 0;
      `;

      const i = document.createElement("i");
      i.className = `fab ${icon}`;
      i.style.cssText = `
        color: rgba(139, 92, 246, 0.32);
        text-shadow:
          0 0 8px  rgba(139, 92, 246, 0.6),
          0 0 18px rgba(236, 72, 153, 0.22);
      `;

      div.appendChild(i);
      container.appendChild(div);

      setTimeout(() => div.remove(), dur * 1000);
    };

    const intervalId = setInterval(spawn, 280);

    return () => {
      clearInterval(intervalId);
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
