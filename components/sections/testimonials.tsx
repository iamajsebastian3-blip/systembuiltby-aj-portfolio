"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

const testimonials = [
  {
    name: "Claire Montero",
    role: "7-Figure Service Brand",
    initials: "CM",
    avatarBg: "#e8d5c4",
    quote:
      "AJ didn\u2019t just \u2018set up\u2019 our HighLevel. He rebuilt the entire logic behind how our leads move. Before him, we had automations but no structure. Now everything flows perfectly.",
  },
  {
    name: "Marcus Delgado",
    role: "Consulting Firm",
    initials: "MD",
    avatarBg: "#c9a882",
    quote:
      "We hired AJ to fix broken workflows. What we got was a fully engineered sales infrastructure. He mapped the pipeline, corrected trigger logic, and eliminated every bottleneck.",
  },
  {
    name: "Ethel Navarro",
    role: "B2B Service Company",
    initials: "EN",
    avatarBg: "#d4a97a",
    quote:
      "Most people know the tools. AJ understands the system behind them. He thinks in infrastructure \u2014 how data flows, how stages connect, how automations actually behave at scale.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
              System Feedback
            </span>
            <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
              What Clients Say
            </h2>
          </div>
        </ScrollReveal>

        {/* Outer white card */}
        <ScrollReveal>
          <div className="rounded-3xl bg-white p-7">
            <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg">
                    {/* Stars */}
                    <p className="mb-4 text-xs tracking-[3px] text-persian">
                      &#9733; &#9733; &#9733; &#9733; &#9733;
                    </p>

                    {/* Quote */}
                    <p className="mb-6 flex-1 text-[0.8rem] leading-relaxed text-gray-500">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="mb-4 h-px bg-gray-200" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: t.avatarBg }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-persian">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
