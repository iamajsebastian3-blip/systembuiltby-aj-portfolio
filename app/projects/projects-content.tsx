"use client";

import { useEffect, useRef, useState } from "react";
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
    icon: "\uD83D\uDD25",
    title: "Lead Capture \u2192 Conversion Pipeline",
    subtitle: "GHL Pipeline \u00B7 Full Funnel",
    description:
      "Captures leads from forms, ads, and landing pages \u2014 then moves them through qualification, nurture, and conversion stages automatically.",
    chips: ["Form Trigger", "Auto-Tag", "SMS + Email", "Pipeline Stages", "Conversion Tracking"],
    image: "/pipeline-lead-capture.png",
  },
  {
    icon: "\uD83D\uDCC5",
    title: "Appointment Booking Pipeline",
    subtitle: "GHL Pipeline \u00B7 Booking Flow",
    description:
      "Automates the entire booking flow \u2014 from calendar scheduling to reminders, no-show recovery, and post-appointment follow-up.",
    chips: ["Calendar Sync", "48h/24h/2h Reminders", "No-Show Branch", "Rebooking", "Review Ask"],
    image: "/pipeline-app-booking.png",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Sales Pipeline (High-Ticket)",
    subtitle: "GHL Pipeline \u00B7 Closer Flow",
    description:
      "Engineered for high-ticket offers \u2014 moves qualified leads through discovery, proposal, negotiation, and close stages with automated follow-ups.",
    chips: ["Lead Scoring", "Discovery Call", "Proposal Stage", "Follow-Up Sequence", "Won/Lost Tracking"],
    image: "/pipeline-sales.png",
  },
  {
    icon: "\uD83D\uDED2",
    title: "Ecommerce / Order Pipeline",
    subtitle: "GHL Pipeline \u00B7 Order Flow",
    description:
      "Tracks orders from purchase to fulfillment \u2014 with abandoned cart recovery, order confirmations, and post-purchase upsell sequences.",
    chips: ["Order Trigger", "Cart Recovery", "Confirmation SMS", "Upsell Sequence", "Review Request"],
    image: "/pipeline-order.png",
  },
  {
    icon: "\uD83D\uDD01",
    title: "Re-engagement / Nurture Pipeline",
    subtitle: "GHL Pipeline \u00B7 Reactivation",
    description:
      "Wakes up cold leads and past clients with multi-touch nurture sequences \u2014 SMS, email, and value-driven content over 14\u201330 days.",
    chips: ["Inactivity Trigger", "Drip Sequence", "Offer Nudge", "Reply Detection", "Re-qualification"],
    image: "/pipeline-nurture.png",
  },
  {
    icon: "\uD83C\uDFDD\uFE0F",
    title: "Booking / Reservation Pipeline",
    subtitle: "GHL Pipeline \u00B7 Hospitality",
    description:
      "Built for resorts, hotels, and service-based businesses \u2014 handles reservation requests, confirmations, pre-arrival sequences, and feedback.",
    chips: ["Reservation Form", "Confirmation Flow", "Pre-Arrival SMS", "Check-In Reminder", "Feedback Loop"],
    image: "/pipeline-reservation.png",
  },
  {
    icon: "\uD83E\uDDD1\u200D\uD83C\uDFEB",
    title: "High-Ticket Client Pipeline",
    subtitle: "GHL Pipeline \u00B7 Premium Flow",
    description:
      "Designed for coaches, consultants, and agencies \u2014 moves prospects through application, vetting, strategy call, and onboarding stages.",
    chips: ["Application Form", "Vetting Stage", "Strategy Call", "Contract/Payment", "Onboarding"],
    image: "/pipeline-high-ticket.png",
  },
  {
    icon: "\uD83C\uDFC6",
    title: "Client Onboarding & Delivery Pipeline",
    subtitle: "GHL Pipeline \u00B7 Fulfillment",
    description:
      "Automates post-sale delivery \u2014 welcome sequences, kickoff scheduling, milestone tracking, and project completion with review requests.",
    chips: ["Welcome Sequence", "Kickoff Call", "Milestone Tracking", "Delivery Complete", "Testimonial Ask"],
    image: "/pipeline-client-onboarding.png",
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
    url: "https://webinar-funnel-zeta.vercel.app/",
    isLive: true,
  },
  {
    title: "Lead Funnel",
    subtitle: "Free Guide Opt-in",
    pages: "2 pages \u00B7 Opt-in \u2192 Thank You",
    gradientFrom: "#1d1260",
    gradientTo: "#27187E",
    emoji: "\uD83D\uDD25",
    url: "https://lead-funnel-sample.vercel.app/",
    isLive: true,
  },
  {
    title: "Sales Funnel",
    subtitle: "Service Offer Page",
    pages: "4 pages \u00B7 Sales \u2192 Order \u2192 Upsell \u2192 Confirmation",
    gradientFrom: "#0f0a3d",
    gradientTo: "#27187E",
    emoji: "\uD83D\uDCB0",
    url: "https://sales-funnel-sample.vercel.app/sales-page.html",
    isLive: true,
  },
  {
    title: "Opt-in Funnel",
    subtitle: "Booking Appointment Funnel",
    pages: "3 pages \u00B7 Landing \u2192 Booking \u2192 Confirmation",
    gradientFrom: "#27187E",
    gradientTo: "#4834c8",
    emoji: "\uD83D\uDCCB",
    url: "https://opt-in-funnel-beta.vercel.app/",
    isLive: true,
  },
  {
    title: "Tripwire Funnel",
    subtitle: "Low-ticket Entry Offer",
    pages: "3 pages \u00B7 Offer \u2192 Checkout \u2192 Upsell",
    gradientFrom: "#1a0f5e",
    gradientTo: "#3b2d9a",
    emoji: "\u26A1",
    url: "https://tripwire-funnel.vercel.app/offer-page.html",
    isLive: true,
  },
  {
    title: "VSL Funnel",
    subtitle: "Video Sales Letter Page",
    pages: "2 pages \u00B7 VSL \u2192 Application",
    gradientFrom: "#27187E",
    gradientTo: "#1d1260",
    emoji: "\uD83D\uDCAC",
    url: "https://vsl-funnel-gilt.vercel.app/vsl-page.html",
    isLive: true,
  },
  {
    title: "Real Estate Funnel",
    subtitle: "Property Listing Lead Gen",
    pages: "3 pages \u00B7 Landing \u2192 Listings \u2192 Contact",
    gradientFrom: "#1a3a2a",
    gradientTo: "#27187E",
    emoji: "\uD83C\uDFE0",
    url: "https://real-estate-funnel-drab.vercel.app/",
    isLive: true,
  },
  {
    title: "Resort Booking Funnel",
    subtitle: "Hospitality Booking Flow",
    pages: "3 pages \u00B7 Landing \u2192 Rooms \u2192 Booking",
    gradientFrom: "#0f2a4a",
    gradientTo: "#27187E",
    emoji: "\uD83C\uDFD6\uFE0F",
    url: "https://booking-funnel.vercel.app/landing-page.html",
    isLive: true,
  },
  {
    title: "Product Launch Funnel",
    subtitle: "New Product Release Page",
    pages: "3 pages \u00B7 Teaser \u2192 Launch \u2192 Order",
    gradientFrom: "#2a1a0f",
    gradientTo: "#27187E",
    emoji: "\uD83D\uDE80",
    url: "https://product-launch-funnel.vercel.app/",
    isLive: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Data — Websites                                                    */
/* ------------------------------------------------------------------ */

const websites = [
  {
    title: "Hotel",
    subtitle: "Casa Lume Hotel",
    tech: "Next.js \u00B7 Vercel",
    light: false,
    url: "https://casa-lume-hotel.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/casa-lume-hotel.png",
  },
  {
    title: "Skin Clinic",
    subtitle: "DermaGlow Clinic",
    tech: "Next.js \u00B7 Vercel",
    light: true,
    url: "https://dermaglow-clinic.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/dermaglow-clinic.png",
  },
  {
    title: "Caf\u00E9",
    subtitle: "The Cozy Cup",
    tech: "Next.js \u00B7 Vercel",
    light: true,
    url: "https://the-cozy-cup-one.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/the-cozy-cup.png",
  },
  {
    title: "Skin Clinic",
    subtitle: "Lumi\u00E8re Skin Clinic",
    tech: "Next.js \u00B7 Vercel",
    light: false,
    url: "https://lumiere-skin-clinic.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/lumiere-skin-clinic.png",
  },
  {
    title: "Gym / Fitness",
    subtitle: "Coach Gym Funnel",
    tech: "Next.js \u00B7 Vercel",
    light: false,
    url: "https://coach-gym-funnel.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/coach-gym-funnel.png",
  },
  {
    title: "Resort",
    subtitle: "Merbau Beach Resort",
    tech: "Next.js \u00B7 Vercel",
    light: true,
    url: "https://merbau-beach-resort.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/merbau-beach-resort.png",
  },
  {
    title: "Caf\u00E9",
    subtitle: "AmberBrew Caf\u00E9",
    tech: "Next.js \u00B7 Vercel",
    light: true,
    url: "https://amberbrew-cafe.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/amberbrew-cafe.png",
  },
  {
    title: "Dental Clinic",
    subtitle: "SmileCraft Dental",
    tech: "Next.js \u00B7 Vercel",
    light: false,
    url: "https://smilecraft-dental-ten.vercel.app/",
    isLive: true,
    thumbnail: "/showcase/smilecraft-dental.png",
  },
  {
    title: "E-commerce",
    subtitle: "AJ Bactad Store",
    tech: "Next.js \u00B7 Vercel",
    light: false,
    url: "https://aj-bactad-ecommerce-4793kbr8a-aj29.vercel.app/",
    isLive: true,
    thumbnail: "/ecommerce-thumbnail.png",
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
/*  Lazy-mount hook — only render iframes after the card enters view   */
/* ------------------------------------------------------------------ */

function useInViewOnce<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

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
  image,
}: (typeof automations)[number]) {
  const [showPreview, setShowPreview] = useState(false);
  const [zoom, setZoom] = useState(1);

  const cardClass = "group rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm p-7 transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]";

  return (
    <>
      <div
        className={`${cardClass} ${image ? "cursor-pointer" : ""}`}
        onClick={image ? () => setShowPreview(true) : undefined}
      >
        {image && (
          <div className="mb-4 -mx-7 -mt-7 rounded-t-2xl overflow-hidden relative h-36 bg-gradient-to-br from-persian/15 via-[#1a0845]/30 to-persian/10 flex items-center justify-center group-hover:from-persian/25 group-hover:via-[#1a0845]/40 group-hover:to-persian/15 transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center group-hover:bg-persian/30 group-hover:border-persian/40 transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-all">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest group-hover:text-white/60 transition-colors">Click to Preview</p>
            </div>
          </div>
        )}
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-white/[0.1] bg-white/[0.06] text-lg">
            {icon}
          </div>
          {image && (
            <span className="text-[0.6rem] font-extrabold uppercase tracking-wider text-persian-light bg-persian/20 border border-persian/30 rounded-full px-2 py-0.5">Preview</span>
          )}
        </div>
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="mb-3 text-xs font-medium text-white/50">{subtitle}</p>
        <p className="mb-4 text-[13px] leading-relaxed text-white/55">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-[0.68rem] font-bold text-white/50"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Image lightbox modal */}
      <AnimatePresence>
        {showPreview && image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm cursor-pointer overflow-auto"
            onClick={() => { setShowPreview(false); setZoom(1); }}
          >
            {/* Top bar with controls */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 bg-black/60 backdrop-blur-md border-b border-white/[0.06]">
              <p className="text-xs text-white/40 uppercase tracking-widest">{title}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setZoom(Math.max(0.5, zoom - 0.25)); }}
                  className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] transition-colors text-lg font-bold"
                >
                  −
                </button>
                <span className="text-xs text-white/50 font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setZoom(Math.min(3, zoom + 0.25)); }}
                  className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] transition-colors text-lg font-bold"
                >
                  +
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setZoom(1); }}
                  className="px-3 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] transition-colors text-[0.6rem] font-bold uppercase tracking-wider"
                >
                  Reset
                </button>
                <div className="w-px h-5 bg-white/[0.1] mx-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); setShowPreview(false); setZoom(1); }}
                  className="px-3 h-8 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  Close &times;
                </button>
              </div>
            </div>

            {/* Zoomable image */}
            <div className="flex justify-center p-6" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_24px_64px_rgba(0,0,0,0.6)] inline-block"
              >
                <img
                  src={image}
                  alt={title}
                  className="block transition-transform duration-200 origin-top-left"
                  style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: zoom > 1 ? `${100}%` : "100%" }}
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FunnelCard({
  title,
  subtitle,
  pages,
  gradientFrom,
  gradientTo,
  emoji,
  url,
  isLive,
}: (typeof funnels)[number] & { url?: string; isLive?: boolean }) {
  const Wrapper = url
    ? ({ children, className }: { children: React.ReactNode; className: string }) => (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      )
    : ({ children, className }: { children: React.ReactNode; className: string }) => (
        <div className={className}>{children}</div>
      );

  const { ref: thumbRef, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <Wrapper className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      {/* Thumbnail */}
      <div
        ref={thumbRef}
        className="relative h-48 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {isLive && url ? (
          <>
            {/* Live site preview via iframe — mounted only when scrolled into view */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {inView ? (
                <iframe
                  src={url}
                  title={`${title} preview`}
                  className="w-[1280px] h-[800px] origin-top-left border-0"
                  style={{ transform: "scale(0.25)", transformOrigin: "top left" }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  tabIndex={-1}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl opacity-40">{emoji}</span>
                </div>
              )}
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                View Live →
              </span>
            </div>
            {/* Live badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 z-10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[0.6rem] font-bold text-white uppercase tracking-wider">Live</span>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl opacity-60">{emoji}</span>
          </div>
        )}
      </div>
      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-white">{title}</h3>
          {isLive && (
            <span className="text-[0.55rem] font-extrabold bg-persian/20 text-persian border border-persian/30 rounded-full px-2 py-0.5 uppercase tracking-wider">
              Deployed
            </span>
          )}
        </div>
        <p className="mb-2 text-sm text-white/50">{subtitle}</p>
        <p className="text-xs text-white/45">{pages}</p>
      </div>
    </Wrapper>
  );
}

function WebsiteCard({
  title,
  subtitle,
  tech,
  light,
  url,
  isLive,
  thumbnail,
}: (typeof websites)[number] & { url?: string; isLive?: boolean; thumbnail?: string }) {
  const barColor = light ? "bg-white/20" : "bg-white/15";
  const blockColor = light ? "bg-white/10" : "bg-white/[0.07]";
  const thumbBg = light ? "bg-white/[0.06]" : "bg-white/[0.03]";

  const Wrapper = url
    ? ({ children, className }: { children: React.ReactNode; className: string }) => (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      )
    : ({ children, className }: { children: React.ReactNode; className: string }) => (
        <div className={className}>{children}</div>
      );

  const { ref: thumbRef, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <Wrapper className="group block overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      {/* Thumbnail */}
      <div ref={thumbRef} className={`relative h-[170px] overflow-hidden ${isLive ? "" : thumbBg}`}>
        {isLive && url ? (
          <div className="relative h-full overflow-hidden">
            {thumbnail ? (
              <img src={thumbnail} alt={title} loading="lazy" className="w-full h-full object-cover" />
            ) : inView ? (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <iframe
                  src={url}
                  title={`${title} preview`}
                  className="w-[1280px] h-[800px] origin-top-left border-0"
                  style={{ transform: "scale(0.25)", transformOrigin: "top left" }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  tabIndex={-1}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-persian/10 to-transparent" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                View Live &rarr;
              </span>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1 z-10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[0.6rem] font-bold text-white uppercase tracking-wider">Live</span>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-start gap-3 p-6">
            <div className={`h-1.5 w-[70%] rounded ${barColor}`} />
            <div className={`h-1.5 w-[50%] rounded ${barColor}`} />
            <div className={`h-5 w-[85%] rounded ${blockColor}`} />
            <div className={`h-12 w-full rounded ${blockColor}`} />
            <div className={`h-5 w-[60%] rounded ${blockColor}`} />
          </div>
        )}
      </div>
      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-base font-bold text-white">{title}</h3>
          {isLive && (
            <span className="text-[0.55rem] font-extrabold bg-persian/20 text-persian border border-persian/30 rounded-full px-2 py-0.5 uppercase tracking-wider">
              Deployed
            </span>
          )}
        </div>
        <p className="mb-2 text-sm text-white/50">{subtitle}</p>
        <p className="text-xs text-white/45">{tech}</p>
      </div>
    </Wrapper>
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
    <div className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]">
      {/* Emoji thumbnail */}
      <div className={`flex h-40 items-center justify-center ${thumbBg}`}>
        <span className="text-5xl">{emoji}</span>
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
        <p className="mb-2 text-sm text-white/50">{subtitle}</p>
        <p className="mb-4 text-[13px] leading-relaxed text-white/55">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/[0.1] bg-white/[0.06] px-2.5 py-1 text-[0.68rem] font-bold text-white/50"
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
      <div className="min-h-screen bg-transparent">
        {/* ---- Hero ---- */}
        <section className="bg-persian/20 backdrop-blur-xl px-8 py-16 pb-12">
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
        <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-md">
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
