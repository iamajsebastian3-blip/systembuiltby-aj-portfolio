"use client";

import { useState, type ReactNode } from "react";
import { lock } from "./actions";

type SectionId = "hero" | "nav" | "about" | "feat" | "price" | "social" | "cta" | "footer";
type TabId = "all" | SectionId | "gpt";

type Section = {
  id: SectionId;
  number: string;
  label: string;
  title: string;
  description: string;
  labelClass: string;
  preview: ReactNode;
  prompt: string;
};

const labelClasses: Record<SectionId, string> = {
  hero: "text-[#F5C842]",
  nav: "text-[#5ED9D1]",
  about: "text-[#9B7FFF]",
  feat: "text-[#FF9C6E]",
  price: "text-[#6BCB77]",
  social: "text-[#FFB84D]",
  cta: "text-[#FF6BA3]",
  footer: "text-[#90CAF9]",
};

const sections: Section[] = [
  {
    id: "hero",
    number: "01",
    label: "HERO",
    title: "Hero Section",
    description:
      "Full-width headline, subtext, primary CTA. First impression — clarity beats cleverness here.",
    labelClass: labelClasses.hero,
    preview: (
      <svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="210" fill="#0B091A" rx="6" />
        <ellipse cx="210" cy="90" rx="200" ry="80" fill="rgba(124,92,252,0.07)" />
        <rect x="150" y="22" width="120" height="12" rx="6" fill="#1E1A3C" />
        <rect x="158" y="25" width="104" height="6" rx="3" fill="#3A3070" />
        <rect x="55" y="46" width="310" height="20" rx="5" fill="#2A2460" />
        <rect x="140" y="46" width="140" height="20" rx="5" fill="rgba(245,200,66,0.22)" />
        <rect x="85" y="72" width="250" height="20" rx="5" fill="#2A2460" />
        <rect x="80" y="104" width="260" height="7" rx="3" fill="#1E1A3C" />
        <rect x="105" y="116" width="210" height="7" rx="3" fill="#1E1A3C" />
        <rect x="145" y="135" width="130" height="32" rx="7" fill="#F5C842" />
        <rect x="153" y="141" width="114" height="10" rx="4" fill="rgba(13,11,31,0.45)" />
        <rect x="172" y="178" width="76" height="6" rx="3" fill="#2A2460" />
        <circle cx="28" cy="40" r="3.5" fill="rgba(124,92,252,0.35)" />
        <circle cx="393" cy="150" r="5" fill="rgba(245,200,66,0.18)" />
        <circle cx="18" cy="170" r="2.5" fill="rgba(124,92,252,0.25)" />
        <circle cx="400" cy="55" r="3" fill="rgba(245,200,66,0.14)" />
        <circle cx="55" cy="185" r="4" fill="rgba(124,92,252,0.15)" />
      </svg>
    ),
    prompt: `You are an expert funnel copywriter and UI designer. Build a complete hero section for a high-converting sales funnel page.

OFFER: [e.g. "Done-for-you GHL automation systems for coaches"]
TARGET AUDIENCE: [e.g. "Online coaches doing $5k–$20k/month"]
CORE PROMISE: [The transformation you deliver]
TONE: [Bold / Professional / Conversational]

OUTPUT THE FOLLOWING:
1. Eyebrow label — 6–8 words, uppercase, category tag style
2. Headline — 2 lines max. One phrase highlighted in accent color. Lead with outcome.
3. Subheadline — 1–2 sentences, specific and outcome-focused
4. Primary CTA button copy — 5 words max, action verb first
5. Secondary link text — "no commitment" reassurance style (optional)
6. Background direction — dark glow / full image / gradient / solid

LAYOUT SPEC:
- Full-width section, vertically centered
- Max content width: 800px, centered
- CTA button: gold fill, dark text, min-width 180px
- Background: dark with subtle radial purple glow from top-center
- Hero image (if used): right-aligned, partially cropped at edge

DESIGN RULE: Every word must earn its place. Cut anything that doesn't directly serve the conversion.`,
  },
  {
    id: "nav",
    number: "02",
    label: "NAVIGATION",
    title: "Navigation Bar",
    description: "Logo, nav links, CTA. Sticky on scroll — dark, clean, contrast-forward.",
    labelClass: labelClasses.nav,
    preview: (
      <svg viewBox="0 0 420 80" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="80" fill="#0B091A" rx="6" />
        <rect width="420" height="80" fill="rgba(22,19,48,0.92)" />
        <circle cx="36" cy="40" r="14" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <rect x="34" y="35" width="4" height="4" rx="1" fill="#7C5CFC" />
        <rect x="40" y="33" width="4" height="8" rx="1" fill="#F5C842" />
        <rect x="56" y="35" width="72" height="10" rx="3" fill="#2A2460" />
        <rect x="168" y="36" width="34" height="8" rx="3" fill="#2A2250" />
        <rect x="212" y="36" width="40" height="8" rx="3" fill="#2A2250" />
        <rect x="263" y="36" width="34" height="8" rx="3" fill="#2A2250" />
        <rect x="308" y="36" width="28" height="8" rx="3" fill="#2A2250" />
        <rect x="352" y="26" width="52" height="28" rx="6" fill="#F5C842" />
        <rect x="358" y="30" width="40" height="10" rx="3" fill="rgba(13,11,31,0.4)" />
        <rect width="420" height="1" fill="#2A2250" />
      </svg>
    ),
    prompt: `You are a UI/UX developer. Build a navigation bar for a premium funnel/marketing website.

BRAND NAME: [Your brand name]
LOGO: [Text-based / Icon + Text / Image — specify]
NAV LINKS: [e.g. Home, Gallery, Tools, About]
PRIMARY CTA: [e.g. "Free Consultation" / "Book a Call"]

OUTPUT:
1. Full semantic HTML for the navbar
2. CSS including:
   - Sticky: position fixed at top, z-index 100
   - Scroll behavior: transparent at top → dark bg on scroll (JS class toggle)
   - Hover: link underline slide-in or color shift to gold
   - CTA button: gold bg, dark text, subtle pulse or scale hover
   - Mobile: hamburger menu at ≤768px with slide-down nav
   - Active link indicator: small dot or bottom border
3. JS: scroll listener to add .scrolled class to nav

PALETTE: bg #0D0B1F on scroll, accent #F5C842, links #A09AB8 → #FFFFFF on hover
HEIGHT: 70px desktop / 60px mobile
FONT: Space Grotesk for brand name, Inter for links`,
  },
  {
    id: "about",
    number: "03",
    label: "ABOUT",
    title: "About / Story Section",
    description: "Photo + origin story + credibility stats. Build trust before the ask.",
    labelClass: labelClasses.about,
    preview: (
      <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="220" fill="#0B091A" rx="6" />
        <rect x="20" y="20" width="168" height="180" rx="12" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <circle cx="104" cy="85" r="34" fill="#1E1A3C" />
        <circle cx="104" cy="68" r="16" fill="#2A2250" />
        <ellipse cx="104" cy="104" rx="24" ry="15" fill="#2A2250" />
        <rect x="44" y="128" width="120" height="8" rx="4" fill="#2A2460" />
        <rect x="60" y="142" width="88" height="6" rx="3" fill="#2A2250" />
        <rect x="32" y="164" width="36" height="26" rx="6" fill="#0D0B24" stroke="#2A2250" strokeWidth="1" />
        <rect x="76" y="164" width="36" height="26" rx="6" fill="#0D0B24" stroke="#2A2250" strokeWidth="1" />
        <rect x="120" y="164" width="36" height="26" rx="6" fill="#0D0B24" stroke="#2A2250" strokeWidth="1" />
        <rect x="36" y="168" width="28" height="8" rx="3" fill="#3A3070" />
        <rect x="80" y="168" width="28" height="8" rx="3" fill="#3A3070" />
        <rect x="124" y="168" width="28" height="8" rx="3" fill="#3A3070" />
        <rect x="208" y="28" width="70" height="9" rx="4" fill="rgba(124,92,252,0.4)" />
        <rect x="208" y="46" width="190" height="16" rx="4" fill="#2A2460" />
        <rect x="208" y="68" width="160" height="16" rx="4" fill="#2A2460" />
        <rect x="208" y="94" width="192" height="6" rx="3" fill="#2A2250" />
        <rect x="208" y="106" width="176" height="6" rx="3" fill="#2A2250" />
        <rect x="208" y="118" width="185" height="6" rx="3" fill="#2A2250" />
        <rect x="208" y="130" width="165" height="6" rx="3" fill="#2A2250" />
        <rect x="208" y="142" width="178" height="6" rx="3" fill="#2A2250" />
        <rect x="208" y="164" width="110" height="28" rx="6" fill="transparent" stroke="#F5C842" strokeWidth="1" />
        <rect x="218" y="170" width="90" height="8" rx="3" fill="rgba(245,200,66,0.3)" />
      </svg>
    ),
    prompt: `You are a conversion copywriter specializing in personal brand storytelling. Write the About / Story section for a funnel page.

PERSON / BRAND: [Name or brand]
BEFORE STATE: [Who you were / what you struggled with before]
TURNING POINT: [The moment or discovery that changed everything]
WHAT YOU DO NOW: [Your offer / who you help / how]
CREDENTIALS: [Certs, results, years of exp, client count]
3 STATS: [e.g. "50+ Clients Built", "$2M+ in Client Revenue", "3 Years GHL Expert"]

OUTPUT:
1. Section eyebrow label (e.g. "MEET YOUR SYSTEM BUILDER")
2. Section headline — authority + relatability in one line
3. Story copy — 3 paragraphs max:
   Para 1: Relatable start (pain/struggle)
   Para 2: Turning point + discovery
   Para 3: Who you help now + your unique method
4. 3 stat blocks: [Big Number] + [Short Label]
5. Optional closing quote — 1 italic sentence, mission-statement style

LAYOUT: Photo left (with rounded corners + subtle glow border), text right. Stat blocks inline below text. Desktop 50/50 split. Mobile: photo on top, text below.`,
  },
  {
    id: "feat",
    number: "04",
    label: "FEATURES",
    title: "Features / Benefits Section",
    description: "3-column icon cards. What they get — and why it matters to them.",
    labelClass: labelClasses.feat,
    preview: (
      <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="220" fill="#0B091A" rx="6" />
        <rect x="155" y="16" width="110" height="10" rx="5" fill="#3A3070" />
        <rect x="130" y="32" width="160" height="8" rx="4" fill="#2A2250" />
        <rect x="14" y="56" width="118" height="148" rx="9" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <rect x="28" y="70" width="28" height="28" rx="7" fill="#1E1A3C" />
        <rect x="32" y="74" width="20" height="20" rx="5" fill="rgba(124,92,252,0.5)" />
        <rect x="28" y="107" width="88" height="8" rx="4" fill="#2A2460" />
        <rect x="28" y="122" width="80" height="5" rx="2" fill="#2A2250" />
        <rect x="28" y="132" width="72" height="5" rx="2" fill="#2A2250" />
        <rect x="28" y="142" width="78" height="5" rx="2" fill="#2A2250" />
        <rect x="28" y="174" width="88" height="20" rx="5" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <rect x="151" y="44" width="118" height="160" rx="9" fill="#1C1840" stroke="#7C5CFC" strokeWidth="1.5" />
        <rect x="167" y="34" width="86" height="16" rx="8" fill="#F5C842" />
        <rect x="172" y="36" width="76" height="8" rx="4" fill="rgba(13,11,31,0.5)" />
        <rect x="165" y="58" width="28" height="28" rx="7" fill="#221A50" />
        <rect x="169" y="62" width="20" height="20" rx="5" fill="rgba(245,200,66,0.6)" />
        <rect x="165" y="95" width="88" height="8" rx="4" fill="#3A3070" />
        <rect x="165" y="110" width="80" height="5" rx="2" fill="#3A3070" />
        <rect x="165" y="120" width="72" height="5" rx="2" fill="#3A3070" />
        <rect x="165" y="130" width="78" height="5" rx="2" fill="#3A3070" />
        <rect x="165" y="140" width="64" height="5" rx="2" fill="#3A3070" />
        <rect x="165" y="174" width="88" height="20" rx="5" fill="#F5C842" />
        <rect x="174" y="178" width="70" height="8" rx="4" fill="rgba(13,11,31,0.45)" />
        <rect x="288" y="56" width="118" height="148" rx="9" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <rect x="302" y="70" width="28" height="28" rx="7" fill="#1E1A3C" />
        <rect x="306" y="74" width="20" height="20" rx="5" fill="rgba(255,156,110,0.5)" />
        <rect x="302" y="107" width="88" height="8" rx="4" fill="#2A2460" />
        <rect x="302" y="122" width="80" height="5" rx="2" fill="#2A2250" />
        <rect x="302" y="132" width="72" height="5" rx="2" fill="#2A2250" />
        <rect x="302" y="142" width="78" height="5" rx="2" fill="#2A2250" />
        <rect x="302" y="174" width="88" height="20" rx="5" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
      </svg>
    ),
    prompt: `You are a conversion-focused copywriter. Build a Features/Benefits section for a funnel page.

OFFER: [What you're selling]
TOP PAIN POINTS SOLVED: [List 3–5 problems your offer fixes]
TONE: [Professional / Bold / Conversational]

OUTPUT:
1. Section headline — outcome-focused, not feature-focused (e.g. not "Our Features" but "Everything You Need to Go From Leads to Clients — On Autopilot")
2. Section subheadline — 1 sentence, specificity over vagueness
3. 6 feature/benefit cards, each containing:
   - Icon: emoji or icon name (e.g. 🔁 or "ArrowsClockwise")
   - Title: 3–5 words (completes the sentence "You get ___")
   - Description: 2 sentences max — Sentence 1: the benefit. Sentence 2: the mechanism.
4. Layout: 3-column grid desktop, 2-col tablet, 1-col mobile
5. One "featured" card (center or any): different border color (use purple #7C5CFC), subtle bg tint, badge "Most Used" or "Core Feature"

DESIGN NOTE: Each card: icon top-left, title bold, description muted. Hover: slight lift + border glow. Match dark palette.`,
  },
  {
    id: "price",
    number: "05",
    label: "PRICING",
    title: "Pricing Section",
    description: "3-tier pricing table. Featured middle plan with visual hierarchy that converts.",
    labelClass: labelClasses.price,
    preview: (
      <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="220" fill="#0B091A" rx="6" />
        <rect x="150" y="12" width="120" height="10" rx="5" fill="#3A3070" />
        <rect x="165" y="28" width="90" height="7" rx="3" fill="#2A2250" />
        <rect x="10" y="50" width="120" height="156" rx="9" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <rect x="20" y="62" width="56" height="8" rx="3" fill="#2A2250" />
        <rect x="20" y="76" width="44" height="16" rx="4" fill="#2A2460" />
        <rect x="20" y="96" width="100" height="1" fill="#2A2250" />
        <rect x="20" y="104" width="88" height="5" rx="2" fill="#2A2250" />
        <rect x="20" y="114" width="78" height="5" rx="2" fill="#2A2250" />
        <rect x="20" y="124" width="84" height="5" rx="2" fill="#2A2250" />
        <rect x="20" y="134" width="72" height="5" rx="2" fill="#2A2250" />
        <rect x="20" y="178" width="100" height="22" rx="5" fill="#2A2250" />
        <rect x="150" y="34" width="120" height="172" rx="9" fill="#1C1840" stroke="#7C5CFC" strokeWidth="1.5" />
        <rect x="168" y="24" width="84" height="16" rx="8" fill="#F5C842" />
        <rect x="174" y="27" width="72" height="7" rx="3" fill="rgba(13,11,31,0.5)" />
        <rect x="160" y="48" width="60" height="8" rx="3" fill="#3A3070" />
        <rect x="160" y="62" width="52" height="18" rx="4" fill="rgba(245,200,66,0.28)" />
        <rect x="160" y="85" width="100" height="1" fill="#3A3070" />
        <rect x="160" y="93" width="92" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="103" width="82" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="113" width="88" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="123" width="76" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="133" width="84" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="143" width="70" height="5" rx="2" fill="#3A3070" />
        <rect x="160" y="184" width="100" height="22" rx="5" fill="#F5C842" />
        <rect x="170" y="188" width="80" height="10" rx="4" fill="rgba(13,11,31,0.45)" />
        <rect x="290" y="50" width="120" height="156" rx="9" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <rect x="300" y="62" width="56" height="8" rx="3" fill="#2A2250" />
        <rect x="300" y="76" width="44" height="16" rx="4" fill="#2A2460" />
        <rect x="300" y="96" width="100" height="1" fill="#2A2250" />
        <rect x="300" y="104" width="88" height="5" rx="2" fill="#2A2250" />
        <rect x="300" y="114" width="78" height="5" rx="2" fill="#2A2250" />
        <rect x="300" y="124" width="84" height="5" rx="2" fill="#2A2250" />
        <rect x="300" y="134" width="72" height="5" rx="2" fill="#2A2250" />
        <rect x="300" y="144" width="80" height="5" rx="2" fill="#2A2250" />
        <rect x="300" y="178" width="100" height="22" rx="5" fill="#2A2250" />
      </svg>
    ),
    prompt: `You are a pricing strategist and funnel copywriter. Build a pricing section.

OFFER: [Your service or product]
TIERS: [3 recommended — e.g. Starter / Pro / Elite]
PRICING MODEL: [One-time / Monthly retainer / Annual / Application only]
GOAL: [Push toward middle tier / sell top tier / generate leads]

FOR EACH TIER OUTPUT:
1. Tier name + 1-line positioning subtitle
2. Price (+ billing frequency note)
3. 4–6 bullet inclusions — each starts with ✓ and leads with the benefit
4. 1 "not included" item for lower tiers (builds desire for upgrade)
5. CTA button copy — unique per tier
6. "Most Popular" badge on featured tier

BELOW THE TABLE:
7. Guarantee or risk-reversal line (1 sentence)
8. Optional: FAQ-style objection block (2–3 micro-objections answered inline)

DESIGN NOTE:
- Outer tiers: standard card, muted border
- Middle tier: elevated card (slightly taller), purple border #7C5CFC, gold badge at top
- All cards: same width on desktop, stacked on mobile with featured card first`,
  },
  {
    id: "social",
    number: "06",
    label: "SOCIAL PROOF",
    title: "Testimonials Section",
    description: "Result-first quote cards with avatars, stars, and outcome badges.",
    labelClass: labelClasses.social,
    preview: (
      <svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="210" fill="#0B091A" rx="6" />
        <rect x="150" y="14" width="120" height="10" rx="5" fill="#3A3070" />
        <rect x="12" y="40" width="188" height="156" rx="10" fill="#161330" stroke="#2A2250" strokeWidth="1" />
        <text x="22" y="66" fontSize="32" fill="rgba(124,92,252,0.35)" fontFamily="serif">
          &quot;
        </text>
        <rect x="22" y="72" width="160" height="5" rx="2" fill="#2A2250" />
        <rect x="22" y="83" width="150" height="5" rx="2" fill="#2A2250" />
        <rect x="22" y="94" width="155" height="5" rx="2" fill="#2A2250" />
        <rect x="22" y="105" width="130" height="5" rx="2" fill="#2A2250" />
        <rect x="22" y="116" width="140" height="5" rx="2" fill="#2A2250" />
        <rect x="22" y="132" width="80" height="7" rx="3" fill="rgba(245,200,66,0.45)" />
        <rect x="114" y="130" width="76" height="12" rx="6" fill="rgba(107,203,119,0.15)" stroke="rgba(107,203,119,0.3)" strokeWidth="1" />
        <rect x="120" y="133" width="64" height="6" rx="3" fill="rgba(107,203,119,0.5)" />
        <circle cx="34" cy="164" r="15" fill="#2A2250" />
        <circle cx="34" cy="158" r="7" fill="#1E1A3C" />
        <ellipse cx="34" cy="174" rx="10" ry="7" fill="#1E1A3C" />
        <rect x="56" y="155" width="66" height="8" rx="3" fill="#3A3070" />
        <rect x="56" y="168" width="90" height="6" rx="3" fill="#2A2250" />
        <rect x="220" y="40" width="188" height="156" rx="10" fill="#161330" stroke="#7C5CFC" strokeWidth="1" />
        <text x="230" y="66" fontSize="32" fill="rgba(245,200,66,0.3)" fontFamily="serif">
          &quot;
        </text>
        <rect x="230" y="72" width="160" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="83" width="150" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="94" width="155" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="105" width="130" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="116" width="140" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="132" width="80" height="7" rx="3" fill="rgba(245,200,66,0.45)" />
        <rect x="322" y="130" width="76" height="12" rx="6" fill="rgba(245,200,66,0.1)" stroke="rgba(245,200,66,0.25)" strokeWidth="1" />
        <rect x="328" y="133" width="64" height="6" rx="3" fill="rgba(245,200,66,0.4)" />
        <circle cx="242" cy="164" r="15" fill="#2A2250" />
        <circle cx="242" cy="158" r="7" fill="#1E1A3C" />
        <ellipse cx="242" cy="174" rx="10" ry="7" fill="#1E1A3C" />
        <rect x="264" y="155" width="66" height="8" rx="3" fill="#3A3070" />
        <rect x="264" y="168" width="90" height="6" rx="3" fill="#2A2250" />
      </svg>
    ),
    prompt: `You are a social proof copywriter. Build a testimonials section for a funnel page.

OFFER: [Your service/product]
REAL RESULTS TO REFERENCE: [Specific client outcomes — be as specific as possible]
NUMBER NEEDED: [2–4 for above-fold, 4–6 for dedicated section]

FOR EACH TESTIMONIAL OUTPUT:
1. Quote (3–5 sentences, first person)
   Structure: Before state → What changed → Specific measurable result → Recommendation
   Example: "Before working with AJ, I was spending 3 hours a day manually following up with leads. After he built our GHL system, that's now fully automated. We went from 2 bookings a week to 11 in the first month. If you're serious about systemizing your business, hire him."
2. Client name (or placeholder: "Sarah M.")
3. Client title + context (e.g. "Fitness Coach · Austin, TX")
4. Star rating (5/5)
5. Result badge (short, bold — e.g. "🗓️ 11 Bookings in 30 Days")

LAYOUT: 2-col grid desktop, 1-col mobile
DESIGN: Large opening quote mark (top-left, muted accent color). Alternating border colors (purple / gold / purple). Avatar circle left, name + title right of avatar.`,
  },
  {
    id: "cta",
    number: "07",
    label: "CALL TO ACTION",
    title: "CTA Section",
    description: "Mid-page or end-of-page conversion block. Urgency without dishonesty.",
    labelClass: labelClasses.cta,
    preview: (
      <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="170" fill="#0B091A" rx="6" />
        <rect x="14" y="14" width="392" height="142" rx="12" fill="#161330" stroke="rgba(245,200,66,0.2)" strokeWidth="1" />
        <ellipse cx="210" cy="85" rx="170" ry="55" fill="rgba(245,200,66,0.04)" />
        <rect x="158" y="26" width="104" height="10" rx="5" fill="rgba(124,92,252,0.3)" />
        <rect x="164" y="28" width="92" height="6" rx="3" fill="rgba(124,92,252,0.4)" />
        <rect x="80" y="46" width="260" height="16" rx="4" fill="#3A3070" />
        <rect x="148" y="46" width="124" height="16" rx="4" fill="rgba(245,200,66,0.18)" />
        <rect x="105" y="68" width="210" height="16" rx="4" fill="#3A3070" />
        <rect x="115" y="95" width="190" height="6" rx="3" fill="#2A2250" />
        <rect x="148" y="113" width="124" height="28" rx="7" fill="#F5C842" />
        <rect x="160" y="119" width="100" height="10" rx="4" fill="rgba(13,11,31,0.45)" />
        <rect x="158" y="149" width="104" height="5" rx="2" fill="#2A2250" />
      </svg>
    ),
    prompt: `You are a direct-response copywriter. Build a CTA (Call to Action) section for a funnel page.

OFFER: [Your offer]
DESIRED ACTION: [Book a call / Purchase / Download / Register]
PRIMARY OBJECTION TO REMOVE: [e.g. "I don't have time" / "It's too expensive" / "Will this work for me?"]
URGENCY (if real): [Limited spots / Bonus deadline / Price increase date — only if true]

OUTPUT:
1. Eyebrow line — short, inviting (e.g. "READY TO GET STARTED?" or "THE NEXT STEP IS SIMPLE")
2. Headline — action-oriented, outcome-first (2 lines max)
3. Subheadline — 1 sentence that removes the main objection without being defensive
4. CTA button copy — 4–6 words, action verb first (e.g. "Book Your Free Strategy Call")
5. Trust micro-copy below button — (e.g. "No contracts. No pressure. Just clarity.")
6. Optional urgency element — honest, specific (e.g. "Only 3 spots left this month")

DESIGN NOTE: Full-width dark card (#161330), subtle gold glow radial background, top border gold at 20% opacity. Center-aligned content. Max content width 680px. Button: gold fill, large (min 200px wide).`,
  },
  {
    id: "footer",
    number: "08",
    label: "FOOTER",
    title: "Footer",
    description: "Logo, links, social icons, legal. Clean and minimal — nothing unnecessary.",
    labelClass: labelClasses.footer,
    preview: (
      <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="170" fill="#060415" rx="6" />
        <rect width="420" height="1" fill="#2A2250" />
        <circle cx="38" cy="36" r="12" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <rect x="38" y="30" width="5" height="5" rx="1" fill="#7C5CFC" />
        <rect x="44" y="28" width="5" height="9" rx="1" fill="#F5C842" />
        <rect x="56" y="32" width="72" height="10" rx="3" fill="#3A3070" />
        <rect x="24" y="54" width="148" height="5" rx="2" fill="#2A2250" />
        <rect x="24" y="64" width="128" height="5" rx="2" fill="#2A2250" />
        <rect x="24" y="74" width="136" height="5" rx="2" fill="#2A2250" />
        <circle cx="34" cy="98" r="9" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <circle cx="56" cy="98" r="9" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <circle cx="78" cy="98" r="9" fill="#1E1A3C" stroke="#2A2250" strokeWidth="1" />
        <rect x="230" y="24" width="60" height="8" rx="3" fill="#3A3070" />
        <rect x="230" y="38" width="44" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="49" width="50" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="60" width="40" height="5" rx="2" fill="#2A2250" />
        <rect x="230" y="71" width="46" height="5" rx="2" fill="#2A2250" />
        <rect x="330" y="24" width="60" height="8" rx="3" fill="#3A3070" />
        <rect x="330" y="38" width="44" height="5" rx="2" fill="#2A2250" />
        <rect x="330" y="49" width="50" height="5" rx="2" fill="#2A2250" />
        <rect x="330" y="60" width="40" height="5" rx="2" fill="#2A2250" />
        <rect x="24" y="120" width="372" height="1" fill="#2A2250" />
        <rect x="24" y="134" width="150" height="6" rx="3" fill="#2A2250" />
        <rect x="292" y="134" width="50" height="6" rx="3" fill="#2A2250" />
        <rect x="350" y="134" width="46" height="6" rx="3" fill="#2A2250" />
      </svg>
    ),
    prompt: `You are a frontend developer. Build a footer for a premium marketing/funnel website.

BRAND NAME: [Your brand]
TAGLINE / DESCRIPTION (1 line): [e.g. "Building automated systems for coaches and consultants."]
SOCIAL LINKS: [Instagram, LinkedIn, YouTube, Facebook — specify which to include]
FOOTER COLUMNS (2 columns):
  Col 1 — [e.g. Pages: Home, Gallery, Tools, Blog]
  Col 2 — [e.g. Legal: Privacy Policy, Terms of Service, Contact]
COPYRIGHT: [© 2025 [Brand]. All rights reserved.]

OUTPUT:
1. Full semantic HTML footer
2. CSS:
   - Background: #060415 (near-black, slightly different from main bg)
   - Top border: 1px solid #2A2250
   - Logo area: left (30% width), Link columns: right (70% width) in 2-col grid
   - Social icons: simple circles with hover gold fill transition
   - Bottom bar: copyright left, legal links right, separated by thin horizontal rule
   - Mobile: full single-column stack, all centered, 20px gap between sections
3. No heavy visuals. Intentional whitespace. Muted link colors #6A6488 → #FFFFFF hover.

FONT: Space Grotesk brand name, Inter for links and body text.`,
  },
];

const gptPrompts: { id: string; label: string; body: string }[] = [
  {
    id: "g1",
    label: "📸 PROMPT 1 — Extend Background Around Your Photo",
    body: `Attached is my photo. I need you to extend the background around me and create a professional hero section image for my coaching/agency website.

IMPORTANT: Do NOT change, alter, or modify my face, body, or appearance in any way whatsoever. Keep me exactly as I appear in the photo.

Background to generate:
- Dark cinematic environment — deep purple-black tones (#0D0B1F palette)
- Subtle volumetric light from slightly behind and above me (rim lighting effect)
- Background atmosphere: premium agency/tech studio — modern, not corporate
- Add soft out-of-focus bokeh light spheres in the background (purple and gold tones)
- Very subtle geometric lines or grid in the far background (barely visible texture)

Composition:
- Output: 1440x810px horizontal (16:9)
- Place me center-left, leaving the right ~40% open for headline text overlay
- Background should feel deep and spacious, not crowded

Mood: Bold, modern, high-authority. Like a premium SaaS founder photo shoot — confident, dark, cinematic.`,
  },
  {
    id: "g2",
    label: "🖼️ PROMPT 2 — Background Only (You Drop Your Photo In After)",
    body: `Create a hero section background image for a high-ticket coaching and automation agency website.

DO NOT include any people, faces, or figures — this is a background layer only. I will add my own photo on top in Canva or Figma.

Background specs:
- Color palette: deep purple-black gradient (#0D0B1F to #130F2A)
- Lighting: subtle volumetric glow from center-top, fading to near-black at edges
- Texture: extremely faint circuit-board or geometric mesh lines (10–15% opacity max)
- Left side: slightly lighter — this is where my portrait photo will be placed
- Right side: darker and more open — this is where headline text will appear
- Small soft bokeh orbs scattered in background (purple #7C5CFC and gold #F5C842 at very low opacity)

Output: 1440 x 810px. No text. No logos. No people. Pure atmospheric background.`,
  },
  {
    id: "g3",
    label: "⚡ PROMPT 3 — Midjourney / Adobe Firefly Version",
    body: `Dark cinematic hero background for a premium coaching and automation agency website. Deep purple-black atmospheric gradient. Subtle soft bokeh light orbs in purple and warm gold tones, barely visible geometric grid lines in the far background, dramatic volumetric rim light from upper-left. Film noir meets modern SaaS aesthetic. Left half slightly lighter for portrait overlay, right half darker for headline text. Ultra-widescreen 16:9. No people, no text, no logos, no faces. Clean and layered. --ar 16:9 --style raw --q 2 --v 6`,
  },
  {
    id: "g4",
    label: "📋 HOW TO USE — Step by Step",
    body: `STEP 1 — Prepare your photo
Best results: high-quality PNG, clean lighting, simple background (plain wall), wearing dark/neutral clothing so you blend with the dark background.

STEP 2 — ChatGPT (with your photo)
Go to ChatGPT with GPT-4o. Upload your photo. Paste Prompt 1. This extends the bg around you while keeping your face 100% intact.

STEP 3 — Background-only approach
Use Prompt 2 (no photo needed). Generate just the background. Then in Canva: Upload your photo → use Background Remover → layer your cutout over the generated bg. Adjust placement and scale.

STEP 4 — Midjourney / Firefly
Use Prompt 3 in Midjourney (v6) or Adobe Firefly. Background only. Then composite in Canva or Figma.

STEP 5 — Final assembly in Canva
1. Background image (generated) → set as full-bleed base layer
2. Your photo (background removed) → position center-left, scale to fit the hero height
3. Gradient overlay → dark fade from right side toward center for headline readability
4. Headline text → place on the right ~40%, use Space Grotesk Bold, white + one phrase in gold (#F5C842)
5. Export at 1440×810px JPG (quality 85) or WebP for the live site.

PRO TIP: Always generate 3–4 variations and pick the one with the cleanest negative space for text. Don't settle for the first output.`,
  },
];

const tabs: { id: TabId; label: string }[] = [
  { id: "all", label: "All Sections" },
  { id: "hero", label: "🏠 Hero" },
  { id: "nav", label: "🔗 Navigation" },
  { id: "about", label: "👤 About" },
  { id: "feat", label: "⚡ Features" },
  { id: "price", label: "💰 Pricing" },
  { id: "social", label: "💬 Testimonials" },
  { id: "cta", label: "🎯 CTA" },
  { id: "footer", label: "📄 Footer" },
  { id: "gpt", label: "🎨 GPT Image" },
];

function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
      className={`rounded-md px-3.5 py-2.5 text-[12.5px] font-bold transition active:scale-[0.97] ${
        copied ? "bg-[#4ADE80] text-[#0D0B1F]" : "bg-[#F5C842] text-[#0D0B1F] hover:brightness-110"
      } ${className}`}
      style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
    >
      {copied ? "✓ Copied" : "📋 Copy Prompt"}
    </button>
  );
}

function PromptBlock({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`relative font-mono text-[11.5px] text-[#C0B8E0] leading-[1.75] whitespace-pre-wrap rounded-lg border border-[#2A2250] bg-[#0B091A] px-4 py-3 mb-3 transition-[max-height] duration-300 ease-out overflow-hidden ${
          open ? "max-h-[700px]" : "max-h-[110px]"
        }`}
      >
        {text}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
            style={{ background: "linear-gradient(transparent, #0B091A)" }}
          />
        )}
      </div>
      <div className="flex gap-2 mt-auto">
        <CopyButton text={text} className="flex-1" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-[#2A2250] text-[#A09AB8] text-[12.5px] px-3 py-2.5 transition hover:border-[#7C5CFC] hover:text-white"
        >
          {open ? "Collapse ↑" : "Expand ↓"}
        </button>
      </div>
    </>
  );
}

export function PrivateContent() {
  const [tab, setTab] = useState<TabId>("all");

  const showGpt = tab === "all" || tab === "gpt";
  const visibleSections = sections.filter((s) => tab === "all" || tab === s.id);

  return (
    <div className="relative min-h-[100dvh] bg-[#0D0B1F] text-white overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none fixed top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(124,92,252,0.13) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <section className="pt-16 pb-9 px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(124,92,252,0.22)] bg-[rgba(124,92,252,0.1)] px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9B82FF] mb-5">
            🔒 PRIVATE · INTERNAL TOOL · AJ ONLY
          </span>
          <h1
            className="font-bold leading-[1.1] mb-3.5"
            style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)",
              fontSize: "clamp(30px, 5vw, 50px)",
            }}
          >
            Funnel <em className="not-italic text-[#F5C842]">Section Builder</em>
          </h1>
          <p className="text-[15px] text-[#A09AB8] leading-[1.65] max-w-[520px] mx-auto">
            Wireframe reference + copy-ready prompts for every funnel section. Pick a section, copy
            the prompt, build with confidence.
          </p>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center px-6 pb-9">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-4 py-1.5 text-[12.5px] font-medium transition ${
                tab === t.id
                  ? "bg-[#7C5CFC] border-[#7C5CFC] text-white"
                  : "bg-transparent border-[#2A2250] text-[#A09AB8] hover:border-[#7C5CFC] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-[22px] px-6 pb-14 max-w-[1180px] mx-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {visibleSections.map((s) => (
            <article
              key={s.id}
              className="flex flex-col overflow-hidden rounded-[14px] border border-[#2A2250] bg-[#161330] transition-all hover:border-[#4A3A8A] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="border-b border-[#2A2250] bg-[#0B091A] p-[18px_20px]">
                <div className="[&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&_svg]:rounded-md">
                  {s.preview}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className={`text-[10px] font-semibold uppercase tracking-[0.13em] mb-1.5 ${s.labelClass}`}>
                  SECTION {s.number} · {s.label}
                </div>
                <h3
                  className="text-[17px] font-bold mb-1.5"
                  style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
                >
                  {s.title}
                </h3>
                <p className="text-[12.5px] text-[#A09AB8] leading-[1.55] mb-3.5">{s.description}</p>
                <PromptBlock text={s.prompt} />
              </div>
            </article>
          ))}

          {showGpt && (
            <article
              className="col-span-full overflow-hidden rounded-[14px] border bg-gradient-to-br from-[#161330] to-[#1A153E] transition hover:border-[rgba(245,200,66,0.45)]"
              style={{ borderColor: "rgba(245,200,66,0.25)" }}
            >
              <div className="px-7 pt-7">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(245,200,66,0.25)] bg-[rgba(245,200,66,0.08)] px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#F5C842] mb-3.5">
                  🎨 GPT IMAGE GENERATION · HERO BACKGROUND
                </span>
                <h2
                  className="text-[20px] font-bold mb-1.5"
                  style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
                >
                  Hero Section — Background Image Prompts
                </h2>
                <p className="text-[13px] text-[#A09AB8] leading-[1.55]">
                  Use these in ChatGPT (with your photo attached) to generate a cinematic hero
                  background — real coach, not AI generated faces. Your face stays exactly as-is.
                </p>
                <hr className="border-0 border-t border-[#2A2250] mt-5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {gptPrompts.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`px-6 py-[22px] ${
                      idx % 2 === 0 ? "md:border-r" : ""
                    } ${idx < gptPrompts.length - 2 ? "border-b" : "border-b md:border-b-0"} border-[#2A2250]`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#F5C842] mb-3 flex items-center gap-1.5">
                      {p.label}
                    </div>
                    <div className="font-mono text-[11.5px] text-[#C0B8E0] leading-[1.75] whitespace-pre-wrap mb-3.5">
                      {p.body}
                    </div>
                    <CopyButton text={p.body} />
                  </div>
                ))}
              </div>
            </article>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t border-[#2A2250] text-center py-9 px-6 text-[12.5px] text-[#4A4468]">
          <form action={lock}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#2A2250] text-[#A09AB8] px-4.5 py-2 text-[12.5px] transition hover:border-[#F87171] hover:text-[#F87171]"
            >
              🔒 Lock & Sign Out
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
