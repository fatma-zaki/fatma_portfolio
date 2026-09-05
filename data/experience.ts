export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "work" | "education" | "certification" | "milestone";
  tags?: string[];
  isPlaceholder?: boolean;
}

/**
 * ============================================================================
 * [CONTENT AUDIT NOTE FOR USER REVIEW]
 * The career entries below represent a structured engineering timeline.
 * Update these milestones with your exact companies, dates, and real achievements.
 * ============================================================================
 */
export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    year: "2025 — Present",
    title: "Software Engineer (Web Architecture)",
    subtitle: "Independent Engineering & Client Solutions · Remote",
    description:
      "Engineering modern web applications and design systems for client products. Specializing in Next.js App Router, TypeScript, performant state architecture, and accessible user interfaces.",
    type: "work",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Architecture"],
    isPlaceholder: true,
  },
  {
    id: 2,
    year: "2024 — 2025",
    title: "Frontend Software Engineer",
    subtitle: "Digital Technology Products · Cairo, Egypt",
    description:
      "Engineered core dashboard features, reusable design system components, and integrated RESTful APIs with strict type safety and optimized render cycles.",
    type: "work",
    tags: ["React", "TypeScript", "Zustand", "Design Systems"],
    isPlaceholder: true,
  },
  {
    id: 3,
    year: "2024",
    title: "Meta Frontend Professional Certification",
    subtitle: "Meta Specialized Engineering Program",
    description:
      "Completed rigorous specialization covering modern React paradigms, state management, testing strategies, UI/UX architecture, and web accessibility standards.",
    type: "certification",
    tags: ["React", "Testing", "Accessibility", "Design Patterns"],
    isPlaceholder: true,
  },
  {
    id: 4,
    year: "2023",
    title: "Full-Stack Web Engineering Intensive",
    subtitle: "Advanced Software Curriculum",
    description:
      "Intensive engineering program focused on JavaScript (ESNext), asynchronous architecture, component-driven development, and relational/document databases.",
    type: "education",
    tags: ["JavaScript", "React", "Node.js", "System Design"],
    isPlaceholder: true,
  },
  {
    id: 5,
    year: "2022",
    title: "Software Engineering Foundation",
    subtitle: "Systems & Algorithms Exploration",
    description:
      "Initiated deep focus in computer science fundamentals, algorithmic problem solving, clean code practices, and web engineering principles.",
    type: "milestone",
    tags: ["Algorithms", "Clean Code", "Web Standards"],
    isPlaceholder: true,
  },
];
