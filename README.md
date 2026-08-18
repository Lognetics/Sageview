# SageView Production Ltd — Website

A premium cinematic editorial website for SageView Production Ltd.

> **Framing the Meaning That Moves Human Minds**

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
No UI framework, no animation library, no icon package — every component here
is part of one design system.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before the
first production deploy — canonical URLs, Open Graph tags and the sitemap all
derive from it.

---

## The three things you will want to change first

### 1. The media library

Every photograph and film on the site is SageView's own work, taken from the
company Drive portfolio. Nothing is stock.

**`src/content/media.ts` is the registry** — every asset, its path and its alt
text, in one file. To swap a picture anywhere on the site, drop the new file
into `public/media/…` and change one `src`. No component needs touching.

```
public/media/
├── documentary/   23 stills, ~15 MB, long edge 2560px
├── video/         4 films + posters, ~95 MB
└── founder/       portraits of Daniel Okafor  (see below)
```

What is where:

| Asset | Used for |
| --- | --- |
| `hero-makoko.mp4` / `.webm` | Homepage hero — a silent 6.8s loop cut from the Makoko film |
| `makoko-education-crisis.mp4` | The film on the Makoko case study |
| `period-poverty.mp4` | The Period Poverty Documentary, on Testimonials |
| `food-security-programme.mp4` | On the Documentary Filmmaking service page |
| 23 documentary stills | Pillars, philosophy, process stages, services, page heroes, case-study gallery |

Images render through `<MediaFrame />` (responsive, lazy, AVIF/WebP via
`next/image`) and films through `<VideoFrame />` (click-to-play, `preload="none"`
so **nothing downloads until a visitor presses play**). If an image ever 404s,
the frame degrades to a designed placeholder rather than a broken icon.

The hero loop was cut from 12.0–19.6s of the Makoko documentary — the one long
stretch with no burnt-in subtitles — and the last 0.8s is cross-dissolved back
over the first so it loops without a visible cut. It is muted and never
autoplays under `prefers-reduced-motion`; those visitors get the poster still.

**Not used:** the Drive `Photography/Portrait` folder (weddings, pre-wedding,
fashion and studio portraiture). It is good work, but placing it beside
"Impact & NGO Documentaries" would undercut the documentary positioning the
rest of the site argues for. It is a portfolio in its own right — worth a
dedicated page if SageView wants that side of the practice visible.

**Alt text is required on every frame** and lives with the asset in
`media.ts`.

### 1b. The founder portraits

The black-and-white portrait of Daniel Okafor was recovered from the embedded
images in the company portfolio PDF and is **installed and live**:

```
public/media/founder/daniel-okafor-portrait-bw.jpg   629x787  (in use)
public/media/founder/daniel-okafor-01.jpg            (optional, higher res)
public/media/founder/daniel-okafor-02.jpg            (optional, higher res)
```

It drives the principal section on **About** and **Network**, and sits at the
centre of the network diagram in place of the aperture mark.

`founderPortraits` in `media.ts` is an ordered preference list. The Founder
section renders whichever files actually exist, best first, and ignores the
rest — so dropping a higher-resolution portrait in as `daniel-okafor-01.jpg`
automatically promotes it to the lead image and demotes the PDF-sourced one to
a supporting frame. No code change required.

At 629px the current file is used at a contained column width rather than
full-bleed, because enlarging it would only make it soft. A higher-resolution
original is worth supplying when convenient.

The section is gated on `assetExists()`, evaluated while the page is
prerendered — a portrait that is not there simply does not render, and can
never ship as a broken image.

### 2. Connecting the contact form

The enquiry form is complete and validated on both the client and the server.
The only thing missing is a destination.

Set `CONTACT_WEBHOOK_URL` to any endpoint that accepts a JSON `POST` (Zapier,
Make, n8n, a Slack workflow, Google Apps Script, your own handler) and
enquiries start flowing immediately.

To send email instead, replace the body of `deliverEnquiry` in
`src/lib/enquiry-delivery.ts` with a call to your provider. That file is the
**only** one that needs to change — the form, validation, error states and API
route are provider-agnostic.

Until something is configured the form tells visitors plainly that it is not
connected and to email SageView directly. **It never reports a submission as
successful when it was not.**

### 3. Editing copy

All approved company content lives in `src/content/`. Nothing is hard-coded in
components.

| File | Contents |
| --- | --- |
| `site.ts` | Company identity, contact details, navigation |
| `vision.ts` | Vision manifesto and mission |
| `about.ts` | Introduction, "narrative designers", Why SageView |
| `services.ts` | Three service categories and their capabilities |
| `process.ts` | Five creative stages + three-step client workflow |
| `philosophy.ts` | Kama Muta principles and core pillars |
| `case-studies.ts` | Case studies |
| `deliverables.ts` | The two asset packages |
| `network.ts` | Agile network role clusters |
| `testimonials.ts` | Client testimonials |
| `contact.ts` | Contact copy and enquiry-form options |
| `media.ts` | Every photograph and film, with its alt text |

Adding a service or a case study means adding one entry to the relevant array.
Its detail page, its route, its metadata and its sitemap entry are all
generated from that entry.

---

## Content integrity

Company facts come from the SageView Production Ltd Portfolio 2026 and nothing
has been invented — no history, clients, awards, statistics, certifications,
partnerships, locations, headcounts or project results beyond what the
portfolio states. Where the portfolio lists a section with no content (Future
Projects), the site says so honestly rather than filling the gap.

Two deliberate editorial decisions worth knowing about:

- **The Vision was re-authored** at the client's direction into a narrative
  manifesto about becoming the first name in impact storytelling. Every line is
  written as aspiration — what SageView is *building toward* — never as a
  ranking or market position already held. See the note at the top of
  `src/content/vision.ts`.
- **"Kama Muta"** is used throughout. The source portfolio spells it both
  "Kama Muta" and "Kuma Muta"; the former is the established term. Change the
  two strings at the top of `src/content/philosophy.ts` if SageView prefers the
  alternative.

---

## Architecture

```
src/
├── app/                    Routes, metadata, sitemap, robots, OG image, API
│   ├── api/contact/        Enquiry endpoint
│   ├── services/[slug]/    Generated per service
│   └── case-studies/[slug] Generated per case study
├── components/
│   ├── layout/             Navbar, MobileMenu, Footer, Logo
│   ├── primitives/         Section, Button, Reveal, MediaFrame, VideoFrame
│   └── sections/           Composed page sections
├── content/                All copy — the CMS layer
└── lib/                    cn, SEO helpers, enquiry validation + delivery
```

### Routes

```
/                          /deliverables
/about                     /philosophy
/vision                    /network
/services                  /why-sageview
/services/[slug]           /testimonials
/process                   /contact
/case-studies
/case-studies/[slug]
```

All 23 routes prerender as static HTML. Only `/api/contact` is dynamic.

---

## Design system

Defined once in `src/app/globals.css` as Tailwind v4 theme tokens.

- **Colour** — deep black base (`void`, `ink`, `charcoal`), bone/paper text, a
  single brass accent. Hierarchy comes from typography, contrast and spacing,
  not from colour.
- **Type** — Instrument Serif for display statements, Inter for the interface,
  JetBrains Mono for the small technical labels that give the site its
  documentary register. All self-hosted by `next/font`: no external requests,
  no layout shift.
- **Scale** — every size is a `clamp()`, so typography scales continuously
  rather than jumping at breakpoints.
- **Motion** — one shared `IntersectionObserver` drives every scroll reveal
  (`src/components/primitives/Reveal.tsx`); the visual behaviour is pure CSS.

### Motion and no-JavaScript

Reveals are gated on an `html.js` class set server-side, with a `<noscript>`
style that neutralises it. So there is no flash of hidden content, and a
visitor without JavaScript sees every word.

Under `prefers-reduced-motion: reduce`, all reveals, transitions, the grain
drift and smooth scrolling are disabled — the site presents instantly and
statically.

---

## Verified

Checked in Chromium across 16 pages × 5 viewports (320 / 375 / 834 / 1280 /
1600):

- No horizontal overflow at any size
- Exactly one `<h1>` per page
- Every image has alt text; no unnamed links or buttons
- No console or runtime errors
- Contact form: inline validation with focus management, independent
  server-side validation, honeypot, honest failure states
- Every scroll reveal fires with motion enabled, on all 14 pages
  (`scratchpad/reveal-check.mjs` walks each page and asserts nothing stays
  hidden — worth re-running after any change to `Reveal`)
- Hero film autoplays muted, loops, and is skipped entirely under reduced
  motion

Not verified by an external tool: full WCAG contrast audit and Lighthouse
scores.

**Video weight.** The three documentaries total ~95 MB in `public/`. That is
fine for a static deploy and costs a visitor nothing until they press play, but
it is heavy for a git repository. If the film library grows, move these to a
CDN or Vimeo and point `film` in `media.ts` at the new URLs — nothing else
changes.
