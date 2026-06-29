import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Dezente Scroll-Reveals für alle Elemente mit [data-reveal] innerhalb des
 * Scopes. Respektiert prefers-reduced-motion (dann sofort sichtbar).
 */
export function useReveals(
  scopeRef: RefObject<HTMLElement | null>,
  opts: { y?: number; stagger?: number } = {},
) {
  const { y = 26, stagger = 0.08 } = opts;

  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const els = scope.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(els, { opacity: 0, y });
      ScrollTrigger.batch(els, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger,
            ease: "power3.out",
            overwrite: true,
          }),
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef, y, stagger]);
}
