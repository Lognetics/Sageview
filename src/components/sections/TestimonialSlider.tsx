"use client";

import { useCallback, useState } from "react";

import { cn } from "@/lib/cn";
import { quotedTestimonials, testimonials } from "@/content/testimonials";

/**
 * Testimonials.
 *
 * Only the words supplied by the clients are shown; nothing is paraphrased or
 * added. Two people gave quotes, and a third is credited without one, so the
 * quoted pair rotate here and the full credit list sits beneath.
 *
 * Deliberately manual: no autoplay. An auto-advancing quote steals reading
 * time from the very content it is meant to showcase, and creates an
 * accessibility problem that then needs a pause button to solve.
 */
export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const count = quotedTestimonials.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  // Left/right arrows move between quotes when the slider has focus.
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        onKeyDown={onKeyDown}
        className="relative"
      >
        {quotedTestimonials.map((testimonial, testimonialIndex) => (
          <figure
            key={testimonial.id}
            aria-hidden={testimonialIndex !== index}
            inert={testimonialIndex !== index}
            className={cn(
              "transition-opacity duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
              testimonialIndex === index
                ? "opacity-100"
                : "pointer-events-none absolute inset-0 opacity-0",
            )}
          >
            <span
              aria-hidden="true"
              className="font-display block text-[6rem] leading-[0.6] text-brass/30 sm:text-[9rem]"
            >
              &ldquo;
            </span>

            <blockquote className="mt-2">
              <p className="font-display text-h2 leading-[1.15] text-paper">
                {testimonial.quote}
              </p>
            </blockquote>

            <figcaption className="mt-10 border-t border-bone/15 pt-6">
              <p className="font-display text-h4 text-brass">
                {testimonial.name}
              </p>
              <p className="mt-2 text-body-sm text-fog">
                {testimonial.role}, {testimonial.organization}
              </p>
              {testimonial.project ? (
                <p className="eyebrow-muted mt-4">
                  Project, {testimonial.project}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center gap-6">
        <div className="flex gap-2">
          <SliderButton
            label="Previous testimonial"
            onClick={() => go(index - 1)}
            direction="prev"
          />
          <SliderButton
            label="Next testimonial"
            onClick={() => go(index + 1)}
            direction="next"
          />
        </div>

        <ul className="flex items-center gap-2">
          {quotedTestimonials.map((testimonial, dotIndex) => (
            <li key={testimonial.id}>
              <button
                type="button"
                onClick={() => go(dotIndex)}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={dotIndex === index}
                className="group flex h-8 w-8 cursor-pointer items-center justify-center"
              >
                <span
                  className={cn(
                    "h-px transition-all duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    dotIndex === index
                      ? "w-8 bg-brass"
                      : "w-4 bg-ash group-hover:w-6 group-hover:bg-bone",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <p className="index-numeral ml-auto text-[0.6875rem] text-ash">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </p>
      </div>

      {/* Everyone credited in the portfolio, quoted or not. */}
      <div className="mt-16 border-t border-bone/15 pt-8">
        <p className="eyebrow-muted">Voices</p>
        <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-3">
          {testimonials.map((person) => (
            <li key={person.id}>
              <p className="text-body-sm text-bone">{person.name}</p>
              <p className="mt-1.5 text-micro leading-snug text-ash">
                {person.role}
              </p>
              <p className="mt-1 text-micro leading-snug text-ash">
                {person.organization}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SliderButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex h-12 w-12 cursor-pointer items-center justify-center border border-bone/20 text-bone transition-colors duration-[var(--dur-fast)] hover:border-brass hover:text-brass"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 12"
        className={cn(
          "h-2.5 w-4 fill-none stroke-current stroke-[1.5] transition-transform duration-[var(--dur-fast)] ease-[cubic-bezier(0.22,1,0.36,1)]",
          direction === "prev"
            ? "rotate-180 motion-safe:group-hover:-translate-x-1"
            : "motion-safe:group-hover:translate-x-1",
        )}
      >
        <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
      </svg>
    </button>
  );
}
