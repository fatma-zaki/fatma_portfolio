"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo, BrandLockup } from "./brand/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { brand, navLinks, sectionIds } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  // Close the drawer if the viewport grows past the mobile breakpoint (md,
  // where the inline links take over — keep this in step with the `md:hidden`
  // on the trigger, or the drawer can be left open with no way to close it).
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-canvas border-b border-line"
      >
        <nav
          aria-label="Primary"
          className="container-max h-[64px] md:h-[68px] lg:h-[76px] px-5 md:px-4 lg:px-6 xl:px-8
                     grid grid-cols-[auto_1fr_auto] items-center gap-2 lg:gap-4"
        >
          {/* Brand Mark Lockup */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            aria-label={`${brand.fullName} — back to top`}
            className="flex items-center gap-2 lg:gap-3 transition-opacity duration-300 hover:opacity-85"
          >
            {/*
              The square mark, not the full lockup: the lockup is 1.78:1, so
              at this height its letterforms end up ~15px tall with the width
              spent on wings that cannot survive the scale. The mark carries
              the same wings in a square crop, so the FZ reads twice as large
              in the same slot.
            */}
            <Logo size={30} className="text-gold md:hidden" />
            <Logo size={34} className="text-gold hidden md:block" />
            {/* Phones get the mark alone — the wordmark needs room the row
                doesn't have once the menu trigger is in it. */}
            <span className="hidden md:flex flex-col leading-none">
              <span className="font-display font-bold text-[10px] lg:text-xs xl:text-sm
                               tracking-[0.14em] lg:tracking-[0.18em] xl:tracking-[0.22em]
                               text-primary uppercase whitespace-nowrap">
                {brand.firstName}{" "}
                <span className="text-gradient-gold">{brand.lastName}</span>
              </span>
            </span>
          </a>

          {/*
            Links — inline from tablet up, centred in the row. Type and gaps
            step up at md → lg → xl rather than jumping at lg: six links plus a
            wordmark and a CTA only just fit at 768, and the same crunch
            repeats at 1024 if the larger size arrives before the width does.
          */}
          <div className="hidden md:flex items-center justify-center gap-2.5 lg:gap-4 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "relative py-2 whitespace-nowrap font-medium uppercase",
                    "text-[9px] lg:text-[10px] xl:text-[11px]",
                    "tracking-[0.1em] lg:tracking-[0.14em] xl:tracking-[0.18em]",
                    "transition-colors duration-200",
                    isActive ? "text-gold font-semibold" : "text-muted hover:text-primary"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navActive"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2
                                 flex items-center gap-1"
                    >
                      <span className="h-px w-3.5 bg-gradient-to-r from-transparent to-gold" />
                      <span className="w-1.5 h-1.5 rotate-45 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      <span className="h-px w-3.5 bg-gradient-to-l from-transparent to-gold" />
                    </motion.span>
                  )}
                </a>
              );
            })}
          </div>
          <span className="md:hidden" />

          {/* Actions — CTA, then the theme toggle; phones get the trigger only */}
          <div className="flex items-center gap-2 lg:gap-3 justify-self-end">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="hidden md:inline-flex btn-gold-outline group whitespace-nowrap
                         px-2.5 lg:px-4 xl:px-5 py-2 lg:py-2.5
                         text-[9px] lg:text-[10px] xl:text-[11px]
                         tracking-[0.1em] lg:tracking-[0.14em] xl:tracking-[0.16em]"
            >
              Let&apos;s Connect
              <ArrowRight
                size={13}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-gold"
              />
            </a>

            {/* Below md the toggle lives in the drawer instead */}
            <span className="hidden md:block">
              <ThemeToggle />
            </span>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -mr-2 rounded-brand text-primary
                         hover:text-gold transition-colors duration-200"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-canvas/80 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[min(20rem,86vw)]
                         bg-deep border-l border-line md:hidden overflow-y-auto"
            >
              <div className="flex flex-col min-h-full p-6">
                <div className="flex items-start justify-between mb-10">
                  <BrandLockup size="md" showTitle />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 -mr-2 text-muted hover:text-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav aria-label="Mobile" className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const isActive = activeSection === link.href.replace("#", "");
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ x: 16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.04 * i }}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={cn(
                          "flex items-center gap-3 py-4 border-b border-line",
                          "text-[11px] font-medium uppercase tracking-[0.2em]",
                          "transition-colors duration-200",
                          isActive
                            ? "text-gold"
                            : "text-muted hover:text-primary"
                        )}
                      >
                        <span
                          className={cn(
                            "node-dot transition-opacity duration-200",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {link.label}
                      </motion.a>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-8 space-y-5">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#contact");
                    }}
                    className="btn-gold-solid w-full"
                  >
                    Let&apos;s Connect
                    <ArrowRight size={13} />
                  </a>

                  {/* The header hides the toggle on phones, so it lives here */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted">
                      Appearance
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
