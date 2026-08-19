/**
 * Global site configuration.
 *
 * Single source of truth for company identity, contact details and navigation.
 * Every fact here comes from the SageView Production Ltd Portfolio 2026 /
 * Comprehensive Website Structure. Nothing is invented.
 */

export const site = {
  name: "SageView Production Ltd",
  shortName: "SageView",
  tagline: "Framing the Meaning That Moves Human Minds",
  taglineLower: "Framing the meaning that moves human minds.",
  description:
    "SageView Production Ltd is a storytelling and visual communication company focused on shaping narratives that connect people, ideas, and brands through emotionally intelligent visual content.",
  seoTitle:
    "SageView Production Ltd | Documentary Filmmaking & Visual Storytelling",
  seoDescription:
    "SageView Production Ltd is a strategic creative company specialising in documentary filmmaking, high-impact brand storytelling and visual communication for NGOs, foundations, government entities and corporate brands.",
  /**
   * Set NEXT_PUBLIC_SITE_URL at build time once the domain is live.
   * Used for canonical URLs, Open Graph and the sitemap.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://www.sageviewproduction.com",
  locale: "en",
  foundedYear: 2026,
} as const;

export const contact = {
  email: "hellosageviewproductions@gmail.com",
  phone: "+234 9055366832",
  phoneHref: "+2349055366832",
  instagram: "@sageview",
  instagramUrl: "https://instagram.com/sageview",
} as const;

export const principal = {
  name: "Daniel Okafor",
  role: "Principal Visual Strategist & Creative Director",
} as const;

/** Audiences SageView partners with, stated in the portfolio introduction. */
export const partnerSectors = [
  "Development-sector organizations",
  "Corporate brands",
  "NGOs",
  "Foundations",
  "Government entities",
] as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string }[];
};

/** Primary navigation. Mirrors the approved website architecture. */
export const primaryNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Framing the meaning that moves human minds.",
    children: [
      { label: "Services", href: "/#services" },
      { label: "The Process", href: "/#process" },
      { label: "Deliverables", href: "/#deliverables" },
      { label: "Why SageView", href: "/#why-sageview" },
      { label: "Our Network", href: "/#network" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "Strategic creativity, human-centered storytelling.",
    children: [
      { label: "Introduction", href: "/about#introduction" },
      { label: "The Difference", href: "/about#difference" },
      { label: "End-to-End Capability", href: "/about#capability" },
      { label: "Core Pillars", href: "/about#core-pillars" },
      { label: "The Founder", href: "/about#founder" },
      { label: "Vision & Mission", href: "/vision" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    description: "Documentary, strategy and full-scale production.",
    children: [
      { label: "All Disciplines", href: "/services#disciplines" },
      {
        label: "Documentary Filmmaking",
        href: "/services/documentary-filmmaking",
      },
      {
        label: "Visual Communication Strategy",
        href: "/services/visual-communication",
      },
      { label: "Full-Scale Production", href: "/services/production" },
      { label: "How We Engage", href: "/services#engagement" },
    ],
  },
  {
    label: "Process",
    href: "/process",
    description: "Five stages, from discovery to delivery.",
    children: [
      { label: "The Five Stages", href: "/process#stages" },
      { label: "How We Engage", href: "/process#engagement" },
    ],
  },
  {
    label: "Work",
    href: "/case-studies",
    description: "Case studies and deliverables.",
    children: [
      { label: "Selected Work", href: "/case-studies#selected-work" },
      {
        label: "The Makoko Education Crisis",
        href: "/case-studies/makoko-education-crisis",
      },
      { label: "What Comes Next", href: "/case-studies#whats-next" },
      { label: "Deliverables", href: "/deliverables#ecosystem" },
      { label: "Packages", href: "/deliverables#packages" },
    ],
  },
  {
    label: "Philosophy",
    href: "/philosophy",
    description: "Kama Muta, moved by love.",
    children: [
      { label: "Kama Muta", href: "/philosophy#kama-muta" },
      { label: "The Four Principles", href: "/philosophy#principles" },
      { label: "Core Pillars", href: "/philosophy#core-pillars" },
    ],
  },
  {
    label: "Network",
    href: "/network",
    description: "An agile network, assembled per project.",
    children: [
      { label: "The Model", href: "/network#model" },
      { label: "Capability Clusters", href: "/network#clusters" },
      { label: "The Founder", href: "/network#founder" },
    ],
  },
];

/** Footer link groups. */
export const footerNav = {
  explore: [
    { label: "About", href: "/about" },
    { label: "Vision & Mission", href: "/vision" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Deliverables", href: "/deliverables" },
  ],
  company: [
    { label: "Storytelling Philosophy", href: "/philosophy" },
    { label: "Our Network", href: "/network" },
    { label: "Why SageView", href: "/why-sageview" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
