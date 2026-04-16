"use client";

import { useState, useRef, forwardRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectCard = forwardRef<HTMLElement, { project: (typeof projects)[0]; index: number }>(
  function ProjectCard({ project, index }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                 rounded-2xl overflow-hidden gold-glow-hover transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gold/10 to-gold/5">
        <div className="absolute inset-0 bg-gradient-to-t dark:from-dark-card from-white to-transparent z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover overlay links */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-dark-bg text-xs font-semibold
                       hover:bg-gold-light transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={12} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full dark:bg-dark-bg/90 bg-white/90
                       dark:text-white text-gray-900 text-xs font-semibold
                       hover:bg-gold/20 transition-colors shadow-lg border dark:border-dark-border border-light-border"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={12} />
            GitHub
          </a>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-gold/90 text-dark-bg text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-base dark:text-gray-100 text-gray-900 leading-tight group-hover:text-gold transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="dark:text-gray-600 text-gray-400 group-hover:text-gold transition-colors flex-shrink-0 mt-0.5"
          />
        </div>

        <p className="text-xs dark:text-gray-400 text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md
                         dark:bg-dark-bg bg-light-card
                         dark:text-gray-400 text-gray-500
                         dark:border-dark-border border border-light-border"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md dark:text-gray-500 text-gray-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
);

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
      className="section-padding dark:bg-dark-bg bg-light-bg relative overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-gold/3 dark:bg-gold/5 blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
            My work
          </p>
          <h2 className="section-title dark:text-gray-100 text-gray-900 mb-4">
            Featured Projects
          </h2>
          <div className="divider-gold" />
          <p className="mt-6 dark:text-gray-400 text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
            A selection of projects that showcase my skills, creativity, and passion for building exceptional web experiences.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {projectCategories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-medium transition-all duration-200",
                activeCategory === cat.value
                  ? "bg-gold text-dark-bg shadow-lg shadow-gold/25"
                  : "dark:bg-dark-card bg-white dark:border-dark-border border border-light-border dark:text-gray-400 text-gray-500 hover:border-gold/40 hover:text-gold dark:hover:text-gold"
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/fatmazaki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline text-sm"
          >
            <Github size={16} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
