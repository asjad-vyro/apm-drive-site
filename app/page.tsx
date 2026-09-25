import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqSection } from "@/components/FaqSection";
import { LineSystem } from "@/components/motion/LineSystem";
import { Hero } from "@/components/sections/Hero";
import { Receipts } from "@/components/sections/Receipts";
import { Ship } from "@/components/sections/Ship";
import { Growth } from "@/components/sections/Growth";
import { Mentions } from "@/components/sections/Mentions";
import { How } from "@/components/sections/How";
import { Places } from "@/components/sections/Places";
import { Fit } from "@/components/sections/Fit";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { FAQ } from "@/lib/data/copy";
import { RECEIPTS, MENTIONS, MILESTONES, EVENTS, SF_ADDRESS } from "@/lib/data/facts";
import { SURFACES, HERO_IMAGE, HERO_VIDEO } from "@/lib/data/assets";

/**
 * One page. `#page-root` is the coordinate space for the line; every section
 * is `relative z-[1]` so the line draws beneath text and behind cards.
 */
export default function Page() {
  return (
    <>
      <SiteNav />
      <main id="page-root" className="relative">
        <LineSystem rootId="page-root" />
        <Hero image={HERO_IMAGE} video={HERO_VIDEO} />
        <Receipts facts={RECEIPTS} />
        <Ship surfaces={SURFACES} />
        <Growth milestones={MILESTONES} />
        <Mentions mentions={MENTIONS} />
        <How />
        <Places events={EVENTS} sfAddress={SF_ADDRESS} />
        <Fit />
        <ApplyForm />
        <FaqSection items={FAQ} />
      </main>
      <SiteFooter />
    </>
  );
}
