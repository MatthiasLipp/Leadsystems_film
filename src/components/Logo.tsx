const LOGO_SRC = `${import.meta.env.BASE_URL}brand/leadsystems-logo-white.png`;

/** Wortmarke Leadsystems als Markenlogo. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={LOGO_SRC}
        alt="Leadsystems"
        width={1600}
        height={127}
        className="h-5 w-auto sm:h-6"
      />
    </span>
  );
}
