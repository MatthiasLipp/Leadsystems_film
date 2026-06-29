import { useEffect, useState } from "react";

/**
 * Liefert `true`, wenn die scroll-gesteuerte Bildsequenz NICHT laufen soll:
 *  • Nutzer bevorzugt reduzierte Bewegung, ODER
 *  • kleiner Viewport (Touch/Mobile) — dort degradieren wir auf ein
 *    statisches Repräsentativ-Frame + normalen Scroll.
 *
 * SSR-/Prerender-sicher: startet konservativ mit `true` und korrigiert im Effekt.
 */
export function useReducedScroll(mobileBreakpoint = 768): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);

    const update = () => setReduced(motionQuery.matches || widthQuery.matches);
    update();

    motionQuery.addEventListener("change", update);
    widthQuery.addEventListener("change", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      widthQuery.removeEventListener("change", update);
    };
  }, [mobileBreakpoint]);

  return reduced;
}
