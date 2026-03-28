"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Counter } from "@/components/motion/counter";

const titleWords = [
  { text: "I DON'T CHASE", highlight: false },
  { text: "GROWTH. I", highlight: false },
  { text: "ENGINEER", highlight: true },
  { text: "THE SYSTEM", highlight: false },
  { text: "BEHIND IT.", highlight: false },
];

const stats = [
  { value: "5+", label: "Years freelancing" },
  { value: "12mo", label: "Deep automation focus" },
  { value: "GHL", label: "Certified expert" },
];

const badges = [
  "GHL Expert",
  "Google Ads",
  "Local SEO",
  "CRM Automation",
  "Funnel Builder",
];

const metrics = [
  { target: 60, suffix: "%", label: "Avg conversion lift" },
  { target: 2.5, suffix: "×", label: "Revenue multiplier" },
  { target: 48, suffix: "h", label: "Avg turnaround" },
  { target: 100, suffix: "%", label: "Client retention" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 10%, rgba(94,23,235,0.25), transparent), radial-gradient(ellipse 50% 40% at 15% 90%, rgba(246,203,31,0.12), transparent)",
        }}
      />
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-18 px-6 py-24 lg:grid-cols-[1fr_380px] lg:py-32">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-sm text-white/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>
              Available for new clients
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-black leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block ${word.highlight ? "not-italic text-yellow" : "text-white"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2 + i * 0.1,
                }}
              >
                {word.text}
                {word.highlight ? <em className="not-italic">&nbsp;</em> : " "}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-lg text-lg text-text-muted"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Funnels that convert. Automations that scale. Workflows you don&apos;t
            have to babysit.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Link
              href="#contact"
              className="inline-flex items-center rounded-lg bg-persian px-6 py-3 font-semibold text-white transition-colors hover:bg-persian-dark"
            >
              Book Free Consultation &rarr;
            </Link>
            <Link
              href="#portfolio"
              className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Check My Portfolio
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="flex gap-8 border-t border-white/10 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-white">
                  {stat.value}
                </span>
                <span className="text-sm text-text-faint">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — Profile Card */}
        <motion.div
          className="flex flex-col gap-5 rounded-3xl bg-white p-7 shadow-2xl"
          initial={{ opacity: 0, x: 60, rotateY: 8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20,
            delay: 0.6,
          }}
        >
          {/* Card eyebrow */}
          <span className="text-xs font-semibold uppercase tracking-widest text-black/40">
            Growth Systems Consultant
          </span>

          {/* Profile row */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-persian text-sm font-bold text-white">
              AJ
            </div>
            <div>
              <p className="font-bold text-black">Allen Bactad</p>
              <p className="text-sm text-black/50">Automation Builder</p>
            </div>
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-persian/10 px-3 py-1 text-xs font-medium text-persian"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Metric grid */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center rounded-xl bg-black/[0.04] p-3"
              >
                <span className="text-2xl font-extrabold text-black">
                  <Counter
                    target={metric.target}
                    suffix={metric.suffix}
                    className="text-2xl font-extrabold text-black"
                  />
                </span>
                <span className="text-center text-[11px] text-black/45">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
