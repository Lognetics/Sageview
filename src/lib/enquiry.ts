/**
 * Project enquiry: shape, validation and normalisation.
 *
 * Shared by the form component and the API route so the browser and the server
 * enforce identical rules, client-side validation is a convenience, never the
 * gate.
 */

import {
  budgetBands,
  MAX_BRIEF_BYTES,
  projectTypes,
  timelines,
} from "@/content/contact";

/**
 * An uploaded brief, carried inside the enquiry rather than stored.
 *
 * `data` is base64 and is what makes the size ceiling matter: it inflates the
 * payload by roughly a third, and a delivery webhook has to accept the whole
 * thing in one request.
 */
export type BriefUpload = {
  name: string;
  type: string;
  size: number;
  data: string;
};

export type EnquiryValues = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  message: string;
  /** Optional brief document. Absent for most enquiries. */
  brief: BriefUpload | null;
  /** Honeypot. Real people never fill this in; bots usually do. */
  website: string;
};

export const emptyEnquiry: EnquiryValues = {
  fullName: "",
  organization: "",
  email: "",
  phone: "",
  projectType: "",
  projectDescription: "",
  timeline: "",
  budget: "",
  message: "",
  brief: null,
  website: "",
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

/** Pragmatic address check: structure only, never a claim of deliverability. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MAX = {
  fullName: 120,
  organization: 160,
  email: 254,
  phone: 40,
  projectDescription: 4000,
  message: 4000,
} as const;

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const description = values.projectDescription.trim();

  if (fullName.length < 2) {
    errors.fullName = "Please tell us your name.";
  } else if (fullName.length > MAX.fullName) {
    errors.fullName = "That name is longer than we can store.";
  }

  if (!email) {
    errors.email = "We need an email address to reply to.";
  } else if (!EMAIL_PATTERN.test(email) || email.length > MAX.email) {
    errors.email = "That doesn't look like a complete email address.";
  }

  if (values.organization.trim().length > MAX.organization) {
    errors.organization = "Please shorten the organisation name.";
  }

  if (values.phone.trim().length > MAX.phone) {
    errors.phone = "Please shorten the phone number.";
  }

  if (!values.projectType) {
    errors.projectType = "Choose the closest match: we can refine it later.";
  } else if (!projectTypes.includes(values.projectType as never)) {
    errors.projectType = "Please choose one of the listed project types.";
  }

  if (description.length < 20) {
    errors.projectDescription =
      "A sentence or two about the project helps us reply usefully.";
  } else if (description.length > MAX.projectDescription) {
    errors.projectDescription = "Please keep this under 4,000 characters.";
  }

  if (values.timeline && !timelines.includes(values.timeline as never)) {
    errors.timeline = "Please choose one of the listed timelines.";
  }

  if (values.budget && !budgetBands.includes(values.budget as never)) {
    errors.budget = "Please choose one of the listed ranges.";
  }

  if (values.message.trim().length > MAX.message) {
    errors.message = "Please keep this under 4,000 characters.";
  }

  if (values.brief) {
    if (!values.brief.name || !values.brief.data) {
      errors.brief = "That file could not be read. Try attaching it again.";
    } else if (values.brief.size > MAX_BRIEF_BYTES) {
      errors.brief = `That file is over ${Math.round(MAX_BRIEF_BYTES / (1024 * 1024))}MB. Email it across instead and we will match it to your enquiry.`;
    }
  }

  return errors;
}

/** Coerces an unknown request body into the enquiry shape, trimming as it goes. */
export function parseEnquiry(input: unknown): EnquiryValues {
  const source = (input ?? {}) as Record<string, unknown>;
  const read = (key: keyof EnquiryValues) =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  return {
    fullName: read("fullName"),
    organization: read("organization"),
    email: read("email"),
    phone: read("phone"),
    projectType: read("projectType"),
    projectDescription: read("projectDescription"),
    timeline: read("timeline"),
    budget: read("budget"),
    message: read("message"),
    brief: parseBrief(source.brief),
    website: read("website"),
  };
}

/**
 * Coerces an unknown brief into shape, or returns null.
 *
 * Anything malformed becomes null rather than an error: a broken attachment
 * should never cost someone their enquiry, and the size ceiling is enforced
 * by validation afterwards so the sender is told why.
 */
function parseBrief(input: unknown): BriefUpload | null {
  if (!input || typeof input !== "object") return null;
  const source = input as Record<string, unknown>;

  const name = typeof source.name === "string" ? source.name.trim() : "";
  const data = typeof source.data === "string" ? source.data : "";
  const size = typeof source.size === "number" ? source.size : 0;
  const type = typeof source.type === "string" ? source.type : "";

  if (!name || !data) return null;
  return { name: name.slice(0, 200), type: type.slice(0, 120), size, data };
}
