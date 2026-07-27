import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveals } from "@/hooks/useReveals";

const TEAM_IMAGE_PATH = `${import.meta.env.BASE_URL}team/`;

const PEOPLE = [
  {
    src: `${TEAM_IMAGE_PATH}1.png`,
    alt: "Matthias Lipp, Mitgründer von Leadsystems.",
    name: "Matthias Lipp",
    role: "Technik, Produkt & Automatisierung",
    bio: "Matthias hat Wirtschaftsinformatik studiert und verbindet fundiertes technisches Verständnis mit echter Entwicklungserfahrung. Er verantwortet Architektur, Programmierung und Automatisierung hinter Leadsystems — von der QR-Erfassung über die Qualifizierung bis zur WhatsApp-Nachfassstrecke.",
  },
  {
    src: `${TEAM_IMAGE_PATH}2.png`,
    alt: "Julian Anspach, Mitgründer von Leadsystems.",
    name: "Julian Anspach",
    role: "Vertrieb, Messen & Kundenprozesse",
    bio: "Julian hat bereits mehrere Unternehmen im Handel aufgebaut und geführt und kennt den Messebetrieb aus erster Hand. Dieses Vertriebs- und Branchenwissen bringt er in jeden Kundenprozess ein — vom Standkonzept über die Ansprache bis zur qualifizierten Übergabe an den Vertrieb.",
  },
];

export function Team() {
  const scope = useRef<HTMLElement>(null);
  useReveals(scope);

  return (
    <section
      id="team"
      ref={scope}
      className="dark overflow-hidden bg-ink-800 py-24 text-mist md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p data-reveal className="label-mono text-pulse">
            Wer wir sind
          </p>
          <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
            Wir bauen Leadsystems für Firmen, die nach der Messe nicht hinterherlaufen wollen.
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-sage text-pretty">
            Hinter Leadsystems stehen wir zwei Gründer, die sich bewusst ergänzen: technische
            Tiefe auf der einen, Vertriebs- und Messeerfahrung auf der anderen Seite. Genau diese
            Kombination steckt in jedem Detail, das wir bauen.
          </p>
          <p data-reveal className="mt-5 text-base leading-relaxed text-mist/80 text-pretty">
            Wir kennen beide Seiten des Messetages — den Stand und das System dahinter. Deshalb
            denken wir Ihren Auftritt nicht als Formular, sondern als kompletten Flow:
            QR-Erfassung, Qualifizierung, WhatsApp-Nachfassstrecke und klare Auswertung. Technisch
            sauber gebaut und vertrieblich durchdacht.
          </p>
          <Button asChild size="lg" className="mt-9 rounded-full px-6 text-base">
            <a href="#erstgespraech">
              Mit uns sprechen
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {PEOPLE.map((person, index) => (
            <article
              key={person.src}
              data-reveal
              className={`group overflow-hidden rounded-lg border border-mist/10 bg-ink shadow-2xl shadow-black/30 ${
                index === 1 ? "sm:mt-16" : ""
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-ink-700">
                <img
                  src={person.src}
                  alt={person.alt}
                  width={760}
                  height={950}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-t border-mist/10 p-5">
                <p className="text-lg font-semibold leading-snug text-mist">{person.name}</p>
                <p className="mt-1 text-sm font-medium text-pulse">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-sage text-pretty">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
