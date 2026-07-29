import { useEffect, useState } from "react";

/**
 * Liefert `true`, wenn die scroll-gesteuerte Bildsequenz NICHT laufen soll.
 * Nur noch bei `prefers-reduced-motion: reduce` — Touch/Mobile bekommt jetzt
 * ebenfalls das Canvas-Scrubbing (kein Viewport-Gate mehr).
 *
 * SSR-/Prerender-sicher: startet konservativ mit `true` und korrigiert im Effekt.
 */
export function useReducedScroll(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduced(motionQuery.matches);
    update();

    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  return reduced;
}
