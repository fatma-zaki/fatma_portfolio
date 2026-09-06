/**
 * Single source of truth for the FZ personal brand.
 *
 * Everything identity-related (name, title, contact points, social handles,
 * logo asset) lives here so the rest of the app never hardcodes it.
 */

export const brand = {
  firstName: "Fatma",
  lastName: "Zaki",
  fullName: "Fatma Zaki",
  initials: "FZ",
  title: "Software Engineer",
  /** Short positioning line used in the hero and social metadata. */
  tagline:
    "Building thoughtful digital solutions through clean code, scalable systems, and modern engineering.",
  location: "Cairo, Egypt",
  email: "fatmazaki712@gmail.com",
  site: "https://fatmazaki.dev",
  githubUrl: "https://github.com/fatmazaki",
  linkedinUrl: "https://linkedin.com/in/fatmazaki",
  githubHandle: "@fatmazaki",
  cvUrl: "/cv.pdf",

  /**
   * The official FZ logo: authentic metallic gold assets.
   *  logoSrc  full lockup — letterforms plus the circuit wings (1672×940)
   *  markSrc  square letterforms only, for compact placements (840×840)
   */
  logoSrc: "/brand/fz-logo.png" as string | null,
  logoWidth: 1672,
  logoHeight: 940,
  markSrc: "/brand/fz-mark.png" as string | null,
  markWidth: 840,
  markHeight: 840,

  /**
   * Portrait used in the About section. Drop the file at `public/portrait.png`
   * (or point this at whatever you name it) — a roughly 3:4 upper-body frame
   * works best, since the About composition dissolves the lower third into the
   * field. If the file is missing the section falls back to the FZ core plate,
   * so the layout never breaks.
   */
  portraitSrc: "/portrait.png" as string | null,
  portraitAlt: "Fatma Zaki",
} as const;

export const socialLinks = [
  { key: "github", label: "GitHub", href: brand.githubUrl, handle: brand.githubHandle },
  { key: "linkedin", label: "LinkedIn", href: brand.linkedinUrl, handle: brand.fullName },
  { key: "email", label: "Email", href: `mailto:${brand.email}`, handle: brand.email },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

export const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
