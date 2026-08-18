/**
 * MEDIA REGISTRY
 *
 * Every photograph and film used on the site, in one place.
 *
 * All imagery is SageView's own work, supplied in the company's Drive
 * portfolio. Nothing here is stock. Alt text describes what is actually in
 * each frame and makes no claim about where or when it was shot beyond what
 * the approved portfolio states.
 *
 * To swap an asset: drop the new file into `public/media/...` and change the
 * `src` below. No component needs to be touched.
 */

export type Media = {
  src: string;
  alt: string;
};

const DOC = "/media/documentary";

/** Documentary photography. */
export const photo = {
  collierEmerging: {
    src: `${DOC}/collier-emerging.jpg`,
    alt: "A charcoal worker climbing out of the dark opening of a kiln.",
  },
  collierFlexing: {
    src: `${DOC}/collier-portrait-flexing.jpg`,
    alt: "A young charcoal worker, skin darkened with dust, raising an arm to his shoulder.",
  },
  collierSmiling: {
    src: `${DOC}/collier-portrait-smiling.jpg`,
    alt: "A young charcoal worker smiling, a strap across his chest and a cap on his head.",
  },
  portersCarrying: {
    src: `${DOC}/porters-carrying-sacks.jpg`,
    alt: "Porters carrying heavy sacks of charcoal balanced on their heads.",
  },
  childGreeting: {
    src: `${DOC}/child-settlement-greeting.jpg`,
    alt: "A child raising a hand in greeting on a walkway in an informal settlement.",
  },
  childCarryingLoad: {
    src: `${DOC}/child-carrying-load.jpg`,
    alt: "A child carrying a load along a settlement path, a toddler standing behind.",
  },
  childPeering: {
    src: `${DOC}/child-peering-corrugated.jpg`,
    alt: "A child peering around the edge of a corrugated metal wall.",
  },
  childStudying: {
    src: `${DOC}/child-studying-floor.jpg`,
    alt: "A child lying on the floor of a timber home, reading.",
  },
  girlResting: {
    src: `${DOC}/girl-resting-green.jpg`,
    alt: "A girl in a green patterned top resting her chin on her folded arms.",
  },
  boySeatedRural: {
    src: `${DOC}/boy-seated-rural.jpg`,
    alt: "A boy in an orange shirt seated on a fallen log in dry rural scrub.",
  },
  boyWheelchair: {
    src: `${DOC}/boy-wheelchair-street.jpg`,
    alt: "A boy in a wheelchair on a busy street, a man walking alongside him.",
  },
  childrenLaughing: {
    src: `${DOC}/children-laughing-pair.jpg`,
    alt: "Two children laughing together, one resting against the other.",
  },
  twoChildrenCrowd: {
    src: `${DOC}/two-children-crowd.jpg`,
    alt: "Two children smiling brightly in the middle of a crowd.",
  },
  schoolchildren: {
    src: `${DOC}/schoolchildren-assembly.jpg`,
    alt: "A large assembly of schoolchildren in blue uniforms and headscarves.",
  },
  youngVendor: {
    src: `${DOC}/young-vendor-sugarcane.jpg`,
    alt: "A young street vendor smiling behind a stall of cut sugarcane.",
  },
  elderWriting: {
    src: `${DOC}/elder-writing-monochrome.jpg`,
    alt: "Black and white portrait of an elder in a wide-brimmed hat, writing.",
  },
  doorway: {
    src: `${DOC}/doorway-monochrome.jpg`,
    alt: "Black and white frame of a figure standing in the doorway of a timber house.",
  },
  fieldCrew: {
    src: `${DOC}/field-crew-settlement.jpg`,
    alt: "A crew member carrying a backpack through a narrow settlement walkway.",
  },
  rulersAssembly: {
    src: `${DOC}/traditional-rulers-assembly.jpg`,
    alt: "Traditional rulers in ceremonial dress gathered at an institutional event.",
  },
  forestrySummit: {
    src: `${DOC}/forestry-summit-stage.jpg`,
    alt: "A summit banner on the sustainability of Nigeria's forests and financial inclusion.",
  },
  committee: {
    src: `${DOC}/vice-president-committee.jpg`,
    alt: "Black and white frame of officials speaking at a government committee event.",
  },
  campaignBanner: {
    src: `${DOC}/official-campaign-banner.jpg`,
    alt: "An official in white robes walking past a large political campaign banner.",
  },
  makokoTitle: {
    src: `${DOC}/tales-from-makoko-title.jpg`,
    alt: "The Tales from Makoko title card over a canoe crossing the Makoko waterway.",
  },
  crewFilming: {
    src: `${DOC}/crew-filming-on-location.jpg`,
    alt: "A SageView camera operator filming a subject in a narrow settlement passage.",
  },
  studioSetup: {
    src: `${DOC}/studio-lighting-setup.jpg`,
    alt: "A studio set with lighting rigs, cameras on tripods and a cyclorama wall.",
  },
  quarryWide: {
    src: `${DOC}/charcoal-quarry-wide.jpg`,
    alt: "A wide view of workers loading charcoal in a quarry.",
  },
} as const satisfies Record<string, Media>;

/**
 * Films.
 *
 * `loop` assets are silent, short and used as motion backdrops. `feature`
 * assets are the full documentaries, played only on request.
 */
export const film = {
  /** Homepage hero backdrop: a silent 6.8s loop cut from the Makoko film. */
  heroLoop: {
    mp4: "/media/video/hero-makoko.mp4",
    webm: "/media/video/hero-makoko.webm",
    poster: "/media/video/hero-makoko-poster.jpg",
    alt: "Aerial and street footage of the Makoko water settlement in Lagos.",
  },
  makoko: {
    src: "/media/video/makoko-education-crisis.mp4",
    poster: "/media/video/makoko-education-crisis-poster.jpg",
    alt: "The Makoko Education Crisis documentary.",
  },
  periodPoverty: {
    src: "/media/video/period-poverty.mp4",
    poster: "/media/video/period-poverty-poster.jpg",
    alt: "The Period Poverty Documentary made with Flow with Pride Impact Hub.",
  },
  foodSecurity: {
    src: "/media/video/food-security-programme.mp4",
    poster: "/media/video/food-security-programme-poster.jpg",
    alt: "A documentary on a food security and vertical farming programme.",
  },
} as const;

/**
 * Brand artwork.
 *
 * The official "— SAGE VIEW —" horizontal lockup, in brass on transparent.
 * Prepared from the 2400x2400 master by trimming the empty margins down to
 * the ink: 2318x261, an 8.88:1 band. The component sizes it by height and
 * lets width follow, so trimming is what keeps the mark from rendering at a
 * tenth of its intended size.
 *
 * Replacing it: drop a new file in as `.svg` (preferred) or `.png` and update
 * width/height here to match — they set the layout aspect ratio. An SVG is
 * picked over a PNG automatically.
 */
export const brand = {
  wordmark: {
    src: "/media/brand/sageview-wordmark.svg",
    alt: "SageView Production Ltd",
    width: 2318,
    height: 261,
  },
} as const;

/**
 * Founder portraits — Daniel Okafor, Principal Visual Strategist & Creative
 * Director.
 *
 * Listed in preference order. The Founder section renders whichever of these
 * are actually present on disk and ignores the rest, so the site is never
 * waiting on a file to look finished.
 *
 * `daniel-okafor-portrait-bw.jpg` was recovered from the company portfolio PDF
 * at 629x787 — small, so it is used at a contained size rather than as a
 * full-bleed hero. Drop higher-resolution files in at the names below to
 * upgrade it.
 */
export const founderPortraits: readonly Media[] = [
  {
    src: "/media/founder/daniel-okafor-01.jpg",
    alt: "Daniel Okafor, Principal Visual Strategist and Creative Director of SageView Production Ltd.",
  },
  {
    src: "/media/founder/daniel-okafor-02.jpg",
    alt: "Daniel Okafor photographed in a blue kaftan.",
  },
  {
    src: "/media/founder/daniel-okafor-portrait-bw.jpg",
    alt: "Black and white studio portrait of Daniel Okafor, Principal Visual Strategist and Creative Director.",
  },
];
