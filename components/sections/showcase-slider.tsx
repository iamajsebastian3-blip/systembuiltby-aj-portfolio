"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface Slide {
  href: string;
  brand: string;
  title: string;
  cta: string;
  image: string;
}

const slides: Slide[] = [
  {
    href: "/about",
    brand: "About",
    title: "About AJ",
    cta: "Read My Story",
    image: "/showcase/about.png",
  },
  {
    href: "/projects",
    brand: "Portfolio",
    title: "Work I've Built",
    cta: "Browse Projects",
    image: "/showcase/portfolio.png",
  },
  {
    href: "/services",
    brand: "Services",
    title: "What I Build",
    cta: "See Services",
    image: "/showcase/services.png",
  },
  {
    href: "/packages",
    brand: "Pricing",
    title: "Pick Your Phase",
    cta: "View Pricing",
    image: "/showcase/packages.png",
  },
];

export function ShowcaseSlider() {
  const [active, setActive] = useState(0);
  const total = slides.length;

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-persian/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow">
            Explore the Site
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-white">
            What's Inside
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="relative h-[560px] sm:h-[620px] flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-persian/40 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center">
            {slides.map((slide, i) => {
              let offset = i - active;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const abs = Math.abs(offset);
              const isActive = offset === 0;
              const isAdjacent = abs === 1;
              const isHidden = abs > 2;

              const x = offset * 240;
              const rotateY = offset * -22;
              const scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7;
              const opacity = isHidden ? 0 : isActive ? 1 : isAdjacent ? 0.7 : 0.35;
              const blur = isActive ? 0 : isAdjacent ? 1 : 3;
              const z = 100 - abs * 10;

              return (
                <motion.div
                  key={slide.href}
                  className="absolute"
                  initial={false}
                  animate={{ x, rotateY, scale, opacity, filter: `blur(${blur}px)` }}
                  transition={{ type: "spring", stiffness: 110, damping: 22 }}
                  style={{
                    zIndex: z,
                    pointerEvents: isHidden ? "none" : "auto",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => !isActive && !isHidden && setActive(i)}
                >
                  <PhoneCard slide={slide} interactive={isActive} />
                </motion.div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 sm:right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-persian/40 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.href}
              onClick={() => setActive(i)}
              aria-label={`Go to ${s.brand}`}
              className={`transition-all ${
                i === active
                  ? "w-8 h-2 rounded-full bg-yellow"
                  : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneCard({ slide, interactive }: { slide: Slide; interactive: boolean }) {
  return (
    <Link
      href={slide.href}
      tabIndex={interactive ? 0 : -1}
      className={`relative block w-[260px] sm:w-[300px] h-[520px] sm:h-[580px] rounded-[36px] overflow-hidden border border-white/[0.12] bg-black shadow-[0_24px_64px_rgba(0,0,0,0.55)] cursor-pointer ${
        interactive ? "ring-2 ring-persian/40" : ""
      }`}
    >
      {/* Screenshot — fills the phone */}
      <Image
        src={slide.image}
        alt={`${slide.title} preview`}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 260px, 300px"
        priority={interactive}
      />

      {/* Top fade for the notch + brand label */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10" />

      {/* Phone notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20" />

      {/* Brand label */}
      <div className="absolute top-9 left-0 right-0 z-20 px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400/70" />
          <span className="w-2 h-2 rounded-full bg-amber-400/70" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-[0.55rem] font-extrabold uppercase tracking-wider text-yellow">
          {slide.brand}
        </span>
      </div>

      {/* Bottom fade + title + CTA */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-16 pb-6 px-5">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-3 leading-tight">
          {slide.title}
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow px-4 py-2 text-[0.65rem] font-extrabold uppercase tracking-wider text-black">
          {slide.cta}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
