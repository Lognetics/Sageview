import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { workProjects } from "@/content/work";

/**
 * Sitemap.
 *
 * Five destinations plus one entry per project. The service disciplines are
 * sections of a single page rather than pages of their own, so they are not
 * listed separately: a sitemap of fragments would claim pages that do not
 * exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const pages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url("/work"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/services"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    {
      url: url("/start-a-project"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];

  const projects: MetadataRoute.Sitemap = workProjects.map((project) => ({
    url: url(`/work/${project.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
