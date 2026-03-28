"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PortfolioContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-persian py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-4">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Built for Results
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Every project is engineered to generate measurable business
              outcomes — not just look pretty.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Funnel */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden grid md:grid-cols-2">
              {/* Preview */}
              <div className="bg-persian/10 flex items-center justify-center p-12 min-h-[280px]">
                <span className="text-6xl">🎯</span>
              </div>
              {/* Body */}
              <div className="p-8 flex flex-col justify-center">
                <p className="text-persian-light text-sm uppercase tracking-widest mb-2">
                  Featured Funnel
                </p>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Lead Generation Funnel
                </h2>
                <p className="text-text-muted text-sm mb-4">
                  A multi-step conversion funnel built on GoHighLevel for a
                  local service business. Integrated with automated SMS/email
                  follow-up, appointment booking, and CRM pipeline tracking.
                </p>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    3.2% conversion rate (2x industry average)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    Automated 5-step follow-up sequence
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    40% reduction in lead response time
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Website */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden grid md:grid-cols-2">
              {/* Body */}
              <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                <p className="text-persian-light text-sm uppercase tracking-widest mb-2">
                  Featured Website
                </p>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Business Authority Site
                </h2>
                <p className="text-text-muted text-sm mb-4">
                  A performance-optimized website designed to establish
                  authority, capture leads, and rank on Google. Built with
                  Next.js and deployed on Vercel for blazing-fast load times.
                </p>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    98 Lighthouse performance score
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    SEO-optimized with structured data
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-persian rounded-full" />
                    Integrated lead capture + CRM pipeline
                  </li>
                </ul>
              </div>
              {/* Preview */}
              <div className="bg-persian/10 flex items-center justify-center p-12 min-h-[280px] order-1 md:order-2">
                <span className="text-6xl">🌐</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="border-2 border-dashed border-white/15 rounded-xl p-12 text-center">
              <p className="text-text-muted text-lg font-medium mb-2">
                More coming soon
              </p>
              <p className="text-text-faint text-sm">
                New projects are added as they launch. Check back regularly or
                book a call to discuss yours.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
