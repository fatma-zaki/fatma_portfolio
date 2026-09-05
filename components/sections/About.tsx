"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Zap, ShieldCheck, Terminal, MapPin, Mail, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/lib/brand";

const engineeringPillars = [
  {
    num: "01",
    title: "Scalable Web Architecture",
    description:
      "Engineering modular, maintainable frontend and full-stack systems designed for performance, high concurrency, and clean separation of concerns.",
  },
  {
    num: "02",
    title: "Clean Code & Type Systems",
    description:
      "Applying strict TypeScript safety, idiomatic design patterns, and self-documenting codebases that scale across engineering teams.",
  },
  {
    num: "03",
    title: "Intelligent Problem Solving",
    description:
      "Translating complex product requirements and system data into intuitive, lightning-fast digital experiences with zero unnecessary complexity.",
  },
];

const coreValues = [
  {
    icon: Layers,
    title: "Architecture First",
    desc: "Designing decoupled, scalable component hierarchies and robust state pipelines.",
  },
  {
    icon: Zap,
    title: "Performance Driven",
    desc: "Optimizing Core Web Vitals, SSR/SSG caching, and eliminating runtime overhead.",
  },
  {
    icon: ShieldCheck,
    title: "Production Ready",
    desc: "Strict type safety, comprehensive accessibility (a11y), and resilient error boundaries.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding bg-deep relative overflow-hidden"
    >
      <div className="container-max relative z-10" ref={ref}>
        <SectionHeading
          eyebrow="Engineering Profile"
          title="About Me"
          description="A serious software engineer dedicated to building real systems, clean architecture, and modern digital products."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Architectural Specification Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="surface-card p-6 sm:p-8 relative overflow-hidden border-line hover:border-gold/30 transition-all duration-300">
              {/* Header bar */}
              <div className="flex items-center justify-between pb-5 border-b border-line mb-6">
                <div className="flex items-center gap-2.5">
                  <Terminal size={15} className="text-gold" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    SYSTEM_PROFILE // 01
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(52,199,143,0.8)]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Pillars list */}
              <div className="space-y-6">
                {engineeringPillars.map((pillar) => (
                  <div key={pillar.num} className="group/item">
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className="font-mono text-xs font-bold text-gold/80">
                        {pillar.num}
                      </span>
                      <h4 className="text-sm font-semibold text-primary group-hover/item:text-gold transition-colors">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted leading-relaxed pl-7">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick specs */}
              <div className="mt-8 pt-6 border-t border-line space-y-3">
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <MapPin size={14} className="text-gold/80 flex-shrink-0" />
                  <span>{brand.location} · Remote Worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <Mail size={14} className="text-gold/80 flex-shrink-0" />
                  <span className="font-mono text-muted">{brand.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  <Sparkles size={14} className="text-gold/80 flex-shrink-0" />
                  <span className="text-gold-ink font-medium">
                    Specialized in Modern Web &amp; Frontend Systems
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug tracking-[0.02em] text-primary">
                Engineering purposeful systems with{" "}
                <span className="text-gradient-gold">architectural precision &amp; modern craft</span>.
              </h3>

              <div className="space-y-5 text-secondary leading-relaxed mt-6 text-sm sm:text-base">
                <p>
                  As a Software Engineer, I approach digital products through the lens of
                  systems engineering, scalability, and clean code. I do not merely assemble
                  interfaces—I build resilient frontend architectures, optimize data flow,
                  and construct digital experiences engineered for longevity.
                </p>

                <p>
                  My core focus centers on the <span className="text-[#F5F5F5] font-medium">React and Next.js</span> ecosystem,
                  combining strict TypeScript typing with modern state architecture and server-side
                  rendering paradigms. From initial architecture diagrams to production deployment,
                  I prioritize code readability, testability, and deterministic performance.
                </p>

                <p>
                  I am driven by intelligent problem solving—translating business logic into
                  intuitive digital products while maintaining a high standard of craftsmanship,
                  accessibility, and user delight.
                </p>
              </div>
            </div>

            {/* Core Values / Capability Cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {coreValues.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  className="surface-card p-5 hover:border-gold/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="w-9 h-9 rounded-brand bg-gold/10 border border-gold/25 flex items-center justify-center mb-3">
                    <value.icon size={16} className="text-gold" />
                  </div>
                  <h4 className="font-semibold text-xs tracking-wider uppercase text-primary mb-1.5">
                    {value.title}
                  </h4>
                  <p className="text-[11px] text-muted leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
