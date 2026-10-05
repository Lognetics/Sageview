/**
 * WORK
 *
 * The project index behind the filterable grid.
 *
 * Every entry here is real work. Nothing is invented to fill the grid: where a
 * project's detail is thin, it stays thin rather than being padded out. As new
 * projects are added, give each one at least a title, a category and a piece
 * of media, and it will appear in the grid and under its filters.
 *
 * `categories` is a list because the taxonomy deliberately overlaps: a
 * documentary film is both `film` and `documentary`, and should appear under
 * either filter. That is how people look for work, even though it means a
 * project can match more than one tab.
 */

import { film, photo, type Media } from "@/content/media";

export type WorkCategory =
  | "film"
  | "photography"
  | "commercial"
  | "documentary"
  | "photo-essay";

export const workFilters = [
  { id: "all", label: "All" },
  { id: "film", label: "Film" },
  { id: "photography", label: "Photography" },
  { id: "commercial", label: "Commercial" },
  { id: "documentary", label: "Documentary" },
  { id: "photo-essay", label: "Photo Essay" },
] as const;

export type WorkFilterId = (typeof workFilters)[number]["id"];

export type WorkProject = {
  slug: string;
  title: string;
  /** Client or partner, where there is one to name. */
  client?: string;
  /** Short line under the title in the grid. */
  summary: string;
  categories: readonly WorkCategory[];
  /** Still used in the grid. */
  image: Media;
  /** Present when there is a film to play on the project page. */
  video?: { src: string; poster: string; alt: string };
  /** Longer copy for the project page. Optional: absent is better than padded. */
  body?: readonly string[];
  /** Shown as a small meta row. */
  meta?: readonly { label: string; value: string }[];
  /**
   * Further stills, shown as a gallery on the project page.
   *
   * This is where a photo essay belongs: a set of frames read in sequence
   * rather than one cover standing in for the whole body of work. Add images
   * to the registry and list them here; the page renders what it is given and
   * omits the gallery entirely when there is nothing to show.
   */
  gallery?: readonly Media[];
  /**
   * Presentation hints for projects whose frames are not landscape crops.
   *
   * `frameAspect` sets the box the frames are shown in, and `fit` decides
   * whether a frame fills that box or sits whole inside it. A photo essay
   * built as portrait slides with type set into them has to be shown whole:
   * cropping it to landscape cuts the words off the picture.
   */
  frameAspect?: string;
  fit?: "cover" | "contain";
  /** Ordering weight for the grid: lower comes first. */
  order: number;
};

export const workProjects: readonly WorkProject[] = [
  {
    slug: "makoko-education-crisis",
    title: "The Makoko Education Crisis",
    summary:
      "A character-driven documentary on educational exclusion in Lagos' informal water settlements.",
    categories: ["film", "documentary"],
    image: photo.childStudying,
    video: {
      src: film.makoko.src,
      poster: film.makoko.poster,
      alt: film.makoko.alt,
    },
    body: [
      "The brief was to document the structural barriers and educational exclusion faced by school children within Makoko's informal water settlements in Lagos, a context where the scale of the problem is well evidenced in research but rarely felt by the people with the power to act on it.",
      "SageView led the narrative design, set the creative direction and shot the film, carrying the project from the structure of the story through to the way every frame was captured on the water.",
      "The result is a five-minute documentary that translates systemic research into a human story, so the evidence arrives as a child rather than as a chart.",
    ],
    meta: [
      { label: "Discipline", value: "Documentary" },
      { label: "Role", value: "Narrative design, direction, cinematography" },
      { label: "Length", value: "5 minutes" },
      { label: "Alignment", value: "SDG 4" },
    ],
    order: 1,
  },
  {
    slug: "period-poverty",
    title: "The Period Poverty Documentary",
    client: "Flow with Pride Impact Hub",
    summary:
      "A documentary made with Flow with Pride Impact Hub on period poverty and the silence around it.",
    categories: ["film", "documentary"],
    image: photo.periodPovertyCover,
    video: {
      src: film.periodPoverty.src,
      poster: film.periodPoverty.poster,
      alt: film.periodPoverty.alt,
    },
    meta: [
      { label: "Discipline", value: "Documentary" },
      { label: "Partner", value: "Flow with Pride Impact Hub" },
    ],
    order: 2,
  },
  {
    slug: "food-security-programme",
    title: "Food Security & Vertical Farming",
    summary:
      "A documentary on a food security programme and the vertical farming behind it.",
    categories: ["film", "documentary"],
    image: photo.foodSecurityCover,
    video: {
      src: film.foodSecurity.src,
      poster: film.foodSecurity.poster,
      alt: film.foodSecurity.alt,
    },
    meta: [{ label: "Discipline", value: "Documentary" }],
    gallery: [photo.foodSecurityField, photo.forestrySummit],
    order: 3,
  },
  {
    slug: "charcoal-colliers",
    title: "The Colliers",
    summary:
      "Documentary photography made with charcoal workers: portraits, and the work as it actually is.",
    categories: ["photography", "documentary"],
    image: photo.collierEmerging,
    meta: [{ label: "Discipline", value: "Documentary photography" }],
    gallery: [
      photo.collierFlexing,
      photo.collierSmiling,
      photo.portersCarrying,
      photo.quarryWide,
    ],
    order: 4,
  },
  {
    slug: "field-portraits",
    title: "Field Portraits",
    summary:
      "Portrait work made on location, across settlements, schools and workplaces.",
    categories: ["photography"],
    image: photo.boySeatedRural,
    meta: [{ label: "Discipline", value: "Portrait photography" }],
    gallery: [
      photo.girlResting,
      photo.childStudying,
      photo.boyWheelchair,
      photo.childrenLaughing,
      photo.youngVendor,
      photo.elderWriting,
    ],
    order: 5,
  },
  {
    slug: "summit-and-assembly",
    title: "Summits & Assemblies",
    summary:
      "Multi-camera coverage and stills across summits, committees and official assemblies.",
    categories: ["photography", "commercial"],
    image: photo.rulersAssembly,
    meta: [
      { label: "Discipline", value: "Live production, photography" },
    ],
    order: 6,
  },
];

/**
 * Projects matching a filter, in grid order.
 *
 * Takes the list rather than closing over `workProjects`, because the photo
 * essay is read off disk at build time and so is only known to the server.
 */
export function projectsFor(
  filter: WorkFilterId,
  projects: readonly WorkProject[] = workProjects,
): readonly WorkProject[] {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  if (filter === "all") return ordered;
  return ordered.filter((project) =>
    project.categories.includes(filter as WorkCategory),
  );
}

export function getProject(slug: string): WorkProject | undefined {
  return workProjects.find((project) => project.slug === slug);
}

/**
 * Clients and collaborators.
 *
 * Named in the founder's biography. Listed as names only: no logo files have
 * been supplied, and a wordmark set in the site's own type is not a logo.
 */
export const clients = [
  "L'Oréal",
  "PreCEFI",
  "Prime Reach Productions",
  "Lusso Boutique Hotel",
  "Flow with Pride Impact Hub",
] as const;
