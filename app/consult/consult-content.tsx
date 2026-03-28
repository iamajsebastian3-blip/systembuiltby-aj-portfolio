"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const infoCards = [
  {
    emoji: "\uD83D\uDCCA",
    title: "Revenue Audit",
    description:
      "We'll look at your current systems, traffic, and conversion flow to find exactly where money is slipping through.",
  },
  {
    emoji: "\uD83D\uDDFA\uFE0F",
    title: "Action Plan",
    description:
      "You'll walk away with a clear, prioritized roadmap — whether you work with us or not.",
  },
  {
    emoji: "\uD83D\uDD13",
    title: "No Pressure",
    description:
      "No hard sell. No pitch deck. Just an honest conversation about what's working and what's not.",
  },
];

export function ConsultContent() {
  return (
    <PageTransition>
      <section className="min-h-screen bg-persian flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Free &middot; No commitment &middot; No pitch
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
              READY TO STOP
              <br />
              LEAVING MONEY
              <br />
              <span className="text-white/40">ON THE TABLE?</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a
                href="https://solution13.online/booking"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-persian font-bold px-8 py-3.5 rounded-lg hover:bg-white/90 transition-colors"
              >
                Book a Free Call &rarr;
              </a>
              <a
                href="mailto:aj@systembuiltbyaj.com"
                className="border border-white/30 text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                Send a Message
              </a>
            </div>
            <p className="text-white/40 text-sm">
              15-minute call. No credit card. No obligations.
            </p>
          </ScrollReveal>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-5 mt-16">
            {infoCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={0.3 + i * 0.1}>
                <div className="bg-white/10 border border-white/10 rounded-xl p-6 text-left">
                  <p className="text-3xl mb-3">{card.emoji}</p>
                  <p className="text-white font-bold mb-2">{card.title}</p>
                  <p className="text-white/60 text-sm">{card.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
