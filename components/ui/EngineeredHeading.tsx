"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EngineeredHeadingProps {
  eyebrow: string;
  title: string;
  /** Tracked technical line under the title. */
  subtitle: string;
  description: string;
  /** The incoming trace continues one that ended at the previous section's edge. */
  joined?: boolean;
  className?: string;
}

/**
 * The header shared by Skills and Projects so the two read as one system:
 * a trace dropping in from above, a technical eyebrow, the editorial serif
 * title, a monospaced subtitle on a gold rule, then a short plain lede.
 */
export function EngineeredHeading({
  eyebrow,
  title,
  subtitle,
  description,
  joined = false,
  className,
}: EngineeredHeadingProps) {
  const reduce = useReducedMotion();
  const rise = reduce ? 0 : 18;

  return (
    <motion.div
      initial={{ opacity: 0, y: rise }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative flex flex-col items-center text-center", className)}
    >
      {/* the incoming trace and its terminal node */}
      <span
        aria-hidden="true"
        className={cn(
          "h-12 sm:h-16 w-px bg-gradient-to-b to-gold/45",
          joined ? "from-gold/45" : "from-transparent"
        )}
      />
      <span aria-hidden="true" className="w-[7px] h-[7px] rotate-45 border border-gold bg-abyss" />

      <p className="mt-6 flex items-center gap-3 font-tech text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.34em] text-gold-ink">
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
      </p>

      <h2 className="mt-5 font-display font-semibold uppercase text-primary leading-[1.05] tracking-[0.05em] text-[clamp(1.9rem,6vw,3.4rem)]">
        {title}
      </h2>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold/50" aria-hidden="true" />
        <p className="font-tech text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.3em] text-gold-ink/90">
          {subtitle}
        </p>
        <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold/50" aria-hidden="true" />
      </div>

      <p className="mt-6 max-w-[52ch] text-sm sm:text-[15px] leading-[1.75] text-secondary">
        {description}
      </p>
    </motion.div>
  );
}
