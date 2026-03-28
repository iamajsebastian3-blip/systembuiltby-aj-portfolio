"use client";

import { motion } from "framer-motion";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/stagger-children";

const services = [
  {
    title: "Funnels & Websites",
    description:
      "High-converting landing pages and multi-step funnels engineered to capture, nurture, and close.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="32" height="28" rx="3" />
        <line x1="14" y1="6" x2="14" y2="34" />
        <line x1="19" y1="14" x2="30" y2="14" />
        <line x1="19" y1="20" x2="28" y2="20" />
        <line x1="19" y1="26" x2="26" y2="26" />
      </svg>
    ),
  },
  {
    title: "Pipelines & Workflows",
    description:
      "Visual pipeline design with automated stage transitions, task triggers, and deal routing.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="3" />
        <circle cx="32" cy="8" r="3" />
        <circle cx="8" cy="32" r="3" />
        <circle cx="32" cy="32" r="3" />
        <line x1="11" y1="8" x2="29" y2="8" />
        <line x1="8" y1="11" x2="8" y2="29" />
        <line x1="32" y1="11" x2="32" y2="29" />
        <line x1="11" y1="32" x2="29" y2="32" />
        <line x1="11" y1="11" x2="29" y2="29" strokeDasharray="4 3" />
      </svg>
    ),
  },
  {
    title: "Email & SMS Automations",
    description:
      "Behavior-based sequences that send the right message at the right time across every channel.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="24" height="18" rx="2" />
        <path d="M3 10l12 9 12-9" />
        <line x1="30" y1="20" x2="37" y2="20" />
        <polyline points="34,17 37,20 34,23" />
        <line x1="30" y1="30" x2="37" y2="30" />
        <line x1="30" y1="33" x2="35" y2="33" />
      </svg>
    ),
  },
  {
    title: "Calendar & Booking",
    description:
      "Automated scheduling with round-robin routing, reminders, and no-show follow-up sequences.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="8" width="30" height="28" rx="3" />
        <line x1="5" y1="16" x2="35" y2="16" />
        <line x1="12" y1="4" x2="12" y2="12" />
        <line x1="28" y1="4" x2="28" y2="12" />
        <rect x="10" y="20" width="5" height="4" rx="1" />
        <rect x="18" y="20" width="5" height="4" rx="1" />
        <rect x="26" y="20" width="5" height="4" rx="1" />
        <rect x="10" y="28" width="5" height="4" rx="1" />
        <rect x="18" y="28" width="5" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: "Missed-Lead Recovery",
    description:
      "Automated re-engagement for missed calls, abandoned forms, and stalled pipeline opportunities.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="14" />
        <circle cx="20" cy="20" r="6" />
        <circle cx="20" cy="20" r="1.5" />
        <line x1="20" y1="2" x2="20" y2="6" />
        <line x1="20" y1="34" x2="20" y2="38" />
        <line x1="2" y1="20" x2="6" y2="20" />
        <line x1="34" y1="20" x2="38" y2="20" />
        <path d="M24 12l-4 8" />
      </svg>
    ),
  },
  {
    title: "Custom Integrations",
    description:
      "API connections, webhook automations, and third-party tool orchestration tailored to your stack.",
    icon: (
      <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="16" />
        <ellipse cx="20" cy="20" rx="7" ry="16" />
        <line x1="4" y1="14" x2="36" y2="14" />
        <line x1="4" y1="26" x2="36" y2="26" />
        <circle cx="20" cy="20" r="2" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-yellow">
            Services
          </span>
          <h2 className="mb-4 text-3xl font-black uppercase leading-tight text-white md:text-4xl lg:text-5xl">
            HighLevel Setup &amp; Optimization
          </h2>
          <p className="italic text-white/45">
            End-to-end systems engineering for businesses that refuse to stay
            small.
          </p>
        </div>

        {/* Service cards */}
        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="group flex flex-col gap-4 rounded-[14px] border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow/25 hover:bg-white/[0.06]">
                {/* Icon */}
                <motion.div
                  className="flex h-12 w-12 items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    rotate: -3,
                    filter: "drop-shadow(0 0 8px rgba(246,203,31,0.4))",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-lg font-extrabold text-white">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
