"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { brandPulseBeams, brandGradient } from "@/components/ui/pulse-beams-config";

const NAME = "ALLEN BACTAD";
const SESSION_KEY = "intro-played";

// Strip connection circles so they don't overlap the centered text
const introBeams = brandPulseBeams.map((b) => ({ ...b, connectionPoints: undefined }));

export function NameRevealIntro() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    setMounted(true);
    const played = sessionStorage.getItem(SESSION_KEY);
    if (!played) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    if (shown < NAME.length) {
      const t = setTimeout(() => setShown(shown + 1), 90);
      return () => clearTimeout(t);
    }
    const exit = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(exit);
  }, [show, shown]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100]"
        >
          <PulseBeams
            beams={introBeams}
            gradientColors={brandGradient}
            baseColor="rgba(124,58,237,0.15)"
            accentColor="rgba(246,203,31,0.5)"
            className="bg-black"
          >
            <div className="text-center px-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-persian-light">
                Portfolio
              </p>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
                {NAME.slice(0, shown)}
                <span className="inline-block w-[3px] h-[1em] bg-persian-light ml-1 align-middle animate-pulse" />
              </h1>
            </div>
          </PulseBeams>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
