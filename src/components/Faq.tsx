import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveals } from "@/hooks/useReveals";

const FAQS = [
  {
    q: "Ist die Lead-Erfassung wirklich DSGVO-konform?",
    a: "Ja. Jeder Kontakt gibt seine Einwilligung per Double-Opt-in, die Zustimmung wird revisionssicher dokumentiert und die Daten werden in Deutschland verarbeitet. Auf Wunsch schließen wir einen Auftragsverarbeitungsvertrag (AVV) mit Ihnen ab.",
  },
  {
    q: "Müssen Besucher eine App installieren?",
    a: "Nein. Der Besucher scannt den QR-Code mit der normalen Kamera seines Smartphones. WhatsApp ist in der Regel bereits installiert — der Flow startet ohne zusätzliche Hürde.",
  },
  {
    q: "Was passiert, wenn ein Besucher kein WhatsApp nutzt?",
    a: "Dann greift automatisch ein Fallback per E-Mail oder SMS. Der bevorzugte Kanal lässt sich pro Flow festlegen, sodass kein Lead verloren geht.",
  },
  {
    q: "Wie schnell ist Leadsystems einsatzbereit?",
    a: "In wenigen Tagen vor Ihrer Messe. Wir erstellen die QR-Codes, richten die WhatsApp-Flows ein und verbinden Ihr CRM — Sie müssen am Stand nur noch den Code platzieren.",
  },
  {
    q: "Lässt sich Leadsystems an unser CRM anbinden?",
    a: "Ja. Qualifizierte Leads fließen automatisch in gängige Systeme wie HubSpot, Salesforce oder Pipedrive — per nativer Integration oder über unsere API.",
  },
  {
    q: "Nutzt ihr die offizielle WhatsApp Business Platform?",
    a: "Ja, ausschließlich. Wir setzen auf die offizielle WhatsApp Business Platform — zuverlässig zustellbar, konform und ohne Risiko für gesperrte Nummern.",
  },
];

export function Faq() {
  const scope = useRef<HTMLElement>(null);
  useReveals(scope);

  return (
    <section id="faq" ref={scope} className="bg-porcelain pb-28 pt-4 text-ink md:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p data-reveal className="label-mono text-pulse-deep">
            FAQ
          </p>
          <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
            Häufige Fragen.
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-slate text-pretty">
            Noch etwas offen? Klären wir im Erstgespräch.
          </p>
        </div>

        <div data-reveal className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-porcelain-200"
              >
                <AccordionTrigger className="py-5 text-left text-lg font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-relaxed text-slate">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
