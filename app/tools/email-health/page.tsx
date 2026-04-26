import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

export const metadata: Metadata = {
  title: "Email Health Tools",
  description:
    "Free tools to check your domain health, sender reputation, and deliverability score before any major email campaign.",
};

const tools = [
  {
    title: "MxToolbox Email Health",
    href: "https://mxtoolbox.com/emailhealth",
    description:
      "Comprehensive email health check. Tests SPF, DKIM, DMARC, blacklist status, DNS configuration, and identifies deliverability issues in one scan. Run this before any major campaign.",
  },
  {
    title: "Google Postmaster Tools",
    href: "https://postmaster.google.com/u/0/managedomains",
    description:
      "Monitor your domain's reputation with Gmail specifically. Shows spam rate, IP reputation, domain reputation, authentication success rates, and encryption stats. Essential since Gmail is 40–60% of inboxes.",
  },
  {
    title: "Mail-Tester",
    href: "https://mail-tester.com/",
    description:
      "Send a test email and get a 1–10 deliverability score. Checks your message, server, sending IP, and provides specific fixes. Aim for 8/10 or higher before sending to your full list.",
  },
];

export default function EmailHealthPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-[960px] px-4 sm:px-8 py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          &larr; Back to Tools
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-yellow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Email Health Tools</h1>
          </div>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl">
            Free tools to check your domain health, sender reputation, and deliverability score.
          </p>
        </div>

        <ScrollReveal>
          <div className="mb-8 rounded-xl border border-persian/20 bg-persian/[0.06] p-4">
            <div className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-yellow mt-0.5">💡</span>
              <p>
                <span className="font-bold text-white">When to use these:</span> Run all three before launching any major email campaign.
                MxToolbox catches DNS/auth issues, Postmaster shows how Gmail sees you, and Mail-Tester gives you a quick score with specific fixes.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <StaggerChildren className="space-y-5">
          {tools.map((t) => (
            <StaggerItem key={t.href}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative overflow-hidden rounded-2xl border border-persian/30 bg-gradient-to-br from-persian/15 via-persian/[0.08] to-transparent p-6 sm:p-7 transition-all hover:border-persian/50 hover:shadow-[0_12px_40px_rgba(94,23,235,0.25)] hover:-translate-y-[2px]"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-yellow/20 border border-yellow/40 text-yellow">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-xl font-black text-white">{t.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed mb-4">{t.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-yellow group-hover:text-yellow-dark transition-colors">
                      Open Tool
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
