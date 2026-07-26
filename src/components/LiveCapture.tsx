import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Calendar, CalendarCheck, ScanLine, Sparkles } from "lucide-react";

type Sender = "ai" | "lead";
type Msg = { from: Sender; text: string; time: string };

/* Skript des Live-Verlaufs — endet mit einem buchbaren Termin. */
const SCRIPT: Msg[] = [
  {
    from: "ai",
    text: "Hallo Herr Wegner, danke für Ihren Besuch an Stand B12! Darf ich Ihnen kurz zeigen, wie wir Ihre Follow-ups automatisieren?",
    time: "14:02",
  },
  { from: "lead", text: "Gerne, das klingt interessant.", time: "14:03" },
  {
    from: "ai",
    text: "Perfekt! Ich buche Ihnen direkt einen kurzen Termin mit unserem Lösungsberater. Passt morgen um 11:00 Uhr?",
    time: "14:03",
  },
];

/* Offizielles WhatsApp-Glyph (simple-icons) */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const NODES = [
  { label: "Lead erfassen", glyph: "scan", green: false },
  { label: "KI qualifizieren", glyph: "spark", green: false },
  { label: "WhatsApp automatisch", glyph: "whatsapp", green: true },
] as const;

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Booking = "idle" | "prompt" | "confirmed";

export function LiveCapture() {
  const root = useRef<HTMLDivElement>(null);
  const stream = useRef<HTMLDivElement>(null);
  const bookResolve = useRef<(() => void) | null>(null);

  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<Sender | null>(null);
  const [booking, setBooking] = useState<Booking>("idle");
  const [clock, setClock] = useState("14:02:07");

  /* Live-Uhr im Kartenkopf */
  useEffect(() => {
    if (reduceMotion()) return;
    let s = 14 * 3600 + 2 * 60 + 7;
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = window.setInterval(() => {
      s += 1;
      setClock(`${pad(Math.floor(s / 3600) % 24)}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  /* Gescripteter Chat-Verlauf, der sich in Schleife abspielt */
  useEffect(() => {
    if (reduceMotion()) {
      setShown(SCRIPT.length);
      setBooking("confirmed");
      return;
    }

    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });
    const waitForBooking = (ms: number) =>
      new Promise<void>((res) => {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          bookResolve.current = null;
          res();
        };
        bookResolve.current = finish;
        timers.push(window.setTimeout(finish, ms));
      });

    async function run() {
      while (alive) {
        setShown(0);
        setTyping(null);
        setBooking("idle");
        await wait(900);

        for (let i = 0; i < SCRIPT.length; i++) {
          if (!alive) return;
          setTyping(SCRIPT[i].from);
          await wait(SCRIPT[i].from === "ai" ? 1500 : 1100);
          if (!alive) return;
          setTyping(null);
          setShown(i + 1);
          await wait(650);
        }

        if (!alive) return;
        setBooking("prompt");
        await waitForBooking(4500); // Klick des Nutzers ODER Auto-Bestätigung
        if (!alive) return;
        setBooking("confirmed");
        await wait(5000);
      }
    }

    void run();
    return () => {
      alive = false;
      timers.forEach(window.clearTimeout);
    };
  }, []);

  /* Verlauf immer ans untere Ende scrollen (neueste Nachricht sichtbar) */
  useEffect(() => {
    const el = stream.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: shown <= 1 ? "auto" : "smooth" });
  }, [shown, typing, booking]);

  /* Schwebende Icons + fließende Punkte auf den Linien */
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || reduceMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -11 : 13,
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.35,
        });
      });
      gsap.to("[data-flow]", {
        strokeDashoffset: -12,
        duration: 0.9,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const onBook = () => bookResolve.current?.();

  return (
    <div
      ref={root}
      data-hero="card"
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="flex items-stretch">
        {/* Icon-Schiene */}
        <div className="hidden w-24 shrink-0 flex-col justify-center gap-12 lg:flex">
          {NODES.map(({ label, glyph }) => (
            <div key={label} data-node className="flex flex-col items-center gap-2.5">
              <div className="relative flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-[#111c31] to-[#0a1120] shadow-lg shadow-black/40">
                {glyph === "scan" && (
                  <ScanLine className="relative size-7 text-[#6aa5ff]" aria-hidden="true" />
                )}
                {glyph === "spark" && (
                  <Sparkles className="relative size-7 text-[#8fbaff]" aria-hidden="true" />
                )}
                {glyph === "whatsapp" && (
                  <WhatsAppGlyph className="relative size-7 text-[#3ddc84]" />
                )}
              </div>
              <span className="text-center font-mono text-[0.56rem] uppercase leading-tight tracking-[0.16em] text-[#7c8bab]">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Verbindungslinien mit fließenden Punkten */}
        <div className="relative hidden w-16 shrink-0 lg:block" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full [filter:drop-shadow(0_0_5px_rgba(47,107,255,0.8))]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Ruhende Grundlinien */}
            <g fill="none" stroke="#2f6bff" strokeWidth="1" strokeLinecap="round" opacity="0.28">
              <path d="M0,30 C42,30 58,44 100,44" vectorEffect="non-scaling-stroke" />
              <path d="M0,50 C46,50 58,50 100,50" vectorEffect="non-scaling-stroke" />
              <path d="M0,70 C42,70 58,56 100,56" vectorEffect="non-scaling-stroke" />
            </g>
            {/* Fließende Punkte in Richtung Nachricht */}
            <g fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.01 11">
              <path data-flow d="M0,30 C42,30 58,44 100,44" stroke="#7cb2ff"
                    vectorEffect="non-scaling-stroke" />
              <path data-flow d="M0,50 C46,50 58,50 100,50" stroke="#7cb2ff"
                    vectorEffect="non-scaling-stroke" />
              <path data-flow d="M0,70 C42,70 58,56 100,56" stroke="#4dee97"
                    vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>

        {/* Chat-Karte */}
        <div className="relative min-w-0 flex-1">
          {/* Kreisförmiger Hue rund um das Chatfenster */}
          <div
            className="pointer-events-none absolute -inset-20 rounded-[50%] bg-[radial-gradient(closest-side,rgba(47,107,255,0.42),rgba(47,107,255,0.12)_58%,transparent_82%)] blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-px rounded-[1.8rem] bg-[radial-gradient(closest-side,transparent_60%,rgba(90,155,255,0.35))] opacity-70 blur-[2px]"
            aria-hidden="true"
          />
          <div className="relative rounded-[1.9rem] border border-[#3b82f6]/25 bg-gradient-to-b from-[#0e1728]/95 to-[#080e1c]/95 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75),0_0_70px_-12px_rgba(47,107,255,0.5)] backdrop-blur-xl">
          {/* Glühen an der Oberkante */}
          <div
            className="pointer-events-none absolute inset-x-12 -top-16 h-32 rounded-full bg-[#2f6bff]/45 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#8fbaff] to-transparent"
            aria-hidden="true"
          />

          {/* Kopf */}
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[#5c9bff]">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#5c9bff] opacity-60 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-[#5c9bff]" />
              </span>
              Lead erfasst
            </span>
            <span className="font-mono text-[0.7rem] tabular-nums tracking-[0.15em] text-[#7c8bab]">
              {clock}
            </span>
          </div>

          {/* Kontakt */}
          <div className="relative mt-6 flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4b8bff] to-[#2f6bff] text-lg font-semibold text-white shadow-lg shadow-[#2f6bff]/40">
              MW
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xl font-semibold leading-tight text-white">
                Markus Wegner
              </p>
              <p className="truncate text-[0.95rem] text-[#8b98b5]">Einkaufsleiter · NordTech GmbH</p>
            </div>
            <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-center">
              <p className="text-[0.58rem] uppercase tracking-wider text-[#7c8bab]">Score</p>
              <p className="text-lg font-semibold leading-none text-[#5c9bff]">87</p>
            </div>
          </div>

          <div className="relative mt-5 h-px bg-white/[0.06]" />

          {/* Verlauf — hoch genug für den ganzen Gesprächsverlauf */}
          <div
            ref={stream}
            className="relative mt-5 flex h-[30rem] flex-col gap-5 overflow-hidden [scrollbar-width:none]"
          >
            {SCRIPT.slice(0, shown).map((m, i) => (
              <MessageRow key={i} msg={m} />
            ))}

            {typing && <TypingRow from={typing} />}

            {booking === "prompt" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-2xl border border-[#2f6bff]/30 bg-[#2f6bff]/10 p-3.5">
                <div className="flex items-center gap-2 text-[0.95rem] text-[#dbe4f5]">
                  <Calendar className="size-[18px] text-[#6aa5ff]" aria-hidden="true" />
                  Vorschlag: morgen · 11:00 Uhr
                </div>
                <button
                  type="button"
                  onClick={onBook}
                  className="mt-3 w-full rounded-xl bg-[#2f6bff] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-[#2f6bff]/40 transition-colors hover:bg-[#2f6bff]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6bff]"
                >
                  Termin buchen
                </button>
              </div>
            )}

            {booking === "confirmed" && (
              <div className="animate-in zoom-in-95 fade-in duration-500 flex items-center gap-3 rounded-2xl border border-[#25d366]/30 bg-[#25d366]/10 px-4 py-4">
                <CalendarCheck className="size-6 shrink-0 text-[#3ddc84]" aria-hidden="true" />
                <span className="font-mono text-[0.8rem] uppercase tracking-[0.2em] text-[#4ade80]">
                  Termin gebucht · 11:00
                </span>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ from }: { from: Sender }) {
  if (from === "ai") {
    return (
      <div className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#3b82f6]/50 bg-[#2f6bff]/10 shadow-[0_0_18px_-2px_rgba(47,107,255,0.6)]">
        <div className="absolute -inset-1 rounded-xl bg-[#2f6bff]/35 blur-lg" aria-hidden="true" />
        <Sparkles className="relative size-[18px] text-[#8fbaff]" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4b8bff] to-[#2f6bff] text-xs font-semibold text-white">
      MW
    </div>
  );
}

function MessageRow({ msg }: { msg: Msg }) {
  const ai = msg.from === "ai";
  return (
    <div className="flex gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <Avatar from={msg.from} />
      <div className="min-w-0 space-y-1.5">
        <p className="text-[0.8rem] font-medium text-[#8b98b5]">
          {ai ? "LeadSystems AI" : "Markus Wegner"}
        </p>
        <div
          className={`rounded-2xl rounded-tl-md border px-4 py-3 text-[0.95rem] leading-snug ${
            ai
              ? "border-white/[0.06] bg-white/[0.04] text-[#dbe4f5]"
              : "border-[#2f6bff]/25 bg-[#2f6bff]/10 text-[#e6edfb]"
          }`}
        >
          {msg.text}
          <span className="mt-1 block text-right text-[0.65rem] text-[#6b7896]">{msg.time}</span>
        </div>
      </div>
    </div>
  );
}

function TypingRow({ from }: { from: Sender }) {
  return (
    <div className="flex gap-3 animate-in fade-in duration-300">
      <Avatar from={from} />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-[#8b98b5] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </div>
  );
}
