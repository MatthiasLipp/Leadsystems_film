import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedScroll } from "@/hooks/useReducedScroll";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { FRAME_COUNT, REPRESENTATIVE_FRAME, frameSrc } from "@/lib/sequence";

gsap.registerPlugin(ScrollTrigger);

const STAGE_VH = 540;

const INK = "#06201e";

type Beat = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  steps?: string[];
  /** Sichtfenster im Scroll-Fortschritt der Bühne (0..1) */
  range: [number, number];
};

const BEATS: Beat[] = [
  {
    id: "problem",
    eyebrow: "Das Problem",
    title: "Die teuersten Leads des Jahres — auf Zetteln.",
    body: "Visitenkarten, Notizen, Gedächtnis. Das Follow-up kommt Tage später, ohne Kontext. Bis dahin ist das Interesse kalt — und der Messeauftritt bleibt eine Zahl ohne Rendite.",
    range: [0.07, 0.32],
  },
  {
    id: "scan",
    eyebrow: "Der Moment",
    title: "Ein Scan – und der Kontakt ist erfasst.",
    body: "Der Besucher scannt den QR-Code am Stand. Der Lead wird sofort digital erfasst, qualifiziert und Ihrem Team zugeordnet — DSGVO-konform per Double-Opt-in.",
    range: [0.4, 0.6],
  },
  {
    id: "loesung",
    eyebrow: "Die Lösung",
    title: "WhatsApp übernimmt die erste Meile.",
    body: "Der automatisierte Flow startet in Sekunden. Ihr Vertrieb übernimmt warme, kontextreiche Leads in Echtzeit — statt einen kalten Stapel am Montag.",
    steps: [
      "Sofortige Begrüßung & Bestätigung",
      "Konkreter Terminvorschlag",
      "Nurture-Sequenz bis zum Abschluss",
    ],
    range: [0.68, 0.94],
  },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function beatOpacity(progress: number, [start, end]: [number, number]): number {
  const local = (progress - start) / (end - start);
  if (local < 0 || local > 1) return 0;
  const fade = 0.2;
  if (local < fade) return local / fade;
  if (local > 1 - fade) return (1 - local) / fade;
  return 1;
}

export function ScrollStage() {
  const reduced = useReducedScroll();
  const { images, progress: loadProgress, ready } = useFrameSequence(!reduced);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const leftScrimRef = useRef<HTMLDivElement>(null);
  const leftBoostRef = useRef<HTMLDivElement>(null);
  const bottomScrimRef = useRef<HTMLDivElement>(null);

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setShowLoader(false), 350);
      return () => clearTimeout(t);
    }
  }, [ready]);

  useLayoutEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let current = 0;
    let target = 0;
    let raf = 0;

    const drawCover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1600;
      const ih = img.naturalHeight || 900;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const drawFrame = (frameFloat: number) => {
      const idx = clamp(Math.round(frameFloat), 0, FRAME_COUNT - 1);
      let img = images[idx];
      // Fällt der gewünschte Frame noch nicht fertig, nächsten geladenen nehmen
      if (!img || !img.complete || !img.naturalWidth) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          const a = images[idx - d];
          const b = images[idx + d];
          if (a && a.complete && a.naturalWidth) { img = a; break; }
          if (b && b.complete && b.naturalWidth) { img = b; break; }
        }
      }
      if (img && img.complete && img.naturalWidth) drawCover(img);
    };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(current * (FRAME_COUNT - 1));
    };

    const updateBeats = (p: number) => {
      const release = Math.pow(clamp(p, 0, 1), 0.72);
      if (leftScrimRef.current) leftScrimRef.current.style.opacity = String(1 - release * 0.84);
      if (leftBoostRef.current) leftBoostRef.current.style.opacity = String(1 - clamp(p / 0.72, 0, 1));
      if (bottomScrimRef.current) bottomScrimRef.current.style.opacity = String(0.9 - release * 0.74);

      for (let i = 0; i < BEATS.length; i++) {
        const el = beatRefs.current[i];
        if (!el) continue;
        const o = beatOpacity(p, BEATS[i].range);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - o) * 26}px, 0)`;
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
      if (cueRef.current) cueRef.current.style.opacity = String(clamp(1 - p * 12, 0, 1));
      if (railRef.current) railRef.current.style.transform = `scaleY(${p})`;
    };

    const tick = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.0002) current = target;
      drawFrame(current * (FRAME_COUNT - 1));
      raf = requestAnimationFrame(tick);
    };

    const ctxScope = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          target = self.progress;
          updateBeats(self.progress);
        },
      });
    }, stageRef);

    resize();
    updateBeats(0);
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctxScope.revert();
    };
  }, [reduced, images]);

  // Nach dem Laden neu vermessen (Bilder/Fonts können Layout verschieben)
  useEffect(() => {
    if (!reduced && ready) ScrollTrigger.refresh();
  }, [reduced, ready]);

  /* ── Fallback: Mobile / prefers-reduced-motion ────────────────────────── */
  if (reduced) {
    return (
      <section
        id="story"
        className="dark relative bg-ink text-mist"
        aria-label="So funktioniert Leadsystems"
      >
        <div className="relative">
          <img
            src={frameSrc(REPRESENTATIVE_FRAME - 1)}
            alt="Messebesucher scannt den QR-Code am Leadsystems-Stand und erfasst damit sofort einen qualifizierten Lead."
            className="h-[56vh] w-full object-cover"
            width={1600}
            height={900}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </div>
        <div className="mx-auto max-w-2xl space-y-16 px-6 py-20">
          {BEATS.map((b) => (
            <article key={b.id}>
              <p className="label-mono text-pulse">{b.eyebrow}</p>
              <h2 className="mt-3 text-3xl leading-tight text-mist">{b.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-sage text-pretty">{b.body}</p>
              {b.steps && (
                <ol className="mt-6 space-y-3">
                  {b.steps.map((s, i) => (
                    <li key={s} className="flex items-baseline gap-4">
                      <span className="label-mono text-pulse">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-mist">{s}</span>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── Scroll-Bühne: gepinntes Canvas + synchrone Beats ─────────────────── */
  return (
    <section
      id="story"
      ref={stageRef}
      className="dark relative bg-ink text-mist"
      style={{ height: `${STAGE_VH}vh` }}
      aria-label="So funktioniert Leadsystems – scrollgesteuerte Bildsequenz"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />

        {/* Scrollabhängige Lesbarkeits-Schatten: kräftig am Anfang, offen am Ende. */}
        <div
          ref={leftScrimRef}
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(2,14,13,0.98)_0%,rgba(6,32,30,0.94)_32%,rgba(6,32,30,0.56)_58%,rgba(6,32,30,0)_84%)]"
        />
        <div
          ref={leftBoostRef}
          className="pointer-events-none absolute inset-y-0 left-0 w-[76%] bg-[radial-gradient(80%_88%_at_0%_50%,rgba(0,0,0,0.74)_0%,rgba(2,14,13,0.54)_45%,rgba(2,14,13,0)_100%)]"
        />
        <div
          ref={bottomScrimRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 to-transparent"
        />

        {/* Fortschritts-Schiene (Signature-HUD) */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-mist/15 md:block">
          <span
            ref={railRef}
            className="absolute left-0 top-0 block h-full w-px origin-top bg-pulse"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        {/* Text-Beats — alle übereinander, gecrossfadet via Scroll */}
        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 md:pb-0">
            <div className="relative h-[clamp(18rem,42vh,24rem)] max-w-xl">
              {BEATS.map((b, i) => (
                <div
                  key={b.id}
                  ref={(el) => { beatRefs.current[i] = el; }}
                  className="absolute inset-x-0 top-0"
                  style={{ opacity: 0 }}
                >
                  <p className="label-mono text-pulse [text-shadow:0_1px_10px_rgba(2,14,13,0.7)]">{b.eyebrow}</p>
                  <h2 className="mt-3 font-sans text-4xl font-semibold leading-[1.08] tracking-normal text-mist md:text-5xl [text-shadow:0_2px_22px_rgba(2,14,13,0.76),0_1px_3px_rgba(2,14,13,0.65)]">{b.title}</h2>
                  <p className="mt-5 max-w-lg font-sans text-lg font-medium leading-relaxed text-mist/95 text-pretty md:text-xl [text-shadow:0_1px_14px_rgba(2,14,13,0.72)]">{b.body}</p>
                  {b.steps && (
                    <ol className="mt-7 space-y-3">
                      {b.steps.map((s, idx) => (
                        <li key={s} className="flex items-baseline gap-4 font-sans font-medium [text-shadow:0_1px_12px_rgba(2,14,13,0.74)]">
                          <span className="label-mono text-pulse">{String(idx + 1).padStart(2, "0")}</span>
                          <span className="text-mist">{s}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll-Hinweis */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
        >
          <span className="label-mono text-sage">Scrollen</span>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-pulse to-transparent" />
        </div>

        {/* Preloader-Overlay */}
        {showLoader && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink transition-opacity duration-300"
            style={{ opacity: ready ? 0 : 1 }}
            aria-hidden={ready}
          >
            <span className="pulse-dot" />
            <p className="label-mono mt-6 text-sage">Bildsequenz wird geladen</p>
            <div className="mt-4 h-px w-56 overflow-hidden bg-mist/15">
              <span
                className="block h-full bg-pulse transition-[width] duration-150"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="label-mono mt-3 text-mist/70">{Math.round(loadProgress * 100)}%</p>
          </div>
        )}
      </div>
    </section>
  );
}
