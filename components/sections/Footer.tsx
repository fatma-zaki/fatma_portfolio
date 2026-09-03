"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { BrandLockup } from "@/components/brand/Logo";
import { CircuitRail } from "@/components/brand/Circuit";
import { brand, navLinks, socialLinks } from "@/lib/brand";

const socialIcons: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-canvas border-t border-line relative overflow-hidden">
      {/* Circuit rail across the top edge */}
      <CircuitRail className="absolute top-0 left-0 -translate-y-1/2" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <BrandLockup size="lg" showTitle />
            <p className="mt-6 text-sm text-muted leading-relaxed max-w-xs">
              Software Engineer crafting elegant, high-performance web experiences
              with React &amp; Next.js.
            </p>

            <ul className="flex gap-2.5 mt-7">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.key];
                return (
                  <li key={social.key}>
                    <motion.a
                      href={social.href}
                      target={social.key === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      aria-label={social.label}
                      className="w-9 h-9 rounded-brand bg-canvas border border-line
                                 flex items-center justify-center text-muted
                                 hover:border-gold/45 hover:text-gold
                                 transition-colors duration-200"
                    >
                      <Icon size={15} />
                    </motion.a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-secondary font-semibold mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="group inline-flex items-center gap-2 text-sm text-muted
                               hover:text-gold-ink transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.28em] text-secondary font-semibold mb-5">
              Contact
            </h4>
            <div className="space-y-3.5">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-gold-ink transition-colors duration-200 break-all"
              >
                <Mail size={13} className="flex-shrink-0" />
                {brand.email}
              </a>
              <p className="flex items-center gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" />
                Open to remote work worldwide
              </p>
              <a
                href={brand.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gold-ink hover:text-gold transition-colors duration-200"
              >
                View GitHub Profile
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[11px] text-muted tracking-wide">
            © {new Date().getFullYear()} {brand.fullName}. Built with Next.js &amp;
            Tailwind CSS.
          </p>
          <p className="text-[11px] text-muted tracking-[0.18em] uppercase flex items-center gap-2">
            <span className="node-dot" />
            Designed &amp; Developed by {brand.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}
