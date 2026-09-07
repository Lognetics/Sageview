import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { photo } from "@/content/media";
import { whoWeAre } from "@/content/about";

/** Short introduction and one image, pointing at the About page. */
export function AboutTeaser() {
  return (
    <Section
      id="about"
      labelledBy="about-teaser-heading"
      container="wide"
      tone="light"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionIntro
            eyebrow="About SageView"
            headingId="about-teaser-heading"
            heading="A studio built"
            accent="around the story."
          />

          <div className="mt-8 max-w-xl space-y-5">
            {whoWeAre.body.slice(0, 2).map((paragraph) => (
              <p
                key={paragraph}
                className="text-body-lg leading-relaxed text-[var(--text-body-color)]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Reveal delay={140}>
            <Link
              href="/about"
              className="mt-10 inline-block font-mono text-[0.68rem] tracking-[0.18em] text-[var(--text-strong)] uppercase underline underline-offset-8 hover:text-[var(--accent)]"
            >
              About Us
            </Link>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-sunken)]">
            <Image
              src={photo.crewFilming.src}
              alt={photo.crewFilming.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
