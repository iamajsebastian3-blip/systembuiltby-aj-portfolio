"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type IntroId = "name-reveal" | "tagline-curtain" | "loading-bar" | "logo-zoom" | "particles-grid" | null;

const options = [
  { id: "name-reveal" as const, label: "1. Name Reveal", desc: "ALLEN BACTAD types out letter-by-letter, holds, then fades up." },
  { id: "tagline-curtain" as const, label: "2. Tagline Curtain", desc: "Rotating words stack, then a curtain slides up." },
  { id: "loading-bar" as const, label: "3. Loading Bar", desc: "Yellow progress bar fills across, then wipes away." },
  { id: "logo-zoom" as const, label: "4. Logo Zoom-In", desc: "Big AJ mark shrinks to navbar position." },
  { id: "particles-grid" as const, label: "5. Grid Build", desc: "Grid lines draw themselves, name fades in over them." },
];

export default function IntroPreviewPage() {
  const [active, setActive] = useState<IntroId>(null);

  return (
    <div className="min-h-screen bg-[#0a0517] text-white px-8 py-16">
      <div className="mx-auto max-w-[900px]">
        <h1 className="mb-3 text-3xl font-black tracking-tight">Intro Animation Previews</h1>
        <p className="mb-10 text-white/60">Click any option below to play the animation full-screen.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActive(opt.id)}
              className="text-left rounded-xl border border-white/[0.1] bg-white/[0.04] p-5 transition-all hover:border-yellow/40 hover:bg-white/[0.07] hover:-translate-y-[2px]"
            >
              <h3 className="mb-1 text-base font-bold text-white">{opt.label}</h3>
              <p className="text-sm text-white/55">{opt.desc}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-yellow">
                ▶ Play preview
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active === "name-reveal" && <NameReveal onDone={() => setActive(null)} />}
        {active === "tagline-curtain" && <TaglineCurtain onDone={() => setActive(null)} />}
        {active === "loading-bar" && <LoadingBar onDone={() => setActive(null)} />}
        {active === "logo-zoom" && <LogoZoom onDone={() => setActive(null)} />}
        {active === "particles-grid" && <ParticlesGrid onDone={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Shared overlay wrapper ---------- */
function Overlay({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="fixed inset-0 z-50 cursor-pointer flex items-center justify-center overflow-hidden"
    >
      {children}
      <div className="absolute top-4 right-4 text-[0.6rem] font-bold uppercase tracking-widest text-white/40 z-[60]">
        Click anywhere to close
      </div>
    </motion.div>
  );
}

/* ---------- 1. Name Reveal ---------- */
function NameReveal({ onDone }: { onDone: () => void }) {
  const text = "ALLEN BACTAD";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown < text.length) {
      const t = setTimeout(() => setShown(shown + 1), 90);
      return () => clearTimeout(t);
    }
    const exit = setTimeout(onDone, 1400);
    return () => clearTimeout(exit);
  }, [shown, onDone]);

  return (
    <Overlay onClick={onDone}>
      <div className="absolute inset-0 bg-black" />
      <div className="relative z-10 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-yellow">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
          {text.slice(0, shown)}
          <span className="inline-block w-[3px] h-[1em] bg-yellow ml-1 align-middle animate-pulse" />
        </h1>
      </div>
    </Overlay>
  );
}

/* ---------- 2. Tagline Curtain ---------- */
function TaglineCurtain({ onDone }: { onDone: () => void }) {
  const words = ["Automation.", "Funnels.", "Systems.", "Growth."];
  const [step, setStep] = useState(0);
  const [curtain, setCurtain] = useState(false);

  useEffect(() => {
    if (step < words.length) {
      const t = setTimeout(() => setStep(step + 1), 450);
      return () => clearTimeout(t);
    }
    const c = setTimeout(() => setCurtain(true), 600);
    const exit = setTimeout(onDone, 1700);
    return () => { clearTimeout(c); clearTimeout(exit); };
  }, [step, onDone]);

  return (
    <Overlay onClick={onDone}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: curtain ? "-100%" : 0 }}
        transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 bg-black flex items-center justify-center"
      >
        <div className="text-center">
          {words.slice(0, step).map((w, i) => (
            <motion.div
              key={w}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`text-3xl md:text-5xl font-black tracking-tight ${
                i === words.length - 1 ? "text-yellow" : "text-white"
              }`}
            >
              {w}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Overlay>
  );
}

/* ---------- 3. Loading Bar ---------- */
function LoadingBar({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const t = setTimeout(() => setProgress(Math.min(100, progress + 4)), 35);
      return () => clearTimeout(t);
    }
    const e = setTimeout(() => setExit(true), 300);
    const d = setTimeout(onDone, 1100);
    return () => { clearTimeout(e); clearTimeout(d); };
  }, [progress, onDone]);

  return (
    <Overlay onClick={onDone}>
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: exit ? 0 : 1 }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
        className="absolute inset-0 bg-black flex flex-col items-center justify-center"
      >
        <div className="w-[280px]">
          <div className="mb-4 flex justify-between text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/50">
            <span>Initializing systems</span>
            <span className="text-yellow">{progress}%</span>
          </div>
          <div className="h-[3px] w-full bg-white/[0.08] overflow-hidden rounded-full">
            <div
              className="h-full bg-yellow transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-6 text-center text-xs text-white/30 font-mono">
            {progress < 30 && "loading_modules.js"}
            {progress >= 30 && progress < 60 && "compiling_funnels.ts"}
            {progress >= 60 && progress < 90 && "spinning_up_pipelines.go"}
            {progress >= 90 && "ready ✓"}
          </p>
        </div>
      </motion.div>
    </Overlay>
  );
}

/* ---------- 4. Logo Zoom-In ---------- */
function LogoZoom({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"big" | "shrink" | "fade">("big");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shrink"), 700);
    const t2 = setTimeout(() => setPhase("fade"), 1700);
    const t3 = setTimeout(onDone, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <Overlay onClick={onDone}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fade" ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-black"
      />
      <motion.div
        initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
        animate={
          phase === "shrink"
            ? { scale: 0.18, x: "-44vw", y: "-44vh", opacity: 1 }
            : phase === "fade"
            ? { scale: 0.18, x: "-44vw", y: "-44vh", opacity: 0 }
            : { scale: 1, x: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 1, ease: [0.7, 0, 0.2, 1] }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center w-[260px] h-[260px] rounded-3xl border-2 border-yellow/40 bg-yellow/10">
          <span className="text-7xl font-black text-white">
            A<span className="text-yellow">J</span>
          </span>
        </div>
      </motion.div>
    </Overlay>
  );
}

/* ---------- 5. Particles / Grid Build ---------- */
function ParticlesGrid({ onDone }: { onDone: () => void }) {
  const [showName, setShowName] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 900);
    const t2 = setTimeout(() => setExit(true), 2200);
    const t3 = setTimeout(onDone, 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <Overlay onClick={onDone}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-[#0a0517] overflow-hidden"
      >
        {/* Animated grid */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(94,23,235,0.3)" strokeWidth="1" />
            </pattern>
          </defs>
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            width="100%"
            height="100%"
            fill="url(#grid)"
          />
        </svg>

        {/* Drawing diagonal lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.line
            x1="0" y1="0" x2="100%" y2="100%"
            stroke="rgba(245,210,71,0.4)" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
          <motion.line
            x1="100%" y1="0" x2="0" y2="100%"
            stroke="rgba(245,210,71,0.4)" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
        </svg>

        {/* Glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-persian/20 blur-[100px]" />

        {/* Name */}
        <AnimatePresence>
          {showName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-yellow">System Online</p>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
                  ALLEN BACTAD
                </h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Overlay>
  );
}
