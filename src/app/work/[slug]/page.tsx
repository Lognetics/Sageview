import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/primitives/Section";
import { VideoFrame } from "@/components/primitives/VideoFrame";
import { StartCTA } from "@/components/sections/StartCTA";
import { getProject, workProjects } from "@/content/work";
import { photoEssayProject } from "@/lib/photo-essay";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const slugs = workProjects.map((project) => ({ slug: project.slug }));
  return photoEssayProject() ? [...slugs, { slug: "photo-essay" }] : slugs;
}

/** The static projects plus the essay, which only exists once it has frames. */
function resolve(slug: string) {
  if (slug === "photo-essay") return photoEssayProject() ?? undefined;
  return getProject(slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = resolve(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
    ogImage: project.image.src,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = resolve(slug);
  if (!project) notFound();

  return (
    <>
      <Section container="wide" className="pt-32 md:pt-40">
        <Link
          href="/work"
          className="font-mono text-[0.65rem] tracking-[0.18em] text-[var(--text-muted)] uppercase hover:text-[var(--text-strong)]"
        >
          &larr; All Work
        </Link>

        <h1 className="display mt-8 max-w-4xl text-h1">{project.title}</h1>
        <p className="mt-6 max-w-xl text-lead text-[var(--text-body-color)]">
          {project.summary}
        </p>

        {project.meta ? (
          <dl className="mt-12 grid gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {project.meta.map((entry) => (
              <div key={entry.label}>
                <dt className="eyebrow-muted">{entry.label}</dt>
                <dd className="mt-3 text-body text-[var(--text-strong)]">
                  {entry.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Section>

      <Section container="wide" className="pt-0">
        {project.video ? (
          <VideoFrame
            src={project.video.src}
            poster={project.video.poster}
            alt={project.video.alt}
            caption={`${project.title}: press play to watch`}
          />
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-sunken)]">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
      </Section>

      {project.gallery?.length ? (
        <Section container="wide" className="pt-0">
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((frame, index) => (
              <li
                key={frame.src}
                /* A photo essay reads better when the frames are not all the
                   same size: every third runs full width. */
                className={index % 3 === 2 ? "sm:col-span-2" : undefined}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--surface-sunken)]">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes={index % 3 === 2 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.body ? (
        <Section container="prose" className="pt-0">
          <div className="space-y-6">
            {project.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-body-lg leading-relaxed text-[var(--text-body-color)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      ) : null}

      <StartCTA />
    </>
  );
}
