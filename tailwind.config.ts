import type { Config } from "tailwindcss";

/**
 * Every color below resolves to a CSS variable declared in `app/globals.css`
 * (raw `R G B` triplets, so Tailwind opacity modifiers keep working:
 * `bg-surface/60`, `border-gold/30`, …).
 *
 * The variables flip between the light and dark palettes, which means
 * components use one semantic class — `bg-surface`, `text-secondary` —
 * instead of a `light:`/`dark:` pair for every single element.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        /*
          Named `abyss`, not `base`: a color key called `base` makes Tailwind
          emit a second `.text-base` rule that sets `color`, which silently
          beats `text-muted`/`text-secondary` wherever `text-base` is used as
          a font size — dark text on a dark surface. Keep palette keys clear
          of Tailwind's own scale words (base, xs, sm, lg, xl, …).
        */
        abyss: token("--base"),
        canvas: token("--canvas"),
        deep: token("--deep"),
        surface: token("--surface"),
        elevated: token("--elevated"),

        // Typography
        primary: token("--text-primary"),
        secondary: token("--text-secondary"),
        muted: token("--text-muted"),

        // Structure
        line: token("--border-subtle"),
        "line-strong": token("--border-strong"),

        // Brand accent
        gold: {
          DEFAULT: token("--gold"),
          soft: token("--gold-soft"),
          deep: token("--gold-deep"),
          /** Contrast-safe gold for text — darkens in light mode. */
          ink: token("--gold-ink"),
        },

        // Status
        success: token("--success"),
        danger: token("--danger"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Cinzel", "serif"],
        body: ["var(--font-body)", "Montserrat", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        brand: "0.375rem",
        card: "0.875rem",
      },
      boxShadow: {
        card: "0 18px 40px -28px rgb(var(--shadow-rgb) / 0.85)",
        "focus-gold": "0 0 0 3px rgb(var(--gold) / 0.28)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-gradient":
          "linear-gradient(120deg, rgb(var(--gold-deep)) 0%, rgb(var(--gold)) 45%, rgb(var(--gold-soft)) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
