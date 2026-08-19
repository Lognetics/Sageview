/**
 * CONTACT
 *
 * Page copy plus the enquiry-form field configuration.
 *
 * Select options below are UX affordances for qualifying an enquiry: they are
 * not statements about pricing, turnaround or company policy.
 */

export const contactCopy = {
  eyebrow: "Contact",
  headline: "Let's build something powerful",
  body: "Tell us what the story has to achieve. We'll come back with a point of view, not a price list.",
  formIntro:
    "The more context you give us, the more useful our first reply will be.",
} as const;

export const projectTypes = [
  "Impact / NGO documentary",
  "Brand film",
  "Field & institutional reporting",
  "Visual communication strategy",
  "Live production & technical broadcast",
  "Post-production & editorial",
  "Campaign / multi-asset package",
  "Something else",
] as const;

export const timelines = [
  "Urgent: within 4 weeks",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Still scoping",
] as const;

export const budgetBands = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Prefer to discuss",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type Timeline = (typeof timelines)[number];
export type BudgetBand = (typeof budgetBands)[number];
