"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { lock } from "./actions";

type SectionId =
  | "hero"
  | "empathy"
  | "opportunity"
  | "compare"
  | "usp"
  | "offer"
  | "social"
  | "risk"
  | "authority"
  | "urgency"
  | "faq"
  | "footer"
  | "nav";
type TabId = "all" | SectionId | "gpt";

type Section = {
  id: SectionId;
  number: string;
  label: string;
  title: string;
  description: string;
  labelClass: string;
  preview?: ReactNode;
  basePrompt: string;
  varsPrompt: string;
};

const labelClasses: Record<SectionId, string> = {
  hero: "text-[#F5C842]",
  empathy: "text-[#FF6BA3]",
  opportunity: "text-[#9B7FFF]",
  compare: "text-[#5ED9D1]",
  usp: "text-[#FF9C6E]",
  offer: "text-[#6BCB77]",
  social: "text-[#FFB84D]",
  risk: "text-[#90CAF9]",
  authority: "text-[#C896FF]",
  urgency: "text-[#FF8585]",
  faq: "text-[#B8D8E0]",
  footer: "text-[#94A3B8]",
  nav: "text-[#A09AB8]",
};

const sections: Section[] = [
  {
    id: "hero",
    number: "01a",
    label: "HERO VARIATION 1",
    title: "Hero Variation 1",
    description:
      "Tony Robbins-inspired full-width centered hero. BG image + headline + CTA + video block. Built as a GHL custom code block.",
    labelClass: labelClasses.hero,
    preview: (
      <div className="relative w-full aspect-[2/1] overflow-hidden rounded-md">
        <Image
          src="/private/hero-v1-bg.webp"
          alt="Hero Variation 1 background reference"
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>
    ),
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a reusable hero section component inspired by TonyRobbins.com for use inside GoHighLevel (GHL) as a custom code block.

=== OUTPUT ===
Single file: 02-hero.html
All CSS in <style> tags
All JS in <script> tags
Google Fonts only — no other dependencies
GHL-ready standalone custom code block

=== LAYOUT ===
Full-width centered layout (NOT split)

=== NAVIGATION ===
- Logo text left (or swap to img)
- Nav links center: About | Mission | Events | Programs | Coaching | Shop | Blog
- Search icon right
- Sticky, transparent → dark blur on scroll
- Height: var(--nav-height) (70px)
- Mobile: hamburger menu

=== HERO CONTENT (centered, above video) ===
1. Headline
   - Large bold centered
   - 2 lines
   - Pure white
2. Subheadline
   - Centered, muted color
   - 1 line
3. CTA Button
   - Background: var(--accent) (teal/cyan)
   - Dark bold uppercase text
   - Hover: glow + scale up

=== VIDEO BLOCK (below CTA) ===
- Rounded rectangle container
- Video thumbnail image as background
- Centered play button (teal circle + white triangle)
- On click: open VIDEO_URL in lightbox or new tab
- Subtle border: 1px rgba(255,255,255,0.1)
- Box shadow: soft glow

=== BACKGROUND ===
- Full-width BG_IMAGE behind everything
- Dark overlay: rgba(0,0,0,0.6) on top of image
- Subtle blue/teal gradient overlay for mood

=== ANIMATIONS ===
- Headline + sub: fade in + slide up on load
- CTA button: fade in delayed
- Video block: fade in + scale up delayed
- Background: very subtle slow zoom (Ken Burns)
- Play button: pulse animation

=== MOBILE RESPONSIVE ===
- Breakpoint: 768px
- Nav collapses to hamburger
- Text scales down
- Video block full width on mobile
- Padding adjusts for small screens

=== OUTPUT RULES ===
- All colors, fonts, copy, and asset paths driven by the CLIENT VARIABLES block at the top of the file
- Comment block at top with numbered steps so client knows exactly what to edit
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 1 (Tony Robbins-style) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH
   ============================================
   STEP 1: Replace background image URL
   STEP 2: Replace video thumbnail URL
   STEP 3: Set countdown date
   STEP 4: Update all copy below
   STEP 5: Replace logo text or image
   ============================================ */

— COLORS (CSS custom properties at top of <style>) —
--bg:           #0A0A0F
--accent:       #00E5CC
--text:         #FFFFFF
--muted:        #A0A0B0
--nav-height:   70px

— JS CONSTS (top of <script>) —
const LOGO            = "TONY ROBBINS";
const COUNTDOWN_DATE  = "2026-08-01T00:00:00";
const BG_IMAGE        = "/private/hero-v1-bg.webp";          ← swap for client image
const VIDEO_THUMB     = "/private/hero-v1-video-thumb.webp"; ← swap for client thumbnail
const VIDEO_URL       = "______";                            ← YouTube / Vimeo / Wistia URL

— COPY —
Headline Line 1:     Unlock The Power Within
Headline Line 2:     And Achieve Your Dreams
Subheadline:         Proven Techniques For Personal And Professional Growth
CTA Button Text:     GET STARTED
CTA Button URL:      ______

— NAVIGATION LINKS —
About | Mission | Events | Programs | Coaching | Shop | Blog
(Edit array at top of <script>)`,
  },
  {
    id: "hero",
    number: "01b",
    label: "HERO VARIATION 2",
    title: "Hero Variation 2",
    description:
      "Split layout with countdown timer, floating stat cards, and animated reveal. Built as a GHL custom code block.",
    labelClass: labelClasses.hero,
    basePrompt: `You are an expert frontend developer and funnel designer.
Build a reusable hero section component for use across multiple client projects inside GoHighLevel (GHL) as a custom code block.

=== OUTPUT REQUIREMENTS ===
- Single HTML file: 02-hero.html
- All CSS inside <style> tags
- All JS inside <script> tags
- No external dependencies except Google Fonts
- Must work as standalone GHL custom code block

=== LAYOUT ===
Split layout — left 50% text, right 50% person photo

=== COLORS (declare as CSS custom properties at top of <style>, inside CLIENT VARIABLES block) ===
--bg, --gold, --purple, --text, --muted

=== FONTS ===
Heading font + body font, both loaded via Google Fonts

=== LEFT SIDE (top to bottom) ===
1. Eyebrow badge — small uppercase label, pill shape, gold accent border
2. Headline — large bold, 2–3 lines, one phrase wrapped in gold accent
3. Subheadline — 1–2 sentences, muted color
4. Countdown Timer
   - Label line above
   - 4 boxes: DAYS | HOURS | MINS | SECS
   - Dark box bg, gold number, muted label
   - Driven by single JS const at top of script: const COUNTDOWN_DATE = "YYYY-MM-DDTHH:MM:SS";
5. CTA Button — gold bg, dark text, uppercase bold, arrow icon right →. Hover: slight scale + glow

=== RIGHT SIDE ===
- Person photo placeholder: <img src="[PHOTO]" class="person-photo"> (bottom-anchored, full height of hero)
- Behind photo: radial purple glow (CSS only, no image)
- Floor fade at bottom (gradient to bg color)
- 2 floating stat cards (absolute positioned):
   Card 1 — top-right area
   Card 2 — bottom-right area
   Both with continuous subtle float up/down CSS animation

=== NAVIGATION (above hero) ===
- Logo left: <img src="[LOGO]" class="nav-logo">
- Optional countdown timer label right (same COUNTDOWN_DATE)
- Sticky navbar, transparent → dark bg on scroll
- Height: 70px

=== ANIMATIONS ===
- Navbar: transparent to dark on scroll
- Left content: fade in + slide up on page load (staggered)
- Stat cards: continuous subtle float
- CTA button: pulse glow on hover
- Countdown: live ticking every second

=== MOBILE RESPONSIVE ===
- Stack to single column ≤768px
- Photo below text on mobile
- Countdown boxes shrink gracefully

=== OUTPUT RULES ===
- All copy, dates, colors, and asset paths driven by the CLIENT VARIABLES block at top
- Comment block: /* === CLIENT VARIABLES — EDIT HERE === */
- One file, no frameworks`,
    varsPrompt: `Apply these client values to the Hero Variation 2 base component.

/* === CLIENT VARIABLES === */

— BRAND COLORS —
--bg:                #0D0B1F
--gold:              #F5C842
--purple:            #7C5CFC
--text:              #FFFFFF
--muted:             #A09AB8

— FONTS —
Heading Font:        Space Grotesk
Body Font:           Inter

— LOGO & PHOTO —
Logo File:           ______   ← path to logo image
Hero Photo File:     ______   ← path to person photo (transparent PNG recommended)

— EYEBROW —
Eyebrow Text:        TRUSTED BY 16,358+ FILIPINOS

— HEADLINE —
Line 1:              The Learning Hub for Filipinos Ready to Build
Line 2 (gold):       Future-Proof Skills
Line 3:              and Better Lives

— SUBHEADLINE —
Subheadline:         Explore programs in digital careers, health, mindset, and life development.

— COUNTDOWN —
Label:               Event Starts In:
COUNTDOWN_DATE:      2026-08-01T00:00:00

— CTA BUTTON —
Button Text:         YES, I WANT TO SAVE MY SEAT!
Button URL:          ______

— FLOATING STAT CARDS —
Card 1 (top-right):     16,358+ Lives Changed
Card 2 (bottom-right):  Worldwide — Work from anywhere

— NAVIGATION —
Show Countdown in Nav:   [ yes / no ]`,
  },
  {
    id: "hero",
    number: "01c",
    label: "HERO VARIATION 3",
    title: "Hero Variation 3",
    description:
      "Big Promise / Above-the-fold. What will I get and is it for me?",
    labelClass: labelClasses.hero,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "hero",
    number: "01d",
    label: "HERO VARIATION 4",
    title: "Hero Variation 4",
    description:
      "Big Promise / Above-the-fold. What will I get and is it for me?",
    labelClass: labelClasses.hero,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "hero",
    number: "01e",
    label: "HERO VARIATION 5",
    title: "Hero Variation 5",
    description:
      "Big Promise / Above-the-fold. What will I get and is it for me?",
    labelClass: labelClasses.hero,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "hero",
    number: "01f",
    label: "HERO VARIATION 6",
    title: "Hero Variation 6",
    description:
      "Big Promise / Above-the-fold. What will I get and is it for me?",
    labelClass: labelClasses.hero,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02a",
    label: "EMPATHY VARIATION 1",
    title: "Empathy (Pain Connection) Variation 1",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02b",
    label: "EMPATHY VARIATION 2",
    title: "Empathy (Pain Connection) Variation 2",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02c",
    label: "EMPATHY VARIATION 3",
    title: "Empathy (Pain Connection) Variation 3",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02d",
    label: "EMPATHY VARIATION 4",
    title: "Empathy (Pain Connection) Variation 4",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02e",
    label: "EMPATHY VARIATION 5",
    title: "Empathy (Pain Connection) Variation 5",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "empathy",
    number: "02f",
    label: "EMPATHY VARIATION 6",
    title: "Empathy (Pain Connection) Variation 6",
    description:
      "Do you actually understand me? — Stakes, connection, support. Show readers you've been where they are.",
    labelClass: labelClasses.empathy,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03a",
    label: "OPPORTUNITY VEHICLE VARIATION 1",
    title: "Opportunity Vehicle Variation 1",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03b",
    label: "OPPORTUNITY VEHICLE VARIATION 2",
    title: "Opportunity Vehicle Variation 2",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03c",
    label: "OPPORTUNITY VEHICLE VARIATION 3",
    title: "Opportunity Vehicle Variation 3",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03d",
    label: "OPPORTUNITY VEHICLE VARIATION 4",
    title: "Opportunity Vehicle Variation 4",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03e",
    label: "OPPORTUNITY VEHICLE VARIATION 5",
    title: "Opportunity Vehicle Variation 5",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "opportunity",
    number: "03f",
    label: "OPPORTUNITY VEHICLE VARIATION 6",
    title: "Opportunity Vehicle Variation 6",
    description:
      "What's the new thing that finally works? — Missing link, unique mechanism, proof the vehicle works.",
    labelClass: labelClasses.opportunity,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04a",
    label: "BEFORE VS AFTER VARIATION 1",
    title: "Before vs After Variation 1",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04b",
    label: "BEFORE VS AFTER VARIATION 2",
    title: "Before vs After Variation 2",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04c",
    label: "BEFORE VS AFTER VARIATION 3",
    title: "Before vs After Variation 3",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04d",
    label: "BEFORE VS AFTER VARIATION 4",
    title: "Before vs After Variation 4",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04e",
    label: "BEFORE VS AFTER VARIATION 5",
    title: "Before vs After Variation 5",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "compare",
    number: "04f",
    label: "BEFORE VS AFTER VARIATION 6",
    title: "Before vs After Variation 6",
    description:
      "Why is your way better? — Old way, new way, side-by-side comparison.",
    labelClass: labelClasses.compare,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05a",
    label: "USP VARIATION 1",
    title: "Unique Selling Proposition Variation 1",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05b",
    label: "USP VARIATION 2",
    title: "Unique Selling Proposition Variation 2",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05c",
    label: "USP VARIATION 3",
    title: "Unique Selling Proposition Variation 3",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05d",
    label: "USP VARIATION 4",
    title: "Unique Selling Proposition Variation 4",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05e",
    label: "USP VARIATION 5",
    title: "Unique Selling Proposition Variation 5",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "usp",
    number: "05f",
    label: "USP VARIATION 6",
    title: "Unique Selling Proposition Variation 6",
    description:
      "Why you and not someone else? — Positioning, uniqueness, benefits.",
    labelClass: labelClasses.usp,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06a",
    label: "OFFER POSITIONING VARIATION 1",
    title: "Offer Positioning Variation 1",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06b",
    label: "OFFER POSITIONING VARIATION 2",
    title: "Offer Positioning Variation 2",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06c",
    label: "OFFER POSITIONING VARIATION 3",
    title: "Offer Positioning Variation 3",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06d",
    label: "OFFER POSITIONING VARIATION 4",
    title: "Offer Positioning Variation 4",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06e",
    label: "OFFER POSITIONING VARIATION 5",
    title: "Offer Positioning Variation 5",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "offer",
    number: "06f",
    label: "OFFER POSITIONING VARIATION 6",
    title: "Offer Positioning Variation 6",
    description:
      "What exactly do I get? — Packaging, offer stack, price anchoring.",
    labelClass: labelClasses.offer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07a",
    label: "SOCIAL PROOF VARIATION 1",
    title: "Social Proof Variation 1",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07b",
    label: "SOCIAL PROOF VARIATION 2",
    title: "Social Proof Variation 2",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07c",
    label: "SOCIAL PROOF VARIATION 3",
    title: "Social Proof Variation 3",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07d",
    label: "SOCIAL PROOF VARIATION 4",
    title: "Social Proof Variation 4",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07e",
    label: "SOCIAL PROOF VARIATION 5",
    title: "Social Proof Variation 5",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "social",
    number: "07f",
    label: "SOCIAL PROOF VARIATION 6",
    title: "Social Proof Variation 6",
    description:
      "Who else has this worked for? — Testimonials, ratings, authority by association.",
    labelClass: labelClasses.social,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08a",
    label: "RISK REVERSAL VARIATION 1",
    title: "Risk Reversal Variation 1",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08b",
    label: "RISK REVERSAL VARIATION 2",
    title: "Risk Reversal Variation 2",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08c",
    label: "RISK REVERSAL VARIATION 3",
    title: "Risk Reversal Variation 3",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08d",
    label: "RISK REVERSAL VARIATION 4",
    title: "Risk Reversal Variation 4",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08e",
    label: "RISK REVERSAL VARIATION 5",
    title: "Risk Reversal Variation 5",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "risk",
    number: "08f",
    label: "RISK REVERSAL VARIATION 6",
    title: "Risk Reversal Variation 6",
    description:
      "What if it doesn't work? — Guarantee, payment plan, trial.",
    labelClass: labelClasses.risk,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09a",
    label: "AUTHORITY VARIATION 1",
    title: "Authority Variation 1",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09b",
    label: "AUTHORITY VARIATION 2",
    title: "Authority Variation 2",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09c",
    label: "AUTHORITY VARIATION 3",
    title: "Authority Variation 3",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09d",
    label: "AUTHORITY VARIATION 4",
    title: "Authority Variation 4",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09e",
    label: "AUTHORITY VARIATION 5",
    title: "Authority Variation 5",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "authority",
    number: "09f",
    label: "AUTHORITY VARIATION 6",
    title: "Authority Variation 6",
    description:
      "Why should I believe you? — Credential highlights, epiphany moment, transformation result.",
    labelClass: labelClasses.authority,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10a",
    label: "URGENCY VARIATION 1",
    title: "Urgency Variation 1",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10b",
    label: "URGENCY VARIATION 2",
    title: "Urgency Variation 2",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10c",
    label: "URGENCY VARIATION 3",
    title: "Urgency Variation 3",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10d",
    label: "URGENCY VARIATION 4",
    title: "Urgency Variation 4",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10e",
    label: "URGENCY VARIATION 5",
    title: "Urgency Variation 5",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "urgency",
    number: "10f",
    label: "URGENCY VARIATION 6",
    title: "Urgency Variation 6",
    description:
      "Why act today? — Price scarcity, countdown timer, FOMO.",
    labelClass: labelClasses.urgency,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "faq",
    number: "11",
    label: "FAQ",
    title: "FAQ",
    description:
      "4–7 objection handlers: Who's this for? What exactly do I get? What about support? What's the guarantee?",
    labelClass: labelClasses.faq,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "footer",
    number: "12",
    label: "FOOTER",
    title: "Footer",
    description:
      "Logo + Privacy / Terms / Disclaimer / Contact. Minimal, intentional whitespace.",
    labelClass: labelClasses.footer,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
  },
  {
    id: "nav",
    number: "—",
    label: "NAVIGATION (UTILITY)",
    title: "Navigation Bar",
    description:
      "Optional utility component — not part of the 10P sequence. Use only when a sales page needs a full nav bar.",
    labelClass: labelClasses.nav,
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
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
  { id: "empathy", label: "💗 Empathy" },
  { id: "opportunity", label: "🔓 Opportunity" },
  { id: "compare", label: "⚖️ Before/After" },
  { id: "usp", label: "✨ USP" },
  { id: "offer", label: "🎁 Offer" },
  { id: "social", label: "💬 Social Proof" },
  { id: "risk", label: "🛡️ Risk Reversal" },
  { id: "authority", label: "👑 Authority" },
  { id: "urgency", label: "⏰ Urgency" },
  { id: "faq", label: "❓ FAQ" },
  { id: "footer", label: "📄 Footer" },
  { id: "nav", label: "🔗 Nav" },
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

function SectionPromptTabs({ base, vars }: { base: string; vars: string }) {
  const [active, setActive] = useState<"base" | "vars">("base");
  const text = active === "base" ? base : vars;
  return (
    <>
      <div
        role="tablist"
        aria-label="Prompt type"
        className="inline-flex rounded-lg border border-[#2A2250] bg-[#0B091A] p-1 mb-3 self-start"
      >
        <button
          type="button"
          role="tab"
          aria-selected={active === "base"}
          onClick={() => setActive("base")}
          className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-md transition ${
            active === "base"
              ? "bg-[#7C5CFC] text-white"
              : "text-[#A09AB8] hover:text-white"
          }`}
        >
          Base Prompt
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={active === "vars"}
          onClick={() => setActive("vars")}
          className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-md transition ${
            active === "vars"
              ? "bg-[#F5C842] text-[#0D0B1F]"
              : "text-[#A09AB8] hover:text-white"
          }`}
        >
          Client Variables
        </button>
      </div>
      <PromptBlock key={active} text={text} />
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
              key={`${s.id}-${s.number}`}
              className="flex flex-col overflow-hidden rounded-[14px] border border-[#2A2250] bg-[#161330] transition-all hover:border-[#4A3A8A] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              {s.preview && (
                <div className="border-b border-[#2A2250] bg-[#0B091A] p-[18px_20px]">
                  <div className="[&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&_svg]:rounded-md">
                    {s.preview}
                  </div>
                </div>
              )}
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
                <SectionPromptTabs base={s.basePrompt} vars={s.varsPrompt} />
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
