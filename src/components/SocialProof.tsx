import { useEffect, useRef, useState } from "react";
import { useReveals } from "@/hooks/useReveals";

const STATS = [
  {
    value: "12.895",
    label: "Leads erfasst",
  },
  {
    value: "2.360",
    label: "Termine vereinbart",
  },
  {
    value: "317",
    label: "neue Aufträge entstanden",
  },
];

const OVERVIEW_ROWS = [
  { label: "Anfragen beantwortet", value: 92 },
  { label: "Follow-ups erledigt", value: 88 },
  { label: "Termine vorbereitet", value: 76 },
  { label: "Offene Rückmeldungen geklärt", value: 54 },
];

const REVIEWS = [
  {
    quote:
      "Früher haben wir nach jeder Messe Visitenkarten abgetippt. Heute steht der erste WhatsApp-Kontakt, bevor der Besucher den Hallengang verlassen hat.",
    name: "Anna Schuh",
    role: "Marketingleiterin",
    company: "Energy3000",
    initials: "AS",
  },
  {
    quote:
      "Wir sehen viel schneller, welche Gespräche wirklich weitergehen. Für unser Marketing ist das deutlich einfacher zu steuern als eine Excel-Liste nach der Messe.",
    name: "Marketingleitung",
    role: "Marketingleiter",
    company: "4Media",
    initials: "4M",
  },
];

export function SocialProof() {
  const scope = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const [barsActive, setBarsActive] = useState(false);

  useReveals(scope);

  useEffect(() => {
    const overview = overviewRef.current;
    if (!overview) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBarsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setBarsActive(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(overview);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="referenzen"
      ref={scope}
      className="dark bg-ink py-24 text-mist md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p data-reveal className="label-mono text-pulse">
              Vertrauen
            </p>
            <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
              Gebaut für Aussteller, die ihr Messebudget ernst nehmen.
            </h2>
            <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-sage text-pretty">
              Nach der Messe zählt nicht, wie viele Visitenkarten gesammelt wurden.
              Entscheidend ist, ob aus den Gesprächen klare nächste Schritte werden.
            </p>
          </div>
          <span
            data-reveal
            className="label-mono rounded-full border border-mist/15 px-3 py-1.5 text-sage"
          >
            Kundenbeispiel
          </span>
        </div>

        {/* Kennzahlen */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              data-reveal
              className="rounded-2xl border border-mist/10 bg-mist p-8 text-center text-ink"
            >
              <p className="font-sans text-5xl font-bold leading-none text-pulse md:text-6xl">
                {s.value}
              </p>
              <p className="mt-4 text-base font-medium text-ink-700">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Kundenüberblick */}
        <div
          ref={overviewRef}
          data-reveal
          className="mt-6 rounded-2xl border border-mist/12 bg-mist p-6 text-ink shadow-2xl shadow-black/20 md:p-8"
        >
          <div className="flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-ink">
                Kundenüberblick
              </h3>
              <p className="mt-1 text-sm text-slate">Alle Kunden · letzte 30 Tage</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pulse/10 px-3 py-1 text-sm font-semibold text-pulse-deep">
              <span className="size-2 rounded-full bg-pulse" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_220px] lg:items-center">
            <div className="space-y-6">
              {OVERVIEW_ROWS.map((row, index) => (
                <div key={row.label}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium">
                    <span className="text-ink-700">{row.label}</span>
                    <span className="font-semibold text-ink">{row.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-porcelain-200">
                    <div
                      className="h-full rounded-full bg-pulse transition-[width] duration-1000 ease-out"
                      style={{
                        width: barsActive ? `${row.value}%` : "0%",
                        transitionDelay: `${150 + index * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mx-auto grid size-44 place-items-center">
              <svg
                className="absolute inset-0 size-full -rotate-90"
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="var(--color-porcelain-200)"
                  strokeWidth="13"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="var(--color-pulse)"
                  strokeLinecap="round"
                  strokeWidth="13"
                  strokeDasharray="301.6"
                  className="transition-[stroke-dashoffset] duration-1000 ease-out"
                  style={{
                    strokeDashoffset: barsActive ? 33.2 : 301.6,
                    transitionDelay: "650ms",
                  }}
                />
              </svg>
              <div className="grid size-28 place-items-center rounded-full bg-mist text-center">
                <div>
                  <p className="text-4xl font-bold leading-none text-ink">89%</p>
                  <p className="mt-2 text-sm text-slate">bearbeitet</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <figure
              key={`${review.name}-${review.company}`}
              data-reveal
              className="rounded-2xl border border-mist/10 bg-ink-700/60 p-6"
            >
              <blockquote className="text-xl leading-snug text-mist text-pretty">
                "{review.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="flex size-10 items-center justify-center rounded-full bg-pulse/15 text-xs font-semibold text-pulse">
                  {review.initials}
                </span>
                <span>
                  <span className="font-medium text-mist">{review.name}</span>
                  <span className="block text-sage">
                    {review.role} · {review.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
