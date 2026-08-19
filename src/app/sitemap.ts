import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Sitemap.
 *
 * Generated from the content layer, so adding a service or case study puts it
 * in the sitemap automatically: there is no second list to forget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "yearly" },
    { path: "/vision", priority: 0.9, changeFrequency: "yearly" },
    { path: "/services", priority: 0.9, changeFrequency: "yearly" },
    { path: "/process", priority: 0.8, changeFrequency: "yearly" },
    { path: "/case-studies", priority: 0.9, changeFrequency: "monthly" },
    { path: "/deliverables", priority: 0.8, changeFrequency: "yearly" },
    { path: "/philosophy", priority: 0.8, changeFrequency: "yearly" },
    { path: "/network", priority: 0.7, changeFrequency: "yearly" },
    { path: "/why-sageview", priority: 0.7, changeFrequency: "yearly" },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  ];

  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: url(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...caseStudies.map((study) => ({
      url: url(`/case-studies/${study.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
