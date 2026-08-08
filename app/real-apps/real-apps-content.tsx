"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { AppCard, type App } from "./app-card";

const apps: App[] = [
  {
    title: "Funnel Builder",
    category: "Live App",
    description:
      "A full-stack app I built, turn the 10P framework into copy-ready AI prompts for every funnel section. Sign up and try it.",
    emoji: "🧩",
    image: "/real-apps/funnel-builder.webp",
    href: "https://funnel-section-builder.vercel.app/",
    cta: "Open Builder",
  },
  {
    title: "AI Learning Hub",
    category: "Live App",
    description:
      "My personal learning hub for mastering AI-specialist skills, lessons, references, and resources.",
    emoji: "🎓",
    image: "/real-apps/ai-learning-hub.webp",
    href: "https://ai-specialist-learning-hub.vercel.app/",
    cta: "Open Learning Hub",
  },
  {
    title: "Next App In Build",
    category: "In Build",
    description:
      "Another full-stack build is in progress. Same approach, a real problem, a real database, and a real app you can sign up for.",
    emoji: "🚧",
  },
];

export function RealAppsContent() {
  return (
    <PageTransition>
      {/* Intro + video (no video yet, frame shows Coming Soon) */}
      <section className="relative px-6 pt-20 pb-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Real Apps, Not Demos
            </p>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Products I Built, Shipped, And{" "}
              <span className="text-persian-light">Actually Run.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
              Not automations or templates, full apps with auth, databases, and
              real users. Sign up, click around, and see how they work.
            </p>
          </div>

          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Walkthrough Coming Soon
          </p>

          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl
              border border-white/[0.08] bg-gradient-to-br from-[#1a1245] via-[#0f0a25] to-black
              shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.18)_0%,transparent_70%)]" />
            <span className="relative rounded-full border border-yellow/25 bg-yellow/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-yellow backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Section 01, the apps */}
      <section className="relative px-5 py-14 sm:px-6 md:py-20">
        <div className="pointer-events-none absolute top-1/3 left-[15%] h-[400px] w-[400px] rounded-full bg-persian/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8 md:mb-10">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow md:text-xs">
                Section 01
              </p>
              <h2 className="mb-2 text-2xl font-bold leading-tight text-white md:text-4xl">
                Live <span className="text-yellow">Apps</span>
              </h2>
              <p className="max-w-xl text-[14px] leading-relaxed text-white/55 md:text-base">
                Full products I designed, built, and deployed end to end.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.title} app={app} />
            ))}
          </StaggerChildren>
        </div>
      </section>
    </PageTransition>
  );
}
