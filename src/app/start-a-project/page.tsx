import type { Metadata } from "next";

import { Section } from "@/components/primitives/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { contactCopy } from "@/content/contact";
import { contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Start a Project",
  description:
    "Tell SageView Production Ltd what you are building: film, photography, visual communication or live production.",
  path: "/start-a-project",
});

export default function StartAProjectPage() {
  return (
    <>
      <PageHeader
        eyebrow={contactCopy.eyebrow}
        heading="Tell us what"
        accent="you're building."
        lead={contactCopy.body}
      />

      <Section container="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <p className="text-body-lg leading-relaxed text-[var(--text-body-color)]">
              {contactCopy.formIntro}
            </p>

            <dl className="mt-12 space-y-8">
              <div>
                <dt className="eyebrow-muted">Projects</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${contact.projectEmail}`}
                    className="text-body text-[var(--text-strong)] underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {contact.projectEmail}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow-muted">General</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-body text-[var(--text-strong)] underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow-muted">Phone</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${contact.phoneHref}`}
                    className="text-body text-[var(--text-strong)] underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="eyebrow-muted">Instagram</dt>
                <dd className="mt-3">
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-body text-[var(--text-strong)] underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {contact.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
