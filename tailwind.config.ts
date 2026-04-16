import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A227",
          light: "#E2B93B",
          dark: "#A07D1A",
        },
        dark: {
          bg: "#0B0B0F",
          surface: "#111111",
          border: "#1E1E28",
          card: "#13131A",
        },
        light: {
          bg: "#F9FAFB",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          card: "#F3F4F6",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201, 162, 39, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(201, 162, 39, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gold-gradient":
          "linear-gradient(135deg, #C9A227 0%, #E2B93B 50%, #A07D1A 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
