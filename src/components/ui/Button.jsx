import { useRef } from "react";
import useMagnetic from "../../hooks/useMagnetic";

/**
 * Botão magnético com preenchimento circular e texto que "rola" no hover.
 * Renderiza <a> quando recebe href, senão <button>.
 *
 * @param {"primary"|"ghost"|"light"} variant
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  magnetic = true,
  ...rest
}) {
  const ref = useRef(null);
  useMagnetic(ref, magnetic ? 0.28 : 0);

  const Tag = href ? "a" : "button";

  return (
    <Tag
      ref={ref}
      href={href}
      className={`btn btn--${variant} ${className}`}
      {...rest}
    >
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__inner" data-magnetic-inner>
        <span className="btn__roll">
          <span className="btn__label">{children}</span>
          <span className="btn__label btn__label--clone" aria-hidden="true">
            {children}
          </span>
        </span>
      </span>
    </Tag>
  );
}
