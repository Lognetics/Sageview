/**
 * CASE STUDIES
 *
 * One approved case study. The structure below is deliberately generic so
 * further projects can be added without touching a component.
 *
 * No statistics, outcomes, budgets, dates or partner names have been invented.
 * Only what the portfolio states is present.
 */

import { film, photo, type Media } from "./media";

export type CaseStudySection = {
  label: string;
  heading: string;
  body: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  displayTitle: readonly string[];
  strategicFocus: string;
  location: string;
  summary: string;
  roles: readonly string[];
  sections: readonly CaseStudySection[];
  /** The visual story sequence. */
  gallery: readonly (Media & { caption: string })[];
  heroImage: Media;
  /** The finished documentary. */
  film?: { src: string; poster: string; alt: string };
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "makoko-education-crisis",
    title: "The Makoko Education Crisis",
    displayTitle: ["The Makoko", "Education Crisis"],
    strategicFocus: "SDG 4 Alignment & Educational Equity",
    location: "Makoko, Lagos",
    summary:
      "A character-driven, highly cinematic five-minute documentary translating systemic research and data into an emotionally compelling human story.",
    roles: ["Narrative Design", "Creative Direction", "Cinematography"],
    sections: [
      {
        label: "The Challenge",
        heading:
          "Document the structural barriers that keep children out of school.",
        body: "The brief was to document the major structural barriers and educational exclusion faced by school children within Makoko's informal water settlements in Lagos, a context where the scale of the problem is well evidenced in research, but rarely felt by the people with the power to act on it.",
      },
      {
        label: "SageView's Role",
        heading: "Narrative design, creative direction, cinematography.",
        body: "SageView led the narrative design, set the creative direction and shot the film, carrying the project from the structure of the story through to the way every frame was captured on the water.",
      },
      {
        label: "The Solution",
        heading:
          "A five-minute documentary that turns systemic data into a human story.",
        body: "We built a character-driven, highly cinematic five-minute documentary that translates systemic research and data into an emotionally compelling human story, so that the evidence arrives as a child rather than a chart.",
      },
      {
        label: "The Impact",
        heading:
          "An advocacy tool linking grassroots work to global SDG 4 objectives.",
        body: "The film became a powerful advocacy tool connecting grassroots educational initiatives with global SDG 4 objectives, increasing donor engagement and stakeholder awareness.",
      },
    ],
    gallery: [
      { ...photo.childGreeting, caption: "The settlement" },
      { ...photo.childCarryingLoad, caption: "The journey to school" },
      { ...photo.childStudying, caption: "Studying at home" },
      { ...photo.schoolchildren, caption: "The scale of it" },
      { ...photo.doorway, caption: "Inside" },
      { ...photo.makokoTitle, caption: "Tales from Makoko" },
    ],
    heroImage: {
      src: film.makoko.poster,
      alt: "A canoe crossing the waterway between stilt houses in the Makoko settlement, Lagos.",
    },
    film: film.makoko,
    metaTitle: "SageView | The Makoko Education Crisis",
    metaDescription:
      "A character-driven five-minute documentary on educational exclusion in Makoko's informal water settlements, aligned to SDG 4. Narrative design, creative direction and cinematography by SageView Production Ltd.",
    featured: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export const featuredCaseStudy =
  caseStudies.find((study) => study.featured) ?? caseStudies[0];

/**
 * Shown on the Case Studies index in place of fabricated extra projects.
 * The portfolio lists "Future Projects" as a section with no content, so we
 * present an honest forward-looking slot rather than inventing work.
 */
export const futureProjects = {
  eyebrow: "Future Projects",
  heading: "The archive is being built.",
  body: "Additional documentary and brand projects will be published here as they are completed and cleared for release. If you would like to discuss a project that belongs in this archive, the conversation starts with a brief.",
} as const;
