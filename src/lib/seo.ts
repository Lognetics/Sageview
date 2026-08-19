import type { Metadata } from "next";

import { site } from "@/content/site";

type PageMetaInput = {
  /** Page title without the brand suffix, e.g. "About". Omit for the homepage. */
  title?: string;
  description: string;
  /** Path with a leading slash, e.g. "/about". */
  path: string;
  /** Overrides the generated Open Graph image. */
  ogImage?: string;
  type?: "website" | "article";
};

/**
 * Builds the full Metadata object for a page: canonical URL, Open Graph and
 * Twitter/X cards, all derived from one small input.
 *
 * Title architecture: "SageView | About", with the homepage using the full
 * SEO title on its own.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  type = "website",
}: PageMetaInput): Metadata {
  // The root layout already applies the "SageView, %s" template, so the page
  // title is passed bare. The homepage opts out of the template with
  // `absolute`, and `fullTitle` is built here for the social cards, which get
  // no template applied to them.
  const fullTitle = title ? `${site.shortName}, ${title}` : site.seoTitle;
  const url = new URL(path, site.url).toString();

  return {
    title: title ?? { absolute: site.seoTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_NG",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/**
 * Organization structured data. Only facts present in the approved portfolio
 * are emitted, no founding date, address, headcount or rating is asserted.
 */
export function organizationJsonLd(contact: {
  email: string;
  phone: string;
  instagramUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    slogan: site.tagline,
    description: site.seoDescription,
    email: contact.email,
    telephone: contact.phone,
    sameAs: [contact.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "New projects",
        email: contact.email,
        telephone: contact.phone,
        availableLanguage: ["English"],
      },
    ],
  };
}
