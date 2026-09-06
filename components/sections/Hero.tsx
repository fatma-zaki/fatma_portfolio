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

/**
 * `short` is what the label collapses to below `sm`, where the copy column is
 * only ~200px wide — the stat still reads at a glance instead of wrapping to
 * three lines.
 */
const stats = [
  { icon: Briefcase, value: "20+", label: "Projects Completed", short: "Projects" },
  { icon: Users, value: "15+", label: "Happy Clients", short: "Clients" },
  { icon: Code2, value: "05+", label: "Years Experience", short: "Experience" },
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-abyss
                 min-h-[100svh] flex items-center
                 px-5 sm:px-8 lg:px-12
                 pt-28 pb-24 lg:py-24"
    >
      {/*
        THE HERO ARTWORK — the metallic FZ brand mark presented as majestic artwork.
        Surrounded by celestial/radar guidelines, ambient golden aura, and purposeful conduits.

        The composition is side-by-side at every width: the mark's core sits at
        roughly 82–86% across on phones and tablets and 73% on desktop, and the
        box always overhangs the right edge so the circuit field bleeds out of
        frame rather than being letterboxed inside it. Only the faint outer
        traces ever reach behind the copy column.
      */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -z-10 inset-y-0
                   right-[-24%] w-[76%]
                   sm:right-[-12%] sm:w-[60%]
                   lg:right-[-2%] lg:w-[58%]
                   flex items-center justify-center"
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
        {/*
          The copy column holds roughly half the viewport at every width, so
          the mark keeps the other half instead of the two stacking. Widths
          step down as the container gains its own max-width.
        */}
        <div className="w-[54%] sm:w-[52%] lg:w-[48%] xl:w-[46%]">
          {/* Eyebrow with connector node */}
          <motion.div variants={item} className="flex items-center gap-2 sm:gap-3">
            <h2 className="eyebrow whitespace-nowrap text-gold">{brand.title}</h2>
            <span className="h-px w-6 sm:w-16 lg:w-20 bg-gradient-to-r from-gold via-gold/60 to-gold" />
            <span className="w-2 h-2 rounded-full border border-gold bg-canvas flex-shrink-0" />
          </motion.div>

          {/*
            The name — FATMA (crisp white) over ZAKI (metallic gold). Sized off
            the viewport rather than off breakpoints, because the constraint is
            the column: "FATMA" is ~4.05em wide in this face, and the column is
            ~46–54vw, so the fluid rate keeps it on one line at every size.
          */}
          <motion.h1
            variants={item}
            className="mt-4 sm:mt-6 font-display font-bold uppercase tracking-[0.02em] leading-[0.88]
                       text-[clamp(2.1rem,10vw,3.6rem)]
                       lg:text-[clamp(3.6rem,6.4vw,7.2rem)]"
          >
            <span className="text-[#F5F5F5] block">{brand.firstName}</span>
            <span className="text-gradient-gold block">{brand.lastName}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 sm:mt-6 lg:mt-8 text-[13px] sm:text-base lg:text-[19px]
                       text-muted leading-[1.65] lg:leading-[1.7]
                       sm:max-w-[36ch] lg:max-w-[42ch]"
          >
            {brand.tagline}
          </motion.p>

          {/* CTAs — stacked until the column is wide enough to sit them side by side */}
          <motion.div
            variants={item}
            className="mt-6 sm:mt-8 lg:mt-10 flex flex-col md:flex-row
                       items-stretch md:items-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="btn-gold-solid group w-full md:w-auto px-4 sm:px-6 whitespace-nowrap"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight
                size={15}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href={brand.cvUrl}
              download
              className="btn-gold-outline w-full md:w-auto px-4 sm:px-6 whitespace-nowrap"
            >
              <span>DOWNLOAD CV</span>
              <Download size={15} className="shrink-0 text-gold" />
            </a>
          </motion.div>

          {/*
            Stats — icon inline beside the figure, label beneath, hairline
            rules between columns. Two up on the narrowest phones, three up
            from 400px, so the row never wraps a stat onto its own line
            mid-label. `stat-row` owns the rules (globals.css) because which
            cell starts a row changes with the column count.
          */}
          <motion.dl
            variants={item}
            className="stat-row mt-8 sm:mt-12 lg:mt-14 pt-5 sm:pt-8 border-t border-line/80
                       grid grid-cols-2 min-[400px]:grid-cols-3 gap-x-3 sm:gap-x-5 gap-y-5"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <stat.icon
                    size={15}
                    strokeWidth={1.75}
                    className="shrink-0 text-gold w-[13px] h-[13px] sm:w-[15px] sm:h-[15px]"
                  />
                  <dd className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-gradient-gold leading-none">
                    {stat.value}
                  </dd>
                </div>
                <dt className="mt-1.5 sm:mt-2 text-[8px] sm:text-[9px] lg:text-[10px] text-muted
                               tracking-[0.16em] sm:tracking-[0.18em] uppercase leading-tight font-medium">
                  <span className="sm:hidden">{stat.short}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
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
                   hidden sm:flex flex-col items-center gap-2 text-muted hover:text-gold
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
