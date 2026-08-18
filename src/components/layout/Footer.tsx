import Image from "next/image";
import Link from "next/link";

import { contact, footerNav, principal, site } from "@/content/site";
import { resolveWordmark } from "@/lib/asset-exists";
import { ApertureMark } from "./Logo";

const YEAR = 2026;

export function Footer() {
  const wordmark = resolveWordmark();

  return (
    <footer className="relative border-t border-bone/10 bg-ink">
      <div className="container-wide py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="group/foot inline-flex items-center gap-3 text-bone transition-colors hover:text-brass"
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
                  <ApertureMark className="h-8 w-8 text-brass transition-transform duration-[var(--dur-slow)] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/foot:rotate-45" />
                  <span className="font-display text-2xl tracking-[0.06em]">
                    SAGEVIEW
                  </span>
                </>
              )}
            </Link>

            <p className="mt-6 max-w-sm font-display text-h4 leading-tight text-bone/90">
              {site.taglineLower}
            </p>

            <p className="mt-6 max-w-sm text-body-sm leading-relaxed text-mist">
              {site.name} — a strategic creative company specialising in
              documentary filmmaking, high-impact brand storytelling and visual
              communication.
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
                <h2 className="eyebrow-muted">Company</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {footerNav.company.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Connect */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow-muted">Connect</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-body-sm break-all text-fog transition-colors duration-200 hover:text-brass"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="text-body-sm text-fog transition-colors duration-200 hover:text-brass"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-fog transition-colors duration-200 hover:text-brass"
                >
                  Instagram {contact.instagram}
                </a>
              </li>
            </ul>

            <p className="eyebrow-muted mt-8">Principal</p>
            <p className="mt-3 text-body-sm text-fog">{principal.name}</p>
            <p className="mt-1 text-micro leading-snug text-ash">
              {principal.role}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-micro text-ash">
            © {YEAR} {site.name}. All Rights Reserved.
          </p>
          <p className="eyebrow-muted">Framing the meaning</p>
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
      className="text-body-sm text-fog transition-colors duration-200 hover:text-brass"
    >
      {children}
    </Link>
  );
}
