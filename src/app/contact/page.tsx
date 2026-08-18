import type { Metadata } from "next";

import { Reveal } from "@/components/primitives/Reveal";
import { Section, SectionIntro } from "@/components/primitives/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { WorkflowTimeline } from "@/components/sections/WorkflowTimeline";
import { contactCopy } from "@/content/contact";
import { contact, principal } from "@/content/site";
import { photo } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with SageView Production Ltd. Email hellosageviewproductions@gmail.com or send a project brief through the enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactCopy.eyebrow}
        title={
          <>
            Let&rsquo;s build
            <span className="block text-brass italic">something powerful.</span>
          </>
        }
        lead={contactCopy.body}
      image={photo.youngVendor}
      />

      <Section labelledBy="enquiry-heading" container="wide">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Direct details */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow">Direct</p>

                <dl className="mt-8 border-t border-bone/15">
                  <div className="border-b border-bone/10 py-5">
                    <dt className="eyebrow-muted">Email</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-body-sm break-all text-bone transition-colors hover:text-brass"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>

                  <div className="border-b border-bone/10 py-5">
                    <dt className="eyebrow-muted">Phone</dt>
                    <dd className="mt-2.5">
                      <a
                        href={`tel:${contact.phoneHref}`}
                        className="text-body-sm text-bone transition-colors hover:text-brass"
                      >
                        {contact.phone}
                      </a>
                    </dd>
                  </div>

                  <div className="border-b border-bone/10 py-5">
                    <dt className="eyebrow-muted">Instagram</dt>
                    <dd className="mt-2.5">
                      <a
                        href={contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body-sm text-bone transition-colors hover:text-brass"
                      >
                        {contact.instagram}
                      </a>
                    </dd>
                  </div>

                  <div className="py-5">
                    <dt className="eyebrow-muted">Principal</dt>
                    <dd className="mt-2.5 text-body-sm text-bone">
                      {principal.name}
                    </dd>
                    <dd className="mt-1 text-micro leading-snug text-ash">
                      {principal.role}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-8">
            <SectionIntro
              eyebrow="Project Enquiry"
              headingId="enquiry-heading"
              heading={
                <>
                  Tell us what the story
                  <span className="text-brass italic"> has to achieve.</span>
                </>
              }
              lead={contactCopy.formIntro}
            />

            <Reveal delay={160}>
              <div className="mt-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section
        labelledBy="contact-workflow-heading"
        container="wide"
        className="border-t border-bone/10 bg-ink"
      >
        <SectionIntro
          eyebrow="What Happens Next"
          headingId="contact-workflow-heading"
          heading={
            <>
              Three steps
              <span className="text-brass italic"> from here.</span>
            </>
          }
        />

        <div className="mt-16">
          <WorkflowTimeline />
        </div>
      </Section>
    </>
  );
}

