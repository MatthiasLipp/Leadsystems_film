import { useRef } from "react";
import { useReveals } from "@/hooks/useReveals";

// PLATZHALTER — echte Kundenlogos später hier eintragen.
const LOGOS = [
  "NORDTECH",
  "Messebau Koch",
  "VELTORA",
  "Hanse Industrie",
  "KRAFTWERK",
  "Aurelis Group",
];

// PLATZHALTER — echte Kennzahlen/Testimonials nach Freigabe einsetzen.
const STATS = [
  { value: "< 2 Sek.", label: "vom Scan zum erfassten Lead" },
  { value: "3×", label: "höhere Follow-up-Quote *" },
  { value: "100 %", label: "DSGVO-konforme Erfassung" },
];

const TESTIMONIALS = [
  {
    quote:
      "Früher haben wir nach jeder Messe Visitenkarten abgetippt. Heute steht der erste WhatsApp-Kontakt, bevor der Besucher den Hallengang verlassen hat.",
    name: "Vorname Nachname",
    role: "Leitung Marketing",
    company: "Musterfirma GmbH",
  },
  {
    quote:
      "Endlich sehen wir den echten Pipeline-Wert pro Messe. Die Diskussion über das Messebudget ist damit eine andere geworden.",
    name: "Vorname Nachname",
    role: "Head of Sales",
    company: "Beispiel AG",
  },
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
          </div>
          <span
            data-reveal
            className="label-mono rounded-full border border-mist/15 px-3 py-1.5 text-sage"
          >
            Platzhalter-Inhalte
          </span>
        </div>

        {/* Logo-Reihe */}
        <div
          data-reveal
          className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-8 border-y border-mist/10 py-9 sm:grid-cols-3 lg:grid-cols-6"
        >
          {LOGOS.map((l) => (
            <span
              key={l}
              className="text-center font-display text-lg font-medium text-mist/45"
            >
              {l}
            </span>
          ))}
        </div>

        {/* Kennzahlen */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-mist/10 bg-mist/10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} data-reveal className="bg-ink p-8">
              <p className="font-display text-4xl font-semibold text-pulse md:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-sage">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.quote}
              data-reveal
              className="rounded-2xl border border-mist/10 bg-ink-700/60 p-8"
            >
              <blockquote className="font-display text-xl leading-snug text-mist text-pretty">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="flex size-9 items-center justify-center rounded-full bg-pulse/15 text-xs font-semibold text-pulse">
                  ✦
                </span>
                <span>
                  <span className="font-medium text-mist">{t.name}</span>
                  <span className="block text-sage">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p data-reveal className="mt-6 text-xs text-sage">
          * Beispielwerte. Logos, Kennzahlen und Stimmen sind Platzhalter und werden nach
          Kundenfreigabe ersetzt.
        </p>
      </div>
    </section>
  );
}
