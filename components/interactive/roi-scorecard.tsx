"use client";

import { Counter } from "@/components/motion/counter";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const cards = [
  {
    title: "GHL Automation",
    value: 4.2,
    suffix: "× ROI",
    description:
      "Average return on investment from GoHighLevel automation systems.",
  },
  {
    title: "Google Ads",
    value: 3.8,
    suffix: "× ROAS",
    description:
      "Return on ad spend for clients running optimized Google Ads campaigns.",
  },
  {
    title: "Local SEO",
    value: 3.1,
    suffix: "× profile views",
    description:
      "Increase in Google Business Profile views after local SEO optimization.",
  },
];

export function RoiScorecard() {
  return (
    <section className="py-20 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            ROI Scorecard
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
            Real performance metrics from real client engagements.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <p className="text-text-muted text-sm uppercase tracking-wider mb-3">
                  {card.title}
                </p>
                <Counter
                  target={card.value}
                  suffix={card.suffix}
                  className="text-4xl font-bold text-persian-light"
                />
                <p className="text-text-muted text-sm mt-4">
                  {card.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
