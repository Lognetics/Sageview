import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { MoreThanProduction } from "@/components/sections/MoreThanProduction";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SiteHero } from "@/components/sections/SiteHero";
import { StartCTA } from "@/components/sections/StartCTA";
import { WhatWeDo } from "@/components/sections/WhatWeDo";

/**
 * Homepage.
 *
 * Eight bands, in the order a visitor needs them: show the work, say what we
 * do, say why it is more than production, show who has trusted it, introduce
 * the studio, then ask for the project.
 */
export default function HomePage() {
  return (
    <>
      <SiteHero />
      <SelectedWork />
      <WhatWeDo />
      <MoreThanProduction />
      <ClientMarquee />
      <AboutTeaser />
      <StartCTA />
    </>
  );
}
