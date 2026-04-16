"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: "linear-gradient(90deg, #C9A227, #E2B93B, #C9A227)",
      }}
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 origin-left"
    />
  );
}
