"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PortraitField, PortraitForeArcs } from "@/components/brand/PortraitField";
import { TechConstellation } from "@/components/brand/TechConstellation";
import { brand } from "@/lib/brand";

/**
 * ABOUT — "The Engineer Behind the System".
 *
 * A continuation of the hero, not a second template: same deep-navy ground,
 * same gold-as-accent rule, same orbital/electrical vocabulary (it reuses the
 * hero's own `.fz-*` primitives rather than imitating them). The hero shows the
 * FZ system; this section shows the person inside it.
 *
 * Reading order, and therefore reveal order:
 *   1  section marker
 *   2  the orbital field draws itself in around the portrait
 *   3  the portrait settles into it
 *   4  the copy — identity first, capabilities second
 *   5  the three "how I think" nodes, in sequence along their spine
 *   6  the toolkit constellation activates outward from the core
 *
 * Nothing bounces, nothing parallaxes, nothing moves more than ~24px.
 */

const principles = [
  {
    num: "01",
    title: "Systems First",
    body: "I look beyond individual screens and think about architecture, data flow, scalability, and maintainability.",
  },
  {
    num: "02",
    title: "Engineer With Purpose",
    body: "I turn complex requirements into structured, reliable, and maintainable software solutions.",
  },
  {
    num: "03",
    title: "Build For Real World",
    body: "I care about performance, usability, reliability, and the details that make software work in production.",
  },
];

/** The three domains the work spans. Capabilities — never the job title. */
const capabilities = ["Web", "Mobile", "Backend"];

/** Small tracked label with a rule and a connection node. Used for sub-sections. */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="node-dot" />
      <h3 className="eyebrow whitespace-nowrap">{children}</h3>
      <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-gold/45 to-transparent" />
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const toolkitRef = useRef<HTMLDivElement>(null);
  const toolkitInView = useInView(toolkitRef, { once: true, margin: "-140px" });

  const reduce = useReducedMotion();
  /** Reveals keep their fade under reduced motion; only the travel is dropped. */
  const rise = (y = 24) => (reduce ? 0 : y);

  const [portraitFailed, setPortraitFailed] = useState(false);
  const showPortrait = Boolean(brand.portraitSrc) && !portraitFailed;

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-abyss
                 px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient ground — a faint engineering grid, dissolved at the edges, and
          one wide navy lift so the section has depth without a visible seam. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-circuit-grid opacity-[0.55] [mask-image:radial-gradient(ellipse_78%_62%_at_50%_38%,black,transparent_78%)]" />
        <div className="absolute inset-0 bg-core-depth opacity-70" />
      </div>

      <div ref={ref} className="container-max relative z-10">
        {/* ================= 1 · IDENTITY ================= */}
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] gap-14 lg:gap-16 xl:gap-20 items-center">
          {/* ---------- copy ---------- */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: rise(16) }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <h2 className="eyebrow whitespace-nowrap">Software Engineering Profile</h2>
              <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-gold via-gold/50 to-transparent" />
              <span className="w-2 h-2 rounded-full border border-gold bg-abyss shrink-0" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: rise(24) }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display font-bold uppercase tracking-[0.02em] leading-[0.98]
                         text-[clamp(1.7rem,7.2vw,2.4rem)] lg:text-[clamp(2.3rem,3.4vw,3.4rem)]"
            >
              <span className="block text-[#F5F5F5]">I build digital</span>
              <span className="block text-gradient-gold">systems</span>
              <span className="block text-[#F5F5F5]">that are made to last.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: rise(20) }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[54ch] text-[14px] sm:text-[15px] lg:text-base
                         text-secondary leading-[1.75]"
            >
              I&rsquo;m a Software Engineer building web and mobile applications across the
              full stack &mdash; from intuitive interfaces and mobile experiences to robust
              APIs, databases, and scalable backend systems.
            </motion.p>

            {/* Capability labels — three domains, then the discipline that binds them. */}
            <motion.div
              initial={{ opacity: 0, y: rise(16) }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9"
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
                {capabilities.map((label, i) => (
                  <div key={label} className="flex items-center gap-2.5">
                    {i > 0 && <span className="h-px w-4 sm:w-6 bg-gold/25" aria-hidden="true" />}
                    <span
                      className="px-3 py-1.5 rounded-brand border border-gold/30 bg-canvas/60
                                 text-[10px] sm:text-[11px] font-semibold uppercase
                                 tracking-[0.26em] text-gold-ink"
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <span className="h-px w-8 bg-gradient-to-r from-gold/55 to-transparent" aria-hidden="true" />
                <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.34em] text-muted">
                  Systems
                </span>
              </div>
            </motion.div>
          </div>

          {/* ---------- portrait, inside the field ---------- */}
          <div className="order-1 lg:order-2 relative">
            {/*
              The frame is 1214:1088 — the top 84% of the source photo, anchored
              by `object-top`, not its full 1214:1295. The supplied file's alpha
              channel degrades into coarse 8px block mottling over its lower
              fifth, which composites as exactly the grey noise this section must
              not show. Cutting at 84% drops the worst of it; the remainder lands
              where the dissolve is already under ~20% opacity and where the
              2.5× downscale to the render width averages it away. Verified by
              compositing the masked result over the ground: the bottom rows come
              out within 0/255 of it, and the falloff is smooth and monotonic.
            */}
            <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px] aspect-[1214/1088]">
              {/* Atmosphere: a warm core and a navy lift, blurred together so the
                  light reads as the field glowing rather than a disc behind her. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2
                           w-[132%] aspect-square blur-3xl"
                style={{
                  backgroundImage: [
                    "radial-gradient(ellipse 30% 30% at 50% 46%, rgba(242,194,104,0.12), transparent 70%)",
                    "radial-gradient(ellipse 46% 42% at 50% 50%, rgba(212,175,55,0.07), transparent 72%)",
                    "radial-gradient(ellipse 52% 50% at 50% 56%, rgba(13,19,38,0.6), transparent 76%)",
                  ].join(","),
                }}
              />

              {/* the orbital / electrical system — behind her */}
              <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square">
                <PortraitField active={inView} />
              </div>

              {/* the portrait itself */}
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.965 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.25, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="fz-portrait-fade absolute inset-0 z-10"
              >
                <div className="fz-portrait-vignette relative w-full h-full">
                  {showPortrait ? (
                    <Image
                      src={brand.portraitSrc as string}
                      alt={brand.portraitAlt}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 55vw, 480px"
                      onError={() => setPortraitFailed(true)}
                      className="fz-portrait-grade object-cover object-top"
                    />
                  ) : (
                    /* No portrait file present — hold the composition with the FZ
                       core plate rather than collapsing the column. */
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={brand.markSrc as string}
                        alt={`${brand.initials} monogram`}
                        width={brand.markWidth}
                        height={brand.markHeight}
                        sizes="320px"
                        className="w-[58%] h-auto opacity-90
                                   drop-shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                      />
                    </div>
                  )}

                  {/* A whisper of gold across the light side, and a multiply that
                      pulls the lower body down to the field's own black before the
                      mask takes over — darkening only, so no grey ever appears. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-45"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse 70% 55% at 52% 34%, rgba(242,194,104,0.5), transparent 72%)",
                    }}
                  />
                  <div aria-hidden="true" className="fz-portrait-foot pointer-events-none absolute inset-0" />
                </div>
              </motion.div>

              {/* two hairline arcs crossing in front of the dissolving lower third */}
              <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square z-20">
                <PortraitForeArcs active={inView} />
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2 · HOW I THINK ================= */}
        <div className="mt-24 sm:mt-28 lg:mt-36">
          <motion.div
            initial={{ opacity: 0, y: rise(16) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Marker>How I Think</Marker>
          </motion.div>

          <div className="relative mt-12">
            {/* the spine the three nodes hang from */}
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block absolute left-0 right-0 top-[4px] h-px origin-left
                         bg-gradient-to-r from-gold/40 via-gold/20 to-transparent"
            />

            <div className="grid gap-10 sm:gap-11 lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
              {principles.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: rise(22) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-90px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative pl-7"
                >
                  {/* the node on the spine, and its drop line */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 w-[9px] h-[9px] rotate-45 border border-gold
                               bg-abyss transition-[background-color,box-shadow] duration-300 ease-brand
                               group-hover:bg-gold group-hover:shadow-[0_0_16px_rgb(var(--gold)/0.85)]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-[4px] top-[14px] bottom-1 w-px
                               bg-gradient-to-b from-gold/35 via-gold/12 to-transparent"
                  />

                  <span className="font-mono text-[11px] font-semibold tracking-[0.24em] text-gold/85">
                    {p.num}
                  </span>
                  <h4
                    className="mt-3 font-display text-[15px] sm:text-base font-bold uppercase
                               tracking-[0.16em] text-primary
                               transition-colors duration-300 group-hover:text-gold"
                  >
                    {p.title}
                  </h4>
                  <p className="mt-3 max-w-[42ch] text-[13px] sm:text-sm text-muted leading-[1.75]">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 3 · THE ENGINEERING TOOLKIT ================= */}
        <div ref={toolkitRef} className="mt-24 sm:mt-28 lg:mt-36">
          <motion.div
            initial={{ opacity: 0, y: rise(16) }}
            animate={toolkitInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Marker>The Engineering Toolkit</Marker>
            <p className="mt-4 pl-[18px] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
              How I turn ideas into working systems
            </p>
          </motion.div>

          <div className="mt-10 lg:mt-6">
            <TechConstellation active={toolkitInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
