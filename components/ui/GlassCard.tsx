"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A chamfered pane of dark glass with a thin gold frame.
 *
 *   body     translucent navy + backdrop blur, a cool top light and a warm
 *            specular sheen that follows the cursor
 *   frame    SVG, drawn from the measured size so the 45° cuts stay a fixed
 *            size at any width; brightest at the corners, with a soft glow
 *   depth    a gentle perspective tilt toward the cursor (off under reduced
 *            motion) and a grounded shadow beneath the pane
 *
 * clip-path shapes the body; the frame is a separate overlay because a CSS
 * border can't follow a clipped edge.
 */

interface GlassCardProps {
  children: ReactNode;
  /** Chamfer size in px. */
  cut?: number;
  /** Maximum tilt in degrees. */
  tilt?: number;
  /** Draw a second, fainter frame just inside the first. */
  doubleFrame?: boolean;
  className?: string;
}

const chamfer = (c: number) =>
  `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`;

/** Outline of a chamfered rect inset by `o` px — the cut shrinks to stay parallel. */
function framePath(w: number, h: number, c: number, o: number) {
  const k = c - o * (2 - Math.SQRT2);
  const [x0, y0, x1, y1] = [o, o, w - o, h - o];
  return `M${x0 + k} ${y0} H${x1 - k} L${x1} ${y0 + k} V${y1 - k} L${x1 - k} ${y1} H${x0 + k} L${x0} ${y1 - k} V${y0 + k} Z`;
}

/** The four chamfers, each carried a short way along both edges. */
function cornerPath(w: number, h: number, c: number, o: number, run: number) {
  const k = c - o * (2 - Math.SQRT2);
  const [x0, y0, x1, y1] = [o, o, w - o, h - o];
  return [
    `M${x0} ${y0 + k + run} V${y0 + k} L${x0 + k} ${y0} H${x0 + k + run}`,
    `M${x1 - k - run} ${y0} H${x1 - k} L${x1} ${y0 + k} V${y0 + k + run}`,
    `M${x1} ${y1 - k - run} V${y1 - k} L${x1 - k} ${y1} H${x1 - k - run}`,
    `M${x0 + k + run} ${y1} H${x0 + k} L${x0} ${y1 - k} V${y1 - k - run}`,
  ].join(" ");
}

export function GlassCard({
  children,
  cut = 18,
  tilt = 3,
  doubleFrame = false,
  className,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    if (!reduce) {
      el.style.setProperty("--ry", `${((px - 0.5) * 2 * tilt).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py) * 2 * tilt).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const clip = chamfer(cut);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("group/glass relative", className)}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--mx": "50%",
          "--my": "0%",
          transform: "perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry))",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        } as React.CSSProperties
      }
    >
      {/* grounded shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[6%] -bottom-4 h-12 -z-10 rounded-full bg-black/70 blur-2xl"
      />

      {/* the glass body */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ clipPath: clip }}>
        <div className="absolute inset-0 bg-[rgb(13_19_38/0.52)] backdrop-blur-[10px] backdrop-saturate-[1.2]" />
        {/* cool light along the top edge, fading down — reads as thickness */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.012)_22%,transparent_45%)]" />
        {/* warm light caught in two opposite corners */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_0%_0%,rgb(var(--gold)/0.08),transparent_70%),radial-gradient(ellipse_40%_35%_at_100%_100%,rgb(var(--gold)/0.07),transparent_70%)]" />
        {/* specular sheen that follows the cursor */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(420px circle at var(--mx) var(--my), rgb(var(--gold-soft) / 0.09), transparent 60%)",
          }}
        />
      </div>

      {/* content, clipped to the same shape */}
      <div className="relative" style={{ clipPath: clip }}>
        {children}
      </div>

      {/* the frame */}
      {size && (
        <svg
          aria-hidden="true"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="pointer-events-none absolute inset-0 overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id={`${uid}-edge`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgb(var(--gold-soft))" stopOpacity="0.7" />
              <stop offset="0.35" stopColor="rgb(var(--gold))" stopOpacity="0.28" />
              <stop offset="0.65" stopColor="rgb(var(--gold))" stopOpacity="0.2" />
              <stop offset="1" stopColor="rgb(var(--gold-soft))" stopOpacity="0.6" />
            </linearGradient>
            <filter id={`${uid}-glow`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* soft glow under the corners */}
          <path
            d={cornerPath(size.w, size.h, cut, 0.5, 34)}
            stroke="rgb(var(--gold))"
            strokeOpacity="0.55"
            strokeWidth="3"
            filter={`url(#${uid}-glow)`}
            className="transition-opacity duration-500 opacity-70 group-hover/glass:opacity-100"
          />
          {/* the hairline */}
          <path
            d={framePath(size.w, size.h, cut, 0.5)}
            stroke={`url(#${uid}-edge)`}
            strokeWidth="1"
            className="transition-opacity duration-500 opacity-80 group-hover/glass:opacity-100"
          />
          {/* bright corners */}
          <path
            d={cornerPath(size.w, size.h, cut, 0.5, 34)}
            stroke="rgb(var(--gold-soft))"
            strokeOpacity="0.9"
            strokeWidth="1.2"
          />
          {doubleFrame && (
            <path
              d={framePath(size.w, size.h, cut, 7)}
              stroke="rgb(var(--gold))"
              strokeOpacity="0.14"
              strokeWidth="1"
            />
          )}
          {/* two connection points on the card's own corners */}
          <circle cx={cut / 2 + 0.5} cy={cut / 2 + 0.5} r="1.8" fill="rgb(var(--gold-soft))" />
          <circle cx={size.w - cut / 2 - 0.5} cy={size.h - cut / 2 - 0.5} r="1.8" fill="rgb(var(--gold-soft))" />
        </svg>
      )}
    </div>
  );
}
