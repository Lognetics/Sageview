import { existsSync } from "node:fs";
import { join } from "node:path";

import { brand } from "@/content/media";

/**
 * Does this file exist under `public/`?
 *
 * Server-only, and evaluated while the page is being prerendered — so a
 * section can simply not render when its artwork has not been supplied yet,
 * instead of shipping a broken image to a visitor.
 *
 * Use it for optional art. Do not use it for anything a page depends on.
 */
export function assetExists(publicPath: string): boolean {
  if (!publicPath.startsWith("/")) return false;
  return existsSync(join(process.cwd(), "public", publicPath.slice(1)));
}

/**
 * The brand wordmark, if its artwork has been supplied.
 *
 * Accepts SVG or PNG so the file can be dropped in either format without a
 * code change; SVG wins when both are present. Returns null when neither
 * exists, and the header then falls back to the typographic lockup.
 */
export function resolveWordmark(): {
  src: string;
  alt: string;
  width: number;
  height: number;
} | null {
  const { wordmark } = brand;

  for (const src of [wordmark.src, wordmark.src.replace(/\.svg$/, ".png")]) {
    if (assetExists(src)) return { ...wordmark, src };
  }

  return null;
}
