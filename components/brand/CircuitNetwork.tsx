import { cn } from "@/lib/utils";
import {
  branches,
  nodes,
  atmosphere,
  pulseOffsets,
  VIEW,
  CORE,
} from "./circuit-data";

/**
 * The circuit network that grows out of the FZ monogram.
 *
 * One composition, three tiers: trunks leave the core, branches split off
 * trunks, taps hang off branches. Line weight and brightness step down with
 * each tier so the eye reads the hierarchy without being told.
 *
 * Energy is CSS-only — `stroke-dashoffset` keyframes sweeping a bright head
 * and a dimmer trail along the same path. Six branches can transmit, each
 * lit for under a third of its cycle, so only two to four are ever live at
 * once. Motion is suppressed under `prefers-reduced-motion` (globals.css);
 * the board stays.
 */
export function CircuitNetwork({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-full h-full pointer-events-none select-none", className)}
      fill="none"
    >
      {/* ---- atmosphere: 3–8%, depth only ---- */}
      <g className="fz-atmos">
        {atmosphere.rings.map((ring) => (
          <circle
            key={ring.r}
            cx={CORE}
            cy={CORE}
            r={ring.r}
            strokeDasharray={ring.dash}
            transform={`rotate(${ring.rotate} ${CORE} ${CORE})`}
          />
        ))}
        {atmosphere.guides.map((d) => (
          <path key={d} d={d} className="fz-atmos__guide" />
        ))}
      </g>

      {/* ---- the board ---- */}
      <g>
        {branches.map((branch) => (
          <path
            key={branch.d}
            d={branch.d}
            className={`fz-trace fz-trace--t${branch.tier}`}
          />
        ))}
      </g>

      {/* ---- travelling energy: dim trail beneath a bright head ---- */}
      <g>
        {branches.map((branch) => {
          if (!branch.live) return null;
          const { core, trail } = pulseOffsets(branch);
          const timing = {
            "--len": branch.len,
            "--dur": `${branch.dur}s`,
            "--delay": `${branch.delay}s`,
          } as React.CSSProperties;

          return (
            <g key={`e-${branch.d}`}>
              <path
                d={branch.d}
                className="fz-pulse fz-pulse--trail"
                style={
                  {
                    ...timing,
                    "--dash": trail.dash,
                    "--from": trail.start,
                    "--to": trail.end,
                  } as React.CSSProperties
                }
              />
              <path
                d={branch.d}
                className={cn(
                  "fz-pulse fz-pulse--head",
                  branch.surge && "fz-pulse--surge"
                )}
                style={
                  {
                    ...timing,
                    "--dash": core.dash,
                    "--from": core.start,
                    "--to": core.end,
                  } as React.CSSProperties
                }
              />
            </g>
          );
        })}
      </g>

      {/* ---- connection nodes ---- */}
      <g>
        {nodes.map((node, i) => {
          if (!node.fires) {
            return (
              <circle
                key={`n${i}`}
                cx={node.x}
                cy={node.y}
                r={node.r}
                className="fz-node"
              />
            );
          }

          const timing = {
            "--dur": `${node.dur}s`,
            "--delay": `${node.delay}s`,
          } as React.CSSProperties;

          return (
            <g key={`n${i}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 5}
                className="fz-node__flash"
                style={timing}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                className="fz-node fz-node--fires"
                style={timing}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
