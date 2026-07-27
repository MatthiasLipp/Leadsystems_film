import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Mail, ScanLine, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailRequestButton } from "@/components/EmailRequestButton";
import { HallBackdrop } from "@/components/HallBackdrop";
import { LiveCapture } from "@/components/LiveCapture";

const TRUST = [
  { Icon: ScanLine, text: "Erfasst in unter 2 Sekunden" },
  { Icon: Zap, text: "In Echtzeit beim Vertriebsteam" },
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='title'] > span", { opacity: 0, y: 30, duration: 0.8, stagger: 0.1 })
        .from("[data-hero='sub']", { opacity: 0, y: 20, duration: 0.7 }, "-=0.35")
        .from("[data-hero='trust'] li", { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, "-=0.3")
        .from("[data-hero='card']", { opacity: 0, y: 40, scale: 0.96, duration: 0.9 }, "-=0.9")
        .from("[data-hero='backdrop']", { opacity: 0, duration: 1.2 }, 0);
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={scope}
      className="dark relative isolate flex min-h-screen items-center overflow-hidden bg-[#070b16] text-mist"
    >
      <HallBackdrop
        className="absolute inset-0 -z-10 h-full w-full"
        data-hero="backdrop"
      />
      {/* Lesbarkeits-Overlays — links dunkel, damit der Text trägt */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070b16] via-[#070b16]/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink to-transparent" />

      {/* Kodak-Filmkorn — voll oben, verläuft nach unten in sauberes Schwarz */}
      <div
        aria-hidden="true"
        className="film-grain pointer-events-none absolute inset-0 z-[5] opacity-[0.2]"
      />

      <div className="mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-24">
        {/* Text */}
        <div className="lg:col-span-6">
          <h1
            data-hero="title"
            className="text-balance font-sans text-[clamp(2.3rem,4.4vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white"
          >
            <span className="block">Aus Messekontakten</span>
            <span className="block">werden Abschlüsse.</span>
            <span className="block text-[#3b82f6]">Bevor der Stand</span>
            <span className="block text-[#3b82f6]">abgebaut ist.</span>
          </h1>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-4">
            <EmailRequestButton
              size="lg"
              className="h-12 rounded-full bg-[#2f6bff] px-7 text-base font-semibold text-white shadow-lg shadow-[#2f6bff]/30 hover:bg-[#2f6bff]/90"
              changeClassName="text-[#9fb0cf] hover:text-white"
            >
              Per E-Mail anfragen
              <Mail className="size-5" aria-hidden="true" />
            </EmailRequestButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-white/[0.03] px-6 text-base text-mist hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              <a href="#story" className="group inline-flex items-center gap-2">
                So funktioniert's
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>

          <p
            data-hero="sub"
            className="mt-7 max-w-xl text-lg leading-relaxed text-[#9fb0cf] text-pretty"
          >
            Leadsystems erfasst jeden Besucher per QR-Scan, qualifiziert ihn automatisch und
            startet sofort einen WhatsApp-Workflow. Ihr Vertrieb übernimmt warme, kontextreiche
            Leads in Echtzeit — statt am Montag einen kalten Stapel Visitenkarten.
          </p>

          <ul data-hero="trust" className="mt-9 flex flex-wrap gap-2.5">
            {TRUST.map(({ Icon, text }) => (
              <li
                key={text}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 backdrop-blur-sm"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2f6bff]/15 text-[#6aa5ff] shadow-[0_0_16px_rgba(47,107,255,0.4)]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-[#9fb0cf]">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Live-Capture-Proof */}
        <div className="lg:col-span-6">
          <LiveCapture />
        </div>
      </div>
    </section>
  );
}
