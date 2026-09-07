/**
 * START A PROJECT
 *
 * Page copy plus the enquiry-form field configuration.
 *
 * The project types mirror the four service disciplines exactly, so an
 * enquiry arrives already sorted into the way the studio is organised. Select
 * options are affordances for qualifying an enquiry: they are not statements
 * about pricing, turnaround or company policy.
 */

export const contactCopy = {
  eyebrow: "Start a Project",
  headline: "Tell us what you're building.",
  body: "The more context you give us, the more useful our first reply will be. We come back with a point of view, not a price list.",
  formIntro: "Everything except the brief upload is quick to fill in.",
} as const;

export const projectTypes = [
  "Film",
  "Photography",
  "Visual Communication",
  "Live Production",
  "Something else",
] as const;

export const timelines = [
  "Urgent: within 4 weeks",
  "1-3 months",
  "3-6 months",
  "6+ months",
  "Still scoping",
] as const;

export const budgetBands = [
  "Under $5,000",
  "$5,000 to $15,000",
  "$15,000 to $50,000",
  "$50,000+",
  "Prefer to discuss",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type Timeline = (typeof timelines)[number];
export type BudgetBand = (typeof budgetBands)[number];

/**
 * Brief upload limit.
 *
 * The file is carried inside the enquiry payload rather than stored, so this
 * ceiling is about what a delivery webhook will accept, not about disk. Keep
 * it modest: anything larger belongs in an email.
 */
export const MAX_BRIEF_BYTES = 4 * 1024 * 1024;
export const BRIEF_ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf,.md";
