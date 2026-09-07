import Image from "next/image";
import Link from "next/link";

import { Section, SectionIntro } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { workProjects } from "@/content/work";

/**
 * Selected work on the homepage.
 *
 * The first six projects only: the homepage is a trailer for the work index,
 * not a second copy of it. The first tile runs full width because a studio's
 * best piece should not be one of six equal thumbnails.
 */
export function SelectedWork() {
  const projects = [...workProjects].sort((a, b) => a.order - b.order).slice(0, 5);
  const [lead, ...rest] = projects;

  if (!lead) return null;

  return (
    <Section id="selected-work" labelledBy="selected-work-heading" container="wide">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionIntro
          eyebrow="Selected Work"
          headingId="selected-work-heading"
          heading="Recent"
          accent="projects."
        />
        <Reveal delay={120}>
          <Link
            href="/work"
            className="font-mono text-[0.68rem] tracking-[0.18em] text-[var(--text-strong)] uppercase underline underline-offset-8 hover:text-[var(--accent)]"
          >
            View All Work
          </Link>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <Link href={`/work/${lead.slug}`} className="group mt-14 block">
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-sunken)]">
            <Image
              src={lead.image.src}
              alt={lead.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="display-soft text-h2">{lead.title}</h3>
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-[var(--text-faint)] uppercase">
              {lead.categories.join(" / ")}
            </p>
          </div>
          <p className="mt-3 max-w-xl text-body-lg text-[var(--text-body-color)]">
            {lead.summary}
          </p>
        </Link>
      </Reveal>

      <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2">
        {rest.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 60}>
            <Link href={`/work/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="display-soft mt-5 text-h3">{project.title}</h3>
              <p className="mt-2 text-body text-[var(--text-body-color)]">
                {project.summary}
              </p>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
