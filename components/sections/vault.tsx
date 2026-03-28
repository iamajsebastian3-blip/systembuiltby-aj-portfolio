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
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <ScrollReveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-black/40">
            IS THIS YOU?
          </span>
          <h2 className="text-3xl font-black leading-tight text-black md:text-4xl lg:text-5xl">
            Whether Your System Exists Or Needs to Be Built.
          </h2>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* System Operational */}
          <ScrollReveal variant="fade-left">
            <div className="rounded-xl border-[1.5px] border-black bg-white p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-persian/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M5 10l3 3 7-7"
                      stroke="#5e17eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black">
                  System Operational
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {operationalItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-1 flex-shrink-0"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 8l3 3 5-5"
                        stroke="#5e17eb"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-black/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* System Needs Engineering */}
          <ScrollReveal variant="fade-right">
            <div className="rounded-xl border-[1.5px] border-black bg-white p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6 6l8 8M14 6l-8 8"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-black">
                  System Needs Engineering
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {engineeringItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-red-500">
                      !
                    </span>
                    <span className="text-sm text-black/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
