export type ProjectCategory = "all" | "systems" | "nextjs" | "react" | "architecture";

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  architectureHighlight: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  category: Exclude<ProjectCategory, "all">[];
  featured?: boolean;
  /** Flag identifying placeholder demo data that user can replace with verified production work */
  isPlaceholder?: boolean;
}

/**
 * ============================================================================
 * [CONTENT AUDIT NOTE FOR USER REVIEW]
 * The projects below are currently configured as demonstration/showcase case studies.
 * You can replace URLs, titles, and architecture notes with your real production work.
 * ============================================================================
 */
export const projects: Project[] = [
  {
    id: 1,
    title: "LuxeShop Architecture",
    subtitle: "Enterprise E-Commerce & Inventory Pipeline",
    description:
      "A high-throughput e-commerce platform featuring server-side product indexing, resilient cart state synchronization, secure Stripe webhook processing, and an administrative control panel.",
    architectureHighlight: "Next.js App Router, Server Actions & Optimistic Cache Layer",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Stripe"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://luxeshop.demo",
    category: ["nextjs", "systems", "architecture"],
    featured: true,
    isPlaceholder: true,
  },
  {
    id: 2,
    title: "TaskFlow Core",
    subtitle: "Real-Time Collaborative Project Engine",
    description:
      "A Kanban-driven workflow manager engineered with zero-latency drag-and-drop state updates, granular team permissions, and real-time state synchronization across distributed clients.",
    architectureHighlight: "Zustand State Architecture & Client Mutation Pipeline",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
    techStack: ["React", "TypeScript", "Zustand", "React DnD", "Chart.js"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://taskflow.demo",
    category: ["react", "systems"],
    featured: true,
    isPlaceholder: true,
  },
  {
    id: 3,
    title: "FZ Personal Brand & Design System",
    subtitle: "High-Performance Portfolio & Design Tokens",
    description:
      "A bespoke personal brand portfolio for Fatma Zaki featuring a custom dark-first design system, tokenized Tailwind theme variables, smooth Framer Motion spring physics, and zero layout shift.",
    architectureHighlight: "Tokenized Design System, CSS Motion & Static Optimization",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://fatmazaki.dev",
    category: ["nextjs", "architecture"],
    featured: true,
    isPlaceholder: false, // Real verified project
  },
  {
    id: 4,
    title: "WeatherPulse Telemetry",
    subtitle: "Geo-Spatial Weather Visualization",
    description:
      "A telemetry-focused meteorological application delivering 7-day predictive models, interactive Leaflet mapping coordinate layers, and localized search caching.",
    architectureHighlight: "RESTful API Aggregation & Memory-Cached Geolocation",
    image:
      "https://images.unsplash.com/photo-1504608524841-42584120d693?w=800&q=80",
    techStack: ["React", "TypeScript", "OpenWeather API", "Leaflet.js"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://weatherpulse.demo",
    category: ["react", "systems"],
    isPlaceholder: true,
  },
  {
    id: 5,
    title: "BlogCraft Engine",
    subtitle: "Headless MDX Content Pipeline",
    description:
      "A developer-centric publishing engine leveraging Next.js static generation, on-demand ISR revalidation, syntax-highlighted code execution blocks, and tag taxonomy.",
    architectureHighlight: "Incremental Static Regeneration (ISR) & MDX Compilation",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    techStack: ["Next.js", "TypeScript", "MDX", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://blogcraft.demo",
    category: ["nextjs", "architecture"],
    isPlaceholder: true,
  },
  {
    id: 6,
    title: "FinanceIQ Analytics",
    subtitle: "Financial Metrics & Portfolio Tracking",
    description:
      "An analytical dashboard delivering real-time currency conversion rates, portfolio allocation breakdowns, interactive visualization charts, and transaction ledger filtering.",
    architectureHighlight: "TanStack Query Cache Layer & Recharts SVG Engine",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    techStack: ["React", "TypeScript", "TanStack Query", "Recharts", "Zustand"],
    githubUrl: "https://github.com/fatmazaki",
    liveUrl: "https://financeiq.demo",
    category: ["react", "systems"],
    isPlaceholder: true,
  },
];

export const projectCategories: { label: string; value: ProjectCategory }[] = [
  { label: "All Systems", value: "all" },
  { label: "Architecture", value: "architecture" },
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Full Systems", value: "systems" },
];
