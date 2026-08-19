/**
 * VISION & MISSION
 *
 * The Mission below is preserved from the approved portfolio.
 *
 * The Vision has been re-authored at the client's direction as a narrative
 * manifesto: an African studio built to the world's standard, with the stated
 * ambition of becoming the first name in impact storytelling globally.
 *
 * IMPORTANT: every line here is written as *aspiration*, not as achieved
 * fact. It says what SageView is building toward ("we are building", "our
 * ambition", "we intend"), never that a ranking, award or market position has
 * already been won. No statistics, clients or achievements are invented.
 */

export const visionStatement = {
  eyebrow: "The Vision",
  /** Short form, used on cards, the homepage teaser and meta descriptions. */
  short:
    "To become the first name in impact storytelling, an African studio built to the world's standard, and the partner organisations think of first when a story has to move people to act.",
  /** The headline of the vision page and homepage manifesto. */
  headline: "Built in Africa. Made for the world's most important rooms.",
  /**
   * The narrative. Six beats, designed to be read as a scrolling manifesto
   * rather than a paragraph block.
   */
  beats: [
    {
      id: "premise",
      label: "The Premise",
      heading: "Africa has never lacked stories.",
      body: "What the continent has too often lacked is studios trusted to tell those stories at the standard the world stops to listen to. Too much of Africa's most consequential work: the education crises, the health movements, the grassroots organisations changing real lives - has been documented as evidence rather than authored as cinema. SageView exists to close that gap.",
    },
    {
      id: "ambition",
      label: "The Ambition",
      heading: "To become the first name in impact storytelling.",
      body: "Our vision is to be the definitive global voice for purposeful visual communication. When a founder, a foundation, a ministry or a movement-builder has a story that has to change something: the first name that comes to mind should be SageView.",
    },
    {
      id: "standard",
      label: "The Standard",
      heading: "Best in Africa is the floor, not the ceiling.",
      body: "We are not building toward regional recognition. We are building work that stands beside the world's finest documentary and brand storytelling and holds its own in any room, on any continent, in front of a donor board in Geneva, on a summit screen in Nairobi, in a boardroom in Lagos, at a festival anywhere.",
    },
    {
      id: "measure",
      label: "The Measure",
      heading: "Media measured by depth, not volume.",
      body: "We envision a media landscape that rejects superficial noise in favour of lasting resonance, stories designed to move the human heart rather than chase the algorithm. Depth is our metric. Resonance is our outcome.",
    },
    {
      id: "partnership",
      label: "The Partnership",
      heading: "The premier partner for organisations shaping human progress.",
      body: "We intend to be the studio that international development organisations, governments, foundations and ambitious brands trust with their most sensitive and most consequential narratives, because the craft is world-class and the ethics are uncompromising.",
    },
    {
      id: "legacy",
      label: "The Legacy",
      heading: "A timeless archive of stories that unite, educate and inspire.",
      body: "Beyond any single campaign, we are building a body of work that outlives its brief, carrying African craft, African dignity and African perspective into every room where human progress is decided.",
    },
  ],
  /**
   * The ambition ladder. Framed explicitly as forward-looking intent so it can
   * never be read as a claim of current market position.
   */
  ladderIntro: "What we are building toward",
  ladder: [
    {
      index: "01",
      title: "Africa's standard-bearer",
      body: "A studio whose craft sets the reference point for what impact storytelling from this continent should look like.",
    },
    {
      index: "02",
      title: "Trusted at institutional altitude",
      body: "Work credible enough for donor compliance, AGM screenings, ministerial platforms and international summits.",
    },
    {
      index: "03",
      title: "Competing globally on craft",
      body: "Cinema-grade documentary and brand films that compete on the world stage on their merits, not their origin.",
    },
    {
      index: "04",
      title: "The first name in impact story",
      body: "The default answer when anyone in this field asks who should tell a story that matters.",
    },
  ],
  /** A single pull-quote used as the vision's emotional anchor. */
  pullQuote:
    "We are not trying to be Africa's best-kept secret. We are building the studio the world calls first.",
} as const;

export const missionStatement = {
  eyebrow: "The Mission",
  headline:
    "Translate complex ideas into deeply human-centered visual narratives.",
  body: [
    "We translate complex global and corporate ideas into deeply human-centered visual narratives that bridge information and emotion.",
    "Our approach blends rigorous strategic communication with intentional, cinematic documentary storytelling, and emphasises the dignity of every subject.",
    "We exist to turn high-stakes development, government and corporate messages into unforgettable visual experiences.",
  ],
  /** The mission's closing cadence, rendered as three emphasised words. */
  imperative: ["See", "Feel", "Act"],
  imperativeCaption:
    "Every film we make is built to compel an audience to do all three.",
} as const;
