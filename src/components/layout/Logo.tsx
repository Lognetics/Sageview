import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/content/site";

export type Wordmark = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * Lens-aperture mark.
 *
 * A six-blade iris: the instrument of the company's name ("view") reduced to
 * its simplest geometry. Drawn inline so it inherits colour and costs no
 * request.
 *
 * Still used as the compact mark, favicon, the hub of the network diagram,
 * and the footer, where the full horizontal wordmark would be unreadable.
 */
export function ApertureMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
    >
      <circle
        cx="16"
        cy="16"
        r="14.25"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.55"
      />
      <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="square">
        <path d="M16 2.5 24.5 9" />
        <path d="M29.2 20.5 19 22.8" />
        <path d="M20.3 30.2 15.8 20.9" />
        <path d="M7.5 29 13.2 20.4" />
        <path d="M2.4 18.2 12.9 16.4" />
        <path d="M4.6 6.3 14.6 11" />
      </g>
      <circle cx="16" cy="16" r="4.4" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/**
 * The site logo.
 *
 * Renders the official SageView wordmark when the artwork is present, and the
 * typographic lockup otherwise. Which one applies is decided once, on the
 * server (see `assetExists`), and passed down: the header is a Client
 * Component and cannot touch the filesystem itself.
 *
 * The wordmark is a wide horizontal lockup, so it is sized by height and left
 * free in width; the "Production Ltd" subline is dropped when it is in use,
 * because the artwork already carries the name.
 */
export function Logo({
  className,
  onNavigate,
  showSubline = true,
  /** Resolved on the server; null when the artwork has not been supplied. */
  wordmark = null,
  compact = false,
}: {
  className?: string;
  onNavigate?: () => void;
  showSubline?: boolean;
  wordmark?: Wordmark | null;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${site.name}, home`}
      className={cn(
        "group/logo flex items-center text-bone transition-colors duration-[var(--dur-fast)] hover:text-brass",
        wordmark ? "gap-0" : "gap-3",
        className,
      )}
    >
      {wordmark ? (
        <Image
          src={wordmark.src}
          alt={wordmark.alt}
          width={wordmark.width}
          height={wordmark.height}
          priority
          className={cn(
            "w-auto transition-opacity duration-[var(--dur-fast)] group-hover/logo:opacity-85",
            compact ? "h-[1.35rem] sm:h-6" : "h-6 sm:h-7",
          )}
        />
      ) : (
        <>
          <ApertureMark className="h-7 w-7 text-brass transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/logo:rotate-45 sm:h-8 sm:w-8" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] tracking-[0.06em] sm:text-[1.5rem]">
              SAGEVIEW
            </span>
            {showSubline ? (
              <span className="eyebrow-muted mt-1 hidden text-[0.5625rem] tracking-[0.3em] sm:block">
                Production Ltd
              </span>
            ) : null}
          </span>
        </>
      )}
    </Link>
  );
}
