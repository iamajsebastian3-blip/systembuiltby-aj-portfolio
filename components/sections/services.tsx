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
  { rank: "01", icon: "\uD83D\uDD25", title: "Funnel & Website Systems", items: ["GHL funnels", "Landing pages", "Conversion optimization"] },
  { rank: "02", icon: "\uD83D\uDD25", title: "CRM & Pipeline Systems", items: ["Pipeline setup", "Lead tracking", "Segmentation"] },
  { rank: "03", icon: "\uD83D\uDD25", title: "Automation & Workflows", items: ["Email/SMS sequences", "Lead nurturing", "Re-engagement"] },
  { rank: "04", icon: "\uD83D\uDCC5", title: "Booking Systems", items: ["Calendars", "Reminders", "No-show reduction"] },
  { rank: "05", icon: "\uD83D\uDCF2", title: "A2P 10DLC Setup", items: ["Registration", "Compliance", "Deliverability optimization"], isNew: true, heat: 1 },
  { rank: "06", icon: "\uD83E\uDD16", title: "AI Chatbot Systems", items: ["AI conversation setup", "Lead qualification bots", "Booking bots", "AI + workflow integration"], isNew: true, heat: 2 },
  { rank: "07", icon: "\uD83C\uDF10", title: "Custom Frontend (Vibe Coding)", items: ["High-performance landing pages", "Custom UI/UX", "GHL integration via forms/webhooks"] },
  { rank: "08", icon: "\u2699\uFE0F", title: "Advanced Integrations", items: ["API/webhooks", "External tools", "Backend system architecture"] },
];

function ServiceCard({
  service,
  isExpanded,
  onToggle,
}: {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onToggle}
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
        <span className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-white/[0.035] border border-white/[0.06] text-white/40">
          {service.rank}
        </span>
        <span className="text-xl shrink-0">{service.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-extrabold text-white tracking-tight">
              {service.title}
            </h3>
            {service.isNew && (
              <span className="shrink-0 rounded-full bg-yellow px-2 py-0.5 text-[0.55rem] font-extrabold text-black uppercase tracking-wider">
                NEW {"\uD83D\uDD25".repeat(service.heat ?? 1)}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pl-[52px] relative z-10 flex flex-col gap-2">
              {service.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
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
}

export function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 lg:py-32 scroll-mt-16">
      <div className="pointer-events-none absolute top-1/2 left-[-5%] w-[400px] h-[400px] bg-[#2a0a5e]/30 blur-[120px] rounded-full -translate-y-1/2" />

      <div className="relative mx-auto max-w-[1100px] px-8">
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
            <p className="text-sm text-white/35 italic mt-2 max-w-[520px] mx-auto">
              8 core service areas engineered for your sales operations.
            </p>
          </ScrollReveal>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, i) => (
            <StaggerItem key={service.title}>
              <ServiceCard
                service={service}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
              />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-xs text-white/25 uppercase tracking-widest">
              Click any service to expand details
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
