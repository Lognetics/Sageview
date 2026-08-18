/**
 * ABOUT — introduction, positioning and the "narrative designers" argument.
 */

export const about = {
  hero: {
    eyebrow: "About SageView",
    headline: "Strategic creativity. Human-centered storytelling.",
    body: "SageView Production Ltd specialises in documentary filmmaking, high-impact brand storytelling and visual communication. Our work translates complex institutional, development, corporate and social ideas into human-centered narratives.",
  },
  introduction: {
    eyebrow: "Introduction",
    headline: "Stories carry meaning. We bring that meaning to the screen.",
    body: [
      "SageView is a strategic creative company specialising in documentary filmmaking, high-impact brand storytelling and visual communication.",
      "We partner with development-sector organisations, corporate brands, NGOs, foundations and government entities to translate complex ideas into deeply human-centered narratives.",
    ],
  },
  difference: {
    eyebrow: "The SageView Difference",
    headline: "We don't just create visual content.",
    emphasis: "We are narrative designers.",
    body: "We shape how stories are seen, felt and remembered — managing the creative process from concept and pre-production strategy through production and final execution.",
    /** The three verbs, rendered as an editorial triad. */
    verbs: [
      {
        label: "Seen",
        body: "Composition, colour and craft decide whether a story is looked at or looked past.",
      },
      {
        label: "Felt",
        body: "Pacing, sound and restraint decide whether an audience feels something true.",
      },
      {
        label: "Remembered",
        body: "Structure and character decide whether the story survives the week it was released.",
      },
    ],
  },
  /** End-to-end capability chain — CONCEPT → PRE-PRODUCTION → PRODUCTION → FINAL EXECUTION */
  capabilityChain: [
    {
      index: "01",
      label: "Concept",
      body: "The idea, interrogated against the objective before anything is committed.",
    },
    {
      index: "02",
      label: "Pre-Production",
      body: "Strategy, scripting, logistics and ethical groundwork.",
    },
    {
      index: "03",
      label: "Production",
      body: "Cinematic capture in the field, however demanding the conditions.",
    },
    {
      index: "04",
      label: "Final Execution",
      body: "Editorial, grade, sound and delivery across every platform required.",
    },
  ],
} as const;

/**
 * WHY SAGEVIEW — five differentiators.
 */
export const whySageView = [
  {
    index: "01",
    title: "Purpose-Driven Documentaries",
    body: "Meaningful, character-focused stories that support advocacy goals, donor compliance requirements and global development standards.",
  },
  {
    index: "02",
    title: "Uncompromised Cinematic Excellence",
    body: "World-class broadcast and cinema-grade visuals designed for corporate boardrooms, AGM screenings and international summits.",
  },
  {
    index: "03",
    title: "Strategic Communication Alignment",
    body: "Creative execution connected to campaign goals, donor relationships and stakeholder reporting — not creative for its own sake.",
  },
  {
    index: "04",
    title: "Human-Centered, Ethical Filmmaking",
    body: "Sensitive community stories handled with deep emotional intelligence and strict ethical standards.",
  },
  {
    index: "05",
    title: "Dynamic, Agile Deployment",
    body: "Flexible operational infrastructure that scales and deploys specialised crews quickly — maximising budget without sacrificing premium production value.",
  },
] as const;
