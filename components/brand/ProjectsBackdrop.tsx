/**
 * The luminous ground behind Featured Projects.
 *
 *   light      two warm pools — behind the featured case study and low right
 *   board      circuit traces along the margins, a few segments lit, and a
 *              handful of travelling pulses (the same `.fz-pulse` energy as
 *              the hero and the skills constellation)
 *   dust       gold motes and four-point sparkles, twinkling out of phase
 *
 * Traces are one SVG scaled to cover the section. Motes and sparkles are
 * HTML placed by percentage, so they keep a true pixel size at every width
 * instead of swelling with the SVG. Positions come from a seeded generator:
 * identical on server and client, so nothing shifts on hydration.
 */

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seeded(20260925);

interface Mote {
  x: number;
  y: number;
  size: number;
  glow: boolean;
  dur: number;
  delay: number;
}

/** Denser toward the margins, where the cards leave the ground visible. */
const motes: Mote[] = Array.from({ length: 72 }, () => {
  const edge = rand() < 0.62;
  const x = edge ? (rand() < 0.5 ? rand() * 16 : 84 + rand() * 16) : 10 + rand() * 80;
  const big = rand() < 0.2;
  return {
    x,
    y: 2 + rand() * 96,
    size: big ? 2.2 + rand() * 1.4 : 1 + rand() * 1.1,
    glow: big,
    dur: 3.5 + rand() * 5,
    delay: rand() * 6,
  };
});

const sparkles = [
  { x: 6, y: 17, s: 14 },
  { x: 94, y: 31, s: 11 },
  { x: 3.5, y: 58, s: 10 },
  { x: 96, y: 71, s: 13 },
  { x: 50, y: 97, s: 9 },
  { x: 79, y: 6, s: 9 },
].map((p, i) => ({ ...p, dur: 4.5 + i * 0.9, delay: i * 1.1 }));

/* ---- the board: point lists, so lengths are exact for the pulses ---- */

type Pt = [number, number];

const traces: Pt[][] = [
  [[0, 330], [90, 330], [130, 370], [130, 620], [170, 660]],
  [[1440, 250], [1330, 250], [1290, 290], [1290, 520]],
  [[0, 980], [70, 980], [110, 1020], [110, 1300], [150, 1340], [230, 1340]],
  [[1440, 1120], [1360, 1120], [1320, 1160], [1320, 1480], [1280, 1520]],
  [[0, 1700], [150, 1700], [190, 1740], [420, 1740]],
  [[1440, 1820], [1240, 1820], [1200, 1860], [1020, 1860]],
  [[260, 0], [260, 60], [300, 100], [520, 100]],
  [[1180, 0], [1180, 80], [1140, 120], [980, 120]],
];

const toD = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
const lengthOf = (pts: Pt[]) =>
  pts.slice(1).reduce((sum, [x, y], i) => sum + Math.hypot(x - pts[i][0], y - pts[i][1]), 0);

/** Short, brighter runs laid over the board — the "lit" copper. */
const litRuns: Pt[][] = [
  [[130, 420], [130, 540]],
  [[1290, 330], [1290, 450]],
  [[110, 1080], [110, 1200]],
  [[1320, 1250], [1320, 1390]],
  [[220, 1740], [360, 1740]],
];

/** Which traces carry travelling energy, and when. */
const charged = [
  { i: 0, dur: 9, delay: 0.5 },
  { i: 3, dur: 10, delay: 3.4 },
  { i: 4, dur: 8.5, delay: 6.1 },
  { i: 1, dur: 9.5, delay: 7.8 },
];

function Pulse({ pts, dur, delay }: { pts: Pt[]; dur: number; delay: number }) {
  const d = toD(pts);
  const len = Math.round(lengthOf(pts));
  const [dash, trail, halo] = [18, 90, 50];
  const timing = { "--len": len, "--dur": `${dur}s`, "--delay": `${delay}s` } as React.CSSProperties;
  const layer = (cls: string, dsh: number, from: number, to: number) => (
    <path d={d} className={cls} style={{ ...timing, "--dash": dsh, "--from": from, "--to": to } as React.CSSProperties} />
  );
  return (
    <g>
      {layer("fz-pulse fz-pulse--halo", halo, halo, -len + halo - dash)}
      {layer("fz-pulse fz-pulse--trail", trail, trail, -len + trail - dash)}
      {layer("fz-pulse fz-pulse--head", dash, dash, -len)}
    </g>
  );
}

export function ProjectsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* faint engineering grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-25 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent_85%)]" />

      {/* warm light pools */}
      <div className="absolute left-[46%] top-[14%] h-[34%] w-[62%] bg-[radial-gradient(ellipse_at_center,rgb(var(--gold)/0.11),transparent_65%)] blur-2xl" />
      <div className="absolute -right-[10%] top-[58%] h-[30%] w-[40%] bg-[radial-gradient(ellipse_at_center,rgb(var(--gold)/0.06),transparent_65%)] blur-2xl" />
      <div className="absolute -left-[12%] top-[40%] h-[28%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgb(var(--gold)/0.05),transparent_65%)] blur-2xl" />

      {/* the board */}
      <svg
        viewBox="0 0 1440 2000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <filter id="pb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>
        {traces.map((pts, i) => (
          <path key={`t${i}`} d={toD(pts)} className="fz-trace fz-trace--t3" />
        ))}
        {traces.map((pts, i) => {
          const [x, y] = pts[pts.length - 1];
          return <circle key={`n${i}`} cx={x} cy={y} r="2.6" className="fz-node" />;
        })}
        {litRuns.map((pts, i) => (
          <g key={`l${i}`}>
            <path d={toD(pts)} stroke="rgb(var(--gold))" strokeOpacity="0.5" strokeWidth="3" filter="url(#pb-glow)" />
            <path d={toD(pts)} stroke="rgb(var(--gold-soft))" strokeOpacity="0.75" strokeWidth="1.1" />
          </g>
        ))}
        {charged.map(({ i, dur, delay }) => (
          <Pulse key={`p${i}`} pts={traces[i]} dur={dur} delay={delay} />
        ))}
      </svg>

      {/* gold dust */}
      {motes.map((m, i) => (
        <span
          key={i}
          className={m.glow ? "fz-dust fz-dust--glow" : "fz-dust"}
          style={
            {
              left: `${m.x.toFixed(2)}%`,
              top: `${m.y.toFixed(2)}%`,
              width: m.size,
              height: m.size,
              "--dur": `${m.dur.toFixed(2)}s`,
              "--delay": `${m.delay.toFixed(2)}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* four-point sparkles */}
      {sparkles.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="fz-sparkle absolute"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          <path d="M10 0 C10.6 7 13 9.4 20 10 C13 10.6 10.6 13 10 20 C9.4 13 7 10.6 0 10 C7 9.4 9.4 7 10 0 Z" />
        </svg>
      ))}
    </div>
  );
}
