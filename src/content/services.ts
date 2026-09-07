/**
 * SERVICES
 *
 * Four disciplines, then the process that runs through all of them.
 *
 * The ordering is deliberate. Film and Photography are what clients arrive
 * looking for. Visual Communication is the strategic layer above production
 * and the reason to choose SageView over a crew for hire, so it is written as
 * an argument rather than a list. Live Production closes with the work that
 * only happens once.
 */

export type ServiceItem = {
  name: string;
  body: string;
  /** Concrete forms the work takes. Kept short: these are scan-read. */
  points?: readonly string[];
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  /** One line under the section title. */
  summary: string;
  /** The case for the discipline, two or three sentences at most. */
  body: string;
  items: readonly ServiceItem[];
};

export const servicesIntro = {
  eyebrow: "Services",
  heading: "Four disciplines,",
  headingAccent: "one way of working.",
  lead: "Strategy, film, photography and live production sit in the same studio and run off the same brief. That is what keeps the intent set in the first conversation intact in the final frame.",
} as const;

export const services: readonly Service[] = [
  {
    slug: "film",
    index: "01",
    name: "Film",
    summary: "Documentary, commercial, corporate and branded work.",
    body: "Film is the centre of the studio. Whether the subject is a community, a product or a leadership team, the work is built the same way: find the human truth in it first, then decide how it should be shot.",
    items: [
      {
        name: "Documentary Films",
        body: "Non-fiction work that treats its subject as cinema rather than as evidence, without trading the truth of that subject for the effect of the frame.",
        points: [
          "Human-centred documentaries",
          "Impact stories",
          "Institutional documentaries",
        ],
      },
      {
        name: "Commercial Films",
        body: "Brand work built on a story rather than a claim, so the product arrives inside something an audience actually wants to watch.",
        points: ["Brand films", "Advertising", "Product storytelling"],
      },
      {
        name: "Corporate Films",
        body: "Films that make an organisation legible to the people it needs to convince, internally and externally.",
        points: [
          "Company profiles",
          "Leadership films",
          "Internal communications",
        ],
      },
      {
        name: "Branded Content",
        body: "Work made for the platforms it will actually live on, cut to hold attention where attention is hardest to hold.",
        points: ["Social campaigns", "Branded storytelling", "Digital content"],
      },
    ],
  },
  {
    slug: "photography",
    index: "02",
    name: "Photography",
    summary: "Documentary, campaign, corporate and portrait work.",
    body: "Photography is a discipline here, not a by-product of a shoot day. A still can carry a story into a report, a campaign or a boardroom in places a film will never be played.",
    items: [
      {
        name: "Documentary Photography",
        body: "Real people, environments and stories, photographed with the same dignity the films are made with.",
      },
      {
        name: "Campaign Photography",
        body: "Images designed around a campaign or a communication objective, including long-form photo essays built to carry a narrative on their own.",
      },
      {
        name: "Corporate Photography",
        body: "Events, workplaces, teams and the everyday texture of how an organisation actually operates.",
      },
      {
        name: "Executive Portraits",
        body: "Founders, chief executives, government leaders and professionals, photographed to look like themselves on their best day.",
      },
      {
        name: "Lifestyle Portraits & Weddings",
        body: "Private commissions, approached with the same eye for the unguarded moment that the documentary work is built on.",
      },
    ],
  },
  {
    slug: "visual-communication",
    index: "03",
    name: "Visual Communication",
    summary: "The strategic layer above production.",
    body: "Visual Communication is not another kind of video. It is the thinking that decides what should be made at all, who it is for and what it has to achieve. Most production begins with a deliverable. This begins with an objective.",
    items: [
      {
        name: "Story Development",
        body: "What is the story? Who is the audience? What should they feel, and what should they understand? Settled before anything is shot.",
      },
      {
        name: "Creative Direction",
        body: "How the story should look and feel, decided against the psychology of the intended viewer rather than against trend.",
      },
      {
        name: "Communication Strategy",
        body: "Which visual assets are actually required, which are assumed out of habit, and which would be made and never used.",
      },
      {
        name: "Campaign Development",
        body: "How one central story becomes multiple pieces of communication that reinforce each other instead of competing.",
      },
      {
        name: "Social Media Management",
        body: "For organisations that need the full communications package, the ongoing running of Instagram, LinkedIn, Facebook and the rest, so the work keeps speaking after delivery.",
      },
    ],
  },
  {
    slug: "live-production",
    index: "04",
    name: "Live Production",
    summary: "The moments that only happen once.",
    body: "Live work is unforgiving: there is no second take and no fixing it in the edit. It is run by the same team that makes the films, with the technical infrastructure the room requires.",
    items: [
      {
        name: "Full-Scale Production",
        body: "One team carrying an event from technical planning through to delivered assets.",
      },
      {
        name: "Multi-Camera Production",
        body: "Coordinated multi-camera coverage cut for broadcast or for the room.",
      },
      { name: "Livestreaming", body: "Streamed to the audiences that could not be there." },
      {
        name: "LED, Lighting & Sound",
        body: "Screens, lighting rigs and audio specified and run for the venue.",
      },
      {
        name: "Event Production",
        body: "The production layer of the event itself, not only its recording.",
      },
      {
        name: "Technical Direction",
        body: "One person accountable for the technical outcome, from rehearsal to strike.",
      },
    ],
  },
];

/**
 * The content ecosystem.
 *
 * The clearest argument for the strategic layer: what a single documentary
 * shoot is actually worth when it is planned as a system rather than as one
 * film. Rendered as a cascade under Visual Communication.
 */
export const contentEcosystem = {
  eyebrow: "Content Ecosystem",
  heading: "One documentary",
  headingAccent: "becomes a campaign.",
  lead: "Planned properly, a single production yields a year of communication rather than one film and a folder of unused footage.",
  chain: [
    { count: "1", label: "Hero Film" },
    { count: "3", label: "Short Films" },
    { count: "20", label: "Photographs" },
    { count: "—", label: "Social Media Cuts" },
    { count: "—", label: "Campaign Assets" },
    { count: "—", label: "Archival Material" },
  ],
} as const;

/**
 * HOW WE WORK
 *
 * Four stages. Lives inside Services rather than as its own destination:
 * process is a reason to hire the studio, not a thing to shop for.
 */
export const processSteps = [
  {
    index: "01",
    name: "Discover",
    body: "Understand the objective. Who the audience is, what has to change, and what the work is actually for.",
  },
  {
    index: "02",
    name: "Develop",
    body: "Develop the story and the creative direction, so every production decision has something to answer to.",
  },
  {
    index: "03",
    name: "Produce",
    body: "Film, photograph and create, with the crew built for this brief rather than a standing team.",
  },
  {
    index: "04",
    name: "Deliver",
    body: "Deliver the final assets, in the formats and cuts the campaign actually needs.",
  },
] as const;

export const processIntro = {
  eyebrow: "How We Work",
  heading: "Four stages,",
  headingAccent: "every project.",
  lead: "The sequence does not change. What changes is how long each stage takes and who is in the room for it.",
} as const;
