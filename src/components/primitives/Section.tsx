import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * Standard band wrapper. Every major section on the site uses it.
 *
 * `tone` picks the ground. The site lives on black, so `dark` is the default
 * and `light` is the exception: it sets `band-light`, which re-points the
 * semantic colour tokens for everything inside, so children never need to know
 * which ground they are sitting on.
 */
export function Section({
  children,
  id,
  className,
  container = "editorial",
  as: Tag = "section",
  labelledBy,
  tone = "dark",
  flush = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  container?: "editorial" | "wide" | "prose" | "none";
  as?: "section" | "div" | "footer" | "article";
  labelledBy?: string;
  tone?: "dark" | "raised" | "sunken" | "light";
  /** Drop the vertical rhythm, for bands that manage their own height. */
  flush?: boolean;
}) {
  const containerClass =
    container === "editorial"
      ? "container-editorial"
      : container === "wide"
        ? "container-wide"
        : container === "prose"
          ? "container-prose"
          : undefined;

  const toneClass =
    tone === "light"
      ? "band-light"
      : tone === "raised"
        ? "bg-[var(--surface-raised)]"
        : tone === "sunken"
          ? "bg-[var(--surface-sunken)]"
          : "bg-[var(--surface)]";

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(!flush && "section-y", toneClass, className)}
    >
      {containerClass ? (
        <div className={containerClass}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

/** The mono label that opens most sections, with its leading rule. */
export function Eyebrow({
  children,
  className,
  muted = false,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        muted ? "eyebrow-muted" : "eyebrow",
        "flex items-center gap-3",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          muted ? "bg-[var(--text-faint)]" : "bg-[var(--accent)]",
        )}
      />
      {children}
    </Tag>
  );
}

/**
 * Section opener: eyebrow, display heading, optional lead.
 *
 * The heading takes a second, lighter-weight line through `accent`, which is
 * how nearly every section in this design is titled: one hard statement, then
 * a softer completion of the sentence.
 */
export function SectionIntro({
  eyebrow,
  heading,
  accent,
  headingId,
  lead,
  align = "left",
  level = 2,
  size = "h2",
  className,
  children,
}: {
  eyebrow?: string;
  heading: ReactNode;
  accent?: ReactNode;
  headingId?: string;
  lead?: ReactNode;
  align?: "left" | "center";
  level?: 1 | 2 | 3;
  size?: "h1" | "h2" | "h3" | "display";
  className?: string;
  children?: ReactNode;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  const sizeClass =
    size === "display"
      ? "text-display"
      : size === "h1"
        ? "text-h1"
        : size === "h2"
          ? "text-h2"
          : "text-h3";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow className={cn(align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={80}>
        <Heading id={headingId} className={cn("display mt-6", sizeClass)}>
          {heading}
          {accent ? (
            <span className="block text-[var(--text-faint)]">{accent}</span>
          ) : null}
        </Heading>
      </Reveal>

      {lead ? (
        <Reveal delay={140}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-body-lg leading-relaxed text-[var(--text-body-color)]",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
