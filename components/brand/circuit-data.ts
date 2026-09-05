/**
 * The FZ electrical field.
 *
 * Hand-authored, not generated: the monogram is the power core, and every
 * path in the system starts either at the core's clearing or at a junction
 * on a path that does. Nothing floats free.
 *
 *   tier 1  trunks      leave the core, run long, end in a large node
 *                       (or run off the edge of the artwork)
 *   tier 2  branches    split off a trunk at a junction, end in a medium node
 *   tier 3  taps        short stubs off a branch, end in a small node
 *
 * Tier also drives density: trunks are the mobile composition, branches join
 * on tablet, taps only on desktop. The field thickens with the viewport
 * instead of being scaled down whole.
 *
 * Coordinates are in a 1000×1000 field with the FZ lockup centred at
 * (500, 500). The official asset is 2.27:1, so it occupies roughly
 * x 190–810 by y 364–636: the clearing is a wide ellipse, and every trunk
 * starts outside it.
 *
 * Distribution is deliberately uneven. The right flank and the lower right
 * are dense, the upper left is left dark — the rhythm comes from the gaps.
 */

export const VIEW = 1000;
export const CORE = 500;

type Tier = 1 | 2 | 3;
type Cap = "large" | "medium" | "small" | null;
/** Pulse character. `fast` is a spark, `surge` is a rare bright swell. */
type Charge = "fast" | "medium" | "surge";

interface BranchSpec {
  tier: Tier;
  /** Origin: the core tap for trunks, a junction on the parent otherwise. */
  from: [number, number];
  segs: Array<[number, number]>;
  /** `null` means the path runs off the edge instead of terminating. */
  cap: Cap;
  /** Only some branches transmit; the rest hold the structure. */
  energy?: { kind: Charge; delay: number };
}

const BRANCHES: BranchSpec[] = [
  /* ================= tier 1 — trunks out of the core ================= */

  /* -- upper-right cluster: the densest quarter -- */
  {
    tier: 1,
    from: [648, 352],
    segs: [[56, -56], [150, 0], [46, -46], [40, 0]],
    cap: "large",
    energy: { kind: "surge", delay: 0.4 },
  },
  {
    tier: 1,
    from: [690, 386],
    segs: [[40, -40], [210, 0], [30, 30], [60, 0]],
    cap: null, // off the right edge
    energy: { kind: "fast", delay: 6.2 },
  },

  /* -- right flank: horizontals crossing out of frame -- */
  {
    tier: 1,
    from: [838, 486],
    segs: [[70, 0], [44, -44], [110, 0]],
    cap: null,
    energy: { kind: "medium", delay: 2.9 },
  },
  {
    tier: 1,
    from: [836, 520],
    segs: [[60, 0], [40, 40], [130, 0]],
    cap: null,
    energy: { kind: "fast", delay: 11.7 },
  },

  /* -- lower-right cluster -- */
  {
    tier: 1,
    from: [664, 636],
    segs: [[52, 52], [150, 0], [42, 42], [70, 0]],
    cap: "large",
    energy: { kind: "medium", delay: 8.1 },
  },
  {
    tier: 1,
    from: [612, 660],
    segs: [[0, 64], [48, 48], [120, 0], [36, 36]],
    cap: "large",
  },
  {
    tier: 1,
    from: [496, 672],
    segs: [[0, 80], [54, 54], [180, 0], [46, 46], [90, 0]],
    cap: "large",
    energy: { kind: "surge", delay: 14.6 },
  },

  /* -- left flank: fewer, but they reach the edge -- */
  {
    tier: 1,
    from: [170, 468],
    segs: [[-48, -48], [-90, 0], [-34, -34]],
    cap: null,
    energy: { kind: "medium", delay: 4.7 },
  },
  {
    tier: 1,
    from: [178, 532],
    segs: [[-46, 46], [-96, 0], [-40, 40]],
    cap: null,
  },
  {
    tier: 1,
    from: [352, 646],
    segs: [[-44, 44], [-130, 0]],
    cap: "large",
    energy: { kind: "fast", delay: 17.3 },
  },

  /* -- top: the crown over the mark -- */
  {
    tier: 1,
    from: [534, 334],
    segs: [[0, -74], [50, -50], [140, 0]],
    cap: "large",
    energy: { kind: "medium", delay: 12.4 },
  },
  {
    tier: 1,
    from: [452, 336],
    segs: [[0, -56], [-46, -46], [-110, 0]],
    cap: "large",
  },
  /* upper left stays sparse on purpose — one trunk only */
  {
    tier: 1,
    from: [280, 372],
    segs: [[-40, -40], [-120, 0], [-40, -40]],
    cap: "large",
  },

  /* ================= tier 2 — branches off the trunks ================= */

  /* upper-right */
  {
    tier: 2,
    from: [854, 296],
    segs: [[0, -58], [44, -44], [56, 0]],
    cap: "medium",
    energy: { kind: "fast", delay: 1.8 },
  },
  { tier: 2, from: [704, 296], segs: [[0, -52], [46, -46]], cap: "medium" },
  {
    tier: 2,
    from: [940, 346],
    segs: [[0, 58], [40, 40]],
    cap: "medium",
    energy: { kind: "fast", delay: 9.6 },
  },
  { tier: 2, from: [730, 346], segs: [[0, -46], [-40, -40]], cap: "medium" },

  /* right flank */
  {
    tier: 2,
    from: [908, 486],
    segs: [[0, -52], [46, -46]],
    cap: "medium",
    energy: { kind: "medium", delay: 15.9 },
  },
  { tier: 2, from: [896, 520], segs: [[0, 56], [42, 42]], cap: "medium" },

  /* lower-right */
  {
    tier: 2,
    from: [866, 688],
    segs: [[44, -44], [80, 0]],
    cap: "medium",
    energy: { kind: "fast", delay: 3.5 },
  },
  { tier: 2, from: [716, 688], segs: [[0, 60], [46, 46]], cap: "medium" },
  {
    tier: 2,
    from: [660, 772],
    segs: [[-48, 48], [-96, 0]],
    cap: "medium",
    energy: { kind: "medium", delay: 19.2 },
  },
  { tier: 2, from: [780, 772], segs: [[0, -52], [40, -40]], cap: "medium" },

  /* bottom */
  { tier: 2, from: [550, 806], segs: [[-50, 50], [-110, 0]], cap: "medium" },
  {
    tier: 2,
    from: [730, 806],
    segs: [[0, 58], [44, 44]],
    cap: "medium",
    energy: { kind: "fast", delay: 7.4 },
  },

  /* left flank */
  {
    tier: 2,
    from: [122, 420],
    segs: [[0, -56], [-44, -44]],
    cap: "medium",
    energy: { kind: "medium", delay: 10.8 },
  },
  { tier: 2, from: [132, 578], segs: [[0, 58], [-46, 46]], cap: "medium" },
  { tier: 2, from: [308, 690], segs: [[0, 56], [-44, 44]], cap: "medium" },

  /* crown */
  {
    tier: 2,
    from: [584, 210],
    segs: [[0, -56], [46, -46], [60, 0]],
    cap: "medium",
    energy: { kind: "surge", delay: 5.6 },
  },
  { tier: 2, from: [406, 234], segs: [[0, -52], [-42, -42]], cap: "medium" },
  { tier: 2, from: [240, 332], segs: [[0, -58], [-44, -44]], cap: "medium" },

  /* ================= tier 3 — short taps ================= */
  { tier: 3, from: [900, 250], segs: [[0, -46], [38, 0]], cap: "small" },
  { tier: 3, from: [898, 194], segs: [[0, -44], [34, 0]], cap: "small" },
  {
    tier: 3,
    from: [954, 388],
    segs: [[0, -48], [34, -34]],
    cap: "small",
    energy: { kind: "fast", delay: 13.1 },
  },
  { tier: 3, from: [936, 560], segs: [[0, 60], [36, 0]], cap: "small" },
  {
    tier: 3,
    from: [938, 618],
    segs: [[0, 50], [34, 0]],
    cap: "small",
    energy: { kind: "fast", delay: 18.4 },
  },
  { tier: 3, from: [910, 644], segs: [[0, -46], [34, -34]], cap: "small" },
  { tier: 3, from: [908, 730], segs: [[0, 54], [40, 0]], cap: "small" },
  { tier: 3, from: [762, 794], segs: [[0, 48], [36, 0]], cap: "small" },
  { tier: 3, from: [612, 820], segs: [[0, 54], [-36, 36]], cap: "small" },
  { tier: 3, from: [776, 852], segs: [[0, 48], [36, 0]], cap: "small" },
  { tier: 3, from: [774, 908], segs: [[0, 44], [34, 0]], cap: "small" },
  {
    tier: 3,
    from: [690, 108],
    segs: [[0, -44], [36, 0]],
    cap: "small",
    energy: { kind: "fast", delay: 16.2 },
  },
  { tier: 3, from: [724, 210], segs: [[0, -48], [40, 0]], cap: "small" },
  { tier: 3, from: [296, 234], segs: [[0, -46], [-36, -36]], cap: "small" },
  { tier: 3, from: [78, 320], segs: [[0, -44], [-30, -30]], cap: "small" },
  { tier: 3, from: [32, 420], segs: [[0, -50], [-32, 0]], cap: "small" },
  { tier: 3, from: [36, 578], segs: [[0, 54], [-36, 0]], cap: "small" },
  { tier: 3, from: [86, 682], segs: [[0, 46], [-32, 32]], cap: "small" },
  { tier: 3, from: [196, 230], segs: [[0, -42], [-32, -32]], cap: "small" },
];

/* -------------------------------------------------------------------------- */

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Pulse character. `dash` is the length of the bright head; `dur` is the
 * whole cycle, of which only ACTIVE_FRACTION is spent transmitting — the
 * rest of the time the branch lies dark waiting for its next turn.
 */
const CHARGE: Record<Charge, { dash: number; trail: number; dur: number }> = {
  fast: { dash: 16, trail: 62, dur: 8 },
  medium: { dash: 24, trail: 104, dur: 12.5 },
  surge: { dash: 34, trail: 150, dur: 19 },
};

/**
 * Fraction of a cycle a branch is lit. Kept low on purpose: with ~19 live
 * branches this leaves roughly three or four alight at any moment, which is
 * the difference between "alive" and "busy".
 */
export const ACTIVE_FRACTION = 0.2;

/** Density band — mirrors the tiers, drives the responsive composition. */
export type Density = "core" | "mid" | "full";

const densityForTier: Record<Tier, Density> = {
  1: "core",
  2: "mid",
  3: "full",
};

export interface Branch {
  id: string;
  d: string;
  len: number;
  tier: Tier;
  density: Density;
  live: boolean;
  surge: boolean;
  dash: number;
  /** Longer, dimmer segment dragged behind the bright head. */
  trailDash: number;
  dur: number;
  delay: number;
}

export interface CircuitNode {
  id: string;
  x: number;
  y: number;
  r: number;
  density: Density;
  /** Ignites when a pulse lands here; otherwise sits dim. */
  fires: boolean;
  surge: boolean;
  dur: number;
  delay: number;
}

const capRadius: Record<Exclude<Cap, null>, number> = {
  large: 5.6,
  medium: 3.8,
  small: 2.4,
};

export const branches: Branch[] = [];
export const nodes: CircuitNode[] = [];

BRANCHES.forEach((spec, i) => {
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

  const charge = spec.energy ? CHARGE[spec.energy.kind] : null;
  const density = densityForTier[spec.tier];

  /*
    Every live branch gets its own period. Branches sharing a duration stay
    phase-locked forever, so any two that happened to fire together would
    fire together on every cycle — the field would visibly loop. An
    irrational-ish jitter per branch means clusters form, drift apart and
    re-form somewhere else, and the composition never repeats.
  */
  const dur = charge ? round(charge.dur + ((i * 1.618) % 3.4) - 1.7) : 0;

  branches.push({
    id: `b${i}`,
    d,
    len: round(len),
    tier: spec.tier,
    density,
    live: Boolean(charge),
    surge: spec.energy?.kind === "surge",
    dash: charge?.dash ?? 0,
    trailDash: charge?.trail ?? 0,
    dur,
    delay: spec.energy?.delay ?? 0,
  });

  // Every origin is a real connection point in the system.
  nodes.push({
    id: `o${i}`,
    x: spec.from[0],
    y: spec.from[1],
    r: spec.tier === 1 ? 3.2 : 2.2,
    density,
    fires: false,
    surge: false,
    dur: 0,
    delay: 0,
  });

  // Mid-path junctions read as solder points and give the eye somewhere to
  // rest between the origin and the terminal.
  let jx = spec.from[0];
  let jy = spec.from[1];
  spec.segs.slice(0, -1).forEach(([dx, dy], s) => {
    jx += dx;
    jy += dy;
    if (jx < -20 || jx > VIEW + 20 || jy < -20 || jy > VIEW + 20) return;
    nodes.push({
      id: `j${i}-${s}`,
      x: round(jx),
      y: round(jy),
      r: spec.tier === 1 ? 2.1 : 1.5,
      density,
      fires: false,
      surge: false,
      dur: 0,
      delay: 0,
    });
  });

  // Terminating node — ignites on arrival when the branch is live.
  if (spec.cap) {
    nodes.push({
      id: `t${i}`,
      x: round(x),
      y: round(y),
      r: capRadius[spec.cap],
      density,
      fires: Boolean(charge),
      surge: spec.energy?.kind === "surge",
      dur,
      delay: spec.energy?.delay ?? 0,
    });
  }
});

/**
 * Pulse offsets.
 *
 * A dash of length D on `stroke-dasharray: D len` sits at path positions
 * [-offset, -offset + D]. To sweep the whole path the offset must run from
 * D (just before the start) down to -len (just past the end).
 *
 * Trail and halo share the head's position by running the same distance from
 * an offset shifted by (theirDash - headDash), so every layer keeps a common
 * leading edge and travels at identical speed.
 */
export function pulseOffsets(branch: Branch) {
  const shifted = (dash: number) => ({
    dash,
    start: dash,
    end: round(-branch.len + dash - branch.dash),
  });

  return {
    core: { dash: branch.dash, start: branch.dash, end: -branch.len },
    trail: shifted(branch.trailDash),
    halo: shifted(Math.round(branch.trailDash * 0.55)),
  };
}

/* -------------------------------------------------------------------------- */
/*  Orbital field                                                             */
/* -------------------------------------------------------------------------- */

export interface Ring {
  r: number;
  /** stroke-width */
  w: number;
  /** stroke alpha */
  o: number;
  dash?: string;
  rotate: number;
  /** Vertical squash — the field is read at an angle, not head-on. */
  squash: number;
  /** Seconds for a full revolution; omitted rings hold still. */
  spin?: number;
  /** Counter-rotation, so neighbouring rings never drift in lockstep. */
  reverse?: boolean;
  density: Density;
}

/**
 * Concentric orbital guides. Radii, weights and gaps all vary — these are
 * meant to read as electromagnetic field lines and technical orbit markers,
 * not as decorative circles behind a logo. The outer two run past the frame.
 */
export const rings: Ring[] = [
  { r: 196, w: 0.9, o: 0.13, dash: "2 11", rotate: 0, squash: 0.93, spin: 240, density: "mid" },
  { r: 248, w: 1.1, o: 0.22, dash: "128 26 54 26", rotate: -18, squash: 0.9, spin: 180, reverse: true, density: "core" },
  { r: 300, w: 1.5, o: 0.3, rotate: 0, squash: 0.87, density: "core" },
  { r: 346, w: 0.9, o: 0.15, dash: "6 15", rotate: 22, squash: 0.89, spin: 300, density: "full" },
  { r: 398, w: 1.7, o: 0.27, dash: "470 92 214 92", rotate: -40, squash: 0.92, spin: 220, reverse: true, density: "core" },
  { r: 452, w: 1, o: 0.17, dash: "19 23", rotate: 8, squash: 0.95, density: "mid" },
  { r: 516, w: 1.3, o: 0.21, dash: "706 162 322 190", rotate: 64, squash: 0.98, spin: 340, density: "core" },
  { r: 640, w: 0.9, o: 0.11, dash: "900 380 300 900", rotate: 118, squash: 1, density: "mid" },
  { r: 812, w: 1.2, o: 0.08, dash: "1240 520 660 900", rotate: -12, squash: 1, density: "full" },
];

/** Bearing ticks around the r=346 orbit — background technical geometry. */
export const ticks = Array.from({ length: 48 }, (_, i) => {
  const deg = i * 7.5;
  const rad = (deg * Math.PI) / 180;
  const major = i % 6 === 0;
  const inner = 340;
  const outer = inner + (major ? 13 : 6);
  return {
    id: `k${i}`,
    x1: round(CORE + Math.cos(rad) * inner),
    y1: round(CORE + Math.sin(rad) * inner * 0.89),
    x2: round(CORE + Math.cos(rad) * outer),
    y2: round(CORE + Math.sin(rad) * outer * 0.89),
    major,
  };
});

/**
 * The clearing. The lockup is 2.27:1 and sits centred, so the space it
 * occupies is a wide ellipse — not a circle. Everything in the field starts
 * outside this boundary, which is why the artwork never crowds the mark.
 */
const CLEAR_RX = 336;
const CLEAR_RY = 154;

/** Distance from the core to the edge of the clearing along a bearing. */
function clearingEdge(rad: number) {
  const cx = Math.cos(rad) / CLEAR_RX;
  const cy = Math.sin(rad) / CLEAR_RY;
  return 1 / Math.hypot(cx, cy);
}

/**
 * Radial traces leaving the clearing — the visible seam between the mark and
 * the network. Because they start on the ellipse rather than on a circle,
 * they hug the lockup's silhouette and read as emission from it instead of
 * as spokes on a wheel. Angles are deliberately uneven.
 */
export const radials = [
  -74, -58, -37, -21, -8, 6, 19, 34, 52, 71, 106, 124, 143, 161, 178, 196, 214,
  238, 254, 288, 306, 322,
].map((deg, i) => {
  const rad = (deg * Math.PI) / 180;
  const from = clearingEdge(rad) + 12;
  const to = from + 30 + ((i * 53) % 46);
  return {
    id: `r${i}`,
    x1: round(CORE + Math.cos(rad) * from),
    y1: round(CORE + Math.sin(rad) * from),
    x2: round(CORE + Math.cos(rad) * to),
    y2: round(CORE + Math.sin(rad) * to),
    /** Staggered shimmer so the seam breathes instead of blinking together. */
    delay: round((i * 0.83) % 7),
    dur: 5 + (i % 4),
  };
});

/* -------------------------------------------------------------------------- */
/*  Field particles                                                           */
/* -------------------------------------------------------------------------- */

/** Deterministic, so server and client render byte-identical markup. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Motes suspended in the field. Weighted onto the arcs that already carry
 * circuitry so the dust belongs to the same system — the dark upper left is
 * left alone.
 */
export const particles = (() => {
  const rand = mulberry32(0x5a21);
  // [start, sweep] in degrees, screen space (0° = right, 90° = down)
  const arcs: Array<[number, number]> = [
    [-86, 70], // upper right — dense
    [-16, 76], // right flank — dense
    [58, 66], // lower right
    [120, 54], // bottom
    [160, 46], // lower left
    [196, 40], // left
  ];

  return Array.from({ length: 34 }, (_, i) => {
    const [start, sweep] = arcs[i % arcs.length];
    const deg = start + rand() * sweep;
    const rad = (deg * Math.PI) / 180;
    // Measured out from the clearing, so no mote ever lands on the lockup.
    const dist = clearingEdge(rad) + 16 + rand() * 340;
    return {
      id: `p${i}`,
      x: round(CORE + Math.cos(rad) * dist),
      y: round(CORE + Math.sin(rad) * dist),
      r: round(0.7 + rand() * 1.5),
      delay: round(rand() * 9),
      dur: round(4.5 + rand() * 5),
      density: (i % 3 === 0 ? "core" : i % 3 === 1 ? "mid" : "full") as Density,
    };
  });
})();
