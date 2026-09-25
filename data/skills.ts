/**
 * SKILLS & TECHNOLOGIES — the six domains that hang off the engineering core.
 *
 * `slot` places a domain in the constellation (see StackConstellation): one
 * above the core, one below, two down each flank. Order in this array is the
 * reading order on small screens, where the constellation becomes a list.
 */

export type DomainIcon = "core" | "web" | "mobile" | "backend" | "data" | "devops";

export type DomainSlot = "top" | "bottom" | "left-upper" | "left-lower" | "right-upper" | "right-lower";

export interface SkillDomain {
  id: DomainIcon;
  /** Tiny technical index shown on the panel, e.g. "D.01". */
  code: string;
  title: string;
  subtitle: string;
  slot: DomainSlot;
  skills: string[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: "core",
    code: "D.01",
    title: "Core Engineering",
    subtitle: "The foundation",
    slot: "left-upper",
    skills: ["TypeScript", "JavaScript", "HTML / CSS", "Git", "ESLint", "Jest"],
  },
  {
    id: "web",
    code: "D.02",
    title: "Web Engineering",
    subtitle: "Modern web applications & interfaces",
    slot: "top",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Redux / RTK Query", "shadcn/ui"],
  },
  {
    id: "mobile",
    code: "D.03",
    title: "Mobile Development",
    subtitle: "Cross-platform experiences",
    slot: "right-upper",
    skills: ["Flutter", "React Native", "Dart", "Expo", "iOS / Android"],
  },
  {
    id: "backend",
    code: "D.04",
    title: "Backend & APIs",
    subtitle: "Scalable & secure systems",
    slot: "left-lower",
    skills: ["Node.js", "NestJS", "Express", "REST APIs", "GraphQL", "TypeORM"],
  },
  {
    id: "data",
    code: "D.05",
    title: "Data & Databases",
    subtitle: "Structured & unstructured data",
    slot: "right-lower",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose", "Redis", "SQL"],
  },
  {
    id: "devops",
    code: "D.06",
    title: "DevOps & Infrastructure",
    subtitle: "Deploy, monitor, scale",
    slot: "bottom",
    skills: ["Docker", "Vercel", "Render", "GitHub Actions", "Nginx", "Linux"],
  },
];

/** The delivery loop annotated under the constellation. */
export const deliveryLoop = ["Code", "Build", "Deploy", "Improve"];
