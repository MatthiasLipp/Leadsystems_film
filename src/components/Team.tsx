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
      className="dark relative isolate overflow-hidden bg-ink py-24 text-mist md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_16%,rgba(47,107,255,0.18),transparent_30%),linear-gradient(180deg,rgba(7,11,22,0.9)_0%,rgba(11,17,32,0.98)_58%,rgba(7,11,22,1)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 opacity-35 [background-image:radial-gradient(circle_at_center,rgba(47,107,255,0.85)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_top,#000,transparent)]"
      />

      <div className="mx-auto max-w-[88rem] px-6">
        <div className="mx-auto max-w-6xl text-center">
          <p data-reveal className="label-mono text-pulse">
            Wer wir sind
          </p>
          <h2 data-reveal className="mt-4 text-balance text-4xl leading-[1.05] md:text-5xl">
            Wir bauen Leadsystems für Firmen, die nach der Messe nicht hinterherlaufen wollen.
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sage text-pretty">
            Hinter Leadsystems stehen wir zwei Gründer, die sich bewusst ergänzen: technische
            Tiefe auf der einen, Vertriebs- und Messeerfahrung auf der anderen Seite. Genau diese
            Kombination steckt in jedem Detail, das wir bauen.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {PEOPLE.map((person) => (
            <article
              key={person.src}
              data-reveal
              className="grid gap-7 sm:grid-cols-[minmax(220px,0.9fr)_1fr] sm:items-center"
            >
              <div className="group aspect-[4/5] overflow-hidden rounded-lg border border-mist/15 bg-ink-700 shadow-2xl shadow-black/35">
                <img
                  src={person.src}
                  alt={person.alt}
                  width={760}
                  height={950}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-semibold leading-tight text-mist">{person.name}</p>
                <p className="mt-2 text-sm font-medium text-pulse">{person.role}</p>
                <p className="mt-6 text-base leading-relaxed text-sage text-pretty">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-14 flex justify-center">
          <Button asChild size="lg" className="rounded-full px-6 text-base">
            <a href="#erstgespraech">
              Mit uns sprechen
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
