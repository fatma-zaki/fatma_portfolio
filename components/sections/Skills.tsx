"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Wrench, Database, type LucideIcon } from "lucide-react";
import { CircuitCorner } from "@/components/brand/Circuit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, type SkillCategoryIcon } from "@/data/skills";

// One unified icon language — gold on dark, never per-category colors.
const categoryIcons: Record<SkillCategoryIcon, LucideIcon> = {
  frontend: Code2,
  styling: Palette,
  tools: Wrench,
  data: Database,
};

// Short technical abbreviations shown in each skill's badge.
const skillIconMap: Record<string, string> = {
  html: "HTML",
  css: "CSS",
  js: "JS",
  ts: "TS",
  react: "⚛",
  next: "▲",
  tailwind: "TW",
  framer: "FM",
  sass: "Sass",
  bootstrap: "BS",
  styled: "SC",
  modules: "CSS",
  git: "Git",
  github: "GH",
  vscode: "VS",
  api: "API",
  figma: "Fig",
  vercel: "▲",
  zustand: "ZS",
  query: "RQ",
  redux: "RD",
  context: "CTX",
  prisma: "PSM",
  firebase: "FB",
};

const familiarWith = [
  "GraphQL", "Socket.io", "Storybook", "Jest", "Cypress",
  "Docker basics", "Webpack", "Vite", "ESLint", "Prettier",
  "Lighthouse", "Web Vitals", "a11y", "i18n", "PWA",
];

/** Proficiency shown as a segmented gold rail rather than a colored bar. */
function SkillLevel({ level, name }: { level: number; name: string }) {
  return (
    <div
      className="flex gap-[3px] flex-shrink-0"
      role="img"
      aria-label={`${name}: ${level} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-[3px] w-3 rounded-[1px] transition-colors duration-300 ${
            i < level ? "bg-gold" : "bg-line-strong/60"
          }`}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-padding bg-canvas relative overflow-hidden"
    >
      <div className="container-max relative" ref={ref}>
        <SectionHeading
          eyebrow="Engineering stack"
          title="Skills & Technologies"
          description="A curated set of tools and technologies I use to bring ideas to life — from pixel-perfect UI to robust application architecture."
          className="mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.icon];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIndex * 0.08 }}
                className="surface-card-interactive group relative overflow-hidden p-6"
              >
                <CircuitCorner
                  position="tr"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-line">
                  <span className="inline-flex p-2 rounded-brand bg-gold/10 border border-gold/20 group-hover:border-gold/40 transition-colors">
                    <Icon size={15} className="text-gold" />
                  </span>
                  <h3 className="font-semibold text-[13px] tracking-[0.08em] uppercase text-primary">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIndex * 0.08 + skillIndex * 0.04 + 0.25,
                      }}
                      className="flex items-center justify-between gap-3 group/skill"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-8 h-8 rounded-brand flex items-center justify-center
                                     text-[9px] font-bold font-mono tracking-tight
                                     bg-canvas border border-line text-gold-ink flex-shrink-0
                                     group-hover/skill:border-gold/40 transition-colors duration-200"
                          aria-hidden="true"
                        >
                          {skillIconMap[skill.icon] ||
                            skill.icon.toUpperCase().slice(0, 3)}
                        </span>
                        <span className="text-xs text-secondary font-medium truncate">
                          {skill.name}
                        </span>
                      </span>
                      <SkillLevel level={skill.level} name={skill.name} />
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-6">
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {familiarWith.map((tech) => (
              <span key={tech} className="tag cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
