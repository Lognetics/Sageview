import Image from "next/image";
import Link from "next/link";

import { ContactLinks } from "@/components/primitives/ContactIcons";
import { footerNav, principal, site } from "@/content/site";
import { resolveWordmark } from "@/lib/asset-exists";
import { ApertureMark } from "./Logo";

const YEAR = 2026;

/**
 * Site footer.
 *
 * Four columns on desktop: the mark and what the company is, two link
 * columns, then the direct contacts. Those contacts are marks rather than the
 * word "Instagram" spelled out, which keeps the column scannable and reads
 * the way a contact row is expected to.
 */
export function Footer() {
  const wordmark = resolveWordmark();

  return (
    <footer className="border-t bg-[var(--surface-sunken)]">
      <div className="container-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${site.name}, home`}
              className="group/foot inline-flex items-center gap-3 text-[var(--text-strong)] transition-colors hover:text-[var(--accent)]"
            >
              {wordmark ? (
                <Image
                  src={wordmark.src}
                  alt={wordmark.alt}
                  width={wordmark.width}
                  height={wordmark.height}
                  className="h-7 w-auto transition-opacity group-hover/foot:opacity-85 sm:h-8"
                />
              ) : (
                <>
                  <ApertureMark className="h-8 w-8 text-[var(--accent)] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] motion-safe:group-hover/foot:rotate-45" />
                  <span className="display-caps text-2xl">SAGEVIEW</span>
                </>
              )}
            </Link>

            <p className="display mt-7 max-w-sm text-h4">{site.taglineLower}</p>

            <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-[var(--text-muted)]">
              {site.description}
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="eyebrow-muted">Explore</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {footerNav.explore.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="eyebrow-muted">Services</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {footerNav.services.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Direct */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow-muted">Connect</h2>
            <ContactLinks labelled className="mt-5" />

            <p className="eyebrow-muted mt-10">Principal</p>
            <p className="mt-3 text-body-sm text-[var(--text-strong)]">
              {principal.name}
            </p>
            <p className="mt-1 text-micro leading-snug text-[var(--text-faint)]">
              {principal.role}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-[var(--text-faint)]">
            © {YEAR} {site.name}. All rights reserved.
          </p>
          <ContactLinks />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-body-sm text-[var(--text-muted)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--text-strong)]"
    >
      {children}
    </Link>
  );
}
