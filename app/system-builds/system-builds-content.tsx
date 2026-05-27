"use client";

import { useState } from "react";
import Image from "next/image";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

type SystemBuild = {
  title: string;
  category: string;
  description: string;
  duration?: string;
  videoId?: string;
  emoji: string;
  image?: string;
};

const builds: SystemBuild[] = [
  {
    title: "Lead Capture → Conversion Pipeline",
    category: "GHL Workflow",
    description:
      "How I architect a full lead-capture system — from form trigger to qualification, auto-tagging, and conversion-stage routing.",
    emoji: "🔥",
  },
  {
    title: "Appointment Booking Automation",
    category: "GHL Workflow",
    description:
      "Calendar sync, multi-touch reminders, no-show recovery, and post-appointment follow-up — built from scratch for myoldretirement.com.",
    emoji: "📅",
    image: "/system-builds/appointment-booking.png",
    videoId: "9FOymB9sZEs",
  },
  {
    title: "Sales Pipeline (High-Ticket)",
    category: "GHL Workflow",
    description:
      "Engineered for high-ticket offers — discovery, proposal, negotiation, and close stages with automated follow-up logic.",
    emoji: "💰",
  },
  {
    title: "Re-engagement Nurture Sequence",
    category: "Automation",
    description:
      "Wakes up cold leads with a 14–30 day multi-touch nurture — SMS, email, reply detection, and re-qualification.",
    emoji: "🔁",
  },
  {
    title: "Webinar Funnel Build",
    category: "Funnel",
    description:
      "Full webinar funnel walkthrough — registration page, confirmation flow, replay logic, and post-event sequence.",
    emoji: "🎯",
  },
  {
    title: "Client Onboarding System",
    category: "Pipeline",
    description:
      "Post-sale delivery system — welcome sequence, kickoff scheduling, milestone tracking, and testimonial capture.",
    emoji: "🏆",
  },
];

function BuildCard({ build }: { build: SystemBuild }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(build.videoId);

  return (
    <StaggerItem>
      <div className="group flex h-full flex-col rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
        {/* Video / thumbnail area */}
        <div className="relative aspect-[3/2] bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-[#2a0f6a]/30 flex items-center justify-center overflow-hidden">
          {playing && hasVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${build.videoId}?autoplay=1`}
              title={build.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <>
              {build.image ? (
                <>
                  <Image
                    src={build.image}
                    alt={build.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </>
              ) : (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.18)_0%,transparent_70%)]" />
                  <span className="relative text-5xl opacity-60 group-hover:opacity-90 transition-opacity">
                    {build.emoji}
                  </span>
                </>
              )}

              {hasVideo ? (
                <button
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${build.title}`}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <span className="w-16 h-16 rounded-full bg-white/[0.12] border border-white/[0.25] backdrop-blur-sm flex items-center justify-center group-hover:bg-yellow group-hover:border-yellow transition-all duration-300">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1 group-hover:fill-black transition-colors"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              ) : (
                <span className="absolute top-3 right-3 rounded-full bg-yellow/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow border border-yellow/25 backdrop-blur-sm">
                  Coming Soon
                </span>
              )}

              {hasVideo && build.duration && (
                <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                  {build.duration}
                </span>
              )}
            </>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-persian-light">
            {build.category}
          </p>
          <h3 className="mb-2 text-base font-bold leading-snug text-white">
            {build.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-white/55">
            {build.description}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export function SystemBuildsContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-persian/20 backdrop-blur-xl py-14 md:py-20 px-6 text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
              System Builds &amp; Walkthroughs
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
              See How I <span className="text-yellow">Engineer</span> Every System
            </h1>
            <p className="text-white/70 text-[15px] md:text-lg max-w-xl mx-auto leading-relaxed">
              Raw screen-recorded walkthroughs of the workflows, pipelines, and
              automations I build for clients. No fluff &mdash; just the actual
              logic, decisions, and configuration behind each system.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="relative py-14 md:py-20 px-5 sm:px-6">
        <div className="pointer-events-none absolute top-1/3 left-[15%] w-[400px] h-[400px] bg-persian/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto">
          <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {builds.map((build) => (
              <BuildCard key={build.title} build={build} />
            ))}
          </StaggerChildren>

          {/* Footnote */}
          <ScrollReveal>
            <p className="mt-10 md:mt-12 text-center text-sm text-white/40 px-4">
              New walkthroughs added regularly. Want a custom build recorded?{" "}
              <a
                href="/consult"
                className="text-yellow hover:underline font-medium"
              >
                Book a free consultation
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
