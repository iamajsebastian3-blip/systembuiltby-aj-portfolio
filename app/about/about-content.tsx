"use client";

import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

const skills = [
  "GoHighLevel systems",
  "n8n automations",
  "AI agents & workflows",
  "Claude-built systems",
  "CRM & pipeline automation",
  "App-to-app integrations",
  "End-to-end backend automation",
];

const categories = [
  { icon: "🔥", name: "Funnel & Website Systems", desc: "High-converting landing pages and sales funnels" },
  { icon: "🔥", name: "CRM & Pipeline Systems", desc: "Structured lead tracking from first touch to close" },
  { icon: "🔥", name: "Automation & Workflows", desc: "End-to-end GHL workflow automation" },
  { icon: "📅", name: "Booking Systems", desc: "Calendar integration with automated reminders" },
  { icon: "📲", name: "A2P 10DLC Setup", desc: "Compliant SMS registration and setup", isNew: true, heat: 1 },
  { icon: "🤖", name: "AI Chatbot Systems", desc: "Intelligent bots that qualify leads 24/7", isNew: true, heat: 2 },
  { icon: "🖥", name: "Custom Frontend", desc: "Tailored web interfaces and dashboards" },
  { icon: "⚙️", name: "Advanced Integrations", desc: "API and webhook connections across your stack" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-yellow">
      {children}
    </p>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed text-white/65">{children}</p>
  );
}

export function AboutContent() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent">
        {/* Hero */}
        <section className="bg-persian/20 backdrop-blur-xl px-8 py-16 pb-12">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
              About
            </p>
            <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              About AJ
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
              Automation engineer building business systems with GoHighLevel, n8n, and AI — CRM automation, AI agents, and end-to-end workflows powered by Claude.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-14 px-8 py-16 pb-20 lg:grid-cols-[1fr_340px]">
          {/* Left column — Bio */}
          <div className="flex flex-col gap-10">
            {/* Eyebrow */}
            <ScrollReveal delay={0}>
              <p className="text-sm tracking-wide">
                <span className="text-yellow">→</span>{" "}
                <span className="text-white/40">About AJ</span>
              </p>
            </ScrollReveal>

            {/* Title */}
            <ScrollReveal delay={0.05}>
              <h1 className="text-4xl font-black leading-[1.15] tracking-tight text-white md:text-5xl">
                Engineering
                <br />
                Growth
                <br />
                Through
                <br />
                Structure
              </h1>
            </ScrollReveal>

            {/* Body paragraphs */}
            <ScrollReveal delay={0.1}>
              <BodyText>
                I don&apos;t build one-off tasks — I engineer complete systems.
                Automations, AI workflows, and integrations designed to eliminate
                guesswork, remove manual effort, and run reliably at scale.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <BodyText>
                With over 5 years freelancing and a deep focus on automation, I
                bring a full-stack mindset to every project — combining
                GoHighLevel, n8n, and AI tools like Claude to build systems that
                think, route, and scale on their own.
              </BodyText>
            </ScrollReveal>

            {/* Foundation */}
            <ScrollReveal delay={0.2}>
              <SectionLabel>Foundation — System Thinking</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <BodyText>
                Before I touched a single funnel builder, I spent years studying
                data, logic, and systems thinking. That analytical foundation
                shapes everything I build — from pipeline architecture to
                automation sequencing.
              </BodyText>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <BodyText>
                I don&apos;t guess what might work. I map the customer journey,
                identify friction points, and engineer solutions that are
                measurable and repeatable.
              </BodyText>
            </ScrollReveal>

            {/* What I Do */}
            <ScrollReveal delay={0.35}>
              <SectionLabel>What I Do</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <BodyText>
                I work across GoHighLevel, n8n, and AI automation — building CRM
                systems, multi-channel workflows, AI agents, and app-to-app
                integrations (often powered by Claude) that cut manual work and
                keep operations running on their own.
              </BodyText>
            </ScrollReveal>

            {/* Skill chips */}
            <ScrollReveal delay={0.45}>
              <StaggerChildren className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <span className="inline-block rounded-full border border-white/[0.12] bg-white/[0.07] px-3 py-1.5 text-xs text-white/65">
                      {skill}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </ScrollReveal>

            {/* Flow diagram */}
            <ScrollReveal delay={0.5}>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm px-5 py-4 text-center text-sm font-medium tracking-wide text-white/50">
                Map → Automate → Integrate → Scale
              </div>
            </ScrollReveal>

            {/* System Builds CTA */}
            <ScrollReveal delay={0.52}>
              <Link
                href="/system-builds"
                className="block w-full rounded-xl bg-yellow px-8 py-5 text-center text-lg font-black uppercase tracking-wider text-black transition-all hover:bg-yellow/85 hover:shadow-[0_12px_40px_rgba(234,179,8,0.3)] hover:-translate-y-[2px]"
              >
                See My System Builds &rarr;
              </Link>
            </ScrollReveal>

            {/* Systems + AI */}
            <ScrollReveal delay={0.55}>
              <SectionLabel>Systems + AI (New Edge)</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <BodyText>
                I build AI directly into my automation stack — using Claude, AI
                agents, and tools like n8n for intelligent qualification,
                proposal generation, content engines, and smart routing logic
                that adapts in real time. Automation that doesn&apos;t just run
                tasks — it makes decisions.
              </BodyText>
            </ScrollReveal>

            {/* Value / ROI */}
            <ScrollReveal delay={0.65}>
              <SectionLabel>Value / ROI Positioning</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={0.7}>
              <BodyText>
                What I build isn&apos;t a cost — it&apos;s revenue
                infrastructure. Every funnel, automation, and pipeline I deliver
                is designed to pay for itself, then keep compounding.
              </BodyText>
            </ScrollReveal>

            {/* Blockquote */}
            <ScrollReveal delay={0.75}>
              <blockquote className="border-l-[3px] border-yellow pl-5 italic text-white/50">
                &ldquo;Most businesses plateau because they lack structure — not
                effort. I build the structure so your effort finally
                compounds.&rdquo;
              </blockquote>
            </ScrollReveal>

            {/* Tagline */}
            <ScrollReveal delay={0.8}>
              <p className="italic text-white/30">
                Systems evolve. AI is evolving. And I evolve with both.
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.85}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/consult"
                  className="inline-block rounded-lg bg-persian/20 backdrop-blur-sm border border-persian/30 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-persian/40 hover:border-persian/50 hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]"
                >
                  Book Strategy Call →
                </Link>
                <a
                  href="/aj-bactad-ghl-resume.pdf"
                  download="AJ Bactad - GHL.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-yellow/40 bg-yellow/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-yellow transition-all hover:bg-yellow/20 hover:border-yellow/70"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download My Resume
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Sticky sidebar */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex flex-col gap-6">
              {/* Photo placeholder */}
              <ScrollReveal delay={0.1}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
                  <Image
                    src="/aj-about.webp"
                    alt="Allen Bactad"
                    fill
                    className="object-cover"
                  />
                </div>
              </ScrollReveal>

              {/* Category stack */}
              <StaggerChildren className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <StaggerItem key={cat.name}>
                    <div className="flex items-center gap-3 rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-3 transition-colors hover:border-persian/30 hover:bg-persian/[0.12] hover:text-white">
                      <span className="text-base shrink-0">{cat.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white/65">{cat.name}</span>
                        <p className="text-[0.65rem] text-white/35 mt-0.5 leading-snug">{cat.desc}</p>
                      </div>
                      {cat.isNew && (
                        <span className="ml-auto shrink-0 rounded-full bg-yellow px-1.5 py-0.5 text-[0.55rem] font-extrabold text-black">
                          NEW {"🔥".repeat(cat.heat ?? 1)}
                        </span>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
