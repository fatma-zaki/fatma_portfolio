import { cn } from "@/lib/utils";

/* ==========================================================================
   CIRCUIT ORNAMENTS
   The secondary brand language: thin gold traces, right-angle turns and
   connection nodes. Purely decorative — always `aria-hidden`, never
   interactive, and always inside an `overflow-hidden` parent so they can
   never affect layout on any screen size.
   ========================================================================== */

/**
 * Small L-shaped trace with a terminal node, used to mark the corner of a
 * panel. `position` picks which corner it hugs.
 */
export function CircuitCorner({
  position = "tr",
  className,
}: {
  position?: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const placement = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 -scale-x-100",
    bl: "bottom-0 left-0 -scale-y-100",
    br: "bottom-0 right-0 -scale-x-100 -scale-y-100",
  }[position];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 72 72"
      fill="none"
      className={cn(
        "absolute w-16 h-16 pointer-events-none text-gold/35",
        placement,
        className
      )}
    >
      <path
        d="M0 20h14l12-12h22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <path
        d="M0 34h6l10-10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        opacity={0.6}
      />
      <circle cx="48" cy="8" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Horizontal trace that runs along a section edge — a quieter alternative
 * to a full border.
 */
export function CircuitRail({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      fill="none"
      className={cn("w-full h-6 pointer-events-none text-gold/30", className)}
    >
      <path
        d="M0 12h140l10-8h100l10 8h140"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
