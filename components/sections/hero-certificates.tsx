"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CertificatesExplorer } from "@/components/sections/certificates-explorer";

export function HeroCertificates() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the modal is open; Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Style matches the TabPill used on Gallery / About / Badge & Certificates */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-persian to-[#7b3ff2] px-5 py-2 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(94,23,235,0.45)] transition-all hover:-translate-y-[1px] hover:shadow-[0_6px_26px_rgba(94,23,235,0.6)]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
        Certificates &amp; Badges
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Certificates and badges"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(3,2,8,0.82)] p-4 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[760px] overflow-hidden rounded-3xl border border-white/[0.09] bg-[linear-gradient(180deg,#120c22,#0b0813)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.6)] sm:p-9"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                ✕
              </button>

              {/* Fresh mount each open resets it to the tool picker */}
              <CertificatesExplorer />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
