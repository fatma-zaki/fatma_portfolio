import Image from "next/image";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The display FZ monogram — the hero's principal artwork.
 *
 * Set in the brand's display serif and filled with a metallic gold ramp
 * (deep → primary → highlight → primary → deep), which reads as a struck
 * medal rather than flat yellow. The `Z` tucks under the `F`'s lower arm,
 * so the two letters lock into a single mark instead of reading as text.
 *
 * Scale is driven entirely by the parent's `font-size`, so one component
 * serves every size. Swapping in the final asset needs only `brand.logoSrc`
 * — the image is drawn at its natural aspect ratio and never stretched.
 */
export function Monogram({ className }: { className?: string }) {
  if (brand.logoSrc) {
    return (
      <Image
        src={brand.logoSrc}
        alt={`${brand.fullName} — ${brand.initials} monogram`}
        width={brand.logoWidth}
        height={brand.logoHeight}
        priority
        sizes="(max-width: 1024px) 80vw, 40vw"
        // Width comes from the parent; height follows the asset's own ratio,
        // so the lockup is never stretched.
        className={cn("w-full h-auto object-contain filter drop-shadow-[0_0_36px_rgba(212,175,55,0.32)]", className)}
      />
    );
  }

  return (
    <span
      className={cn("fz-monogram", className)}
      role="img"
      aria-label={`${brand.initials} monogram`}
    >
      <span className="fz-monogram__glyph">{brand.initials[0]}</span>
      <span className="fz-monogram__glyph fz-monogram__glyph--z">
        {brand.initials[1]}
      </span>
    </span>
  );
}
