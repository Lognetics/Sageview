import { cn } from "@/lib/cn";
import { contact } from "@/content/site";

/**
 * Contact marks.
 *
 * Inline SVG rather than an icon package: three glyphs do not justify a
 * dependency, and inlining means they inherit `currentColor` and so invert
 * with whichever band they sit in, with no second network request.
 *
 * Each is `aria-hidden`, because the glyph is decoration: the accessible name
 * comes from the link's own label, which is why every link below carries one.
 */

type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-[1.15em]", className)}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-[1.15em]", className)}
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 7.6 5.4a2.4 2.4 0 0 0 2.8 0L21 7" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-[1.15em]", className)}
    >
      <path d="M6.3 3.5h3l1.5 3.8-2 1.4a12.5 12.5 0 0 0 5.5 5.5l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.3 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

/**
 * The contact row.
 *
 * `labelled` shows the handle or number beside the mark; without it the row is
 * glyphs only, for places like the footer bar where space is tight. Either
 * way each link keeps a real accessible name.
 */
export function ContactLinks({
  className,
  labelled = false,
  iconClassName,
}: {
  className?: string;
  labelled?: boolean;
  iconClassName?: string;
}) {
  const items = [
    {
      key: "instagram",
      href: contact.instagramUrl,
      label: `Instagram, ${contact.instagram}`,
      text: contact.instagram,
      Icon: InstagramIcon,
      external: true,
    },
    {
      key: "email",
      href: `mailto:${contact.email}`,
      label: `Email, ${contact.email}`,
      text: contact.email,
      Icon: MailIcon,
      external: false,
    },
    {
      key: "phone",
      href: `tel:${contact.phoneHref}`,
      label: `Phone, ${contact.phone}`,
      text: contact.phone,
      Icon: PhoneIcon,
      external: false,
    },
  ];

  return (
    <ul
      className={cn(
        "flex items-center",
        labelled ? "flex-col items-start gap-3" : "gap-5",
        className,
      )}
    >
      {items.map(({ key, href, label, text, Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={labelled ? undefined : label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "inline-flex items-center gap-3 text-[var(--text-muted)]",
              "transition-colors duration-[var(--dur-fast)] hover:text-[var(--accent)]",
              labelled ? "text-body-sm" : "p-1",
            )}
          >
            <Icon className={iconClassName} />
            {labelled ? <span className="break-all">{text}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
