export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "work" | "education" | "certification" | "milestone";
  tags?: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    id: 1,
    year: "2026",
    title: "Senior Frontend Developer",
    subtitle: "Freelance — Remote",
    description:
      "Building premium web applications for international clients. Specializing in React and Next.js solutions with a focus on performance, accessibility, and elegant UI/UX.",
    type: "work",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    year: "2025",
    title: "Next.js 14 Mastery",
    subtitle: "Advanced Certification",
    description:
      "Completed an in-depth course on Next.js 14 App Router, Server Components, Streaming, and advanced deployment strategies with Vercel.",
    type: "certification",
    tags: ["Next.js 14", "App Router", "Server Components"],
  },
  {
    id: 3,
    year: "2024",
    title: "Frontend Developer",
    subtitle: "Tech Startup — Cairo, Egypt",
    description:
      "Led the frontend team in building a SaaS analytics platform from scratch. Implemented design system, component library, and improved performance by 60%.",
    type: "work",
    tags: ["React", "TypeScript", "Zustand", "Chart.js"],
  },
  {
    id: 4,
    year: "2024",
    title: "Meta Frontend Professional Certificate",
    subtitle: "Meta / Coursera",
    description:
      "Earned the Meta Frontend Developer Professional Certificate, covering advanced React patterns, testing strategies, and UI/UX principles.",
    type: "certification",
    tags: ["React", "Testing", "Accessibility", "UI Design"],
  },
  {
    id: 5,
    year: "2023",
    title: "Full-Stack JavaScript Bootcamp",
    subtitle: "Online Intensive Program",
    description:
      "Completed a 6-month intensive bootcamp covering React, Node.js, databases, and deployment. Built 10+ full-stack projects with real-world clients.",
    type: "education",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    id: 6,
    year: "2023",
    title: "Launched First Freelance Project",
    subtitle: "Personal Milestone",
    description:
      "Delivered my first commercial freelance project — a complete e-commerce redesign that boosted the client's conversion rate by 45%.",
    type: "milestone",
    tags: ["React", "CSS", "REST API"],
  },
  {
    id: 7,
    year: "2022",
    title: "Started Web Development Journey",
    subtitle: "Self-taught Beginning",
    description:
      "Began learning HTML, CSS, and JavaScript through structured online courses and building personal projects. Fell in love with creating beautiful interfaces.",
    type: "education",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];
