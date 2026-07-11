"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

// The 6 tools that make up the system. Coords live in a 1200x560 board space so the
// SVG traces and the HTML tiles share one coordinate system (perfect alignment).
// `entry` is an orthogonal path from the tile toward the central AI chip — the pulse flows in.
const tools = [
  { name: "GoHighLevel", logo: "/logos/gohighlevel.png", x: 150, y: 80, entry: "M150 80 H540 V210", dur: "3.4s", delay: "0s" },
  { name: "n8n", logo: "/logos/n8n.svg", x: 1050, y: 80, entry: "M1050 80 H660 V210", dur: "3.9s", delay: "0.6s" },
  { name: "Zapier", logo: "/logos/zapier.svg", x: 90, y: 280, entry: "M90 280 H360 V240 H530", dur: "4.2s", delay: "1.2s" },
  { name: "Trigger.dev", logo: "/logos/trigger.svg", x: 1110, y: 280, entry: "M1110 280 H840 V240 H670", dur: "3.6s", delay: "0.4s" },
  { name: "Claude", logo: "/logos/claude.svg", x: 200, y: 480, entry: "M200 480 H540 V350", dur: "4.5s", delay: "1.8s" },
  { name: "GPT", logo: "/logos/openai.svg", invert: true, x: 1000, y: 480, entry: "M1000 480 H660 V350", dur: "4.0s", delay: "0.9s" },
];

// Decorative faint traces (no pulse) for circuit density
const decor = [
  "M600 178 V70 H960",
  "M600 384 V500 H300",
  "M496 264 H340 V140",
  "M704 296 H940 V440",
  "M548 178 V110",
  "M652 384 V450 H820",
];

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function LogoTile({ name, logo, invert }: { name: string; logo: string; invert?: boolean }) {
  return (
    <div className="group flex flex-col items-center gap-2.5">
      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.04] backdrop-blur-sm transition-all group-hover:border-persian/50 group-hover:bg-white/[0.07] group-hover:shadow-[0_0_28px_rgba(94,23,235,0.3)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`${name} logo`}
          width={34}
          height={34}
          className="h-[34px] w-[34px] object-contain"
          style={invert ? { filter: "invert(1) brightness(1.6)" } : undefined}
          loading="lazy"
        />
      </div>
      <span className="text-xs font-semibold text-white/70">{name}</span>
    </div>
  );
}

// IC chip pin-legs around the central hub
const leftPins = [222, 244, 266, 288, 310, 332];
const rightPins = leftPins;
const topPins = [546, 573, 600, 627, 654];
const bottomPins = topPins;

export function TechStack() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-persian/12 blur-[160px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-persian-light">
            System Architecture
          </p>
          <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
            I DON&apos;T CHASE GROWTH. I ENGINEER{" "}
            <span className="bg-gradient-to-r from-persian-light via-persian to-yellow bg-clip-text text-transparent">
              THE SYSTEM
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55">
            Growth isn&apos;t luck&mdash;it&apos;s architecture. I wire your CRM, automations, and AI into one
            connected system, so every tool below runs as a single engine that works while you scale.
          </p>
        </ScrollReveal>
      </div>

      {/* ---------- Desktop: circuit board ---------- */}
      <div className="relative mx-auto mt-12 hidden w-full max-w-6xl px-6 lg:block">
        <div className="relative aspect-[1200/560] w-full">
          <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="ts-pulse" gradientUnits="userSpaceOnUse" x1="0" y1="280" x2="600" y2="280">
                <stop offset="0%" stopColor="#5e17eb" />
                <stop offset="65%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#f6cb1f" />
              </linearGradient>
              <filter id="ts-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* decorative faint traces */}
            {decor.map((d, i) => (
              <path key={`decor-${i}`} d={d} fill="none" stroke="#5e17eb" strokeOpacity={0.14} strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round" />
            ))}

            {/* chip pin-legs */}
            {leftPins.map((y, i) => <line key={`lp-${i}`} x1={530} y1={y} x2={500} y2={y} stroke="#7c3aed" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />)}
            {rightPins.map((y, i) => <line key={`rp-${i}`} x1={670} y1={y} x2={700} y2={y} stroke="#7c3aed" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />)}
            {topPins.map((x, i) => <line key={`tp-${i}`} x1={x} y1={210} x2={x} y2={182} stroke="#7c3aed" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />)}
            {bottomPins.map((x, i) => <line key={`bp-${i}`} x1={x} y1={350} x2={x} y2={378} stroke="#7c3aed" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />)}

            {/* tool traces (base) */}
            {tools.map((t, i) => (
              <path key={`base-${i}`} d={t.entry} fill="none" stroke="#5e17eb" strokeOpacity={0.28} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {/* tool traces (animated pulse) */}
            {tools.map((t, i) => (
              <path
                key={`pulse-${i}`}
                className="circuit-pulse"
                d={t.entry}
                fill="none"
                stroke="url(#ts-pulse)"
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="0.16 0.84"
                filter="url(#ts-glow)"
                style={{ ["--dur" as string]: t.dur, animationDelay: t.delay }}
              />
            ))}
          </svg>

          {/* central AI chip */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="glow-border relative flex h-32 w-32 items-center justify-center rounded-[26px] bg-[#0d0b16]">
              <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-persian/15 blur-xl" />
              <span className="relative bg-gradient-to-b from-white to-white/70 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                AI
              </span>
            </div>
          </div>

          {/* tool tiles */}
          {tools.map((t) => (
            <div
              key={t.name}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(t.x, 1200), top: pct(t.y, 560) }}
            >
              <LogoTile name={t.name} logo={t.logo} invert={t.invert} />
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile: chip + grid ---------- */}
      <div className="mt-12 px-6 lg:hidden">
        <div className="mx-auto mb-10 flex justify-center">
          <div className="glow-border relative flex h-24 w-24 items-center justify-center rounded-[22px] bg-[#0d0b16]">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-3xl font-black text-transparent">AI</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-md grid-cols-3 gap-y-8">
          {tools.map((t) => (
            <LogoTile key={t.name} name={t.name} logo={t.logo} invert={t.invert} />
          ))}
        </div>
      </div>
    </section>
  );
}
