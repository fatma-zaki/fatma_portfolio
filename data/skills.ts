export interface Skill {
  name: string;
  badge: string;
  tag: "Core" | "Advanced" | "Architecture" | "Standard";
}

export type SkillCategoryIcon = "systems" | "architecture" | "ui" | "tooling";

export interface SkillCategory {
  title: string;
  subtitle: string;
  icon: SkillCategoryIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Systems & Languages",
    subtitle: "Runtime, Language & Logic",
    icon: "systems",
    skills: [
      { name: "TypeScript", badge: "TS", tag: "Core" },
      { name: "JavaScript (ESNext)", badge: "JS", tag: "Core" },
      { name: "HTML5 / Semantic Web", badge: "HTML", tag: "Core" },
      { name: "Node.js Basics", badge: "NODE", tag: "Standard" },
      { name: "RESTful Architecture", badge: "REST", tag: "Architecture" },
      { name: "JSON & Data Schemas", badge: "JSON", tag: "Standard" },
    ],
  },
  {
    title: "Web Architecture & Frameworks",
    subtitle: "Client & Server Runtime",
    icon: "architecture",
    skills: [
      { name: "React 18", badge: "REACT", tag: "Core" },
      { name: "Next.js App Router", badge: "NEXT", tag: "Core" },
      { name: "Server Components (RSC)", badge: "RSC", tag: "Architecture" },
      { name: "State Architecture (Zustand)", badge: "STATE", tag: "Advanced" },
      { name: "TanStack Query", badge: "QUERY", tag: "Advanced" },
      { name: "Context & Redux Architecture", badge: "REDUX", tag: "Standard" },
    ],
  },
  {
    title: "UI Engineering & Design Systems",
    subtitle: "Visual Precision & Experience",
    icon: "ui",
    skills: [
      { name: "Tailwind CSS", badge: "TW", tag: "Core" },
      { name: "Design Tokens & System Architecture", badge: "DS", tag: "Architecture" },
      { name: "Framer Motion", badge: "FM", tag: "Advanced" },
      { name: "Responsive Layout Systems", badge: "RWD", tag: "Core" },
      { name: "WCAG 2.1 Accessibility (a11y)", badge: "A11Y", tag: "Advanced" },
      { name: "CSS Modules & PostCSS", badge: "CSS", tag: "Standard" },
    ],
  },
  {
    title: "Tooling, DevOps & Infrastructure",
    subtitle: "Production & Delivery",
    icon: "tooling",
    skills: [
      { name: "Git & Version Control", badge: "GIT", tag: "Core" },
      { name: "GitHub Workflows", badge: "GH", tag: "Standard" },
      { name: "Vercel Platform Deployment", badge: "DEPLOY", tag: "Advanced" },
      { name: "Core Web Vitals & Lighthouse", badge: "PERF", tag: "Architecture" },
      { name: "Docker Basics", badge: "DOCKER", tag: "Standard" },
      { name: "VS Code & Modern Toolchains", badge: "IDE", tag: "Standard" },
    ],
  },
];

export const emergingTech = [
  "GraphQL",
  "WebSockets",
  "Prisma ORM",
  "PostgreSQL",
  "Vitest / Jest",
  "Storybook",
  "Vite",
  "Edge Functions",
  "PWA",
  "Web Security Basics",
];
