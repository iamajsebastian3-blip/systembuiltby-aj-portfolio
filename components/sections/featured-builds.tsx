"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";

// Featured builds shown as landscape (Canva-size) thumbnail cards in a slideshow.
// videoId maps to the YouTube walkthrough (plays inline in a lightbox).
const cards = [
  { title: "WooCommerce → GHL", tag: "Migration", image: "/system-builds/migrating-woocommerce-ghl.webp", videoId: "SlZROJx4Obo" },
  { title: "Appointment Booking", tag: "GHL · Calendars", image: "/system-builds/appointment-booking.webp", videoId: "9FOymB9sZEs" },
  { title: "Weekly AI Research", tag: "Claude · Trigger.dev", image: "/system-builds/claude-test-project.webp", videoId: "M3OK_1BNEco" },
  { title: "LinkedIn Automation", tag: "Claude · Auto-Publish", image: "/system-builds/linkedin-content-automation.webp", videoId: "_zWVgnQzDuI" },
  { title: "GHL → ClickUp Alerts", tag: "GHL · Zapier", image: "/system-builds/sb-ghl-clickup.webp", videoId: "cBkmitMksrk" },
  { title: "Deal-Won Alerts", tag: "GHL · Discord · Slack", image: "/system-builds/sb-deal-won.webp", videoId: "6WpbbpRR1ZQ" },
];

// Abstract AI-system network for the background
const nodes = [
  [120, 140], [320, 80], [520, 200], [240, 340], [60, 520], [420, 560],
  [700, 120], [880, 300], [1080, 160], [1260, 320], [1000, 520], [1300, 600],
  [760, 640], [1150, 700], [560, 400], [980, 720],
];
const edges = [
  [0, 1], [1, 2], [0, 3], [3, 4], [3, 5], [2, 6], [6, 7], [7, 8],
  [8, 9], [7, 10], [9, 11], [10, 13], [5, 12], [12, 10], [2, 7], [10, 11],
  [2, 14], [14, 5], [14, 7], [7, 15], [15, 12], [10, 15],
];
const pulses = [
  { e: [2, 6], dur: "3.6s", delay: "0s" },
  { e: [6, 7], dur: "4.1s", delay: "0.8s" },
  { e: [7, 8], dur: "3.4s", delay: "1.4s" },
  { e: [7, 10], dur: "4.4s", delay: "0.4s" },
  { e: [10, 13], dur: "3.9s", delay: "1.1s" },
  { e: [3, 5], dur: "4.2s", delay: "1.8s" },
  { e: [14, 7], dur: "3.7s", delay: "0.6s" },
  { e: [7, 15], dur: "4.0s", delay: "1.5s" },
];
const edgePath = (a: number, b: number) => `M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`;

function BuildCard({ card, onPlay }: { card: (typeof cards)[number]; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play ${card.title} walkthrough`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.10] text-left shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-[3px] hover:border-persian/40 hover:shadow-[0_20px_60px_rgba(94,23,235,0.28)]"
    >
      <div className="relative aspect-[16/10] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image} alt={card.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {/* Play affordance, always visible (mobile has no hover) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-persian/75">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
        <span className="text-sm font-bold text-white">{card.title}</span>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 backdrop-blur-sm">
          {card.tag}
        </span>
      </div>
    </button>
  );
}

function VideoLightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Build walkthrough video"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        >
          ✕
        </button>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Build walkthrough"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export function FeaturedBuilds() {
  const [idx, setIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const n = cards.length;
  const visible = [cards[idx % n], cards[(idx + 1) % n]];
  const next = () => setIdx((i) => (i + 1) % n);
  const prev = () => setIdx((i) => (i - 1 + n) % n);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden py-20">
      {/* ---------- AI-system background ---------- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="fb-pulse" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="800">
              <stop offset="0%" stopColor="#5e17eb" />
              <stop offset="70%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#f6cb1f" />
            </linearGradient>
            <filter id="fb-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {edges.map(([a, b], i) => (
            <path key={`e-${i}`} d={edgePath(a, b)} stroke="#5e17eb" strokeOpacity={0.4} strokeWidth={1.5} fill="none" />
          ))}
          {pulses.map((p, i) => (
            <path
              key={`p-${i}`}
              className="circuit-pulse"
              d={edgePath(p.e[0], p.e[1])}
              stroke="url(#fb-pulse)"
              strokeWidth={2.75}
              fill="none"
              pathLength={1}
              strokeDasharray="0.22 0.78"
              filter="url(#fb-glow)"
              style={{ ["--dur" as string]: p.dur, animationDelay: p.delay }}
            />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={`n-${i}`} cx={x} cy={y} r={3.5} fill="#7c3aed" fillOpacity={0.9} />
          ))}
        </svg>
        <Parallax className="absolute inset-0" speed={90}>
          <div className="absolute right-[8%] top-[6%] h-[460px] w-[460px] rounded-full bg-persian/28 blur-[140px]" />
          <div className="absolute bottom-[4%] left-[16%] h-[340px] w-[340px] rounded-full bg-yellow/14 blur-[130px]" />
        </Parallax>
        {/* lighter left scrim so the network stays visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08060e] via-[#08060e]/65 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08060e] to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        {/* LEFT, statement */}
        <div>
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-persian-light">
              Selected Work
            </p>
            <h2 className="text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
              REAL SYSTEMS,
              <br />
              <span className="bg-gradient-to-r from-persian-light via-persian to-yellow bg-clip-text text-transparent">
                BUILT TO RUN.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
              A look at the automations, funnels, and AI workflows I&apos;ve engineered for real
              businesses, each one a working system, not a one-off task.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/system-builds"
                  className="inline-flex items-center rounded-xl border border-persian/60 bg-persian px-7 py-3.5 font-semibold text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_30px_rgba(94,23,235,0.35)]"
                >
                  Explore Builds &rarr;
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/consult"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/[0.04] px-7 py-3.5 font-semibold text-white transition-all hover:border-yellow/50 hover:bg-white/[0.08]"
                >
                  Book a Free Consultation &rarr;
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>

        {/* RIGHT, slideshow (2 cards) */}
        <div className="flex flex-col gap-5">
          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-5"
              >
                {visible.map((c) => (
                  <BuildCard key={c.title} card={c} onPlay={() => setActiveVideo(c.videoId)} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous builds"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 transition-all hover:border-persian/50 hover:bg-white/[0.10] hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex flex-1 items-center gap-1.5">
              {cards.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-yellow" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next builds"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-persian/60 bg-persian text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_20px_rgba(94,23,235,0.4)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>

      {activeVideo && (
        <VideoLightbox videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}
