import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/** Standard vertical rhythm wrapper. Every major band on the site uses it. */
export function Section({
  children,
  id,
  className,
  container = "editorial",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  container?: "editorial" | "wide" | "prose" | "none";
  as?: "section" | "div" | "footer" | "article";
  labelledBy?: string;
}) {
  const containerClass =
    container === "editorial"
      ? "container-editorial"
      : container === "wide"
        ? "container-wide"
        : container === "prose"
          ? "container-prose"
          : undefined;

  return (
    <Tag id={id} aria-labelledby={labelledBy} className={cn("section-y", className)}>
      {containerClass ? (
        <div className={containerClass}>{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

/** The mono "timecode" label that opens most sections. */
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
        className={cn("h-px w-8", muted ? "bg-ash/60" : "bg-brass/60")}
      />
      {children}
    </Tag>
  );
}

/**
 * Section opener: eyebrow, display heading, optional lead paragraph.
 * `id` is applied to the heading so sections can be labelled for screen
 * readers via `aria-labelledby`.
 */
export function SectionIntro({
  eyebrow,
  heading,
  headingId,
  lead,
  align = "left",
  level = 2,
  className,
  children,
}: {
  eyebrow?: string;
  heading: ReactNode;
  headingId?: string;
  lead?: ReactNode;
  align?: "left" | "center";
  level?: 1 | 2 | 3;
  className?: string;
  children?: ReactNode;
}) {
  const Heading = `h${level}` as "h1" | "h2" | "h3";
  const sizeClass =
    level === 1 ? "text-h1" : level === 2 ? "text-h2" : "text-h3";

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
        <Heading
          id={headingId}
          className={cn("font-display mt-6 text-balance", sizeClass)}
        >
          {heading}
        </Heading>
      </Reveal>

      {lead ? (
        <Reveal delay={160}>
          <div
            className={cn(
              "mt-6 max-w-2xl text-body-lg leading-relaxed text-fog",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </div>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}

/** A hairline rule that wipes in when scrolled into view. */
export function Rule({ className }: { className?: string }) {
  return (
    <Reveal variant="wipe">
      <hr className={cn("rule-hairline border-0", className)} />
    </Reveal>
  );
}
