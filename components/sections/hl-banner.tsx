"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function HLBanner() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-2xl text-center bg-gradient-to-br from-[#1a0845]/80 via-persian/20 to-[#2a0f6a]/60 backdrop-blur-xl border border-white/[0.08] px-12 py-9 shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.12)_0%,transparent_70%)]" />

            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-black uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                WANT TO SEE MY <span className="text-yellow">SYSTEM BUILDS?</span>
              </h2>
              <p className="mx-auto mb-6 max-w-[560px] text-sm leading-relaxed text-white/50">
                I screen-record every system I build &mdash; workflows,
                pipelines, funnels, automations. Watch the actual logic behind
                each one, step by step.
              </p>
              <a
                href="/system-builds"
                className="inline-block rounded-full bg-yellow px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_24px_rgba(246,203,31,0.25)]"
              >
                Watch System Builds
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
