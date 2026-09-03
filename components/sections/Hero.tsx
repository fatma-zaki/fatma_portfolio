"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
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
  { value: "20+", label: "Projects Built" },
  { value: "15+", label: "Happy Clients" },
  { value: "4+", label: "Years Experience" },
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-base
                 min-h-[100svh] flex items-center
                 px-5 sm:px-8 lg:px-10
                 pt-28 pb-24 lg:py-24"
    >
      {/*
        THE HERO ARTWORK — the monogram is the power core and the network
        grows out of it. Free-standing: no card, no frame, no mask.
        Occupies the right ~55% on desktop and runs off the right edge of the
        screen; on phones it drops behind the copy at low strength.
      */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -z-10
                   inset-y-0 right-[-26%] w-[128%]
                   lg:right-[-6%] lg:w-[62%]"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Depth behind the core — falloff, not a visible gradient */}
          <div className="absolute inset-[-20%] bg-core-depth" />

          {/*
            Network and lockup share one square field, so the logo always
            lands at 62% of the circuit field — exactly the clearing the
            trunk origins were laid out around, at every viewport size.
          */}
          <div className="relative w-full aspect-square lg:w-auto lg:h-full">
            <CircuitNetwork className="absolute inset-0 opacity-40 lg:opacity-100" />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[62%] opacity-[0.16] lg:opacity-100"
            >
              <Monogram />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- Copy ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="lg:w-[44%]">
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-4">
            <h2 className="eyebrow whitespace-nowrap">{brand.title}</h2>
            <span className="h-px w-16 bg-gradient-to-r from-gold to-gold/10" />
            <span className="w-[7px] h-[7px] rounded-full border border-gold flex-shrink-0" />
          </motion.div>

          {/* The name — the loudest thing on the page */}
          <motion.h1
            variants={item}
            className="mt-7 font-display font-bold uppercase text-primary
                       text-[clamp(3.5rem,19vw,5.5rem)]
                       sm:text-[6rem] lg:text-[clamp(4.5rem,7.6vw,7.5rem)]
                       leading-[0.86] tracking-[0.01em]"
          >
            {brand.firstName}
            <br />
            {brand.lastName}
          </motion.h1>

          <motion.div variants={item} className="rule-node mt-9 mb-8" />

          <motion.p
            variants={item}
            className="text-base lg:text-[19px] text-muted leading-[1.7]
                       max-w-[36ch] lg:max-w-[42ch]"
          >
            Building digital solutions through clean code, thoughtful systems,
            and modern engineering.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-11 flex flex-col sm:flex-row gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="btn-primary group w-full sm:w-auto"
            >
              View My Work
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href={brand.cvUrl}
              download
              className="btn-secondary w-full sm:w-auto"
            >
              Download CV
              <Download size={15} />
            </a>
          </motion.div>

          {/* ---------- Stats: rules only, no cards ---------- */}
          <motion.dl
            variants={item}
            className="mt-16 lg:mt-20 pt-9 border-t border-line flex"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i === 0
                    ? "flex-1 pr-4"
                    : "flex-1 px-4 sm:px-6 border-l border-line"
                }
              >
                <dd className="font-display text-3xl sm:text-[2.5rem] font-bold text-gold leading-none">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-[9px] sm:text-[10px] text-muted tracking-[0.2em] uppercase leading-tight">
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
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-3 text-muted hover:text-gold
                   transition-colors duration-300"
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] tracking-[0.32em] uppercase">
          Scroll to explore
        </span>
        <span className="relative block w-px h-9 bg-gradient-to-b from-gold/10 to-gold/60 overflow-hidden">
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rotate-45 bg-gold"
            animate={{ top: ["-12%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.7, 1],
            }}
          />
        </span>
      </motion.button>
    </section>
  );
}
