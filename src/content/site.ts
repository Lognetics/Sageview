/**
 * Global site configuration.
 *
 * Single source of truth for company identity, contact details and navigation.
 *
 * The architecture here is the 2026 restructure: five destinations, with
 * Process folded into Services and the former standalone pages (Vision,
 * Philosophy, Network, Deliverables, Why SageView, Testimonials) absorbed into
 * About and Services rather than competing for room in the header.
 */

export const site = {
  name: "SageView Production Ltd",
  shortName: "SageView",
  tagline: "Visual Communications & Production",
  taglineLower: "Visual communications and production.",
  description:
    "SageView Production Ltd is a visual communications and production company making human-centred film, photography and campaign work for brands, organisations and institutions.",
  seoTitle: "SageView Production Ltd | Visual Communications & Production",
  seoDescription:
    "SageView Production Ltd is a visual communications and production company working across documentary and commercial film, photography, visual communication strategy and live production.",
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

/**
 * Contact routes.
 *
 * `email` is the general address and the one the site shows by default.
 * `projectEmail` is where briefs and enquiries are directed, so new business
 * does not have to be filtered out of general mail.
 */
export const contact = {
  email: "hello@sageviewproduction.com",
  projectEmail: "contact@sageviewproduction.com",
  phone: "+234 905 536 6832",
  phoneHref: "+2349055366832",
  instagram: "@i_sageview",
  instagramUrl: "https://instagram.com/i_sageview",
} as const;

export const principal = {
  name: "Daniel Okafor",
  role: "Founder & Visual Communication Strategist",
} as const;

/** Audiences SageView works with. */
export const partnerSectors = [
  "Brands",
  "Organisations",
  "Institutions",
  "NGOs and foundations",
  "Government entities",
] as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string }[];
};

/**
 * Primary navigation.
 *
 * Each destination carries a submenu of in-page sections, so the header can
 * take a visitor to a specific part of a page rather than only its top.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Visual communications and production.",
    children: [
      { label: "Selected Work", href: "/#selected-work" },
      { label: "What We Do", href: "/#what-we-do" },
      { label: "More Than Production", href: "/#more-than-production" },
      { label: "Clients & Collaborators", href: "/#clients" },
      { label: "About SageView", href: "/#about" },
    ],
  },
  {
    label: "Work",
    href: "/work",
    description: "Selected projects across film and photography.",
    children: [
      { label: "All Work", href: "/work" },
      { label: "Film", href: "/work?category=film" },
      { label: "Photography", href: "/work?category=photography" },
      { label: "Commercial", href: "/work?category=commercial" },
      { label: "Documentary", href: "/work?category=documentary" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    description: "Film, photography, visual communication, live production.",
    children: [
      { label: "Film", href: "/services#film" },
      { label: "Photography", href: "/services#photography" },
      { label: "Visual Communication", href: "/services#visual-communication" },
      { label: "Live Production", href: "/services#live-production" },
      { label: "How We Work", href: "/services#process" },
    ],
  },
  {
    label: "About",
    href: "/about",
    description: "Who we are, and how we think about the work.",
    children: [
      { label: "Who We Are", href: "/about#who-we-are" },
      { label: "The Founder", href: "/about#founder" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Our Approach", href: "/about#approach" },
      { label: "Our Team", href: "/about#team" },
      { label: "Our Network", href: "/about#network" },
    ],
  },
];

/** The single call to action, kept out of `primaryNav` so it can be styled as a button. */
export const primaryAction = {
  label: "Start a Project",
  href: "/start-a-project",
} as const;

/** Footer link groups. */
export const footerNav = {
  explore: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Start a Project", href: "/start-a-project" },
  ],
  services: [
    { label: "Film", href: "/services#film" },
    { label: "Photography", href: "/services#photography" },
    { label: "Visual Communication", href: "/services#visual-communication" },
    { label: "Live Production", href: "/services#live-production" },
  ],
} as const;
