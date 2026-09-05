import { cn } from "@/lib/utils";
import {
  branches,
  nodes,
  rings,
  ticks,
  radials,
  particles,
  pulseOffsets,
  VIEW,
  CORE,
} from "./circuit-data";

/**
 * The electrical field the FZ monogram sits inside.
 *
 * Three depth layers, and nothing is equally bright:
 *
 *   background   bearing ticks, the widest orbits, construction lines
 *   midground    the visible orbital rings and the dim circuit board
 *   foreground   travelling pulses and the nodes they ignite
 *
 * Energy is CSS-only — `stroke-dashoffset` keyframes sweeping a three-layer
 * pulse (soft halo, warm trail, near-white core) along the same path, so the
 * glow is built out of stacked strokes rather than a per-frame blur. Each
 * branch transmits for a fifth of its cycle on its own clock, so three or
 * four are ever alight at once. Motion stops under `prefers-reduced-motion`
 * (globals.css); the composition stays.
 *
 * Density is banded by tier: trunks (`core`) always draw, branches (`mid`)
 * join at `sm`, taps (`full`) only on `lg`. The mobile field is a smaller
 * composition, not a shrunken one.
 */

/** Maps a density band to the class that gates it on small screens. */
const gate = { core: "", mid: "fz-d-mid", full: "fz-d-full" } as const;

export function CircuitNetwork({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full h-full pointer-events-none select-none", className)}
      fill="none"
    >
      {/* ================= BACKGROUND — thin technical geometry ============= */}
      <g className="fz-bg">
        <path d={`M0 ${CORE} H${VIEW}`} className="fz-bg__guide" />
        <path d={`M${CORE} 0 V${VIEW}`} className="fz-bg__guide" />

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
      </g>

      {/* ================= MIDGROUND — orbital field ======================== */}
      <g>
        {rings.map((ring) => (
          <g
            key={ring.r}
            className={cn(
              gate[ring.density],
              ring.spin && "fz-ring-spin",
              ring.spin && ring.reverse && "fz-ring-spin--rev"
            )}
            style={
              ring.spin
                ? ({ "--spin": `${ring.spin}s` } as React.CSSProperties)
                : undefined
            }
          >
            <circle
              cx={0}
              cy={0}
              r={ring.r}
              className="fz-ring"
              strokeWidth={ring.w}
              strokeDasharray={ring.dash}
              style={{ "--o": ring.o } as React.CSSProperties}
              // Squash gives the field a viewing angle, so the orbits read as
              // a dimensional system rather than flat concentric circles.
              transform={`translate(${CORE} ${CORE}) rotate(${ring.rotate}) scale(1 ${ring.squash})`}
            />
          </g>
        ))}
      </g>

      {/* Radial traces leaving the clearing — the seam between mark and field */}
      <g className="fz-d-mid">
        {radials.map((ray) => (
          <line
            key={ray.id}
            x1={ray.x1}
            y1={ray.y1}
            x2={ray.x2}
            y2={ray.y2}
            className="fz-radial"
            style={
              {
                "--dur": `${ray.dur}s`,
                "--delay": `${ray.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* Motes suspended in the field */}
      <g>
        {particles.map((mote) => (
          <circle
            key={mote.id}
            cx={mote.x}
            cy={mote.y}
            r={mote.r}
            className={cn("fz-mote", gate[mote.density])}
            style={
              {
                "--dur": `${mote.dur}s`,
                "--delay": `${mote.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </g>

      {/* The dormant board — everything the energy will later travel along */}
      <g>
        {branches.map((branch) => (
          <path
            key={branch.id}
            d={branch.d}
            className={cn(
              "fz-trace",
              `fz-trace--t${branch.tier}`,
              gate[branch.density]
            )}
          />
        ))}
      </g>

      {/* ================= FOREGROUND — energy ============================== */}
      <g>
        {branches.map((branch) => {
          if (!branch.live) return null;
          const { core, trail, halo } = pulseOffsets(branch);
          const timing = {
            "--len": branch.len,
            "--dur": `${branch.dur}s`,
            "--delay": `${branch.delay}s`,
          } as React.CSSProperties;

          const layer = (
            name: string,
            o: { dash: number; start: number; end: number }
          ) => (
            <path
              d={branch.d}
              className={cn(name, branch.surge && `${name}--surge`)}
              style={
                {
                  ...timing,
                  "--dash": o.dash,
                  "--from": o.start,
                  "--to": o.end,
                } as React.CSSProperties
              }
            />
          );

          return (
            <g key={`e-${branch.id}`} className={gate[branch.density]}>
              {/* outer glow → inner glow → core, painted in that order */}
              {layer("fz-pulse fz-pulse--halo", halo)}
              {layer("fz-pulse fz-pulse--trail", trail)}
              {layer("fz-pulse fz-pulse--head", core)}
            </g>
          );
        })}
      </g>

      {/* Connection nodes — dormant, faint, or ignited by an arriving pulse */}
      <g>
        {nodes.map((node) => {
          if (!node.fires) {
            return (
              <circle
                key={node.id}
                cx={node.x}
                cy={node.y}
                r={node.r}
                className={cn("fz-node", gate[node.density])}
              />
            );
          }

          const timing = {
            "--dur": `${node.dur}s`,
            "--delay": `${node.delay}s`,
          } as React.CSSProperties;

          return (
            <g key={node.id} className={gate[node.density]}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 5}
                className="fz-node__flash"
                style={timing}
              />
              {node.surge && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + 5}
                  className="fz-node__flash fz-node__flash--wide"
                  style={timing}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                className={cn(
                  "fz-node fz-node--fires",
                  node.surge && "fz-node--surge"
                )}
                style={timing}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
