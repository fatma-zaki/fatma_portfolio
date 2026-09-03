"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Same footprint as the button, so the navbar never shifts on hydration.
    return <div className="w-9 h-9 rounded-brand border border-line" aria-hidden />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-brand border border-line
                 flex items-center justify-center text-muted
                 hover:border-gold/45 hover:text-gold
                 transition-colors duration-300"
      whileTap={{ scale: 0.94 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          className="block"
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          {isDark ? (
            <Moon size={15} strokeWidth={1.75} />
          ) : (
            <Sun size={15} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
