import { useEffect } from "react";

/**
 * @param {React.RefObject} ref
 * @param {number} threshold
 */
export default function useReveal(ref, threshold = 0.12) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
}
