"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, Star, type LucideIcon } from "lucide-react";
import { CircuitCorner } from "@/components/brand/Circuit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timelineItems, type TimelineItem } from "@/data/experience";
import { cn } from "@/lib/utils";

/**
 * Entry types are distinguished by icon and by how much gold they carry —
 * never by a different hue, so the timeline reads as one system.
 */
const typeConfig: Record<
  TimelineItem["type"],
  { icon: LucideIcon; emphasis: "gold" | "neutral" }
> = {
  work: { icon: Briefcase, emphasis: "gold" },
  certification: { icon: Award, emphasis: "gold" },
  education: { icon: GraduationCap, emphasis: "neutral" },
  milestone: { icon: Star, emphasis: "neutral" },
};

const chipStyles = {
  gold: "bg-gold/10 border-gold/35 text-gold",
  neutral: "bg-canvas border-line text-secondary",
} as const;

/** Diamond connection node that sits on the timeline rail. */
function TimelineNode({
  emphasis,
  delay,
  className,
}: {
  emphasis: "gold" | "neutral";
  delay: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, type: "spring", stiffness: 260 }}
      aria-hidden="true"
      className={cn(
        "block w-3 h-3 rotate-45 border shadow-[0_0_12px_-2px_rgb(var(--gold)/0.6)]",
        emphasis === "gold"
          ? "bg-gold border-gold"
          : "bg-canvas border-gold/60",
        className
      )}
    />
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) {
  const config = typeConfig[item.type];
  const alignRight = align === "right";

  return (
    <div className="surface-card-interactive group relative overflow-hidden p-6 h-full">
      <CircuitCorner
        position={alignRight ? "bl" : "br"}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div
        className={cn(
          "flex items-center gap-3 mb-4",
          alignRight && "lg:flex-row-reverse"
        )}
      >
        <span
          className={cn(
            "inline-flex p-2 rounded-brand border transition-colors",
            chipStyles[config.emphasis]
          )}
        >
          <config.icon size={13} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
          {item.type}
        </span>
        <span
          className={cn(
            "h-px flex-1 bg-line",
            alignRight ? "lg:order-first" : ""
          )}
        />
        <span className="font-mono text-[11px] text-gold-ink border border-gold/25 bg-gold/[0.06] px-2 py-0.5 rounded-[3px] flex-shrink-0">
          {item.year}
        </span>
      </div>

      <div className={cn(alignRight && "lg:text-right")}>
        <h3 className="font-display font-bold text-base leading-snug tracking-[0.03em] text-primary">
          {item.title}
        </h3>
        <p className="text-xs font-medium text-gold-ink mt-1.5 mb-3">
          {item.subtitle}
        </p>
        <p className="text-xs text-muted leading-relaxed mb-4">
          {item.description}
        </p>

        {item.tags && (
          <div
            className={cn(
              "flex flex-wrap gap-1.5",
              alignRight && "lg:justify-end"
            )}
          >
            {item.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-padding bg-canvas relative overflow-hidden"
    >
      <div className="container-max relative" ref={ref}>
        <SectionHeading
          eyebrow="Engineering journey"
          title="Experience & Growth"
          description="From first lines of HTML to building scalable production applications — here's how my story unfolded."
          className="mb-14"
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-14"
        >
          {(
            Object.entries(typeConfig) as [
              TimelineItem["type"],
              (typeof typeConfig)[TimelineItem["type"]]
            ][]
          ).map(([type, config]) => (
            <span key={type} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex p-1.5 rounded-[4px] border",
                  chipStyles[config.emphasis]
                )}
              >
                <config.icon size={10} />
              </span>
              <span className="text-[11px] text-muted capitalize tracking-wide">
                {type}
              </span>
            </span>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Rail — left on mobile, centred on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 w-px left-[5px] lg:left-1/2 lg:-translate-x-1/2
                       bg-gradient-to-b from-transparent via-gold/30 to-transparent"
          />

          <ol className="space-y-8 lg:space-y-0">
            {timelineItems.map((item, i) => {
              const onLeft = i % 2 === 0;
              const config = typeConfig[item.type];

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className="relative pl-8 lg:pl-0 lg:grid lg:grid-cols-[1fr_64px_1fr] lg:mb-10"
                >
                  {/* Mobile node */}
                  <TimelineNode
                    emphasis={config.emphasis}
                    delay={0.15}
                    className="absolute left-0 top-7 lg:hidden"
                  />

                  {onLeft ? (
                    <>
                      <div className="lg:pr-2">
                        <TimelineCard item={item} align="right" />
                      </div>
                      <div className="hidden lg:flex justify-center pt-7">
                        <TimelineNode emphasis={config.emphasis} delay={0.2} />
                      </div>
                      <div className="hidden lg:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block" />
                      <div className="hidden lg:flex justify-center pt-7">
                        <TimelineNode emphasis={config.emphasis} delay={0.2} />
                      </div>
                      <div className="lg:pl-2">
                        <TimelineCard item={item} align="left" />
                      </div>
                    </>
                  )}
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
