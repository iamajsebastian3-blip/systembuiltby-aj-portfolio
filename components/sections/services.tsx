"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

interface Service {
  rank: string;
  icon: string;
  title: string;
  items: string[];
  isNew?: boolean;
  heat?: number;
}

const services: Service[] = [
  {
    rank: "🥇",
    icon: "🔥",
    title: "Funnel & Website Systems",
    items: ["GHL funnels", "Landing pages", "Conversion optimization"],
  },
  {
    rank: "🥈",
    icon: "🔥",
    title: "CRM & Pipeline Systems",
    items: ["Pipeline setup", "Lead tracking", "Segmentation"],
  },
  {
    rank: "🥉",
    icon: "🔥",
    title: "Automation & Workflows",
    items: ["Email/SMS sequences", "Lead nurturing", "Re-engagement"],
  },
  {
    rank: "04",
    icon: "📅",
    title: "Booking Systems",
    items: ["Calendars", "Reminders", "No-show reduction"],
  },
  {
    rank: "05",
    icon: "📲",
    title: "A2P 10DLC Setup",
    items: ["Registration", "Compliance", "Deliverability optimization"],
    isNew: true,
    heat: 1,
  },
  {
    rank: "06",
    icon: "🤖",
    title: "AI Chatbot Systems",
    items: [
      "AI conversation setup",
      "Lead qualification bots",
      "Booking bots",
      "AI + workflow integration",
    ],
    isNew: true,
    heat: 2,
  },
  {
    rank: "07",
    icon: "🌐",
    title: "Custom Frontend (Vibe Coding)",
    items: [
      "High-performance landing pages",
      "Custom UI/UX",
      "GHL integration via forms/webhooks",
    ],
  },
  {
    rank: "08",
    icon: "⚙️",
    title: "Advanced Integrations",
    items: ["API/webhooks", "External tools", "Backend system architecture"],
  },
];

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: Service;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const isMedal = index < 3;

  return (
    <motion.div
      layout
      onClick={onToggle}
      className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 overflow-hidden ${
        isExpanded
          ? "border-persian/40 bg-white/[0.06] shadow-[0_8px_32px_rgba(94,23,235,0.15)]"
          : "border-white/[0.08] bg-white/[0.03] hover:border-yellow/25 hover:bg-white/[0.05]"
      }`}
    >
      {/* Glow effect when expanded */}
      {isExpanded && (
        <motion.div
          layoutId={`glow-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(94,23,235,0.2),transparent_70%)] pointer-events-none"
        />
      )}

      {/* Header row */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Rank */}
        <div className="shrink-0">
          {isMedal ? (
            <span className="text-2xl">{service.rank}</span>
          ) : (
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-bold text-white/40">
              {service.rank}
            </span>
          )}
        </div>

        {/* Icon */}
        <span className="text-xl shrink-0">{service.icon}</span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-extrabold text-white tracking-tight">
              {service.title}
            </h3>
            {service.isNew && (
              <span className="shrink-0 rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                NEW {"🔥".repeat(service.heat ?? 1)}
              </span>
            )}
          </div>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white/30"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </motion.div>
      </div>

      {/* Expandable items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-[52px] relative z-10">
              <div className="flex flex-col gap-2">
                {service.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="flex items-center gap-2.5 text-[0.8rem] text-white/55"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-persian shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="bg-black py-24 lg:py-32 scroll-mt-16">
      <div className="mx-auto max-w-[1100px] px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-yellow justify-center">
              <span className="w-4 h-0.5 bg-yellow rounded-full" />
              Services
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-white uppercase mt-2">
              HighLevel Setup &amp;
              <br />
              Optimization
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-sm text-white/45 italic mt-2 max-w-[520px] mx-auto">
              8 core service areas engineered for your sales operations.
            </p>
          </ScrollReveal>
        </div>

        {/* Service grid — 2 columns */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, i) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                service={service}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
              />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Bottom note */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-xs text-white/30 uppercase tracking-widest">
              Click any service to expand details
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
