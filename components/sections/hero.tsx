"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Dancing_Script } from "next/font/google";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroCertificates } from "@/components/sections/hero-certificates";

// Script font ONLY for the "Hello, I'm" eyebrow (matches the reference); rest stays Inter
const script = Dancing_Script({ subsets: ["latin"], weight: ["600", "700"] });

// PLACEHOLDER stats, AJ to confirm real numbers
const stats = [
  { target: 5, suffix: "+", label: "Years Experience" },
  { target: 40, suffix: "+", label: "Projects Completed" },
  { target: 20, suffix: "+", label: "Happy Clients" },
];

const socials = [
  { name: "Facebook", href: "https://www.facebook.com/Ajbactad29/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
  { name: "Instagram", href: "https://www.instagram.com/aj_automate.co/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ajbactad29/", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { name: "WhatsApp", href: "https://wa.me/639100809837", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.743-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg> },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden">
      {/* ambient brand glows */}
      <div className="pointer-events-none absolute -top-[10%] right-[12%] h-[420px] w-[420px] rounded-full bg-persian/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[4%] h-[320px] w-[320px] rounded-full bg-yellow/8 blur-[110px]" />

      {/* Giant background wordmark (subtle scroll parallax) */}
      <motion.div style={{ y: wordY }} className="pointer-events-none absolute inset-x-0 top-1 z-0 flex justify-center lg:top-[10%]">
        <span className="select-none whitespace-nowrap bg-gradient-to-b from-[#8b4dff] via-persian to-persian/30 bg-clip-text text-[3.4rem] font-black leading-none tracking-tighter text-transparent sm:text-[6.5rem] md:text-[9rem] lg:text-[13rem] xl:text-[18rem]">
          PORTFOLIO
        </span>
      </motion.div>

      {/* Portrait cutout, center stage, bottom anchored */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center lg:flex"
      >
        <div className="relative aspect-[1089/1329] h-[58vh] max-h-[540px] w-auto lg:h-[80vh] lg:max-h-[760px] lg:translate-x-[6%]">
          <Image
            src="/aj-hero-cutout.webp"
            alt="Allen Bactad, GHL Expert & AI Specialist"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>
      </motion.div>

      {/* readability scrims (so text sits above the portrait) */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-r from-[#08060e] via-[#08060e]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-40 bg-gradient-to-t from-[#08060e] to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:py-20">
        {/* LEFT, name / role / copy */}
        <div className="flex flex-col gap-5 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
              </span>
              Available Nationwide
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${script.className} text-4xl leading-none text-white/80 sm:text-[2.75rem]`}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.6rem] font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            AJ BACTAD
          </motion.h1>

          {/* Mobile portrait, professional photo card below the name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/[0.10] shadow-[0_18px_50px_rgba(0,0,0,0.45)] lg:hidden"
          >
            <Image
              src="/aj-bactad-photo.webp"
              alt="AJ Bactad, GHL Certified & AI Automation Specialist"
              width={1122}
              height={1402}
              priority
              className="h-auto w-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-bold uppercase tracking-[0.2em] text-yellow"
          >
            GHL Certified &amp; AI Automation Specialist
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-md text-base leading-relaxed text-white/55"
          >
            I don&apos;t just connect tools, I engineer the system behind your growth. CRM, funnels, automations, and AI, wired into one operating system that runs the busywork so you can scale without the chaos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 pt-6"
          >
            <Magnetic>
              <Link
                href="/consult"
                className="inline-flex items-center rounded-xl border border-persian/60 bg-persian px-6 py-3 font-semibold text-white transition-all hover:bg-persian-dark hover:shadow-[0_0_30px_rgba(94,23,235,0.35)]"
              >
                Book Free Consultation &rarr;
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/system-builds"
                className="inline-flex items-center rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 font-semibold text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.07]"
              >
                Check My System Build
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-6 pt-4"
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] text-white/45 transition-all hover:border-white/[0.15] hover:bg-white/[0.10] hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT, stat column + certificates entry point */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col gap-8 lg:col-span-3 lg:col-start-10 lg:justify-center"
        >
          <div className="flex flex-row justify-between gap-6 lg:flex-col lg:items-end lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col lg:items-end lg:text-right">
                <Counter
                  target={stat.target}
                  suffix={stat.suffix}
                  className="text-3xl font-extrabold text-yellow sm:text-4xl lg:text-5xl"
                />
                <span className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
                  {stat.label}
                </span>
                <span className="mt-3 hidden h-px w-16 bg-white/10 lg:block" />
              </div>
            ))}
          </div>

          <div className="flex lg:justify-end">
            <HeroCertificates />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
