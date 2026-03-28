"use client";

import { Counter } from "@/components/motion/counter";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const audits = [
  {
    title: "Website / Funnel",
    pct: 28,
    description:
      "Most small business funnels convert under 2%. A proper build changes that.",
  },
  {
    title: "CRM & Follow-Up",
    pct: 20,
    description:
      "80% of leads go cold without automated follow-up sequences in place.",
  },
  {
    title: "Local SEO",
    pct: 35,
    description:
      "Local visibility is the lowest-hanging fruit — and most businesses ignore it.",
  },
  {
    title: "Paid Advertising",
    pct: 42,
    description:
      "Ad spend without tracking and optimization is money burned.",
  },
];

export function AuditTracker() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Audit Tracker
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
            Average scores from recent business audits. Where does your business
            stand?
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {audits.map((audit, i) => (
            <ScrollReveal key={audit.title} delay={i * 0.08}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-medium">{audit.title}</p>
                  <Counter
                    target={audit.pct}
                    suffix="%"
                    className="text-xl font-bold text-yellow"
                  />
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-persian rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${audit.pct}%` }}
                  />
                </div>
                <p className="text-text-muted text-sm">{audit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
