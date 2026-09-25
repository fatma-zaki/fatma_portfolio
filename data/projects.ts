/**
 * FEATURED PROJECTS — a collection of independent projects.
 *
 * The list is open-ended. The first entry renders as the wide featured panel;
 * every other entry joins the same flat grid (3 / 2 / 1 columns), in order.
 * Numbers ("01", "02", …) come from position, so adding a project is just
 * appending an object here — nothing else needs to change.
 *
 * Visuals, in order of preference:
 *   shots   real screenshots cut out of their backgrounds — a desktop window
 *           and optionally a phone — composed on the glass
 *   image   a single real screenshot in /public, used as a cover
 *   visual  one of the coded product mockups (structure only — skeleton rows,
 *           no invented metrics)
 *   —       none: a neutral blueprint plate in the house style
 */

import { brand } from "@/lib/brand";

export type ProjectVisual = "golink" | "boh" | "awar" | "commerce";

export interface Screenshot {
  src: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  category: string;
  /** Technical scope, e.g. "Web + Backend + Cloud". */
  scope: string;
  title: string;
  /** Leading part of the title set in gold, e.g. "Task" in TaskFlow. */
  titleAccent?: string;
  description: string;
  techStack: string[];
  /** Transparent cut-outs: a desktop window, plus a phone laid over it. */
  shots?: { desktop: Screenshot; mobile?: Screenshot };
  /** Optional real screenshot; used when there are no `shots`. */
  image?: string;
  visual?: ProjectVisual;
  /** Written case study — preferred target of the card's action. */
  caseStudyUrl?: string;
  /** Live product — the action when there's no case study, a second link when there is. */
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "taskflow",
    category: "Task Management",
    scope: "Web + Mobile + Backend",
    title: "TaskFlow",
    titleAccent: "Task",
    description:
      "A task & reminder system for teams. Managers assign work with deadlines and priorities, scheduled jobs send reminders and flag overdue tasks — and one codebase serves both a full web app and a native-feeling phone app.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "TanStack Query", "Express", "MongoDB", "JWT", "Vercel"],
    shots: {
      desktop: { src: "/taskflow-mockup/taskflow-window.png", width: 1400, height: 688 },
      mobile: { src: "/taskflow-mockup/taskflow-phone.png", width: 380, height: 857 },
    },
    liveUrl: "https://fatma-zaki-taskflow.vercel.app/",
    caseStudyUrl: "https://claude.ai/artifact/E6Hn9Z3tCwHeEp4bserYLH",
  },
  {
    id: "back-of-house",
    category: "Mobile App",
    scope: "Mobile + Backend",
    title: "Back Of House",
    description:
      "A professional ecosystem app for the Saudi events industry, connecting companies, professionals, opportunities and events.",
    techStack: ["Flutter", "NestJS", "PostgreSQL", "Supabase"],
    visual: "boh",
  },
  {
    id: "awar",
    category: "Operations Platform",
    scope: "Backend + PostgreSQL",
    title: "Awar",
    description:
      "Operations platform for managing staffing, projects and payroll workflows with secure and scalable architecture.",
    techStack: ["NestJS", "Prisma", "PostgreSQL"],
    visual: "awar",
  },
  {
    id: "react-ecommerce",
    category: "E-Commerce",
    scope: "Web + API",
    title: "React E-Commerce",
    description:
      "Modern, responsive e-commerce platform with seamless shopping experience and secure payments.",
    techStack: ["React", "Next.js", "Tailwind", "Stripe"],
    visual: "commerce",
  },
  {
    id: "qced",
    category: "Internal Platform",
    scope: "Web + Backend + PWA",
    title: "QCED",
    description:
      "Staff platform for the Qassim Chamber of Commerce — directory, departments, schedules and live messaging in one place, with role-based dashboards for Admin, HR, Managers and Employees.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "PWA", "Vercel"],
    image: "/QCED-mockup/qced-cover.png",
  },
];

/** Where "Explore more engineering work" leads. */
export const moreProjectsUrl = brand.githubUrl;

/** Two-digit index from list position: 0 → "01". */
export const projectNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Not currently rendered — kept complete so any of them can be moved back
 * into `projects` as-is.
 */
export const archivedProjects: Project[] = [
  {
    id: "golink",
    category: "SaaS Platform",
    scope: "Web + Backend + Cloud",
    title: "GoLink",
    titleAccent: "Go",
    description:
      "Multi-tenant event management platform for the Saudi market, handling registration, accreditation, ticketing and access control.",
    techStack: ["TypeScript", "React", "Next.js", "Node.js", "MongoDB"],
    visual: "golink",
  },
];
