/**
 * The FZ circuit composition.
 *
 * Hand-authored, not generated: the monogram is the power core, and every
 * path in the system starts either at the core itself or at a node on a
 * path that does. Nothing floats free.
 *
 *   tier 1  trunks      leave the core, run long, end in a large node
 *                       (or run off the edge of the artwork)
 *   tier 2  branches    split off a trunk at a junction, end in a medium node
 *   tier 3  taps        short stubs off a branch, end in a small node
 *
 * Coordinates are in a 1000×1000 field with the FZ lockup centred at
 * (500, 500). The official asset is 2.27:1 and carries its own circuit
 * wings, so it occupies roughly x 190–810 by y 364–636: the clearing is
 * a wide ellipse, and every trunk starts outside it.
 */

export const VIEW = 1000;
export const CORE = 500;

type Tier = 1 | 2 | 3;
type Cap = "large" | "medium" | "small" | null;

interface BranchSpec {
  tier: Tier;
  /** Origin: the core tap for trunks, a junction on the parent otherwise. */
  from: [number, number];
  segs: Array<[number, number]>;
  /** `null` means the path runs off the edge instead of terminating. */
  cap: Cap;
  /** Only a handful of branches transmit; the rest stay dormant. */
  energy?: { dur: number; delay: number; surge?: boolean };
}

const BRANCHES: BranchSpec[] = [
  /* ---------- tier 1 — trunks out of the core ---------- */
  {
    tier: 1,
    from: [660, 360],
    segs: [[54, -54], [168, 0], [44, -44], [28, 0]],
    cap: "large",
    energy: { dur: 11.4, delay: 0.6, surge: true },
  },
  {
    tier: 1,
    from: [836, 498],
    segs: [[80, 0], [46, -46], [120, 0]],
    cap: null, // runs off the right edge
  },
  {
    tier: 1,
    from: [658, 640],
    segs: [[52, 52], [142, 0], [40, 40], [64, 0]],
    cap: "large",
    energy: { dur: 13.7, delay: 4.9 },
  },
  {
    tier: 1,
    from: [498, 676],
    segs: [[0, 78], [56, 56], [186, 0], [48, 48], [96, 0]],
    cap: "large",
    energy: { dur: 15.2, delay: 9.4 },
  },
  {
    tier: 1,
    from: [528, 332],
    segs: [[0, -72], [52, -52], [152, 0]],
    cap: "large",
  },
  {
    tier: 1,
    from: [164, 470],
    segs: [[-46, -46], [-84, 0]],
    cap: "large",
    energy: { dur: 12.3, delay: 15.8 },
  },

  /* ---------- tier 2 — branches off the trunks ---------- */
  {
    tier: 2,
    from: [882, 306], // junction on trunk 1
    segs: [[46, 46], [68, 0]],
    cap: "medium",
  },
  {
    tier: 2,
    from: [916, 498], // junction on trunk 2
    segs: [[46, 46], [30, 0]],
    cap: "medium",
    energy: { dur: 9.8, delay: 2.7 },
  },
  {
    tier: 2,
    from: [852, 692], // junction on trunk 3
    segs: [[44, -44], [92, 0]],
    cap: "medium",
  },
  {
    tier: 2,
    from: [554, 810], // junction on trunk 4
    segs: [[-52, 52], [-108, 0]],
    cap: "medium",
  },
  {
    tier: 2,
    from: [660, 208], // junction on trunk 5
    segs: [[0, -58], [46, -46], [74, 0]],
    cap: "medium",
    energy: { dur: 10.6, delay: 7.3, surge: true },
  },
  {
    tier: 2,
    from: [118, 424], // junction on trunk 6
    segs: [[0, -58], [-46, -46]],
    cap: "medium",
  },

  /* ---------- tier 3 — short taps ---------- */
  { tier: 3, from: [926, 262], segs: [[0, -52], [40, 0]], cap: "small" },
  { tier: 3, from: [962, 452], segs: [[0, -56], [36, -36]], cap: "small" },
  {
    tier: 3,
    from: [892, 732],
    segs: [[0, 52], [44, 0]],
    cap: "small",
    energy: { dur: 8.9, delay: 12.1 },
  },
  { tier: 3, from: [788, 858], segs: [[0, 48], [40, 0]], cap: "small" },
  { tier: 3, from: [928, 352], segs: [[0, 54], [38, 38]], cap: "small" },
  { tier: 3, from: [962, 544], segs: [[-46, 46], [-70, 0]], cap: "small" },
];

/* -------------------------------------------------------------------------- */

const round = (n: number) => Math.round(n * 10) / 10;

/** Head of the travelling pulse — short and bright. */
const CORE_DASH = 24;

export interface Branch {
  d: string;
  len: number;
  tier: Tier;
  live: boolean;
  surge: boolean;
  /** Longer, dimmer segment dragged behind the bright head. */
  trailDash: number;
  dur: number;
  delay: number;
}

export interface CircuitNode {
  x: number;
  y: number;
  r: number;
  /** Ignites when a pulse lands here; otherwise sits dim. */
  fires: boolean;
  dur: number;
  delay: number;
}

const capRadius: Record<Exclude<Cap, null>, number> = {
  large: 6,
  medium: 4,
  small: 2.6,
};

export const branches: Branch[] = [];
export const nodes: CircuitNode[] = [];

for (const spec of BRANCHES) {
  let x = spec.from[0];
  let y = spec.from[1];
  let len = 0;
  let d = `M${x} ${y}`;

  for (const [dx, dy] of spec.segs) {
    d += `l${dx} ${dy}`;
    len += Math.hypot(dx, dy);
    x += dx;
    y += dy;
  }

  const energy = spec.energy;

  branches.push({
    d,
    len: round(len),
    tier: spec.tier,
    live: Boolean(energy),
    surge: Boolean(energy?.surge),
    trailDash: energy?.surge ? 132 : 88,
    dur: energy?.dur ?? 0,
    delay: energy?.delay ?? 0,
  });

  // Every origin is a real connection point in the system.
  nodes.push({
    x: spec.from[0],
    y: spec.from[1],
    r: spec.tier === 1 ? 3.4 : 2.4,
    fires: false,
    dur: 0,
    delay: 0,
  });

  // Terminating node — ignites on arrival when the branch is live.
  if (spec.cap) {
    nodes.push({
      x: round(x),
      y: round(y),
      r: capRadius[spec.cap],
      fires: Boolean(energy),
      dur: energy?.dur ?? 0,
      delay: energy?.delay ?? 0,
    });
  }
}

/**
 * Pulse offsets.
 *
 * A dash of length D on `stroke-dasharray: D len` sits at path positions
 * [-offset, -offset + D]. To sweep the whole path the offset must run from
 * D (just before the start) down to -len (just past the end).
 *
 * The trail shares the head's position by running the same distance from an
 * offset shifted by (trailDash - CORE_DASH), so both segments keep a common
 * leading edge and travel at identical speed.
 */
export function pulseOffsets(branch: Branch) {
  return {
    core: { dash: CORE_DASH, start: CORE_DASH, end: -branch.len },
    trail: {
      dash: branch.trailDash,
      start: branch.trailDash,
      end: round(-branch.len + branch.trailDash - CORE_DASH),
    },
  };
}

/**
 * Background atmosphere: huge partial rings and construction lines, sitting
 * at 3–8% so they read as depth rather than decoration.
 */
export const atmosphere = {
  rings: [
    { r: 430, dash: "420 260 700 400", rotate: -24 },
    { r: 620, dash: "900 380 300 900", rotate: 58 },
    { r: 860, dash: "1400 700 500 1600", rotate: 12 },
  ],
  guides: [
    `M0 ${CORE} H${VIEW}`,
    `M${CORE} 0 V${VIEW}`,
  ],
};
