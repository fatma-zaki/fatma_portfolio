"use client";

import { useState, useRef, forwardRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

function ProjectActions({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center gap-3
                 bg-[rgb(7_11_22)]/70 opacity-0 backdrop-blur-sm
                 group-hover:opacity-100 group-focus-within:opacity-100
                 transition-opacity duration-300"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold-solid !px-4 !py-2 text-[11px]"
      >
        <ExternalLink size={13} />
        Live System
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold-outline !px-4 !py-2 text-[11px]"
      >
        <Github size={13} className="text-gold" />
        Repository
      </a>
    </div>
  );
}

function TechTags({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <span
          key={tech}
          className="px-2.5 py-1 text-[10px] font-mono rounded-[3px] bg-canvas border border-line text-muted hover:border-gold/40 hover:text-gold transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

const ProjectCard = forwardRef<
  HTMLElement,
  { project: Project; index: number; feature?: boolean }
>(function ProjectCard({ project, index, feature = false }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={cn(
        "surface-card group relative overflow-hidden flex flex-col justify-between hover:border-gold/45 hover:-translate-y-1 transition-all duration-300",
        feature ? "lg:col-span-2 lg:flex-row" : "col-span-1"
      )}
    >
      {/* Visual media preview */}
      <div
        className={cn(
          "relative overflow-hidden bg-canvas flex-shrink-0",
          feature ? "h-60 sm:h-72 lg:h-auto lg:w-1/2" : "h-48"
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes={
            feature
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        {/* Obsidian gradient scrim */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgb(17_26_46)] via-[rgb(17_26_46)]/20 to-transparent"
          aria-hidden="true"
        />
        <ProjectActions project={project} />

        {project.featured && (
          <span
            className="absolute top-3.5 left-3.5 z-10 inline-flex items-center gap-1.5
                       px-3 py-1 rounded-[3px] border border-gold/50
                       bg-[rgb(7_11_22)]/90 text-gold
                       text-[9px] font-bold uppercase tracking-[0.2em]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#D4AF37]" />
            Featured Architecture
          </span>
        )}
      </div>

      {/* Content panel */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 p-6 sm:p-7",
          feature && "lg:justify-between"
        )}
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-primary group-hover:text-gold transition-colors duration-200 leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-gold/80 font-medium mt-1">
                {project.subtitle}
              </p>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted group-hover:text-gold transition-all duration-200 mt-1 flex-shrink-0"
              aria-label={`Open ${project.title} live demo`}
            >
              <ArrowUpRight size={17} />
            </a>
          </div>

          {/* Architecture Highlight Tag */}
          <div className="my-3 flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-canvas border border-line text-secondary text-[11px] font-mono">
            <Cpu size={12} className="text-gold flex-shrink-0" />
            <span className="truncate">{project.architectureHighlight}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-auto pt-4 border-t border-line/60">
          <TechTags stack={project.techStack} />
        </div>
      </div>
    </motion.article>
  );
});

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <section
      id="projects"
      className="section-padding bg-deep relative overflow-hidden"
    >
      <div className="container-max relative z-10" ref={ref}>
        <SectionHeading
          eyebrow="Selected Engineering Work"
          title="Featured Projects"
          description="A curated showcase of applications, architectural patterns, and production systems demonstrating clean engineering, performance, and thoughtful design."
          className="mb-12"
        />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-5 py-2.5 rounded-brand text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-200",
                  isActive
                    ? "bg-gold/15 border border-gold text-gold shadow-[0_0_18px_rgba(212,175,55,0.25)]"
                    : "bg-surface border border-line text-muted hover:border-gold/40 hover:text-primary"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                feature={i === 0 && project.featured}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href={brand.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline inline-flex items-center gap-2.5"
          >
            <Github size={16} className="text-gold" />
            <span>EXPLORE ALL REPOSITORIES ON GITHUB</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
