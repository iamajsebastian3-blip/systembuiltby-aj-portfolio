"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { RevenueCalculator } from "@/components/interactive/revenue-calculator";
import { RoiScorecard } from "@/components/interactive/roi-scorecard";
import { AuditTracker } from "@/components/interactive/audit-tracker";

export function RevenueContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-persian/20 backdrop-blur-xl py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-4">
              Revenue Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Stop Guessing. Start Measuring.
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Use these tools to find the leaks in your revenue pipeline — then
              let us fix them.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <RevenueCalculator />
      <RoiScorecard />
      <AuditTracker />
    </PageTransition>
  );
}
