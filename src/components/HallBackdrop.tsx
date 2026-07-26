/**
 * Dunkle Hero-Bühne: nahezu schwarzer Grund, weiches elektrisches Blau-Glühen
 * hinter der Chat-Karte, feines Perspektiv-Raster am Boden und vereinzelte
 * Funkenpunkte. Bewusst reduziert — Licht führt den Blick zur Live-Karte.
 */
export function HallBackdrop({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  const sparks = [
    { x: 760, y: 300, r: 2 },
    { x: 820, y: 470, r: 1.5 },
    { x: 900, y: 250, r: 1.6 },
    { x: 700, y: 560, r: 1.4 },
    { x: 960, y: 620, r: 2 },
    { x: 640, y: 360, r: 1.4 },
  ];
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <radialGradient id="hb-glow" cx="70%" cy="34%" r="50%">
          <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.48" />
          <stop offset="45%" stopColor="#2f6bff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hb-glow2" cx="86%" cy="58%" r="42%">
          <stop offset="0%" stopColor="#3f8bff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3f8bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f6bff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2f6bff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hb-vig" cx="50%" cy="42%" r="75%">
          <stop offset="55%" stopColor="#070b16" stopOpacity="0" />
          <stop offset="100%" stopColor="#04060d" stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* Grund */}
      <rect width="1600" height="900" fill="#070b16" />

      {/* Perspektiv-Bodenraster */}
      <g stroke="#3f6bd0" strokeWidth="1">
        {Array.from({ length: 21 }).map((_, k) => {
          const i = k - 10;
          return (
            <line
              key={`v${k}`}
              x1={800 + i * 18}
              y1={470}
              x2={800 + i * 190}
              y2={900}
              opacity={0.14}
            />
          );
        })}
        {Array.from({ length: 7 }).map((_, r) => {
          const yy = 470 + Math.pow((r + 1) / 7, 2) * 430;
          return <line key={`h${r}`} x1={0} y1={yy} x2={1600} y2={yy} opacity={0.1} />;
        })}
      </g>
      <rect x="0" y="470" width="1600" height="430" fill="url(#hb-floor)" />

      {/* Blau-Glühen hinter der Karte */}
      <rect width="1600" height="900" fill="url(#hb-glow)" />
      <rect width="1600" height="900" fill="url(#hb-glow2)" />

      {/* Funkenpunkte */}
      <g fill="#8fbaff">
        {sparks.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={0.5} />
        ))}
      </g>

      {/* Vignette */}
      <rect width="1600" height="900" fill="url(#hb-vig)" />
    </svg>
  );
}
