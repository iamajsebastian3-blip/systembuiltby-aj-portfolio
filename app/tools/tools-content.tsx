"use client";

import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

const revenueTools = [
  {
    href: "/tools/revenue-audit",
    icon: "📊",
    title: "Revenue Audit",
    description:
      "Three-part audit — calculate your revenue leak, see typical ROI multipliers, and benchmark against the most common audit findings.",
    cta: "Run Revenue Audit",
  },
  {
    href: "/tools/email-health",
    icon: "📧",
    title: "Email Health Tools",
    description:
      "Free curated tools to check your domain health, sender reputation, and deliverability score before launching any email campaign.",
    cta: "Check Email Health",
  },
];

export function ToolsContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-persian/20 backdrop-blur-xl py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-yellow text-sm font-semibold uppercase tracking-widest mb-4">
              Tools
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Free Tools to Audit Your System
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Diagnose revenue leaks, measure ROI, and audit your GoHighLevel
              sub-accounts — all in one place.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured: GHL Audit */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-yellow/80">
            GHL Full Audit
          </p>
          <ScrollReveal>
            <Link
              href="/tools/ghl-audit"
              className="block group relative overflow-hidden rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/15 via-persian/[0.08] to-transparent p-6 sm:p-8 transition-all hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.25)] hover:-translate-y-[2px]"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow/20 border border-yellow/40 text-yellow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-xl font-black text-white">GHL Sub-Account Audit</h2>
                    <span className="rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                      NEW 🔥
                    </span>
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed mb-4">
                    Detect misconfigurations, missing automations, and optimization opportunities in any GHL sub-account.
                    Connect with your Location ID + Private Integration Token, get a full health scan in seconds.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow group-hover:text-yellow-dark transition-colors">
                    Run Health Scan
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Revenue tools — same horizontal card style as Featured */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-persian-light/80">
            Revenue Tools
          </p>
          <StaggerChildren className="space-y-5">
            {revenueTools.map((t) => (
              <StaggerItem key={t.href}>
                <Link
                  href={t.href}
                  className="block group relative overflow-hidden rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/15 via-persian/[0.08] to-transparent p-6 sm:p-8 transition-all hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.25)] hover:-translate-y-[2px]"
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow/20 border border-yellow/40 text-2xl">
                      {t.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-xl font-black text-white">{t.title}</h3>
                      <p className="text-sm text-white/65 leading-relaxed mb-4">{t.description}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow group-hover:text-yellow-dark transition-colors">
                        {t.cta}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </PageTransition>
  );
}
