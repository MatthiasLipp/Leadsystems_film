/**
 * Platzhalter-Framesequenz für die Scroll-Bühne.
 * Erzeugt FRAME_COUNT nummerierte .webp-Dateien nach public/sequence/.
 *
 * Die Frames simulieren die echte Kamerafahrt, damit die Scrub-Mechanik sofort
 * realistisch testbar ist:  Messehalle mit mehreren Ständen  →  Push-in auf EINEN
 * Stand  →  QR-Code am Stand  →  Person scannt mit dem Handy  →  Lead erfasst +
 * WhatsApp-Flow startet.  Echte Frames später einfach hier hineinkopieren und
 * FRAME_COUNT in src/lib/sequence.ts anpassen.
 *
 *   node scripts/generate-frames.mjs
 */
import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "sequence");

const FRAME_COUNT = 120;
const W = 1600;
const H = 900;

// Markenfarben (gespiegelt aus src/index.css)
const INK = "#06201e";
const INK_DEEP = "#031412";
const INK_PANEL = "#0e332f";
const INK_LINE = "#1d534c";
const PULSE = "#25e39b";
const MIST = "#e6f0eb";
const SAGE = "#8aa39b";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smooth = (t) => t * t * (3 - 2 * t); // smoothstep
const lerp = (a, b, t) => a + (b - a) * t;
// Sichtfenster [a,b] eines Beats auf 0..1 normalisieren
const span = (p, a, b) => clamp((p - a) / (b - a), 0, 1);

// Stilisierter QR-Platzhalter (kein echter Code) als SVG-Gruppe
function qrGrid(x, y, size) {
  const n = 11;
  const c = size / n;
  let cells = "";
  // deterministisches Pseudomuster
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed % 1000) / 1000;
  };
  for (let r = 0; r < n; r++) {
    for (let col = 0; col < n; col++) {
      const finder =
        (r < 3 && col < 3) || (r < 3 && col > n - 4) || (r > n - 4 && col < 3);
      if (finder) continue;
      if (rnd() > 0.52) {
        cells += `<rect x="${(x + col * c).toFixed(1)}" y="${(y + r * c).toFixed(
          1
        )}" width="${(c * 0.86).toFixed(1)}" height="${(c * 0.86).toFixed(
          1
        )}" rx="${(c * 0.16).toFixed(1)}" fill="${INK}"/>`;
      }
    }
  }
  const finder = (fx, fy) => `
    <rect x="${fx}" y="${fy}" width="${c * 3}" height="${c * 3}" rx="${
    c * 0.4
  }" fill="${INK}"/>
    <rect x="${fx + c * 0.7}" y="${fy + c * 0.7}" width="${c * 1.6}" height="${
    c * 1.6
  }" rx="${c * 0.3}" fill="${MIST}"/>`;
  return `
    <g>
      <rect x="${x - c * 0.7}" y="${y - c * 0.7}" width="${size + c * 1.4}" height="${
    size + c * 1.4
  }" rx="${c}" fill="${MIST}"/>
      ${cells}
      ${finder(x, y)}
      ${finder(x + size - c * 3, y)}
      ${finder(x, y + size - c * 3)}
    </g>`;
}

function booth(cx, baseY, scale, label, withQR) {
  const w = 360 * scale;
  const h = 250 * scale;
  const x = cx - w / 2;
  const y = baseY - h;
  const qrS = 96 * scale;
  return `
    <g>
      <!-- Rückwand -->
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${
    6 * scale
  }" fill="${INK_PANEL}" stroke="${INK_LINE}" stroke-width="${1.5}"/>
      <!-- Header-Banner -->
      <rect x="${x}" y="${y}" width="${w}" height="${
    44 * scale
  }" rx="${6 * scale}" fill="${INK_DEEP}"/>
      <circle cx="${x + 26 * scale}" cy="${y + 22 * scale}" r="${
    7 * scale
  }" fill="${PULSE}"/>
      <text x="${x + 44 * scale}" y="${y + 28 * scale}" fill="${MIST}" font-family="sans-serif" font-weight="700" font-size="${
    19 * scale
  }" letter-spacing="0.5">${label}</text>
      <!-- Theke -->
      <rect x="${x + 30 * scale}" y="${baseY - 70 * scale}" width="${
    w - 60 * scale
  }" height="${64 * scale}" rx="${4 * scale}" fill="${INK_DEEP}" stroke="${INK_LINE}" stroke-width="1"/>
      ${
        withQR
          ? qrGrid(cx - qrS / 2, y + 78 * scale, qrS)
          : `<rect x="${cx - 44 * scale}" y="${y + 84 * scale}" width="${
              88 * scale
            }" height="${88 * scale}" rx="${
              8 * scale
            }" fill="${INK_LINE}" opacity="0.5"/>`
      }
    </g>`;
}

function buildSVG(i) {
  const p = i / (FRAME_COUNT - 1);

  // Kamera-Push-in: Skalierung wächst, Fokuspunkt (QR der Mittelbühne) bleibt zentriert
  const s = lerp(1, 3.15, smooth(p));
  const fx = 800; // Fokus x in Szene-Koordinaten
  const fy = 470; // Fokus y
  const cxv = 800; // Viewport-Mitte x
  const cyv = 430; // Viewport-Mitte y
  const tx = cxv - s * fx;
  const ty = cyv - s * fy;

  // Beats
  const phoneIn = span(p, 0.6, 0.74); // Handy fährt von unten herein
  const scanT = span(p, 0.7, 0.9); // Scan-Puls
  const leadIn = span(p, 0.86, 1); // Lead-Karte + WhatsApp

  // Perspektivisches Hallenraster
  let grid = "";
  const horizon = 360;
  for (let k = -8; k <= 8; k++) {
    const fxp = 800 + k * 38;
    grid += `<line x1="${800 + k * 12}" y1="${horizon}" x2="${fxp}" y2="${H}" stroke="${INK_LINE}" stroke-width="1" opacity="0.35"/>`;
  }
  for (let r = 1; r <= 7; r++) {
    const yy = horizon + Math.pow(r / 7, 2) * (H - horizon);
    grid += `<line x1="0" y1="${yy.toFixed(1)}" x2="${W}" y2="${yy.toFixed(
      1
    )}" stroke="${INK_LINE}" stroke-width="1" opacity="${(
      0.35 -
      r * 0.03
    ).toFixed(2)}"/>`;
  }

  const frameNo = String(i + 1).padStart(4, "0");
  const total = String(FRAME_COUNT).padStart(4, "0");

  // Foreground (kameragebunden, nicht skaliert)
  const phoneX = 980;
  const phoneY = lerp(H + 360, 470, smooth(phoneIn));
  const phone =
    phoneIn > 0
      ? `
    <g transform="translate(${phoneX}, ${phoneY}) rotate(-9)">
      <rect x="-95" y="-200" width="190" height="400" rx="34" fill="${INK_DEEP}" stroke="${INK_LINE}" stroke-width="3"/>
      <rect x="-78" y="-176" width="156" height="352" rx="20" fill="${INK}"/>
      <rect x="-58" y="-150" width="116" height="116" rx="10" fill="none" stroke="${PULSE}" stroke-width="3"/>
      <line x1="-58" y1="-92" x2="58" y2="-92" stroke="${PULSE}" stroke-width="2" opacity="${(
          0.4 +
          0.6 * Math.abs(Math.sin(p * 22))
        ).toFixed(2)}"/>
      <rect x="-58" y="-10" width="116" height="14" rx="7" fill="${INK_PANEL}"/>
      <rect x="-58" y="14" width="86" height="10" rx="5" fill="${INK_PANEL}"/>
    </g>`
      : "";

  // Scan-Pulsringe am Bildschirmzentrum (= QR)
  let scan = "";
  if (scanT > 0) {
    for (let r = 0; r < 3; r++) {
      const phase = (scanT + r * 0.33) % 1;
      scan += `<circle cx="${cxv}" cy="${cyv}" r="${(
        40 +
        phase * 220
      ).toFixed(0)}" fill="none" stroke="${PULSE}" stroke-width="${(
        3 *
        (1 - phase)
      ).toFixed(1)}" opacity="${(0.8 * (1 - phase)).toFixed(2)}"/>`;
    }
  }

  // Lead-Karte + WhatsApp-Bubble
  const leadX = lerp(W + 420, W - 470, smooth(leadIn));
  const lead =
    leadIn > 0
      ? `
    <g transform="translate(${leadX.toFixed(0)}, 150)" opacity="${leadIn.toFixed(
          2
        )}">
      <rect x="0" y="0" width="430" height="220" rx="18" fill="${INK_PANEL}" stroke="${PULSE}" stroke-width="1.5"/>
      <circle cx="34" cy="36" r="8" fill="${PULSE}"/>
      <text x="56" y="42" fill="${PULSE}" font-family="monospace" font-size="17" letter-spacing="3">LEAD ERFASST</text>
      <text x="30" y="96" fill="${MIST}" font-family="sans-serif" font-weight="700" font-size="30">M. Wegner · Einkauf</text>
      <text x="30" y="132" fill="${SAGE}" font-family="sans-serif" font-size="20">NordTech GmbH · Score 87</text>
      <rect x="30" y="156" width="370" height="44" rx="22" fill="${INK_DEEP}"/>
      <circle cx="54" cy="178" r="11" fill="${PULSE}"/>
      <text x="74" y="184" fill="${MIST}" font-family="sans-serif" font-size="17">WhatsApp-Flow gestartet …</text>
    </g>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="bg" cx="50%" cy="34%" r="80%">
        <stop offset="0%" stop-color="${INK}"/>
        <stop offset="100%" stop-color="${INK_DEEP}"/>
      </radialGradient>
      <radialGradient id="spot" cx="50%" cy="20%" r="55%">
        <stop offset="0%" stop-color="${PULSE}" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="${PULSE}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#spot)"/>
    ${grid}

    <g transform="translate(${tx.toFixed(2)}, ${ty.toFixed(2)}) scale(${s.toFixed(
    4
  )})">
      ${booth(300, 600, 1, "STAND A", false)}
      ${booth(1300, 600, 1, "STAND C", false)}
      ${booth(800, 600, 1.18, "LEADSYSTEMS", true)}
    </g>

    ${scan}
    ${phone}
    ${lead}

    <!-- Vignette -->
    <rect width="${W}" height="${H}" fill="url(#bg)" opacity="0"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="none"/>
    <radialGradient id="vig" cx="50%" cy="42%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#02100e" stop-opacity="0.6"/>
    </radialGradient>
    <rect width="${W}" height="${H}" fill="url(#vig)"/>

    <!-- HUD: Live-Tag -->
    <g transform="translate(54, 54)">
      <circle cx="6" cy="-4" r="6" fill="${PULSE}"/>
      <text x="22" y="2" fill="${MIST}" font-family="monospace" font-size="20" letter-spacing="4">LIVE · MESSE-LEAD-INFRASTRUKTUR</text>
    </g>

    <!-- HUD: Framenummer + Fortschritt -->
    <g transform="translate(54, ${H - 60})">
      <text x="0" y="0" fill="${SAGE}" font-family="monospace" font-size="24" letter-spacing="3">FRAME ${frameNo} / ${total}</text>
      <rect x="0" y="18" width="420" height="4" rx="2" fill="${INK_LINE}"/>
      <rect x="0" y="18" width="${(420 * p).toFixed(1)}" height="4" rx="2" fill="${PULSE}"/>
    </g>
  </svg>`;
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Erzeuge ${FRAME_COUNT} Platzhalter-Frames → ${OUT_DIR}`);
  for (let i = 0; i < FRAME_COUNT; i++) {
    const svg = buildSVG(i);
    const name = `frame_${String(i + 1).padStart(4, "0")}.webp`;
    await sharp(Buffer.from(svg))
      .resize(W, H)
      .webp({ quality: 82, effort: 4 })
      .toFile(join(OUT_DIR, name));
    if ((i + 1) % 20 === 0) console.log(`  … ${i + 1}/${FRAME_COUNT}`);
  }
  console.log("Fertig.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
