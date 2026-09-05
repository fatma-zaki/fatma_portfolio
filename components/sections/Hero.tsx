"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Code2, Briefcase, Users, Trophy } from "lucide-react";
import { Monogram } from "@/components/brand/Monogram";
import { CircuitNetwork } from "@/components/brand/CircuitNetwork";
import { brand } from "@/lib/brand";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  { icon: Code2, value: "05+", label: "Years Experience" },
  { icon: Briefcase, value: "20+", label: "Projects Completed" },
  { icon: Users, value: "15+", label: "Happy Clients" },
  { icon: Trophy, value: "05+", label: "Core Technologies" },
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-base
                 min-h-[100svh] flex items-center
                 px-5 sm:px-8 lg:px-12
                 pt-28 pb-24 lg:py-24"
    >
      {/*
        THE HERO ARTWORK — the metallic FZ brand mark presented as majestic artwork.
        Surrounded by celestial/radar guidelines, ambient golden aura, and purposeful conduits.
      */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -z-10
                   inset-y-0 right-[-14%] w-[116%]
                   lg:right-[-2%] lg:w-[60%] flex items-center justify-center"
      >
        <div className="relative w-full aspect-square max-w-[880px] flex items-center justify-center">
          {/*
            Atmosphere, not a disc. Three low-alpha ellipses at different
            widths — a tight warm core, a wide flat gold haze along the
            mark's axis, and a navy lift underneath — blurred together so
            the light reads as the field glowing rather than as a gradient
            pasted behind the logo.
          */}
          <div
            className="absolute inset-0 blur-3xl"
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 34% 18% at 50% 50%, rgba(242,194,104,0.13), transparent 70%)",
                "radial-gradient(ellipse 62% 26% at 52% 49%, rgba(212,175,55,0.09), transparent 72%)",
                "radial-gradient(ellipse 54% 46% at 50% 54%, rgba(13,19,38,0.55), transparent 75%)",
              ].join(","),
            }}
          />

          {/* Orbital field, circuit board, travelling energy */}
          <CircuitNetwork className="absolute inset-0 opacity-70 sm:opacity-85 lg:opacity-100" />

          {/* Majestic FZ Metallic Artwork */}
          <div className="relative w-[72%] lg:w-[78%] z-10 filter drop-shadow-[0_0_36px_rgba(212,175,55,0.32)] drop-shadow-[0_18px_32px_rgba(0,0,0,0.85)]">
            <Monogram />
          </div>
        </div>
      </motion.div>

      {/* ---------- Editorial Copy ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="lg:w-[48%] xl:w-[46%]">
          {/* Eyebrow with connector node */}
          <motion.div variants={item} className="flex items-center gap-3">
            <h2 className="eyebrow whitespace-nowrap text-gold">{brand.title}</h2>
            <span className="h-px w-16 sm:w-20 bg-gradient-to-r from-gold via-gold/60 to-gold" />
            <span className="w-2 h-2 rounded-full border border-gold bg-canvas flex-shrink-0" />
          </motion.div>

          {/* The name — editorial typography hierarchy: FATMA (crisp white) + ZAKI (metallic gold) */}
          <motion.h1
            variants={item}
            className="mt-6 font-display font-bold uppercase tracking-[0.02em] leading-[0.88]
                       text-[clamp(3.5rem,14vw,6.5rem)]
                       sm:text-[6rem] lg:text-[6.8rem] xl:text-[7.6rem]"
          >
            <span className="text-[#F5F5F5] block">{brand.firstName}</span>
            <span className="text-gradient-gold block">{brand.lastName}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 text-base sm:text-lg lg:text-[19px] text-muted leading-[1.7]
                       max-w-[36ch] lg:max-w-[42ch]"
          >
            {brand.tagline}
          </motion.p>

          {/* CTAs matching Brand UI */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="btn-gold-solid group w-full sm:w-auto"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href={brand.cvUrl}
              download
              className="btn-gold-outline w-full sm:w-auto"
            >
              <span>DOWNLOAD CV</span>
              <Download size={15} className="text-gold" />
            </a>
          </motion.div>

          {/* ---------- Stats Row with Icons ---------- */}
          <motion.dl
            variants={item}
            className="mt-14 lg:mt-18 pt-8 border-t border-line/80 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <div className="w-8 h-8 rounded-brand border border-gold/30 bg-surface/80 flex items-center justify-center mb-3">
                  <stat.icon size={15} className="text-gold" />
                </div>
                <dd className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold leading-none">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-[9px] sm:text-[10px] text-muted tracking-[0.18em] uppercase leading-tight font-medium">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* ---------- Scroll cue ---------- */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-2 text-muted hover:text-gold
                   transition-colors duration-300"
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] tracking-[0.32em] uppercase font-medium">
          Scroll to explore
        </span>
        <div className="w-5 h-8 rounded-full border border-gold/40 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-gold shadow-[0_0_6px_#D4AF37]"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
