"use client";

import { useState, useRef, forwardRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { CircuitCorner } from "@/components/brand/Circuit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** Live / source buttons revealed over the artwork on hover and focus. */
function ProjectActions({ project }: { project: Project }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center gap-2.5
                 bg-[rgb(3_6_15)]/55 opacity-0
                 group-hover:opacity-100 group-focus-within:opacity-100
                 transition-opacity duration-300"
    >
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-on-media"
      >
        <ExternalLink size={12} />
        Live Demo
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-brand
                   border border-gold/45 text-[11px] font-semibold text-[rgb(245_245_245)]
                   bg-[rgb(13_19_38)]/70 hover:border-gold hover:-translate-y-0.5
                   transition-all duration-200"
      >
        <Github size={12} />
        Source
      </a>
    </div>
  );
}

function TechTags({ stack, max }: { stack: string[]; max: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.slice(0, max).map((tech) => (
        <span key={tech} className="tag">
          {tech}
        </span>
      ))}
      {stack.length > max && (
        <span className="tag border-transparent bg-transparent">
          +{stack.length - max}
        </span>
      )}
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={cn(
        "surface-card-interactive group relative overflow-hidden flex",
        feature
          ? "sm:col-span-2 flex-col sm:flex-row"
          : "flex-col"
      )}
    >
      {/* Artwork */}
      <div
        className={cn(
          "relative overflow-hidden bg-canvas flex-shrink-0",
          feature ? "h-52 sm:h-auto sm:w-1/2" : "h-44"
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes={
            feature
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
        {/* Navy wash keeps every thumbnail on-brand */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgb(13_19_38)]/70 via-[rgb(13_19_38)]/10 to-transparent"
          aria-hidden="true"
        />
        <ProjectActions project={project} />

        {project.featured && (
          <span
            className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5
                       px-2.5 py-1 rounded-[3px] border border-gold/50
                       bg-[rgb(13_19_38)]/80 text-gold
                       text-[9px] font-bold uppercase tracking-[0.18em]"
          >
            <span className="node-dot !w-1 !h-1" />
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0 p-5",
          feature && "sm:p-7 sm:justify-center"
        )}
      >
        <CircuitCorner
          position="br"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className={cn(
              "font-display font-bold leading-snug tracking-[0.03em] text-primary",
              "group-hover:text-gold-ink transition-colors duration-300",
              feature ? "text-lg sm:text-xl" : "text-[15px]"
            )}
          >
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="text-muted group-hover:text-gold flex-shrink-0 mt-1
                       transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>

        <p
          className={cn(
            "text-xs text-muted leading-relaxed mb-4",
            feature ? "line-clamp-4" : "line-clamp-2"
          )}
        >
          {project.description}
        </p>

        <div className="mt-auto">
          <TechTags stack={project.techStack} max={feature ? 5 : 3} />
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
      <div className="container-max relative" ref={ref}>
        <SectionHeading
          eyebrow="Selected work"
          title="Featured Projects"
          description="A selection of projects that showcase my skills, creativity, and passion for building exceptional web experiences."
          className="mb-12"
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="tablist"
          aria-label="Filter projects by technology"
          className="flex flex-wrap justify-center gap-2 mb-12"
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
                  "px-5 py-2 rounded-brand text-[11px] font-semibold uppercase tracking-[0.14em]",
                  "border transition-colors duration-200",
                  isActive
                    ? "bg-gold/12 border-gold/55 text-gold-ink"
                    : "bg-surface border-line text-muted hover:border-gold/35 hover:text-gold-ink"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grid — the lead featured project takes a wider, horizontal card */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href={brand.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
