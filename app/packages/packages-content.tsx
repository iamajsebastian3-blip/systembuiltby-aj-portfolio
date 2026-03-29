"use client";

import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Counter } from "@/components/motion/counter";

const packages = [
  {
    phase: "PHASE ONE",
    name: "STARTER",
    price: 297,
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
    price: 697,
    isPopular: true,
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
    price: 1897,
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
      <section className="bg-persian/20 backdrop-blur-xl py-16 pb-12 px-8">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <p className="text-yellow text-sm font-semibold uppercase tracking-widest mb-3">
              Pricing
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Choose Your Growth Phase
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
              Every business is at a different stage. Pick the phase that matches
              where you are &mdash; and where you want to go.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.name} delay={i * 0.1}>
              <div className="glow-border rounded-2xl p-7 flex flex-col h-full bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/[0.07]">
                <p className="text-xs font-bold tracking-widest text-white/40 mb-1">
                  {pkg.phase}
                </p>
                <p className="inline-flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 rounded text-sm font-bold ${
                    pkg.isPopular
                      ? "bg-yellow text-black"
                      : "bg-white/[0.08] border border-white/[0.12] text-white"
                  }`}>
                    {pkg.name}
                  </span>
                  {pkg.isPopular && (
                    <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-yellow">
                      Most Popular
                    </span>
                  )}
                </p>

                <div className="mb-6">
                  <Counter
                    target={pkg.price}
                    prefix="$"
                    className="text-4xl font-black text-white"
                  />
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-persian/20 border border-persian/30 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3 h-3 text-persian-light"
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
                      <span className="text-sm text-white/55">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/consult/booking"
                  className={`block w-full text-center font-bold py-3 rounded-xl transition-all ${
                    pkg.isPopular
                      ? "bg-yellow text-black hover:shadow-[0_0_24px_rgba(246,203,31,0.25)]"
                      : "bg-persian text-white border border-persian/60 hover:bg-persian-dark hover:shadow-[0_0_24px_rgba(94,23,235,0.3)]"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
