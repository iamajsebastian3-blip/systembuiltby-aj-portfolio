"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

const testimonials: {
  name: string;
  role: string;
  initials: string;
  avatarBg?: string;
  quote: string;
}[] = [
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
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-0 right-[20%] w-[400px] h-[400px] bg-persian/10 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6">
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

        {/* Video testimonial placeholder */}
        <ScrollReveal>
          <div className="mb-10 mx-auto max-w-[800px] aspect-video rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-persian/10 via-transparent to-persian/5" />
            <div className="relative z-10 text-center">
              {/* Play button */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center group-hover:bg-persian/30 group-hover:border-persian/40 transition-all duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" fillOpacity="0.6" className="ml-1 group-hover:fill-opacity-100 transition-all">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-white/40 uppercase tracking-widest">Client Testimonials</p>
              <p className="text-xs text-white/20 mt-1">YouTube video coming soon</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Outer glass container */}
        <ScrollReveal>
          <div className="rounded-2xl p-5 md:p-7 bg-white/[0.03] backdrop-blur-md border border-white/[0.06]">
            <StaggerChildren className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="flex h-full flex-col p-6 rounded-xl transition-all duration-300 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] hover:-translate-y-[2px] hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
                    <p className="mb-4 text-xs tracking-[3px] text-yellow/80">
                      &#9733; &#9733; &#9733; &#9733; &#9733;
                    </p>
                    <p className="mb-6 flex-1 text-[0.8rem] leading-relaxed text-white/45">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="h-px bg-white/[0.06] mb-4" />
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white overflow-hidden"
                        style={{ backgroundColor: t.avatarBg || "rgba(255,255,255,0.08)" }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-persian-light">
                          {t.name}
                        </p>
                        <p className="text-xs text-white/30">{t.role}</p>
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
