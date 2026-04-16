"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award, Star } from "lucide-react";
import { timelineItems, type TimelineItem } from "@/data/experience";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  TimelineItem["type"],
  { icon: React.ComponentType<{ size?: number; className?: string }>; color: string; bg: string }
> = {
  work: { icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  education: { icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/30" },
  certification: { icon: Award, color: "text-gold", bg: "bg-gold/10 border-gold/30" },
  milestone: { icon: Star, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
};

function TimelineCard({ item, index, isLeft }: { item: TimelineItem; index: number; isLeft: boolean }) {
  const config = typeConfig[item.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative flex gap-6 items-start",
        isLeft ? "lg:flex-row-reverse lg:text-right" : "lg:flex-row"
      )}
    >
      {/* Card */}
      <div
        className={cn(
          "flex-1 dark:bg-dark-card bg-white border dark:border-dark-border border-light-border",
          "rounded-2xl p-6 group gold-glow-hover transition-all duration-300 hover:-translate-y-1",
          isLeft ? "lg:mr-0" : ""
        )}
      >
        <div className={cn("flex items-center gap-3 mb-3", isLeft ? "lg:flex-row-reverse" : "")}>
          <div className={cn("inline-flex p-2 rounded-lg border", config.bg)}>
            <config.icon size={14} className={config.color} />
          </div>
          <div>
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                config.color
              )}
            >
              {item.type}
            </span>
          </div>
        </div>

        <div className={cn("mb-1", isLeft ? "lg:text-right" : "")}>
          <span className="text-xs font-mono text-gold/70 bg-gold/5 border border-gold/20 px-2 py-0.5 rounded">
            {item.year}
          </span>
        </div>

        <h3 className="font-heading font-bold text-base dark:text-gray-100 text-gray-900 mt-2 mb-1 leading-tight">
          {item.title}
        </h3>
        <p className="text-xs font-medium dark:text-gray-400 text-gray-500 mb-3">
          {item.subtitle}
        </p>
        <p className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && (
          <div className={cn("flex flex-wrap gap-1.5", isLeft ? "lg:justify-end" : "")}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md
                           dark:bg-dark-bg bg-light-card
                           dark:text-gray-500 text-gray-500
                           dark:border-dark-border border border-light-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Timeline dot (hidden on mobile, visible on lg) */}
      <div className="hidden lg:flex flex-col items-center flex-shrink-0 w-12">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3, type: "spring" }}
          className={cn(
            "w-4 h-4 rounded-full border-2 border-gold bg-gold/20 z-10",
            "shadow-[0_0_8px_rgba(201,162,39,0.4)]"
          )}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="section-padding dark:bg-dark-surface/50 bg-light-card relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gold/3 dark:bg-gold/4 blur-3xl pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
            My journey
          </p>
          <h2 className="section-title dark:text-gray-100 text-gray-900 mb-4">
            Experience & Growth
          </h2>
          <div className="divider-gold" />
          <p className="mt-6 dark:text-gray-400 text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            From first lines of HTML to building scalable production applications — here&apos;s how my story unfolded.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {(Object.entries(typeConfig) as [TimelineItem["type"], typeof typeConfig[TimelineItem["type"]]][]).map(([type, config]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={cn("p-1.5 rounded-md border", config.bg)}>
                <config.icon size={10} className={config.color} />
              </div>
              <span className="text-xs dark:text-gray-400 text-gray-500 capitalize">{type}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

          <div className="space-y-6 lg:space-y-0">
            {timelineItems.map((item, i) => (
              <div key={item.id} className="lg:grid lg:grid-cols-[1fr_48px_1fr] lg:gap-0 lg:mb-10">
                {i % 2 === 0 ? (
                  <>
                    {/* Left card */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                                 rounded-2xl p-6 group gold-glow-hover transition-all duration-300 hover:-translate-y-1
                                 mb-4 lg:mb-0 lg:mr-6 text-right"
                    >
                      <TimelineCardContent item={item} align="right" />
                    </motion.div>
                    {/* Dot */}
                    <div className="hidden lg:flex items-start justify-center pt-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.08 + 0.3, type: "spring" }}
                        className="w-4 h-4 rounded-full border-2 border-gold bg-dark-bg dark:bg-dark-bg bg-white shadow-[0_0_10px_rgba(201,162,39,0.4)]"
                      />
                    </div>
                    {/* Empty right */}
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    {/* Empty left */}
                    <div className="hidden lg:block" />
                    {/* Dot */}
                    <div className="hidden lg:flex items-start justify-center pt-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.08 + 0.3, type: "spring" }}
                        className="w-4 h-4 rounded-full border-2 border-gold bg-dark-bg dark:bg-dark-bg bg-white shadow-[0_0_10px_rgba(201,162,39,0.4)]"
                      />
                    </div>
                    {/* Right card */}
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                                 rounded-2xl p-6 group gold-glow-hover transition-all duration-300 hover:-translate-y-1
                                 mb-4 lg:mb-0 lg:ml-6"
                    >
                      <TimelineCardContent item={item} align="left" />
                    </motion.div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCardContent({ item, align }: { item: TimelineItem; align: "left" | "right" }) {
  const config = typeConfig[item.type];
  const isRight = align === "right";

  return (
    <>
      <div className={cn("flex items-center gap-3 mb-3", isRight && "justify-end")}>
        <div className={cn("inline-flex p-2 rounded-lg border", config.bg, isRight && "order-2")}>
          <config.icon size={13} className={config.color} />
        </div>
        <span className={cn("text-[10px] font-bold uppercase tracking-wider", config.color)}>
          {item.type}
        </span>
      </div>

      <div className={cn("mb-2", isRight && "text-right")}>
        <span className="text-xs font-mono text-gold/70 bg-gold/5 border border-gold/20 px-2 py-0.5 rounded">
          {item.year}
        </span>
      </div>

      <h3 className="font-heading font-bold text-sm dark:text-gray-100 text-gray-900 mt-2 mb-1 leading-tight">
        {item.title}
      </h3>
      <p className="text-xs font-medium dark:text-gray-400 text-gray-500 mb-3">
        {item.subtitle}
      </p>
      <p className="text-xs dark:text-gray-400 text-gray-600 leading-relaxed mb-4">
        {item.description}
      </p>

      {item.tags && (
        <div className={cn("flex flex-wrap gap-1.5", isRight && "justify-end")}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md
                         dark:bg-dark-bg bg-light-bg
                         dark:text-gray-500 text-gray-500
                         dark:border-dark-border border border-light-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
