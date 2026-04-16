export type ProjectCategory = "all" | "react" | "nextjs" | "ui" | "dashboard";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: Exclude<ProjectCategory, "all">[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "LuxeShop — E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product filtering, cart management, Stripe payments, and an admin dashboard. Built with Next.js App Router and Tailwind CSS.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://luxeshop.demo",
    category: ["nextjs", "dashboard"],
    featured: true,
  },
  {
    id: 2,
    title: "TaskFlow — Project Manager",
    description:
      "A Kanban-style project management app with drag-and-drop boards, team collaboration, real-time updates, and analytics dashboard.",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    techStack: ["React", "TypeScript", "Zustand", "React DnD", "Chart.js"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://taskflow.demo",
    category: ["react", "dashboard"],
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio — Personal Brand",
    description:
      "A luxury developer portfolio with dark/light theme, smooth animations, and premium design system. Built with Next.js and Framer Motion.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://fatmazaki.dev",
    category: ["nextjs", "ui"],
    featured: true,
  },
  {
    id: 4,
    title: "WeatherPulse — Weather App",
    description:
      "A beautifully designed weather application with 7-day forecasts, interactive maps, location search, and animated weather conditions.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80",
    techStack: ["React", "OpenWeather API", "Leaflet.js", "CSS Modules"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://weatherpulse.demo",
    category: ["react", "ui"],
  },
  {
    id: 5,
    title: "BlogCraft — Content Platform",
    description:
      "A modern blogging platform with MDX support, syntax highlighting, dark mode, category filtering, and reading time estimation.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    techStack: ["Next.js", "MDX", "Prisma", "NextAuth", "Tailwind CSS"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://blogcraft.demo",
    category: ["nextjs"],
  },
  {
    id: 6,
    title: "FinanceIQ — Analytics Dashboard",
    description:
      "A comprehensive financial analytics dashboard with interactive charts, portfolio tracking, spending insights, and budget management.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    techStack: ["React", "Recharts", "TypeScript", "TanStack Query", "Zustand"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://financeiq.demo",
    category: ["react", "dashboard"],
  },
];

export const projectCategories: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "UI/UX", value: "ui" },
  { label: "Dashboard", value: "dashboard" },
];
