"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-7 right-5 sm:right-6 z-50 w-11 h-11 rounded-brand
                     bg-surface border border-gold/40 text-gold
                     flex items-center justify-center shadow-card
                     hover:bg-gold/10 hover:border-gold hover:-translate-y-0.5
                     transition-[background-color,border-color,transform] duration-300"
          whileTap={{ scale: 0.92 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={17} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
