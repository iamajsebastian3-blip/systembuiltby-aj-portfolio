"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function BookingContent() {
  useEffect(() => {
    // Load the GHL form embed script
    const existingScript = document.querySelector(
      'script[src="https://connect.ajautomate.co/js/form_embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://connect.ajautomate.co/js/form_embed.js";
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <section className="relative py-16 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-[30%] w-[500px] h-[400px] rounded-full bg-persian/15 blur-[120px]" />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <ScrollReveal>
              <Link
                href="/consult"
                className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
              >
                &larr; Back to overview
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-persian/20 border border-persian/30 text-persian-light mb-6">
                Book Your Call
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                See Your{" "}
                <span className="text-yellow">Automated System</span>
                <br />
                in Action
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-sm text-white/45 max-w-xl mx-auto leading-relaxed">
                Pick a time for your free discovery call. We&apos;ll walk you through exactly how automation handles your leads &mdash; instant follow-up, missed call text-back, review requests, and your real-time dashboard.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Calendar embed */}
        <section className="pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
                <iframe
                  src="https://connect.ajautomate.co/widget/booking/Ib9dKL70xmR265fkYXWL"
                  style={{ width: "100%", height: "1100px", border: "none" }}
                  id="Ib9dKL70xmR265fkYXWL_1774708976909"
                  title="Book a Call"
                />
              </div>
            </ScrollReveal>

            {/* Trust note */}
            <ScrollReveal delay={0.3}>
              <p className="text-center text-xs text-white/20 mt-6 uppercase tracking-widest">
                100% Free &middot; No credit card required &middot; No obligations
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
