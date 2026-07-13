"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Parallax } from "@/components/motion/parallax";

const faqs = [
  {
    question: "How fast will I start getting leads?",
    answer:
      "Most clients see automated leads within 7–14 days post-launch. The speed depends on your existing traffic and the channels we activate. We prioritize fast wins during onboarding so you start seeing results before the full system is even complete.",
  },
  {
    question: "Will this work for my industry/business?",
    answer:
      "Systems are industry-agnostic. Whether you run a coaching business, med spa, agency, or consulting firm, the infrastructure is built on proven frameworks that adapt to your sales process, offer structure, and audience.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Access to your existing tools (HighLevel, domain, email provider, etc.), a 30-minute kickoff call, and your current offer details. I handle everything else — build, logic, integrations, and testing.",
  },
  {
    question: "How long does the build take?",
    answer:
      "Starter systems go live in 5–7 business days. More complex builds (full pipeline + multi-channel automation) typically take 10–14 business days. You’ll receive progress updates at every stage.",
  },
  {
    question: "If I decide to move forward, what happens next?",
    answer:
      "After the strategy call, you’ll receive a custom proposal. Once approved, we kick off with onboarding, build the system, test it end-to-end, walk you through everything, and launch.",
  },
  {
    question: "What if the system isn’t converting after launch?",
    answer:
      "All packages include post-launch support. If something isn’t performing, I’ll diagnose the issue, adjust the logic, and optimize until the system delivers. You’re not left to figure it out alone.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative py-16 lg:py-32">
      <Parallax className="pointer-events-none absolute inset-0" speed={60}>
        <div className="absolute left-[-6%] top-1/3 h-[380px] w-[380px] rounded-full bg-persian/12 blur-[140px]" />
      </Parallax>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* LEFT — heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ScrollReveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-persian-light">
              {String(faqs.length).padStart(2, "0")} &middot; Common Questions
            </p>
            <h2 className="text-5xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              System
              <br />
              Inquiries
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/50">
              The questions I get most before a build&mdash;answered straight, no fluff.
            </p>
          </ScrollReveal>
        </div>

        {/* RIGHT — accordion */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.05}>
                <div className="border-b border-white/[0.08]">
                  <button
                    onClick={() => toggle(index)}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span className="w-7 shrink-0 text-sm font-bold text-persian-light/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-bold text-white transition-colors group-hover:text-white sm:text-xl">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isOpen
                          ? "border-persian/50 bg-persian/15 text-white"
                          : "border-white/[0.10] bg-white/[0.04] text-white/50 group-hover:text-white"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="7" y1="1" x2="7" y2="13" />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pl-12 text-sm leading-relaxed text-white/50">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
