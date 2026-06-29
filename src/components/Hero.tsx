import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HallBackdrop } from "@/components/HallBackdrop";

const TRUST = [
  "Lead erfasst in unter 2 Sekunden",
  "DSGVO-konform per Double-Opt-in",
  "In Echtzeit beim Vertriebsteam",
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='eyebrow']", { opacity: 0, y: 16, duration: 0.6 })
        .from("[data-hero='title'] > span", { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 }, "-=0.3")
        .from("[data-hero='sub']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from("[data-hero='cta'] > *", { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from("[data-hero='trust'] li", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from("[data-hero='card']", { opacity: 0, y: 40, scale: 0.96, duration: 0.9 }, "-=0.9")
        .from("[data-hero='backdrop']", { opacity: 0, duration: 1.2 }, 0);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={scope}
      className="dark relative isolate flex min-h-screen items-center overflow-hidden bg-ink text-mist"
    >
      <HallBackdrop
        className="absolute inset-0 -z-10 h-full w-full opacity-90"
        data-hero="backdrop"
      />
      {/* Lesbarkeits-Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        {/* Text */}
        <div className="lg:col-span-7">
          <p data-hero="eyebrow" className="label-mono text-pulse">
            Messe-Lead-Infrastruktur
          </p>

          <h1
            data-hero="title"
            className="mt-6 text-balance font-display text-[clamp(2.6rem,6vw,4.75rem)] font-bold leading-[1.02] text-mist"
          >
            <span className="block">Aus Messekontakten</span>
            <span className="block">werden Abschlüsse —</span>
            <span className="block italic font-semibold text-pulse">bevor der Stand abgebaut ist.</span>
          </h1>

          <p
            data-hero="sub"
            className="mt-7 max-w-xl text-lg leading-relaxed text-sage text-pretty md:text-xl"
          >
            Leadsystems erfasst jeden Besucher per QR-Scan, qualifiziert ihn automatisch und
            startet sofort einen WhatsApp-Workflow. Ihr Vertrieb übernimmt warme, kontextreiche
            Leads in Echtzeit — statt am Montag einen kalten Stapel Visitenkarten.
          </p>

          <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-full px-7 text-base font-medium">
              <a href="#erstgespraech">Erstgespräch buchen</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="rounded-full px-6 text-base text-mist hover:bg-mist/10 hover:text-mist"
            >
              <a href="#story" className="group inline-flex items-center gap-2">
                So funktioniert's
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Button>
          </div>

          <ul data-hero="trust" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-mist/75">
                <Check className="size-4 shrink-0 text-pulse" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Live-Capture-Proof */}
        <div className="lg:col-span-5">
          <div
            data-hero="card"
            className="relative mx-auto max-w-sm rounded-2xl border border-mist/12 bg-ink-700/70 p-5 shadow-2xl shadow-black/40 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <span className="label-mono text-pulse">Lead erfasst</span>
              <span className="label-mono text-sage">14:02:11</span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-pulse/15 text-lg font-semibold text-pulse">
                MW
              </div>
              <div>
                <p className="text-lg font-semibold leading-tight text-mist">
                  Markus Wegner
                </p>
                <p className="text-sm text-sage">Einkaufsleiter · NordTech GmbH</p>
              </div>
              <span className="ml-auto rounded-full bg-pulse/15 px-3 py-1 text-sm font-medium text-pulse">
                Score 87
              </span>
            </div>

            <div className="mt-5 rounded-xl bg-ink/70 p-4">
              <span className="label-mono text-sage">WhatsApp · automatisch</span>
              <div className="mt-3 flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-pulse px-4 py-2.5 text-sm leading-snug text-[#04130e]">
                  Hallo Herr Wegner, danke für Ihren Besuch an Stand B12! Passt Dienstag 11:00 Uhr
                  für ein kurzes Gespräch?
                </p>
              </div>
              <p className="mt-2 text-right text-xs text-sage">Zugestellt · 14:02:13</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
