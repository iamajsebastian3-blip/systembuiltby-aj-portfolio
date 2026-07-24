"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Badge = { src: string; label: string };
type Tool = {
  id: string;
  name: string;
  logo: string;
  badges: Badge[];
  comingSoon?: boolean;
};

// One array drives the whole flow. To add a tool's certs later, drop the files
// in /public/badges/<tool>/ and fill in its `badges` array (remove comingSoon).
const techStack: Tool[] = [
  {
    id: "ghl",
    name: "GoHighLevel",
    logo: "/logos/gohighlevel.png",
    badges: [
      { src: "/badges/badges.webp", label: "HL Accelerator — Certified Admin, Tier 3" },
      { src: "/badges/hla-badge.webp", label: "HL Accelerator — Automation Builder" },
      { src: "/badges/certificate.webp", label: "Certification Letter" },
    ],
  },
  { id: "n8n", name: "n8n", logo: "/logos/n8n.svg", badges: [], comingSoon: true },
  { id: "claude", name: "Claude", logo: "/logos/claude.svg", badges: [], comingSoon: true },
  { id: "zapier", name: "Zapier", logo: "/logos/zapier.svg", badges: [], comingSoon: true },
];

/**
 * Two-step credentials browser: tech-stack picker -> per-tool badge coverflow.
 * Self-contained (holds its own step state) so it can be dropped into the hero
 * modal or rendered inline on the About "Badges & Certificates" tab unchanged.
 */
export function CertificatesExplorer() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  return activeTool ? (
    <BadgeCarousel tool={activeTool} onBack={() => setActiveTool(null)} />
  ) : (
    <ToolPicker onPick={setActiveTool} />
  );
}

function ToolPicker({ onPick }: { onPick: (tool: Tool) => void }) {
  return (
    <div>
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-yellow">
        Credentials &amp; Recognition
      </p>
      <h2 className="mt-2 text-center text-2xl font-black text-white sm:text-3xl">
        Certificates &amp; Badges
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-white/55">
        The tools I&apos;m certified in. Pick one to see its badges and certificates.
      </p>

      <div className="mx-auto mt-7 grid max-w-[520px] grid-cols-2 gap-4 sm:grid-cols-4">
        {techStack.map((tool) => {
          const disabled = tool.comingSoon || tool.badges.length === 0;
          return (
            <button
              key={tool.id}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onPick(tool)}
              aria-label={
                disabled
                  ? `${tool.name} — certificates coming soon`
                  : `View ${tool.name} certificates`
              }
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.05] px-3 pb-4 pt-5 text-center transition-all ${
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:-translate-y-[3px] hover:border-persian/80 hover:bg-persian/10"
              }`}
            >
              {disabled && (
                <span className="absolute -right-8 top-2.5 rotate-45 bg-white/15 px-8 py-[3px] text-[9px] font-bold uppercase tracking-wider text-white/75">
                  Soon
                </span>
              )}
              {/* White tile so every brand mark renders consistently (matches ToolkitMarquee) */}
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-sm font-semibold text-white">{tool.name}</div>
              <div className="mt-1 text-[11px] text-white/50">
                {disabled
                  ? "Coming soon"
                  : `${tool.badges.length} credential${tool.badges.length > 1 ? "s" : ""}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BadgeCarousel({ tool, onBack }: { tool: Tool; onBack: () => void }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState<number | null>(null);
  const n = tool.badges.length;
  const go = (idx: number) => setI(((idx % n) + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (zoom !== null) return;
      if (e.key === "ArrowRight") setI((p) => (p + 1) % n);
      else if (e.key === "ArrowLeft") setI((p) => (p - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, zoom]);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition hover:text-white"
      >
        <span aria-hidden>←</span> Back
      </button>

      <p className="text-center text-xs font-semibold uppercase tracking-widest text-yellow">
        {tool.name}
      </p>
      <h2 className="mt-2 text-center text-2xl font-black text-white sm:text-3xl">
        {tool.name} Credentials
      </h2>

      {/* Coverflow */}
      <div
        className="relative mt-8 flex h-[360px] items-center justify-center sm:h-[420px]"
        style={{ perspective: "1500px" }}
      >
        {tool.badges.map((b, idx) => {
          let rel = idx - i;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const isCenter = rel === 0;
          const abs = Math.abs(rel);
          const style: React.CSSProperties = {
            transform: `translateX(${rel * 56}%) scale(${isCenter ? 1 : 0.78}) rotateY(${rel * -22}deg)`,
            zIndex: 30 - abs,
            opacity: abs > 1 ? 0 : isCenter ? 1 : 0.5,
            pointerEvents: abs > 1 ? "none" : "auto",
          };
          return (
            <button
              key={b.src}
              type="button"
              onClick={() => (isCenter ? setZoom(idx) : go(idx))}
              aria-label={isCenter ? `View ${b.label} full size` : `Show ${b.label}`}
              className="absolute h-full w-[220px] transition-all duration-500 ease-out sm:w-[300px]"
              style={style}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-2xl border bg-white/[0.05] backdrop-blur-sm ${
                  isCenter
                    ? "border-yellow/40 shadow-[0_20px_70px_rgba(94,23,235,0.35)]"
                    : "border-white/[0.08]"
                }`}
              >
                <Image src={b.src} alt={b.label} fill sizes="300px" className="object-contain p-4" />
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => go(i - 1)}
          aria-label="Previous"
          className="absolute left-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-black/50 text-white/80 backdrop-blur-sm transition hover:border-persian/50 hover:text-white sm:left-1"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(i + 1)}
          aria-label="Next"
          className="absolute right-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-persian/60 bg-persian text-white transition hover:bg-persian-dark sm:right-1"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-white/60">{tool.badges[i].label}</p>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {tool.badges.map((b, idx) => (
          <button
            key={b.src}
            type="button"
            onClick={() => go(idx)}
            aria-label={`Go to ${b.label}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-yellow" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {zoom !== null && (
        <BadgeLightbox
          src={tool.badges[zoom].src}
          label={tool.badges[zoom].label}
          onClose={() => setZoom(null)}
        />
      )}
    </div>
  );
}

function BadgeLightbox({
  src,
  label,
  onClose,
}: {
  src: string;
  label: string;
  onClose: () => void;
}) {
  useEffect(() => {
    // Capture phase + stopImmediatePropagation so Escape closes only the
    // lightbox, not the modal underneath it (both listen on `document`).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-[210] flex items-center justify-center bg-black/90 p-4 sm:p-8"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
        >
          ✕
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="max-h-[85vh] w-auto rounded-xl border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
        />
      </div>
    </div>
  );
}
