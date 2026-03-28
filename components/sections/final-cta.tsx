"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[25%] w-[350px] h-[350px] rounded-full bg-[#2a0a5e]/30 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[25%] w-[250px] h-[250px] rounded-full bg-yellow/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-[700px] px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            IF YOUR GROWTH
            <br />
            FEELS FORCED
            <br />
            YOUR <span className="text-yellow">SYSTEM</span>
            <br />
            IS BROKEN!
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="mb-10 text-sm italic text-white/35">
            Stop duct-taping tools together and hoping they work. Engineer a
            system that scales with you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href="/consult"
            className="inline-block rounded-full bg-yellow px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_32px_rgba(246,203,31,0.25)]"
          >
            Book a System Strategy Call &rarr;
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
