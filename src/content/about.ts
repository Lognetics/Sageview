/**
 * ABOUT
 *
 * Who we are, the founder, the philosophy, the approach, the team and the
 * network. The philosophy and network material is carried over from the
 * company profile; the structure around it is the 2026 restructure.
 */

import { principal } from "@/content/site";

export const aboutHero = {
  eyebrow: "About SageView Production Ltd",
  heading: "We make visual work",
  headingAccent: "that has something to say.",
  lead: "SageView Production Ltd is a visual communications and production company working across documentary and commercial film, photography, strategy and live production.",
} as const;

export const whoWeAre = {
  eyebrow: "Who We Are",
  heading: "A studio built around",
  headingAccent: "the story first.",
  body: [
    "SageView Production Ltd is a visual communications and production company. We make human-centred visual work for brands, organisations and institutions: documentary and commercial film, photography, campaign material and live production.",
    "The studio was built on a simple observation. Most visual work fails not because it was badly shot, but because nobody decided what it was for. So we start with the objective and the audience, and let those decide the film, the photographs and the format, rather than the other way around.",
    "That means strategy, production and post are not separate departments here. They are the same team working from the same brief, which is why the intent set in the first conversation is still intact in the final grade.",
  ],
} as const;

/**
 * The founder.
 *
 * Biography supplied by Daniel Okafor and lightly edited: a typo corrected,
 * the closing paragraphs tightened, and the client list kept exactly as given.
 */
export const founder = {
  eyebrow: "The Founder",
  name: principal.name,
  role: principal.role,
  bio: [
    "Daniel Okafor is a documentary filmmaker and visual communication strategist focused on creating human-centred visual stories for brands, organisations and institutions.",
    "As the founder of SageView Production, he leads projects across documentary filmmaking, commercial and corporate production, photography and visual communication, combining strategic thinking, storytelling and visual craft to create work that connects with audiences and communicates with purpose.",
    "His work has included collaborations with brands and organisations such as L'Oréal, PreCEFI, Prime Reach Productions and Lusso Boutique Hotel, among others.",
    "At SageView Production, Daniel brings together creative direction, production and storytelling to turn ideas and experiences into visual communication that means something.",
  ],
} as const;

/**
 * Philosophy: Kama Muta.
 *
 * Retained from the company profile. This is the studio's stated standard for
 * what a finished film has to do, and the language is the founder's own.
 */
export const philosophy = {
  eyebrow: "Our Philosophy",
  heading: "Kama Muta",
  headingAccent: "Moved by Love",
  quote:
    "Storytelling is not just about capturing moments; it is about revealing the truth, emotion and meaning hidden within them.",
  body: "Kama Muta is the sudden feeling of being moved: the warmth in the chest when connection becomes visible. It is the emotion behind every story that changes a mind rather than merely informing one. It is the standard we edit against.",
  principles: [
    {
      index: "01",
      name: "Emotional Honesty",
      body: "Raw, genuine emotion and unfiltered human experience, never performed, never manufactured in the edit.",
    },
    {
      index: "02",
      name: "Cinematic Realism",
      body: "The craft of cinema applied to what is actually there, rather than used to replace it.",
    },
    {
      index: "03",
      name: "Human-Centered Focus",
      body: "The person in the frame is the subject, not the illustration of a point.",
    },
    {
      index: "04",
      name: "Ethical Integrity",
      body: "Dignity in how a subject is approached, filmed and finally shown.",
    },
  ],
} as const;

/**
 * Approach: how a project is actually thought about, as distinct from the
 * production sequence in Services.
 */
export const approach = {
  eyebrow: "Our Approach",
  heading: "Objective first,",
  headingAccent: "camera last.",
  lead: "How we think about a project, before any of it becomes a production schedule.",
  points: [
    {
      index: "01",
      name: "Start with what has to change",
      body: "Not the deliverable. A film that wins a pitch and a film that moves a donor board are different films, and the difference is decided before pre-production.",
    },
    {
      index: "02",
      name: "Design for the room it plays in",
      body: "A summit screen, a phone on a commute and a report opened once are three different audiences. The edit knows which one it is for.",
    },
    {
      index: "03",
      name: "Build the crew for the brief",
      body: "The team that shoots a water-settlement documentary is not the team that runs a multi-camera broadcast. We assemble against the work rather than staffing a standing payroll.",
    },
    {
      index: "04",
      name: "Treat the subject as the point",
      body: "Access is earned, not extracted. The people in the frame are why the work exists, and how they are treated on the day shows up on screen.",
    },
  ],
} as const;

/**
 * Team and network.
 *
 * The portfolio names one individual. Everyone else is described by role,
 * because the studio is deliberately an assembled network rather than a
 * standing payroll, and inventing named staff would be a lie.
 */
export const team = {
  eyebrow: "Our Team",
  heading: "A core team,",
  headingAccent: "assembled per project.",
  lead: "SageView runs a small permanent core and builds the rest of each crew around the brief. It keeps the work senior and the overhead honest.",
  roles: [
    { name: "Creative Direction", body: "Story, tone and the standard the work is held to." },
    { name: "Production", body: "Scheduling, logistics, access and the shoot itself." },
    { name: "Cinematography", body: "Camera, lighting and the look of the finished frame." },
    { name: "Photography", body: "Stills as a discipline in their own right." },
    { name: "Post-Production", body: "Edit, grade, sound and delivery." },
    { name: "Technical Direction", body: "The live and broadcast layer." },
  ],
} as const;

export const network = {
  eyebrow: "Our Network",
  heading: "Specialist collaborators,",
  headingAccent: "brought in by name.",
  lead: "Beyond the core team, SageView works with a network of specialists chosen for the specific demands of a project.",
  note: "The team is built for the brief, which is why the crew that shoots a water-settlement documentary is not the crew that runs a multi-camera summit broadcast.",
  specialists: [
    "Directors of Photography",
    "Sound Recordists",
    "Aerial Operators",
    "Field Producers & Fixers",
    "Editors & Colourists",
    "Motion & Graphic Designers",
    "Composers & Sound Designers",
    "Broadcast Engineers",
  ],
} as const;
