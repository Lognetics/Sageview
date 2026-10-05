import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import type { Media } from "@/content/media";
import type { WorkProject } from "@/content/work";

/**
 * The photo essay, read from disk at build time.
 *
 * Deliberately not a hand-written list. A photo essay is a set of frames that
 * grows and gets re-cut, and maintaining a parallel list in TypeScript means
 * every change needs a code edit. Instead the directory is the source of
 * truth: drop images into `public/media/photo-essay/`, rebuild, and they
 * appear in order.
 *
 * Server-only. It reads the filesystem, so it can only be called from a server
 * component, which is why the work pages assemble the project list and pass it
 * down rather than letting the client grid import it.
 *
 * Ordering is by filename, so prefixing with numbers controls the sequence:
 *   01-arrival.jpg, 02-the-walk.jpg, 03-dusk.jpg
 * That matters more here than anywhere else on the site, because the order of
 * an essay is the argument it makes.
 *
 * An optional `essay.json` beside the frames carries the title, summary and a
 * caption per file. Captions derived from filenames are a floor, not a
 * target: a photograph of a boy walking to school barefoot deserves to be
 * described as that rather than as "the walk". Where the file is absent, or a
 * frame is missing from it, the filename is still used, so the folder keeps
 * working on its own.
 */

type EssayMeta = {
  title?: string;
  summary?: string;
  credit?: string;
  captions?: Record<string, string>;
};

function readMeta(dir: string): EssayMeta {
  const file = join(dir, "essay.json");
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, "utf8")) as EssayMeta;
  } catch {
    // A malformed sidecar should cost the captions, never the essay.
    return {};
  }
}

const DIR = "media/photo-essay";

/** Image extensions worth rendering. Everything else in the folder is ignored. */
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Turns `03-the-long-walk-home.jpg` into "The long walk home".
 *
 * Alt text generated from a filename is a poor substitute for alt text written
 * by the photographer, so this is a floor rather than a target: name the files
 * descriptively and the gallery describes itself. Where a filename carries no
 * meaning, the caption falls back to the essay's own title rather than
 * inventing a description of a photograph nobody has described.
 */
function describe(filename: string, index: number): string {
  const stem = filename
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_\s]*/, "")
    .replace(/[-_]+/g, " ")
    .trim();

  if (!stem) return `Photo essay, frame ${index + 1}.`;
  return stem.charAt(0).toUpperCase() + stem.slice(1) + ".";
}

/** Every frame in the essay folder, in filename order. Empty when unsupplied. */
export function photoEssayFrames(): Media[] {
  const dir = join(process.cwd(), "public", DIR);
  if (!existsSync(dir)) return [];
  const { captions = {} } = readMeta(dir);

  return readdirSync(dir)
    .filter((name) => {
      if (name.startsWith(".")) return false;
      const dot = name.lastIndexOf(".");
      return dot > 0 && EXTENSIONS.has(name.slice(dot).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((name, index) => ({
      src: `/${DIR}/${name}`,
      alt: captions[name] ?? describe(name, index),
    }));
}

/**
 * The essay as a work project, or null when no frames have been supplied.
 *
 * Returning null rather than an empty project is the point: an essay with no
 * photographs in it should not appear in the index as a card with a hole where
 * the picture goes.
 */
export function photoEssayProject(): WorkProject | null {
  const frames = photoEssayFrames();
  if (frames.length === 0) return null;

  const meta = readMeta(join(process.cwd(), "public", DIR));
  const [cover, ...rest] = frames;

  return {
    slug: "photo-essay",
    title: meta.title ?? "Photo Essay",
    summary:
      meta.summary ??
      "A sequence of frames read in order, where the story is carried by the photographs rather than by a film.",
    categories: ["photography", "photo-essay", "documentary"],
    image: cover,
    gallery: rest,
    /* The frames are portrait slides with their own type set into them, so
       they are shown whole rather than cropped to the landscape the rest of
       the index uses. Cropping these would cut the words off the picture. */
    frameAspect: "4/5",
    fit: "contain",
    meta: [
      { label: "Discipline", value: "Documentary photography" },
      { label: "Frames", value: String(frames.length) },
      ...(meta.credit ? [{ label: "Credit", value: meta.credit }] : []),
    ],
    order: 0,
  };
}
