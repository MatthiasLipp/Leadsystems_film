import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveals } from "@/hooks/useReveals";

const TEAM_IMAGE_PATH = `${import.meta.env.BASE_URL}team/`;

const PEOPLE = [
  {
    src: `${TEAM_IMAGE_PATH}leadsystems-founder-portrait.webp`,
    alt: "Leadsystems Teammitglied im schwarzen Leadsystems-Shirt.",
    role: "Produkt, Automatisierung & Umsetzung",
  },
  {
    src: `${TEAM_IMAGE_PATH}leadsystems-team-portrait.webp`,
    alt: "Leadsystems Teammitglied vor dunklem Studiohintergrund.",
    role: "Vertrieb, Kundenprozesse & Messe-Setup",
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
            Wir bauen Leadsystems für Teams, die nach der Messe nicht hinterherlaufen wollen.
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-sage text-pretty">
            Wir verbinden Sales-Verständnis, Automatisierung und saubere technische Umsetzung.
            Das Ziel ist simpel: Jeder gute Kontakt soll sofort im richtigen Prozess landen,
            statt in Notizen, Tabellen oder verlorenen Visitenkarten zu verschwinden.
          </p>
          <p data-reveal className="mt-5 text-base leading-relaxed text-mist/80 text-pretty">
            Deshalb denken wir den Messeauftritt nicht als Formular, sondern als kompletten
            Flow: QR-Erfassung, Qualifizierung, WhatsApp-Nachfassstrecke und klare Auswertung
            für Ihr Vertriebsteam.
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
                  height={index === 0 ? 1066 : 760}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="border-t border-mist/10 p-5">
                <p className="label-mono text-pulse">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-base font-medium leading-snug text-mist">
                  {person.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
