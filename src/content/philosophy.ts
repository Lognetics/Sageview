/**
 * STORYTELLING PHILOSOPHY — Kama Muta.
 *
 * NOTE ON SPELLING: the source portfolio uses "Kama Muta" in the Core Pillars
 * section and "Kuma Muta" in the Philosophy section. "Kama Muta" is the
 * established term (Sanskrit, "moved by love") used in the emotion research
 * this positioning draws on, so it is used consistently here. Change the two
 * strings below if the client prefers the alternate spelling.
 */

import { photo } from "./media";

export const philosophy = {
  term: "Kama Muta",
  termTranslation: "Moved by Love",
  eyebrow: "Storytelling Philosophy",
  statement:
    "Storytelling is not just about capturing moments; it is about revealing the truth, emotion and meaning hidden within them.",
  intro:
    "Kama Muta is the sudden feeling of being moved — the warmth in the chest when connection becomes visible. It is the emotion behind every story that changes a mind rather than merely informing one. It is the standard we edit against.",
  principles: [
    {
      index: "01",
      title: "Emotional Honesty",
      summary:
        "Raw, genuine emotion and unfiltered human experience — never performed, never manufactured in the edit.",
      points: ["Raw emotions", "Genuine emotions", "Unfiltered human experiences"],
      image: photo.childPeering,
    },
    {
      index: "02",
      title: "Cinematic Realism",
      summary:
        "Authentic documentary elements held to cinematic visual grandeur. Truth, filmed beautifully.",
      points: ["Authentic documentary elements", "Cinematic visual grandeur"],
      image: photo.collierEmerging,
    },
    {
      index: "03",
      title: "Human-Centered Focus",
      summary:
        "The individual sits at the centre of the frame, with their agency and dignity respected throughout.",
      points: [
        "Individual at the center of the frame",
        "Respect for agency and dignity",
      ],
      image: photo.collierSmiling,
    },
    {
      index: "04",
      title: "Ethical Integrity",
      summary:
        "Informed consent, subject safety and cultural respect, held to strict ethical standards on every project.",
      points: [
        "Informed consent",
        "Safety",
        "Cultural respect",
        "Strict ethical standards",
      ],
      image: photo.boySeatedRural,
    },
  ],
} as const;

/**
 * CORE PILLARS — the three beliefs the company is built on.
 */
export const corePillars = [
  {
    index: "01",
    title: "Story Over Spectacle",
    tagline: "Depth before dazzle.",
    body: "Depth, authenticity and the sacred dignity of the subject take priority over flashy trends. If an effect does not serve the story, it does not survive the edit.",
    image: photo.girlResting,
  },
  {
    index: "02",
    title: "Emotion Over Noise",
    tagline: "Grounded in Kama Muta.",
    body: "Grounded in Kama Muta — moved by love — our visuals are crafted to touch the human heart and move minds, rather than compete for attention with volume.",
    image: photo.childrenLaughing,
  },
  {
    index: "03",
    title: "Strategy Meets Soul",
    tagline: "Rigour and feeling, together.",
    body: "Strategic communication rigour and emotional intelligence are not opposites. Every creative decision is a bridge into the mission, the vision and the communication objective behind the project.",
    image: photo.elderWriting,
  },
] as const;
