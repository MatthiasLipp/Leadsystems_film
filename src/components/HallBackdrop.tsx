/**
 * Dezenter Messehallen-Eindruck als Hintergrund des Hero: mehrere Stände in
 * Perspektive, Bodenraster, Spotlight. Bewusst gedämpft — der Text führt.
 */
export function HallBackdrop({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  const booths = [
    { x: 140, scale: 0.72, o: 0.5 },
    { x: 470, scale: 0.86, o: 0.7 },
    { x: 800, scale: 1.12, o: 1, focus: true },
    { x: 1180, scale: 0.86, o: 0.7 },
    { x: 1500, scale: 0.72, o: 0.5 },
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
        <radialGradient id="hb-spot" cx="50%" cy="6%" r="62%">
          <stop offset="0%" stopColor="#25e39b" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#25e39b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hb-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e332f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#06201e" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="900" fill="#06201e" />
      <rect width="1600" height="900" fill="url(#hb-spot)" />

      {/* Bodenraster */}
      <g stroke="#1d534c" strokeWidth="1">
        {Array.from({ length: 17 }).map((_, k) => {
          const i = k - 8;
          return (
            <line
              key={`v${k}`}
              x1={800 + i * 14}
              y1={430}
              x2={800 + i * 150}
              y2={900}
              opacity={0.3}
            />
          );
        })}
        {Array.from({ length: 6 }).map((_, r) => {
          const yy = 430 + Math.pow((r + 1) / 6, 2) * 470;
          return <line key={`h${r}`} x1={0} y1={yy} x2={1600} y2={yy} opacity={0.22} />;
        })}
      </g>
      <rect x="0" y="430" width="1600" height="470" fill="url(#hb-floor)" />

      {/* Stände */}
      {booths.map((b, i) => {
        const w = 300 * b.scale;
        const h = 210 * b.scale;
        const x = b.x - w / 2;
        const y = 460 - h;
        return (
          <g key={i} opacity={b.o}>
            <rect x={x} y={y} width={w} height={h} rx={6} fill="#0e332f" stroke="#1d534c" />
            <rect x={x} y={y} width={w} height={38 * b.scale} rx={6} fill="#031412" />
            <circle cx={x + 22 * b.scale} cy={y + 19 * b.scale} r={5 * b.scale} fill="#25e39b" />
            {b.focus ? (
              <>
                <rect
                  x={b.x - 42 * b.scale}
                  y={y + 70 * b.scale}
                  width={84 * b.scale}
                  height={84 * b.scale}
                  rx={8 * b.scale}
                  fill="#e6f0eb"
                />
                <circle cx={b.x} cy={y + 112 * b.scale} r={120 * b.scale} fill="none" stroke="#25e39b" strokeWidth="1.5" opacity="0.5" />
              </>
            ) : (
              <rect
                x={b.x - 34 * b.scale}
                y={y + 76 * b.scale}
                width={68 * b.scale}
                height={68 * b.scale}
                rx={6 * b.scale}
                fill="#1d534c"
                opacity="0.5"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
