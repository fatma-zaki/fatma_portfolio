"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { skillDomains, type DomainIcon, type DomainSlot, type SkillDomain } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * SKILLS & TECHNOLOGIES — the stack as a system around one engineering core.
 *
 * Same construction as the toolkit constellation above it: an SVG connector
 * layer at `viewBox="0 0 1200 800"` and HTML panels positioned at percentages
 * of the same box, locked to a 3:2 aspect so both layers stay registered at
 * every width. Each panel is pinned by the point its trace lands on (its inner
 * edge), so panel height can vary without breaking a connection.
 *
 * Energy leaves the core along one trace at a time, round-robin, and lights
 * the node at the domain it reaches. Hovering a domain lights its trace.
 *
 * Below `lg` the field gives way to a grouped grid — readability first.
 */

const W = 1200;
const H = 800;
const C = { x: 600, y: 400 };

const icons: Record<DomainIcon, LucideIcon> = {
  core: Code2,
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  data: Database,
  devops: Cloud,
};

interface Edge {
  /** Drawn from the core ring outward, so pulses travel core → domain. */
  d: string;
  len: number;
  /** Where the trace leaves the ring and where it lands on the panel. */
  start: [number, number];
  end: [number, number];
  /** Panel placement: anchor as % of the box, plus the transform that pins it. */
  left: number;
  top: number;
  pin: string;
}

const DIAG = 66 * Math.SQRT2;

const edges: Record<DomainSlot, Edge> = {
  top: {
    d: "M600 250 V170",
    len: 80,
    start: [600, 250],
    end: [600, 170],
    left: 50,
    top: 21.25,
    pin: "-translate-x-1/2 -translate-y-full",
  },
  bottom: {
    d: "M600 550 V630",
    len: 80,
    start: [600, 550],
    end: [600, 630],
    left: 50,
    top: 78.75,
    pin: "-translate-x-1/2",
  },
  "left-upper": {
    d: "M466 326 L400 260 H330",
    len: DIAG + 70,
    start: [466, 326],
    end: [330, 260],
    left: 27.5,
    top: 32.5,
    pin: "-translate-x-full -translate-y-1/2",
  },
  "left-lower": {
    d: "M466 474 L400 540 H330",
    len: DIAG + 70,
    start: [466, 474],
    end: [330, 540],
    left: 27.5,
    top: 67.5,
    pin: "-translate-x-full -translate-y-1/2",
  },
  "right-upper": {
    d: "M734 326 L800 260 H870",
    len: DIAG + 70,
    start: [734, 326],
    end: [870, 260],
    left: 72.5,
    top: 32.5,
    pin: "-translate-y-1/2",
  },
  "right-lower": {
    d: "M734 474 L800 540 H870",
    len: DIAG + 70,
    start: [734, 474],
    end: [870, 540],
    left: 72.5,
    top: 67.5,
    pin: "-translate-y-1/2",
  },
};

/** Faint board traces running out to the edges of the field. */
const boardTraces = [
  "M0 400 H250 L280 370",
  "M1200 400 H950 L920 430",
  "M300 400 H450",
  "M750 400 H900",
  "M0 96 H130 L190 156",
  "M1200 96 H1070 L1010 156",
  "M0 704 H130 L190 644",
  "M1200 704 H1070 L1010 644",
  "M420 60 H510 L540 90",
  "M780 740 H690 L660 710",
];

const boardNodes: [number, number][] = [
  [280, 370], [920, 430], [300, 400], [900, 400],
  [190, 156], [1010, 156], [190, 644], [1010, 644],
  [540, 90], [660, 710],
];

const motes: [number, number, number, number][] = [
  // x, y, duration, delay
  [520, 190, 6.5, 0.4], [690, 610, 7.2, 1.8], [380, 470, 5.8, 2.6],
  [820, 330, 6.9, 0.9], [560, 660, 7.6, 3.2], [650, 150, 6.1, 2.1],
];

const PULSE_DUR = 7.8;
const PULSE_STEP = 1.3;

/** Two thin gold corner brackets — the technical frame used on every panel. */
export function CornerBrackets({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="absolute -left-px -top-px w-2.5 h-2.5 border-l border-t border-gold/70" />
      <span className="absolute -right-px -bottom-px w-2.5 h-2.5 border-r border-b border-gold/70" />
    </span>
  );
}

function DomainPanel({
  domain,
  active,
  onHover,
  className,
}: {
  domain: SkillDomain;
  active?: boolean;
  onHover?: (on: boolean) => void;
  className?: string;
}) {
  const Icon = icons[domain.id];
  const half = Math.ceil(domain.skills.length / 2);
  const columns = [domain.skills.slice(0, half), domain.skills.slice(half)];

  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={cn(
        "group relative rounded-[3px] border bg-deep/75 backdrop-blur-[3px] px-4 py-3.5",
        "transition-[border-color,box-shadow,background-color] duration-300 ease-brand",
        active
          ? "border-gold/50 bg-deep/90 shadow-[0_0_34px_-14px_rgb(var(--gold)/0.7)]"
          : "border-gold/[0.16]",
        className
      )}
    >
      <CornerBrackets />

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-abyss",
            "transition-[border-color,box-shadow] duration-300",
            active
              ? "border-gold shadow-[0_0_16px_-4px_rgb(var(--gold)/0.8)]"
              : "border-gold/45"
          )}
        >
          <Icon size={15} strokeWidth={1.5} className="text-gold" />
        </span>
        <div className="min-w-0">
          <h3 className="font-tech text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            {domain.title}
          </h3>
          <p className="mt-0.5 text-[10.5px] text-muted leading-snug">{domain.subtitle}</p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-[5px] font-tech text-[8px] tracking-[0.18em] text-gold-ink/50"
      >
        {domain.code}
      </span>

      <div className="mt-3 grid grid-cols-2 border-t border-line/80 pt-2.5">
        {columns.map((col, ci) => (
          <ul
            key={ci}
            className={cn("space-y-1", ci === 1 && "border-l border-line/80 pl-3.5")}
          >
            {col.map((skill) => (
              <li
                key={skill}
                className="text-[11.5px] leading-[1.45] text-secondary"
              >
                {skill}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function CoreNode({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full",
        "border border-gold/70 bg-abyss",
        "shadow-[0_0_60px_-12px_rgb(var(--gold)/0.65),inset_0_0_30px_-10px_rgb(var(--gold)/0.45)]",
        className
      )}
    >
      <span className="absolute inset-[7%] rounded-full border border-gold/20" aria-hidden="true" />
      <span className="px-2 text-center font-display text-[11px] xl:text-[12.5px] font-bold uppercase leading-[1.35] tracking-[0.16em] text-gradient-gold">
        Software
        <br />
        Engineer
      </span>
    </div>
  );
}

export function StackConstellation({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<DomainSlot | null>(null);

  const reveal = (delay: number) => ({
    initial: { opacity: 0 },
    animate: active ? { opacity: 1 } : { opacity: 0 },
    transition: { duration: 0.9, delay },
  });

  return (
    <>
      {/* ================= desktop: the field ================= */}
      <div className="hidden lg:block relative w-full max-w-[1152px] mx-auto aspect-[3/2]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full pointer-events-none"
          fill="none"
          aria-hidden="true"
        >
          {/* background board */}
          <motion.g {...reveal(0.1)}>
            {boardTraces.map((d) => (
              <path key={d} d={d} className="fz-trace fz-trace--t3" />
            ))}
            {boardNodes.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} className="fz-node" />
            ))}
            {motes.map(([x, y, dur, delay]) => (
              <circle
                key={`m${x}${y}`}
                cx={x}
                cy={y}
                r={1.3}
                className="fz-mote"
                style={{ "--dur": `${dur}s`, "--delay": `${delay}s` } as React.CSSProperties}
              />
            ))}
          </motion.g>

          {/* orbital field */}
          <motion.g {...reveal(0.2)}>
            <circle cx={C.x} cy={C.y} r={280} className="fz-ring" strokeWidth={1} style={{ "--o": 0.06 } as React.CSSProperties} />
            <g
              className="fz-ring-spin fz-ring-spin--rev"
              style={{ "--spin": "340s", transformOrigin: `${C.x}px ${C.y}px` } as React.CSSProperties}
            >
              <circle cx={C.x} cy={C.y} r={212} className="fz-ring" strokeWidth={1} strokeDasharray="2 10" style={{ "--o": 0.16 } as React.CSSProperties} />
            </g>
            <g
              className="fz-ring-spin"
              style={{ "--spin": "260s", transformOrigin: `${C.x}px ${C.y}px` } as React.CSSProperties}
            >
              <circle cx={C.x} cy={C.y} r={150} className="fz-ring" strokeWidth={1} strokeDasharray="190 40 70 40" style={{ "--o": 0.3 } as React.CSSProperties} />
            </g>
            <circle cx={C.x} cy={C.y} r={120} className="fz-ring" strokeWidth={1} style={{ "--o": 0.14 } as React.CSSProperties} />
            <g
              className="fz-ring-spin"
              style={{ "--spin": "180s", transformOrigin: `${C.x}px ${C.y}px` } as React.CSSProperties}
            >
              <circle cx={C.x} cy={C.y} r={94} className="fz-ring" strokeWidth={1} strokeDasharray="3 7" style={{ "--o": 0.28 } as React.CSSProperties} />
            </g>

            {/* bearing ticks on the attachment ring */}
            {Array.from({ length: 72 }, (_, i) => {
              const a = (i / 72) * Math.PI * 2;
              const major = i % 6 === 0;
              const r1 = 162;
              const r2 = major ? 172 : 167;
              const p = (r: number) => [C.x + Math.cos(a) * r, C.y + Math.sin(a) * r].map((n) => Math.round(n * 10) / 10);
              const [x1, y1] = p(r1);
              const [x2, y2] = p(r2);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={major ? "fz-tick fz-tick--major" : "fz-tick"} />;
            })}
          </motion.g>

          {/* the six connections */}
          {skillDomains.map((domain, i) => {
            const e = edges[domain.slot];
            const lit = hovered === domain.slot;
            return (
              <g key={domain.id}>
                <motion.path
                  d={e.d}
                  className={cn("fz-trace", lit ? "fz-trace--t1" : "fz-trace--t2")}
                  style={lit ? { stroke: "rgb(var(--gold-soft) / 0.85)" } : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{
                    pathLength: { duration: 0.9, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.3, delay: 0.5 + i * 0.08 },
                  }}
                />
                <circle cx={e.start[0]} cy={e.start[1]} r={2.6} className="fz-node" style={{ opacity: active ? 0.6 : 0 }} />
              </g>
            );
          })}

          {/* travelling energy, one domain at a time */}
          {!reduce && (
            <motion.g {...reveal(1.6)}>
              {skillDomains.map((domain, i) => {
                const e = edges[domain.slot];
                const dash = 16;
                const trail = 64;
                const halo = 36;
                const timing = {
                  "--len": e.len,
                  "--dur": `${PULSE_DUR}s`,
                  "--delay": `${i * PULSE_STEP}s`,
                } as React.CSSProperties;
                const layer = (name: string, d: number, from: number, to: number) => (
                  <path
                    d={e.d}
                    className={name}
                    style={{ ...timing, "--dash": d, "--from": from, "--to": to } as React.CSSProperties}
                  />
                );
                return (
                  <g key={`p-${domain.id}`}>
                    {layer("fz-pulse fz-pulse--halo", halo, halo, -e.len + halo - dash)}
                    {layer("fz-pulse fz-pulse--trail", trail, trail, -e.len + trail - dash)}
                    {layer("fz-pulse fz-pulse--head", dash, dash, -e.len)}
                  </g>
                );
              })}
            </motion.g>
          )}

          {/* landing nodes — they ignite as each pulse arrives */}
          <motion.g {...reveal(0.9)}>
            {skillDomains.map((domain, i) => {
              const e = edges[domain.slot];
              const timing = {
                "--dur": `${PULSE_DUR}s`,
                "--delay": `${i * PULSE_STEP}s`,
              } as React.CSSProperties;
              const lit = hovered === domain.slot;
              return (
                <g key={`n-${domain.id}`}>
                  <circle
                    cx={e.end[0]}
                    cy={e.end[1]}
                    r={3.6}
                    className={cn("fz-node", !reduce && !lit && "fz-node--fires")}
                    style={lit ? { ...timing, opacity: 1, fill: "rgb(255 243 196)" } : timing}
                  />
                  {!reduce && (
                    <circle cx={e.end[0]} cy={e.end[1]} r={9} className="fz-node__flash" style={timing} />
                  )}
                </g>
              );
            })}
          </motion.g>
        </svg>

        {/* tiny technical annotations */}
        <motion.div
          {...reveal(1.2)}
          aria-hidden="true"
          className="absolute left-[2%] top-[2%] font-tech text-[8.5px] uppercase leading-[1.9] tracking-[0.28em] text-muted/70"
        >
          <p>Sys.map // stack</p>
          <p className="text-gold-ink/60">06 domains · 1 core</p>
        </motion.div>
        <motion.div
          {...reveal(1.2)}
          aria-hidden="true"
          className="absolute right-[2%] bottom-[2%] text-right font-tech text-[8.5px] uppercase leading-[1.9] tracking-[0.28em] text-muted/70"
        >
          <p>Web · Mobile · Backend</p>
          <p className="text-gold-ink/60">Data · Infrastructure</p>
        </motion.div>

        {/* the core */}
        {/* positioning and motion on separate elements: framer owns `transform` */}
        <div className="absolute left-1/2 top-1/2 z-20 w-[10.8%] -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: reduce ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CoreNode className="w-full" />
          </motion.div>
        </div>

        {/* the domains */}
        {skillDomains.map((domain, i) => {
          const e = edges[domain.slot];
          return (
            <div
              key={domain.id}
              className={cn("absolute z-10", e.pin)}
              style={{ left: `${e.left}%`, top: `${e.top}%` }}
            >
              <motion.div
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 10 }}
                transition={{ duration: 0.6, delay: 0.95 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <DomainPanel
                  domain={domain}
                  active={hovered === domain.slot}
                  onHover={(on) => setHovered(on ? domain.slot : null)}
                  className="w-[236px] xl:w-[262px]"
                />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ================= tablet / mobile: grouped, legible ================= */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <CoreNode className="w-[118px]" />
          <span aria-hidden="true" className="h-10 w-px bg-gradient-to-b from-gold/50 to-gold/10" />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillDomains.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={active ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.07 }}
            >
              <DomainPanel domain={domain} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
