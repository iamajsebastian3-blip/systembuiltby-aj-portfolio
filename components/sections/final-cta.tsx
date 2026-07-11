"use client";

import { useEffect } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function FinalCTA() {
  useEffect(() => {
    // Load the GHL calendar embed script (auto-resizes the iframe)
    const src = "https://connect.ajautomate.co/js/form_embed.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[15%] h-[360px] w-[360px] rounded-full bg-persian/18 blur-[130px]" />
        <div className="absolute bottom-[15%] right-[18%] h-[280px] w-[280px] rounded-full bg-yellow/8 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
              If your growth feels forced, your{" "}
              <span className="text-yellow">system</span> is broken.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">
              Stop duct-taping tools together and hoping they hold. Let&apos;s engineer one
              connected system that runs the busywork and scales with you&mdash;pick a time
              below, the first call&apos;s on me.
            </p>
          </div>
        </ScrollReveal>

        {/* Real GHL booking calendar — full width (renders wide, not tall) */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <iframe
              src="https://connect.ajautomate.co/widget/booking/Ib9dKL70xmR265fkYXWL"
              style={{ width: "100%", height: "820px", border: "none" }}
              scrolling="no"
              id="Ib9dKL70xmR265fkYXWL_cta"
              title="Book a System Strategy Call"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
