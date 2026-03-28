import { Hero } from "@/components/sections/hero";
import { ToolkitMarquee } from "@/components/sections/toolkit-marquee";
import { Vault } from "@/components/sections/vault";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { HLBanner } from "@/components/sections/hl-banner";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolkitMarquee />
      <Vault />
      <Philosophy />
      <Services />
      <Testimonials />
      <HLBanner />
      <FAQ />
      <FinalCTA />
    </>
  );
}
