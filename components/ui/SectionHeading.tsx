"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small tracked label above the title. */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * The one section header used across every section: tracked eyebrow,
 * display-serif title, gold rule with a connection node, optional lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("text-center", className)}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <div className="mx-auto my-6 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
      {description && (
        <p className="mt-5 text-secondary max-w-xl mx-auto text-sm leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
