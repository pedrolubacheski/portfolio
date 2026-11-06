import { Fragment } from "react";

/**
 * Quebra um texto em letras (ou palavras) mascaradas para animar a entrada.
 * A animação acontece via CSS quando um ancestral recebe "in-view"
 * (ou quando <html> recebe "is-loaded", no caso do Hero).
 *
 * Leitores de tela recebem o texto inteiro uma única vez.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  by = "char",
  className = "",
  delay = 0,
  stagger = 30,
}) {
  const words = text.split(" ");
  let index = 0;

  return (
    <Tag className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            <span className="split__word">
              {by === "char" ? (
                [...word].map((ch, ci) => {
                  const i = index++;
                  return (
                    <span className="split__mask" key={ci}>
                      <span
                        className="split__item"
                        style={{ "--d": `${delay + i * stagger}ms` }}
                      >
                        {ch}
                      </span>
                    </span>
                  );
                })
              ) : (
                <span className="split__mask">
                  <span
                    className="split__item"
                    style={{ "--d": `${delay + index++ * stagger}ms` }}
                  >
                    {word}
                  </span>
                </span>
              )}
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
