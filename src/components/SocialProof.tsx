import { useRef } from "react";
import { useReveals } from "@/hooks/useReveals";

const STATS = [
  {
    value: "0 Zettel",
    label: "Kontakte werden direkt digital erfasst.",
  },
  {
    value: "Sofort",
    label: "Der erste WhatsApp-Kontakt kann direkt nach dem Scan starten.",
  },
  {
    value: "1 Übersicht",
    label: "Leads, Status und nächste Schritte bleiben an einem Ort.",
  },
];

const OVERVIEW_ROWS = [
  { label: "Anfragen beantwortet", value: 92 },
  { label: "Follow-ups erledigt", value: 88 },
  { label: "Termine vorbereitet", value: 76 },
  { label: "Offene Rückmeldungen geklärt", value: 54 },
];

export function SocialProof() {
  const scope = useRef<HTMLElement>(null);
  useReveals(scope);

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
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} data-reveal className="bg-ink p-8">
              <p className="font-display text-4xl font-semibold text-pulse md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-sage">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Kundenüberblick */}
        <div
          data-reveal
          className="mt-6 rounded-2xl border border-mist/12 bg-mist p-6 text-ink shadow-2xl shadow-black/20 md:p-8"
        >
          <div className="flex flex-col gap-3 border-b border-ink/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold leading-tight text-ink">
                Kundenüberblick
              </h3>
              <p className="mt-1 text-sm text-slate">Energy3000 · letzte 30 Tage</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pulse/10 px-3 py-1 text-sm font-semibold text-pulse-deep">
              <span className="size-2 rounded-full bg-pulse" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-[1fr_220px] lg:items-center">
            <div className="space-y-6">
              {OVERVIEW_ROWS.map((row) => (
                <div key={row.label}>
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium">
                    <span className="text-ink-700">{row.label}</span>
                    <span className="font-semibold text-ink">{row.value}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-porcelain-200">
                    <div
                      className="h-full rounded-full bg-pulse"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto grid size-44 place-items-center rounded-full bg-porcelain-200 p-3">
              <div
                className="grid size-full place-items-center rounded-full"
                style={{
                  background:
                    "conic-gradient(var(--color-pulse) 0 89%, var(--color-porcelain-200) 89% 100%)",
                }}
              >
                <div className="grid size-28 place-items-center rounded-full bg-mist text-center">
                  <div>
                    <p className="text-4xl font-bold leading-none text-ink">89%</p>
                    <p className="mt-2 text-sm text-slate">bearbeitet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nachricht */}
        <figure
          data-reveal
          className="mt-6 max-w-3xl rounded-2xl border border-mist/10 bg-ink-700/60 p-5 md:p-6"
        >
          <figcaption className="flex items-center gap-3 text-sm">
            <span className="flex size-10 items-center justify-center rounded-full bg-pulse/15 text-xs font-semibold text-pulse">
              AS
            </span>
            <span>
              <span className="font-medium text-mist">Anna Schuh</span>
              <span className="block text-sage">Energy3000 · Nachricht nach der Messe</span>
            </span>
          </figcaption>
          <blockquote className="mt-5 rounded-2xl rounded-tl-sm bg-pulse px-5 py-4 text-base leading-relaxed text-white shadow-lg shadow-pulse/20 text-pretty md:text-lg">
            Wir hatten nach der Messe endlich nicht mehr diesen Stapel offener
            Kontakte. Die Leads waren sauber erfasst, die WhatsApp-Nachrichten
            gingen direkt raus und unser Team wusste, wo es weitergeht.
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
