/**
 * Erkennt die Frame-Sequenz in public/sequence/ automatisch und schreibt
 * src/lib/frames.generated.ts (Anzahl, Dateiendung, Nummern-Padding).
 * Läuft via npm-Hooks vor `dev` und `build` — FRAME_COUNT muss nie von Hand
 * gesetzt werden. Einfach Frames nach public/sequence/ legen, dev/build starten.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, "..", "public", "sequence");
const out = join(__dirname, "..", "src", "lib", "frames.generated.ts");

let files = [];
try {
  files = readdirSync(dir)
    .filter((f) => /^frame_\d+\.(webp|avif|png|jpe?g)$/i.test(f))
    .sort();
} catch {
  console.warn("public/sequence/ nicht gefunden — Standardwerte beibehalten.");
}

let count = files.length;
let ext = ".webp";
let pad = 4;
if (files[0]) {
  const m = files[0].match(/^frame_(\d+)\.([a-z0-9]+)$/i);
  if (m) {
    pad = m[1].length;
    ext = "." + m[2].toLowerCase();
  }
}
if (!count) {
  console.warn("Keine Frames gefunden — frames.generated.ts unverandert.");
  process.exit(0);
}

writeFileSync(
  out,
  `// AUTOGENERIERT von scripts/build-manifest.mjs — nicht von Hand andern.\n` +
    `export const FRAME_COUNT = ${count};\n` +
    `export const FRAME_EXT = "${ext}";\n` +
    `export const FRAME_PAD = ${pad};\n`,
);
console.log(`frames.generated.ts → FRAME_COUNT=${count}, EXT=${ext}, PAD=${pad}`);
