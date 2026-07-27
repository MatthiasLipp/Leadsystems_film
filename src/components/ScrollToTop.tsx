import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Setzt die Scroll-Position bei echten Seitenwechseln zurück.
 *  In-Page-Anker (#abschnitt) bleiben unberührt. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
