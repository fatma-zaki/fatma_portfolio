"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/skills";

// Skill level indicator
function SkillLevel({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            i < level
              ? "bg-gold"
              : "dark:bg-gray-700 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// Skill icon mapping (text abbreviations)
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

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="section-padding dark:bg-dark-surface/50 bg-light-card relative overflow-hidden"
    >
      {/* Decorations */}
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-gold/3 dark:bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
            My toolkit
          </p>
          <h2 className="section-title dark:text-gray-100 text-gray-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="divider-gold" />
          <p className="mt-6 dark:text-gray-400 text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            A curated set of tools and technologies I use to bring ideas to life — from pixel-perfect UI to robust application architecture.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                         rounded-2xl p-6 group gold-glow-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b dark:border-dark-border border-light-border">
                <span className="text-2xl">{category.emoji}</span>
                <h3 className="font-semibold text-sm dark:text-gray-200 text-gray-800 tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3,
                    }}
                    className="flex items-center justify-between group/skill"
                  >
                    <div className="flex items-center gap-3">
                      {/* Skill Icon Badge */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold
                                   dark:bg-dark-bg bg-light-card border dark:border-dark-border border-light-border
                                   text-gold group-hover/skill:border-gold/40 group-hover/skill:bg-gold/5
                                   transition-all duration-200 flex-shrink-0"
                      >
                        {skillIconMap[skill.icon] || skill.icon.toUpperCase().slice(0, 2)}
                      </div>
                      <span className="text-xs dark:text-gray-300 text-gray-700 font-medium">
                        {skill.name}
                      </span>
                    </div>
                    <SkillLevel level={skill.level} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech cloud / pill list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] dark:text-gray-500 text-gray-400 mb-5">
            Also familiar with
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "GraphQL", "Socket.io", "Storybook", "Jest", "Cypress",
              "Docker basics", "Webpack", "Vite", "ESLint", "Prettier",
              "Lighthouse", "Web Vitals", "a11y", "i18n", "PWA",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-full
                           dark:bg-dark-card bg-light-card
                           dark:border-dark-border border border-light-border
                           dark:text-gray-400 text-gray-500
                           hover:border-gold/40 hover:text-gold dark:hover:text-gold
                           transition-all duration-200 cursor-default"
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
