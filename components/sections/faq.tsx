"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const faqs = [
  {
    question: "How fast will I start getting leads?",
    answer:
      "Most clients see automated leads within 7\u201314 days post-launch. The speed depends on your existing traffic and the channels we activate. We prioritize fast wins during onboarding so you start seeing results before the full system is even complete.",
  },
  {
    question: "Will this work for my industry/business?",
    answer:
      "Systems are industry-agnostic. Whether you run a coaching business, med spa, agency, or consulting firm, the infrastructure is built on proven frameworks that adapt to your sales process, offer structure, and audience.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Access to your existing tools (HighLevel, domain, email provider, etc.), a 30-minute kickoff call, and your current offer details. I handle everything else \u2014 build, logic, integrations, and testing.",
  },
  {
    question: "How long does the build take?",
    answer:
      "Starter systems go live in 5\u20137 business days. More complex builds (full pipeline + multi-channel automation) typically take 10\u201314 business days. You\u2019ll receive progress updates at every stage.",
  },
  {
    question: "If I decide to move forward, what happens next?",
    answer:
      "After the strategy call, you\u2019ll receive a custom proposal. Once approved, we kick off with onboarding, build the system, test it end-to-end, walk you through everything, and launch.",
  },
  {
    question: "Do I need to already have GoHighLevel?",
    answer:
      "No. I can set up a new GHL account for you as part of the onboarding process. If you sign up through my affiliate link, you\u2019ll also receive a discount on your first build package.",
  },
  {
    question: "Will I be trained on how to use the system?",
    answer:
      "Yes. Every build includes a walkthrough call where I show you exactly how to manage your system \u2014 pipelines, automations, dashboards, and contacts. You\u2019ll also receive documentation for reference.",
  },
  {
    question: "What if the system isn\u2019t converting after launch?",
    answer:
      "All packages include post-launch support. If something isn\u2019t performing, I\u2019ll diagnose the issue, adjust the logic, and optimize until the system delivers. You\u2019re not left to figure it out alone.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-persian">
              FAQ
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-black md:text-4xl lg:text-5xl">
              System Inquiries
            </h2>
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <ScrollReveal>
          <div className="mx-auto max-w-[720px]">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b-4 border-white bg-gray-100"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-persian">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 shrink-0 text-persian"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key={`answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-gray-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
