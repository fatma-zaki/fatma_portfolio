"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/fatmazaki", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/fatmazaki", label: "LinkedIn" },
  { icon: Mail, href: "mailto:fatmazaki712@gmail.com", label: "Email" },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="dark:bg-dark-surface/50 bg-light-card border-t dark:border-dark-border border-light-border">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-heading text-2xl font-bold mb-3">
              <span className="text-gradient-gold">Fatma</span>
              <span className="dark:text-white text-gray-900"> Zaki</span>
            </div>
            <p className="text-sm dark:text-gray-500 text-gray-500 leading-relaxed mb-6 max-w-xs">
              Frontend Developer crafting elegant, high-performance web experiences with React & Next.js.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg dark:bg-dark-card bg-white
                             border dark:border-dark-border border-light-border
                             flex items-center justify-center
                             dark:text-gray-500 text-gray-400
                             hover:border-gold/40 hover:text-gold dark:hover:text-gold
                             transition-all duration-200"
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] dark:text-gray-400 text-gray-600 font-semibold mb-5">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm dark:text-gray-500 text-gray-500 hover:text-gold dark:hover:text-gold
                               transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] dark:text-gray-400 text-gray-600 font-semibold mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:fatmazaki712@gmail.com"
                className="text-sm dark:text-gray-500 text-gray-500 hover:text-gold dark:hover:text-gold transition-colors flex items-center gap-2 group"
              >
                <Mail size={13} className="flex-shrink-0" />
                fatmazaki712@gmail.com
              </a>
              <p className="text-sm dark:text-gray-500 text-gray-500 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                </span>
                Open to remote work worldwide
              </p>
              <a
                href="https://github.com/fatmazaki"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gold/70 hover:text-gold transition-colors"
              >
                View GitHub Profile
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t dark:border-dark-border border-light-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs dark:text-gray-600 text-gray-400 flex items-center gap-1.5">
            © 2026 Fatma Zaki. Built with
            <Heart size={11} className="text-gold fill-gold" />
            using Next.js & Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs dark:text-gray-600 text-gray-400">
              Designed & Developed by Fatma Zaki
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
