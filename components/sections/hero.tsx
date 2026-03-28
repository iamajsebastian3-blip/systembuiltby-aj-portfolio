"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Counter } from "@/components/motion/counter";

const badges = [
  "GHL Expert",
  "Funnel Builder",
  "CRM Automation",
  "A2P 10DLC",
  "Website Builder",
  "Workflow Automation",
];

const metrics = [
  { target: 60, suffix: "%", label: "Avg conversion lift" },
  { target: 2.5, suffix: "\u00D7", label: "Revenue multiplier" },
  { target: 48, suffix: "h", label: "Avg turnaround" },
  { target: 100, suffix: "%", label: "Client retention" },
];

const profileStats = [
  { value: "5+", label: "Years freelancing" },
  { value: "12mo", label: "Deep automation focus" },
  { value: "GHL", label: "Certified expert" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Extra hero glows */}
      <div className="pointer-events-none absolute top-[5%] right-[15%] w-[400px] h-[400px] rounded-full bg-persian/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[15%] left-[5%] w-[350px] h-[300px] rounded-full bg-yellow/8 blur-[100px]" />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-24 lg:grid-cols-[1fr_440px] lg:py-28">
        {/* LEFT — Text */}
        <div className="flex flex-col gap-6 pt-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white/70">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>
              Available for new clients
            </span>
          </motion.div>

          {/* Title — large, block-level lines */}
          <h1 className="text-5xl font-black leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
            <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}>
              I DON&apos;T CHASE
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}>
              GROWTH. I{" "}
              <span className="text-yellow">ENGINEER</span>
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}>
              THE SYSTEM
            </motion.span>
            <motion.span className="block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}>
              BEHIND IT.
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            I build HighLevel systems that capture, nurture, and close &mdash; on autopilot. Your CRM, funnels, and automations, engineered to run without you.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Link
              href="/consult"
              className="inline-flex items-center rounded-xl bg-persian px-6 py-3 font-semibold text-white transition-all border border-persian/60 hover:shadow-[0_0_30px_rgba(94,23,235,0.35)] hover:bg-persian-dark"
            >
              Book Free Consultation &rarr;
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center rounded-xl px-6 py-3 font-semibold transition-all bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] text-white/80 hover:bg-white/[0.07]"
            >
              Check My Portfolio
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — Image placeholder + Profile card */}
        <div className="flex flex-col gap-5">
          {/* Profile image */}
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-[0_16px_64px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
          >
            <Image
              src="/aj-profile.png"
              alt="Allen Bactad — Growth Systems Consultant"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Profile Card */}
          <motion.div
            className="flex flex-col gap-5 rounded-2xl p-6 bg-white/[0.05] backdrop-blur-xl border border-white/[0.10] shadow-[0_16px_64px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Growth Systems Consultant
            </span>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-persian/40 border border-persian/30 text-sm font-bold text-white">
                AJ
              </div>
              <div>
                <p className="font-bold text-white">Allen Bactad</p>
                <p className="text-sm text-white/40">Automation Builder</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.05] border border-white/[0.08] text-persian-light"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center rounded-xl p-3 bg-white/[0.035] border border-white/[0.06]"
                >
                  <Counter
                    target={metric.target}
                    suffix={metric.suffix}
                    className="text-xl font-extrabold text-white"
                  />
                  <span className="text-center text-[10px] text-white/35">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex justify-between">
              {profileStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <span className="text-lg font-extrabold text-white">{stat.value}</span>
                  <span className="text-[10px] text-white/30">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
