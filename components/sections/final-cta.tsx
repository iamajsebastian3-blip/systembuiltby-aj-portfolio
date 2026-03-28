"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function FinalCTA() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-[700px] px-6 text-center">
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
          <p className="mb-10 text-sm italic text-white/45">
            Stop duct-taping tools together and hoping they work. Engineer a
            system that scales with you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <a
            href="#"
            className="inline-block rounded-full bg-yellow px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors duration-200 hover:bg-yellow-dark"
          >
            Book a System Strategy Call &rarr;
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
