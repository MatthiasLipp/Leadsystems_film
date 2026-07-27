import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/Footer";

type LegalLayoutProps = {
  title: string;
  intro?: string;
  updated?: string;
  children: ReactNode;
};

export function LegalLayout({ title, intro, updated, children }: LegalLayoutProps) {
  return (
    <div className="dark min-h-screen bg-ink text-mist">
      <header className="sticky top-0 z-40 border-b border-mist/10 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link to="/" aria-label="Leadsystems — Startseite" className="rounded-md">
            <Logo />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-mist/75 transition-colors hover:text-mist"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Zur Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="label-mono text-pulse">Rechtliches</p>
        <h1 className="mt-3 text-balance font-display text-4xl leading-[1.05] md:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sage text-pretty">{intro}</p>}
        {updated && <p className="mt-3 text-sm text-slate">Stand: {updated}</p>}

        <div className="legal-prose mt-12">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
