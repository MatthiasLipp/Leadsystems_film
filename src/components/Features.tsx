import { useRef } from "react";
import {
  BarChart3,
  BellRing,
  Gauge,
  MessagesSquare,
  QrCode,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useReveals } from "@/hooks/useReveals";

type Feature = {
  icon: typeof QrCode;
  title: string;
  body: string;
  span: string;
  visual?: "qr" | "chat";
};

const FEATURES: Feature[] = [
  {
    icon: QrCode,
    title: "Sofort-Erfassung per QR-Code",
    body: "Ein QR-Code am Stand genügt. Der Besucher scannt, der Lead landet in Sekunden strukturiert im System — kein Zettel, keine Nachpflege, kein verlorener Kontakt.",
    span: "lg:col-span-8",
    visual: "qr",
  },
  {
    icon: BellRing,
    title: "Echtzeit-Benachrichtigung",
    body: "Ihr Standteam wird sofort informiert, wenn ein A-Lead scannt — und kann das Gespräch direkt vertiefen.",
    span: "lg:col-span-4",
  },
  {
    icon: MessagesSquare,
    title: "Automatisierte WhatsApp-Sequenzen",
    body: "Begrüßung, Terminvorschlag, Nurture: vordefinierte Flows starten automatisch und halten den Kontakt warm.",
    span: "lg:col-span-4",
    visual: "chat",
  },
  {
    icon: Gauge,
    title: "Lead-Tracking & Scoring",
    body: "Jeder Lead wird qualifiziert und bewertet. Ihr Vertrieb sieht auf einen Blick, wo sich das schnelle Nachfassen lohnt.",
    span: "lg:col-span-4",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO-konform per Double-Opt-in",
    body: "Einwilligung sauber dokumentiert, Daten in Deutschland verarbeitet. Rechtssicher vom ersten Scan an.",
    span: "lg:col-span-4",
  },
  {
    icon: Workflow,
    title: "CRM-Anbindung",
    body: "Qualifizierte Leads fließen automatisch in Ihr CRM — HubSpot, Salesforce, Pipedrive und mehr. Ohne Doppelerfassung.",
    span: "lg:col-span-6",
  },
  {
    icon: BarChart3,
    title: "ROI-Dashboard",
    body: "Scans, Conversion, Pipeline-Wert je Messe. Endlich eine belastbare Zahl hinter dem teuren Messeauftritt.",
    span: "lg:col-span-6",
  },
];

function MiniQR() {
  const cells = [
    [1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 0],
    [1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1, 0],
    [1, 0, 1, 1, 0, 1],
  ];
  return (
    <div className="grid w-fit grid-cols-6 gap-1 rounded-xl bg-ink p-3" aria-hidden="true">
      {cells.flat().map((c, i) => (
        <span
          key={i}
          className={`size-3 rounded-[3px] ${c ? "bg-pulse" : "bg-ink-500/50"}`}
        />
      ))}
    </div>
  );
}

export function Features() {
  const scope = useRef<HTMLElement>(null);
  useReveals(scope);

  return (
    <section
      id="funktionen"
      ref={scope}
      className="bg-porcelain py-24 text-ink md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p data-reveal className="label-mono text-pulse-deep">
            Funktionen
          </p>
          <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
            Alles, was aus einem Scan einen Abschluss macht.
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-slate text-pretty">
            Eine durchgängige Infrastruktur — von der Erfassung am Stand bis zur
            Auswertung im Dashboard. Kein Tool-Flickwerk, keine manuelle Übergabe.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card
                key={f.title}
                data-reveal
                className={`group flex h-full flex-col gap-0 rounded-2xl border-porcelain-200 bg-paper p-7 shadow-none transition-colors hover:border-pulse/40 md:col-span-1 ${f.span}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-pulse/12 text-pulse-deep">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  {f.visual === "qr" && <MiniQR />}
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate text-pretty">
                  {f.body}
                </p>
                {f.visual === "chat" && (
                  <div className="mt-5 flex justify-end">
                    <p className="max-w-[90%] rounded-2xl rounded-br-sm bg-pulse px-3.5 py-2 text-sm leading-snug text-[#04130e]">
                      Danke für Ihren Besuch! Passt Dienstag 11:00 Uhr?
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
