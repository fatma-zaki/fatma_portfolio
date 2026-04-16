"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Floating particle component
function Particle({
  style,
}: {
  style: React.CSSProperties;
}) {
  return (
    <span
      className="absolute rounded-full bg-gold/40 dark:bg-gold/50 pointer-events-none"
      style={style}
    />
  );
}

export function Hero() {
  const particles = [
    { width: 4, height: 4, top: "20%", left: "10%", animDuration: "8s", animDelay: "0s" },
    { width: 6, height: 6, top: "60%", left: "80%", animDuration: "12s", animDelay: "2s" },
    { width: 3, height: 3, top: "40%", left: "90%", animDuration: "10s", animDelay: "1s" },
    { width: 5, height: 5, top: "75%", left: "20%", animDuration: "9s", animDelay: "3s" },
    { width: 4, height: 4, top: "15%", left: "70%", animDuration: "11s", animDelay: "0.5s" },
    { width: 7, height: 7, top: "85%", left: "55%", animDuration: "13s", animDelay: "1.5s" },
    { width: 3, height: 3, top: "30%", left: "40%", animDuration: "7s", animDelay: "4s" },
    { width: 5, height: 5, top: "50%", left: "5%", animDuration: "14s", animDelay: "2.5s" },
  ];

  const handleScrollDown = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl) aboutEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dark:bg-dark-bg bg-light-bg">
        {/* Radial glow */}
        <div className="absolute inset-0 dark:opacity-100 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-gold/8 via-transparent to-transparent" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,39,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle
            key={i}
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
              animation: `float ${p.animDuration} ease-in-out infinite`,
              animationDelay: p.animDelay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container-max text-center px-4"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 dark:bg-gold/10">
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs font-medium text-gold tracking-widest uppercase">
              Available for Opportunities
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-medium tracking-[0.3em] uppercase dark:text-gray-400 text-gray-500 mb-4"
        >
          Hello, World —
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4"
        >
          <span className="dark:text-gray-100 text-gray-900">I&apos;m </span>
          <span className="text-gradient-gold">Fatma</span>
          <br />
          <span className="dark:text-gray-100 text-gray-900">Zaki</span>
        </motion.h1>

        {/* Divider */}
        <motion.div variants={itemVariants} className="divider-gold my-6" />

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-medium dark:text-gray-300 text-gray-600 mb-4 tracking-wide"
        >
          Frontend Developer{" "}
          <span className="text-gold/80">|</span>{" "}
          React &amp; Next.js Specialist
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base dark:text-gray-400 text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I build{" "}
          <span className="dark:text-gray-200 text-gray-700 font-medium">
            elegant, scalable
          </span>
          , and{" "}
          <span className="dark:text-gray-200 text-gray-700 font-medium">
            user-focused
          </span>{" "}
          web applications that leave a lasting impression.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary w-full sm:w-auto text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-outline w-full sm:w-auto text-center inline-flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} />
            Contact Me
          </motion.a>

          <motion.a
            href="/cv.pdf"
            download
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto
                       text-sm font-medium dark:text-gray-400 text-gray-500
                       hover:text-gold dark:hover:text-gold transition-colors duration-200
                       border border-transparent hover:border-gold/20 px-8 py-3 rounded-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={15} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-8 sm:gap-12 mt-16 pt-10
                     border-t dark:border-dark-border border-light-border"
        >
          {[
            { label: "Projects Built", value: "20+" },
            { label: "Happy Clients", value: "15+" },
            { label: "Years Experience", value: "4+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs dark:text-gray-500 text-gray-400 mt-1 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   dark:text-gray-500 text-gray-400 hover:text-gold dark:hover:text-gold transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
