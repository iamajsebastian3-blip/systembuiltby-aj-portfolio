"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  GLASSMORPHISM PREVIEW v4                                           */
/*  Fixes: spacing, carousel size, hero layout, stats in profile card  */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const badges = ["GHL Expert", "Google Ads", "Local SEO", "CRM Automation", "Funnel Builder"];

const metrics = [
  { value: "60%", label: "Avg conversion lift" },
  { value: "2.5\u00D7", label: "Revenue multiplier" },
  { value: "48h", label: "Avg turnaround" },
  { value: "100%", label: "Client retention" },
];

const profileStats = [
  { value: "5+", label: "Years freelancing" },
  { value: "12mo", label: "Deep automation focus" },
  { value: "GHL", label: "Certified expert" },
];

const philosophyModules = [
  { id: "MOD_01", title: "Structure Before Scale", body: "I build the foundation first so growth doesn\u2019t break your business architecture." },
  { id: "MOD_02", title: "Systems Over Tools", body: "Tools change. Logic doesn\u2019t. I build the infrastructure layer, not the software dependency." },
  { id: "MOD_03", title: "Clarity and Execution", body: "Every trigger, tag, and transition serves a measurable function. No wasted motion." },
  { id: "MOD_04", title: "Intentional Automation", body: "Automation should feel human \u2014 not mechanical. Scale without sacrificing experience." },
];

const services = [
  { rank: "01", icon: "\uD83D\uDD25", title: "Funnel & Website Systems", items: ["GHL funnels", "Landing pages", "Conversion optimization"] },
  { rank: "02", icon: "\uD83D\uDD25", title: "CRM & Pipeline Systems", items: ["Pipeline setup", "Lead tracking", "Segmentation"] },
  { rank: "03", icon: "\uD83D\uDD25", title: "Automation & Workflows", items: ["Email/SMS sequences", "Lead nurturing", "Re-engagement"] },
  { rank: "04", icon: "\uD83D\uDCC5", title: "Booking Systems", items: ["Calendars", "Reminders", "No-show reduction"] },
  { rank: "05", icon: "\uD83D\uDCF2", title: "A2P 10DLC Setup", items: ["Registration", "Compliance", "Deliverability"], isNew: true },
  { rank: "06", icon: "\uD83E\uDD16", title: "AI Chatbot Systems", items: ["AI conversation setup", "Lead qualification", "Booking bots"], isNew: true },
];

const testimonials = [
  { name: "Claire Montero", role: "7-Figure Service Brand", initials: "CM", quote: "AJ didn\u2019t just \u2018set up\u2019 our HighLevel. He rebuilt the entire logic behind how our leads move." },
  { name: "Marcus Delgado", role: "Consulting Firm", initials: "MD", quote: "We hired AJ to fix broken workflows. What we got was a fully engineered sales infrastructure." },
  { name: "Ethel Navarro", role: "B2B Service Company", initials: "EN", quote: "Most people know the tools. AJ understands the system behind them. He thinks in infrastructure." },
];

const faqs = [
  { q: "How fast will I start getting leads?", a: "Most clients see automated leads within 7\u201314 days post-launch." },
  { q: "Will this work for my industry?", a: "Systems are industry-agnostic. The infrastructure adapts to your sales process." },
  { q: "What do you need from me to start?", a: "Access to your tools, a 30-minute kickoff call, and your current offer details." },
  { q: "How long does the build take?", a: "Starter systems go live in 5\u20137 business days. Complex builds take 10\u201314 days." },
];

/* ------------------------------------------------------------------ */
/*  TOOLKIT LOGOS                                                      */
/* ------------------------------------------------------------------ */

const toolkitItems = [
  {
    name: "GoHighLevel",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#00C853" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontWeight="900" fontSize="18" fontFamily="Inter, sans-serif">G</text>
      </svg>
    ),
  },
  {
    name: "Zapier",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#FF4A00" />
        <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Figma",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#1e1e1e" />
        <circle cx="16" cy="14" r="3.5" fill="#F24E1E" />
        <circle cx="24" cy="14" r="3.5" fill="#FF7262" />
        <circle cx="16" cy="22" r="3.5" fill="#A259FF" />
        <circle cx="24" cy="22" r="3.5" fill="#1ABCFE" />
        <circle cx="16" cy="30" r="3.5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: "Claude",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#D4A574" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontWeight="800" fontSize="20" fontFamily="Georgia, serif">C</text>
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#10A37F" />
        <text x="20" y="26" textAnchor="middle" fill="white" fontWeight="800" fontSize="16" fontFamily="Inter, sans-serif">AI</text>
      </svg>
    ),
  },
  {
    name: "VS Code",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#007ACC" />
        <path d="M28 10L16 20L28 30V10Z" fill="white" fillOpacity="0.9" />
        <path d="M16 20L11 16V24L16 20Z" fill="white" fillOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Canva",
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#00C4CC" />
        <text x="20" y="27" textAnchor="middle" fill="white" fontWeight="800" fontSize="20" fontFamily="Inter, sans-serif">C</text>
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  TOOLKIT MARQUEE — bigger cards, fills space                        */
/* ------------------------------------------------------------------ */

function ToolkitMarquee() {
  const tripled = [...toolkitItems, ...toolkitItems, ...toolkitItems];

  return (
    <section className="relative py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/25">
          Toolkit I Use Daily
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#08060e] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#08060e] to-transparent" />

        {/* Track */}
        <div className="flex animate-marquee gap-6 whitespace-nowrap">
          {tripled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-4 shrink-0 rounded-2xl px-7 py-4
                bg-white/[0.04] backdrop-blur-sm
                border border-white/[0.07]
                transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
            >
              {item.logo}
              <span className="text-base font-bold text-white/60">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BACKGROUND                                                         */
/* ------------------------------------------------------------------ */

function DarkBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08060e]">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#2a0a5e]/60 blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a0640]/70 blur-[160px]" />
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#1e0a50]/40 blur-[140px]" />
        <div className="absolute bottom-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#3a0f7a]/25 blur-[100px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO — redesigned layout                                           */
/*  Left: text + CTAs  |  Right: placeholder image + profile card      */
/* ------------------------------------------------------------------ */

function GlassHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 py-24 lg:grid-cols-[1fr_440px] lg:py-28">
        {/* LEFT — Text */}
        <div className="flex flex-col gap-6 pt-8">
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm
              bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white/70">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>
              Available for new clients
            </span>
          </motion.div>

          {/* Title — proper spacing */}
          <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
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

          {/* Subtitle — GHL focused */}
          <motion.p className="max-w-lg text-lg text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            I build HighLevel systems that capture, nurture, and close &mdash; on autopilot. Your CRM, funnels, and automations, engineered to run without you.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <Link
              href="#"
              className="inline-flex items-center rounded-xl bg-persian px-6 py-3 font-semibold text-white transition-all border border-persian/60 hover:shadow-[0_0_30px_rgba(94,23,235,0.35)] hover:bg-persian-dark"
            >
              Book Free Consultation &rarr;
            </Link>
            <Link
              href="#"
              className="inline-flex items-center rounded-xl px-6 py-3 font-semibold transition-all
                bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] text-white/80
                hover:bg-white/[0.07]"
            >
              Check My Portfolio
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — Placeholder image + Profile card stacked */}
        <div className="flex flex-col gap-5">
          {/* Placeholder image */}
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden
              bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]
              shadow-[0_16px_64px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
          >
            {/* Gradient placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-persian/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <p className="text-xs text-white/20 uppercase tracking-widest font-semibold">Your Image Here</p>
              </div>
            </div>
          </motion.div>

          {/* Profile Card — contains stats now */}
          <motion.div
            className="flex flex-col gap-5 rounded-2xl p-6
              bg-white/[0.05] backdrop-blur-xl border border-white/[0.10]
              shadow-[0_16px_64px_rgba(0,0,0,0.5)]"
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

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="px-3 py-1 text-xs font-medium rounded-full
                  bg-white/[0.05] border border-white/[0.08] text-persian-light">
                  {badge}
                </span>
              ))}
            </div>

            {/* Metrics 2x2 */}
            <div className="grid grid-cols-2 gap-2.5">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col items-center rounded-xl p-3
                  bg-white/[0.035] border border-white/[0.06]">
                  <span className="text-xl font-extrabold text-white">{metric.value}</span>
                  <span className="text-center text-[10px] text-white/35">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Stats row — moved here from hero left */}
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

/* ------------------------------------------------------------------ */
/*  VAULT                                                              */
/* ------------------------------------------------------------------ */

function GlassVault() {
  const operationalItems = [
    "Funnels are underperforming against expected conversion benchmarks",
    "Automations are fragmented or improperly triggered",
    "Leads are leaking between pipeline stages",
    "The system feels complex, not controlled",
  ];
  const engineeringItems = [
    "You\u2019re unsure how to structure your lead flow",
    "You don\u2019t want to build a system twice",
    "You need automation done correctly the first time",
    "You want growth without operational chaos",
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-white/30">
            Is This You?
          </span>
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
            Whether Your System Exists Or Needs to Be Built.
          </h2>
        </div>

        <div className="rounded-2xl p-5 md:p-8
          bg-white/[0.03] backdrop-blur-md border border-white/[0.06]
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="p-6 rounded-xl transition-all duration-300
              bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
              hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.035] border border-white/[0.06]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10l3 3 7-7" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">System Operational</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {operationalItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-persian-light shrink-0" />
                    <span className="text-sm text-white/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl transition-all duration-300
              bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
              hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/15">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M6 6l8 8M14 6l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">System Needs Engineering</h3>
              </div>
              <ul className="flex flex-col gap-3">
                {engineeringItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 text-sm font-bold text-red-400/70">!</span>
                    <span className="text-sm text-white/50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PHILOSOPHY                                                         */
/* ------------------------------------------------------------------ */

function GlassPhilosophy() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
            Methodology
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            The System-First Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {philosophyModules.map((mod) => (
            <motion.div
              key={mod.id}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-7 rounded-xl transition-all duration-300
                bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
                hover:bg-white/[0.07] hover:border-white/[0.12]
                hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]"
            >
              <span className="mb-3 inline-block text-xs font-semibold tracking-widest text-yellow/80">
                {mod.id}
              </span>
              <h3 className="mb-2 text-lg font-extrabold text-white">{mod.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">{mod.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */

function GlassServices() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute top-1/2 left-[-5%] w-[400px] h-[400px] bg-[#2a0a5e]/30 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="relative mx-auto max-w-[1100px] px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-yellow justify-center">
            <span className="w-4 h-0.5 bg-yellow rounded-full" />
            Services
          </div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-white uppercase mt-2">
            HighLevel Setup &amp;<br />Optimization
          </h2>
          <p className="text-sm text-white/35 italic mt-2 max-w-[520px] mx-auto">
            8 core service areas engineered for your sales operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={service.title}
                layout
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className={`relative p-6 cursor-pointer transition-all duration-300 overflow-hidden rounded-xl backdrop-blur-sm ${
                  isExpanded
                    ? "bg-white/[0.06] border border-persian/20 shadow-[0_8px_32px_rgba(94,23,235,0.1)]"
                    : "bg-white/[0.025] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.08]"
                }`}
              >
                {isExpanded && (
                  <div className="absolute -top-16 -right-16 w-40 h-40 bg-[radial-gradient(circle,rgba(94,23,235,0.15),transparent_70%)] pointer-events-none" />
                )}

                <div className="flex items-center gap-3 relative z-10">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold
                    bg-white/[0.035] border border-white/[0.06] text-white/40">
                    {service.rank}
                  </span>
                  <span className="text-xl shrink-0">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-extrabold text-white tracking-tight">{service.title}</h3>
                      {service.isNew && (
                        <span className="shrink-0 rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                          NEW
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/25"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="6" y1="1" x2="6" y2="11" />
                      <line x1="1" y1="6" x2="11" y2="6" />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-[52px] relative z-10 flex flex-col gap-2">
                        {service.items.map((item, j) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.06 }}
                            className="flex items-center gap-2.5 text-[0.8rem] text-white/45"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-persian-light/60 shrink-0" />
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

function GlassTestimonials() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
            System Feedback
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            What Clients Say
          </h2>
        </div>

        <div className="rounded-2xl p-5 md:p-7
          bg-white/[0.03] backdrop-blur-md border border-white/[0.06]">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -2 }}
                className="flex flex-col p-6 rounded-xl transition-all duration-300
                  bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
                  hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]"
              >
                <p className="mb-4 text-xs tracking-[3px] text-yellow/80">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                <p className="mb-6 flex-1 text-[0.8rem] leading-relaxed text-white/45">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="h-px bg-white/[0.06] mb-4" />
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-persian/25 border border-persian/20 text-xs font-bold text-white/80">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-persian-light">{t.name}</p>
                    <p className="text-xs text-white/30">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HL BANNER                                                          */
/* ------------------------------------------------------------------ */

function GlassHLBanner() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-2xl text-center
          bg-gradient-to-br from-[#1a0845]/80 via-persian/20 to-[#2a0f6a]/60
          backdrop-blur-xl border border-white/[0.08]
          px-12 py-9
          shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.12)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="mb-4 text-2xl font-black uppercase leading-tight text-white md:text-3xl lg:text-4xl">
              NEW TO <span className="text-yellow">HIGHLEVEL?</span>
            </h2>
            <p className="mx-auto mb-6 max-w-[520px] text-sm leading-relaxed text-white/50">
              I onboard 3&ndash;5 new clients monthly onto HighLevel with a done-for-you setup. Sign up through my link and get{" "}
              <span className="font-semibold text-white/80">15% off</span> your first build package.
            </p>
            <a href="#" className="inline-block rounded-full bg-yellow px-8 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_24px_rgba(246,203,31,0.25)]">
              Get Started With HighLevel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

function GlassFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-persian-light/70">
            FAQ
          </span>
          <h2 className="text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            System Inquiries
          </h2>
        </div>

        <div className="mx-auto max-w-[720px] flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`overflow-hidden rounded-xl transition-all duration-300
                bg-white/[0.04] backdrop-blur-sm border border-white/[0.07]
                ${isOpen ? "bg-white/[0.06] border-white/[0.12]" : ""}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold uppercase tracking-wide text-persian-light/80">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 shrink-0 text-persian-light/60"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 8l5 5 5-5" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-white/40">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FINAL CTA                                                          */
/* ------------------------------------------------------------------ */

function GlassFinalCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="relative mx-auto max-w-[700px] px-6 text-center">
        <h2 className="mb-6 text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
          IF YOUR GROWTH<br />FEELS FORCED<br />YOUR <span className="text-yellow">SYSTEM</span><br />IS BROKEN!
        </h2>
        <p className="mb-10 text-sm italic text-white/35">
          Stop duct-taping tools together and hoping they work. Engineer a system that scales with you.
        </p>
        <a
          href="#"
          className="inline-block rounded-full bg-yellow px-10 py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:shadow-[0_0_32px_rgba(246,203,31,0.25)]"
        >
          Book a System Strategy Call &rarr;
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PREVIEW PAGE                                                       */
/* ------------------------------------------------------------------ */

export default function GlassmorphismPreview() {
  return (
    <DarkBg>
      {/* Preview banner */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-yellow text-black text-center py-2 text-xs font-bold uppercase tracking-widest">
        Glassmorphism Preview v4
      </div>

      <div className="pt-8">
        <GlassHero />
        <ToolkitMarquee />
        <GlassVault />
        <GlassPhilosophy />
        <GlassServices />
        <GlassTestimonials />
        <GlassHLBanner />
        <GlassFAQ />
        <GlassFinalCTA />
      </div>
    </DarkBg>
  );
}
