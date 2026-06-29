# Leadsystems — Film-Version

Identisch zu `leadsystems-lp`, aber gedacht für die **echte** scroll-gesteuerte
Bildsequenz (statt der generierten Platzhalter-Frames).

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production-Build
```

## Echte Frames einsetzen (das Apple-Scroll-Prinzip)

Die Scroll-Bühne zeichnet **kein Video**, sondern scrubbt durch nummerierte
Einzelbilder. Ablauf:

1. **Ein** durchgehendes Video in Higgsfield erzeugen (eine ruhige Kamerafahrt
   = Dolly/Push-in in den Stand hinein, keine Schnitte, kein Text im Bild).
2. Video in Frames zerlegen:

   ```bash
   # ersetzt die Platzhalter im Ordner public/sequence/
   rm public/sequence/*.webp
   ffmpeg -i film.mp4 -vf "fps=30,scale=1600:-1" -c:v libwebp -quality 80 \
     public/sequence/frame_%04d.webp
   ```

3. Anzahl prüfen und eintragen:

   ```bash
   ls public/sequence | wc -l        # ergibt z. B. 168
   ```

   In [`src/lib/sequence.ts`](src/lib/sequence.ts) `FRAME_COUNT` auf diese Zahl
   setzen und `REPRESENTATIVE_FRAME` auf einen aussagekräftigen Frame
   (z. B. der Moment des QR-Scans) für das Mobile-/Reduced-Motion-Standbild.

Mehr ist nicht nötig — Mechanik, Beats, Preloader und Fallback bleiben gleich.

## Worauf bei den Frames achten

- **Gewicht:** Ziel ~120–180 Frames, in Summe < ~10 MB. Sonst lädt die Sequenz
  auf dem Handy zäh. Notfalls `fps` senken oder `-quality` reduzieren.
- **Kein Text/Logo/QR im Video** — Headlines & Beats liegen als HTML-Overlay
  darüber und bleiben so scharf und editierbar.
- **Format 16:9**, möglichst hohe Auflösung; das Canvas füllt den Viewport
  (cover), schneidet also seitlich/oben etwas weg.

## Konfiguration

- Cal.com-Buchungslink: `.env` → `VITE_CAL_URL`
- Frame-Konstanten: `src/lib/sequence.ts`
- Platzhalter neu erzeugen (falls nötig): `node scripts/generate-frames.mjs`
