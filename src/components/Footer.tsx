import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

type FooterLink = { label: string; href: string } | { label: string; to: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produkt",
    links: [
      { label: "So funktioniert's", to: "/#story" },
      { label: "Funktionen", to: "/#funktionen" },
      { label: "Referenzen", to: "/#referenzen" },
      { label: "FAQ", to: "/#faq" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", to: "/#team" },
      { label: "Kontakt", to: "/#erstgespraech" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", to: "/impressum" },
      { label: "Datenschutz", to: "/datenschutz" },
      { label: "AGB", to: "/agb" },
    ],
  },
];

const linkClass = "text-sm text-mist/75 transition-colors hover:text-mist";

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
              <Link to="/#erstgespraech">Erstgespräch buchen</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label-mono text-sage">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"to" in l ? (
                        <Link to={l.to} className={linkClass}>
                          {l.label}
                        </Link>
                      ) : (
                        <a href={l.href} className={linkClass}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-mist/10 pt-8 text-sm text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Leadsystems · Jamodo e.U. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-mist/60">
            <Link to="/impressum" className="transition-colors hover:text-mist">
              Impressum
            </Link>
            <Link to="/datenschutz" className="transition-colors hover:text-mist">
              Datenschutz
            </Link>
            <Link to="/agb" className="transition-colors hover:text-mist">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
