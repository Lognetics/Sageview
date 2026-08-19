/**
 * THE AGILE NETWORK
 *
 * Roles only: the portfolio names one individual (the Principal Visual
 * Strategist & Creative Director). No other names, headcounts, bios or
 * credentials have been invented.
 */

export const networkIntro = {
  eyebrow: "The Agile Network",
  headline: "We don't believe in one-size-fits-all production.",
  body: [
    "SageView operates through an agile network of experienced creative, technical and communication professionals.",
    "Project-specific teams are assembled under the Principal Creative Director to deliver strategic storytelling, documentary production, digital communication and audience engagement across diverse sectors.",
  ],
  note: "The team is built for the brief, which is why the crew that shoots a water-settlement documentary is not the crew that runs a multi-camera summit broadcast.",
} as const;

export type NetworkCluster = {
  index: string;
  id: string;
  title: string;
  /** Short framing of what this cluster contributes. */
  summary: string;
  roles: readonly string[];
};

export const networkClusters: readonly NetworkCluster[] = [
  {
    index: "01",
    id: "creative-production",
    title: "Creative & Production",
    summary: "The people who get the story on camera, wherever it lives.",
    roles: [
      "Cinematographers",
      "Documentary Producers",
      "Production Managers",
      "Drone Operators",
      "Field Coordinators",
    ],
  },
  {
    index: "02",
    id: "editorial-post-production",
    title: "Editorial & Post-Production",
    summary: "The people who find the film inside the footage.",
    roles: [
      "Editors",
      "Motion Graphics Artists",
      "Colorists",
      "Sound Designers",
      "Translators & Transcribers",
    ],
  },
  {
    index: "03",
    id: "communication-brand",
    title: "Communication & Brand",
    summary: "The people who make sure the work reaches its audience.",
    roles: [
      "Social Media Managers",
      "Community Managers",
      "Content Strategists",
      "Graphic Designers",
      "Copywriter",
    ],
  },
  {
    index: "04",
    id: "business-partnerships",
    title: "Business & Partnerships",
    summary: "The people who align the work with funding and delivery reality.",
    roles: [
      "Business Development Consultants",
      "Grant Specialist",
      "Project Coordinator",
      "Proposal Writer",
    ],
  },
  {
    index: "05",
    id: "technical-broadcast",
    title: "Technical Broadcast",
    summary: "The people who make live moments hold up under pressure.",
    roles: [
      "Broadcast Engineers",
      "Streaming Specialists",
      "Technical Director",
    ],
  },
];
