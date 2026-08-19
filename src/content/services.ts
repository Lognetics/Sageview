/**
 * SERVICES
 *
 * Three service categories and their capabilities, exactly as approved in the
 * portfolio. Descriptive sentences summarise the listed capabilities; no
 * additional service, tool, credential or claim has been introduced.
 *
 * Adding a service = adding an entry here. Nothing else needs to change.
 */

import { film, photo, type Media } from "./media";

export type Capability = {
  title: string;
  /** One-line framing of the capability. */
  summary: string;
  /** The approved capability keywords from the portfolio. */
  points: readonly string[];
};

export type Service = {
  slug: string;
  index: string;
  /** Short label for navigation and compact lists. */
  shortTitle: string;
  /** Full approved service title. */
  title: string;
  /** Display title split for editorial line-breaking. */
  displayTitle: readonly string[];
  summary: string;
  intro: string;
  capabilities: readonly Capability[];
  /** The cinematic frame that opens this service. */
  image: Media;
  /** A second frame used on the service's own page. */
  secondaryImage: Media;
  /** Optional film shown on the service page. */
  showreel?: { src: string; poster: string; alt: string; caption: string };
  metaTitle: string;
  metaDescription: string;
};

export const services: readonly Service[] = [
  {
    slug: "documentary-filmmaking",
    index: "01",
    shortTitle: "Documentary Filmmaking",
    title: "Documentary Filmmaking & Human-Centered Storytelling",
    displayTitle: ["Documentary", "Filmmaking"],
    summary:
      "Non-fiction stories that turn important social issues, institutional milestones and community impact into engaging cinema.",
    intro:
      "We make non-fiction work that treats a social issue, an institutional milestone or a community's impact as cinema rather than as documentation, without ever trading the truth of the subject for the effect of the frame.",
    capabilities: [
      {
        title: "Impact & NGO Documentaries",
        summary:
          "Films built around development projects, grassroots initiatives and socio-economic crises, approached with dignity and depth.",
        points: [
          "Development projects",
          "Grassroots initiatives",
          "Socio-economic crises",
          "Dignity and depth",
        ],
      },
      {
        title: "Field & Institutional Reporting",
        summary:
          "Real-world situations captured for the people who need to understand them: international donors, stakeholders and global audiences.",
        points: [
          "Real-world situations",
          "International donors",
          "Stakeholders",
          "Global audiences",
        ],
      },
      {
        title: "Character-Driven Narratives",
        summary:
          "Human stories that carry complex systemic data, so that a statistic arrives as a person, not a number.",
        points: ["Human stories", "Complex systemic data"],
      },
    ],
    image: photo.childStudying,
    secondaryImage: photo.schoolchildren,
    showreel: {
      src: film.foodSecurity.src,
      poster: film.foodSecurity.poster,
      alt: film.foodSecurity.alt,
      caption: "Documentary film: food security and vertical farming programme",
    },
    metaTitle: "SageView | Documentary Filmmaking",
    metaDescription:
      "Impact and NGO documentaries, field and institutional reporting, and character-driven narratives from SageView Production Ltd.",
  },
  {
    slug: "visual-communication",
    index: "02",
    shortTitle: "Visual Communication Strategy",
    title: "Visual Communication Strategy & Conception",
    displayTitle: ["Visual", "Strategy"],
    summary:
      "Before a single frame is shot, we design the blueprint for how a message will be received.",
    intro:
      "Strategy is not something applied to a film after it is made. Before a single frame is shot, we design the blueprint for how a message will be received, by whom, in what state of mind, and toward what action.",
    capabilities: [
      {
        title: "Narrative Design & Campaign Strategy",
        summary:
          "Cohesive visual campaigns aligned to global goals and SDG frameworks.",
        points: ["Cohesive visual campaigns", "Global goals", "SDG frameworks"],
      },
      {
        title: "Creative Direction & Scripting",
        summary:
          "Corporate briefs, policy documents and data reports translated into engaging, accessible scripts.",
        points: [
          "Corporate briefs",
          "Policy documents",
          "Data reports",
          "Engaging, accessible scripts",
        ],
      },
      {
        title: "Pre-Visual Analytics",
        summary:
          "Visual tone, mood and aesthetic decided against the psychology of the target viewer, not against trend.",
        points: [
          "Visual tone",
          "Mood",
          "Aesthetic",
          "Target-viewer psychology",
        ],
      },
    ],
    image: photo.forestrySummit,
    secondaryImage: photo.campaignBanner,
    metaTitle: "SageView | Visual Communication Strategy",
    metaDescription:
      "Narrative design, campaign strategy, creative direction, scripting and pre-visual analytics from SageView Production Ltd.",
  },
  {
    slug: "production",
    index: "03",
    shortTitle: "Full-Scale Production",
    title: "Full-Scale Production Management",
    displayTitle: ["Full-Scale", "Production"],
    summary:
      "End-to-end delivery: pre-production logistics, on-set direction, live technical broadcast and post-production.",
    intro:
      "One team carries a project from field research to final master, including live, multi-camera technical broadcast for the moments that only happen once.",
    capabilities: [
      {
        title: "Pre-Production Logistics",
        summary:
          "Project mapping, field research, subject sourcing and creative blueprinting before deployment.",
        points: [
          "Project mapping",
          "Field research",
          "Subject sourcing",
          "Creative blueprinting",
        ],
      },
      {
        title: "On-Set Direction & Production",
        summary:
          "Live field production and high-end interviews captured cinematically by lean, efficient teams.",
        points: [
          "Live field production",
          "High-end interviews",
          "Cinematic visual capture",
          "Lean, efficient teams",
        ],
      },
      {
        title: "Live Production & Technical Broadcast",
        summary:
          "Multi-camera live switching, real-time streaming engineering and full technical direction for corporate forums, NGO summits and launch events.",
        points: [
          "Multi-camera live switching",
          "Real-time streaming engineering",
          "Technical directing",
          "LED display management",
          "Stage lighting",
          "Sound",
          "Corporate forums",
          "NGO summits",
          "Launch events",
        ],
      },
      {
        title: "Post-Production & Editorial Delivery",
        summary:
          "Editing, sound design and colour grading tuned to emotional pacing.",
        points: [
          "Editing",
          "Sound design",
          "Colour grading",
          "Emotional pacing",
        ],
      },
    ],
    image: photo.studioSetup,
    secondaryImage: photo.committee,
    metaTitle: "SageView | Full-Scale Production",
    metaDescription:
      "Pre-production logistics, on-set direction, live technical broadcast and post-production delivery from SageView Production Ltd.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
