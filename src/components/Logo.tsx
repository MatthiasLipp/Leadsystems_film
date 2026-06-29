/** Wortmarke Leadsystems — Live-Punkt + Display-Schrift. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="pulse-dot" aria-hidden="true" />
      <span className="font-display text-xl font-semibold tracking-tight">
        Leadsystems
      </span>
    </span>
  );
}
