import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { RevenueCalculator } from "@/components/interactive/revenue-calculator";
import { RoiScorecard } from "@/components/interactive/roi-scorecard";
import { AuditTracker } from "@/components/interactive/audit-tracker";

export const metadata: Metadata = {
  title: "Revenue Audit",
  description:
    "Three-part revenue audit — calculate your revenue leak, see typical ROI multipliers, and benchmark against the most common audit findings.",
};

export default function RevenueAuditPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-[1100px] px-6 pt-8 pb-2">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          &larr; Back to Tools
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pt-6 pb-4">
        <div className="mx-auto max-w-[1100px]">
          <ScrollReveal>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-yellow">
              Revenue Audit
            </p>
            <h1 className="mb-3 text-3xl md:text-4xl font-black text-white">
              Find the Leaks. Quantify the Upside.
            </h1>
            <p className="max-w-2xl text-[15px] leading-relaxed text-white/65">
              A three-part audit to measure where your revenue is leaking, what
              optimized systems typically return, and where most businesses
              actually break.
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
