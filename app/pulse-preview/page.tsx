"use client";

import { useState } from "react";
import { PulseBeams } from "@/components/ui/pulse-beams";

/* ---------- Beam paths for the original demo ---------- */
const demoBeams = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 },
    ],
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 },
    ],
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 },
    ],
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: { x1: "0%", x2: "10%", y1: "-40%", y2: "-20%" },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 },
    ],
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear" as const,
        repeatDelay: 2,
        delay: Math.random() * 2,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 },
    ],
  },
];

/* ---------- Brand-matched palette (purple/persian) ---------- */
const brandColors = {
  start: "#7c3aed",  // persian-light
  middle: "#5e17eb", // persian
  end: "#f6cb1f",    // yellow accent
};

/* ---------- Original cyan/violet palette ---------- */
const originalColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
};

type View = "demo-original" | "demo-brand" | "cta-button" | "intro" | null;

export default function PulsePreviewPage() {
  const [view, setView] = useState<View>(null);

  const cards: Array<{ id: View; label: string; desc: string }> = [
    { id: "demo-original", label: "1. Original Demo (Cyan/Violet)", desc: "The component as-shipped — with cyan→violet→purple beams." },
    { id: "demo-brand", label: "2. Demo (Brand Purple/Yellow)", desc: "Same beams, swapped to your portfolio colors." },
    { id: "cta-button", label: "3. CTA with Pulse Beams", desc: "How it would look behind a primary CTA like 'Book Strategy Call'." },
    { id: "intro", label: "4. Intro: Allen Bactad + Beams", desc: "Your name reveal animation enhanced with pulse beams." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0517] text-white px-8 py-16">
      <div className="mx-auto max-w-[900px]">
        <h1 className="mb-3 text-3xl font-black tracking-tight">PulseBeams Previews</h1>
        <p className="mb-10 text-white/60">Click any option to see it full-screen. Click anywhere to close.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setView(c.id)}
              className="text-left rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 transition-all hover:border-persian/40 hover:bg-white/[0.07] hover:-translate-y-[2px]"
            >
              <h3 className="mb-1 text-base font-bold text-white">{c.label}</h3>
              <p className="text-sm text-white/55">{c.desc}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-persian-light">
                ▶ Play preview
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 text-xs text-white/40">
          Note: Nothing on the live site has been touched yet. This is preview only.
        </p>
      </div>

      {view && (
        <div
          onClick={() => setView(null)}
          className="fixed inset-0 z-50 cursor-pointer"
        >
          <div className="absolute top-4 right-4 z-[60] text-[0.6rem] font-bold uppercase tracking-widest text-white/50">
            Click anywhere to close
          </div>

          {view === "demo-original" && (
            <PulseBeams beams={demoBeams} gradientColors={originalColors} className="bg-slate-950">
              <DemoButton />
            </PulseBeams>
          )}

          {view === "demo-brand" && (
            <PulseBeams beams={demoBeams} gradientColors={brandColors} className="bg-[#0a0517]">
              <DemoButton brand />
            </PulseBeams>
          )}

          {view === "cta-button" && (
            <PulseBeams beams={demoBeams} gradientColors={brandColors} className="bg-[#0a0517]">
              <BookStrategyCTA />
            </PulseBeams>
          )}

          {view === "intro" && (
            <PulseBeams beams={demoBeams} gradientColors={brandColors} className="bg-black">
              <IntroPreview />
            </PulseBeams>
          )}
        </div>
      )}
    </div>
  );
}

function DemoButton({ brand }: { brand?: boolean }) {
  return (
    <button className="bg-slate-800 w-[320px] z-40 h-[120px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className={`absolute inset-0 rounded-full ${brand ? "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(124,58,237,0.6)_0%,rgba(124,58,237,0)_75%)]" : "bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)]"} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
      </span>
      <div className="relative flex justify-center w-[320px] text-center space-x-2 h-[120px] items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
        <span className="md:text-4xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300">
          Connect
        </span>
      </div>
    </button>
  );
}

function BookStrategyCTA() {
  return (
    <div className="text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-persian-light">
        Ready to scale?
      </p>
      <button className="relative group rounded-2xl px-12 py-6 text-lg font-black uppercase tracking-wider text-white shadow-2xl bg-persian/30 backdrop-blur-md border border-persian/50 ring-1 ring-white/10 transition-all hover:bg-persian/50 hover:border-persian">
        <span className="relative z-10">Book Strategy Call &rarr;</span>
        <span className="absolute inset-0 rounded-2xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(124,58,237,0.6)_0%,rgba(124,58,237,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>
    </div>
  );
}

function IntroPreview() {
  return (
    <div className="text-center px-6">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-persian-light">Portfolio</p>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
        ALLEN BACTAD
      </h1>
    </div>
  );
}
