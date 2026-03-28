"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

function formatDollars(n: number): string {
  return "$" + Math.round(n).toLocaleString();
}

export function RevenueCalculator() {
  const [visitors, setVisitors] = useState(500);
  const [convRate, setConvRate] = useState(3);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(1500);

  const calculate = useCallback(() => {
    const cur =
      visitors * (convRate / 100) * (closeRate / 100) * dealValue;
    const optimizedConv = Math.min((convRate / 100) * 2.5, 0.25);
    const optimizedClose = Math.min((closeRate / 100) * 1.5, 0.7);
    const potential = visitors * optimizedConv * optimizedClose * dealValue;
    const leak = potential - cur;
    const captured = potential > 0 ? Math.round((cur / potential) * 100) : 0;
    return { cur, potential, leak, captured };
  }, [visitors, convRate, closeRate, dealValue]);

  const { cur, potential, leak, captured } = calculate();

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Revenue Leak Calculator
          </h2>
          <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
            Find out how much revenue your business is losing every month due to
            broken systems.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Inputs */}
            <div className="space-y-6 bg-white/5 rounded-xl p-6 border border-white/10">
              <div>
                <label className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Monthly Visitors</span>
                  <span className="text-white font-medium">
                    {visitors.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-persian"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Conversion Rate</span>
                  <span className="text-white font-medium">{convRate}%</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={convRate}
                  onChange={(e) => setConvRate(Number(e.target.value))}
                  className="w-full accent-persian"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Close Rate</span>
                  <span className="text-white font-medium">{closeRate}%</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full accent-persian"
                />
              </div>

              <div>
                <label className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Average Deal Value</span>
                  <span className="text-white font-medium">
                    {formatDollars(dealValue)}
                  </span>
                </label>
                <input
                  type="number"
                  min={100}
                  max={100000}
                  value={dealValue}
                  onChange={(e) => setDealValue(Number(e.target.value) || 0)}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-persian"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-persian/20 border border-persian/40 rounded-xl p-6 flex flex-col justify-center">
              <p className="text-text-muted text-sm mb-1 uppercase tracking-wider">
                Monthly Revenue Leak
              </p>
              <motion.p
                key={leak}
                initial={{ opacity: 0.6, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-4xl md:text-5xl font-bold text-yellow mb-6"
              >
                {formatDollars(leak)}
              </motion.p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Current Revenue</span>
                  <span className="text-white font-medium">
                    {formatDollars(cur)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Potential Revenue</span>
                  <span className="text-white font-medium">
                    {formatDollars(potential)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Revenue Captured</span>
                  <span>{captured}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-persian rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${captured}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Leak breakdown */}
        <ScrollReveal delay={0.2}>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                label: "Weak Funnel",
                pct: 40,
                fix: "Conversion-optimized funnel",
              },
              {
                label: "No CRM / Follow-Up",
                pct: 33,
                fix: "Automated CRM pipeline",
              },
              {
                label: "Weak SEO",
                pct: 27,
                fix: "Local SEO domination",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <p className="text-yellow font-bold text-lg mb-1">
                  {item.pct}%
                </p>
                <p className="text-white font-medium text-sm mb-2">
                  {item.label}
                </p>
                <p className="text-text-muted text-xs">
                  With proper systems:{" "}
                  <span className="text-persian-light">{item.fix}</span>
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3}>
          <div className="bg-persian rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-lg md:text-xl font-bold text-center md:text-left">
              You&apos;re leaving {formatDollars(leak)}/month on the table.
            </p>
            <a
              href="https://solution13.online/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-dark transition-colors shrink-0"
            >
              Get Your Free Audit
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
