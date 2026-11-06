import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../utils/motion";

/** Troca de palavras com deslize vertical (substitui o antigo typewriter) */
export default function RotatingWords({ words, interval = 2600 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const prev = (index - 1 + words.length) % words.length;

  return (
    <>
    <span className="sr-only">{words.join(", ")}</span>
    <span className="rotating" aria-hidden="true">
      {words.map((word, i) => (
        <span
          key={word}
          className={`rotating__word ${i === index ? "is-active" : ""} ${i === prev ? "is-prev" : ""}`}
        >
          {word}
        </span>
      ))}
    </span>
    </>
  );
}
