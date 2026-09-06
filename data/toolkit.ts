/**
 * THE ENGINEERING TOOLKIT — constellation data.
 *
 * The tools are not the identity. They hang off it: a core (the engineer)
 * feeds four inner anchors, those branch outward through two further orbital
 * bands, and every leaf is a capability rather than a title.
 *
 * Coordinates are percentages of the constellation box, which is locked to an
 * 11:6 aspect so the SVG connector layer (viewBox 0 0 1100 600) and the
 * absolutely-positioned HTML labels share one coordinate space exactly:
 *
 *   svgX = x / 100 * 1100        svgY = y / 100 * 600
 *
 * Positions are hand-placed on three ellipses centred on (50, 50) — inner
 * rx/ry 22/24, mid 40/41, outer 46/45 — at uneven bearings, so the field reads
 * as an orbital system rather than a ring of evenly spaced beads. They were
 * chosen so no two label pills collide at the narrowest width the
 * constellation renders at (lg, ~960px).
 */

/** Which part of the stack a tool belongs to. Drives the node's marker only. */
export type ToolGroup = "web" | "mobile" | "backend" | "data" | "tooling";

export interface ToolNode {
  id: string;
  label: string;
  group: ToolGroup;
  /** Orbital band: 1 innermost … 3 outermost. Drives size and reveal order. */
  band: 1 | 2 | 3;
  /** Percent of the constellation box. */
  x: number;
  y: number;
}

/**
 * Roughly hemispheric: web up and to the left, mobile low-left, backend and
 * data down the right flank. Grouping is legible without being a rigid grid.
 */
export const tools: ToolNode[] = [
  /* ---- band 1 — the four anchors the core feeds directly ---- */
  { id: "ts", label: "TypeScript", group: "web", band: 1, x: 33.1, y: 34.6 },
  { id: "node", label: "Node.js", group: "backend", band: 1, x: 66.9, y: 34.6 },
  { id: "flutter", label: "Flutter", group: "mobile", band: 1, x: 33.1, y: 65.4 },
  { id: "postgres", label: "PostgreSQL", group: "data", band: 1, x: 66.9, y: 65.4 },

  /* ---- band 2 ---- */
  { id: "react", label: "React", group: "web", band: 2, x: 27.1, y: 16.4 },
  { id: "nest", label: "NestJS", group: "backend", band: 2, x: 72.9, y: 16.4 },
  { id: "mongo", label: "MongoDB", group: "data", band: 2, x: 90, y: 50 },
  { id: "git", label: "Git", group: "tooling", band: 2, x: 10, y: 50 },
  { id: "typeorm", label: "TypeORM", group: "data", band: 2, x: 50, y: 91 },

  /* ---- band 3 — the outer rim ---- */
  { id: "next", label: "Next.js", group: "web", band: 3, x: 10.2, y: 27.5 },
  { id: "js", label: "JavaScript", group: "web", band: 3, x: 46, y: 5.2 },
  { id: "express", label: "Express", group: "backend", band: 3, x: 89.8, y: 27.5 },
  { id: "prisma", label: "Prisma", group: "data", band: 3, x: 89.8, y: 72.5 },
  { id: "rn", label: "React Native", group: "mobile", band: 3, x: 30.5, y: 90.8 },
  { id: "expo", label: "Expo", group: "mobile", band: 3, x: 10.2, y: 72.5 },
];

/**
 * Trunks and branches. `from: null` means the edge leaves the core.
 * `charge` marks the handful of edges that carry a travelling pulse — kept
 * sparse so two or three are ever alight, matching the hero's restraint.
 */
export interface ToolEdge {
  from: string | null;
  to: string;
  charge?: { dur: number; delay: number };
}

export const toolEdges: ToolEdge[] = [
  /* core → anchors */
  { from: null, to: "ts", charge: { dur: 9, delay: 0.6 } },
  { from: null, to: "node", charge: { dur: 11, delay: 4.2 } },
  { from: null, to: "flutter", charge: { dur: 10.5, delay: 7.8 } },
  { from: null, to: "postgres", charge: { dur: 12, delay: 2.4 } },

  /* web arm */
  { from: "ts", to: "react", charge: { dur: 8.5, delay: 5.4 } },
  { from: "ts", to: "next" },
  { from: "ts", to: "git" },
  { from: "react", to: "js", charge: { dur: 9.5, delay: 9.1 } },

  /* backend arm */
  { from: "node", to: "nest", charge: { dur: 10, delay: 6.7 } },
  { from: "node", to: "express" },
  { from: "node", to: "mongo" },

  /* mobile arm */
  { from: "flutter", to: "rn", charge: { dur: 11.5, delay: 3.3 } },
  { from: "flutter", to: "expo" },

  /* data arm */
  { from: "postgres", to: "prisma", charge: { dur: 9, delay: 8.4 } },
  { from: "postgres", to: "typeorm" },
  { from: "postgres", to: "mongo" },
];

/** Legend for the constellation — also the fallback grouping below `lg`. */
export const toolGroups: Array<{ key: ToolGroup; label: string }> = [
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "backend", label: "Backend" },
  { key: "data", label: "Data" },
  { key: "tooling", label: "Tooling" },
];
