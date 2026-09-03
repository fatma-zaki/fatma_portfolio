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
   * The official FZ logo, derived from `assets/FZ_LOGO.png`:
   * the black backdrop is keyed out to alpha and the artwork trimmed, so it
   * composites cleanly on any surface.
   *
   *  logoSrc  full lockup — letterforms plus the circuit wings (1172×517)
   *  markSrc  square letterforms only, for small sizes (512×512)
   *
   * Set either to `null` to fall back to the built-in drawn monogram.
   */
  logoSrc: "/brand/fz-logo.png" as string | null,
  logoWidth: 1172,
  logoHeight: 517,
  markSrc: "/brand/fz-mark.png" as string | null,
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
