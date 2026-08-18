import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-3 font-sans font-medium tracking-[0.02em] whitespace-nowrap transition-all duration-[var(--dur-fast)] ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-brass text-void hover:bg-brass-bright active:bg-brass-deep active:text-bone",
  outline:
    "border border-bone/30 text-bone hover:border-brass hover:text-brass",
  ghost: "text-bone hover:text-brass",
};

const SIZE: Record<Size, string> = {
  // Every target clears 44px in height for comfortable touch use.
  md: "min-h-[2.875rem] px-6 text-body-sm",
  lg: "min-h-[3.375rem] px-8 text-body-sm sm:px-10",
};

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Appends the sliding arrow used on primary calls to action. */
  withArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  external = false,
  onClick,
}: SharedProps & {
  href: string;
  external?: boolean;
  /** Only usable from a Client Component (e.g. closing the mobile menu). */
  onClick?: () => void;
}) {
  const content = (
    <>
      {children}
      {withArrow ? <Arrow /> : null}
    </>
  );
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...props
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(BASE, VARIANT[variant], SIZE[size], className)}
      {...props}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 12"
      className="h-2.5 w-4 shrink-0 fill-none stroke-current stroke-[1.5] transition-transform duration-[var(--dur-fast)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/btn:translate-x-1"
    >
      <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
    </svg>
  );
}

/**
 * Editorial text link: an underline that wipes in from the left on hover.
 * Used wherever a full button would be too heavy for the layout.
 */
export function TextLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group/link inline-flex items-center gap-2.5 text-body-sm font-medium text-bone transition-colors duration-[var(--dur-fast)] hover:text-brass",
    className,
  );

  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/link:scale-x-100"
        />
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 12"
        className="h-2.5 w-4 shrink-0 fill-none stroke-current stroke-[1.5] transition-transform duration-[var(--dur-fast)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/link:translate-x-1"
      >
        <path d="M0 6h18M13 1l5 5-5 5" strokeLinecap="square" />
      </svg>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
