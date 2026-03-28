"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

const operationalItems = [
  "Funnels are underperforming against expected conversion benchmarks",
  "Automations are fragmented or improperly triggered",
  "Leads are leaking between pipeline stages",
  "The system feels complex, not controlled",
];

const engineeringItems = [
  "You're unsure how to structure your lead flow",
  "You don't want to build a system twice",
  "You need automation done correctly the first time",
  "You want growth without operational chaos",
];

export function Vault() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-white/30">
            IS THIS YOU?
          </span>
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            Whether Your System Exists Or Needs to Be Built.
          </h2>
        </ScrollReveal>

        {/* Outer glass container */}
        <ScrollReveal>
          <div className="glow-border rounded-2xl p-5 md:p-8 bg-white/[0.03] backdrop-blur-md">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* System Operational */}
              <div className="p-6 rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.035] border border-white/[0.06]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10l3 3 7-7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">System Operational</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {operationalItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-persian-light shrink-0" />
                      <span className="text-sm text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* System Needs Engineering */}
              <div className="p-6 rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/15">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M6 6l8 8M14 6l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white">System Needs Engineering</h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {engineeringItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-red-400/70">!</span>
                      <span className="text-sm text-white/50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
