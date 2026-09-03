"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Gauge, Users, Workflow } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { CircuitCorner } from "@/components/brand/Circuit";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brand } from "@/lib/brand";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "I write maintainable, scalable code with a focus on readability and best practices.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Every app I build is optimized for speed, SEO, and lighthouse scores.",
  },
  {
    icon: Users,
    title: "User-First",
    description:
      "Great UI is born from empathy — I design with real users in mind at every step.",
  },
  {
    icon: Workflow,
    title: "Dedicated",
    description:
      "From early mockup to production deploy, I give 100% to every project.",
  },
];

const quickFacts = [
  { label: "Name", value: brand.fullName },
  { label: "Location", value: brand.location },
  { label: "Email", value: brand.email },
  { label: "Availability", value: "Freelance / Full-time" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding bg-deep relative overflow-hidden"
    >
      <div className="container-max" ref={ref}>
        <SectionHeading
          eyebrow="Get to know me"
          title="About Me"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Portrait frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Concentric brand frames */}
              <div className="absolute -inset-4 rounded-[1.25rem] border border-gold/15" />
              <div className="absolute -inset-8 rounded-[1.5rem] border border-gold/[0.07] hidden sm:block" />

              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-card overflow-hidden bg-surface border border-line shadow-card flex items-center justify-center">
                <CircuitCorner position="tl" />
                <CircuitCorner position="br" />
                <div className="text-center px-6">
                  <Logo size={104} className="text-gold mx-auto" />
                  <p className="mt-5 text-[10px] text-muted tracking-[0.28em] uppercase">
                    Profile Photo
                  </p>
                </div>
              </div>

              {/* Floating status chips */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-3 sm:-right-4 bg-surface border border-gold/30 rounded-brand px-3.5 py-2.5 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span className="text-[11px] font-medium text-secondary whitespace-nowrap">
                    Open to Work
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-4 -left-3 sm:-left-4 bg-surface border border-gold/30 rounded-brand px-3.5 py-2.5 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <Code2 size={13} className="text-gold" />
                  <span className="text-[11px] font-medium text-secondary whitespace-nowrap">
                    4+ Years
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-snug tracking-[0.03em] text-primary">
              Crafting digital experiences
              <br />
              <span className="text-gradient-gold">with purpose &amp; passion</span>
            </h3>

            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                I&apos;m a passionate software engineer based in {brand.location}, with 4+ years of
                experience building beautiful and performant web applications. My journey
                started with a fascination for how design and code can create meaningful
                experiences.
              </p>

              <p>
                I specialize in{" "}
                <span className="text-gold-ink font-medium">React</span> and{" "}
                <span className="text-gold-ink font-medium">Next.js</span>, creating
                applications that are not only visually stunning but also accessible,
                fast, and production-ready. I care deeply about every detail — from
                pixel-perfect layouts to buttery-smooth animations.
              </p>

              <p>
                When I&apos;m not coding, I&apos;m exploring new design trends,
                contributing to open-source projects, or diving into UI/UX research to
                sharpen my craft.
              </p>
            </div>

            {/* Quick facts */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-line">
              {quickFacts.map((item) => (
                <div key={item.label} className="flex items-start gap-2.5">
                  <span className="node-dot mt-1.5" />
                  <div className="min-w-0">
                    <dt className="text-[10px] text-muted tracking-[0.18em] uppercase">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-primary font-medium truncate">
                      {item.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              className="surface-card-interactive group relative overflow-hidden p-5"
            >
              <CircuitCorner
                position="tr"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="inline-flex p-2.5 rounded-brand bg-gold/10 border border-gold/20 mb-4 group-hover:border-gold/40 transition-colors">
                <item.icon size={18} className="text-gold" />
              </span>
              <h4 className="font-semibold text-sm text-primary mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
