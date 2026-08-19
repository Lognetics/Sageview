import type { Metadata } from "next";

import { ButtonLink } from "@/components/primitives/Button";
import { footerNav } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Styled as a missing slate rather than a browser error, and it always offers
 * a route onward, a dead end on a site whose whole argument is "we finish
 * things" would be the wrong note.
 */
export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_100%_at_30%_0%,#1a1e20_0%,#0a0c0d_55%,#050607_100%)]"
      />

      <div className="container-wide">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
          Error 404
        </p>

        <h1 className="font-display mt-8 max-w-3xl text-h1 text-paper">
          This frame doesn&rsquo;t exist.
          <span className="block text-brass italic">
            The rest of the film does.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-body-lg leading-relaxed text-fog">
          The page you were looking for has moved or was never here. Everything
          else is one click away.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/" size="lg" withArrow>
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="outline">
            Start a project
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-16 border-t border-bone/10 pt-8">
          <p className="eyebrow-muted">Or try</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {[...footerNav.explore, ...footerNav.company].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body-sm text-fog transition-colors hover:text-brass"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
