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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sageviewproduction.com",
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

/** Audiences SageView partners with — stated in the portfolio introduction. */
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
    label: "About",
    href: "/about",
    description: "Strategic creativity, human-centered storytelling.",
    children: [
      { label: "About SageView", href: "/about" },
      { label: "Vision & Mission", href: "/vision" },
      { label: "Storytelling Philosophy", href: "/philosophy" },
      { label: "Our Network", href: "/network" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    description: "Documentary, strategy and full-scale production.",
    children: [
      { label: "All Services", href: "/services" },
      {
        label: "Documentary Filmmaking",
        href: "/services/documentary-filmmaking",
      },
      {
        label: "Visual Communication Strategy",
        href: "/services/visual-communication",
      },
      { label: "Full-Scale Production", href: "/services/production" },
    ],
  },
  {
    label: "Process",
    href: "/process",
    description: "Five stages, from discovery to delivery.",
  },
  {
    label: "Work",
    href: "/case-studies",
    description: "Case studies and deliverables.",
    children: [
      { label: "Case Studies", href: "/case-studies" },
      {
        label: "The Makoko Education Crisis",
        href: "/case-studies/makoko-education-crisis",
      },
      { label: "Deliverables", href: "/deliverables" },
    ],
  },
  {
    label: "Philosophy",
    href: "/philosophy",
    description: "Kama Muta — moved by love.",
  },
  {
    label: "Network",
    href: "/network",
    description: "An agile network, assembled per project.",
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
