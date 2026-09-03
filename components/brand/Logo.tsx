"use client";

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/* ==========================================================================
   FZ MONOGRAM
   The mark is drawn in `currentColor`, so any caller sets the color once
   (`text-gold`, `text-primary`, …) and every stroke follows.

   To swap in the final logo asset: drop the file in `public/brand/` and set
   `logoSrc` in `lib/brand.ts`. This component then renders that asset — at
   its natural aspect ratio, never stretched — everywhere the logo appears.
   ========================================================================== */

interface LogoProps {
  /** Rendered box size in px. */
  size?: number;
  /** Draw the surrounding chip frame with its circuit pins. */
  frame?: boolean;
  className?: string;
}

export function Logo({ size = 40, frame = true, className }: LogoProps) {
  // The square mark is the letterforms only — the full lockup's circuit
  // wings turn to mush below about 80px.
  if (brand.markSrc) {
    return (
      <Image
        src={brand.markSrc}
        alt={`${brand.fullName} monogram`}
        width={size}
        height={size}
        priority
        className={cn("object-contain flex-shrink-0", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={`${brand.initials} monogram`}
      className={cn("flex-shrink-0", className)}
    >
      {frame && (
        <g stroke="currentColor" opacity={0.4}>
          {/* Chip outline */}
          <rect
            x="5"
            y="5"
            width="54"
            height="54"
            rx="11"
            strokeWidth="1.25"
          />
          {/* Circuit pins */}
          <g strokeWidth="1.25" strokeLinecap="square">
            <path d="M24 2v3M40 2v3M24 59v3M40 59v3" />
            <path d="M2 24h3M2 40h3M59 24h3M59 40h3" />
          </g>
        </g>
      )}

      {/* F */}
      <g
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        fill="none"
      >
        <path d="M18 22v22M18 22h12M18 32h9" />
        {/* Z */}
        <path d="M34 22h12L34 44h12" />
      </g>

      {/* Connection trace linking the two letterforms */}
      <g stroke="currentColor" strokeWidth="1.4" opacity={0.65}>
        <path d="M28.5 32h11" strokeLinecap="round" />
      </g>
      <rect
        x="31.6"
        y="30.1"
        width="3.8"
        height="3.8"
        transform="rotate(45 33.5 32)"
        fill="currentColor"
      />
    </svg>
  );
}

/* ==========================================================================
   BRAND LOCKUP — monogram + name (+ title)
   ========================================================================== */

interface BrandLockupProps {
  /** `sm` for the navbar, `md` for the mobile drawer, `lg` for the footer. */
  size?: "sm" | "md" | "lg";
  /** Show the "SOFTWARE ENGINEER" line under the name. */
  showTitle?: boolean;
  className?: string;
}

const lockupSizes = {
  sm: { mark: 34, name: "text-base", title: "text-[9px]" },
  md: { mark: 40, name: "text-lg", title: "text-[10px]" },
  lg: { mark: 52, name: "text-2xl", title: "text-[11px]" },
} as const;

export function BrandLockup({
  size = "sm",
  showTitle = false,
  className,
}: BrandLockupProps) {
  const s = lockupSizes[size];

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Logo size={s.mark} className="text-gold" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-[0.22em] text-primary uppercase",
            s.name
          )}
        >
          {brand.firstName}{" "}
          <span className="text-gradient-gold">{brand.lastName}</span>
        </span>
        {showTitle && (
          <span
            className={cn(
              "mt-1.5 font-body font-medium tracking-[0.3em] uppercase text-muted",
              s.title
            )}
          >
            {brand.title}
          </span>
        )}
      </span>
    </span>
  );
}

/* ==========================================================================
   BRAND LINK — the lockup as a "back to top" anchor (navbar + drawer)
   ========================================================================== */

export function BrandLink({
  onNavigate,
  size = "sm",
  showTitle = false,
  className,
}: BrandLockupProps & { onNavigate?: () => void }) {
  return (
    <Link
      href="#home"
      onClick={(e) => {
        if (!onNavigate) return;
        e.preventDefault();
        onNavigate();
      }}
      aria-label={`${brand.fullName} — back to top`}
      className={cn(
        "group rounded-brand transition-opacity duration-300 hover:opacity-90",
        className
      )}
    >
      <BrandLockup size={size} showTitle={showTitle} />
    </Link>
  );
}
