# System Built by AJ — Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the System Built by AJ single-file HTML site into a production-grade Next.js 16 app with shadcn/ui, Framer Motion animations, and Vercel deployment.

**Architecture:** Next.js App Router with 7 routes, reusable motion components (ScrollReveal, StaggerChildren, Counter), shadcn/ui primitives styled with custom dark theme tokens, and Framer Motion for all animations. All content migrated 1:1 from the existing HTML.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Lucide React, Vercel

**Source HTML reference:** `c:\Users\AMD\Desktop\website aj.txt`

---

## Task 1: Scaffold Next.js Project + Configure Tailwind + Custom Theme

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `lib/utils.ts`
- Create: `.gitignore`
- Create: `.env.example`

- [ ] **Step 1: Create Next.js project**

Run:
```bash
cd "c:/Users/AMD/Desktop/Claude Code/System-BuiltBy AJ/projects/SystemBuiltBy AJ"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

Select defaults when prompted. If it asks about overwriting existing files, accept.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Zinc
- CSS variables: Yes

- [ ] **Step 4: Install required shadcn/ui components**

Run:
```bash
npx shadcn@latest add button card badge accordion tabs
```

- [ ] **Step 5: Configure custom theme in `tailwind.config.ts`**

Replace the contents of `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0d0d0d",
        card: "#141414",
        persian: {
          DEFAULT: "#5e17eb",
          dark: "#4d0fd4",
          light: "#7c3aed",
        },
        yellow: {
          DEFAULT: "#f6cb1f",
          dark: "#d4a800",
        },
        border: "rgba(255,255,255,0.10)",
        "border-hover": "rgba(255,255,255,0.18)",
        "text-primary": "#ffffff",
        "text-muted": "rgba(255,255,255,0.65)",
        "text-faint": "rgba(255,255,255,0.35)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 6: Set up `app/globals.css` with base styles**

Replace `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-white/10;
  }

  body {
    @apply bg-background text-white antialiased;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0d0d0d;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Set up root layout with Inter font**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://systembuiltbyaj.com"),
  title: {
    default: "System Built by AJ — Growth Engineering",
    template: "%s | System Built by AJ",
  },
  description:
    "Funnels that convert. Automations that scale. Workflows you don't have to babysit. Growth engineering by AJ.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "System Built by AJ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create placeholder homepage**

Replace `app/page.tsx` with:

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-black text-white tracking-tight">
        System Built by AJ
      </h1>
    </main>
  );
}
```

- [ ] **Step 9: Create `.env.example` and update `.gitignore`**

Create `.env.example`:
```
# No secrets required yet
# Add environment variables here as needed
```

Ensure `.gitignore` includes:
```
.env*.local
.superpowers/
```

- [ ] **Step 10: Verify the dev server runs**

Run:
```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:3000`, shows "System Built by AJ" centered on a black background.

- [ ] **Step 11: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, shadcn/ui, and custom dark theme"
```

---

## Task 2: Motion Components (ScrollReveal, StaggerChildren, Counter, PageTransition)

**Files:**
- Create: `components/motion/scroll-reveal.tsx`
- Create: `components/motion/stagger-children.tsx`
- Create: `components/motion/counter.tsx`
- Create: `components/motion/page-transition.tsx`

These are reusable building blocks used across every page.

- [ ] **Step 1: Create `components/motion/scroll-reveal.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Variant = "fade-up" | "fade-left" | "fade-right";

const variants: Record<Variant, { hidden: object; visible: object }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create `components/motion/stagger-children.tsx`**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export function StaggerChildren({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `components/motion/counter.tsx`**

```tsx
"use client";

import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });
  const [display, setDisplay] = useState("0");

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: duration,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      const rounded =
        target % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString();
      setDisplay(rounded);
    });
    return unsubscribe;
  }, [spring, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: Create `components/motion/page-transition.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Verify motion components render**

Temporarily update `app/page.tsx` to test:

```tsx
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Counter } from "@/components/motion/counter";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8">
      <ScrollReveal>
        <h1 className="text-4xl font-black text-white">System Built by AJ</h1>
      </ScrollReveal>
      <div className="text-5xl font-black text-persian">
        <Counter target={60} suffix="%" />
      </div>
    </main>
  );
}
```

Run `npm run dev`, verify the heading fades in and the counter animates to 60%.

- [ ] **Step 6: Commit**

```bash
git add components/motion/
git commit -m "feat: add reusable motion components (ScrollReveal, StaggerChildren, Counter, PageTransition)"
```

---

## Task 3: Navbar + Mobile Menu + Footer

**Files:**
- Create: `components/layout/navbar.tsx`
- Create: `components/layout/mobile-menu.tsx`
- Create: `components/layout/footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/layout/navbar.tsx`**

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { MobileMenu } from "./mobile-menu";

const solutionsItems = [
  { href: "/about", icon: "🤝", title: "About", sub: "Who I am & how I work" },
  { href: "/projects", icon: "📁", title: "Portfolio", sub: "Automations, funnels, websites, apps" },
  { href: "/projects#sec-auto", icon: "🧩", title: "Services", sub: "All 8 service categories" },
  { href: "/packages", icon: "📦", title: "Packages", sub: "Starter · Growth · Scale" },
];

const workItems = [
  { href: "/portfolio#op-funnel", icon: "🎯", title: "Featured Funnel", sub: "Live funnel showcase" },
  { href: "/portfolio#op-website", icon: "🌐", title: "Featured Website", sub: "Live website showcase" },
  { divider: true },
  { href: "/projects#sec-auto", icon: "⚡", title: "Automations", sub: "GHL workflow builds" },
  { href: "/projects#sec-apps", icon: "📱", title: "Apps & Tools", sub: "Web apps & integrations" },
];

const navHighlight: Record<string, string> = {
  "/": "home",
  "/about": "solutions",
  "/projects": "solutions",
  "/packages": "solutions",
  "/revenue": "revenue",
  "/consult": "home",
  "/portfolio": "work",
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dropRef = useRef<HTMLDivElement>(null);

  const activeNav = navHighlight[pathname] || "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setOpenDrop(null);
    setMobileOpen(false);
  }, [pathname]);

  const toggleDrop = (id: string) => {
    setOpenDrop(openDrop === id ? null : id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-16 z-50 bg-black/92 backdrop-blur-xl border-b border-white/10 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_32px_rgba(94,23,235,0.2)]" : ""
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-7 h-full flex items-center" ref={dropRef}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mr-8 shrink-0 group">
            <div className="w-[42px] h-[42px] bg-yellow rounded-md flex items-center justify-center transition-transform duration-200 group-hover:rotate-[-5deg] group-hover:scale-105">
              <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                <text x="16" y="14" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fontWeight="700" fill="#000">01</text>
                <line x1="6" y1="18" x2="26" y2="18" stroke="#000" strokeWidth="1.2" />
                <text x="16" y="28" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontSize="10" fontWeight="700" fill="#000">10</text>
              </svg>
            </div>
            <span className="font-black text-base uppercase tracking-tight">
              <span className="text-white">SYSTEM-BUILT</span>{" "}
              <span className="text-yellow">BY AJ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            <Link
              href="/"
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                activeNav === "home" ? "text-persian bg-persian/10" : "text-text-muted hover:text-persian hover:bg-persian/10"
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDrop("solutions")}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  activeNav === "solutions" ? "text-persian bg-persian/10" : "text-text-muted hover:text-persian hover:bg-persian/10"
                }`}
              >
                Solutions
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDrop === "solutions" ? "rotate-180" : ""}`} />
              </button>
              {openDrop === "solutions" && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-[#141414] border border-white/18 rounded-2xl p-2 min-w-[260px] z-50 shadow-[0_16px_48px_rgba(94,23,235,0.15)] animate-in fade-in slide-in-from-top-2 duration-200">
                  {solutionsItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[9px] text-text-muted hover:bg-persian/10 hover:text-persian transition-colors duration-150"
                      onClick={() => setOpenDrop(null)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-sm shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-persian">{item.title}</div>
                        <div className="text-[0.7rem] text-text-faint mt-0.5">{item.sub}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/revenue"
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap ${
                activeNav === "revenue" ? "text-persian bg-persian/10" : "text-text-muted hover:text-persian hover:bg-persian/10"
              }`}
            >
              Revenue Tools
            </Link>

            {/* Work Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDrop("work")}
                className={`flex items-center gap-1 px-3.5 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                  activeNav === "work" ? "text-persian bg-persian/10" : "text-text-muted hover:text-persian hover:bg-persian/10"
                }`}
              >
                Work
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDrop === "work" ? "rotate-180" : ""}`} />
              </button>
              {openDrop === "work" && (
                <div className="absolute top-[calc(100%+10px)] left-0 bg-[#141414] border border-white/18 rounded-2xl p-2 min-w-[240px] z-50 shadow-[0_16px_48px_rgba(94,23,235,0.15)] animate-in fade-in slide-in-from-top-2 duration-200">
                  {workItems.map((item, i) =>
                    "divider" in item ? (
                      <div key={i} className="h-px bg-white/10 my-1.5 mx-1" />
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-[9px] text-text-muted hover:bg-persian/10 hover:text-persian transition-colors duration-150"
                        onClick={() => setOpenDrop(null)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-sm shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="text-[0.7rem] text-text-faint mt-0.5">{item.sub}</div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-[9px] flex items-center justify-center bg-white/8 border border-white/10 hover:bg-persian/18 hover:scale-105 transition-all duration-150 shrink-0"
              title="Toggle theme"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <Link
              href="/consult"
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 bg-yellow text-black rounded-[9px] text-sm font-extrabold hover:bg-yellow-dark hover:translate-y-[-1px] hover:shadow-[0_6px_20px_rgba(246,203,31,0.35)] transition-all duration-200 whitespace-nowrap"
            >
              Free Consultation
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-9 h-9 rounded-[9px] flex items-center justify-center bg-white/8 border border-white/10 hover:bg-persian/18 transition-colors duration-150"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Create `components/layout/mobile-menu.tsx`**

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Portfolio" },
  { href: "/packages", label: "Packages" },
  { href: "/revenue", label: "Revenue Tools" },
  { href: "/portfolio", label: "Featured Work" },
  { href: "/consult", label: "Free Consultation", cta: true },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-[#0d0d0d] border-l border-white/10 z-[70] p-6 flex flex-col"
          >
            <button
              onClick={onClose}
              className="self-end w-9 h-9 rounded-[9px] flex items-center justify-center bg-white/8 border border-white/10 hover:bg-persian/18 transition-colors duration-150 mb-8"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={
                    link.cta
                      ? "mt-4 px-5 py-3 bg-yellow text-black rounded-[9px] text-sm font-extrabold text-center hover:bg-yellow-dark transition-colors duration-200"
                      : "px-4 py-3 text-sm font-semibold text-text-muted hover:text-persian hover:bg-persian/10 rounded-lg transition-colors duration-150"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create `components/layout/footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] py-7 px-8">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-3">
        <span className="font-extrabold text-sm text-white uppercase tracking-wide">
          System Built by AJ
        </span>
        <span className="text-xs text-white/30">
          © {new Date().getFullYear()} All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Update `app/layout.tsx` to include Navbar and Footer**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://systembuiltbyaj.com"),
  title: {
    default: "System Built by AJ — Growth Engineering",
    template: "%s | System Built by AJ",
  },
  description:
    "Funnels that convert. Automations that scale. Workflows you don't have to babysit. Growth engineering by AJ.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "System Built by AJ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify navbar renders and dropdowns work**

Run `npm run dev`, check:
- Navbar is fixed at top with blur backdrop
- Logo displays correctly
- Solutions dropdown opens/closes on click
- Work dropdown opens/closes on click
- Mobile menu opens on small screens
- "Free Consultation" button links to `/consult`

- [ ] **Step 6: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add navbar with dropdowns, mobile menu, and footer"
```

---

## Task 4: Homepage — Hero Section

**Files:**
- Create: `components/sections/hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Counter } from "@/components/motion/counter";

const titleWords = ["I DON'T CHASE", "GROWTH. I", "ENGINEER", "THE SYSTEM", "BEHIND IT."];

const badges = [
  "GHL Expert",
  "Google Ads",
  "Local SEO",
  "CRM Automation",
  "Funnel Builder",
];

const metrics = [
  { val: 60, suffix: "%", label: "No-show reduction" },
  { val: 2.5, suffix: "×", label: "Lead conversion lift" },
  { val: 48, suffix: "h", label: "GHL setup time" },
  { val: 100, suffix: "%", label: "Follow-up automated" },
];

export function Hero() {
  return (
    <section className="bg-black min-h-[calc(100vh-64px)] flex items-center py-18 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_85%_20%,rgba(94,23,235,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_10%_80%,rgba(246,203,31,0.04)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:32px_32px]" />
      </div>

      <div className="max-w-[1100px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-18 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/8 border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-extrabold text-white tracking-wider uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-yellow animate-pulse" />
              Available for new clients
            </motion.div>

            <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.04] tracking-[-0.03em] text-white mb-5">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="block"
                >
                  {word === "ENGINEER" ? (
                    <em className="not-italic text-yellow">{word}</em>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-base text-white/60 leading-relaxed max-w-[480px] mb-8"
            >
              Funnels that convert. Automations that scale. Workflows you don&apos;t have to babysit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="flex gap-3 flex-wrap mb-13"
            >
              <Link
                href="/consult"
                className="inline-flex items-center gap-2 px-7 py-3 bg-persian text-white rounded-[9px] text-sm font-extrabold uppercase tracking-wide hover:bg-persian-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(94,23,235,0.4)] transition-all duration-200"
              >
                Book Free Consultation →
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent text-white border-2 border-white rounded-[9px] text-sm font-extrabold uppercase tracking-wide hover:bg-white/10 transition-all duration-200"
              >
                Check My Portfolio
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex gap-8 pt-8 border-t border-white/10"
            >
              {[
                { val: "5+", label: "Years freelancing" },
                { val: "12mo", label: "Deep automation focus" },
                { val: "GHL", label: "Certified expert" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[1.8rem] font-black text-white tracking-tight leading-none">
                    {stat.val}
                  </div>
                  <div className="text-xs text-white/40 mt-1 font-semibold tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.7, type: "spring", stiffness: 80 }}
            className="bg-white rounded-3xl p-7 shadow-[0_24px_72px_rgba(0,0,0,0.25)] relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(circle,rgba(94,23,235,0.18)_0%,transparent_70%)] pointer-events-none" />

            <div className="text-[0.62rem] font-extrabold tracking-[0.14em] uppercase text-black/35 mb-5">
              Growth Systems Consultant
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-[50px] h-[50px] rounded-full bg-persian flex items-center justify-center font-black text-base text-white shrink-0">
                AJ
              </div>
              <div>
                <div className="font-bold text-[0.9375rem] text-black">AJ</div>
                <div className="text-xs text-black/35 mt-0.5">
                  System Builder · Growth Engineer
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-persian/10 border border-persian/30 text-persian"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-persian/10 rounded-[10px] p-3 border border-white/10 hover:bg-persian/18 hover:border-persian/30 transition-colors duration-200 cursor-default"
                >
                  <div className="text-xl font-black text-persian tracking-tight">
                    <Counter target={m.val} suffix={m.suffix} />
                  </div>
                  <div className="text-[0.65rem] text-black/35 mt-0.5 font-semibold uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx` with Hero**

```tsx
import { Hero } from "@/components/sections/hero";

export default function HomePage() {
  return <Hero />;
}
```

- [ ] **Step 3: Verify hero renders**

Run `npm run dev`. Check:
- Title words animate in staggered
- "ENGINEER" is yellow
- Profile card slides in from right
- Counter values animate
- CTAs link correctly
- Background gradient effects visible
- Responsive on mobile (single column)

- [ ] **Step 4: Commit**

```bash
git add components/sections/hero.tsx app/page.tsx
git commit -m "feat: add homepage hero section with animated title, profile card, and counters"
```

---

## Task 5: Homepage — Vault, Philosophy, Services Sections

**Files:**
- Create: `components/sections/vault.tsx`
- Create: `components/sections/philosophy.tsx`
- Create: `components/sections/services.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/vault.tsx`**

```tsx
"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

const operational = [
  "Funnels are underperforming against expected conversion benchmarks",
  "Automations are fragmented or improperly triggered",
  "Leads are leaking between pipeline stages",
  "The system feels complex, not controlled",
];

const needsEngineering = [
  "You're unsure how to structure your lead flow",
  "You don't want to build a system twice",
  "You need automation done correctly the first time",
  "You want growth without operational chaos",
];

export function Vault() {
  return (
    <section className="py-22 bg-white">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-persian mb-2.5">
              <span className="w-4 h-0.5 bg-persian rounded-full" />
              IS THIS YOU?
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-black tracking-[-0.03em] leading-tight text-black">
              Whether Your System Exists
              <br />
              Or Needs to Be Built.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <ScrollReveal variant="fade-left" delay={0.15}>
            <div className="rounded-xl p-7 bg-white border-[1.5px] border-black hover:translate-y-[-3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-200">
              <div className="flex items-center gap-2.5 text-base font-extrabold text-black mb-4">
                <div className="w-[30px] h-[30px] rounded-md bg-persian flex items-center justify-center shrink-0">
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M2 7l4 4 8-8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                System Operational
              </div>
              <ul className="space-y-1">
                {operational.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-start gap-2.5 py-1.5 leading-relaxed">
                    <span className="shrink-0 mt-1 w-3.5 h-3.5 rounded-full bg-persian bg-[url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 12 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5l3 3 7-7' stroke='white' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E&quot;)] bg-[length:8px_8px] bg-no-repeat bg-center" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={0.15}>
            <div className="rounded-xl p-7 bg-white border-[1.5px] border-black hover:translate-y-[-3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-200">
              <div className="flex items-center gap-2.5 text-base font-extrabold text-black mb-4">
                <div className="w-[30px] h-[30px] rounded-md bg-red-600 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                System Needs Engineering
              </div>
              <ul className="space-y-1">
                {needsEngineering.map((item) => (
                  <li key={item} className="text-sm text-gray-600 flex items-start gap-2.5 py-1.5 leading-relaxed">
                    <span className="shrink-0 mt-0.5 w-3.5 font-black text-xs text-red-600 text-center">!</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/philosophy.tsx`**

```tsx
"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const modules = [
  { id: "MOD_01", title: "Structure Before Scale", body: "I build the foundation first so growth doesn't break your business architecture." },
  { id: "MOD_02", title: "Systems Over Tools", body: "Tools change. Logic doesn't. I build the infrastructure layer, not the software dependency." },
  { id: "MOD_03", title: "Clarity and Execution", body: "Every trigger, tag, and transition serves a measurable function. No wasted motion. No orphaned steps." },
  { id: "MOD_04", title: "Intentional Automation", body: "Automation should feel human — not mechanical. Scale without sacrificing experience." },
];

export function Philosophy() {
  return (
    <section className="py-22 bg-black">
      <div className="max-w-[1100px] mx-auto px-8">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-3.5">
            <span className="w-4 h-0.5 bg-yellow rounded-full" />
            Methodology
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-[clamp(2.4rem,6vw,4rem)] font-black leading-[0.95] tracking-[-0.02em] text-white uppercase max-w-[600px]">
            The System-First
            <br />
            Philosophy
          </h2>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {modules.map((mod) => (
            <StaggerItem key={mod.id}>
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-[14px] p-7 cursor-default transition-all duration-300 hover:bg-white/[0.07] hover:border-yellow/30 hover:translate-y-[-3px]">
                <div className="inline-flex items-center gap-2 text-[0.7rem] font-extrabold text-yellow tracking-wider uppercase mb-2.5">
                  <span className="w-3 h-3 rounded-full border-2 border-yellow shrink-0" />
                  {mod.id}
                </div>
                <div className="font-extrabold text-lg text-white tracking-tight leading-snug mb-2">
                  {mod.title}
                </div>
                <div className="text-sm text-white/50 leading-relaxed">
                  {mod.body}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/services.tsx`**

This component contains the 6 service cards with their SVG icons. Due to the SVG content, this is a larger file.

```tsx
"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { motion } from "framer-motion";

const services = [
  {
    name: "Funnels & Websites",
    desc: "High-converting landing pages and sales funnels that capture and qualify leads automatically.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="4" y="6" width="24" height="18" rx="2.5" />
        <line x1="8" y1="24" x2="8" y2="33" />
        <line x1="20" y1="24" x2="20" y2="33" />
        <line x1="5" y1="33" x2="23" y2="33" />
        <line x1="29" y1="11" x2="37" y2="11" />
        <line x1="29" y1="16" x2="35" y2="16" />
        <line x1="29" y1="21" x2="37" y2="21" />
      </svg>
    ),
  },
  {
    name: "Pipelines & Workflows",
    desc: "Structured systems to track every lead from first touch to closed deal.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="8" cy="8" r="4.5" />
        <circle cx="32" cy="8" r="4.5" />
        <circle cx="32" cy="32" r="4.5" />
        <circle cx="8" cy="32" r="4.5" />
        <line x1="12.5" y1="8" x2="27.5" y2="8" />
        <line x1="32" y1="12.5" x2="32" y2="27.5" />
        <line x1="27.5" y1="32" x2="12.5" y2="32" />
        <line x1="8" y1="27.5" x2="8" y2="12.5" />
        <line x1="12" y1="12" x2="28" y2="28" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    name: "Email & SMS Automations",
    desc: "Automated follow-up sequences that nurture leads and move them through your pipeline.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="3" y="8" width="24" height="17" rx="3" />
        <path d="M3 12l12 8 12-8" />
        <path d="M29 10h8M29 15h7M29 20h8" />
      </svg>
    ),
  },
  {
    name: "Calendar & Booking",
    desc: "Seamless scheduling that integrates with your calendar and automates reminders.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <rect x="4" y="6" width="32" height="29" rx="3" />
        <line x1="4" y1="14" x2="36" y2="14" />
        <line x1="13" y1="3" x2="13" y2="10" />
        <line x1="27" y1="3" x2="27" y2="10" />
        <rect x="9" y="19" width="7" height="6" rx="1.5" fill="#f6cb1f" opacity="0.25" stroke="#f6cb1f" />
        <rect x="23" y="19" width="7" height="6" rx="1.5" />
        <line x1="13" y1="31" x2="27" y2="31" />
      </svg>
    ),
  },
  {
    name: "Missed-Lead Recovery",
    desc: "Automated systems to re-engage leads who went cold or no-showed.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="20" cy="20" r="15" />
        <path d="M20 5v4M20 31v4M5 20h4M31 20h4" />
        <circle cx="20" cy="20" r="6" />
        <path d="M20 14v6l4 4" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Custom Integrations",
    desc: "API and webhook connections that unify your stack into one seamless revenue machine.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#f6cb1f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 6v28M6 20h28" />
        <path d="M20 6 Q 30 13 30 20 Q 30 27 20 34 Q 10 27 10 20 Q 10 13 20 6z" />
        <circle cx="20" cy="20" r="3" fill="#f6cb1f" opacity="0.5" stroke="none" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section className="py-22 bg-black">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-yellow justify-center">
              <span className="w-4 h-0.5 bg-yellow rounded-full" />
              Services
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-white uppercase mt-2">
              HighLevel Setup &
              <br />
              Optimization
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-sm text-white/45 italic mt-2 max-w-[520px] mx-auto">
              High-performance infrastructure for your sales operations.
            </p>
          </ScrollReveal>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {services.map((svc) => (
            <StaggerItem key={svc.name}>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-[14px] p-7 transition-all duration-250 hover:bg-white/[0.06] hover:border-yellow/25 hover:translate-y-[-4px] cursor-default relative overflow-hidden group">
                <motion.div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(246,203,31,0.6)]">
                    {svc.icon}
                  </div>
                </motion.div>
                <div className="font-black text-sm text-white mb-2.5 uppercase tracking-wide leading-snug">
                  {svc.name}
                </div>
                <div className="text-[0.78rem] text-white/45 leading-relaxed italic">
                  {svc.desc}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/hero";
import { Vault } from "@/components/sections/vault";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vault />
      <Philosophy />
      <Services />
    </>
  );
}
```

- [ ] **Step 5: Verify all three sections render**

Run `npm run dev`. Check:
- Vault: white background, dual cards slide in from left/right
- Philosophy: 2x2 grid, staggered entrance, yellow hover border
- Services: 3-col grid, icon glow on hover, staggered entrance
- All text content matches the original HTML

- [ ] **Step 6: Commit**

```bash
git add components/sections/vault.tsx components/sections/philosophy.tsx components/sections/services.tsx app/page.tsx
git commit -m "feat: add vault, philosophy, and services homepage sections"
```

---

## Task 6: Homepage — Testimonials, HL Banner, FAQ, Final CTA

**Files:**
- Create: `components/sections/testimonials.tsx`
- Create: `components/sections/hl-banner.tsx`
- Create: `components/sections/faq.tsx`
- Create: `components/sections/final-cta.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/testimonials.tsx`**

```tsx
"use client";

import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const testimonials = [
  {
    text: "AJ didn't just 'set up' our HighLevel. He rebuilt the entire logic behind how our leads move. Before him, we had automations but no structure. Now everything flows perfectly.",
    author: "Claire Montero",
    role: "7-Figure Service Brand",
    avatarBg: "#e8d5c4",
    initials: "CM",
  },
  {
    text: "We hired AJ to fix broken workflows. What we got was a fully engineered sales infrastructure. He mapped the pipeline, corrected trigger logic, and eliminated every bottleneck.",
    author: "Marcus Delgado",
    role: "Consulting Firm",
    avatarBg: "#c9a882",
    initials: "MD",
  },
  {
    text: "Most people know the tools. AJ understands the system behind them. He thinks in infrastructure — how data flows, how stages connect, how automations actually behave at scale.",
    author: "Ethel Navarro",
    role: "B2B Service Company",
    avatarBg: "#d4a97a",
    initials: "EN",
  },
];

export function Testimonials() {
  return (
    <section className="py-22 bg-black">
      <div className="max-w-[1100px] mx-auto px-8">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">
            <span className="w-4 h-0.5 bg-yellow rounded-full" />
            System Feedback
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.02em] text-white uppercase">
            What Clients Say
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-3xl p-7 mt-10">
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {testimonials.map((t) => (
                <StaggerItem key={t.author}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:translate-y-[-2px] transition-all duration-200 cursor-default">
                    <div className="text-persian text-xs tracking-[3px] mb-3">★ ★ ★ ★ ★</div>
                    <p className="text-[0.8rem] text-gray-500 leading-relaxed flex-1 mb-4">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="h-px bg-gray-200 mb-4" />
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold text-xs text-white shrink-0"
                        style={{ backgroundColor: t.avatarBg }}
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-persian">{t.author}</div>
                        <div className="text-[0.7rem] text-gray-400 mt-0.5">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/hl-banner.tsx`**

```tsx
"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function HLBanner() {
  return (
    <section className="py-22 bg-black">
      <div className="max-w-[1100px] mx-auto px-8">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-[#4a12cc] via-persian to-[#7b2ff7] text-white rounded-[14px] px-12 py-9 text-center relative overflow-hidden max-w-[800px] mx-auto border border-white/15">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
            <h3 className="text-[clamp(1.3rem,2.5vw,1.75rem)] font-black tracking-wide mb-2.5 text-white uppercase relative">
              NEW TO <span className="text-yellow">HIGHLEVEL?</span>
            </h3>
            <p className="text-sm text-white/80 leading-relaxed max-w-[500px] mx-auto mb-6 relative">
              To maintain quality and performance standards, I work with only 3–5 new clients monthly. The first 5 approved clients receive 15% off setup including continued support and system consultation.
            </p>
            <Link
              href="/consult"
              className="inline-flex items-center justify-center gap-2 px-10 py-3.5 bg-yellow text-black rounded-full text-sm font-extrabold uppercase tracking-widest hover:bg-yellow-dark hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 relative"
            >
              Book Free Consultation
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/faq.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const faqs = [
  { q: "How fast will I start getting leads?", a: "Most clients see automated leads within 7–14 days post-launch depending on funnel type and traffic source. Systems are built to convert from day one." },
  { q: "Will this work for my industry/business?", a: "Systems are industry-agnostic. Services, e-commerce, coaching, real estate, healthcare — if you have leads and a product, a system can scale it." },
  { q: "What do you need from me to start?", a: "Access to your existing tools (or willingness to set them up), your offer details, and a clear picture of your ideal client. The strategy call handles the rest." },
  { q: "How long does the build take?", a: "Starter systems go live in 5–7 business days. Full builds (Phase 3) take 14–21 business days depending on complexity and revision rounds." },
  { q: "If I decide to move forward, what happens next?", a: "After the strategy call you'll receive a system proposal with scope, timeline, and investment. Once approved, onboarding starts within 24 hours." },
  { q: "Do I need to already have GoHighLevel?", a: "No. I can set up a new GHL account for you or work inside your existing one. Everything is handled as part of the build process." },
  { q: "Will I be trained on how to use the system?", a: "Yes. Every build includes a walkthrough call and documentation so you or your team can manage and monitor the system without being technical." },
  { q: "What if the system isn't converting after launch?", a: "All packages include post-launch support. If something isn't working, we diagnose and fix it. The goal is a system that performs, not just one that's delivered." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-22 bg-white">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-persian">
              <span className="w-4 h-0.5 bg-persian rounded-full" />
              FAQ
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.02em] text-black uppercase mt-2">
              System Inquiries
            </h2>
          </ScrollReveal>
        </div>

        <div className="max-w-[720px] mx-auto mt-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-gray-100 border-b-4 border-white">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4.5 text-left"
              >
                <span className="text-sm font-bold text-persian uppercase tracking-wide pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-persian shrink-0 transition-transform duration-250 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `components/sections/final-cta.tsx`**

```tsx
"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function FinalCTA() {
  return (
    <section className="bg-black">
      <div className="max-w-[700px] mx-auto text-center py-24 px-8">
        <ScrollReveal>
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-black leading-[1.06] tracking-[-0.03em] text-white mb-3.5">
            IF YOUR GROWTH
            <br />
            FEELS FORCED
            <br />
            <span className="text-yellow">YOUR SYSTEM</span>
            <br />
            IS BROKEN!
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-base text-white/45 leading-relaxed max-w-[480px] mx-auto mb-9">
            Let&apos;s diagnose what&apos;s holding you back and fix it with a system that actually works.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Link
            href="/consult"
            className="inline-flex items-center gap-2 px-7 py-3 bg-yellow text-black rounded-[9px] text-sm font-extrabold hover:bg-yellow-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(246,203,31,0.35)] transition-all duration-200"
          >
            Book a System Strategy Call →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Update `app/page.tsx` with all homepage sections**

```tsx
import { Hero } from "@/components/sections/hero";
import { Vault } from "@/components/sections/vault";
import { Philosophy } from "@/components/sections/philosophy";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { HLBanner } from "@/components/sections/hl-banner";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Vault />
      <Philosophy />
      <Services />
      <Testimonials />
      <HLBanner />
      <FAQ />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 6: Verify the complete homepage**

Run `npm run dev`. Scroll through the entire homepage and check:
- All 8 sections render in order
- Scroll animations trigger correctly
- FAQ accordion opens/closes with smooth height animation
- All text content matches the original
- Responsive layout on mobile

- [ ] **Step 7: Commit**

```bash
git add components/sections/testimonials.tsx components/sections/hl-banner.tsx components/sections/faq.tsx components/sections/final-cta.tsx app/page.tsx
git commit -m "feat: complete homepage with testimonials, HL banner, FAQ, and final CTA"
```

---

## Task 7: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about AJ — growth engineer specializing in GoHighLevel automation systems, funnels, and CRM infrastructure.",
};

export default function AboutPage() {
  return <AboutContent />;
}
```

- [ ] **Step 2: Create `app/about/about-content.tsx`**

```tsx
"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { PageTransition } from "@/components/motion/page-transition";

const chips = [
  "High-converting funnels",
  "Smart lead pipelines",
  "Email + SMS automations",
  "Missed lead recovery",
  "Calendar + CRM integrations",
  "End-to-end backend automation",
];

const categories = [
  { icon: "🔥", name: "Funnel & Website Systems" },
  { icon: "🔥", name: "CRM & Pipeline Systems" },
  { icon: "🔥", name: "Automation & Workflows" },
  { icon: "📅", name: "Booking Systems" },
  { icon: "📲", name: "A2P 10DLC Setup", isNew: true, heat: 1 },
  { icon: "🤖", name: "AI Chatbot Systems", isNew: true, heat: 2 },
  { icon: "🖥", name: "Custom Frontend" },
  { icon: "⚙️", name: "Advanced Integrations" },
];

export function AboutContent() {
  return (
    <PageTransition>
      <div className="bg-black min-h-screen">
        <div className="max-w-[1100px] mx-auto px-8 py-16 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14 items-start">
          {/* Left — Bio */}
          <div>
            <ScrollReveal>
              <div className="text-[0.65rem] font-extrabold tracking-[0.14em] uppercase text-white/40 mb-5 flex items-center gap-2">
                <span className="text-yellow">→</span> About AJ
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black leading-[1.05] tracking-[-0.025em] text-white mb-5">
                Engineering<br />Growth<br />Through<br />Structure
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                I don&apos;t just build funnels, websites, or automations and leave it at that — I engineer the systems behind scalable growth.
              </p>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                With over 5 years of experience in freelancing, I started in product sourcing, where every decision was tied directly to profit. For the past 12 months, I&apos;ve shifted my focus into automation and backend operations, working deeply in the GHL ecosystem.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase text-yellow mt-5 mb-2">Foundation — System Thinking</div>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                My background is rooted in data-driven product research and online arbitrage — where precision matters, speed matters, and decisions impact real money. From analyzing ASINs and tracking market behavior to optimizing listings, I developed a deep understanding of what actually drives conversions.
              </p>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                And that same mindset… I brought into automation and AI systems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase text-yellow mt-5 mb-2">What I Do</div>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                I specialize in building GoHighLevel (GHL) automation systems that turn disconnected tools into a fully integrated revenue machine:
              </p>
            </ScrollReveal>

            <StaggerChildren className="flex flex-wrap gap-2 mb-3.5">
              {chips.map((chip) => (
                <StaggerItem key={chip}>
                  <span className="px-3 py-1.5 bg-white/[0.07] border border-white/12 rounded-full text-xs text-white/65 font-medium">
                    {chip}
                  </span>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <ScrollReveal delay={0.35}>
              <div className="px-4 py-3 bg-persian/15 border border-persian/30 rounded-lg text-sm font-bold text-purple-400 text-center tracking-wide mt-4 mb-4">
                Capture → Nurture → Convert → Scale
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase text-yellow mt-5 mb-2">Systems + AI (New Edge)</div>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                Now integrating AI-powered workflows using Claude and vibe coding — AI-assisted automation building, smarter workflow logic, faster backend deployment. This is no longer just automation. It&apos;s intelligent systems that adapt and evolve with your business.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="text-[0.65rem] font-extrabold tracking-[0.12em] uppercase text-yellow mt-5 mb-2">Value / ROI Positioning</div>
              <p className="text-sm text-white/55 leading-relaxed mb-3.5">
                I don&apos;t sell &ldquo;setups.&rdquo; I build revenue infrastructure. A properly built system can increase conversion rates by 20–50%+, recover leads you&apos;re already paying for, and generate an additional ₱50,000 – ₱300,000+ per month through better follow-up and structure. Because the money is already in your pipeline — you&apos;re just not capturing it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <blockquote className="border-l-3 border-yellow pl-4 my-5 italic text-[0.9375rem] text-white/50 leading-relaxed">
                &ldquo;Most businesses plateau because they lack structure. Systems remove guesswork and create predictable growth.&rdquo;
              </blockquote>
              <p className="text-sm text-white/30 italic mt-2.5">
                Systems evolve. AI is evolving. And I evolve with both.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.55}>
              <div className="mt-7">
                <Link
                  href="/consult"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-persian text-white rounded-[9px] text-sm font-extrabold uppercase tracking-wide hover:bg-persian-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(94,23,235,0.4)] transition-all duration-200"
                >
                  Book Strategy Call →
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Sticky sidebar */}
          <div className="lg:sticky lg:top-20 flex flex-col gap-3">
            <div className="w-full rounded-[14px] overflow-hidden mb-1 bg-[#111] border border-white/[0.08] aspect-[3/4] relative flex items-center justify-center">
              <div className="text-white/20 text-sm font-bold uppercase tracking-widest">
                Photo placeholder
              </div>
            </div>

            <StaggerChildren className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <StaggerItem key={cat.name}>
                  <div className="flex items-center gap-2.5 px-3.5 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-[0.8rem] text-white/65 font-medium hover:bg-persian/12 hover:border-persian/30 hover:text-white transition-all duration-200 cursor-default">
                    <span className="text-sm shrink-0">{cat.icon}</span>
                    <span className="flex-1 font-semibold">{cat.name}</span>
                    {cat.isNew && (
                      <span className="bg-yellow text-black text-[0.55rem] font-extrabold px-1.5 py-0.5 rounded-full tracking-wider uppercase shrink-0">
                        NEW {"🔥".repeat(cat.heat || 1)}
                      </span>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 3: Verify about page**

Navigate to `http://localhost:3000/about`. Check:
- 2-column layout renders correctly
- Sidebar is sticky on scroll
- All chips animate in with stagger
- Category cards have hover effects
- Content matches original exactly
- Responsive single-column on mobile

- [ ] **Step 4: Commit**

```bash
git add app/about/
git commit -m "feat: add about page with bio, skills, and sticky sidebar"
```

---

## Task 8: Projects Page (Portfolio with Tabs)

**Files:**
- Create: `app/projects/page.tsx`
- Create: `app/projects/projects-content.tsx`

- [ ] **Step 1: Create `app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ProjectsContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Automations, funnels, websites, and apps — all engineered for real business outcomes by AJ.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
```

- [ ] **Step 2: Create `app/projects/projects-content.tsx`**

This is a larger file since it contains all four tab panels with their card data. Create it with the tab system using `useState` for active tab, `AnimatePresence` for content crossfade, and a `motion.div` sliding indicator for the active tab.

The component should:
- Render a purple hero header
- Render 4 tab buttons (Automations, Funnels, Websites, Apps) with animated underline
- Switch content with crossfade animation
- **Automations tab**: 2-column grid of dark purple `bg-[#1a0f3a]` cards with persian borders
- **Funnels tab**: 3-column grid with gradient thumbnail headers
- **Websites tab**: 3-column grid with wireframe block thumbnails
- **Apps tab**: 3-column grid with emoji thumbnails

All card data (names, descriptions, chips, types) should be extracted from the source HTML `page-projects` section exactly.

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/motion/page-transition";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";

const tabs = [
  { id: "auto", label: "⚡ Automations" },
  { id: "funnels", label: "🎯 Funnels" },
  { id: "sites", label: "🌐 Websites" },
  { id: "apps", label: "📱 Apps" },
];

const automations = [
  {
    icon: "⚡", name: "New Lead Capture — Workflow 1", type: "GHL Automation · 7 steps",
    desc: "Captures form submissions, tags the contact, sends instant SMS + email, assigns to pipeline stage, and notifies the owner — all within 60 seconds of opt-in.",
    chips: ["Form Submit Trigger", "Contact Tag", "SMS Instant", "Email Sequence", "Pipeline Move"],
  },
  {
    icon: "📅", name: "Appointment Reminder Sequence", type: "GHL Automation · 5 steps",
    desc: "Automated 48h, 24h, and 2h appointment reminders via SMS + email. Includes a no-show re-book branch and cancellation handling with pipeline update.",
    chips: ["Appt Trigger", "48h SMS", "24h Email", "2h SMS", "No-show Branch"],
  },
  {
    icon: "📝", name: "Post-Service Review Request", type: "GHL Automation · 4 steps",
    desc: "Triggers 2 hours after service completion. Sends personalized review request via SMS. If no review left, follows up once more after 48 hours.",
    chips: ["Service Tag", "2h Wait", "SMS Review Ask", "48h Follow-up"],
  },
  {
    icon: "🤝", name: "Cold Lead Re-engagement", type: "GHL Automation · 6 steps",
    desc: "Targets leads that haven't responded in 14+ days. Sends a 3-touch re-engagement sequence with a special offer. Removes from sequence on any reply.",
    chips: ["14-Day Inactivity", "SMS 1", "Email 1", "SMS 2 + Offer", "Reply Stopper"],
  },
];

const funnels = [
  { type: "Webinar Funnel", name: "Live Training Registration", pages: "3 pages · Registration → Confirmation → Replay", gradient: "from-[#27187E] to-[#3f2db5]", emoji: "🏗️" },
  { type: "Lead Funnel", name: "Free Guide Opt-in", pages: "2 pages · Opt-in → Thank You + Download", gradient: "from-[#1d1260] to-[#27187E]", emoji: "🔥" },
  { type: "Sales Funnel", name: "Service Offer Page", pages: "4 pages · VSL → Sales → Order → Upsell", gradient: "from-[#0f0a3d] to-[#27187E]", emoji: "💰" },
  { type: "Opt-in Funnel", name: "Booking Appointment Funnel", pages: "3 pages · Landing → Calendar → Confirm", gradient: "from-[#27187E] to-[#4834c8]", emoji: "📋" },
  { type: "Tripwire Funnel", name: "Low-ticket Entry Offer", pages: "3 pages · Opt-in → $7 Offer → OTO Upsell", gradient: "from-[#1a0f5e] to-[#3b2d9a]", emoji: "⚡" },
  { type: "VSL Funnel", name: "Video Sales Letter Page", pages: "2 pages · VSL + Apply → Strategy Call", gradient: "from-[#27187E] to-[#1d1260]", emoji: "💬" },
];

const websites = [
  { type: "Service Business", name: "Auto Detailing Homepage", tech: "GHL · Custom CSS overrides", dark: false },
  { type: "Agency", name: "Solution13 Agency Site", tech: "GHL + Vercel embed", dark: true },
  { type: "Local Business", name: "Dental Clinic Website", tech: "GHL · Booking integration", dark: false },
  { type: "E-commerce", name: "Shopify Product Landing", tech: "Shopify · Custom sections", dark: true },
  { type: "Professional Services", name: "Real Estate Agent Site", tech: "GHL · CRM integrated", dark: false },
  { type: "Restaurant", name: "Sundowners Resort Site", tech: "Custom HTML · SimplyBook", dark: true },
];

const apps = [
  { tag: "Analytics Tool", name: "Revenue Leak Calculator", desc: "Interactive tool showing local businesses how much revenue they're leaking monthly. Embeddable on any site.", chips: ["React", "Vite", "Custom Logic"], emoji: "📊" },
  { tag: "Research Tool", name: "Amazon OA Product Research", desc: "AI-powered product research for Amazon OA. Scans for $3+ net profit, 25% ROI, 20+ monthly sales criteria.", chips: ["Node.js", "Claude API", "Keepa API"], emoji: "🔍" },
  { tag: "CRM Tool", name: "Client Onboarding Tracker", desc: "Internal dashboard for tracking client onboarding progress, invoices, and active campaign status.", chips: ["GHL API", "Zapier", "Google Sheets"], emoji: "📋" },
];

export function ProjectsContent() {
  const [activeTab, setActiveTab] = useState("auto");

  return (
    <PageTransition>
      {/* Hero */}
      <div className="bg-persian py-16 pb-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="text-xs font-extrabold tracking-[0.14em] uppercase text-white/50 mb-2">Portfolio</div>
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black tracking-[-0.03em] text-white mb-2.5">Work I&apos;ve Built.</h1>
          <p className="text-base text-white/60 leading-relaxed">Automations, funnels, websites, and apps — all engineered for real business outcomes.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8">
        {/* Tabs */}
        <div className="flex gap-1.5 py-6 sticky top-16 bg-background z-10 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold tracking-wide uppercase border transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-persian text-white border-persian"
                  : "bg-transparent text-text-muted border-white/18 hover:bg-persian hover:text-white hover:border-persian"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="py-14">
          <AnimatePresence mode="wait">
            {activeTab === "auto" && (
              <motion.div key="auto" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {automations.map((a) => (
                    <StaggerItem key={a.name}>
                      <div className="bg-[#1a0f3a] border border-persian/30 rounded-2xl p-7 hover:border-persian/70 hover:translate-y-[-3px] hover:shadow-[0_10px_32px_rgba(94,23,235,0.2)] transition-all duration-200 cursor-default">
                        <div className="flex items-center gap-3 mb-3.5">
                          <div className="w-[38px] h-[38px] rounded-[9px] bg-persian/30 border border-persian/40 flex items-center justify-center text-lg shrink-0">{a.icon}</div>
                          <div>
                            <div className="font-extrabold text-sm text-white">{a.name}</div>
                            <div className="text-xs text-white/45 mt-0.5">{a.type}</div>
                          </div>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed mb-3.5">{a.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {a.chips.map((c) => (
                            <span key={c} className="px-2.5 py-1 bg-persian/25 rounded-full text-[0.68rem] text-purple-300 font-bold border border-persian/40">{c}</span>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </motion.div>
            )}

            {activeTab === "funnels" && (
              <motion.div key="funnels" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {funnels.map((f) => (
                    <StaggerItem key={f.name}>
                      <div className="border border-white/10 rounded-2xl overflow-hidden bg-card hover:border-persian/30 hover:translate-y-[-3px] hover:shadow-[0_10px_32px_rgba(94,23,235,0.1)] transition-all duration-200 cursor-pointer">
                        <div className={`h-40 flex items-center justify-center text-4xl bg-gradient-to-br ${f.gradient}`}>{f.emoji}</div>
                        <div className="p-4">
                          <div className="text-[0.62rem] font-extrabold tracking-wider uppercase text-persian mb-1">{f.type}</div>
                          <div className="font-bold text-sm text-white mb-1">{f.name}</div>
                          <div className="text-[0.7rem] text-text-faint">{f.pages}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </motion.div>
            )}

            {activeTab === "sites" && (
              <motion.div key="sites" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {websites.map((w) => (
                    <StaggerItem key={w.name}>
                      <div className="border border-white/10 rounded-2xl overflow-hidden bg-card hover:border-persian/30 hover:translate-y-[-3px] hover:shadow-[0_10px_32px_rgba(94,23,235,0.1)] transition-all duration-200 cursor-pointer">
                        <div className={`h-[170px] p-3.5 flex flex-col gap-1.5 ${w.dark ? "bg-gradient-to-br from-[#27187E] to-[#3921a8]" : "bg-gradient-to-br from-[#efeffc] to-[#e2e2f8]"}`}>
                          <div className={`h-1.5 rounded-full w-[70%] ${w.dark ? "bg-white/40" : "bg-[#27187E]/40"}`} />
                          <div className={`h-5 rounded ${w.dark ? "bg-white/12" : "bg-[#27187E]/10"}`} />
                          <div className={`h-12 rounded ${w.dark ? "bg-white/8" : "bg-[#27187E]/7"}`} />
                          <div className={`h-1.5 rounded-full w-[50%] ${w.dark ? "bg-white/80" : "bg-[#27187E]/80"}`} />
                        </div>
                        <div className="p-3.5">
                          <div className="text-[0.62rem] font-extrabold tracking-wider uppercase text-persian mb-1">{w.type}</div>
                          <div className="font-bold text-sm text-white mb-1">{w.name}</div>
                          <div className="text-[0.7rem] text-text-faint">{w.tech}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </motion.div>
            )}

            {activeTab === "apps" && (
              <motion.div key="apps" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {apps.map((a) => (
                    <StaggerItem key={a.name}>
                      <div className="border border-white/10 rounded-2xl overflow-hidden bg-card hover:border-persian/30 hover:translate-y-[-3px] hover:shadow-[0_10px_32px_rgba(94,23,235,0.1)] transition-all duration-200 cursor-pointer">
                        <div className="h-[150px] flex items-center justify-center text-5xl bg-gradient-to-br from-[#efeffc] to-[#e2e2f8]">{a.emoji}</div>
                        <div className="p-4">
                          <div className="text-[0.62rem] font-extrabold tracking-wider uppercase text-persian mb-1">{a.tag}</div>
                          <div className="font-bold text-sm text-white mb-1.5">{a.name}</div>
                          <p className="text-[0.78rem] text-text-muted leading-relaxed mb-2.5">{a.desc}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {a.chips.map((c) => (
                              <span key={c} className="px-2.5 py-1 bg-persian/25 rounded-full text-[0.68rem] text-purple-300 font-bold border border-persian/40">{c}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 3: Verify projects page**

Navigate to `/projects`. Check tabs switch with crossfade, all cards render, responsive layout works.

- [ ] **Step 4: Commit**

```bash
git add app/projects/
git commit -m "feat: add projects page with animated tab system and all portfolio cards"
```

---

## Task 9: Revenue Tools Page (Calculator, ROI, Audit)

**Files:**
- Create: `app/revenue/page.tsx`
- Create: `app/revenue/revenue-content.tsx`
- Create: `components/interactive/revenue-calculator.tsx`
- Create: `components/interactive/roi-scorecard.tsx`
- Create: `components/interactive/audit-tracker.tsx`

- [ ] **Step 1: Create `components/interactive/revenue-calculator.tsx`**

The calculator must preserve the exact same math from the source HTML `doCalc()` function:
- `cur = visitors * conversionRate * closeRate * dealValue`
- `optimizedConversion = min(conversionRate * 2.5, 0.25)`
- `optimizedClose = min(closeRate * 1.5, 0.70)`
- `potential = visitors * optimizedConversion * optimizedClose * dealValue`
- `leak = potential - cur`
- Leak breakdown: 40% weak funnel, 33% no CRM, 27% weak SEO

```tsx
"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { motion } from "framer-motion";

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

export function RevenueCalculator() {
  const [visitors, setVisitors] = useState(500);
  const [convRate, setConvRate] = useState(3);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(1500);

  const calc = useCallback(() => {
    const cv = convRate / 100;
    const cl = closeRate / 100;
    const cur = visitors * cv * cl * dealValue;
    const oc = Math.min(cv * 2.5, 0.25);
    const ol = Math.min(cl * 1.5, 0.70);
    const pot = visitors * oc * ol * dealValue;
    const leak = pot - cur;
    const cap = Math.round((cur / pot) * 100) || 0;
    return { cur, pot, leak, cap };
  }, [visitors, convRate, closeRate, dealValue]);

  const { cur, pot, leak, cap } = calc();

  return (
    <div className="py-14" id="sec-calc">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-persian mb-2.5">
          <span className="w-4 h-0.5 bg-persian rounded-full" />
          Revenue Leak Calculator
        </div>
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.03em] text-white mb-2">
          How Much Are You Losing Monthly?
        </h2>
        <p className="text-base text-text-muted leading-relaxed mb-9 max-w-[520px]">
          Adjust your numbers — see the real cost of not having proper systems.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="bg-card border border-white/10 rounded-3xl p-11">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-9">
            {/* Inputs */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2 tracking-wide uppercase">Monthly website visitors</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={100} max={5000} step={50} value={visitors} onChange={(e) => setVisitors(+e.target.value)} className="flex-1 h-1 appearance-none bg-persian/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-persian [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(94,23,235,0.3)]" />
                  <span className="text-sm font-bold text-persian min-w-[56px] text-right">{visitors.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2 tracking-wide uppercase">Current lead conversion rate</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={1} max={20} step={1} value={convRate} onChange={(e) => setConvRate(+e.target.value)} className="flex-1 h-1 appearance-none bg-persian/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-persian [&::-webkit-slider-thumb]:cursor-pointer" />
                  <span className="text-sm font-bold text-persian min-w-[56px] text-right">{convRate}%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2 tracking-wide uppercase">Lead-to-client close rate</label>
                <div className="flex items-center gap-3">
                  <input type="range" min={5} max={60} step={5} value={closeRate} onChange={(e) => setCloseRate(+e.target.value)} className="flex-1 h-1 appearance-none bg-persian/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-persian [&::-webkit-slider-thumb]:cursor-pointer" />
                  <span className="text-sm font-bold text-persian min-w-[56px] text-right">{closeRate}%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-muted mb-2 tracking-wide uppercase">Average deal value (USD)</label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-persian/10 border border-white/18 border-r-0 rounded-l-[9px] text-sm text-persian font-bold">$</span>
                  <input type="number" min={100} max={50000} step={100} value={dealValue} onChange={(e) => setDealValue(+e.target.value || 1500)} className="px-3 py-2.5 bg-card border border-white/18 rounded-r-[9px] text-sm text-white w-[130px] outline-none focus:border-persian transition-colors" />
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="bg-persian rounded-2xl p-6 text-center mb-3">
                <div className="text-xs font-extrabold tracking-wider uppercase text-white/60 mb-1.5">Revenue leak / month</div>
                <motion.div key={leak} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-[2.6rem] font-black text-white tracking-tight leading-none">
                  {fmt(leak)}
                </motion.div>
                <div className="text-xs text-white/50 mt-1.5">you&apos;re leaving on the table every month</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-persian/10 rounded-[10px] p-3 border border-white/18">
                  <div className="text-xs text-text-faint mb-1">Current revenue</div>
                  <div className="text-lg font-bold text-text-muted">{fmt(cur)}</div>
                </div>
                <div className="bg-persian/10 rounded-[10px] p-3 border border-white/18">
                  <div className="text-xs text-text-faint mb-1">Potential revenue</div>
                  <div className="text-lg font-bold text-persian">{fmt(pot)}</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-faint mb-1.5">
                  <span>Revenue captured</span>
                  <span>{cap}%</span>
                </div>
                <div className="h-2 bg-persian/30 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-persian rounded-full" animate={{ width: `${cap}%` }} transition={{ duration: 0.5 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="text-xs font-extrabold tracking-wider uppercase text-text-faint mt-7 mb-3.5">Where the leak comes from</div>
          <div className="space-y-0">
            {[
              { icon: "🌐", title: "Weak website / funnel", sub: "No clear CTA, slow load, no trust signals — visitors bounce before opting in.", amt: fmt(leak * 0.4), bad: true },
              { icon: "⚙️", title: "No CRM automation", sub: "Without automated follow-up, 80% of leads go cold within 48 hrs.", amt: fmt(leak * 0.33), bad: true },
              { icon: "📍", title: "Weak SEO / no Google Ads", sub: "Competitors are capturing the clicks you're not showing up for.", amt: fmt(leak * 0.27), bad: true },
              { icon: "✅", title: "With proper systems in place", sub: "High-converting funnel + GHL automation + Google Ads working as one system.", amt: `+${fmt(pot)}/mo`, bad: false },
            ].map((row) => (
              <div key={row.title} className="flex items-start gap-3 py-3 border-b border-white/10 last:border-b-0">
                <div className="w-8 h-8 rounded-lg bg-persian/10 flex items-center justify-center text-sm shrink-0 mt-0.5">{row.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white mb-1">{row.title}</div>
                  <div className="text-[0.78rem] text-text-faint leading-relaxed">{row.sub}</div>
                </div>
                <div className={`text-sm font-bold whitespace-nowrap mt-1 ${row.bad ? "text-red-500" : "text-persian"}`}>
                  {row.bad ? `-${row.amt}` : row.amt}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Bar */}
          <div className="mt-7 bg-persian rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <div className="text-base font-bold text-white mb-1">
                You&apos;re leaving <span className="text-white/70">{fmt(leak)}</span>/month on the table.
              </div>
              <div className="text-sm text-white/60">Book a free 30-min audit — I&apos;ll show you your biggest fix.</div>
            </div>
            <Link href="/consult" className="shrink-0 inline-flex items-center gap-2 px-7 py-3 bg-yellow text-black rounded-[9px] text-sm font-extrabold hover:bg-yellow-dark hover:translate-y-[-2px] hover:shadow-[0_8px_28px_rgba(246,203,31,0.35)] transition-all duration-200">
              Book a free call →
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/interactive/roi-scorecard.tsx`**

```tsx
"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Counter } from "@/components/motion/counter";

const cards = [
  { icon: "⚡", title: "GHL Automation", desc: "Automated follow-up turns cold leads into booked clients. Most businesses recover 40–60% of lost leads within 30 days of setup.", val: 4.2, suffix: "×", sub: "Avg. ROI vs. manual follow-up" },
  { icon: "🎯", title: "Google Ads", desc: "Properly structured campaigns targeting high-intent keywords consistently outperform broad campaigns by 3–5× on cost per acquisition.", val: 3.8, suffix: "×", sub: "Avg. ROAS improvement" },
  { icon: "📍", title: "Local SEO", desc: "Ranking in the top 3 of Google Maps generates 3× more profile visits and 2× more calls, at zero ad spend.", val: 3.1, suffix: "×", sub: "Profile views increase" },
];

export function ROIScorecard() {
  return (
    <div className="py-14 border-t border-white/10" id="sec-roi">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-persian mb-2.5">
          <span className="w-4 h-0.5 bg-persian rounded-full" />
          ROI Scorecard
        </div>
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.03em] text-white mb-2">Rate Your Current Systems</h2>
        <p className="text-base text-text-muted leading-relaxed max-w-[520px]">Average ROI improvement clients see after fixing each system.</p>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {cards.map((c) => (
          <StaggerItem key={c.title}>
            <div className="bg-card border border-white/10 rounded-2xl p-7 hover:translate-y-[-3px] hover:shadow-[0_10px_32px_rgba(94,23,235,0.1)] transition-all duration-250 cursor-default">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-persian/10 flex items-center justify-center text-lg mb-3.5">{c.icon}</div>
              <div className="font-extrabold text-sm text-white mb-2">{c.title}</div>
              <p className="text-[0.8rem] text-text-muted leading-relaxed mb-3.5">{c.desc}</p>
              <div className="text-[1.7rem] font-black text-persian tracking-tight">
                <Counter target={c.val} suffix={c.suffix} />
              </div>
              <div className="text-[0.68rem] text-text-faint mt-1">{c.sub}</div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
```

- [ ] **Step 3: Create `components/interactive/audit-tracker.tsx`**

```tsx
"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Counter } from "@/components/motion/counter";

const audits = [
  { icon: "🌐", name: "Website / Funnel", cat: "Conversion layer", pct: 28, tip: "Most local business websites have no clear CTA, no trust signals, and no mobile optimization. The average local site converts less than 2% of visitors." },
  { icon: "⚙️", name: "CRM & Follow-up", cat: "Lead management", pct: 20, tip: "80% of small businesses have no automated follow-up. Leads that don't hear back within 5 minutes are 21× less likely to convert." },
  { icon: "📍", name: "Local SEO", cat: "Organic visibility", pct: 35, tip: "Most GBP profiles are incomplete — missing service areas, categories, and photos. Fully optimized profiles get 5× more discovery searches." },
  { icon: "🎯", name: "Paid Advertising", cat: "Traffic acquisition", pct: 42, tip: "Most local ad campaigns use broad match keywords with no conversion tracking. Fixing campaign structure alone reduces CPA by 30–50% on average." },
];

export function AuditTracker() {
  return (
    <div className="py-14 pb-20 border-t border-white/10" id="sec-audit">
      <ScrollReveal>
        <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-persian mb-2.5">
          <span className="w-4 h-0.5 bg-persian rounded-full" />
          Growth Audit Tracker
        </div>
        <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.03em] text-white mb-2">Find Your Biggest Growth Gap</h2>
        <p className="text-base text-text-muted leading-relaxed max-w-[520px] mb-9">How most local businesses score across the 4 core growth systems before working with me.</p>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audits.map((a) => (
          <StaggerItem key={a.name}>
            <div className="bg-card border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-[34px] h-[34px] rounded-lg bg-persian/10 flex items-center justify-center text-sm shrink-0">{a.icon}</div>
                <div>
                  <div className="font-bold text-sm text-white">{a.name}</div>
                  <div className="text-[0.7rem] text-text-faint mt-0.5">{a.cat}</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex-1 h-1.5 bg-persian/30 rounded-full overflow-hidden">
                  <div className="h-full bg-persian rounded-full transition-all duration-700" style={{ width: `${a.pct}%` }} />
                </div>
                <span className="text-[0.78rem] font-bold text-persian min-w-[34px] text-right">
                  <Counter target={a.pct} suffix="%" />
                </span>
              </div>
              <p className="text-[0.75rem] text-text-faint leading-relaxed">{a.tip}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}
```

- [ ] **Step 4: Create `app/revenue/page.tsx` and `app/revenue/revenue-content.tsx`**

`app/revenue/page.tsx`:
```tsx
import type { Metadata } from "next";
import { RevenueContent } from "./revenue-content";

export const metadata: Metadata = {
  title: "Revenue Tools",
  description: "See the real numbers. Find where your business is leaking money and what to fix first.",
};

export default function RevenuePage() {
  return <RevenueContent />;
}
```

`app/revenue/revenue-content.tsx`:
```tsx
"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { RevenueCalculator } from "@/components/interactive/revenue-calculator";
import { ROIScorecard } from "@/components/interactive/roi-scorecard";
import { AuditTracker } from "@/components/interactive/audit-tracker";

export function RevenueContent() {
  return (
    <PageTransition>
      <div className="bg-persian py-16 pb-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="text-xs font-extrabold tracking-[0.14em] uppercase text-white/50 mb-2">Revenue Tools</div>
          <h1 className="text-[clamp(2.2rem,4vw,3rem)] font-black tracking-[-0.025em] text-white mb-2.5">See the Real Numbers.</h1>
          <p className="text-base text-white/60">Three tools to find where your business is leaking money and what to fix first.</p>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto px-8">
        <RevenueCalculator />
        <ROIScorecard />
        <AuditTracker />
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 5: Verify revenue page**

Navigate to `/revenue`. Check:
- Calculator sliders update results in real-time
- Math matches original (test: 500 visitors, 3% conv, 20% close, $1500 deal = $4,500 current, ~$1,350 leak)
- ROI counters animate on scroll
- Audit progress bars render correctly
- Responsive layout

- [ ] **Step 6: Commit**

```bash
git add components/interactive/ app/revenue/
git commit -m "feat: add revenue tools page with interactive calculator, ROI scorecard, and audit tracker"
```

---

## Task 10: Packages, Consultation, and Portfolio Pages

**Files:**
- Create: `app/packages/page.tsx`
- Create: `app/consult/page.tsx`
- Create: `app/portfolio/page.tsx`

- [ ] **Step 1: Create `app/packages/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PackagesContent } from "./packages-content";

export const metadata: Metadata = {
  title: "Packages",
  description: "Transparent pricing for growth engineering systems. Starter, Growth, and Scale packages.",
};

export default function PackagesPage() {
  return <PackagesContent />;
}
```

- [ ] **Step 2: Create `app/packages/packages-content.tsx`**

```tsx
"use client";

import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { Counter } from "@/components/motion/counter";

const packages = [
  {
    phase: "PHASE ONE:", label: "STARTER", price: 197,
    tagline: "Fundamental setup for emerging service businesses.",
    features: [
      "1 High-Converting Funnel or Landing Page",
      "Lead Capture Form + Basic Opportunity Pipeline",
      "Automated Confirmation Email + SMS",
      "Calendar Integration (Booking + Reminder Setup)",
      "Basic Workflow Trigger (Form → Tag → Pipeline Stage)",
    ],
  },
  {
    phase: "PHASE TWO:", label: "GROWTH", price: 597,
    tagline: "Robust infrastructure for scaling performance.",
    features: [
      "Multi-Step Funnel Build (Landing + Thank You + Booking)",
      "Advanced Workflow Automation (Tagging, Conditions, Delays)",
      "Missed Call Text Back Automation",
      "5–10 Step Email + SMS Nurture Sequence",
      "Pipeline Stage Automation (Lead → Booked → Follow Up)",
      "Appointment Reminder + No-Show Recovery Workflow",
    ],
  },
  {
    phase: "PHASE THREE:", label: "SCALE", price: 1497,
    tagline: "Enterprise-grade system orchestration.",
    features: [
      "Full Funnel System (Lead Magnet, Booking, Sales Page)",
      "Multi-Workflow Automation Ecosystem",
      "Deal Won / Lost Automation Logic",
      "Long-Term Nurture Campaign (30–90 Days)",
      "Custom Tags + Segmentation Strategy",
      "Internal Notification + Assignment Automation",
      "CRM Cleanup + Optimization",
    ],
  },
];

export function PackagesContent() {
  return (
    <PageTransition>
      <div className="bg-black min-h-screen">
        <div className="py-18 pb-12 text-center max-w-[1100px] mx-auto px-8">
          <div className="text-[0.68rem] font-extrabold tracking-[0.14em] uppercase text-yellow mb-2.5">Transparent Pricing</div>
          <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] font-black tracking-[-0.025em] text-white uppercase">System Investment</h1>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto px-8 pb-20 items-start">
          {packages.map((pkg) => (
            <StaggerItem key={pkg.label}>
              <div className="bg-white rounded-xl p-7 flex flex-col hover:translate-y-[-4px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)] transition-all duration-200 border border-gray-200">
                <div className="text-[0.78rem] font-extrabold text-black mb-1.5">
                  {pkg.phase} <span className="text-yellow">{pkg.label}</span>
                </div>
                <div className="text-5xl font-black text-black tracking-[-0.04em] leading-none my-2">
                  $<Counter target={pkg.price} />
                </div>
                <div className="text-[0.8rem] text-gray-500 leading-relaxed mb-5">{pkg.tagline}</div>
                <div className="h-px bg-gray-200 my-4" />
                <ul className="flex-1 space-y-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700 py-1.5 leading-snug font-medium">
                      <span className="w-[18px] h-[18px] rounded-full bg-yellow flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1 border-l-[1.5px] border-b-[1.5px] border-black rotate-[-45deg] translate-y-[-1px]" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/consult"
                  className="block w-full py-3.5 mt-6 rounded-lg text-sm font-extrabold text-center bg-persian text-white uppercase tracking-wider hover:bg-persian-dark hover:translate-y-[-1px] transition-all duration-200"
                >
                  Initialize Setup
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 3: Create `app/consult/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ConsultContent } from "./consult-content";

export const metadata: Metadata = {
  title: "Free Consultation",
  description: "Book a free 30-minute revenue audit. No fluff, just clarity on your biggest growth fix.",
};

export default function ConsultPage() {
  return <ConsultContent />;
}
```

- [ ] **Step 4: Create `app/consult/consult-content.tsx`**

```tsx
"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { motion } from "framer-motion";

const cards = [
  { icon: "📊", title: "Revenue Audit", sub: "I review your current lead flow, systems, and setup — and show you the gaps." },
  { icon: "🗺️", title: "Action Plan", sub: "You leave with a clear roadmap of what to fix first and what it's worth to you." },
  { icon: "🔓", title: "No Pressure", sub: "If we're a fit, we talk next steps. If not, you still keep the plan." },
];

export function ConsultContent() {
  return (
    <PageTransition>
      <div className="min-h-[calc(100vh-64px)] flex items-center py-18 bg-persian">
        <div className="max-w-[760px] mx-auto text-center px-8">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/12 border border-white/20 rounded-full px-4 py-1.5 text-xs font-extrabold text-white tracking-widest uppercase mb-7">
              ● Free · No commitment · No pitch
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[clamp(2.4rem,6vw,3.8rem)] font-black tracking-[-0.03em] leading-[1.06] text-white mb-4"
          >
            READY TO STOP
            <br />
            LEAVING MONEY
            <br />
            <span className="text-white/40">ON THE TABLE?</span>
          </motion.h1>

          <ScrollReveal delay={0.3}>
            <p className="text-base text-white/60 leading-relaxed max-w-[500px] mx-auto mb-9">
              Book a free 30-minute revenue audit. I&apos;ll review your current setup and tell you exactly where your biggest fix is — no fluff, just clarity.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex gap-3 justify-center flex-wrap mb-3.5">
              <a
                href="https://solution13.online/booking"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black rounded-[9px] text-sm font-extrabold uppercase tracking-wide hover:bg-gray-100 hover:translate-y-[-2px] transition-all duration-200"
              >
                Book a Free Call →
              </a>
              <a
                href="mailto:aj@systembuiltbyaj.com"
                className="inline-flex items-center gap-2 px-7 py-3 bg-transparent text-white border-[1.5px] border-white/40 rounded-[9px] text-sm font-bold hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Send a Message
              </a>
            </div>
            <div className="text-xs text-white/40 mb-14">
              Free 30-min call · No obligation · Usually within 24 hours
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-[680px] mx-auto">
            {cards.map((c) => (
              <StaggerItem key={c.title}>
                <div className="bg-white/[0.07] border border-white/12 rounded-2xl p-6 text-left hover:bg-white/12 hover:border-white/25 transition-all duration-200">
                  <div className="text-2xl mb-2.5">{c.icon}</div>
                  <div className="font-bold text-sm text-white mb-1.5">{c.title}</div>
                  <div className="text-[0.75rem] text-white/50 leading-relaxed">{c.sub}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 5: Create `app/portfolio/page.tsx` and `app/portfolio/portfolio-content.tsx`**

`app/portfolio/page.tsx`:
```tsx
import type { Metadata } from "next";
import { PortfolioContent } from "./portfolio-content";

export const metadata: Metadata = {
  title: "Featured Work",
  description: "Featured funnel and website builds — real builds with live links.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
```

`app/portfolio/portfolio-content.tsx`:
```tsx
"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function PortfolioContent() {
  return (
    <PageTransition>
      {/* Hero */}
      <div className="bg-persian py-16 pb-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="text-xs font-extrabold tracking-[0.14em] uppercase text-white/50 mb-2">Other Portfolio</div>
          <h1 className="text-[clamp(2.2rem,4vw,3rem)] font-black tracking-[-0.025em] text-white mb-2.5">Featured Work.</h1>
          <p className="text-base text-white/60 leading-relaxed">One funnel. One website. Real builds — replace placeholders with actual screenshots and live links.</p>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8">
        {/* Featured Funnel */}
        <div className="py-14 border-t border-white/10" id="op-funnel">
          <ScrollReveal>
            <div className="flex items-start justify-between gap-5 mb-8 flex-wrap">
              <div>
                <div className="text-xl font-extrabold tracking-tight">Featured Funnel</div>
                <div className="text-sm text-text-muted mt-1">Replace with your actual funnel build — screenshot + live link</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-persian/10 border border-persian/30 text-persian shrink-0 mt-1">GoHighLevel</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-card border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[320px] hover:border-persian/30 transition-colors duration-300 shadow-[0_4px_24px_rgba(94,23,235,0.06)]">
              <div className="bg-persian flex items-center justify-center text-6xl opacity-25 min-h-[200px]">🎯</div>
              <div className="p-9 flex flex-col justify-center">
                <div className="text-xs font-extrabold tracking-wider uppercase text-persian mb-2.5">Funnel Type — e.g. Lead Funnel</div>
                <div className="text-2xl font-extrabold tracking-tight mb-2.5">Your Funnel Name Here</div>
                <p className="text-sm text-text-muted leading-relaxed mb-5">Replace this with a short description — the client it was built for, the problem it solves, and what result it achieved.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Platform: GoHighLevel</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Pages: —</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Industry: —</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-persian/10 border-[1.5px] border-persian rounded-[9px] text-sm font-bold text-persian hover:bg-persian/18 hover:translate-y-[-1px] transition-all duration-150 w-fit">
                  View Live Funnel →
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Featured Website */}
        <div className="py-14 border-t border-white/10 mb-12" id="op-website">
          <ScrollReveal>
            <div className="flex items-start justify-between gap-5 mb-8 flex-wrap">
              <div>
                <div className="text-xl font-extrabold tracking-tight">Featured Website</div>
                <div className="text-sm text-text-muted mt-1">Replace with your actual website build — screenshot + live link</div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-persian/10 border border-persian/30 text-persian shrink-0 mt-1">Web Design</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-card border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[320px] hover:border-persian/30 transition-colors duration-300 shadow-[0_4px_24px_rgba(94,23,235,0.06)]">
              <div className="p-9 flex flex-col justify-center">
                <div className="text-xs font-extrabold tracking-wider uppercase text-persian mb-2.5">Website Type — e.g. Service Business</div>
                <div className="text-2xl font-extrabold tracking-tight mb-2.5">Your Website Name Here</div>
                <p className="text-sm text-text-muted leading-relaxed mb-5">Replace this with a short description — the client, the industry, what was built, and any notable result.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Platform: GHL / Custom</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Pages: —</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/8 border border-white/18 text-text-muted">Industry: —</span>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-persian/10 border-[1.5px] border-persian rounded-[9px] text-sm font-bold text-persian hover:bg-persian/18 hover:translate-y-[-1px] transition-all duration-150 w-fit">
                  View Live Website →
                </a>
              </div>
              <div className="bg-persian flex items-center justify-center text-6xl opacity-25 min-h-[200px]">🌐</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-persian/10 border-2 border-dashed border-persian/30 rounded-3xl p-12 text-center mt-4">
              <div className="text-3xl mb-2.5 opacity-35 text-persian">＋</div>
              <div className="text-sm font-bold text-persian mb-1">More work coming soon</div>
              <div className="text-xs text-text-faint">Send your funnel/website screenshots and links to add more builds here</div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
```

- [ ] **Step 6: Verify all three pages**

Navigate to `/packages`, `/consult`, `/portfolio`. Check each page renders correctly, animations work, links function, responsive layout.

- [ ] **Step 7: Commit**

```bash
git add app/packages/ app/consult/ app/portfolio/
git commit -m "feat: add packages, consultation, and portfolio pages"
```

---

## Task 11: Final Polish — Build Verification and Cleanup

**Files:**
- Possibly modify: various components for build errors

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any TypeScript errors or build warnings that appear.

- [ ] **Step 2: Test all routes**

Start dev server and navigate to each route:
- `/` — all 8 homepage sections
- `/about` — bio, sticky sidebar
- `/projects` — 4 tabs, all cards
- `/revenue` — calculator, ROI, audit
- `/packages` — 3 pricing cards
- `/consult` — CTA page
- `/portfolio` — featured work placeholders

- [ ] **Step 3: Test mobile responsiveness**

Open browser dev tools, test at 375px width:
- Hamburger menu appears and works
- All grids collapse to single column
- Calculator stacks vertically
- Text sizes are readable

- [ ] **Step 4: Test reduced motion**

Enable `prefers-reduced-motion` in browser dev tools. Verify all animations are disabled.

- [ ] **Step 5: Commit final state**

```bash
git add -A
git commit -m "feat: complete System Built by AJ website rebuild — all pages, animations, and responsive design"
```

---

## Summary

| Task | Description | Key Files |
|---|---|---|
| 1 | Scaffold + Theme | `next.config.ts`, `tailwind.config.ts`, `globals.css`, `layout.tsx` |
| 2 | Motion Components | `scroll-reveal.tsx`, `stagger-children.tsx`, `counter.tsx`, `page-transition.tsx` |
| 3 | Navbar + Footer | `navbar.tsx`, `mobile-menu.tsx`, `footer.tsx` |
| 4 | Hero Section | `hero.tsx` |
| 5 | Vault + Philosophy + Services | `vault.tsx`, `philosophy.tsx`, `services.tsx` |
| 6 | Testimonials + HL + FAQ + CTA | `testimonials.tsx`, `hl-banner.tsx`, `faq.tsx`, `final-cta.tsx` |
| 7 | About Page | `about/page.tsx`, `about-content.tsx` |
| 8 | Projects Page | `projects/page.tsx`, `projects-content.tsx` |
| 9 | Revenue Tools | `revenue-calculator.tsx`, `roi-scorecard.tsx`, `audit-tracker.tsx` |
| 10 | Packages + Consult + Portfolio | `packages/`, `consult/`, `portfolio/` |
| 11 | Build Verification | Fix any build errors, test all routes |
