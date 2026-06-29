import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const COLUMNS = [
  {
    title: "Produkt",
    links: [
      { label: "So funktioniert's", href: "#story" },
      { label: "Funktionen", href: "#funktionen" },
      { label: "Referenzen", href: "#referenzen" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "#" },
      { label: "Kontakt", href: "#erstgespraech" },
      { label: "Karriere", href: "#" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
      { label: "AGB", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dark bg-ink text-mist">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-sage">
              Messe-Lead-Infrastruktur: erfassen per QR, nachfassen per WhatsApp, auswerten im
              Dashboard. Aus flüchtigen Standkontakten wird messbare Pipeline.
            </p>
            <Button asChild className="mt-7 rounded-full px-6">
              <a href="#erstgespraech">Erstgespräch buchen</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label-mono text-sage">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-mist/75 transition-colors hover:text-mist"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-mist/10 pt-8 text-sm text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Leadsystems. Alle Rechte vorbehalten.</p>
          <p className="text-mist/45">
            Impressum, Adresse &amp; Kontaktdaten — Platzhalter, bitte ergänzen.
          </p>
        </div>
      </div>
    </footer>
  );
}
