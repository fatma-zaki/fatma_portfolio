"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EngineeredHeading } from "@/components/ui/EngineeredHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProjectsBackdrop } from "@/components/brand/ProjectsBackdrop";
import { ProjectMockup, ShotComposition } from "@/components/brand/ProjectVisuals";
import { moreProjectsUrl, projectNumber, projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * FEATURED PROJECTS — a collection of independent systems.
 *
 *   featured project   the first entry, full width
 *   project collection every other entry, one flat grid (3 / 2 / 1 columns)
 *   more projects      a technical navigation line out to the rest of the work
 *
 * The circuitry belongs to the section, never between projects: horizontal
 * rules mark the section's tiers, and each card carries its own isolated
 * trace and nodes. Nothing is drawn from one project to another. The grid
 * takes any number of projects — add entries in `data/projects.ts`.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function MetaBar({
  project,
  num,
  compact = false,
  boxed = false,
}: {
  project: Project;
  num: string;
  compact?: boolean;
  /** Set in its own framed strip (featured card) rather than over a rule. */
  boxed?: boolean;
}) {
  const scope = project.scope.split(" + ");
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 font-tech uppercase whitespace-nowrap",
        compact ? "text-[8.5px] tracking-[0.14em]" : "text-[9.5px] tracking-[0.22em]",
        boxed
          ? "rounded-[3px] border border-gold/20 bg-abyss/40 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          : "border-b border-line/80 pb-3"
      )}
    >
      <p className="flex items-center gap-2 text-muted">
        <span className="text-gold-ink">{num}</span>
        <span className="text-gold-ink/50">/</span>
        <span className="text-secondary">{project.category}</span>
      </p>
      <p className="hidden sm:flex items-center gap-1.5 text-muted/80">
        {scope.map((s, i) => (
          <span key={s} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gold-ink/70">+</span>}
            {s}
          </span>
        ))}
      </p>
    </div>
  );
}

function StackBadges({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-[2px] border border-line-strong/80 bg-abyss/60 px-2.5 py-1 font-tech text-[10px] text-secondary
                     transition-colors duration-200 hover:border-gold/50 hover:text-gold-ink"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ActionLink({
  href,
  label,
  title,
  external = false,
  className,
  iconSize,
}: {
  href: string;
  label: string;
  title: string;
  external?: boolean;
  className: string;
  iconSize: number;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className, "group/act inline-flex items-center gap-2.5 transition-colors")}
    >
      {label}
      <Icon
        size={iconSize}
        className={cn(
          "transition-transform duration-300",
          external ? "group-hover/act:-translate-y-0.5 group-hover/act:translate-x-0.5" : "group-hover/act:translate-x-1"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">: {title}</span>
    </a>
  );
}

/**
 * The card's actions: the case study first; the live product beside it (or
 * instead of it); an honest "soon" when there is neither.
 */
function ProjectAction({ project, size = "md" }: { project: Project; size?: "md" | "sm" }) {
  const text = cn(
    "font-tech font-medium uppercase",
    size === "md" ? "text-[10.5px] tracking-[0.26em]" : "text-[9.5px] tracking-[0.22em]"
  );
  const iconSize = size === "md" ? 13 : 12;
  const { caseStudyUrl, liveUrl, title } = project;

  if (caseStudyUrl || liveUrl) {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {caseStudyUrl && (
          <ActionLink
            href={caseStudyUrl}
            label="View case study"
            title={title}
            iconSize={iconSize}
            className={cn(text, "text-gold-ink hover:text-gold-soft")}
          />
        )}
        {caseStudyUrl && liveUrl && <span aria-hidden="true" className="hidden sm:block h-3 w-px bg-line-strong" />}
        {liveUrl && (
          <ActionLink
            href={liveUrl}
            label={caseStudyUrl ? "Live demo" : "View project"}
            title={title}
            external
            iconSize={iconSize}
            className={cn(text, caseStudyUrl ? "text-secondary hover:text-gold-ink" : "text-gold-ink hover:text-gold-soft")}
          />
        )}
      </div>
    );
  }

  return (
    <p className={cn(text, "inline-flex items-center gap-3 text-gold-ink/55")}>
      <span className="inline-flex items-center gap-2.5">
        {size === "md" ? "View case study" : "Case study"}
        <ArrowRight size={iconSize} aria-hidden="true" />
      </span>
      <span className="rounded-[2px] border border-line px-1.5 py-0.5 text-[8.5px] tracking-[0.2em] text-muted">
        Soon
      </span>
    </p>
  );
}

function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  if (project.shots) {
    return <ShotComposition title={project.title} shots={project.shots} sizes={sizes} />;
  }
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} interface`}
        fill
        sizes={sizes}
        className="object-cover object-left-top"
      />
    );
  }
  return (
    <div role="img" aria-label={`${project.title} interface preview`} className="absolute inset-0">
      <ProjectMockup visual={project.visual} />
    </div>
  );
}

/**
 * A card's own circuitry — it starts and ends inside the card, so it reads as
 * that system's internals, never as a link to a neighbour.
 */
function CardCircuit({ variant = "module" }: { variant?: "lead" | "module" }) {
  const lead = variant === "lead";
  return (
    <svg
      aria-hidden="true"
      viewBox={lead ? "0 0 600 400" : "0 0 360 200"}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      {lead ? (
        <>
          <path d="M600 60 H520 L480 100 H400" className="fz-trace fz-trace--t3" />
          <path d="M600 330 H540 L500 370 H380" className="fz-trace fz-trace--t3" />
          <path d="M0 200 H60" className="fz-trace fz-trace--t3" />
          <circle cx="400" cy="100" r="2.2" className="fz-node" />
          <circle cx="380" cy="370" r="2.2" className="fz-node" />
          <circle cx="60" cy="200" r="2.2" className="fz-node" />
        </>
      ) : (
        <>
          <path d="M360 26 H318 L300 44 H268" className="fz-trace fz-trace--t3" />
          <path d="M0 150 H26 L40 164" className="fz-trace fz-trace--t3" />
          <circle cx="268" cy="44" r="1.8" className="fz-node" />
          <circle cx="40" cy="164" r="1.8" className="fz-node" />
        </>
      )}
    </svg>
  );
}

/**
 * A tier label for the section: node, tracked label, a hairline running out
 * to the edge, and a tiny count. Horizontal only — it separates tiers, it
 * doesn't connect them.
 */
function TierLabel({ label, meta }: { label: string; meta: string }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-3 font-tech text-[9px] sm:text-[9.5px] uppercase tracking-[0.3em]"
    >
      <span className="h-[5px] w-[5px] rotate-45 bg-gold/70" />
      <span className="text-gold-ink whitespace-nowrap">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-gold/35 via-gold/12 to-transparent" />
      <span className="text-muted/70 whitespace-nowrap">{meta}</span>
    </motion.div>
  );
}

/** Title with an optional gold lead-in ("Go" + "Link"). */
function ProjectTitle({ project }: { project: Project }) {
  const accent = project.titleAccent;
  if (accent && project.title.startsWith(accent)) {
    return (
      <>
        <span className="text-gradient-gold">{accent}</span>
        {project.title.slice(accent.length)}
      </>
    );
  }
  return <>{project.title}</>;
}

/**
 * A lit event-stage structure — trusses, a perspective floor, rig lights —
 * drawn faintly behind the GoLink product shot (events platform only), in
 * the way the reference lets a venue glow through the glass.
 */
function StageTruss() {
  const bulbs: [number, number][] = [
    [300, 58], [360, 58], [420, 58], [480, 58], [540, 58],
    [262, 120], [578, 120], [262, 190], [578, 190],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-100 [mask-image:radial-gradient(ellipse_75%_70%_at_62%_45%,black,transparent_85%)]"
      fill="none"
    >
      {/* perspective floor */}
      {[-240, -120, 0, 120, 240, 360].map((dx) => (
        <line key={dx} x1={420} y1={250} x2={420 + dx * 2.2} y2={400} stroke="rgb(var(--gold))" strokeOpacity="0.11" />
      ))}
      {[270, 300, 340, 390].map((y) => (
        <line key={y} x1={0} y1={y} x2={640} y2={y} stroke="rgb(var(--gold))" strokeOpacity="0.06" />
      ))}
      {/* truss towers and header */}
      {[250, 590].map((x) => (
        <g key={x} stroke="rgb(var(--gold))" strokeOpacity="0.28">
          <line x1={x} y1={40} x2={x} y2={260} />
          <line x1={x + 12} y1={40} x2={x + 12} y2={260} />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={x} y1={40 + i * 20} x2={x + 12} y2={60 + i * 20} />
          ))}
        </g>
      ))}
      <g stroke="rgb(var(--gold))" strokeOpacity="0.28">
        <line x1={250} y1={40} x2={602} y2={40} />
        <line x1={250} y1={52} x2={602} y2={52} />
        {Array.from({ length: 22 }, (_, i) => (
          <line key={i} x1={250 + i * 16} y1={40} x2={266 + i * 16} y2={52} />
        ))}
      </g>
      {/* rig lights and their beams */}
      {bulbs.slice(0, 5).map(([x, y]) => (
        <path key={`b${x}`} d={`M${x} ${y} L${x - 38} 260 L${x + 38} 260 Z`} fill="rgb(var(--gold))" fillOpacity="0.045" />
      ))}
      {bulbs.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={5} fill="rgb(var(--gold))" fillOpacity="0.22" />
          <circle cx={x} cy={y} r={1.6} fill="rgb(var(--gold-soft))" fillOpacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="group"
    >
      <GlassCard cut={24} tilt={1.4} doubleFrame>
        <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="relative flex flex-col p-6 sm:p-8 lg:p-10">
            <MetaBar project={project} num={projectNumber(0)} boxed />

            <h3 className="mt-8 flex items-center gap-3 font-display text-[2rem] sm:text-[2.6rem] font-semibold leading-none tracking-[0.02em] text-primary">
              <span>
                <ProjectTitle project={project} />
              </span>
              <ArrowRight
                size={22}
                strokeWidth={1.5}
                className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </h3>

            <p className="mt-5 max-w-[46ch] text-sm sm:text-[15px] leading-[1.75] text-secondary">
              {project.description}
            </p>

            <div className="mt-7">
              <StackBadges stack={project.techStack} />
            </div>

            <div className="mt-9 lg:mt-auto lg:pt-10">
              <ProjectAction project={project} />
            </div>
          </div>

          <div className="relative min-h-[270px] sm:min-h-[360px] overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_60%_45%,rgb(var(--gold)/0.12),transparent_72%)]"
            />
            {project.visual === "golink" && <StageTruss />}
            <CardCircuit variant="lead" />
            <div className="absolute inset-[7%] sm:inset-[8%] transition-transform duration-700 ease-brand group-hover:scale-[1.015]">
              <ProjectVisual project={project} sizes="(max-width: 1024px) 100vw, 640px" />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      // stagger within a row only, so long lists don't reveal ever later
      transition={{ duration: 0.7, delay: 0.1 + (index % 3) * 0.12, ease: EASE }}
      className="group h-full"
    >
      <GlassCard cut={16} tilt={3} className="h-full">
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col p-6">
            <MetaBar project={project} num={projectNumber(index + 1)} compact />
            <h3 className="mt-6 flex items-center gap-2.5 font-display text-xl font-semibold tracking-[0.02em] text-primary">
              <span>
                <ProjectTitle project={project} />
              </span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="text-gold transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </h3>
            <p className="mt-3 text-[13px] leading-[1.7] text-muted">{project.description}</p>
            <div className="mt-5">
              <StackBadges stack={project.techStack} />
            </div>
            <div className="mt-auto pt-6">
              <ProjectAction project={project} size="sm" />
            </div>
          </div>

          <div className="relative h-48 sm:h-52 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgb(var(--gold)/0.12),transparent_70%)]"
            />
            <CardCircuit />
            {/* the screen sits in its own thin gold-edged bay */}
            <div className="absolute inset-x-[5%] top-[8%] bottom-0 overflow-hidden rounded-t-[4px] border border-b-0 border-gold/25 transition-transform duration-700 ease-brand group-hover:scale-[1.03]">
              <div className="absolute inset-x-0 top-[6%] bottom-0">
                <ProjectVisual project={project} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px" />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}

/** Technical navigation out to the rest of the work — not a button. */
function MoreProjects() {
  return (
    <motion.a
      href={moreProjectsUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 font-tech uppercase"
    >
      <span className="flex items-center gap-3 text-[9.5px] tracking-[0.32em] text-muted whitespace-nowrap">
        <span aria-hidden="true" className="h-[5px] w-[5px] rotate-45 border border-gold/80 bg-abyss transition-colors duration-300 group-hover:bg-gold" />
        More projects
      </span>

      {/* the line, with an isolated node that slides along it on hover */}
      <span aria-hidden="true" className="relative hidden h-px flex-1 sm:block bg-gradient-to-r from-gold/40 via-gold/15 to-gold/40">
        <span
          className="absolute left-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-gold/80
                     shadow-[0_0_8px_rgb(var(--gold)/0.8)] transition-[left] duration-700 ease-brand group-hover:left-[calc(100%-5px)]"
        />
      </span>

      <span className="flex items-center gap-2.5 text-[10.5px] tracking-[0.24em] text-gold-ink transition-colors duration-300 group-hover:text-gold-soft whitespace-nowrap">
        Explore more engineering work
        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </motion.a>
  );
}

export function Projects() {
  const [featured, ...collection] = projects;

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-abyss px-5 sm:px-8 lg:px-12 pt-0 pb-24 sm:pb-28 lg:pb-32"
    >
      <ProjectsBackdrop />

      <div className="container-max relative z-10">
        <EngineeredHeading
          joined
          eyebrow="Selected Work"
          title="Featured Projects"
          subtitle="Real solutions. Built with modern technologies."
          description="A collection of projects that showcase my ability to build scalable systems, solve real problems, and deliver end-to-end solutions."
        />

        {featured && (
          <div className="mt-16">
            <TierLabel label="Featured project" meta={projectNumber(0)} />
            <div className="mt-6">
              <FeaturedProject project={featured} />
            </div>
          </div>
        )}

        {collection.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <TierLabel
              label="Project collection"
              meta={`${projectNumber(1)} — ${projectNumber(projects.length - 1)}`}
            />
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collection.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 sm:mt-20">
          <MoreProjects />
        </div>
      </div>
    </section>
  );
}
