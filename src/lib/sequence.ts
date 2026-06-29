/* ──────────────────────────────────────────────────────────────────────────
 *  SCROLL-BILDSEQUENZ — Konfiguration
 *
 *  Anzahl, Dateiendung und Nummern-Padding werden AUTOMATISCH aus
 *  public/sequence/ erkannt (scripts/build-manifest.mjs, läuft vor dev/build).
 *  → Du musst nichts zählen: Frames mit deinem Tool erzeugen, als
 *    frame_0001.<ext> … nach public/sequence/ legen, dev/build starten.
 * ────────────────────────────────────────────────────────────────────────── */

import { FRAME_COUNT, FRAME_EXT, FRAME_PAD } from "./frames.generated";

export const FRAME_PATH = "/sequence/frame_";
export { FRAME_COUNT, FRAME_EXT, FRAME_PAD };

/** Repräsentatives Standbild (1-basiert) für Mobile / prefers-reduced-motion. */
export const REPRESENTATIVE_FRAME = Math.max(1, Math.round(FRAME_COUNT * 0.87));

/** Bildquelle für einen 0-basierten Frame-Index. */
export function frameSrc(index0: number): string {
  const n = Math.min(FRAME_COUNT, Math.max(1, index0 + 1));
  return `${FRAME_PATH}${String(n).padStart(FRAME_PAD, "0")}${FRAME_EXT}`;
}
