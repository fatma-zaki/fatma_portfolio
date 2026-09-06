"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The orbital / electrical field the About portrait sits inside.
 *
 * Same vocabulary as the hero's `CircuitNetwork` — it reuses the very same
 * `.fz-*` classes from globals.css, so the rings, motes, traces and travelling
 * pulses are literally the same system, not a lookalike. What differs is the
 * composition: the clearing here is a tall ellipse around a head and shoulders
 * instead of a wide one around a lockup, and the circuitry is pushed to the
 * lower flanks so nothing ever crosses the face.
 *
 * Two layers:
 *   back    rings, ticks, motes, board and energy — painted behind the portrait
 *   front   two hairline arcs that pass over the dissolving lower third, which
 *           is what stops the portrait reading as a cut-out pasted on top
 *
 * `active` gates the reveal: the solid rings draw themselves in, everything
 * else fades up behind them. Idle motion is CSS, exactly as in the hero.
 */

const VIEW = 1000;
/** The field's centre — below the frame's middle, so the face sits high. */
const CX = 500;
const CY = 470;

interface Ring {
  rx: number;
  ry: number;
  w: number;
  o: number;
  dash?: string;
  rotate: number;
  spin?: number;
  reverse?: boolean;
  /** Solid rings draw themselves in; dashed ones fade up. */
  draw?: boolean;
  /** Hidden below `sm` so the mobile field is a simpler composition. */
  gate?: string;
}

/*
  Radii are bounded by the viewBox: an SVG root clips to its viewport, so
  anything past cx±500 / cy+530 / cy-470 would be cut off mid-arc. They are
  also bounded from below by the portrait — the supplied photograph carries its
  own ring artwork around the head, so this field starts *at* the silhouette
  and works outward rather than adding a second system on top of the first.

  Ring 1 is the silhouette ring: at the wrapper's 1.30× scale its diameter is
  almost exactly the portrait's width, so it arcs over her head and passes
  behind her shoulders.
*/
const rings: Ring[] = [
  { rx: 392, ry: 386, w: 1.4, o: 0.3, rotate: 0, draw: true },
  { rx: 440, ry: 432, w: 1.1, o: 0.2, dash: "184 44 92 44", rotate: -22, spin: 260, reverse: true },
  { rx: 492, ry: 462, w: 1, o: 0.11, rotate: 0, draw: true, gate: "fz-d-mid" },
];

/** Bearing ticks around the r≈416 orbit. */
const ticks = Array.from({ length: 36 }, (_, i) => {
  const rad = ((i * 10 - 90) * Math.PI) / 180;
  const major = i % 6 === 0;
  const inner = 412;
  const outer = inner + (major ? 14 : 7);
  const r = (d: number) => Math.round(d * 10) / 10;
  return {
    id: `ptick-${i}`,
    x1: r(CX + Math.cos(rad) * inner),
    y1: r(CY + Math.sin(rad) * inner * 0.98),
    x2: r(CX + Math.cos(rad) * outer),
    y2: r(CY + Math.sin(rad) * outer * 0.98),
    major,
  };
});

interface BranchSpec {
  from: [number, number];
  segs: Array<[number, number]>;
  tier: 1 | 2 | 3;
  cap: number | null;
  energy?: { dash: number; trail: number; dur: number; delay: number };
  gate?: string;
}

/**
 * The board. Everything leaves the lower flanks of the clearing and runs out
 * of frame or into a terminal node — the upper half is left dark on purpose so
 * the face keeps the light.
 */
const BRANCHES: BranchSpec[] = [
  /* lower right */
  {
    from: [706, 640],
    segs: [[54, 54], [140, 0], [40, 40]],
    tier: 1,
    cap: 5.4,
    energy: { dash: 30, trail: 132, dur: 13.5, delay: 1.2 },
  },
  {
    from: [742, 566],
    segs: [[62, 0], [46, -46], [120, 0]],
    tier: 1,
    cap: 2.6,
    energy: { dash: 18, trail: 66, dur: 9.2, delay: 6.4 },
  },
  { from: [900, 694], segs: [[44, 44], [36, 0]], tier: 2, cap: 3.6, gate: "fz-d-mid" },
  { from: [850, 480], segs: [[0, -58], [44, -44]], tier: 2, cap: 3.6, gate: "fz-d-mid" },
  { from: [938, 378], segs: [[0, -46], [36, 0]], tier: 3, cap: 2.3, gate: "fz-d-full" },

  /* lower left */
  {
    from: [294, 640],
    segs: [[-52, 52], [-130, 0], [-44, 44]],
    tier: 1,
    cap: 5.4,
    energy: { dash: 24, trail: 104, dur: 11.8, delay: 9.6 },
  },
  {
    from: [258, 566],
    segs: [[-58, 0], [-44, -44], [-104, 0]],
    tier: 1,
    cap: 2.6,
  },
  { from: [112, 706], segs: [[-40, 40], [-52, 0]], tier: 2, cap: 3.6, gate: "fz-d-mid" },
  {
    from: [150, 470],
    segs: [[0, -56], [-46, -46]],
    tier: 2,
    cap: 3.6,
    energy: { dash: 16, trail: 60, dur: 8.4, delay: 3.9 },
    gate: "fz-d-mid",
  },
  { from: [62, 366], segs: [[0, -44], [-34, 0]], tier: 3, cap: 2.3, gate: "fz-d-full" },

  /* the crown — two short taps only, well clear of the head */
  { from: [636, 178], segs: [[46, -46], [90, 0]], tier: 2, cap: 3.6, gate: "fz-d-mid" },
  { from: [364, 178], segs: [[-46, -46], [-84, 0]], tier: 2, cap: 3.6, gate: "fz-d-mid" },
];

/** Expand the specs once at module scope — the geometry never changes. */
const board = BRANCHES.map((spec, i) => {
  let x = spec.from[0];
  let y = spec.from[1];
  let len = 0;
  let d = `M${x} ${y}`;
  const joints: Array<[number, number]> = [];

  spec.segs.forEach(([dx, dy], s) => {
    d += `l${dx} ${dy}`;
    len += Math.hypot(dx, dy);
    x += dx;
    y += dy;
    if (s < spec.segs.length - 1) joints.push([x, y]);
  });

  return {
    id: `pb${i}`,
    d,
    len: Math.round(len * 10) / 10,
    tier: spec.tier,
    gate: spec.gate ?? "",
    energy: spec.energy,
    origin: spec.from,
    joints,
    cap: spec.cap === null ? null : { x, y, r: spec.cap },
  };
});

/** Motes, seeded so server and client agree byte for byte. */
const motes = (() => {
  let a = 0x3f19;
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = (n: number) => Math.round(n * 10) / 10;

  return Array.from({ length: 26 }, (_, i) => {
    // Weighted onto the flanks and the lower field — never over the face.
    const deg = -34 + rand() * 248;
    const rad = (deg * Math.PI) / 180;
    // Clear of the silhouette ring, inside the viewBox at every bearing.
    const dist = 310 + rand() * 155;
    return {
      id: `pm${i}`,
      x: r(CX + Math.cos(rad) * dist),
      y: r(CY + Math.sin(rad) * dist),
      rr: r(0.7 + rand() * 1.4),
      delay: r(rand() * 9),
      dur: r(4.5 + rand() * 5),
      gate: i % 3 === 0 ? "" : i % 3 === 1 ? "fz-d-mid" : "fz-d-full",
    };
  });
})();

/** Radial emission off the clearing's lower arc. */
const radials = [16, 32, 49, 66, 84, 96, 114, 131, 148, 164].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  // Struck across the silhouette ring, so the seam reads as emission from her.
  const from = 350;
  const to = from + 22 + ((i * 37) % 36);
  const r = (n: number) => Math.round(n * 10) / 10;
  return {
    id: `pr${i}`,
    x1: r(CX + Math.cos(rad) * from),
    y1: r(CY + Math.sin(rad) * from),
    x2: r(CX + Math.cos(rad) * to),
    y2: r(CY + Math.sin(rad) * to),
    delay: r((i * 0.79) % 6),
    dur: 5 + (i % 4),
  };
});

const ringDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.8, delay: 0.25 + i * 0.22, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.5, delay: 0.25 + i * 0.22 },
    },
  }),
};

export function PortraitField({
  active,
  className,
}: {
  active: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full h-full pointer-events-none select-none", className)}
      fill="none"
    >
      {/* ---------- orbital rings ---------- */}
      {rings.map((ring, i) => (
        <g
          key={`pring-${i}`}
          className={cn(
            ring.gate,
            ring.spin && "fz-ring-spin",
            ring.spin && ring.reverse && "fz-ring-spin--rev"
          )}
          style={
            ring.spin
              ? ({ "--spin": `${ring.spin}s`, transformOrigin: `${CX}px ${CY}px` } as React.CSSProperties)
              : undefined
          }
        >
          {ring.draw ? (
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={ring.rx}
              ry={ring.ry}
              className="fz-ring"
              strokeWidth={ring.w}
              style={{ "--o": ring.o } as React.CSSProperties}
              transform={`rotate(${ring.rotate} ${CX} ${CY})`}
              variants={ringDraw}
              custom={i}
              initial="hidden"
              animate={active ? "visible" : "hidden"}
            />
          ) : (
            <motion.ellipse
              cx={CX}
              cy={CY}
              rx={ring.rx}
              ry={ring.ry}
              className="fz-ring"
              strokeWidth={ring.w}
              strokeDasharray={ring.dash}
              style={{ "--o": ring.o } as React.CSSProperties}
              transform={`rotate(${ring.rotate} ${CX} ${CY})`}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.18 }}
            />
          )}
        </g>
      ))}

      {/* ---------- bearing ticks ---------- */}
      <motion.g
        className="fz-bg fz-d-mid"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.9 }}
      >
        {ticks.map((tick) => (
          <line
            key={tick.id}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            className={cn("fz-tick", tick.major && "fz-tick--major")}
          />
        ))}
      </motion.g>

      {/* ---------- radial emission off the clearing ---------- */}
      <motion.g
        className="fz-d-mid"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.1 }}
      >
        {radials.map((ray) => (
          <line
            key={ray.id}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            className="fz-radial"
            style={{ "--dur": `${ray.dur}s`, "--delay": `${ray.delay}s` } as React.CSSProperties}
          />
        ))}
      </motion.g>

      {/* ---------- motes ---------- */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 1.2 }}
      >
        {motes.map((mote) => (
          <circle
            key={mote.id}
            cx={mote.x}
            cy={mote.y}
            r={mote.rr}
            className={cn("fz-mote", mote.gate)}
            style={{ "--dur": `${mote.dur}s`, "--delay": `${mote.delay}s` } as React.CSSProperties}
          />
        ))}
      </motion.g>

      {/* ---------- the board, then the energy on it ---------- */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.85 }}
      >
        {board.map((b) => (
          <path
            key={b.id}
            d={b.d}
            className={cn("fz-trace", `fz-trace--t${b.tier}`, b.gate)}
          />
        ))}

        {board.map((b) => {
          if (!b.energy) return null;
          const { dash, trail, dur, delay } = b.energy;
          const halo = Math.round(trail * 0.55);
          const timing = {
            "--len": b.len,
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
          } as React.CSSProperties;

          const layer = (name: string, d: number, from: number, to: number) => (
            <path
              d={b.d}
              className={name}
              style={{ ...timing, "--dash": d, "--from": from, "--to": to } as React.CSSProperties}
            />
          );

          return (
            <g key={`pe-${b.id}`} className={b.gate}>
              {layer("fz-pulse fz-pulse--halo", halo, halo, -b.len + halo - dash)}
              {layer("fz-pulse fz-pulse--trail", trail, trail, -b.len + trail - dash)}
              {layer("fz-pulse fz-pulse--head", dash, dash, -b.len)}
            </g>
          );
        })}

        {/* connection points: origins, solder joints, and the terminals that fire */}
        {board.map((b) => (
          <g key={`pn-${b.id}`} className={b.gate}>
            <circle cx={b.origin[0]} cy={b.origin[1]} r={b.tier === 1 ? 3 : 2.1} className="fz-node" />
            {b.joints.map(([jx, jy], j) => (
              <circle key={`${b.id}-j${j}`} cx={jx} cy={jy} r={b.tier === 1 ? 2 : 1.5} className="fz-node" />
            ))}
            {b.cap &&
              (b.energy ? (
                <g
                  style={
                    { "--dur": `${b.energy.dur}s`, "--delay": `${b.energy.delay}s` } as React.CSSProperties
                  }
                >
                  <circle cx={b.cap.x} cy={b.cap.y} r={b.cap.r + 5} className="fz-node__flash" />
                  <circle cx={b.cap.x} cy={b.cap.y} r={b.cap.r} className="fz-node fz-node--fires" />
                </g>
              ) : (
                <circle cx={b.cap.x} cy={b.cap.y} r={b.cap.r} className="fz-node" />
              ))}
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

/**
 * The two hairline arcs that pass *in front of* the portrait, low down where
 * it is already dissolving. Small detail, large effect: it is what makes the
 * portrait sit inside the field rather than on top of it.
 */
export function PortraitForeArcs({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="xMidYMid meet"
      className="fz-fore-arcs absolute inset-0 w-full h-full pointer-events-none select-none"
      fill="none"
    >
      <motion.ellipse
        cx={CX}
        cy={CY}
        rx={392}
        ry={386}
        className="fz-ring"
        strokeWidth={1.4}
        style={{ "--o": 0.34 } as React.CSSProperties}
        variants={ringDraw}
        custom={1}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      />
      <motion.ellipse
        cx={CX}
        cy={CY}
        rx={440}
        ry={432}
        className="fz-ring fz-d-mid"
        strokeWidth={1}
        style={{ "--o": 0.2 } as React.CSSProperties}
        variants={ringDraw}
        custom={2}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
      />
    </svg>
  );
}
