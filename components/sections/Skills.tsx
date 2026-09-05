"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Network, LayoutTemplate, TerminalSquare, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, emergingTech, type SkillCategoryIcon } from "@/data/skills";

const categoryIcons: Record<SkillCategoryIcon, LucideIcon> = {
  systems: Cpu,
  architecture: Network,
  ui: LayoutTemplate,
  tooling: TerminalSquare,
};

const tagStyles = {
  Architecture: "text-gold border-gold/40 bg-gold/10",
  Core: "text-primary border-gold/25 bg-surface",
  Advanced: "text-gold-soft border-gold/20 bg-surface/80",
  Standard: "text-muted border-line bg-canvas",
} as const;

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-padding bg-canvas relative overflow-hidden"
    >
      <div className="container-max relative z-10" ref={ref}>
        <SectionHeading
          eyebrow="Engineering Stack"
          title="Skills & Technologies"
          description="An architectural breakdown of the core systems, frameworks, and engineering tools I leverage to construct high-performance digital products."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.icon];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: catIndex * 0.08 }}
                className="surface-card p-6 flex flex-col justify-between hover:border-gold/40 transition-all duration-300 group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start gap-3.5 mb-6 pb-4 border-b border-line">
                    <span className="p-2.5 rounded-brand bg-gold/10 border border-gold/25 text-gold group-hover:border-gold/50 transition-colors flex-shrink-0">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-xs uppercase tracking-[0.14em] text-primary group-hover:text-gold transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[10px] text-muted tracking-wide mt-0.5">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills list */}
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.35,
                          delay: catIndex * 0.08 + skillIndex * 0.03 + 0.2,
                        }}
                        className="flex items-center justify-between gap-2 text-xs py-1"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-7 h-7 rounded-[4px] flex items-center justify-center
                                       text-[9px] font-bold font-mono tracking-tight
                                       bg-canvas border border-line text-gold-ink flex-shrink-0"
                            aria-hidden="true"
                          >
                            {skill.badge}
                          </span>
                          <span className="text-secondary font-medium truncate">
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-[3px] border ${
                            tagStyles[skill.tag]
                          }`}
                        >
                          {skill.tag}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emerging & Extended Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted mb-5 font-semibold">
            Emerging Tech &amp; Architectural Focus
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {emergingTech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-[4px] text-xs font-mono text-secondary bg-surface border border-line hover:border-gold/45 hover:text-gold transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
