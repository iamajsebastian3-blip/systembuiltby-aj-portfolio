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

          {/* Social links */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { name: "Facebook", href: "https://www.facebook.com/Ajbactad29/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
              { name: "Instagram", href: "https://www.instagram.com/aj_automate.co/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/ajbactad29/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
              { name: "Threads", href: "https://www.threads.com/@aj_automate.co", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.2 1.478-.755 2.633-1.657 3.436-1.005.893-2.37 1.364-4.062 1.4-1.243-.028-2.336-.387-3.154-1.036-.869-.69-1.349-1.632-1.349-2.652 0-1.924 1.506-3.393 3.5-3.56 1.303-.11 2.477.158 3.394.77.166.11.32.233.46.364.023-.24.035-.484.035-.733 0-.508-.063-.973-.188-1.386-.257-.85-.737-1.472-1.424-1.847-.747-.408-1.712-.615-2.868-.615l-.076.002c-1.932.046-3.385.86-4.198 2.354l-1.747-.974c1.08-1.983 3.058-3.08 5.572-3.097h.093c1.47 0 2.735.284 3.762.845 1.005.548 1.744 1.363 2.146 2.363a6.78 6.78 0 01.39 2.352c.007.396-.014.79-.063 1.17.558.39 1.026.873 1.378 1.432.748 1.186 1.022 2.608.773 4.008-.37 2.086-1.508 3.756-3.387 4.969-1.648 1.063-3.74 1.633-6.226 1.694z" /></svg> },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.10] hover:border-white/[0.15] transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
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
