/**
 * DELIVERABLES
 *
 * Two customised asset packages. Durations and formats are exactly as stated
 * in the portfolio; nothing has been added.
 */

export type DeliverableItem = {
  title: string;
  spec?: string;
  body: string;
  optional?: boolean;
};

export type DeliverablePackage = {
  index: string;
  id: string;
  title: string;
  summary: string;
  items: readonly DeliverableItem[];
};

export const deliverablesIntro =
  "SageView develops customised asset packages for institutional reports, global campaigns and digital platforms. One production becomes an entire communication ecosystem.";

export const deliverablePackages: readonly DeliverablePackage[] = [
  {
    index: "01",
    id: "documentary-package",
    title: "Documentary Package",
    summary:
      "Everything a single documentary production needs to serve advocacy, reporting and digital reach at once.",
    items: [
      {
        title: "Flagship Master Film",
        spec: "3–10 minutes",
        body: "The cinematic documentary cut: the definitive version of the story.",
      },
      {
        title: "Strategic Highlight Edits",
        spec: "60–90 seconds",
        body: "Short versions for stakeholder presentations, AGM screenings and global summits.",
      },
      {
        title: "Multi-Platform Short Edits",
        body: "Social-media cuts designed for digital reach.",
      },
      {
        title: "Premium Photography Asset Set",
        body: "High-resolution editorial and documentary stills for press kits, websites and annual reports.",
      },
      {
        title: "Archival Raw Assets",
        body: "Structured selected raw footage for internal documentation and compliance logging.",
        optional: true,
      },
    ],
  },
  {
    index: "02",
    id: "brand-strategy-package",
    title: "Brand Strategy Package",
    summary:
      "A cinematic anchor for the brand, plus the cross-platform assets that carry it outward.",
    items: [
      {
        title: "Core Brand Film",
        body: "A cinematic visual anchor detailing company mission, vision or corporate identity.",
      },
      {
        title: "Cross-Platform Social Cuts",
        body: "High-retention vertical narratives for public awareness campaigns.",
      },
      {
        title: "Campaign Visuals",
        body: "Bespoke, high-contrast imagery for digital and print media.",
      },
    ],
  },
];

/**
 * The "asset ecosystem" idea: one production, many communication outputs.
 * Used by the deliverables diagram.
 */
export const assetEcosystem = {
  source: "One Production",
  outputs: [
    { label: "Flagship Film", context: "The definitive cut" },
    { label: "Highlight Edits", context: "Summits & AGMs" },
    { label: "Social Cuts", context: "Digital reach" },
    { label: "Photography", context: "Press & reports" },
    { label: "Campaign Visuals", context: "Digital & print" },
    { label: "Archival Assets", context: "Compliance logging" },
  ],
} as const;
