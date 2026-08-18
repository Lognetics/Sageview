"use client";

import { useEffect } from "react";

import { Button, ButtonLink } from "@/components/primitives/Button";
import { contact } from "@/content/site";

/**
 * Runtime error boundary.
 *
 * The visitor gets a plain explanation and two ways forward. The raw error is
 * sent to the console for the operator only — never rendered, since a stack
 * trace on screen is exactly the "raw browser error" this site should never
 * expose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[sageview] unhandled error:", error);
  }, [error]);

  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(90%_100%_at_30%_0%,#1a1e20_0%,#0a0c0d_55%,#050607_100%)]"
      />

      <div className="container-wide">
        <p className="eyebrow flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-10 bg-brass/60" />
          Something went wrong
        </p>

        <h1 className="font-display mt-8 max-w-3xl text-h1 text-paper">
          We dropped a frame.
        </h1>

        <p className="mt-7 max-w-xl text-body-lg leading-relaxed text-fog">
          Something on our side failed to load. Trying again usually fixes it —
          and if it doesn&rsquo;t, we would genuinely like to know.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button size="lg" onClick={reset} withArrow>
            Try again
          </Button>
          <ButtonLink href="/" size="lg" variant="outline">
            Back to the homepage
          </ButtonLink>
        </div>

        <p className="mt-12 text-body-sm text-mist">
          Still stuck? Email{" "}
          <a
            href={`mailto:${contact.email}`}
            className="text-brass underline underline-offset-4"
          >
            {contact.email}
          </a>
          {error.digest ? (
            <>
              {" "}
              and quote reference{" "}
              <span className="index-numeral text-fog">{error.digest}</span>
            </>
          ) : null}
          .
        </p>
      </div>
    </section>
  );
}
