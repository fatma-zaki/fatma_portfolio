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
  /** Rendered box size in px (height for full variant, width & height for mark). */
  size?: number;
  /** Variant: "mark" for square letterforms, "full" for full lockup with circuit wings. */
  variant?: "mark" | "full";
  className?: string;
}

export function Logo({ size = 40, variant = "mark", className }: LogoProps) {
  if (variant === "full" && brand.logoSrc) {
    const aspectRatio = brand.logoWidth / brand.logoHeight;
    const computedWidth = Math.round(size * aspectRatio);
    return (
      <Image
        src={brand.logoSrc}
        alt={`${brand.fullName} logo`}
        width={computedWidth}
        height={size}
        priority
        className={cn("object-contain flex-shrink-0", className)}
        style={{ height: size, width: "auto" }}
      />
    );
  }

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
      {/* F */}
      <g
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        fill="none"
      >
        <path d="M18 20v24M18 20h14M18 31h10" />
        {/* Z */}
        <path d="M34 20h14L34 44h14" />
      </g>

      {/* Elegant connector node */}
      <circle cx="32" cy="32" r="2" fill="currentColor" />
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
