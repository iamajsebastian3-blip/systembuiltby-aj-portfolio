"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/motion/page-transition";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "automations", label: "\u26A1 Automations" },
  { id: "funnels", label: "\uD83C\uDFAF Funnels" },
  { id: "websites", label: "\uD83C\uDF10 Websites" },
  { id: "apps", label: "\uD83D\uDCF1 Apps" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Data — Automations                                                 */
/* ------------------------------------------------------------------ */

const automations = [
  {
    icon: "\u26A1",
    title: "New Lead Capture \u2014 Workflow 1",
    subtitle: "GHL Automation \u00B7 7 steps",
    description:
      "Instantly captures new form leads, tags them, fires an SMS + email sequence, and moves them into the sales pipeline \u2014 zero manual steps.",
    chips: [
      "Form Submit Trigger",
      "Contact Tag",
      "SMS Instant",
      "Email Sequence",
      "Pipeline Move",
    ],
  },
  {
    icon: "\uD83D\uDCC5",
    title: "Appointment Reminder Sequence",
    subtitle: "GHL Automation \u00B7 5 steps",
    description:
      "Reduces no-shows with a multi-touch reminder flow: 48h SMS, 24h email, 2h final nudge, and a no-show branch for follow-up.",
    chips: [
      "Appt Trigger",
      "48h SMS",
      "24h Email",
      "2h SMS",
      "No-show Branch",
    ],
  },
  {
    icon: "\uD83D\uDCDD",
    title: "Post-Service Review Request",
    subtitle: "GHL Automation \u00B7 4 steps",
    description:
      "Automatically asks for a review after service completion with a timed delay and follow-up if no response.",
    chips: ["Service Tag", "2h Wait", "SMS Review Ask", "48h Follow-up"],
  },
  {
    icon: "\uD83E\uDD1D",
    title: "Cold Lead Re-engagement",
    subtitle: "GHL Automation \u00B7 6 steps",
    description:
      "Re-activates stale leads after 14 days of inactivity with a multi-step nurture sequence and reply-based exit.",
    chips: [
      "14-Day Inactivity",
      "SMS 1",
      "Email 1",
      "SMS 2 + Offer",
      "Reply Stopper",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Funnels                                                     */
/* ------------------------------------------------------------------ */

const funnels = [
  {
    title: "Webinar Funnel",
    subtitle: "Live Training Registration",
    pages: "3 pages \u00B7 Registration \u2192 Confirmation \u2192 Replay",
    gradientFrom: "#27187E",
    gradientTo: "#3f2db5",
    emoji: "\uD83C\uDFD7\uFE0F",
  },
  {
    title: "Lead Funnel",
    subtitle: "Free Guide Opt-in",
    pages: "2 pages \u00B7 Opt-in \u2192 Thank You",
    gradientFrom: "#1d1260",
    gradientTo: "#27187E",
    emoji: "\uD83D\uDD25",
  },
  {
    title: "Sales Funnel",
    subtitle: "Service Offer Page",
    pages: "4 pages \u00B7 Sales \u2192 Order \u2192 Upsell \u2192 Confirmation",
    gradientFrom: "#0f0a3d",
    gradientTo: "#27187E",
    emoji: "\uD83D\uDCB0",
  },
  {
    title: "Opt-in Funnel",
    subtitle: "Booking Appointment Funnel",
    pages: "3 pages \u00B7 Landing \u2192 Booking \u2192 Confirmation",
    gradientFrom: "#27187E",
    gradientTo: "#4834c8",
    emoji: "\uD83D\uDCCB",
  },
  {
    title: "Tripwire Funnel",
    subtitle: "Low-ticket Entry Offer",
    pages: "3 pages \u00B7 Offer \u2192 Checkout \u2192 Upsell",
    gradientFrom: "#1a0f5e",
    gradientTo: "#3b2d9a",
    emoji: "\u26A1",
  },
  {
    title: "VSL Funnel",
    subtitle: "Video Sales Letter Page",
    pages: "2 pages \u00B7 VSL \u2192 Application",
    gradientFrom: "#27187E",
    gradientTo: "#1d1260",
    emoji: "\uD83D\uDCAC",
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Websites                                                    */
/* ------------------------------------------------------------------ */

const websites = [
  {
    title: "Service Business",
    subtitle: "Auto Detailing Homepage",
    tech: "GHL \u00B7 Custom CSS overrides",
    light: true,
  },
  {
    title: "Agency",
    subtitle: "Solution13 Agency Site",
    tech: "GHL + Vercel embed",
    light: false,
  },
  {
    title: "Local Business",
    subtitle: "Dental Clinic Website",
    tech: "GHL \u00B7 Booking integration",
    light: true,
  },
  {
    title: "E-commerce",
    subtitle: "Shopify Product Landing",
    tech: "Shopify \u00B7 Custom sections",
    light: false,
  },
  {
    title: "Professional Services",
    subtitle: "Real Estate Agent Site",
    tech: "GHL \u00B7 CRM integrated",
    light: true,
  },
  {
    title: "Restaurant",
    subtitle: "Sundowners Resort Site",
    tech: "Custom HTML \u00B7 SimplyBook",
    light: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Apps                                                        */
/* ------------------------------------------------------------------ */

const apps = [
  {
    emoji: "\uD83D\uDCCA",
    title: "Analytics Tool",
    subtitle: "Revenue Leak Calculator",
    description:
      "Identifies where revenue leaks happen in a sales pipeline and quantifies the dollar impact per stage.",
    chips: ["React", "Vite", "Custom Logic"],
    light: true,
  },
  {
    emoji: "\uD83D\uDD0D",
    title: "Research Tool",
    subtitle: "Amazon OA Product Research",
    description:
      "Automates product research for Amazon Online Arbitrage using AI analysis and live pricing data.",
    chips: ["Node.js", "Claude API", "Keepa API"],
    light: false,
  },
  {
    emoji: "\uD83D\uDCCB",
    title: "CRM Tool",
    subtitle: "Client Onboarding Tracker",
    description:
      "Tracks new client onboarding steps, sends status updates, and syncs with CRM records automatically.",
    chips: ["GHL API", "Zapier", "Google Sheets"],
    light: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeSlide = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AutomationCard({
  icon,
  title,
  subtitle,
  description,
  chips,
}: (typeof automations)[number]) {
  return (
    <div className="group rounded-2xl border border-persian/30 bg-[#1a0f3a] p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-persian/70 hover:shadow-[0_8px_30px_rgba(94,23,235,0.15)]">
      <div className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-persian/40 bg-persian/30 text-lg">
        {icon}
      </div>
      <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
      <p className="mb-3 text-xs font-medium text-purple-400">{subtitle}</p>
      <p className="mb-4 text-[13px] leading-relaxed text-white/55">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-persian/40 bg-persian/25 px-2.5 py-1 text-[0.68rem] font-bold text-purple-300"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function FunnelCard({
  title,
  subtitle,
  pages,
  gradientFrom,
  gradientTo,
  emoji,
}: (typeof funnels)[number]) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-[3px] hover:border-persian/50 hover:shadow-[0_8px_30px_rgba(94,23,235,0.12)]">
      {/* Gradient thumbnail */}
      <div
        className="flex h-40 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <span className="text-5xl opacity-60">{emoji}</span>
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="mb-2 text-sm text-purple-400">{subtitle}</p>
        <p className="text-xs text-white/45">{pages}</p>
      </div>
    </div>
  );
}

function WebsiteCard({
  title,
  subtitle,
  tech,
  light,
}: (typeof websites)[number]) {
  const barColor = light ? "bg-white/20" : "bg-purple-400/30";
  const blockColor = light ? "bg-white/10" : "bg-purple-400/15";
  const thumbBg = light ? "bg-[#1e1e2e]" : "bg-[#0d0d1a]";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-[3px] hover:border-persian/50 hover:shadow-[0_8px_30px_rgba(94,23,235,0.12)]">
      {/* Wireframe thumbnail */}
      <div
        className={`flex h-[170px] flex-col items-start gap-3 p-6 ${thumbBg}`}
      >
        <div className={`h-1.5 w-[70%] rounded ${barColor}`} />
        <div className={`h-1.5 w-[50%] rounded ${barColor}`} />
        <div className={`h-5 w-[85%] rounded ${blockColor}`} />
        <div className={`h-12 w-full rounded ${blockColor}`} />
        <div className={`h-5 w-[60%] rounded ${blockColor}`} />
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="mb-2 text-sm text-purple-400">{subtitle}</p>
        <p className="text-xs text-white/45">{tech}</p>
      </div>
    </div>
  );
}

function AppCard({
  emoji,
  title,
  subtitle,
  description,
  chips,
  light,
}: (typeof apps)[number]) {
  const thumbBg = light
    ? "bg-gradient-to-br from-[#27187E] to-[#3f2db5]"
    : "bg-gradient-to-br from-[#0f0a3d] to-[#27187E]";

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all duration-300 hover:-translate-y-[3px] hover:border-persian/50 hover:shadow-[0_8px_30px_rgba(94,23,235,0.12)]">
      {/* Emoji thumbnail */}
      <div className={`flex h-40 items-center justify-center ${thumbBg}`}>
        <span className="text-5xl">{emoji}</span>
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="mb-2 text-sm text-purple-400">{subtitle}</p>
        <p className="mb-4 text-[13px] leading-relaxed text-white/55">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-persian/40 bg-persian/25 px-2.5 py-1 text-[0.68rem] font-bold text-purple-300"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab content panels                                                 */
/* ------------------------------------------------------------------ */

function AutomationsPanel() {
  return (
    <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {automations.map((a) => (
        <StaggerItem key={a.title}>
          <AutomationCard {...a} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

function FunnelsPanel() {
  return (
    <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {funnels.map((f) => (
        <StaggerItem key={f.title}>
          <FunnelCard {...f} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

function WebsitesPanel() {
  return (
    <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {websites.map((w) => (
        <StaggerItem key={w.title}>
          <WebsiteCard {...w} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

function AppsPanel() {
  return (
    <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((a) => (
        <StaggerItem key={a.title}>
          <AppCard {...a} />
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}

const panels: Record<TabId, () => React.JSX.Element> = {
  automations: AutomationsPanel,
  funnels: FunnelsPanel,
  websites: WebsitesPanel,
  apps: AppsPanel,
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function ProjectsContent() {
  const [activeTab, setActiveTab] = useState<TabId>("automations");
  const ActivePanel = panels[activeTab];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black">
        {/* ---- Hero ---- */}
        <section className="bg-persian px-8 py-16 pb-12">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/50">
              Portfolio
            </p>
            <h1 className="mb-3 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Work I&apos;ve Built.
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/70">
              Automations, funnels, websites, and apps &mdash; all engineered for
              real business outcomes.
            </p>
          </div>
        </section>

        {/* ---- Sticky tabs ---- */}
        <div className="sticky top-16 z-30 border-b border-white/10 bg-background">
          <div className="mx-auto flex max-w-[1100px] gap-2 overflow-x-auto px-8 py-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? "border-persian bg-persian text-white"
                      : "border-white/[0.18] bg-transparent text-text-muted hover:border-persian hover:bg-persian hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Tab content ---- */}
        <div className="mx-auto max-w-[1100px] px-8 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={fadeSlide.initial}
              animate={fadeSlide.animate}
              exit={fadeSlide.exit}
              transition={fadeSlide.transition}
            >
              <ActivePanel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
