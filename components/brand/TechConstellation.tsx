"use client";

import { motion } from "framer-motion";
import { tools, toolEdges, toolGroups, type ToolNode } from "@/data/toolkit";

/**
 * THE ENGINEERING TOOLKIT — a constellation, not a logo grid.
 *
 * The engineer is the core; the tools orbit it. That hierarchy is the point:
 * nothing here is allowed to read as the identity, so the centre of the field
 * says SOFTWARE ENGINEER and every technology hangs off it as a leaf.
 *
 * The connector layer is a plain SVG at `viewBox="0 0 1100 600"` and the labels
 * are absolutely-positioned HTML at percentages of the same box, which is
 * locked to an 11:6 aspect — so the two layers share one coordinate space and
 * stay registered at every width without measuring anything at runtime.
 *
 * Below `lg` the field is dropped entirely for a grouped list. A constellation
 * squeezed into 380px is unreadable, and readability wins.
 */

const W = 1100;
const H = 600;
const CORE: [number, number] = [W / 2, H / 2];

const px = (n: ToolNode): [number, number] => [(n.x / 100) * W, (n.y / 100) * H];

const byId = new Map(tools.map((t) => [t.id, t]));

/**
 * Circuit routing: one 45° diagonal, then a straight run. Same idiom as the
 * hero's board, so the connectors read as traces rather than as a graph.
 */
function route(a: [number, number], b: [number, number]) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const m = Math.min(Math.abs(dx), Math.abs(dy));
  const mid: [number, number] = [a[0] + Math.sign(dx) * m, a[1] + Math.sign(dy) * m];
  const len = m * Math.SQRT2 + (Math.abs(dx) - m) + (Math.abs(dy) - m);
  const r = (n: number) => Math.round(n * 10) / 10;
  return {
    d: `M${r(a[0])} ${r(a[1])} L${r(mid[0])} ${r(mid[1])} L${r(b[0])} ${r(b[1])}`,
    len: r(len),
  };
}

const edges = toolEdges.map((edge, i) => {
  const from = edge.from ? px(byId.get(edge.from)!) : CORE;
  const to = px(byId.get(edge.to)!);
  const { d, len } = route(from, to);
  return { id: `te${i}`, d, len, tier: edge.from ? 2 : 1, charge: edge.charge };
});

/** Faint orbital guides — the same three ellipses the bands sit on. */
interface Guide {
  rx: number;
  ry: number;
  dash: string;
  spin: number;
  o: number;
  reverse?: boolean;
}

const guides: Guide[] = [
  { rx: 242, ry: 144, dash: "3 13", spin: 220, o: 0.12 },
  { rx: 440, ry: 246, dash: "170 46 84 46", spin: 300, reverse: true, o: 0.16 },
  { rx: 506, ry: 270, dash: "560 180 240 160", spin: 380, o: 0.1 },
];

/** Band drives brightness and reveal order — the core lights first. */
const bandStyle: Record<1 | 2 | 3, { pill: string; dot: string; text: string }> = {
  1: {
    pill: "border-gold/35 bg-canvas/80 shadow-[0_0_22px_-10px_rgb(var(--gold)/0.7)]",
    dot: "bg-gold shadow-[0_0_7px_rgb(var(--gold)/0.9)]",
    text: "text-primary",
  },
  2: {
    pill: "border-line-strong/80 bg-canvas/70",
    dot: "bg-gold/75",
    text: "text-secondary",
  },
  3: {
    pill: "border-line/90 bg-canvas/60",
    dot: "bg-gold/50",
    text: "text-muted",
  },
};

export function TechConstellation({ active }: { active: boolean }) {
  return (
    <>
      {/* ================= desktop: the field ================= */}
      <div
        className="hidden lg:block relative w-full max-w-[1100px] mx-auto aspect-[11/6]"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-none"
          fill="none"
        >
          {/* orbital guides */}
          {guides.map((g, i) => (
            <g
              key={`tg${i}`}
              className={g.spin ? `fz-ring-spin${g.reverse ? " fz-ring-spin--rev" : ""}` : undefined}
              style={
                {
                  "--spin": `${g.spin}s`,
                  transformOrigin: `${CORE[0]}px ${CORE[1]}px`,
                } as React.CSSProperties
              }
            >
              <motion.ellipse
                cx={CORE[0]}
                cy={CORE[1]}
                rx={g.rx}
                ry={g.ry}
                className="fz-ring"
                strokeWidth={1}
                strokeDasharray={g.dash}
                style={{ "--o": g.o } as React.CSSProperties}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.18 }}
              />
            </g>
          ))}

          {/* the dormant board — traces drawn outward from the core */}
          {edges.map((e, i) => (
            <motion.path
              key={e.id}
              d={e.d}
              className={`fz-trace fz-trace--t${e.tier}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.9, delay: 0.3 + i * 0.055, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.35, delay: 0.3 + i * 0.055 },
              }}
            />
          ))}

          {/* travelling energy on the handful of live traces */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {edges.map((e) => {
              if (!e.charge) return null;
              const dash = 20;
              const trail = 86;
              const halo = 48;
              const timing = {
                "--len": e.len,
                "--dur": `${e.charge.dur}s`,
                "--delay": `${e.charge.delay}s`,
              } as React.CSSProperties;

              const layer = (name: string, d: number, from: number, to: number) => (
                <path
                  d={e.d}
                  className={name}
                  style={{ ...timing, "--dash": d, "--from": from, "--to": to } as React.CSSProperties}
                />
              );

              return (
                <g key={`tp-${e.id}`}>
                  {layer("fz-pulse fz-pulse--halo", halo, halo, -e.len + halo - dash)}
                  {layer("fz-pulse fz-pulse--trail", trail, trail, -e.len + trail - dash)}
                  {layer("fz-pulse fz-pulse--head", dash, dash, -e.len)}
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* ---------- the core: the identity the tools orbit ---------- */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="flex flex-col items-center gap-2 px-6 py-4 rounded-brand
                       border border-gold/40 bg-abyss/90 backdrop-blur-sm
                       shadow-[0_0_46px_-14px_rgb(var(--gold)/0.75)]"
          >
            <span className="node-dot" />
            <span className="font-display text-[13px] font-bold tracking-[0.22em] uppercase text-gradient-gold whitespace-nowrap">
              Software Engineer
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-muted whitespace-nowrap">
              Full Stack · Web &amp; Mobile
            </span>
          </div>
        </motion.div>

        {/* ---------- the tool nodes ---------- */}
        {tools.map((tool, i) => {
          const s = bandStyle[tool.band];
          return (
            <motion.div
              key={tool.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }}
              transition={{
                duration: 0.55,
                delay: 0.85 + (tool.band - 1) * 0.28 + (i % 5) * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-brand border
                            backdrop-blur-sm whitespace-nowrap cursor-default
                            transition-[border-color,color,box-shadow] duration-300 ease-brand
                            hover:border-gold/70 hover:shadow-[0_0_26px_-8px_rgb(var(--gold)/0.8)]
                            ${s.pill}`}
              >
                <span className={`w-1.5 h-1.5 rotate-45 shrink-0 ${s.dot}`} />
                <span
                  className={`text-[11px] font-medium tracking-[0.08em] transition-colors duration-300
                              group-hover:text-gold ${s.text}`}
                >
                  {tool.label}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* ================= tablet / mobile: grouped, legible ================= */}
      <div className="lg:hidden mt-2 space-y-6">
        {toolGroups.map((group, gi) => {
          const items = tools.filter((t) => t.group === group.key);
          if (!items.length) return null;
          return (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 14 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.15 + gi * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
            >
              <div className="flex items-center gap-2 sm:w-28 sm:shrink-0">
                <span className="node-dot" />
                <span className="text-[9px] font-semibold tracking-[0.26em] uppercase text-gold">
                  {group.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((tool) => (
                  <span
                    key={tool.id}
                    className="px-2.5 py-1 rounded-brand border border-line bg-canvas/70
                               text-[11px] text-secondary tracking-[0.04em]"
                  >
                    {tool.label}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
