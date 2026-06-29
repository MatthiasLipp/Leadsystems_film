import { useRef } from "react";
import { ArrowUpRight, CalendarCheck, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveals } from "@/hooks/useReveals";

// Buchungslink — echte URL in .env als VITE_CAL_URL hinterlegen.
// Solange nur der Platzhalter steht, zeigt die Sektion ein Anfrage-Panel
// statt eines kaputten Embeds.
const PLACEHOLDER_URL = "https://cal.com/leadsystems/erstgespraech";
const CAL_URL = import.meta.env.VITE_CAL_URL ?? PLACEHOLDER_URL;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "kontakt@leadsystems.de";

// Ein konfigurierter Link ist gesetzt, nicht der Platzhalter und eine echte URL.
const isBookingConfigured =
  CAL_URL.length > 0 && CAL_URL !== PLACEHOLDER_URL && /^https?:\/\//.test(CAL_URL);

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Erstgespräch — Leadsystems",
)}&body=${encodeURIComponent(
  "Hallo Leadsystems-Team,\n\nich möchte ein Erstgespräch zu unserem Messeauftritt vereinbaren.\n\nUnternehmen:\nNächste Messe:\nWunschtermin:\n\nViele Grüße",
)}`;

const POINTS = [
  { icon: Clock, text: "30 Minuten, unverbindlich" },
  { icon: MessageCircle, text: "Live-Demo des QR-zu-WhatsApp-Flows" },
  { icon: CalendarCheck, text: "Konkreter Fahrplan für Ihre nächste Messe" },
];

export function Booking() {
  const scope = useRef<HTMLElement>(null);
  useReveals(scope);

  return (
    <section
      id="erstgespraech"
      ref={scope}
      className="bg-porcelain py-24 text-ink md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p data-reveal className="label-mono text-pulse-deep">
            Erstgespräch
          </p>
          <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
            Vor der nächsten Messe steht Ihr Lead-System.
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-slate text-pretty">
            Wir schauen uns gemeinsam Ihren Messeauftritt an und zeigen, wie aus Scans
            qualifizierte Leads und automatisierte WhatsApp-Flows werden — zugeschnitten auf
            Ihre Branche.
          </p>

          <ul data-reveal className="mt-9 space-y-4">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.text} className="flex items-center gap-3.5">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-pulse/12 text-pulse-deep">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-ink">{p.text}</span>
                </li>
              );
            })}
          </ul>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="mt-9 rounded-full border-ink/20 px-6 text-base"
          >
            <a href={isBookingConfigured ? CAL_URL : MAILTO} {...(isBookingConfigured ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {isBookingConfigured ? "In neuem Tab öffnen" : "Per E-Mail anfragen"}
            </a>
          </Button>
        </div>

        {/* Buchung: echter Embed wenn konfiguriert, sonst Anfrage-Panel */}
        <div data-reveal className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-porcelain-200 bg-paper shadow-sm">
            <div className="flex items-center justify-between border-b border-porcelain-200 px-5 py-3">
              <span className="label-mono text-slate">
                {isBookingConfigured ? "Termin wählen" : "Erstgespräch anfragen"}
              </span>
              <span className="label-mono text-pulse-deep">
                {isBookingConfigured ? "Cal.com" : "Antwort < 24 h"}
              </span>
            </div>

            {isBookingConfigured ? (
              <iframe
                src={CAL_URL}
                title="Erstgespräch mit Leadsystems buchen"
                loading="lazy"
                className="h-[640px] w-full border-0 bg-paper"
              />
            ) : (
              <div className="flex min-h-[420px] flex-col justify-center gap-7 px-8 py-12 md:px-12">
                <h3 className="text-balance text-2xl text-ink md:text-3xl">
                  Schreiben Sie uns — wir melden uns mit zwei, drei Terminvorschlägen.
                </h3>
                <p className="max-w-md text-base leading-relaxed text-slate text-pretty">
                  Kein Formular-Pingpong: Eine kurze Nachricht mit Unternehmen und nächster
                  Messe genügt. Den Rest klären wir im Gespräch.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-6 text-base"
                  >
                    <a href={MAILTO}>
                      Erstgespräch anfragen
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </a>
                  </Button>
                  <span className="font-mono text-sm text-slate">{CONTACT_EMAIL}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
