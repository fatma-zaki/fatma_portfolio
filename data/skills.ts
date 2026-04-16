export interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
}

export interface SkillCategory {
  title: string;
  emoji: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    emoji: "🖥️",
    skills: [
      { name: "HTML5", icon: "html", level: 5 },
      { name: "CSS3", icon: "css", level: 5 },
      { name: "JavaScript", icon: "js", level: 5 },
      { name: "TypeScript", icon: "ts", level: 4 },
      { name: "React", icon: "react", level: 5 },
      { name: "Next.js", icon: "next", level: 5 },
    ],
  },
  {
    title: "Styling & UI",
    emoji: "🎨",
    skills: [
      { name: "Tailwind CSS", icon: "tailwind", level: 5 },
      { name: "Framer Motion", icon: "framer", level: 4 },
      { name: "Sass/SCSS", icon: "sass", level: 4 },
      { name: "Bootstrap", icon: "bootstrap", level: 4 },
      { name: "Styled Components", icon: "styled", level: 3 },
      { name: "CSS Modules", icon: "modules", level: 4 },
    ],
  },
  {
    title: "Tools & Workflow",
    emoji: "🛠️",
    skills: [
      { name: "Git", icon: "git", level: 5 },
      { name: "GitHub", icon: "github", level: 5 },
      { name: "VS Code", icon: "vscode", level: 5 },
      { name: "REST APIs", icon: "api", level: 5 },
      { name: "Figma", icon: "figma", level: 4 },
      { name: "Vercel", icon: "vercel", level: 4 },
    ],
  },
  {
    title: "State & Data",
    emoji: "⚡",
    skills: [
      { name: "Zustand", icon: "zustand", level: 4 },
      { name: "React Query", icon: "query", level: 4 },
      { name: "Redux", icon: "redux", level: 3 },
      { name: "Context API", icon: "context", level: 5 },
      { name: "Prisma", icon: "prisma", level: 3 },
      { name: "Firebase", icon: "firebase", level: 3 },
    ],
  },
];
