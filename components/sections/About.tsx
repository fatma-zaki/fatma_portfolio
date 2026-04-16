"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Heart, Rocket, Coffee } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "I write maintainable, scalable code with a focus on readability and best practices.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Every app I build is optimized for speed, SEO, and lighthouse scores.",
  },
  {
    icon: Heart,
    title: "User-First",
    description: "Great UI is born from empathy — I design with real users in mind at every step.",
  },
  {
    icon: Coffee,
    title: "Dedicated",
    description: "From early mockup to production deploy, I give 100% to every project.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding dark:bg-dark-bg bg-light-bg relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/3 dark:bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container-max" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-gold mb-3">
            Get to know me
          </p>
          <h2 className="section-title dark:text-gray-100 text-gray-900 mb-4">
            About Me
          </h2>
          <div className="divider-gold" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 rounded-2xl border border-gold/20 dark:border-gold/15" />
              <div className="absolute -inset-8 rounded-2xl border border-gold/10 dark:border-gold/8" />

              {/* Profile placeholder */}
              <div
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden
                             dark:bg-dark-card bg-light-card border dark:border-dark-border border-light-border
                             flex items-center justify-center gold-glow"
              >
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 dark:from-gold/30 dark:to-gold/10 mx-auto mb-4 flex items-center justify-center border border-gold/20">
                    <span className="font-heading text-5xl font-bold text-gradient-gold">
                      F
                    </span>
                  </div>
                  <p className="text-xs dark:text-gray-500 text-gray-400 tracking-wide">Profile Photo</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 dark:bg-dark-surface bg-white
                           border border-gold/30 rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-medium dark:text-gray-300 text-gray-600">
                    Open to Work
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -left-4 dark:bg-dark-surface bg-white
                           border border-gold/30 rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Code2 size={14} className="text-gold" />
                  <span className="text-xs font-medium dark:text-gray-300 text-gray-600">
                    4+ Years
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold dark:text-gray-100 text-gray-900">
                Crafting digital experiences
                <br />
                <span className="text-gradient-gold">with purpose & passion</span>
              </h3>

              <p className="dark:text-gray-400 text-gray-600 leading-relaxed">
                I&apos;m a passionate frontend developer based in Cairo, Egypt, with 4+ years of
                experience building beautiful and performant web applications. My journey started
                with a fascination for how design and code can create meaningful experiences.
              </p>

              <p className="dark:text-gray-400 text-gray-600 leading-relaxed">
                I specialize in{" "}
                <span className="text-gold font-medium">React</span> and{" "}
                <span className="text-gold font-medium">Next.js</span>, creating applications that
                are not only visually stunning but also accessible, fast, and production-ready.
                I care deeply about every detail — from pixel-perfect layouts to buttery-smooth animations.
              </p>

              <p className="dark:text-gray-400 text-gray-600 leading-relaxed">
                When I&apos;m not coding, I&apos;m exploring new design trends, contributing to open-source
                projects, or diving into UI/UX research to sharpen my craft.
              </p>
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Name", value: "Fatma Zaki" },
                { label: "Location", value: "Cairo, Egypt" },
                { label: "Email", value: "fatmazaki712@gmail.com" },
                { label: "Availability", value: "Freelance / Full-time" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className="text-gold text-sm mt-0.5">▸</span>
                  <div>
                    <span className="text-xs dark:text-gray-500 text-gray-400 block">
                      {item.label}
                    </span>
                    <span className="text-sm dark:text-gray-200 text-gray-700 font-medium">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="dark:bg-dark-card bg-white border dark:border-dark-border border-light-border
                         rounded-xl p-5 text-center group gold-glow-hover transition-all duration-300
                         dark:hover:bg-dark-card/80"
            >
              <div className="inline-flex p-3 rounded-xl bg-gold/10 dark:bg-gold/15 mb-3 group-hover:bg-gold/20 transition-colors">
                <item.icon size={20} className="text-gold" />
              </div>
              <h4 className="font-semibold text-sm dark:text-gray-200 text-gray-800 mb-2">
                {item.title}
              </h4>
              <p className="text-xs dark:text-gray-500 text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
