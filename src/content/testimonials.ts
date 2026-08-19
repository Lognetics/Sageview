/**
 * CLIENT TESTIMONIALS
 *
 * Exactly the three people credited in the portfolio, with quotes reproduced
 * verbatim. Nonye Alo is listed in the portfolio without an accompanying
 * quote, so no quote is attributed to them.
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  organization: string;
  quote?: string;
  project?: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "nwankwo-chioma-emilia",
    name: "Nwankwo Chioma Emilia",
    role: "Co-founder / Executive Director",
    organization: "Flow with Pride Impact Hub",
    project: "Period Poverty Documentary",
    quote:
      "The quality of your work reflects not only technical skill but a deep understanding of the sensitivity and dignity required when covering topics related to menstrual health.",
  },
  {
    id: "michael-chineme-ike",
    name: "Michael Chineme Ike",
    role: "Co-founder / Chairman of the Board of Trustees",
    organization: "Flow with Pride Impact Hub",
    quote:
      "This video just strengthened my resolve. It made me feel like this project is worth everything we're pouring into it. Thank you for doing a great job.",
  },
  {
    id: "nonye-alo",
    name: "Nonye Alo",
    role: "Operation Officer",
    organization: "Flow with Pride Impact Hub",
  },
];

/** Testimonials that carry a quote, used by the slider. */
export const quotedTestimonials = testimonials.filter(
  (testimonial): testimonial is Testimonial & { quote: string } =>
    Boolean(testimonial.quote),
);

/**
 * The Period Poverty Documentary engagement, as described in the portfolio's
 * testimonial section.
 */
export const testimonialProject = {
  name: "Period Poverty Documentary",
  client: "Flow with Pride Impact Hub",
  challenge: "Increase awareness and attract donor support.",
  solution:
    "A character-driven documentary centred on lived experiences and expert insights.",
  outcome: "Increased engagement and strengthened stakeholder conversations.",
} as const;
