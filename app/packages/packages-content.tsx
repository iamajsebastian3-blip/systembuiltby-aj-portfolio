"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Counter } from "@/components/motion/counter";

const packages = [
  {
    phase: "PHASE ONE",
    name: "STARTER",
    price: 197,
    features: [
      "1-page funnel build",
      "Mobile-optimized design",
      "Contact form integration",
      "Basic SEO setup",
      "1 round of revisions",
    ],
  },
  {
    phase: "PHASE TWO",
    name: "GROWTH",
    price: 597,
    features: [
      "Multi-step funnel build",
      "GHL CRM setup & automation",
      "Email / SMS follow-up sequences",
      "Google Business Profile optimization",
      "Analytics & tracking setup",
      "2 rounds of revisions",
    ],
  },
  {
    phase: "PHASE THREE",
    name: "SCALE",
    price: 1497,
    features: [
      "Full website + funnel system",
      "Advanced GHL automation workflows",
      "Google Ads setup & management",
      "Local SEO campaign",
      "CRM pipeline + lead scoring",
      "Monthly performance reporting",
      "Priority support & unlimited revisions",
    ],
  },
];

export function PackagesContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-surface py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-text-muted text-sm uppercase tracking-widest mb-4">
              Pricing
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Growth Phase
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Every business is at a different stage. Pick the phase that matches
              where you are — and where you want to go.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.name} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-7 flex flex-col h-full">
                <p className="text-xs font-bold tracking-widest text-black/50 mb-1">
                  {pkg.phase}
                </p>
                <p className="inline-flex items-center gap-2 mb-4">
                  <span className="bg-yellow/30 px-2 py-0.5 rounded text-sm font-bold text-black">
                    {pkg.name}
                  </span>
                </p>

                <div className="mb-6">
                  <Counter
                    target={pkg.price}
                    prefix="$"
                    className="text-4xl font-bold text-black"
                  />
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-yellow/30 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-yellow-dark"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-sm text-black/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://solution13.online/booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-persian text-white font-bold py-3 rounded-lg hover:bg-persian-dark transition-colors"
                >
                  Get Started
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
