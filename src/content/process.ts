/**
 * THE CREATIVE PROCESS — five stages.
 * Titles, descriptions and "Key Focus" lines are taken from the approved
 * portfolio. The `caption` is presentational framing only.
 */

import { photo, type Media } from "./media";

export type ProcessStage = {
  index: string;
  id: string;
  title: string;
  description: string;
  keyFocus: readonly string[];
  caption: string;
  image: Media;
};

export const processStages: readonly ProcessStage[] = [
  {
    index: "01",
    id: "discovery-and-alignment",
    title: "Discovery & Alignment",
    description:
      "We immerse ourselves in the client's mission before we propose a single idea. Alignment first; creative second.",
    keyFocus: ["Gathering context", "Audience mapping", "Project benchmarks"],
    caption: "Before the camera",
    image: photo.rulersAssembly,
  },
  {
    index: "02",
    id: "narrative-design",
    title: "Narrative Design",
    description:
      "We create the emotional blueprint — translating complex data, policy briefs or brand goals into a structured, human-centered story engine.",
    keyFocus: ["Narrative arc", "Themes", "Tone"],
    caption: "The blueprint",
    image: photo.elderWriting,
  },
  {
    index: "03",
    id: "strategic-pre-production",
    title: "Strategic Pre-Production",
    description:
      "Careful planning for field conditions, especially in sensitive or complex environments. Nothing about a difficult location is left to improvisation.",
    keyFocus: [
      "Ethical subject sourcing",
      "Scripting",
      "Visual storyboarding",
      "Shot-listing",
      "Field logistics",
    ],
    caption: "Planning the field",
    image: photo.fieldCrew,
  },
  {
    index: "04",
    id: "purposeful-production",
    title: "Purposeful Production",
    description:
      "On-ground execution with cultural sensitivity and a low-impact footprint. We work in a way that leaves communities respected, not extracted from.",
    keyFocus: [
      "High-end cinematography",
      "Field directing",
      "Ethical interviewing",
      "Asset management",
    ],
    caption: "On location",
    image: photo.crewFilming,
  },
  {
    index: "05",
    id: "post-production-and-delivery",
    title: "Post-Production & Editorial Delivery",
    description:
      "We assemble the final narrative rhythm and align emotional pacing with strategic objectives — then deliver across every platform the campaign needs.",
    keyFocus: [
      "Editorial editing",
      "Cinematic colour grading",
      "Sound design",
      "Cross-platform optimization",
    ],
    caption: "The final cut",
    image: photo.doorway,
  },
];

/**
 * CLIENT WORKFLOW — what happens after a client reaches SageView.
 * Deliberately distinct from the five-stage creative process above.
 */
export type WorkflowStep = {
  index: string;
  title: string;
  description: string;
  items: readonly string[];
};

export const clientWorkflow: readonly WorkflowStep[] = [
  {
    index: "01",
    title: "Strategic Consultation",
    description: "A discovery briefing identifies what the project must achieve.",
    items: ["Advocacy goals", "Campaign scope", "Summit needs"],
  },
  {
    index: "02",
    title: "Tailored Blueprinting",
    description:
      "We develop a proposal customised for your stakeholders — creative and commercial in one document.",
    items: [
      "Detailed creative brief",
      "Line-itemed production budget proposal",
      "Execution timeline",
    ],
  },
  {
    index: "03",
    title: "Full-Scale Deployment",
    description:
      "SageView takes it from there, with one goal: flawless, high-fidelity execution.",
    items: [
      "Pre-production logistics",
      "Field documentation",
      "Premium live technical broadcast setups",
    ],
  },
];
