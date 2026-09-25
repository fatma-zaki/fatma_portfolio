"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EngineeredHeading } from "@/components/ui/EngineeredHeading";
import { StackConstellation } from "@/components/brand/StackConstellation";
import { deliveryLoop } from "@/data/skills";

/**
 * SKILLS & TECHNOLOGIES — the technical layer beneath the Engineering Toolkit.
 * The toolkit says how I engineer; this says what I build with.
 *
 * It shares its ground with Projects (same abyss + grid, no seam) and hands
 * off to it through one trace that leaves the bottom of this section and
 * enters the top of the next: capabilities → real systems built.
 */
export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-abyss px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-0"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-circuit-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_55%,black,transparent_80%)]" />
        <div className="absolute inset-x-0 top-[30%] h-[60%] bg-core-depth opacity-80" />
      </div>

      <div className="container-max relative z-10">
        <EngineeredHeading
          eyebrow="Technical Skills"
          title="Skills & Technologies"
          subtitle="The stack behind the systems"
          description="A practical stack spanning web, mobile, backend systems, data, and infrastructure."
        />

        <div ref={ref} className="mt-14 lg:mt-10">
          <StackConstellation active={inView} />
        </div>

        {/* the delivery loop, and the trace that carries on into Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 lg:mt-16 xl:mt-6 flex flex-col items-center"
        >
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-tech text-[9.5px] uppercase tracking-[0.3em] text-muted">
            <span aria-hidden="true" className="w-[5px] h-[5px] rotate-45 bg-gold/70" />
            {deliveryLoop.map((step, i) => (
              <Fragment key={step}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-gold-ink/70">
                    →
                  </span>
                )}
                <span>{step}</span>
              </Fragment>
            ))}
            <span aria-hidden="true" className="w-[5px] h-[5px] rotate-45 bg-gold/70" />
          </p>
          <span aria-hidden="true" className="mt-8 h-24 sm:h-28 w-px bg-gradient-to-b from-gold/10 via-gold/35 to-gold/45" />
        </motion.div>
      </div>
    </section>
  );
}
