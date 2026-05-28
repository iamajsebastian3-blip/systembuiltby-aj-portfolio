"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
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
  | "footer";
type TabId = SectionId | "builder";

type Section = {
  id: SectionId;
  number: string;
  label: string;
  title: string;
  description: string;
  labelClass: string;
  preview?: ReactNode;
  previewSrc?: string;
  funnelTypes?: string[];
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
};

const sections: Section[] = [
  {
    id: "hero",
    number: "01a",
    label: "HERO",
    title: "Hero Variation 1",
    description:
      "Tony Robbins-inspired full-width centered hero. BG image + headline + CTA + video block. Built as a GHL custom code block.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v1-thumb.webp",
    funnelTypes: ["VSL", "Webinar", "Lead Funnel"],
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
    label: "HERO",
    title: "Hero Variation 2",
    description:
      "Full-bleed event/stage background with pre-headline + bold headline + CTA + featured-in logo strip. No video block — clean and content-forward.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v2-thumb.webp",
    funnelTypes: ["VSL", "Webinar", "Personal Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a reusable hero section component for use inside GoHighLevel (GHL) as a custom code block. This variation is inspired by event/keynote-style personal brand pages (Tony Robbins, Brendon Burchard, Grant Cardone) — clean and copy-focused, no video block.

=== OUTPUT ===
Single file: 02-hero.html
All CSS in <style> tags
All JS in <script> tags
Google Fonts only — no other dependencies
GHL-ready standalone custom code block

=== LAYOUT ===
Full-width centered layout (NOT split). Full-bleed BG image extends behind everything.
Vertical order inside hero (top → bottom, all centered):
  1. Nav (sticky, transparent)
  2. Pre-headline (small)
  3. Main headline (large, 2 lines)
  4. CTA button
  5. "Featured In" logo strip (bottom of hero)

=== NAVIGATION ===
- Logo text left (or swap to <img>)
- Nav links center: About | Mission | Events | Programs | Coaching | Shop | Blog
- Search icon right
- Sticky, transparent → dark blur on scroll
- Height: var(--nav-height) (70px)
- Mobile: hamburger menu

=== HERO CONTENT ===
1. Pre-headline
   - Small uppercase or sentence-case, centered
   - White or muted color
   - 1 line max
2. Main Headline
   - Large bold, centered, 2 lines
   - Pure white
3. CTA Button
   - Background: var(--accent) (teal/cyan)
   - Dark bold uppercase text
   - Rounded pill shape
   - Hover: scale up + glow
4. Featured In Strip (bottom of hero)
   - Small muted label above logos: "[Name] Has Been Featured In:"
   - Row of 4 monochrome media logos (white/muted), evenly spaced
   - Logos passed via JS array — easy client swap

=== BACKGROUND ===
- Full-width BG_IMAGE behind everything
- Dark gradient overlay: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.75) 100%)
- Optional teal radial glow from center

=== ANIMATIONS ===
- Pre-headline + headline: fade in + slide up (staggered)
- CTA button: fade in delayed
- Featured-in strip: fade in last
- Background: subtle slow zoom (Ken Burns)

=== MOBILE RESPONSIVE ===
- Breakpoint: 768px
- Nav collapses to hamburger
- Text scales down (headline ~32px on mobile)
- Featured-in logos wrap to 2x2 grid on mobile

=== OUTPUT RULES ===
- All colors, fonts, copy, asset paths, and nav links driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered steps for the client
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 2 (Event/Keynote-style, no video block) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH
   ============================================
   STEP 1: Replace background image URL
   STEP 2: Replace featured-in logo files (or use styled text)
   STEP 3: Update all copy below
   STEP 4: Replace logo text or image
   STEP 5: Update nav links
   ============================================ */

— COLORS (CSS custom properties at top of <style>) —
--bg:           #0A0A0F
--accent:       #00E5CC
--text:         #FFFFFF
--muted:        #A0A0B0
--nav-height:   70px

— JS CONSTS (top of <script>) —
const LOGO            = "TONY ROBBINS";
const BG_IMAGE        = "/private/hero-v2-thumb.webp";   ← swap for client image
const FEATURED_IN     = [
  { name: "Success", logo: "______" },
  { name: "Inc.",    logo: "______" },
  { name: "Forbes",  logo: "______" },
  { name: "Fortune", logo: "______" },
];

— COPY —
Pre-headline:        Unlock The Power Within And Achieve Your Dreams
Headline Line 1:     Proven Techniques For Personal
Headline Line 2:     And Professional Growth
CTA Button Text:     GET STARTED
CTA Button URL:      ______
Featured-In Label:   TONY HAS BEEN FEATURED IN:

— NAVIGATION LINKS —
About | Mission | Events | Programs | Coaching | Shop | Blog
(Edit array at top of <script>)`,
  },
  {
    id: "hero",
    number: "01c",
    label: "HERO",
    title: "Hero Variation 3",
    description:
      "Split layout: big hero photo + dual CTA on the left, 2×2 program card grid on the right. Built for multi-offer pages.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v3-thumb.webp",
    funnelTypes: ["Course Hub", "Coaching", "Multi-Offer"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium funnel hero section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-split-cards.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Dark Background
- var(--bg) color fills entire section
- Subtle dark teal radial glow (center right)

LAYER 2 — Sticky Nav (var(--nav-height))
- LOGO left
- NAV_LINKS center
- Search icon right
- Transparent → dark blur on scroll
- Mobile: hamburger menu

LAYER 3 — Main Hero (2 column)

LEFT COLUMN (55% width):
- BG_IMAGE — large photo, rounded corners
- Dark gradient overlay bottom-left
- EYEBROW — small muted uppercase (bottom left)
- HEADLINE — large bold white (bottom left, 3 lines)
- Two buttons side by side:
  Button 1: var(--accent) bg — CTA_TEXT
  Button 2: transparent — "▶ Watch Video"
            (opens VIDEO_URL on click)

RIGHT COLUMN (45% width):
- 2x2 grid of CARDS
- Each card:
  - Background photo (card.image)
  - Dark gradient overlay bottom
  - category label — small, var(--accent), top left
  - title — bold white, bottom left
  - Hover: scale up slightly + brighter overlay
  - On click: go to card.url

=== ANIMATIONS ===
- Nav: fade in on load
- Left photo: fade in + slight scale (0.3s)
- Eyebrow: fade up (0.4s)
- Headlines: staggered fade up (0.5s, 0.6s, 0.7s)
- Buttons: fade up (0.8s)
- Cards: staggered fade in (0.4s each)
- Card hover: smooth scale transition

=== MOBILE (768px) ===
- Nav → hamburger
- Layout stacks: left column on top
- Cards grid: 2x2 stays but smaller
- Below 480px: cards go 1 column
- Text scales down gracefully

=== OUTPUT RULES ===
- All colors, fonts, copy, asset paths, nav links, and CARDS driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 3 (Split + 2x2 Cards) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. BG_IMAGE        → main hero background URL
   2. CARD images     → 4 program card photo URLs
   3. LOGO_TEXT       → client name or brand
   4. LOGO_IMG        → logo image URL
   5. Update COLORS   → match client brand kit
   6. Update all COPY
   7. Update CARD content (label, title, url)
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:           #050A0F
--accent:       #00E5CC
--text:         #FFFFFF
--muted:        #A0B0C0
--card-overlay: rgba(0, 0, 0, 0.4)
--nav-height:   65px

— ASSETS —
const BG_IMAGE   = "/private/hero-v3-thumb.webp";   ← swap for client image
const LOGO_TEXT  = "______";                        ← client brand name
const LOGO_IMG   = "______";                        ← optional logo image
const VIDEO_URL  = "______";                        ← YouTube / Vimeo / Wistia URL

— COPY —
const EYEBROW    = "______";                        ← short eyebrow line
const HEADLINE_1 = "______";                        ← first line of headline
const HEADLINE_2 = "______";                        ← second line of headline
const HEADLINE_3 = "______";                        ← third line of headline
const CTA_TEXT   = "______";                        ← primary CTA button text

— NAVIGATION LINKS —
const NAV_LINKS = [
  { label: "About",     url: "#about"    },
  { label: "Mission",   url: "#mission"  },
  { label: "Events",    url: "#events"   },
  { label: "Programs",  url: "#programs" },
  { label: "Coaching",  url: "#coaching" },
  { label: "Shop",      url: "#shop"     },
  { label: "Blog",      url: "#blog"     }
];

— PROGRAM CARDS (2x2 grid, right side) —
const CARDS = [
  {
    image:    "______",
    category: "______",   ← e.g. "Mindset"
    title:    "______",   ← short program title
    url:      "#program-1"
  },
  {
    image:    "______",
    category: "______",
    title:    "______",
    url:      "#program-2"
  },
  {
    image:    "______",
    category: "______",
    title:    "______",
    url:      "#program-3"
  },
  {
    image:    "______",
    category: "______",
    title:    "______",
    url:      "#program-4"
  }
];`,
  },
  {
    id: "hero",
    number: "01d",
    label: "HERO",
    title: "Hero Variation 4",
    description:
      "Fullscreen split-photo hero: left half + right half BG, massive 3-line headline centered, minimal nav, 3-column footer bar (scroll arrow · featured-in · testimonial quote).",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v4-thumb.webp",
    funnelTypes: ["Personal Brand", "Speaker", "Premium Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium fullscreen hero section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-fullscreen.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background (split image)
- Left 50%: BG_LEFT photo
- Right 50%: BG_RIGHT photo
- Both images fill their half seamlessly
- Left overlay: var(--overlay-left)
- Right overlay: var(--overlay-right)
- Subtle dark vignette on all edges

LAYER 2 — Minimal Navigation
- LOGO top left (text or img)
- Hamburger menu icon top right only
- Transparent background
- No sticky behavior — stays transparent

LAYER 3 — Headline (centered over both images)
- PRE_WORD — small italic script font, positioned before HEADLINE_2, slightly left
- HEADLINE_1 — massive bold white, line 1
- HEADLINE_2 — massive bold white, line 2
- HEADLINE_3 — massive bold white, line 3
- Headlines centered, large enough to span almost full width
- Font: Mix of serif weight and bold sans

LAYER 4 — Bottom Bar (full width, absolute bottom)
Three columns side by side:

LEFT:
- Circular bordered button with ↓ arrow
- var(--accent) border and arrow color
- On click: smooth scroll to next section

CENTER:
- FEATURED_LABEL — tiny uppercase muted text
- FEATURED_LOGOS — grayscale inline logos row

RIGHT:
- Italic quote: "QUOTE_TEXT"
- QUOTE_NAME — bold white
- QUOTE_TITLE — small muted

=== ANIMATIONS ===
- BG images: subtle slow zoom opposite directions (left zooms in, right zooms out — Ken Burns)
- PRE_WORD: fade in (0.3s)
- Headlines: staggered fade up (0.4s, 0.5s, 0.6s)
- Bottom bar: fade up all at once (0.8s)
- Down arrow: gentle bounce loop

=== MOBILE (768px) ===
- BG: single stacked image (BG_LEFT on top)
- Nav: hamburger stays
- Headlines scale down, stay centered
- Bottom bar stacks vertically: Arrow → Featured → Quote
- Quote hides on very small screens (480px)

=== OUTPUT RULES ===
- All colors, fonts, copy, asset paths, featured-in logos, and quote driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 4 (Fullscreen Split-Photo) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. BG_LEFT       → left background photo URL
   2. BG_RIGHT      → right background photo URL
   3. LOGO_TEXT     → client name or brand
   4. LOGO_IMG      → logo image URL (optional)
   5. Update COLORS → match client brand kit
   6. Update all COPY
   7. Update FEATURED logos
   8. Update QUOTE block
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:            #050A0F
--accent:        #00E5CC
--text:          #FFFFFF
--muted:         #A0B0C0
--overlay-left:  rgba(0, 0, 0, 0.35)
--overlay-right: rgba(0, 0, 0, 0.50)
--nav-height:    70px

— ASSETS —
const BG_LEFT    = "/private/hero-v4-bg-left.webp";    ← swap for client image
const BG_RIGHT   = "/private/hero-v4-bg-right.webp";   ← swap for client image
const LOGO_TEXT  = "______";                           ← client brand name
const LOGO_IMG   = "______";                           ← optional logo image

— HEADLINE COPY —
const PRE_WORD   = "______";   ← small italic script word (e.g. "the")
const HEADLINE_1 = "______";   ← line 1
const HEADLINE_2 = "______";   ← line 2
const HEADLINE_3 = "______";   ← line 3

— FEATURED IN —
const FEATURED_LABEL = "______ Has Been Featured In:";
const FEATURED_LOGOS = [
  { name: "SUCCESS", url: "______" },
  { name: "Inc.",    url: "______" },
  { name: "Forbes",  url: "______" },
  { name: "Fortune", url: "______" }
];

— QUOTE BLOCK —
const QUOTE_TEXT   = "______";   ← testimonial quote
const QUOTE_NAME   = "______";   ← person's name
const QUOTE_TITLE  = "______";   ← person's title / role`,
  },
  {
    id: "hero",
    number: "01e",
    label: "HERO",
    title: "Hero Variation 5",
    description:
      "Person-as-background fullscreen hero: full-bleed portrait + left-side overlay + bottom-left copy block (eyebrow + 3-line headline + subheadline + dual CTAs). Premium gold accent.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v5-thumb.webp",
    funnelTypes: ["Luxury Coaching", "Personal Brand", "Authority"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium fullscreen hero section with person-as-background layout. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-person-bg.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- PERSON_IMG fills hero section
- background-size: auto 100% (fits to height, preserves face — do NOT use cover which crops vertically)
- background-position: right center (anchors person to right edge)
- background-color: var(--bg) fills any leftover space on the left
- Left gradient overlay heavy: dark 95% at far left → 35% at midpoint → fades to var(--overlay-right) (subtle) on the right where the person is visible
- Dark vignette on all edges via radial gradient
- Mobile: switch to background-size cover + background-position center top (face visible at top, content stacks below)

LAYER 2 — Navigation (var(--nav-height))
- LOGO_IMG + LOGO_TEXT — top left
- NAV_LINKS — center
- SOCIAL_LINKS icons — top right (circle bordered icons, small)
- Transparent background always
- Mobile: hamburger replaces nav + social

LAYER 3 — Hero Content (bottom left)
Positioned bottom-left, above bottom padding

- EYEBROW
  Small uppercase, var(--accent) color
  Letter-spaced, bold

- HEADLINE (3 lines)
  Large bold white
  Tight line height
  Max width: 55% of screen

- SUBHEADLINE
  Small muted text
  Max width: 45% of screen
  Light weight

- TWO BUTTONS (side by side)
  Button 1 (Primary):
  - var(--accent) background
  - Dark bold text
  - Rounded pill shape
  - CTA_PRIMARY text
  - Hover: var(--accent-hover) + scale

  Button 2 (Secondary):
  - Transparent background
  - White border
  - White text
  - CTA_SECOND text
  - Hover: white bg + dark text

=== MOBILE LAYOUT ===
- Person photo stays as bg (top portion visible)
- Dark gradient heavier on bottom half
- Content moves to bottom center (not left)
- Text becomes center-aligned
- Buttons stack vertically, full width
- Nav → hamburger menu
- Social icons hidden on mobile

=== ANIMATIONS ===
- Background photo: very subtle slow zoom (Ken Burns)
- Eyebrow: fade in (0.3s)
- Headlines: staggered fade up (0.4s, 0.5s, 0.6s)
- Subheadline: fade up (0.7s)
- Buttons: fade up side by side (0.8s)
- Nav items: fade in from top (0.2s)

=== OUTPUT RULES ===
- All colors, fonts, copy, assets, nav, and social links driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 5 (Person-as-Background) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. PERSON_IMG    → person/avatar photo URL
   2. LOGO_IMG      → logo image URL
   3. LOGO_TEXT     → brand name text
   4. Update COLORS → match client brand kit
   5. Update NAV_LINKS
   6. Update SOCIAL_LINKS
   7. Update all COPY
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:             #0D0D0D
--accent:         #C9922A
--accent-hover:   #E0A830
--text:           #FFFFFF
--muted:          #B0B0B0
--overlay-left:   rgba(0, 0, 0, 0.75)
--overlay-right:  rgba(0, 0, 0, 0.15)
--nav-height:     65px

— ASSETS —
const PERSON_IMG  = "/private/hero-v5-person.webp";   ← swap for client photo
const LOGO_IMG    = "______";                         ← logo image URL (optional)
const LOGO_TEXT   = "______";                         ← brand name

— COPY —
const EYEBROW     = "______";   ← short eyebrow text
const HEADLINE_1  = "______";   ← first line of headline
const HEADLINE_2  = "______";   ← second line of headline
const HEADLINE_3  = "______";   ← third line of headline
const SUBHEADLINE = "______";   ← short supporting description
const CTA_PRIMARY = "______";   ← primary button text
const CTA_SECOND  = "______";   ← secondary button text

— NAVIGATION LINKS —
const NAV_LINKS = [
  { label: "About",     url: "#about"     },
  { label: "Programs",  url: "#programs"  },
  { label: "Results",   url: "#results"   },
  { label: "Resources", url: "#resources" },
  { label: "Contact",   url: "#contact"   }
];

— SOCIAL ICONS —
const SOCIAL_LINKS = [
  { icon: "facebook",  url: "______" },
  { icon: "linkedin",  url: "______" },
  { icon: "youtube",   url: "______" },
  { icon: "twitter",   url: "______" }
];`,
  },
  {
    id: "hero",
    number: "01f",
    label: "HERO",
    title: "Hero Variation 6",
    description:
      "Executive split-layout: dark texture BG + text-left (eyebrow + 3-line headline + dual CTA) + person-right (no overlay) + featured-in serif logo bar at bottom.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v6-thumb.webp",
    funnelTypes: ["Executive Brand", "Consulting", "High-Ticket"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium personal brand hero section with split text-left person-right layout. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-executive.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- BG_IMAGE fills entire section
- var(--overlay) dark layer on top
- Extra dark gradient left side for text readability
- Person photo has NO background overlay (sits cleanly on right side)

LAYER 2 — Navigation (var(--nav-height))
- LOGO_IMG + LOGO_TEXT — top left
- NAV_LINKS — top right
- No social icons
- Transparent, no scroll behavior
- Mobile: hamburger menu

LAYER 3 — Hero Split Layout

CONTAINER:
- Wrap the grid in a centered container: max-width 1600px, margin 0 auto, padding 0 64px 140px
- Grid: display grid, grid-template-columns: minmax(0, 640px) auto, align-items: end, justify-content: center, gap: 80px
- This keeps the text + person photo close together as a unit, no wasted dead space

LEFT COLUMN (anchored to grid):
- max-width: 640px, padding-bottom: 50px (aligns with image bottom)
- EYEBROW — small uppercase, var(--accent), 13px, letter-spacing 0.32em
- HEADLINE (3 lines) — bold white, font-size clamp(44px, 6.4vw, 84px), line-height 1.02. The middle line uses var(--accent) for the highlight word
- SUBHEADLINE — muted, font-size clamp(15px, 1.2vw, 18px), light weight, line-height 1.65, max-width 480px
- TWO BUTTONS (side by side, gap 22px)
  Button 1 (Primary):
  - var(--accent) background, white bold text
  - Rounded pill shape, padding 16px 30px
  - Box-shadow drop with accent color tint
  - Hover: brighter + scale up
  Button 2 (Watch):
  - Transparent background, no border
  - Small play circle icon left (outlined 36px circle + filled triangle)
  - White text: CTA_WATCH, uppercase, letter-spaced
  - Hover: slight opacity change
  - On click: open VIDEO_URL in lightbox

RIGHT COLUMN (sized to image, not fixed 50%):
- PERSON_IMG width: clamp(380px, 42vw, 620px), max-height calc(100vh - 180px)
- object-fit: contain, object-position: center bottom
- No overlay, no border
- Slight fade at very bottom only (80px gradient)

LAYER 4 — Featured In Bar (bottom)
- Full width dark bar
- Semi-transparent dark background
- FEATURED_LABEL — tiny muted uppercase center
- FEATURED_NAMES — large serif font, inline row, white, spaced evenly
- Mix of font weights for visual variety

=== ANIMATIONS ===
- Background: static (no zoom — executive feel)
- Nav: fade in (0.2s)
- Eyebrow: fade up (0.3s)
- Headlines: staggered fade up (0.4s, 0.5s, 0.6s)
- Subheadline: fade up (0.7s)
- Buttons: fade up (0.8s)
- Person photo: fade in + slight slide right (0.5s)
- Featured bar: fade up (1.0s)

=== MOBILE (768px) ===
- Layout stacks: text on top, person below
- Person photo: centered, max-height 400px
- Text becomes center-aligned
- Buttons stack vertically, full width
- Featured names wrap to 2 rows
- Nav: hamburger menu

=== OUTPUT RULES ===
- All colors, fonts, copy, assets, nav, and featured names driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 6 (Executive Split) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. BG_IMAGE      → dark background texture URL
   2. PERSON_IMG    → person/avatar photo URL
   3. LOGO_IMG      → logo image URL
   4. LOGO_TEXT     → brand name text
   5. Update COLORS → match client brand kit
   6. Update NAV_LINKS
   7. Update all COPY
   8. Update FEATURED logos
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:             #0A0A0A
--accent:         #3B9EE8
--text:           #FFFFFF
--muted:          #9A9A9A
--overlay:        rgba(0, 0, 0, 0.65)
--nav-height:     65px

— ASSETS —
const BG_IMAGE    = "/private/hero-v6-bg.webp";       ← swap for client background
const PERSON_IMG  = "/private/hero-v6-person.webp";   ← swap for client person photo
const LOGO_IMG    = "______";                         ← logo image URL (optional)
const LOGO_TEXT   = "______";                         ← brand name
const VIDEO_URL   = "______";                         ← YouTube / Vimeo / Wistia URL

— COPY —
const EYEBROW     = "______";   ← short eyebrow text
const HEADLINE_1  = "______";   ← first line of headline
const HEADLINE_2  = "______";   ← second line of headline
const HEADLINE_3  = "______";   ← third line of headline
const SUBHEADLINE = "______";   ← short supporting description
const CTA_PRIMARY = "______";   ← primary CTA button text
const CTA_WATCH   = "Watch";

— NAVIGATION LINKS —
const NAV_LINKS = [
  { label: "About",     url: "#about"     },
  { label: "Programs",  url: "#programs"  },
  { label: "Results",   url: "#results"   },
  { label: "Resources", url: "#resources" },
  { label: "Contact",   url: "#contact"   }
];

— FEATURED IN —
const FEATURED_LABEL = "______ Has Been Featured In:";
const FEATURED_NAMES = [
  "Forbes",
  "Entrepreneur",
  "TIME",
  "Inc.",
  "SUCCESS",
  "Fortune"
];`,
  },
  {
    id: "hero",
    number: "01g",
    label: "HERO",
    title: "Hero Variation 7",
    description:
      "Masterclass funnel hero: dark BG + minimal logo nav + 4-line headline + full-width gold CTA + inline testimonial block (avatar + quote) + person photo right + featured-in mixed-weight logo bar.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v7-thumb.webp",
    funnelTypes: ["Masterclass", "Webinar Registration", "Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium masterclass funnel hero section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-masterclass.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- BG_IMAGE fills entire section
- var(--overlay) dark layer on top
- Extra dark gradient left side
- Heavy dark vignette on all edges

LAYER 2 — Minimal Navigation
- LOGO_TEXT top left only
- No nav links, no hamburger
- Transparent, static

LAYER 3 — Hero Split Layout

CONTAINER:
- Wrap the grid in a centered container: max-width 1600px, margin 0 auto, padding 40px 64px 140px
- Grid: display grid, grid-template-columns: minmax(0, 680px) auto, align-items: end, justify-content: center, gap: 80px
- Keeps text + person close together as a unit, no wasted dead space

LEFT COLUMN (anchored to grid):
- max-width: 680px, padding-bottom: 40px
- EYEBROW — uppercase, var(--accent), 13px, letter-spacing 0.34em, no border
- HEADLINE (4 lines) — font-family Inter, font-weight 800, font-size clamp(42px, 5.6vw, 72px), line-height 1.04, letter-spacing -0.01em. Line 3 uses var(--accent) + italic for the highlight phrase
- CTA BUTTON
  - Full width of text column (width: 100%)
  - var(--accent) background, dark bold uppercase text
  - Rounded corners (border-radius 12px, not pill)
  - Padding 24px 32px, font-size 15px, letter-spacing 0.16em
  - Box-shadow drop with accent tint + subtle pulse animation loop
  - Hover: var(--accent-hover) + scale up + brighter shadow
- TESTIMONIAL BLOCK (margin-top 32px)
  - Side by side: avatar + text, gap 16px
  - Avatar: circle 58px, subtle white border at 12% opacity
  - Quote: italic, 15px, white at 92% opacity
  - Name: 13.5px, bold white
  - Title: 12px, muted
  - No left border

RIGHT COLUMN (sized to image, not fixed 45%):
- PERSON_IMG width: clamp(360px, 40vw, 580px), max-height calc(100vh - 200px)
- object-fit: contain, object-position: center bottom
- Slight fade at very bottom (80px gradient)
- No overlay

LAYER 4 — Featured In Bar (very bottom)
- Full width, dark semi-transparent bg
- FEATURED_LABEL — tiny muted center
- FEATURED_NAMES — mixed font weights, inline row, white/muted, spaced, grayscale opacity look

=== ANIMATIONS ===
- Background: subtle slow zoom (Ken Burns)
- Eyebrow: fade up (0.2s)
- Headlines: staggered fade up (0.3s, 0.4s, 0.5s, 0.6s)
- CTA: fade up + slight pulse (0.7s)
- Testimonial: fade up (0.8s)
- Person: fade in + slide right (0.5s)
- Featured bar: fade up (1.0s)

=== MOBILE (768px) ===
- Person photo: top half background
- Heavy dark gradient bottom half
- All text: centered, bottom half
- CTA: full width
- Testimonial: centered
- Featured: wrap 3 per row
- Nav: logo only, centered

=== IMAGE PLACEHOLDER RULES ===
- Every image URL in CLIENT VARIABLES must be pre-filled with a relevant Unsplash URL so the design renders immediately
- Logo and featured-in items use CSS text with mixed font weights — no image files

=== OUTPUT RULES ===
- All colors, fonts, copy, assets, testimonial, and featured names driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 7 (Masterclass) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. BG_IMAGE       → dark arena background URL
   2. PERSON_IMG     → person/avatar photo URL
   3. LOGO_TEXT      → client name or brand
   4. Update COLORS  → match client brand kit
   5. Update all COPY
   6. Update TESTIMONIAL
   7. Update FEATURED logos
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:             #050505
--accent:         #C8A84B
--accent-hover:   #E0BF6A
--text:           #FFFFFF
--muted:          #9A9A9A
--overlay:        rgba(0, 0, 0, 0.70)
--nav-height:     60px

— ASSETS (Unsplash URLs pre-filled — swap for client photos when ready) —
const BG_IMAGE          = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80";
const PERSON_IMG        = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80";
const TESTIMONIAL_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80";

— COPY —
const LOGO_TEXT   = "______";   ← client brand name
const EYEBROW     = "FREE LIVE MASTERCLASS";
const HEADLINE_1  = "______";   ← line 1
const HEADLINE_2  = "______";   ← line 2
const HEADLINE_3  = "______";   ← line 3
const HEADLINE_4  = "______";   ← line 4
const CTA_TEXT    = "YES, RESERVE MY SPOT NOW";

— TESTIMONIAL —
const TEST_QUOTE  = "______";   ← short powerful quote about client
const TEST_NAME   = "______";   ← testimonial person name
const TEST_TITLE  = "______";   ← person title / authority

— FEATURED IN —
const FEATURED_LABEL = "Also Featured In:";
const FEATURED_NAMES = [
  { name: "Forbes",       weight: "800" },
  { name: "MSNBC",        weight: "400" },
  { name: "CBS",          weight: "700" },
  { name: "amazon",       weight: "400" },
  { name: "USA TODAY",    weight: "700" },
  { name: "FOX",          weight: "800" },
  { name: "TEDx",         weight: "400" },
  { name: "YPO",          weight: "700" },
  { name: "Entrepreneur", weight: "400" }
];`,
  },
  {
    id: "hero",
    number: "01h",
    label: "HERO",
    title: "Hero Variation 8",
    description:
      "Dark business coach split: stacked 2-line logo + nav + bold 2-line headline + electric-blue CTA + testimonial (no avatar) + bottom-anchored person right + featured-in dark bar.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v8-thumb.webp",
    funnelTypes: ["Business Coaching", "1-on-1", "High-Ticket"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium dark business-coach hero section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- BG_IMAGE fills entire section (dark stage / crowd photo)
- Dark overlay var(--overlay) on top
- Extra dark gradient on left side for text readability
- Subtle Ken Burns slow zoom

LAYER 2 — Navigation
- Stacked 2-line logo top-left: LOGO_LINE1 + LOGO_LINE2, both bold + large
- NAV_LINKS top-right: small uppercase, letter-spaced, white-on-hover-blue
- No CTA button in nav
- Transparent, no scroll behavior

LAYER 3 — Hero Split

CONTAINER:
- Wrap grid in centered container: max-width 1600px, padding 0 64px 140px, margin 0 auto
- Grid: grid-template-columns: minmax(0, 640px) auto, align-items: end, justify-content: center, gap: 80px

LEFT COLUMN (anchored to grid):
- max-width 640px, padding-bottom 50px
- HEADLINE (2 lines) — very large bold white, clamp(46px, 6.6vw, 88px), line-height 1.02
- SUBHEAD (2 lines) — medium muted, clamp(15px, 1.2vw, 18px), line-height 1.55, max-width 480px
- CTA BUTTON — electric blue var(--accent) pill, white bold uppercase, padding 18px 36px, font-size 14px, letter-spacing 0.16em. Hover: glow + scale up + var(--accent-hover)
- TESTIMONIAL BLOCK (margin-top 32px) — no avatar, no border
  Italic quote in muted, font-size 14.5px, line-height 1.5
  NAME bold white below (13.5px)
  TITLE small muted below name (12px)

RIGHT COLUMN (sized to image):
- PERSON_IMG width clamp(380px, 42vw, 620px), bottom-anchored, max-height calc(100vh - 200px)
- object-fit: contain, object-position: center bottom
- Slight fade at very bottom (80px gradient)

LAYER 4 — Featured In Bar (bottom, full width)
- Dark charcoal bg (#111) or rgba(0,0,0,0.7) with backdrop blur
- FEATURED_LABEL tiny uppercase muted center, letter-spacing 0.26em
- FEATURED_NAMES inline row, mixed serif/sans weights, grayscale opacity hover-unfade

=== ANIMATIONS ===
- BG: subtle slow Ken Burns
- Headline: staggered fade up (0.3s, 0.4s)
- Subhead: fade up (0.5s)
- CTA: fade up + pulse glow (0.6s)
- Testimonial: fade up (0.8s)
- Person: fade in + slide right (0.5s)
- Featured: fade up (1.0s)

=== MOBILE (768px) ===
- Person becomes top half bg, dark gradient fades into bg color on bottom half
- Text + CTA + testimonial centered in bottom half
- Featured wrap 2 per row
- Nav: hamburger replaces nav links

=== OUTPUT RULES ===
- All colors, fonts, copy, assets, nav, and featured names driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 8 (Dark Business Coach) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH
   ============================================ */

— BRAND COLORS —
--bg:            #050505
--accent:        #2962FF
--accent-hover:  #1E4BD8
--text:          #FFFFFF
--muted:         #8A8A9A
--overlay:       rgba(0,0,0,0.65)
--nav-height:    70px

— ASSETS (local first, Unsplash fallback) —
const LOGO_LINE1 = "______";
const LOGO_LINE2 = "______";
const BG_IMAGE   = "/private/hero-v8-bg.webp";        ← AB/Background 3.png
const PERSON_IMG = "/private/hero-v8-person.webp";    ← AB/Man AI.png

— NAVIGATION LINKS —
const NAV_LINKS = [
  { label: "COURSES",      url: "#courses"      },
  { label: "COACHING",     url: "#coaching"     },
  { label: "DOWNLOAD",     url: "#download"     },
  { label: "TESTIMONIALS", url: "#testimonials" },
  { label: "CONTACT",      url: "#contact"      }
];

— COPY —
const HEADLINE_1 = "______";
const HEADLINE_2 = "______";
const SUBHEAD_1  = "______";
const SUBHEAD_2  = "______";
const CTA_TEXT   = "FREE STRATEGY SESSION";

— TESTIMONIAL —
const TEST_QUOTE = "______";
const TEST_NAME  = "______";
const TEST_TITLE = "______";

— FEATURED IN —
const FEATURED_LABEL = "______ Has Been Featured In:";
const FEATURED_NAMES = [
  { name: "Forbes",  style: "serif font-weight:700" },
  { name: "FORTUNE", style: "serif font-weight:400" },
  { name: "SUCCESS", style: "sans  font-weight:600" },
  { name: "Inc.",    style: "serif font-weight:800 italic" }
];`,
  },
  {
    id: "hero",
    number: "01i",
    label: "HERO",
    title: "Hero Variation 9",
    description:
      "Fitness brand neon energy: full-bleed person BG + magenta neon glow + 3-line headline with accent color + pink CTA + 4 student avatars + floating coach card bottom-right + infinite-scroll ticker at the very bottom.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v9-thumb.webp",
    funnelTypes: ["Fitness", "Course Launch", "Personal Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium fitness brand neon-energy hero section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 02-hero-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- BG_IMAGE fills entire section (dark gym / training environment)
- Dark overlay with pink/magenta tint on left for text readability
- Radial neon glow behind person on right (CSS only, var(--neon-glow))

LAYER 2 — Navigation
- LOGO_IMG + LOGO_TEXT left (or text-only logo with neon accent letter)
- NAV_LINKS right — small uppercase, hover pink
- Transparent always
- Mobile: hamburger menu

LAYER 3 — Hero Split

CONTAINER: max-width 1600px, padding 0 64px 140px, margin 0 auto, grid-template-columns: minmax(0, 640px) auto, align-items: end, gap: 80px

LEFT COLUMN:
- max-width 640px, padding-bottom 60px
- HEADLINE (3 lines) — large bold white, font-size clamp(44px, 6.2vw, 80px), line-height 1.02. The final phrase or last word in var(--accent) pink for emphasis
- SUBHEADLINE — muted, clamp(15px, 1.2vw, 18px), line-height 1.55, max-width 460px
- CTA BUTTON — var(--accent) pink background, white bold text + arrow, rounded pill, padding 18px 36px. Hover: neon glow box-shadow expand + scale
- STUDENT AVATARS ROW (margin-top 28px):
  4 small overlapping circular avatars (40px each, -8px overlap)
  CSS-generated colored circles as fallback (gradient backgrounds)
  + count label beside them ("Xk+ students enrolled")

RIGHT COLUMN — Person:
- PERSON_IMG full height, bottom-anchored
- Pink/magenta neon radial glow behind via CSS (positioned absolute, z-index below person)
- No overlay on person itself
- Width clamp(380px, 42vw, 620px)

LAYER 4 — Floating Coach Card (bottom-right, absolute)
- Position: right 60px, bottom 100px (above the ticker)
- Glass card: bg rgba(255,255,255,0.06), backdrop-filter blur, border 1px rgba(255,255,255,0.08), border-radius 14px, padding 14px 18px
- Inside: 44px circular coach avatar + name bold white + title small muted
- Subtle continuous float up/down animation (4s loop)

LAYER 5 — Ticker Bar (very bottom, full width)
- Full-width dark bar, height 50px, bg #0A0008 with top border accent pink at 30% opacity
- Scrolling marquee: "TICKER_TEXT · TICKER_TEXT · TICKER_TEXT" (repeat 5–8 times)
- Infinite loop left-to-right scroll (translateX animation 30s linear infinite)
- Text: var(--accent) pink, uppercase, bold, letter-spacing 0.2em, font-size 14px

=== ANIMATIONS ===
- Person: fade in (0.3s)
- Neon glow: pulse 2s loop (scale 1 → 1.05 → 1)
- Headlines: staggered fade up from left
- CTA: fade up + neon glow (0.6s)
- Avatars: fade up (0.7s)
- Float card: gentle float up/down loop (4s)
- Ticker: infinite scroll left (30s)

=== MOBILE (768px) ===
- Person stays as full bg (top portion visible)
- Heavy dark overlay on bottom half
- Content centered in bottom half (text + CTA + avatars)
- Float coach card: centered above ticker, smaller (compact)
- Ticker stays full width at the very bottom
- Nav: hamburger

=== OUTPUT RULES ===
- All colors, fonts, copy, assets, nav, and ticker text driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 9 (Fitness Brand Neon) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH
   ============================================ */

— BRAND COLORS —
--bg:            #0A0008
--accent:        #E8185A
--accent-2:      #FF2D6B
--text:          #FFFFFF
--muted:         #C0A0B0
--neon-glow:     rgba(232,24,90,0.4)
--nav-height:    65px

— ASSETS (local first, Unsplash fallback) —
const LOGO_IMG   = "______";
const LOGO_TEXT  = "______";
const PERSON_IMG = "/private/hero-v9-person.webp";   ← Unsplash fitness (no local match)
const BG_IMAGE   = "/private/hero-v9-bg.webp";       ← AB/Background 5.png

— NAVIGATION —
const NAV_LINKS = [
  { label: "Metodologia", url: "#method"   },
  { label: "Resultados",  url: "#results"  },
  { label: "Sobre",       url: "#about"    },
  { label: "Contato",     url: "#contact"  }
];

— COPY —
const HEADLINE_1  = "______";
const HEADLINE_2  = "______";
const HEADLINE_3  = "______";   ← key phrase / accent color
const SUBHEADLINE = "______";
const CTA_TEXT    = "Join the team →";

— STUDENT AVATARS —
const STUDENTS = {
  avatars: 4,
  label:   "______k+ students enrolled"
};

— FLOATING COACH CARD —
const FLOAT_CARD = {
  avatar: "/private/hero-v9-coach-avatar.webp",   ← AB/Woman AI.png (scaled)
  name:   "______",
  title:  "______"
};

— TICKER —
const TICKER_TEXT = "______";`,
  },
  {
    id: "empathy",
    number: "02a",
    label: "EMPATHY",
    title: "Empathy Variation 1",
    description:
      "3-column horizontal cards (clean corporate). Stakes · Connection · Way Out. Light bg, Inter, scroll-triggered staggered fade-up.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v1-thumb.webp",
    funnelTypes: ["Corporate","B2B","SaaS"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation (Section 02 of the 10P Sales Page Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Do you actually understand me?" via three structured cards:
  - Stakes: what happens if nothing changes
  - Connection: "I've been there" moment
  - Way Out: relief and solution teaser

=== OUTPUT ===
File: 03-empathy-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Light section bg (white) with subtle gray pattern
- Container: max-width 1140px centered, padding 96px 24px
- Header (centered): small uppercase label · H2 · sub
- 3 equal cards in a row (grid-template-columns: repeat(3, 1fr), gap 24px)
- Each card: padding 32px, border 1px var(--border), border-radius 16px, bg white
- Card content: 44px rounded icon block (12px radius) at top + title + body paragraph
- Card 1 — Stakes: red accent icon block
- Card 2 — Connection: blue accent icon block
- Card 3 — Way Out: green accent icon block

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up + translate-y 16px → 0
- Staggered 0.15s per card
- Triggers when section enters viewport
- prefers-reduced-motion: animations skipped, content visible

=== MOBILE (≤768px) ===
- Cards stack to single column
- Padding reduces to 48px 18px
- Font sizes scale down gracefully

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V1 (3-Column Clean Corporate) base component.

— BRAND COLORS —
--bg:        #FFFFFF
--bg-alt:    #F7F8FA
--accent:    #2563EB
--text:      #0E1116
--muted:     #4A5160
--card-bg:   #F0F4FF
--border:    #E4E7EB

— FONTS —
Heading & Body Font: Inter (Google Fonts)

— COPY —
Label:    DOES THIS SOUND FAMILIAR?
H2:       You're Working Hard. But Something Still Feels Off.
Sub:      If any of these hit close to home, you're exactly who we built this for.

— CARD 1 (Stakes — red accent) —
Icon:  flame
Title: The Clock Is Running Out
Body:  Every month you wait is another month of missed revenue, missed opportunities, and watching competitors pull ahead. The cost of staying stuck is higher than you think.

— CARD 2 (Connection — blue accent) —
Icon:  heart
Title: I Know This Feeling Personally
Body:  I spent 3 years doing everything "right" and still hitting the same ceiling. Not because I lacked effort — but because I was missing one critical piece of the puzzle.

— CARD 3 (Way Out — green accent) —
Icon:  arrow-up-right
Title: There's a Smarter Path Forward
Body:  Once I found the right system, everything changed in 90 days. Not overnight — but faster than I ever thought possible. That's exactly what you'll build here.`,
  },
  {
    id: "empathy",
    number: "02b",
    label: "EMPATHY",
    title: "Empathy Variation 2",
    description:
      "Big numbered rows (dark premium). Gold/amber/green accent per row. Stakes · Connection · Way Out. Slide-in from left animations.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v2-thumb.webp",
    funnelTypes: ["High-Ticket Coaching","Mastermind","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Dark section bg (#0D0D0D)
- Container: max-width 1100px centered, padding 100px 24px
- Header (left-aligned or centered): uppercase label · H2 · sub
- Subtle gold horizontal rule (1px var(--accent) at 30% opacity) below header
- 3 stacked rows, each:
  - Large number left (48px bold, var(--accent) gold, fixed width ~80px)
  - Vertical divider line
  - Title + body right
  - Row bg: var(--bg-card), left border 3px accent color, border-radius 12px
  - Row 1 — Stakes: red/gold left border
  - Row 2 — Connection: amber left border
  - Row 3 — Way Out: green left border
  - Gap between rows: 16px

=== ANIMATIONS (IntersectionObserver) ===
- Each row slides in from left (translateX -24px → 0) + fade
- Staggered 0.2s per row
- prefers-reduced-motion: skip animations

=== MOBILE (≤768px) ===
- Number scales to 36px
- Row padding reduces
- Title + body stack tighter

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V2 (Big Numbers · Dark Premium) base component.

— BRAND COLORS —
--bg:        #0D0D0D
--bg-card:   #1A1A1A
--accent:    #F5C842
--text:      #FFFFFF
--muted:     #9A9A9A
--border:    #2A2A2A

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: THE HARD TRUTH
H2:    Most People Stay Stuck for Years.
Sub:   Not because they lack talent. Because no one showed them how to play the game differently.

— ROW 01 (gold) — Stakes —
Title: You're Solving the Wrong Problems
Body:  Working harder on tactics that don't move the needle. Busy calendar, flat results.

— ROW 02 (amber) — Connection —
Title: You've Tried Everything. Nothing Sticks.
Body:  Courses, coaches, YouTube rabbit holes. Each one promised results. You're still here.

— ROW 03 (green) — Way Out —
Title: The Right System Changes Everything
Body:  One framework. Proven results. People just like you crossing $50k months within 90 days.`,
  },
  {
    id: "empathy",
    number: "02c",
    label: "EMPATHY",
    title: "Empathy Variation 3",
    description:
      "Zigzag alternating icon/text (editorial magazine). Lavender bg, Playfair Display + Source Serif. Alternating slide-in animations.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v3-thumb.webp",
    funnelTypes: ["Editorial Brand","Premium Coaching","Author"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Light lavender section bg (#F8F6FF)
- Container: max-width 1080px centered, padding 96px 24px
- Header (centered): small uppercase label · H2 (Playfair serif)
- 3 zigzag rows, alternating:
  Row 1 — text left, icon right
  Row 2 — icon left, text right
  Row 3 — text left, icon right
- Each row: 2-column grid, align-items center, gap 48px
- Icon block: 80×80px, border-radius 16px, soft colored bg
- Border-bottom between rows: 1px dashed var(--border)
- Row 1+3 icon color: purple var(--accent)
- Row 2 icon color: cyan var(--accent-2)
- Title: Playfair serif, bold
- Body: Source Serif body, muted, line-height 1.6

=== ANIMATIONS (IntersectionObserver) ===
- Odd rows: fade-in from left (translateX -20px → 0)
- Even rows: fade-in from right (translateX 20px → 0)
- prefers-reduced-motion: skip animations

=== MOBILE (≤768px) ===
- All rows stack to single column (icon on top, text below)
- Center-align text on mobile
- Reduce icon size to 64px

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V3 (Zigzag Editorial) base component.

— BRAND COLORS —
--bg:        #F8F6FF
--accent:    #7C3AED
--accent-2:  #06B6D4
--text:      #1E1B4B
--muted:     #6B7280
--border:    #E5E7EB

— FONTS —
Heading Font: Playfair Display (Google Fonts)
Body Font:    Source Serif 4 (Google Fonts)

— COPY —
Label: WE SEE YOU
H2:    The Struggle Is Real. And It's Not Your Fault.

— ROW 1 (text left, purple mood-sad icon right) —
Title: You Feel Like You're Running Out of Time
Body:  You see peers landing breakthroughs and wonder what they know that you don't. The gap feels wider every quarter.

— ROW 2 (cyan hand-stop icon left, text right) —
Title: I Hit That Same Wall at Year Three
Body:  I remember the exact moment I realized effort alone wasn't going to get me there. That moment became the foundation of everything I now teach.

— ROW 3 (text left, purple star icon right) —
Title: The Shift Happens Faster Than You Think
Body:  When you stop fighting the current and learn to read it, progress stops being a grind and starts feeling inevitable.`,
  },
  {
    id: "empathy",
    number: "02d",
    label: "EMPATHY",
    title: "Empathy Variation 4",
    description:
      "Split layout — coach photo left + stacked pain/hope bullets right. Warm cream bg, Plus Jakarta Sans, approachable personal-brand vibe.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v4-thumb.webp",
    funnelTypes: ["Personal Brand","Coach","Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Warm cream section bg (#FFF8F3)
- Container: max-width 1180px centered, padding 96px 24px
- Grid: grid-template-columns 45% 55%, gap 56px, align-items center
- LEFT: photo column (Unsplash speaker/coach), aspect-ratio 4:5, border-radius 20px, warm gradient overlay at bottom (transparent → warm cream)
- RIGHT: content column
  - Eyebrow label uppercase, var(--accent) orange
  - H2: large bold, dark
  - Sub paragraph muted
  - Pain bullets (red dots): "Putting in 60-hour weeks…", "Following advice that worked for others…"
  - Solution bullet (green dot, last): "Until I stopped copying and built…"
  - CTA: outlined orange pill with arrow

=== ANIMATIONS (IntersectionObserver) ===
- Photo slides in from left (translateX -24px → 0) + fade
- Content fades in from right (translateX 16px → 0)
- Stagger: photo first (0s), content (0.15s)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid collapses to single column
- Photo on top (max-height 420px), content below
- Center-align bullets on mobile

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V4 (Split Photo · Warm Personal) base component.

— BRAND COLORS —
--bg:        #FFF8F3
--accent:    #EA580C
--text:      #1C1917
--muted:     #78716C
--border:    #E7E5E4
--photo-bg:  #FED7AA

— FONTS —
Heading & Body Font: Plus Jakarta Sans (Google Fonts)

— PHOTO (Unsplash placeholder) —
PHOTO_URL: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80
(confident coach/speaker, warm tone)

— COPY —
Label: I'VE BEEN WHERE YOU ARE
H2:    Three Years Ago, I Was Exactly in Your Shoes.

Sub:   I had the drive, the ideas, and the work ethic. What I was missing was a proven system that connected all the dots. Here's what I kept running into:

— PAIN BULLETS (red dots) —
• Putting in 60-hour weeks with inconsistent revenue to show for it
• Following advice that worked for others but never quite landed for me

— SOLUTION BULLET (green dot, last) —
• Until I stopped copying and built a system designed for my strengths

— CTA —
Text: See How I Did It →`,
  },
  {
    id: "empathy",
    number: "02e",
    label: "EMPATHY",
    title: "Empathy Variation 5",
    description:
      "Horizontal journey timeline — 3 stages with circle icons + connecting arrows. Minimal SaaS feel, DM Sans, red/amber/green progression.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v5-thumb.webp",
    funnelTypes: ["SaaS","Tech Coaching","Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Light gray section bg (#FAFAFA)
- Container: max-width 1180px centered, padding 96px 24px
- Header (centered): uppercase label · H2 · sub paragraph
- 3 stages in a horizontal row (flex, justify-between, align-items start, gap 32px)
- Each stage:
  - 56px circle icon (background tinted with stage color at ~12% opacity, icon stroke at full color)
  - LABEL uppercase 11px letter-spaced
  - Stage text body, 2 lines max
  - Max-width 260px per stage
- Connector between stages: animated horizontal line (1px) drawing left-to-right when section enters viewport
- Stage 1 — mood-sad icon, danger red color
- Stage 2 — heart icon, warning amber color
- Stage 3 — rocket icon, success green color

=== ANIMATIONS (IntersectionObserver) ===
- Stages fade up + scale 0.96 → 1, staggered 0.2s
- Connector line: scaleX 0 → 1 over 1.2s after stage 1 + 2 appear
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stages stack vertically, centered
- Connector becomes vertical line between stages
- Reduce circle to 48px, stage text centered

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V5 (Journey Timeline) base component.

— BRAND COLORS —
--bg:        #FAFAFA
--accent:    #8B5CF6
--accent-2:  #10B981
--danger:    #EF4444
--warning:   #F59E0B
--text:      #111827
--muted:     #6B7280

— FONTS —
Heading & Body Font: DM Sans (Google Fonts)

— COPY —
Label: YOUR JOURNEY SO FAR
H2:    Most People Get Stuck at Step Two.
Sub:   Here's the path we've watched hundreds of clients take — and where the real breakthrough happens.

— STAGE 1 (danger red, mood-sad icon) —
Label: WHERE YOU ARE NOW
Text:  Grinding without a clear system. Results feel random.

— STAGE 2 (warning amber, heart icon) —
Label: THE TURNING POINT
Text:  You find the right framework. Clarity replaces confusion.

— STAGE 3 (success green, rocket icon) —
Label: WHERE YOU'RE GOING
Text:  Predictable results. Scalable momentum. Freedom.`,
  },
  {
    id: "empathy",
    number: "02f",
    label: "EMPATHY",
    title: "Empathy Variation 6",
    description:
      "Fullscreen dark BG (gym/arena) + glass-morphism overlay cards. Bebas Neue + Inter, cinematic fitness/performance vibe. Ken Burns slow zoom.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v6-thumb.webp",
    funnelTypes: ["Fitness","Performance Coaching","Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Full-width section, min-height 100vh
- Full-width background image fills entire section
- Dark overlay var(--overlay) on top + subtle radial vignette
- Background has Ken Burns slow zoom (28s ease-in-out alternate)
- Content layered above bg (z-index 1+)
- Content layout:
  - Center-bottom positioning (text-align: center)
  - LABEL uppercase, white at 70% opacity, letter-spaced
  - H2: Bebas Neue, massive (clamp 60px → 120px), all caps, line-height 0.95
  - Sub paragraph, white at 80% opacity, max-width 720px centered
  - 3 mini glass cards in a row at the bottom (margin-top 56px)
    - Each card: bg var(--card-bg) (rgba white 0.07) + backdrop-filter blur(12px)
    - Border: 1px rgba(255,255,255,0.10), border-radius 14px, padding 22px
    - Body text Inter, line-height 1.5, white

=== ANIMATIONS (IntersectionObserver) ===
- Content rises from bottom (translateY 24px → 0) + fade
- Staggered: label · H2 · sub · cards
- Ken Burns runs always
- prefers-reduced-motion: skip rise animations

=== MOBILE (≤768px) ===
- Cards stack to single column
- H2 scales to clamp 40px → 60px
- Reduce padding

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V6 (Cinematic Fullscreen) base component.

— BRAND COLORS —
--bg:        #050505
--accent:    #DC2626
--text:      #FFFFFF
--muted:     #A3A3A3
--overlay:   rgba(0,0,0,0.72)
--card-bg:   rgba(255,255,255,0.07)

— FONTS —
Heading Font: Bebas Neue (Google Fonts)
Body Font:    Inter (Google Fonts)

— BACKGROUND IMAGE (Unsplash) —
BG_IMAGE: https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80
(dark gym/arena atmosphere)

— COPY —
Label: DOES THIS SOUND LIKE YOU?
H2:    You're Capable of So Much More.
Sub:   But something keeps getting in the way.

— CARD 1 (Stakes — pain) —
Working hard every day but the scoreboard doesn't reflect it.

— CARD 2 (Stakes — pain) —
Watching others level up while you feel stuck in neutral.

— CARD 3 (Way Out) —
Ready to finally close the gap — for good.`,
  },
  {
    id: "empathy",
    number: "02g",
    label: "EMPATHY",
    title: "Empathy Variation 7",
    description:
      "Two-column 'fork in the road': red-tinted pain checklist left + green-tinted solution checklist right. Outfit font, Without/With contrast, centered CTA below.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v7-thumb.webp",
    funnelTypes: ["Business Coaching","Consulting","B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Light section bg, container max-width 1180px centered, padding 96px 24px
- Header (centered): uppercase label · H2 · sub
- Two-column grid below header: 50/50 split, gap 0 (with vertical divider)
- LEFT column: bg var(--bg-left) (very light red tint), padding 40px, border-radius 20px 0 0 20px
  - Header: uppercase danger color, "Without the right system"
  - 4 items, each: ✗ icon red + text
- RIGHT column: bg var(--bg-right) (very light green tint), padding 40px, border-radius 0 20px 20px 0
  - Header: uppercase success color, "With the right system"
  - 4 items, each: ✓ checkmark green + text
- Center divider: vertical 1px dashed var(--border)
- CTA below (centered, margin-top 48px): solid green pill button "I Want the Right System →"

=== ANIMATIONS (IntersectionObserver) ===
- Left column slides in from left
- Right column slides in from right
- Stagger items inside each column (0.08s each)
- CTA fades up last
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks to single column
- Both columns get same rounded corners + margin between
- Hide center divider on mobile

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V7 (Pain vs Solution Checklist) base component.

— BRAND COLORS —
--bg:        #F0FDF4
--bg-left:   #FEF2F2
--bg-right:  #F0FDF4
--accent:    #16A34A
--danger:    #DC2626
--text:      #111827
--muted:     #6B7280
--border:    #E5E7EB

— FONTS —
Heading & Body Font: Outfit (Google Fonts)

— COPY —
Label: THE FORK IN THE ROAD
H2:    Two Paths. One Decision.
Sub:   Where you end up depends entirely on the choice you make today.

— LEFT COLUMN — "Without the right system" (danger color, ✗ items) —
• Still trading time for inconsistent money
• Chasing clients who don't value your work
• Copying strategies built for someone else
• 6 months from now — same spot, more tired

— RIGHT COLUMN — "With the right system" (success color, ✓ items) —
• A predictable pipeline that works while you sleep
• Premium clients who seek YOU out
• A method built around your unique strengths
• 6 months from now — transformed business

— CTA —
Text: I Want the Right System →`,
  },
  {
    id: "empathy",
    number: "02h",
    label: "EMPATHY",
    title: "Empathy Variation 8",
    description:
      "Dark navy 2-column layout: left CTA-anchored copy + right 3 vertical accent-bar cards (red, amber, green). Syne + Inter, typographic-forward agency feel.",
    labelClass: labelClasses.empathy,
    previewSrc: "/private/empathy-v8-thumb.webp",
    funnelTypes: ["Agency","Consulting","Premium Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Empathy section variation. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 03-empathy-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== LAYOUT ===
- Dark navy section bg (#0F172A), container max-width 1280px centered, padding 100px 32px
- Two-column grid: 40% left / 60% right, gap 56px, align-items start
- LEFT 40%:
  - Eyebrow uppercase, var(--muted)
  - H2 (Syne): large bold white, 2 lines
  - Accent H2 line: var(--accent) amber italic — "It Never Was."
  - Body paragraph: muted
  - CTA: solid amber pill with arrow
- Vertical dashed divider between columns: 1px dashed var(--border)
- RIGHT 60%:
  - 3 stacked bars (gap 16px)
  - Each bar: bg slightly lighter than section (rgba white 0.03) + 3px solid left border (no border-radius on left edge)
  - Padding 22px 28px
  - Bar 1: red left border (Wrong Foundation)
  - Bar 2: amber left border (Isolated Effort)
  - Bar 3: green left border (Pattern Break)
  - Each: bold title white + body muted

=== ANIMATIONS (IntersectionObserver) ===
- Left content fades up (staggered: eyebrow · H2 · body · CTA)
- Right bars slide in from right (translateX 24px → 0) staggered 0.12s each
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid collapses to single column
- Hide vertical divider
- Bars retain colored left border
- CTA full-width

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Empathy V8 (Dark Agency Bars) base component.

— BRAND COLORS —
--bg:        #0F172A
--accent:    #F59E0B
--accent-2:  #3B82F6
--text:      #F8FAFC
--muted:     #94A3B8
--border:    #1E293B
--bar-1:     #EF4444
--bar-2:     #F59E0B
--bar-3:     #22C55E

— FONTS —
Heading Font: Syne (Google Fonts)
Body Font:    Inter (Google Fonts)

— LEFT COLUMN —
Label:       WHY MOST PEOPLE FAIL
H2 Line 1:   It's Not About Working Harder.
H2 Line 2:   It Never Was.   ← amber italic accent
Body:        The professionals who break through don't outwork everyone else. They out-think everyone else. They use a system. You're about to get that system.
CTA:         Show Me the System →

— RIGHT COLUMN — 3 accent bars —
Bar 1 (red left border):
  Title: Wrong Foundation
  Body:  Building on tactics instead of strategy. Every result becomes temporary.

Bar 2 (amber left border):
  Title: Isolated Effort
  Body:  Going it alone with no proven framework to accelerate the learning curve.

Bar 3 (green left border):
  Title: The Pattern Break
  Body:  One shift in approach creates a compounding effect across every area.`,
  },
  {
    id: "opportunity",
    number: "03a",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 1",
    description:
      "4-phase horizontal grid + 3-stat bar (clean corporate). Inter, light bg, colored phase labels with left-border accent.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v1-thumb.webp",
    funnelTypes: ["Corporate","B2B","Agency"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section (Section 03 of the 10P Sales Page Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What's the new thing that finally works?"

=== OUTPUT ===
File: 04-vehicle-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light section bg (white) with subtle gradient to bg-alt
- Container: max-width 1200px centered, padding 96px 24px
- Header (centered): uppercase label (accent color) + H2 (method name with ™) + sub
- 4 equal phase cards in a row (grid-template-columns: repeat(4, 1fr), gap 20px)
- Each card: white bg, 28px padding, 16px border-radius, 4px left border (phase color), 1px top/right/bottom border (var(--border))
- Card content: colored uppercase phase label + bold title + body
- Below grid: 3-stat bar (centered row, gap 56px, padding-top 64px, border-top 1px var(--border))
- Each stat: big accent number (clamp 40-56px bold) + muted label

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up + translateY 16px → 0, staggered 0.1s
- Stats count-up: animate integer/decimal from 0 to target over 1.2s on entry
- prefers-reduced-motion: skip animations

=== MOBILE (≤768px) ===
- 4-card grid collapses to 2×2 then 1 column under 480px
- Stats stack vertically, smaller text

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V1 (4-Phase Horizontal · Clean Corporate) base component.

— BRAND COLORS —
--bg:      #FFFFFF
--bg-alt:  #F7F8FA
--accent:  #2563EB
--text:    #0E1116
--muted:   #4A5160
--phase-1: #2563EB
--phase-2: #D97706
--phase-3: #16A34A
--phase-4: #7C3AED
--border:  #E4E7EB

— FONTS —
Heading & Body Font: Inter (Google Fonts)

— COPY —
Label: THE PROVEN FRAMEWORK
H2:    The Lean Agency Method™
Sub:   A 12-week system built for coaches and consultants ready to hit consistent $50K months — without burnout.

— PHASE 1 (blue · Weeks 1–3) —
Label: Phase 1 · Weeks 1–3
Title: Foundation
Body:  Audit your current offer, identify your highest-value clients, and install the core infrastructure for scale.

— PHASE 2 (amber · Weeks 4–6) —
Label: Phase 2 · Weeks 4–6
Title: Pipeline
Body:  Build a predictable lead engine using our 3-channel outreach system — zero paid ads required.

— PHASE 3 (green · Weeks 7–9) —
Label: Phase 3 · Weeks 7–9
Title: Conversion
Body:  Deploy the 6-step sales framework that converts 1 in 3 discovery calls into high-ticket clients.

— PHASE 4 (purple · Weeks 10–12) —
Label: Phase 4 · Weeks 10–12
Title: Scale
Body:  Systemize delivery, hire your first VA, and remove yourself from the day-to-day without losing revenue.

— STATS (count-up) —
Stat 1: $50K · average monthly revenue by week 12
Stat 2: 81%  · of clients hit target within 90 days
Stat 3: 90   · days to a fully systemized business`,
  },
  {
    id: "opportunity",
    number: "03b",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 2",
    description:
      "Vertical stepper + connector lines (dark premium). Left intro · right 3-step process with numbered circles. Space Grotesk.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v2-thumb.webp",
    funnelTypes: ["High-Ticket Coaching","Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark section bg (#0D0D0D)
- Container: max-width 1200px centered, padding 100px 32px
- Two-column grid: 40% left / 60% right, gap 64px, align-items start
- LEFT: uppercase label · H2 (method name with ™) · accent line · intro paragraph · stats row (3 stats stacked)
- RIGHT: vertical stepper with 3 numbered colored circles
  - Each step is a flex row: 56px colored circle (number inside) + step card (bg-card, padding 22px, rounded 12px)
  - Vertical dashed connector line runs through circles (left of cards)
  - Step 1 blue, Step 2 amber, Step 3 green
- Stats below intro on left: 3 lines, each with big accent number + muted label

=== ANIMATIONS (IntersectionObserver) ===
- Stepper draws downward: connector line scaleY 0 → 1 over 1.2s
- Each step card slides in from right (translateX 20px → 0), staggered 0.2s
- Stats count-up on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid collapses to single column
- Stepper takes full width
- Stats become a row at top

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V2 (Vertical Stepper · Dark Premium) base component.

— BRAND COLORS —
--bg:      #0D0D0D
--bg-card: #1A1A1A
--accent:  #F5C842
--text:    #FFFFFF
--muted:   #9A9A9A
--step-1:  #3B82F6
--step-2:  #F59E0B
--step-3:  #22C55E
--border:  #2A2A2A

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— LEFT COLUMN —
Label:       HOW IT WORKS
H2:          The Revenue Acceleration Framework™
H2 Accent:   Three Steps. Ninety Days.
Sub:         Not a course. Not a template. A hands-on system with real accountability.
Intro:       Most coaches spend years figuring out what takes our clients 90 days. The difference is having a battle-tested system and someone who's walked the path before you.

— RIGHT — STEPS —
Step 1 (blue):  Title: Diagnose & Design  · Body: We identify exactly what's blocking your growth and rebuild your offer architecture from the ground up.
Step 2 (amber): Title: Build & Launch     · Body: Your new client acquisition system goes live. First qualified leads arrive within 14 days.
Step 3 (green): Title: Optimize & Scale   · Body: Data-driven iteration every week until you hit your income target — then we build the team around it.

— STATS (count-up) —
Stat 1: 500   · clients transformed
Stat 2: $2M   · in client revenue generated
Stat 3: 92%   · client satisfaction rate`,
  },
  {
    id: "opportunity",
    number: "03c",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 3",
    description:
      "3 phase cards with neon glow accents (dark neon, tech-forward). Outfit font. Each card has colored top-border + radial glow behind.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v3-thumb.webp",
    funnelTypes: ["Health Coaching","Fitness","Performance"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Very dark purple-black bg (#07020F)
- Container: max-width 1200px centered, padding 100px 24px
- Header (centered): uppercase label · H2 (method™) · sub
- 3 phase cards in a row, gap 28px
- Each card: bg-card, 32px padding, 16px border-radius, 4px solid top border (phase color), box-shadow radial glow at base (60px blur, color-matched glow)
- Card content: colored uppercase week period + bold title + body paragraph
- 3-stat row below cards, padding-top 56px, with thin top border

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up + scale 0.96 → 1, staggered 0.15s
- Glow pulses once on card entry (box-shadow expand)
- Stats count-up on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- 3 cards stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V3 (Dark Neon Glow Cards) base component.

— BRAND COLORS —
--bg:      #07020F
--bg-card: #110D1F
--accent:  #A855F7
--accent-2:#06B6D4
--text:    #FFFFFF
--muted:   #8B8BA0
--glow-1:  rgba(59,130,246,0.3)
--glow-2:  rgba(245,158,11,0.3)
--glow-3:  rgba(34,197,94,0.3)
--border:  #1E1A2E

— FONTS —
Heading & Body Font: Outfit (Google Fonts)

— COPY —
Label: THE SYSTEM
H2:    The Hormone-First Transformation™
Sub:   Built specifically for women 40+ who've been told "just eat less and move more" — and watched it fail.

— PHASE 1 (blue glow · Week 1–2) —
Period: WEEK 1–2
Title:  Reset
Body:   Eliminate the hidden inflammation triggers sabotaging your metabolism. Most clients feel different within the first 10 days.

— PHASE 2 (amber glow · Week 3–6) —
Period: WEEK 3–6
Title:  Rebuild
Body:   Rebalance cortisol, estrogen, and insulin through targeted nutrition and movement protocols.

— PHASE 3 (green glow · Week 7–12) —
Period: WEEK 7–12
Title:  Results
Body:   Sustainable fat loss, restored energy, and a body that works with your hormones — not against them.

— STATS —
Stat 1: 500+  · women transformed
Stat 2: $0    · in gym equipment required
Stat 3: 12wk  · average to full results`,
  },
  {
    id: "opportunity",
    number: "03d",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 4",
    description:
      "Accordion expandable phases (modern SaaS). Left intro + CTA · right 3 collapsible phase cards (first expanded by default). DM Sans.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v4-thumb.webp",
    funnelTypes: ["Career Coaching","Education","SaaS"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light section bg (#F8FAFC)
- Container: max-width 1200px centered, padding 96px 24px
- Two-column grid: 40% left / 60% right, gap 56px, align-items start
- LEFT: uppercase label · H2 (method™) · sub · intro paragraph · CTA outlined indigo pill
- RIGHT: 3 accordion phase items stacked, gap 12px
  - Each item: bg white, 1px border, 12px radius
  - Header: clickable row (padding 20px 24px) with title + chevron icon
  - Body: hidden by default (max-height 0, padding 0)
  - Active item: bg-active (very light indigo), max-height 500px, body padding 0 24px 24px
  - First item starts active
- Stats row below accordion (3 stats inline, padding-top 32px)

=== ANIMATIONS ===
- Accordion: smooth max-height transition on toggle (.35s)
- Chevron rotates 180deg on open
- IntersectionObserver: items fade up + translateY staggered
- Stats count-up on entry

=== MOBILE (≤768px) ===
- Grid collapses to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V4 (Accordion · Modern SaaS) base component.

— BRAND COLORS —
--bg:        #F8FAFC
--bg-active: #EEF2FF
--accent:    #4F46E5
--text:      #0F172A
--muted:     #64748B
--border:    #E2E8F0

— FONTS —
Heading & Body Font: DM Sans (Google Fonts)

— LEFT COLUMN —
Label: THE METHODOLOGY
H2:    The Reverse-Engineered Interview System™
Sub:   The exact process used to move 400+ professionals into $150K+ roles in under 90 days.
Body:  Stop sending applications into the void. Our system works backwards from the offer letter — mapping every step with surgical precision so you know exactly what to do, and when.
CTA:   See Full Curriculum →

— RIGHT — PHASES —
Phase 1 (open by default):
  Title: Target & Position
  Body:  Identify your highest-leverage opportunities and reposition your profile to attract inbound recruiter interest. Most clients see 3x more profile views within the first week.

Phase 2 (collapsed):
  Title: Activate & Outreach
  Body:  Deploy our 5-touch outreach sequence to hiring managers and internal champions — bypassing the ATS entirely.

Phase 3 (collapsed):
  Title: Interview & Convert
  Body:  Use the STAR+ framework to ace every interview round and generate competing offers to maximize leverage.

— STATS (count-up) —
Stat 1: 400+   · placed
Stat 2: $150K+ · avg offer
Stat 3: 87     · days avg`,
  },
  {
    id: "opportunity",
    number: "03e",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 5",
    description:
      "Arrow flow diagram → outcome box (fresh green wellness). 3 stage cards + arrows + highlighted outcome card. Plus Jakarta Sans.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v5-thumb.webp",
    funnelTypes: ["Wellness","Health Coaching","Weight Loss"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light green bg (#F0FDF4)
- Container: max-width 1280px centered, padding 96px 24px
- Header (centered): uppercase label · H2 (method™) · sub
- Horizontal flow: 3 stage cards + arrows + outcome box (4 cells with connectors)
- Each stage card: white bg, padding 24px, rounded 14px, 1px border, colored top label
- Connector arrows between cells (SVG inline, animated draw on scroll)
- Outcome box: solid filled bg (--outcome-bg light green), green border (2px solid var(--outcome-border)), prominent
- Stats row below (3 stats, centered)

=== ANIMATIONS (IntersectionObserver) ===
- Stages fade up + translateY staggered 0.2s
- Arrows draw left-to-right (stroke-dashoffset animation)
- Outcome box pulses once on entry (box-shadow expand + return)
- Stats count-up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Horizontal flow becomes vertical (stack top to bottom)
- Arrows rotate 90deg

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V5 (Arrow Flow + Outcome · Fresh Wellness) base component.

— BRAND COLORS —
--bg:              #F0FDF4
--accent:          #16A34A
--accent-2:        #0EA5E9
--text:            #14532D
--muted:           #4B5563
--border:          #D1FAE5
--outcome-bg:      #DCFCE7
--outcome-border:  #16A34A

— FONTS —
Heading & Body Font: Plus Jakarta Sans (Google Fonts)

— COPY —
Label: THE PATH FORWARD
H2:    The Metabolic Reset Protocol™
Sub:   A science-backed 30-day system that resets your body's fat-burning switch — even if you've failed every diet before.

— STAGE 1 (blue · DISCOVER) —
Label: DISCOVER
Title: Your Metabolic Type
Body:  Personalized assessment reveals exactly why previous approaches failed.

— STAGE 2 (amber · ACTIVATE) —
Label: ACTIVATE
Title: Your Fat-Burning Mode
Body:  Targeted nutrition triggers that switch your metabolism on.

— STAGE 3 (green · SUSTAIN) —
Label: SUSTAIN
Title: Your New Normal
Body:  Habits that stick because they work with your lifestyle.

— OUTCOME BOX (green border) —
Label: RESULT
Title: Down 20 lbs in 30 Days
Body:  Without starving, without the gym, without giving up wine.

— STATS —
Stat 1: 30   · days to visible results
Stat 2: 3X   · faster than traditional diets
Stat 3: 94%  · client success rate`,
  },
  {
    id: "opportunity",
    number: "03f",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 6",
    description:
      "Tabbed phase switcher (corporate professional). 4 tabs · 2-col tab content (text + visual). Manrope. JS tab switching.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v6-thumb.webp",
    funnelTypes: ["Executive Coaching","Consulting","Corporate"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Clean white section bg
- Container: max-width 1200px centered, padding 96px 32px
- Header (centered): uppercase label · H2 (method™) · sub
- Tab bar (row of 4 pills, centered, bg-tabs background, padding 6px, rounded 999px, gap 4px)
- Each pill: padding 10px 22px, rounded 999px, font-weight 600, cursor pointer
- Active tab: tab-active bg + white text
- Inactive: transparent + muted text, hover bg slightly darker
- Tab content panel below: 2-column grid 1.2fr / 1fr, gap 48px, padding-top 48px
  - LEFT: tab title · weeks sub · body paragraph
  - RIGHT: large illustrative SVG icon block (240px square, bg-tabs, rounded 20px, color accent)
- Stats row below tabs/content (3 stats inline, padding-top 56px, top border)

=== INTERACTIONS ===
- JS: click tab → switch active class + show that tab's content
- Smooth fade transition between tab panels (.25s)
- IntersectionObserver: bar slides in from top, first content fades in
- Stats count-up on entry

=== MOBILE (≤768px) ===
- Tab bar scrolls horizontally (overflow-x auto)
- Tab content stacks (visual below text)

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V6 (Tabbed Switcher · Corporate) base component.

— BRAND COLORS —
--bg:         #FFFFFF
--bg-tabs:    #F1F5F9
--accent:     #0F766E
--text:       #0F172A
--muted:      #64748B
--border:     #CBD5E1
--tab-active: #0F766E

— FONTS —
Heading & Body Font: Manrope (Google Fonts)

— COPY —
Label: HOW WE WORK TOGETHER
H2:    The Executive Presence Blueprint™
Sub:   Four distinct phases. Each one builds on the last. Together they create a transformation that lasts.

— TAB 1 — Phase 1 —
Title: Awareness
Sub:   Weeks 1–2
Body:  A 360° assessment reveals blind spots in how others perceive your leadership — and the specific shifts that create immediate impact.
Icon:  chart-bar (illustrative)

— TAB 2 — Phase 2 —
Title: Architecture
Sub:   Weeks 3–5
Body:  We rebuild your communication framework — how you speak in meetings, present to boards, and handle conflict under pressure.
Icon:  layers

— TAB 3 — Phase 3 —
Title: Activation
Sub:   Weeks 6–9
Body:  Live scenario practice with real-time coaching. You walk into every room knowing exactly how to command it.
Icon:  zap / lightning

— TAB 4 — Phase 4 —
Title: Ascent
Sub:   Weeks 10–12
Body:  Strategic positioning for your next promotion, board seat, or speaking opportunity.
Icon:  trending-up

— STATS —
Stat 1: 200+ · executives coached
Stat 2: 94%  · promotion rate within 12 months
Stat 3: 4.9★ · average client rating`,
  },
  {
    id: "opportunity",
    number: "03g",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 7",
    description:
      "Split — 3 numbered method steps left + 3 big stat blocks right (warm agency). Syne headlines + Inter body.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v7-thumb.webp",
    funnelTypes: ["Personal Brand","Agency","Marketing"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Warm cream section bg (#FFF7ED)
- Container: max-width 1240px centered, padding 100px 32px
- Two-column grid: 55% left / 45% right, gap 64px, align-items center
- LEFT:
  - Uppercase label (accent orange)
  - H2 (Syne, method™)
  - Sub paragraph
  - 3 numbered steps stacked, gap 28px
  - Each step: large colored number (Syne bold, 56px) + title + body
  - Number colors: 1 orange · 2 amber · 3 green
- RIGHT: 3 big stat blocks stacked, separated by 1px horizontal divider
  - Each stat: massive number (clamp 48-72px bold) in stat color + muted label below

=== ANIMATIONS (IntersectionObserver) ===
- Left content slides in from left, staggered (label · H2 · sub · steps)
- Right stats count up on entry (numbers animate 0 → target)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks vertically (left first, right below)
- Stats become a row of 3 (or stack on very small screens)

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V7 (Method + Big Stats · Warm Agency) base component.

— BRAND COLORS —
--bg:     #FFF7ED
--accent: #EA580C
--text:   #1C1917
--muted:  #78716C
--stat-1: #EA580C
--stat-2: #16A34A
--stat-3: #2563EB
--border: #FED7AA

— FONTS —
Heading Font: Syne (Google Fonts)
Body Font:    Inter (Google Fonts)

— COPY —
Label: THE METHOD
H2:    The Brand Authority System™
Sub:   Built for personal brands doing $0–$10K/mo who are ready to cross $50K in 90 days.

— STEP 1 (orange) —
Title: Magnetic Positioning
Body:  Define the single message that makes your ideal client say "this is exactly what I need."

— STEP 2 (amber) —
Title: Content That Converts
Body:  A repeatable content system that builds authority and drives DMs from qualified buyers — daily.

— STEP 3 (green) —
Title: The Closing Machine
Body:  A simple sales process that converts conversations into clients without feeling salesy.

— STATS (count-up) —
Stat 1 (orange): $50K · monthly revenue milestone
Stat 2 (green):  81%  · hit target in 90 days
Stat 3 (blue):   3.2X · average revenue multiple`,
  },
  {
    id: "opportunity",
    number: "03h",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 8",
    description:
      "Full dark numbered timeline + proof row (high-performance fitness/business hybrid). 4 borderless cells with vertical dividers. Space Grotesk.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v8-thumb.webp",
    funnelTypes: ["Performance Coaching","Mastermind","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Full black section bg (#050505)
- Container: max-width 1280px centered, padding 100px 32px
- Header (centered or left): uppercase label · H2 (method™) · sub
- 4 phase cells in a single row, no card bg or border-radius — borderless cells separated by 1px vertical dividers
- Each cell: padding 28px, hover bg slightly lightens
- Each cell content: large colored number (top, clamp 56-72px bold) · bold title · body
- Number colors: 01 blue · 02 amber · 03 green · 04 purple
- Proof stats row below: dark gray bg band (bg-card), padding 32px 0, 3 stats centered
- Each stat: big bold accent number + small muted label

=== ANIMATIONS (IntersectionObserver) ===
- Cells slide up + fade, staggered 0.1s
- Stats count up on entry
- Hover: bg shifts subtly
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- 4 cells become 2×2 grid, then 1-column under 480px
- Dividers hide on mobile

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V8 (Dark Numbered Timeline · High-Performance) base component.

— BRAND COLORS —
--bg:      #050505
--bg-card: #111111
--accent:  #DC2626
--accent-2:#F5C842
--text:    #FFFFFF
--muted:   #9A9A9A
--num-1:   #3B82F6
--num-2:   #F59E0B
--num-3:   #22C55E
--num-4:   #A855F7
--border:  #222222

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: THE SYSTEM
H2:    The Athlete Entrepreneur Method™
Sub:   Four phases. One hundred days. Built for high performers who refuse to choose between health and wealth.

— PHASE 01 (blue) —
Number: 01
Title:  Audit
Body:   Full performance audit of your body, business, and mindset. No more guessing — pure data.

— PHASE 02 (amber) —
Number: 02
Title:  Install
Body:   High-performance protocols for energy, focus, and recovery installed alongside your revenue-generating activities.

— PHASE 03 (green) —
Number: 03
Title:  Execute
Body:   Weekly sprints with accountability checkpoints. Every action tracked, every win celebrated.

— PHASE 04 (purple) —
Number: 04
Title:  Compound
Body:   Systems lock in. Results compound. You become the person who operates at this level permanently.

— PROOF STATS (count-up) —
Stat 1: 1,200+ · high performers enrolled
Stat 2: $4.2M  · in client revenue added
Stat 3: 4.9★   · average program rating`,
  },
  {
    id: "opportunity",
    number: "03i",
    label: "OPPORTUNITY VEHICLE",
    title: "Opportunity Variation 9",
    description:
      "Roadmap milestones + outcome flag (warm coaching). Left intro + mini stats · right vertical timeline with colored milestones + outcome cap. Nunito.",
    labelClass: labelClasses.opportunity,
    previewSrc: "/private/opportunity-v9-thumb.webp",
    funnelTypes: ["Life Coaching","Personal Development","Transformation"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Opportunity Vehicle section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 04-vehicle-12.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light sky blue section bg (#F0F9FF)
- Container: max-width 1200px centered, padding 96px 24px
- Two-column grid: 38% left / 62% right, gap 64px, align-items start
- LEFT:
  - Uppercase label (accent teal)
  - H2 (method™)
  - Sub paragraph
  - Mini 2×2 stat grid (gap 16px): each cell has big number + label
- RIGHT: vertical timeline with 4 nodes (3 milestones + 1 outcome)
  - Each node: colored circle (28px) on left + content card on right
  - Vertical dashed connector line runs through circles
  - Milestone 1 blue · 2 amber · 3 green · Outcome teal with flag icon (filled)
  - Each node card: period label (small uppercase) + title + body

=== ANIMATIONS (IntersectionObserver) ===
- Connector line draws downward (scaleY 0 → 1 over 1.5s)
- Milestone circles pop in one by one (scale 0 → 1, staggered 0.25s)
- Mini stats count-up on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Opportunity V9 (Roadmap Milestones · Warm Coaching) base component.

— BRAND COLORS —
--bg:          #F0F9FF
--accent:      #0891B2
--accent-warm: #F59E0B
--text:        #0C4A6E
--muted:       #64748B
--border:      #BAE6FD
--milestone-1: #3B82F6
--milestone-2: #F59E0B
--milestone-3: #22C55E
--outcome:     #0891B2

— FONTS —
Heading & Body Font: Nunito (Google Fonts)

— LEFT COLUMN —
Label: YOUR TRANSFORMATION ROADMAP
H2:    The Life by Design Method™
Sub:   A 90-day guided journey from where you are — to where you've always known you could be.
Body:  Every person who walks this path starts in a different place. But the destination is always the same: a life that feels like yours.

— MINI STATS (2×2) —
Stat 1: 90    · days
Stat 2: $50K  · avg income gain

— RIGHT — TIMELINE —
Milestone 1 (blue · Day 1–30):
  Period: DAY 1–30
  Title:  Clarity
  Body:   Define your version of success — not someone else's.

Milestone 2 (amber · Day 31–60):
  Period: DAY 31–60
  Title:  Momentum
  Body:   First real wins compound into unshakeable belief in your path.

Milestone 3 (green · Day 61–90):
  Period: DAY 61–90
  Title:  Breakthrough
  Body:   The results you've been working toward become your new normal.

Outcome (teal · OUTCOME, flag icon):
  Period: OUTCOME
  Title:  Life by Design
  Body:   Freedom. Purpose. Financial independence. All three.`,
  },
  {
    id: "compare",
    number: "04a",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 1",
    description:
      "Classic 2-column comparison cards (clean corporate). Red ✗ card left, green ✓ card right with mirrored pairs. Inter, light bg.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v1-thumb.webp",
    funnelTypes: ["Corporate","B2B","Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section (Section 04 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why is your way better than what I'm doing now?"

=== OUTPUT ===
File: 05-before-after-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light white section bg
- Container: max-width 1140px centered, padding 96px 24px
- Header (centered): uppercase label · H2 · sub
- Two equal cards side-by-side, gap 24px
- Old card: red tint bg (--bg-old) + 1px solid red border, padding 32px, rounded 16px
- New card: green tint bg (--bg-new) + 1px solid green border, padding 32px, rounded 16px, subtle green gradient bottom
- Card header: colored uppercase label bold (16px)
- 5 items per card, each: ✗ or ✓ icon (24px circle) + text (15px)
- Items in identical order so each pair mirrors on same axis

=== ANIMATIONS (IntersectionObserver) ===
- Old card slides in from left, new card slides in from right
- Triggered when section enters viewport
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Cards stack: old on top, new below
- Reduce padding to 24px

=== RULE ===
Every old item and new item must mirror the same axis (same topic, flipped outcome). Example: "60-hour weeks" ↔ "22-hour weeks".

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V1 (Classic 2-Column · Clean Corporate) base component.

— BRAND COLORS —
--bg:         #FFFFFF
--bg-old:     rgba(220,38,38,0.03)
--bg-new:     rgba(22,163,74,0.04)
--accent:     #2563EB
--old-color:  #DC2626
--new-color:  #16A34A
--text:       #0E1116
--muted:      #4A5160
--border:     #E4E7EB
--old-border: rgba(220,38,38,0.3)
--new-border: rgba(22,163,74,0.3)

— FONTS —
Heading & Body Font: Inter (Google Fonts)

— COPY —
Label: THE OLD WAY VS THE NEW WAY
H2:    Stop Fighting Your Business. Start Scaling It.
Sub:   Everything you've been taught about growing a coaching business is designed for a different era. Here's what actually works now.

OLD WAY header: ✗ Without a System
NEW WAY header: ✓ With The Method™

— MIRRORED PAIRS (same axis, flipped result) —
Pair 1:
  Old: 60-hour weeks chasing inconsistent $8K months
  New: 22-hour weeks running a predictable $50K business
Pair 2:
  Old: Cold outreach to unqualified leads who ghost you
  New: Warm inbound prospects who already want to buy
Pair 3:
  Old: Discounting your prices just to close the deal
  New: Premium pricing clients respect and pay in full
Pair 4:
  Old: Reinventing your offer every time it doesn't sell
  New: One proven offer that sells itself on repeat
Pair 5:
  Old: Burning out and questioning if this is worth it
  New: Energized, focused, and building something real`,
  },
  {
    id: "compare",
    number: "04b",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 2",
    description:
      "Row-by-row mirrored table with axis labels in center (dark premium). Old vs New columns with center 'axis' pill. Space Grotesk.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v2-thumb.webp",
    funnelTypes: ["High-Ticket Coaching","Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark section bg (#0D0D0D)
- Container: max-width 1180px centered, padding 100px 24px
- Header (centered): uppercase label · H2 · sub
- Comparison table:
  - Header row: 3 cells — "OLD WAY ✗" (red), "THE AXIS" (muted center), "NEW WAY ✓" (green)
  - 5 data rows, each with 3 cells: old text (red tint) · axis pill badge center · new text (green tint)
  - Alternating row bg (slight lighten on odd)
  - Hover: row brightens
- Rounded 14px on table, border 1px var(--border)
- Axis pill: small bg, bold center-aligned text, muted

=== ANIMATIONS (IntersectionObserver) ===
- Rows fade in staggered top to bottom (0.08s each)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Each row becomes 3-row stack: old / axis / new
- Maintain colored backgrounds
- Padding reduces

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V2 (Mirrored Table · Dark Premium) base component.

— BRAND COLORS —
--bg:         #0D0D0D
--bg-table:   #111111
--bg-header:  #1A1A1A
--accent:     #F5C842
--old-color:  #EF4444
--new-color:  #22C55E
--text:       #FFFFFF
--muted:      #9A9A9A
--border:     #222222

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: THE HONEST COMPARISON
H2:    Two Paths. Same Starting Point.
Sub:   The only difference between where you are and where you want to be is the system you're using.

Headers: OLD WAY ✗   ·   THE AXIS   ·   NEW WAY ✓

— MIRRORED ROWS (axis label center) —
Row 1 — Axis: Monthly Income
  Old: Inconsistent $5K–$12K months
  New: Predictable $30K–$50K months
Row 2 — Axis: Work Hours
  Old: 55–65 hours a week, always on
  New: 20–25 hours with clear boundaries
Row 3 — Axis: Lead Source
  Old: Cold DMs, referrals, hope
  New: Evergreen content + warm pipeline
Row 4 — Axis: Sales Process
  Old: Winging it on every discovery call
  New: 6-step framework, 1-in-3 close rate
Row 5 — Axis: Team
  Old: Solo operator doing everything
  New: Lean VA team handling operations`,
  },
  {
    id: "compare",
    number: "04c",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 3",
    description:
      "Full-bleed dark split (deep red BEFORE / deep green AFTER) with glowing center divider + VS badge. Outfit, dramatic high-energy.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v3-thumb.webp",
    funnelTypes: ["Premium Coaching","Personal Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Full-width 2-column split (no padding between halves)
- LEFT half (BEFORE): bg #0D0505 (very dark red), padding 80px 64px
- RIGHT half (AFTER): bg #030D05 (very dark green), padding 80px 64px
- Min-height 600px
- Each half: uppercase label (red/green) · big header (Outfit bold) · italic muted sub · 5 items list
- Items: colored ✗/✓ icon + white text, padding 12px, hover gets tinted bg
- Center divider: 2px vertical line with glowing box-shadow (red on left side, green on right side)
- "VS" badge centered (circle, dark bg, white bold text, 60px) with subtle pulse animation
- Single section header above split: centered label + H2

=== ANIMATIONS (IntersectionObserver) ===
- Left half slides in from left + fade
- Right half slides in from right + fade
- VS badge pulses gently (continuous)
- prefers-reduced-motion: skip slides, keep pulse subtle

=== MOBILE (≤768px) ===
- Halves stack vertically (BEFORE top, AFTER bottom)
- VS badge becomes horizontal divider with badge in middle

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V3 (Dramatic Dark Split) base component.

— BRAND COLORS —
--bg-old:     #0D0505
--bg-new:     #030D05
--accent:     #A855F7
--old-color:  #EF4444
--new-color:  #22C55E
--text:       #FFFFFF
--muted:      #9A9A9A
--divider:    rgba(255,255,255,0.1)

— FONTS —
Heading & Body Font: Outfit (Google Fonts)

— COPY (top section header) —
Label: TWO REALITIES
H2:    Which One Are You Living Right Now?

— LEFT (BEFORE) —
Header: BEFORE
Sub:    The story most coaches know too well.
Items:
  ✗ Grinding 12-hour days for client scraps
  ✗ Saying yes to work you hate for the money
  ✗ Plateaued at $10K/mo for the last 18 months
  ✗ No system, no team, no time to think
  ✗ Secretly wondering if you made the right call

— RIGHT (AFTER) —
Header: AFTER
Sub:    What's waiting on the other side.
Items:
  ✓ Premium clients, premium fees, premium life
  ✓ Selective with projects. Picky by design.
  ✓ Crossed $50K/mo in month 9 of the program
  ✓ System runs itself. You run the vision.
  ✓ 100% certain you made the right call.

— CENTER —
VS badge with subtle pulse glow.`,
  },
  {
    id: "compare",
    number: "04d",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 4",
    description:
      "Stacked rows with axis label on TOP + side-by-side Without (left) / With (right) below + Overall Shift summary block at the bottom with 3 count-up stats. DM Sans, modern SaaS.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v4-thumb.webp",
    funnelTypes: ["SaaS","Tech Coaching","Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light section bg (#F8FAFC)
- Container: max-width 1180px centered, padding 96px 24px
- Section header (centered): uppercase label · H2 · sub
- table-wrap: max-width 960px centered

COLUMN HEADERS (2 columns above the rows):
- Grid-template-columns: 1fr 1fr, gap 24px, padding 0 24px 20px, border-bottom 1px var(--border)
- LEFT: "✗ Without the Method" — red bold uppercase, left-aligned
- RIGHT: "With the Method ✓" — green bold uppercase, right-aligned

ROWS — vertical stack (NOT 3-column grid). Each row is a card:
- background var(--bg-card), 1px border var(--border), border-radius 14px, padding 18px 24px 20px
- Hover: indigo border tint + subtle lift
- Inside each row, two vertical zones:
  1. AXIS PILL (top, centered):
     - var(--accent) indigo bg, white text, 11px bold uppercase, letter-spacing 0.2em
     - padding 7px 16px, rounded 999px, box-shadow indigo glow
     - Subtle continuous pulse animation (2.6s loop, shadow expand)
     - On scroll entry: scale 0.85 → 1 + fade
  2. COMPARISON (below pill):
     - Grid: 1fr | 1px divider | 1fr
     - LEFT cell: old text, red-tinted, left-aligned (slides in from left)
     - DIVIDER: 1px high (28px tall) var(--border) vertical line
     - RIGHT cell: new text, green-tinted, right-aligned, font-weight 500 (slides in from right)

SUMMARY BLOCK (bottom, full width within table-wrap):
- max-width 960px centered, margin-top 56px
- padding 36px 32px, border 1px var(--border), border-radius 18px
- Background: subtle gradient from indigo-tint to green-tint (linear-gradient 135deg, accent at 6% to new-color at 6%)
- Centered content:
  - Small accent uppercase label: "THE OVERALL SHIFT"
  - H3 summary statement
  - 3-column grid of big count-up stats — each with massive number (clamp 32-48px, font-weight 800) + small muted label below
- Stats use count-up animation when visible (data-count attribute, eased over 1.4s)

=== ANIMATIONS (IntersectionObserver) ===
- Rows staggered (0.1s each): axis pill scales in, old slides from left, new slides from right
- Summary block: fade up
- Stats: count from 0 to target on entry (1.4s ease)
- Axis pill: continuous gentle shadow pulse
- prefers-reduced-motion: skip slides + scale, content visible

=== MOBILE (≤768px) ===
- Hide column headers
- Each row: axis pill stays on top, then comparison stacks vertically (no divider)
- Old text → red bg-tint pill (centered), new text → green bg-tint pill (centered)
- Summary stats stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V4 (Stacked Rows + Overall Shift Summary · Modern SaaS) base component.

— BRAND COLORS —
--bg:         #F8FAFC
--bg-card:    #FFFFFF
--accent:     #4F46E5
--old-color:  #DC2626
--new-color:  #16A34A
--axis-bg:    #F1F5F9
--text:       #0F172A
--muted:      #64748B
--border:     #E2E8F0

— FONTS —
Heading & Body Font: DM Sans (Google Fonts)

— COPY —
Label: THE SHIFT IN APPROACH
H2:    Same Goal. Completely Different Path.
Sub:   Here's exactly what changes when you stop guessing and start using a system that's already been proven 400+ times.

Column headers:
  Left:  ✗ Without the Method
  Right: With the Method ✓

— ROWS (axis on TOP, then old/new side-by-side) —
Row 1 — Axis: Revenue/mo       · Old: Stuck at $8K–$12K       · New: Hitting $30K–$50K
Row 2 — Axis: Hours worked     · Old: 60+ exhausting hours    · New: Under 25 focused hours
Row 3 — Axis: Close rate       · Old: 1 in 10 calls convert   · New: 1 in 3 calls close
Row 4 — Axis: Lead quality     · Old: Chasing cold prospects  · New: Attracting warm buyers
Row 5 — Axis: Confidence       · Old: Doubting every decision · New: Executing with certainty

— OVERALL SHIFT SUMMARY (3 count-up stats) —
Eyebrow:    THE OVERALL SHIFT
Title:      In 90 days, the numbers tell the whole story.
Stat 1:     +275% · Monthly Revenue
Stat 2:     −63%  · Hours Worked
Stat 3:     +200% · Close Rate`,
  },
  {
    id: "compare",
    number: "04e",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 5",
    description:
      "Progress-bar visual comparison (data-driven). 5 metrics with red/green animated bars + change% badge + before/after labels. Plus Jakarta Sans.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v5-thumb.webp",
    funnelTypes: ["Wellness","Data-Driven Coaching","Fitness"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light fresh-green section bg (#F0FDF4)
- Container: max-width 1100px centered, padding 96px 24px
- Header (centered): uppercase label · H2 · sub
- 5 progress-bar items stacked, gap 36px
- Each item structure:
  - Top row: metric label (bold left) + change% badge (right, green bg)
  - Old bar row: red bar (width set per data) + "Before: X" label after
  - New bar row: green bar (width set per data) + "After: Y" label after
- Bars: height 14px, rounded 999px, bg lightly tinted (track), foreground colored
- Bar widths animate from 0% to target on scroll entry
- Width values come from CSS custom properties on each bar

=== ANIMATIONS (IntersectionObserver) ===
- On entry: each bar's width animates (transition .9s ease, with stagger 0.15s per item)
- Triggers via .visible class adding width
- prefers-reduced-motion: bars appear at final width instantly

=== MOBILE (≤768px) ===
- Item layout stays the same but smaller text
- Labels can wrap below bars

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V5 (Progress Bars · Data-Driven) base component.

— BRAND COLORS —
--bg:        #F0FDF4
--accent:    #16A34A
--old-color: #DC2626
--new-color: #16A34A
--bar-old:   rgba(220,38,38,0.35)
--bar-new:   rgba(22,163,74,0.55)
--text:      #14532D
--muted:     #4B5563
--border:    #D1FAE5

— FONTS —
Heading & Body Font: Plus Jakarta Sans (Google Fonts)

— COPY —
Label: THE NUMBERS DON'T LIE
H2:    Here's What the Data Shows.
Sub:   Across 500+ clients, the difference between those who used a system and those who didn't is staggering.

— PROGRESS BARS (Label · Change% · Before · After · old% · new%) —
Bar 1: Monthly Revenue           · +525% · $8K/mo     · $50K/mo  · 16%  · 100%
Bar 2: Weekly Hours Worked       · -63%  · 60 hrs/wk  · 22 hrs/wk · 100% · 37%
Bar 3: Sales Close Rate          · +200% · 1 in 10    · 1 in 3    · 10%  · 33%
Bar 4: Time to First $30K Month  · -78%  · 18+ months · 90 days   · 100% · 22%
Bar 5: Client Satisfaction Score · +94%  · 3.1 / 5.0  · 4.9 / 5.0 · 62%  · 98%`,
  },
  {
    id: "compare",
    number: "04f",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 6",
    description:
      "Single transform timeline — old card → arrow → new card per pair (warm agency). 4 transformation rows. Syne + Inter.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v6-thumb.webp",
    funnelTypes: ["Agency","Brand Coaching","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Warm cream bg (#FFF7ED)
- Container: max-width 1240px centered, padding 96px 24px
- Header (centered): uppercase label · H2 (Syne) · sub
- 4 transform rows stacked, gap 28px
- Each row: 3-cell grid (1fr auto 1fr, gap 24px, align-items center)
  - Old card: bg --old-bg, border 1px var(--old-border), rounded 14px, padding 22px
  - Arrow cell: bold → icon (24px, --arrow-color)
  - New card: bg --new-bg, border 1px var(--new-border), rounded 14px, padding 22px
- Card text: 16px line-height 1.55
- Old card text: muted dark
- New card text: emphasized dark

=== ANIMATIONS (IntersectionObserver) ===
- Old card slides from left, arrow fades, new card slides from right
- Staggered 0.15s per row
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Per row: old card on top, arrow rotated 90° centered, new card below
- Stack with smaller padding

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V6 (Transform Timeline · Warm Agency) base component.

— BRAND COLORS —
--bg:           #FFF7ED
--accent:       #EA580C
--old-color:    #DC2626
--new-color:    #16A34A
--arrow-color:  #EA580C
--text:         #1C1917
--muted:        #78716C
--border:       #FED7AA
--old-bg:       rgba(220,38,38,0.05)
--new-bg:       rgba(22,163,74,0.05)
--old-border:   rgba(220,38,38,0.25)
--new-border:   rgba(22,163,74,0.25)

— FONTS —
Heading Font: Syne (Google Fonts)
Body Font:    Inter (Google Fonts)

— COPY —
Label: THE TRANSFORMATION
H2:    Every Single Point of Pain Has a Flip Side.
Sub:   This is what the shift looks like in practice.

— TRANSFORM PAIRS (old → arrow → new) —
Pair 1:
  Old: Waking up dreading your inbox full of client demands
  New: Waking up excited to work with people you actually chose
Pair 2:
  Old: Saying yes to low-ticket clients because you need the money
  New: Turning down bad-fit clients because your pipeline is full
Pair 3:
  Old: Your revenue depending entirely on how hard you hustle
  New: Your revenue tied to a system that works whether you do or not
Pair 4:
  Old: Feeling like a fraud charging more than $2K for anything
  New: Confidently charging $10K–$25K and getting paid in full`,
  },
  {
    id: "compare",
    number: "04h",
    label: "BEFORE VS AFTER",
    title: "Before vs After Variation 8",
    description:
      "Full-width alternating row pairs (corporate). Sticky red/green column headers + 5 mirrored rows with subtle colored left borders. Manrope.",
    labelClass: labelClasses.compare,
    previewSrc: "/private/before-after-v8-thumb.webp",
    funnelTypes: ["Consulting","B2B","Executive Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Before vs After section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 05-before-after-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Clean white section bg
- Container: max-width 1180px centered, padding 96px 24px
- Header (centered): uppercase label · H2 · sub
- Comparison block:
  - Header row (sticky on scroll within section): 2 cells — "✗ Without the System" (red bold uppercase) | "✓ With the System" (green bold uppercase)
  - Header bg: --header-bg light gray with bottom border
  - 5 row pairs, each: 2-column grid 1fr/1fr, gap 0
  - LEFT cell: subtle red left border (3px), bg --old-row-bg, padding 22px 24px, text 16px
  - RIGHT cell: subtle green left border (3px), bg --new-row-bg, padding 22px 24px, text 16px
  - Alternating row bg (white / very light gray) for visual separation
  - Row hover: both cells highlight together (slightly stronger tint)

=== ANIMATIONS (IntersectionObserver) ===
- Rows fade in sequentially top to bottom (0.08s stagger)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Each row pair becomes a 2-line block: old item on top with red left border, new item below with green left border
- Thin horizontal line between old/new within the same pair
- Sticky header: hide on mobile, just inline at top

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Before vs After V8 (Alternating Rows · Corporate) base component.

— BRAND COLORS —
--bg:         #FFFFFF
--header-bg:  #F8FAFC
--old-row-bg: rgba(220,38,38,0.02)
--new-row-bg: rgba(22,163,74,0.02)
--old-color:  #DC2626
--new-color:  #16A34A
--accent:     #0F766E
--text:       #0F172A
--muted:      #64748B
--border:     #E2E8F0

— FONTS —
Heading & Body Font: Manrope (Google Fonts)

— COPY —
Label: A TALE OF TWO APPROACHES
H2:    The Gap Between Average and Exceptional Is Smaller Than You Think.
Sub:   It's not talent. It's not luck. It's not even hard work. It's the system underneath.

Column headers:
  Left:  ✗ Without the System
  Right: ✓ With the System

— ROW PAIRS (left = old, right = new) —
Row 1:
  Left:  Winging your sales calls and hoping for the best
  Right: 6-step process that converts 1 in 3 prospects
Row 2:
  Left:  Revenue fluctuates wildly month to month
  Right: Predictable pipeline with 90-day revenue visibility
Row 3:
  Left:  Undercharging because you fear losing the client
  Right: Premium pricing backed by bulletproof positioning
Row 4:
  Left:  Working IN your business 60 hours a week
  Right: Working ON your business 20 hours a week
Row 5:
  Left:  No clear path to your next revenue milestone
  Right: Step-by-step roadmap with weekly accountability`,
  },
  {
    id: "usp",
    number: "05a",
    label: "USP",
    title: "USP Variation 1",
    description:
      "Classic 3-column icon cards (clean corporate). Money/Process/Forever cards with colored icon blocks + stat pills. Inter, light bg.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v1-thumb.webp",
    funnelTypes: ["Corporate","B2B","Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section (Section 05 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why you and not someone else?" via 3 cards mapped to:
  Card 1 — Money/Result (quantified outcome)
  Card 2 — Process/Confidence (how it feels)
  Card 3 — Long-term/Forever (compounding value)

=== OUTPUT ===
File: 06-usp-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- White section bg (linear gradient to bg-alt at bottom)
- Container: max-width 1180px centered, padding 96px 24px
- Header (centered): uppercase accent label · H2 · sub
- 3 equal cards (grid-template-columns: repeat(3, 1fr), gap 24px)
- Each card: white bg, 1px border, rounded 16px, padding 32px, hover-lift + soft shadow
- Card content: 44px colored icon block (rounded 12px) + bold title + body paragraph + stat pill at bottom
- Stat pill: small light colored bg matching card theme, padding 8px 14px, rounded 999px

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up + translateY 16 → 0, staggered 0.1s each
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- 3 cards stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V1 (Classic 3-Column · Clean Corporate) base component.

— BRAND COLORS —
--bg:      #FFFFFF
--bg-alt:  #F7F8FA
--accent:  #2563EB
--card-1:  #2563EB
--card-2:  #D97706
--card-3:  #16A34A
--text:    #0E1116
--muted:   #4A5160
--border:  #E4E7EB

— FONTS —
Heading & Body Font: Inter (Google Fonts)

— COPY —
Label: WHY CLIENTS CHOOSE US
H2:    Not Another Coach. A Proven System.
Sub:   We don't sell hope. We deliver a repeatable framework backed by 500+ success stories.

— CARD 1 (Money/Result · blue) —
Icon:  coin
Title: Guaranteed Revenue Growth
Body:  81% of our clients cross $30K/mo within their first 90 days — or we keep working with them until they do. No exceptions. No fine print.
Stat:  $50K avg/mo by week 12

— CARD 2 (Process · amber) —
Icon:  route
Title: A System, Not Just Advice
Body:  Every week you follow a proven playbook — not guesswork. You'll always know exactly what to do next, and why it works.
Stat:  6-step framework, zero confusion

— CARD 3 (Forever · green) —
Icon:  infinity
Title: Skills That Compound Forever
Body:  What you build here doesn't stop when the program ends. The system, the clients, the confidence — they're yours to keep and scale.
Stat:  Clients still growing 2 years later`,
  },
  {
    id: "usp",
    number: "05b",
    label: "USP",
    title: "USP Variation 2",
    description:
      "Dark numbered pillars (premium high-ticket). 3 dark cards with big colored numbers + title + body + proof badge. Space Grotesk.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v2-thumb.webp",
    funnelTypes: ["High-Ticket Coaching","Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark section bg (#0D0D0D)
- Container: max-width 1200px centered, padding 100px 24px
- Header (centered): uppercase gold label · H2 · sub
- 3 dark pillar cards side-by-side (grid 3 cols, gap 24px)
- Each pillar: bg-card, 2px colored top border (matches pillar color), padding 36px 28px, rounded 12px
- Pillar content (top → bottom):
  - Large colored number (clamp 44-56px, Space Grotesk 700, letter-spacing -0.02em)
  - Title (22px bold)
  - Body paragraph (15px muted, line-height 1.6)
  - Proof badge at bottom (small pill, colored bg+text matching pillar)

=== ANIMATIONS (IntersectionObserver) ===
- Pillars slide up + fade, staggered 0.12s each
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Pillars stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V2 (Dark Numbered Pillars · High-Ticket) base component.

— BRAND COLORS —
--bg:      #0D0D0D
--bg-card: #1A1A1A
--accent:  #F5C842
--num-1:   #3B82F6
--num-2:   #F59E0B
--num-3:   #22C55E
--text:    #FFFFFF
--muted:   #9A9A9A
--border:  #2A2A2A

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: THE THREE PILLARS
H2:    Three Reasons Our Clients Win.
Sub:   While others are still figuring out the basics, our clients are already cashing the checks.

— PILLAR 01 (Money · blue) —
Number: 01
Title:  Speed to Revenue
Body:   Our onboarding process gets you earning faster than any program on the market. First client closed within 14 days — average.
Proof:  Avg first sale: 14 days

— PILLAR 02 (Process · amber) —
Number: 02
Title:  Done-With-You Execution
Body:   This isn't a course you watch alone at midnight. We build alongside you — weekly calls, real feedback, real accountability.
Proof:  Weekly live coaching included

— PILLAR 03 (Forever · green) —
Number: 03
Title:  Permanent Transformation
Body:   By the time you finish, you won't need us anymore — because you'll have internalized a system that works in any market, any economy.
Proof:  Skills last a lifetime`,
  },
  {
    id: "usp",
    number: "05c",
    label: "USP",
    title: "USP Variation 3",
    description:
      "Split — left headline/intro/CTA + right 3 compact horizontal cards stacked. Warm cream bg, Plus Jakarta Sans, approachable.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v3-thumb.webp",
    funnelTypes: ["Personal Brand","Coach"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Warm cream bg (#FFF8F3)
- Container: max-width 1200px centered, padding 96px 24px
- 2-column grid: 40% left / 60% right, gap 56px, align-items center
- LEFT:
  - Uppercase accent label
  - H2 (large bold) with an italic accent second-line ("We've Lived It.")
  - Body paragraph (muted, line-height 1.65)
  - CTA outlined orange pill
- RIGHT: 3 compact horizontal cards stacked, gap 16px
  - Each card: bg white, 1px border, rounded 14px, padding 22px 24px
  - Layout per card: 48px colored icon block left + (title + body) right
  - Title 18px bold + body 14.5px muted

=== ANIMATIONS (IntersectionObserver) ===
- Left content fades in from left
- Right cards slide in from right staggered 0.12s each
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks to single column
- Left content first, cards below

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V3 (Split + Stacked Cards · Warm Personal) base component.

— BRAND COLORS —
--bg:      #FFF8F3
--accent:  #EA580C
--text:    #1C1917
--muted:   #78716C
--border:  #FED7AA
--card-1:  #3B82F6
--card-2:  #F59E0B
--card-3:  #22C55E

— FONTS —
Heading & Body Font: Plus Jakarta Sans (Google Fonts)

— LEFT COLUMN —
Label:       THE HONEST DIFFERENCE
H2:          We Don't Just Teach It.
H2 Accent:   We've Lived It.
Body:        Every framework we teach was born from real failures and real wins — not theory. That's why it works for our clients the way it never worked with anyone else.
CTA:         See How It Works →

— RIGHT CARDS —
Card 1 (blue · Result):
  Icon:  coin
  Title: Quantified Outcomes
  Body:  Average client adds $2,400/mo in new revenue within 30 days.

Card 2 (amber · Process):
  Icon:  route
  Title: Hands-On Partnership
  Body:  You're never doing this alone. Real humans, real feedback, real accountability every week.

Card 3 (green · Forever):
  Icon:  infinity
  Title: Yours to Keep
  Body:  The system lives in your business long after the program ends.`,
  },
  {
    id: "usp",
    number: "05d",
    label: "USP",
    title: "USP Variation 4",
    description:
      "3 large stat cards (corporate/consulting). Each card features a massive count-up number + title + body. Manrope, data-driven.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v4-thumb.webp",
    funnelTypes: ["Consulting","Finance","Corporate"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light gray bg (#F8FAFC)
- Container: max-width 1180px centered, padding 96px 24px
- Header (centered): uppercase teal label · H2 · sub
- 3 white stat cards (grid 3 cols, gap 28px)
- Each card: bg --card-bg white, 1px border, rounded 18px, 3px top border (theme color), padding 40px 32px, text-align center
- Card content: huge count-up number (clamp 48-72px bold, theme color) + title (20px bold) + body (15px muted)
- Hover: card lifts + shadow deepens

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up staggered
- Numbers count up from 0 → target on scroll entry (1.4s ease)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V4 (Big Stat Cards · Corporate Data-Driven) base component.

— BRAND COLORS —
--bg:       #F8FAFC
--accent:   #0F766E
--stat-1:   #0F766E
--stat-2:   #D97706
--stat-3:   #7C3AED
--text:     #0F172A
--muted:    #64748B
--border:   #E2E8F0
--card-bg:  #FFFFFF

— FONTS —
Heading & Body Font: Manrope (Google Fonts)

— COPY —
Label: THE NUMBERS BEHIND THE METHOD
H2:    We Measure Everything. So You Don't Have To.
Sub:   Three metrics that define why our approach works — and why others don't come close.

— STAT 1 (teal · Money) —
Big number: $50K
Title:      Monthly Revenue Target
Body:       The income milestone our program is engineered to hit — with a documented path to get there in 90 days or less.

— STAT 2 (amber · Process) —
Big number: 81%
Title:      Client Success Rate
Body:       Of clients who complete the program hit their stated revenue goal within the first quarter. Tracked and verified.

— STAT 3 (purple · Forever) —
Big number: 14x
Title:      Average ROI
Body:       For every dollar invested in the program, our clients report an average 14x return within their first year.`,
  },
  {
    id: "usp",
    number: "05e",
    label: "USP",
    title: "USP Variation 5",
    description:
      "Overlapping gradient accent cards (dark neon premium SaaS). 3 cards with colored gradient bg + border + stat badge. Outfit.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v5-thumb.webp",
    funnelTypes: ["SaaS","Tech Coaching","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Very dark bg (#0F0F23)
- Container: max-width 1200px centered, padding 96px 24px
- Header (centered): uppercase accent label · H2 · sub
- 3 cards side-by-side (grid 3 cols, gap 24px)
- Each card: gradient bg (linear-gradient from theme-color/15 → theme-color/03), 1px colored border, rounded 18px, padding 32px 28px
- Card content: large theme-colored icon (32px) at top + title (20px bold white) + body (15px muted) + stat badge at bottom (pill, matching color)
- Hover: glow intensifies (box-shadow expand in card color)

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade + scale 0.95 → 1, staggered 0.15s
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V5 (Gradient Accent Cards · Dark Neon SaaS) base component.

— BRAND COLORS —
--bg:           #0F0F23
--accent:       #7C3AED
--card-1-from:  rgba(59,130,246,0.15)
--card-1-to:    rgba(59,130,246,0.03)
--card-2-from:  rgba(245,158,11,0.15)
--card-2-to:    rgba(245,158,11,0.03)
--card-3-from:  rgba(34,197,94,0.15)
--card-3-to:    rgba(34,197,94,0.03)
--text:         #FFFFFF
--muted:        #9AA0B0
--border-1:     rgba(59,130,246,0.35)
--border-2:     rgba(245,158,11,0.35)
--border-3:     rgba(34,197,94,0.35)

— FONTS —
Heading & Body Font: Outfit (Google Fonts)

— COPY —
Label: YOUR UNFAIR ADVANTAGE
H2:    Three Things No One Else Is Offering.
Sub:   We searched. We compared. We built what was missing.

— CARD 1 (blue · Money) —
Icon:  coin
Title: Revenue You Can Predict
Body:  Stop hoping for good months. Start engineering them. Our pipeline system creates revenue visibility 90 days out.
Stat:  $50K avg/mo

— CARD 2 (amber · Process) —
Icon:  route
Title: Clarity on Every Step
Body:  No more paralysis. No more rabbit holes. A clear weekly action plan mapped to your specific situation.
Stat:  Zero guesswork

— CARD 3 (green · Forever) —
Icon:  infinity
Title: A Business That Outlasts You
Body:  We build systems, not habits. What we install runs whether you show up or not — and grows while you sleep.
Stat:  Scalable forever`,
  },
  {
    id: "usp",
    number: "05f",
    label: "USP",
    title: "USP Variation 6",
    description:
      "Full dark neon glow cards (high-performance coaching). 3 cards with massive count-up numbers + radial box-shadow glow. Syne + Inter.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v6-thumb.webp",
    funnelTypes: ["Performance Coaching","Premium","High-Ticket"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Very dark purple-black bg (#050510)
- Container: max-width 1200px centered, padding 100px 24px
- Header (centered): uppercase accent (--accent purple) label · H2 (Syne) · sub
- 3 cards side-by-side (grid 3 cols, gap 28px)
- Each card: dark bg, 1px theme-colored border, rounded 18px, padding 36px 32px, text-align center
- Card content: massive count-up number (clamp 52-72px Syne 700, theme color) + title (Syne 22px bold) + body (Inter 15px muted line-height 1.6)
- Each card has CSS box-shadow glow behind in theme color (50px blur, 0.25 opacity)
- Glow pulses once on entry (box-shadow expand and settle)

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade + scale 0.95 → 1, staggered 0.15s
- Numbers count up from 0 → target (1.4s ease)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V6 (Neon Glow Cards · High-Performance) base component.

— BRAND COLORS —
--bg:       #050510
--accent:   #A855F7
--glow-1:   rgba(59,130,246,0.25)
--glow-2:   rgba(245,158,11,0.25)
--glow-3:   rgba(34,197,94,0.25)
--num-1:    #3B82F6
--num-2:    #F59E0B
--num-3:    #22C55E
--text:     #FFFFFF
--muted:    #8B8BA0
--border-1: rgba(59,130,246,0.3)
--border-2: rgba(245,158,11,0.3)
--border-3: rgba(34,197,94,0.3)

— FONTS —
Heading Font: Syne (Google Fonts)
Body Font:    Inter (Google Fonts)

— COPY —
Label: THE ADVANTAGE
H2:    Three Numbers That Say Everything.
Sub:   We don't ask you to trust us. We show you the receipts.

— GLOW CARD 1 (blue · Money) —
Big number: $50K
Title:      Average Monthly Revenue
Body:       By the end of week 12, the average client in this program is earning $50K/mo or more. Not a projection. An average.

— GLOW CARD 2 (amber · Process) —
Big number: 81%
Title:      Client Success Rate
Body:       8 in 10 clients who complete the program hit their stated income goal within 90 days. We track every single one.

— GLOW CARD 3 (green · Forever) —
Big number: 90
Title:      Days to Full Results
Body:       Not 6 months. Not a year. 90 days from onboarding to a business that runs itself and pays you like one.`,
  },
  {
    id: "usp",
    number: "05g",
    label: "USP",
    title: "USP Variation 7",
    description:
      "Centered manifesto headline + 3 colored pill bullets (editorial premium). DM Serif Display + DM Sans, authoritative.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v7-thumb.webp",
    funnelTypes: ["Editorial Brand","Premium Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light gray section bg (#FAFAFA)
- Container: max-width 880px centered, padding 100px 24px, text-align center
- Uppercase accent label
- H2 with serif font (DM Serif Display, clamp 36-56px), 2 lines, last line in accent green italic
- Body paragraph (DM Sans 17px muted line-height 1.7, max-width 640px centered, margin-top 24px)
- Below body: 3 horizontal pills in a row (gap 14px, justify-center, flex-wrap)
- Each pill: rounded 999px, padding 12px 22px, colored bg + 1px colored border, icon + text inline
- Pill 1 blue, Pill 2 amber, Pill 3 green

=== ANIMATIONS (IntersectionObserver) ===
- Headline fades up, body fades up after
- Pills fade up staggered 0.12s each
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Pills stack to column (justify-center, gap 12px)

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V7 (Centered Manifesto + Pills · Editorial) base component.

— BRAND COLORS —
--bg:           #FAFAFA
--accent:       #16A34A
--pill-1-bg:    #EFF6FF
--pill-1-border:#BFDBFE
--pill-1-color: #1D4ED8
--pill-2-bg:    #FFFBEB
--pill-2-border:#FDE68A
--pill-2-color: #B45309
--pill-3-bg:    #F0FDF4
--pill-3-border:#BBF7D0
--pill-3-color: #15803D
--text:         #111827
--muted:        #6B7280
--border:       #E5E7EB

— FONTS —
Heading Font: DM Serif Display (Google Fonts)
Body Font:    DM Sans (Google Fonts)

— COPY —
Label:     THE REAL DIFFERENCE
H2:        We Built the Thing We Wished Existed.
H2 Accent: Now It's Yours.
Body:      After years of buying programs that promised everything and delivered templates, we rebuilt the entire experience from the ground up. No fluff. No filler. Just the exact moves that create real results — mapped to your specific situation.

— PILLS —
Pill 1 (blue · coin):     Revenue you can predict
Pill 2 (amber · route):   A process that actually fits
Pill 3 (green · infinity): Skills that compound for life`,
  },
  {
    id: "usp",
    number: "05h",
    label: "USP",
    title: "USP Variation 8",
    description:
      "Tabbed USP with detail panel (friendly coaching). 3 clickable tabs + detail panel below with big number + title + body. Nunito.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v8-thumb.webp",
    funnelTypes: ["Coaching","Course","Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- White section bg
- Container: max-width 1100px centered, padding 96px 32px
- Header (centered): uppercase accent label · H2 · sub
- Tab bar (3 buttons in a row, gap 12px, justify-center, margin 32px 0 28px)
  - Each tab: icon + label, padding 12px 24px, rounded 999px, font-weight 700
  - Active: --tab-active (indigo) bg + white text
  - Inactive: light gray bg + muted text, hover slightly darker
- Detail panel below: --panel-bg light indigo, rounded 20px, padding 48px 40px
  - Grid 2 cols: BIG NUMBER (Nunito clamp 60-96px, indigo) left + (TITLE + BODY) right
- JS: click tab → switch active class + show that tab's panel content

=== ANIMATIONS ===
- Tabs slide down from top
- Panel fades in on tab switch (.25s)
- Big number count-up on first activation
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Tab bar scrolls horizontally (overflow-x auto)
- Panel grid becomes single column (number on top, text below)

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V8 (Tabbed USP · Friendly Coaching) base component.

— BRAND COLORS —
--bg:         #FFFFFF
--accent:     #4F46E5
--tab-active: #4F46E5
--text:       #0F172A
--muted:      #64748B
--border:     #E2E8F0
--panel-bg:   #F8FAFF

— FONTS —
Heading & Body Font: Nunito (Google Fonts)

— COPY —
Label: THREE CORE ADVANTAGES
H2:    Pick the One That Matters Most to You.
Sub:   They all come included — but each one alone is worth the investment.

— TAB 1 (coin · Money) —
Tab label:        Revenue
Panel big number: $50K
Panel title:      Predictable $50K Months
Panel body:       We engineer your revenue, not just your mindset. The program is built around one outcome — getting you to $50K/mo — and every module maps to that goal.

— TAB 2 (route · Process) —
Tab label:        Clarity
Panel big number: 6 Steps
Panel title:      A Process That Removes All Doubt
Panel body:       Six steps. Every week. You always know exactly what to do, what to say, and who to talk to. No confusion. No second-guessing.

— TAB 3 (infinity · Forever) —
Tab label:        Legacy
Panel big number: Forever
Panel title:      A Business That Outlives the Program
Panel body:       When the 12 weeks end, the business doesn't. We build infrastructure, not just skills — so everything keeps growing whether you're working or not.`,
  },
  {
    id: "usp",
    number: "05i",
    label: "USP",
    title: "USP Variation 9",
    description:
      "Staggered offset cards with cascading waterfall layout (dark bold agency). 3 cards each offset down further than the last. Space Grotesk.",
    labelClass: labelClasses.usp,
    previewSrc: "/private/usp-v9-thumb.webp",
    funnelTypes: ["Agency","Bold Brand","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium USP section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 06-usp-11.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark navy bg (#0A0A1A)
- Container: max-width 1200px centered, padding 100px 24px
- Header (centered or left): uppercase amber label · H2 · sub
- 3 cards side-by-side with staggered vertical offsets (cascading waterfall):
  - Card 1: margin-top 0
  - Card 2: margin-top 32px
  - Card 3: margin-top 64px
- Each card: --card-bg, 3px solid colored top border, rounded 16px, padding 32px 28px
- Card content: large theme-colored icon (48px) + title (22px bold) + body (15px muted line-height 1.6) + stat pill at bottom
- Subtle dashed connector line between cards (decorative SVG or pseudo-element)

=== ANIMATIONS (IntersectionObserver) ===
- Cards fly in from right (translateX 30 → 0) + fade, staggered 0.2s
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Remove staggered offsets (all cards margin-top 0)
- Stack to single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to the USP V9 (Staggered Offset Cards · Dark Bold Agency) base component.

— BRAND COLORS —
--bg:       #0A0A1A
--card-bg:  #12122A
--accent:   #F59E0B
--card-1:   #3B82F6
--card-2:   #F59E0B
--card-3:   #22C55E
--text:     #FFFFFF
--muted:    #8B8BA0
--border:   #1E1E3A

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: WHY WE WIN
H2:    The Three Layers of Our Edge.
Sub:   Stack them together and you get something no competitor can replicate.

— CARD 1 (blue · offset 0) —
Icon:  coin
Title: The Revenue Engine
Body:  A client acquisition system that generates $20K–$50K/mo without paid ads, cold email, or posting 3x a day.
Stat:  $50K avg/mo

— CARD 2 (amber · offset 32px) —
Icon:  route
Title: The Clarity Machine
Body:  A week-by-week execution map so you always know the single highest-leverage action to take right now.
Stat:  Zero confusion

— CARD 3 (green · offset 64px) —
Icon:  infinity
Title: The Compounding Asset
Body:  Every client you close, every system you build, every skill you acquire — it compounds into a business that runs without you.
Stat:  Grows forever`,
  },
  {
    id: "offer",
    number: "06a",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 1",
    description:
      "Classic centered offer box (clean corporate). 6 ✓ items + 2 ★ bonuses + total value + strikethrough + price + CTA. Inter, light bg.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v1-thumb.webp",
    funnelTypes: ["Corporate","Coaching","B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section (Section 06 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What exactly do I get and is it worth it?"

=== OUTPUT ===
File: 07-offer-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light gray section bg
- Container: max-width 760px centered, padding 96px 24px
- Header (centered): uppercase accent label · H2 · sub
- Offer box: white bg, 2px solid accent border, rounded 16px, padding 40px 36px, large drop shadow
- Box title (top of box, centered, bold)
- Offer stack items (6, with ✓):
  - Each row: ✓ icon left + name middle + value right (right-aligned)
  - Dashed border-bottom between items, padding 12px 0
- Bonus items (2, with ★):
  - Same row layout, bonus accent color
- Total value row: solid top border, bold, accent color value
- Price block (centered):
  - Strikethrough regular price (muted, line-through)
  - Today's price: massive number (clamp 48-72px bold, accent)
  - Payment plan text below
- CTA button: full width, accent pill, white bold uppercase
- Trust line: small muted center below CTA

=== ANIMATIONS ===
- Box: fade + scale 0.97 → 1 on entry
- Price count-up on scroll
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Box padding reduces
- Item rows wrap (name top, value below right-aligned)

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V1 (Classic Centered Box · Clean Corporate) base component.

— BRAND COLORS —
--bg:           #F7F8FA
--accent:       #2563EB
--box-border:   #2563EB
--text:         #0E1116
--muted:        #4A5160
--check:        #16A34A
--bonus:        #D97706
--price-color:  #2563EB
--border:       #E4E7EB

— FONTS —
Heading & Body Font: Inter (Google Fonts)

— COPY —
Label: YOUR COMPLETE INVESTMENT
H2:    Everything You Need to Hit $50K/mo — In One Place.
Sub:   No upsells. No hidden fees. Everything listed below is included the moment you enroll.

— BOX TITLE —
Here's everything you get when you enroll today:

— OFFER STACK (✓) —
✓ 12-Week Live Coaching Program — $4,997
✓ The Revenue Engine Playbook™ (PDF) — $997
✓ 6-Step Sales Framework (Video Series) — $797
✓ Weekly Group Accountability Calls — $1,997
✓ Private Slack Community Access — $497
✓ 90-Day Action Plan Template — $297

— BONUSES (★) —
★ Fast-Action Bonus: DFY Email Scripts — $297
★ Fast-Action Bonus: Client Avatar Workbook — $197

— PRICING —
Total Value:    $10,076
Strikethrough:  $9,997
Today's Price:  $4,997
Plan:           or 3 payments of $1,997

— CTA & TRUST —
CTA:   YES — Enroll Me Now →
Trust: Join 500+ clients already inside the program`,
  },
  {
    id: "offer",
    number: "06b",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 2",
    description:
      "Dark premium offer box with gold glow + urgency banner + green ✓ + amber ★. Space Grotesk, high-ticket exclusive.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v2-thumb.webp",
    funnelTypes: ["High-Ticket","Mastermind","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark section bg (#0A0A0A)
- Container: max-width 760px centered, padding 100px 24px
- Header (centered): uppercase gold label · H2 · sub
- Offer box: var(--box-bg) dark card, 2px gold border, rounded 18px, padding 0 (so urgency banner sits flush)
- Urgency banner (top of box): red tint bg + bold red text "CLOSES FRIDAY — 8 SEATS LEFT", padding 14px, full-width inside box top
- Below banner: padding 40px 36px
  - Box title (white bold)
  - 6 ✓ items (green check + white name + gold value, dashed border between)
  - 3 ★ bonuses (gold star + amber text + amber value)
  - Total value row (gold bold)
  - Price block: strikethrough muted + massive gold today's price (clamp 52-72px) + payment plan
  - Gold CTA pill (full width, dark text)
  - Trust line below
- Box drop shadow: gold glow (rgba 245,200,66,0.18 at 40px blur)

=== ANIMATIONS ===
- Box slides up + fade on entry
- Gold border pulses once on entry
- Price count-up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Box padding reduces
- Item rows wrap

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V2 (Dark Premium Box · High-Ticket) base component.

— BRAND COLORS —
--bg:           #0A0A0A
--box-bg:       #111111
--box-border:   rgba(245,200,66,0.4)
--accent:       #F5C842
--text:         #FFFFFF
--muted:        #9A9A9A
--check:        #22C55E
--bonus:        #F59E0B
--price-color:  #F5C842
--border:       #222222
--urgency-bg:   rgba(239,68,68,0.15)
--urgency-text: #EF4444

— FONTS —
Heading & Body Font: Space Grotesk (Google Fonts)

— COPY —
Label: LIMITED ENROLLMENT
H2:    The Agency Accelerator Program™
Sub:   Accepting 30 clients this cohort. 22 seats already taken.

— URGENCY BADGE —
CLOSES FRIDAY — 8 SEATS LEFT

— BOX TITLE —
Everything included when you join today:

— OFFER STACK (✓) —
✓ Agency Accelerator 12-Week Program — $6,997
✓ Done-With-You Funnel Buildout — $2,997
✓ Weekly 1:1 Strategy Calls (12 sessions) — $3,600
✓ The Client Acquisition System™ — $1,997
✓ Agency Hiring & Delegation Playbook — $997
✓ Lifetime Access to All Future Updates — $997

— BONUSES (★) —
★ Bonus: Agency Contract Templates Pack — $497
★ Bonus: 30-Day Revenue Sprint Plan — $297
★ Bonus: Private Mastermind Access — $1,997

— PRICING —
Total Value:    $20,376
Strikethrough:  $19,997
Today's Price:  $9,997
Plan:           or 3 payments of $3,997

— CTA & TRUST —
CTA:   CLAIM MY SPOT NOW →
Trust: Secure checkout · 30-day money-back guarantee`,
  },
  {
    id: "offer",
    number: "06c",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 3",
    description:
      "Split layout — offer stack left + sticky price column right. Warm cream bg, Plus Jakarta Sans, approachable coaching feel.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v3-thumb.webp",
    funnelTypes: ["Coaching","Personal Brand","Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Warm cream bg (#FFF8F3)
- Container: max-width 1200px centered, padding 96px 24px
- Header (centered): uppercase orange label · H2 · sub
- 2-column grid: 60% left (offer stack) / 40% right (sticky price), gap 48px, align-items start
- LEFT — offer stack:
  - Section header (bold): "Core Program"
  - 5 ✓ items (green check + name + value right-aligned, dashed border between)
  - Bonus header (gold): "★ Fast-Action Bonuses"
  - 2 ★ items (amber)
- RIGHT — price column (position: sticky, top: 24px):
  - White card, 1px orange border, rounded 16px, padding 32px
  - Total value muted (line-height)
  - Strikethrough regular price
  - Massive orange today's price (clamp 48-64px bold)
  - Payment plan
  - Orange CTA pill (full width)
  - Guarantee seal CSS badge (small circular SVG-like badge)
  - Trust line muted

=== ANIMATIONS ===
- Left fades in
- Right price slides from right
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks (offer first, price below)
- Sticky removed on mobile

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V3 (Split Stack + Sticky Price · Warm Coaching) base component.

— BRAND COLORS —
--bg:           #FFF8F3
--accent:       #EA580C
--text:         #1C1917
--muted:        #78716C
--check:        #16A34A
--bonus:        #D97706
--price-color:  #EA580C
--border:       #FED7AA
--divider:      #E7E5E4

— FONTS —
Heading & Body Font: Plus Jakarta Sans (Google Fonts)

— COPY —
Label: WHAT'S INCLUDED
H2:    The Complete Coaching Package.
Sub:   No piece of this works without the others — that's why we include everything.

— CORE PROGRAM (✓) —
✓ The Signature 12-Week Coaching Program — $3,997
✓ Weekly Group Coaching Calls — $1,997
✓ Private Community & Peer Accountability — $997
✓ The Complete Marketing Playbook™ — $997
✓ Lifetime Portal Access — $497

— FAST-ACTION BONUSES (★) —
★ Bonus: Content Calendar & Scripts Pack — $297
★ Bonus: Client Onboarding Template Suite — $197

— PRICE COLUMN —
Total Value:    $8,979
Strikethrough:  $7,997
Today's Price:  $3,997
Plan:           or 3 × $1,497
CTA:            Get Instant Access →
Trust:          30-day guarantee included`,
  },
  {
    id: "offer",
    number: "06d",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 4",
    description:
      "3-tier pricing plans (Self-Study · Group · VIP) with 'Most Popular' badge on middle tier. Manrope, modern SaaS.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v4-thumb.webp",
    funnelTypes: ["SaaS","Course","Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Light gray bg (#F8FAFC)
- Container: max-width 1200px centered, padding 96px 24px
- Header (centered): uppercase indigo label · H2 · sub
- 3 plan cards in a grid (grid 3 cols, gap 24px, align-items start)
- Each plan card: white bg, 1px border, rounded 18px, padding 36px 28px, hover-lift
  - Plan label (uppercase, plan color)
  - Price (large bold)
  - 3-5 ✓ items (each: green check + text)
  - Optional ★ bonuses for premium tier
  - CTA button (plan colored, full width)
  - Note muted (small italic below)
- Middle plan (Group Coaching) is highlighted:
  - Indigo border (2px), slightly elevated shadow, sits 8px higher
  - "MOST POPULAR" badge: indigo pill at top of card (absolute positioned)

=== ANIMATIONS ===
- Plans fan in from bottom, staggered 0.1s
- Middle plan: gentle highlight pulse once on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack to single column
- Popular plan first

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V4 (3-Tier Plans · Modern SaaS) base component.

— BRAND COLORS —
--bg:           #F8FAFC
--accent:       #4F46E5
--plan-1-color: #64748B
--plan-2-color: #4F46E5
--plan-3-color: #7C3AED
--text:         #0F172A
--muted:        #64748B
--check:        #16A34A
--border:       #E2E8F0
--popular-bg:   #EEF2FF

— FONTS —
Heading & Body Font: Manrope (Google Fonts)

— COPY —
Label: CHOOSE YOUR PATH
H2:    Three Ways to Work Together.
Sub:   Every option includes the core framework. Choose the level of support that fits where you are.

— PLAN 1 · SELF-STUDY — $997 —
✓ Core 12-Week Video Curriculum
✓ The Revenue Playbook™ PDF
✓ Private Community Access
CTA:  Start Self-Study →
Note: Best if you prefer to go at your own pace

— PLAN 2 · GROUP COACHING — $2,997 (POPULAR) —
Badge: MOST POPULAR
✓ Everything in Self-Study
✓ Weekly Group Coaching Calls
✓ Direct Slack Access to Coach
✓ Monthly Hot-Seat Sessions
★ Bonus: DFY Email Templates ($297)
CTA:  Join the Group →
Note: Best for accountability + community

— PLAN 3 · VIP PRIVATE — $9,997 —
✓ Everything in Group Coaching
✓ Weekly 1:1 Private Coaching Calls
✓ Done-With-You Funnel Build
✓ Personal Revenue Strategy Session
★ Bonus: All Templates & Playbooks ($994)
★ Bonus: 6-Month Extended Support
CTA:  Apply for VIP →
Note: Best for fastest results`,
  },
  {
    id: "offer",
    number: "06e",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 5",
    description:
      "Offer box + 2 social-proof review cards (split layout). DM Sans, fresh health/wellness · teal accent · 5-star reviews.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v5-thumb.webp",
    funnelTypes: ["Wellness","Health Coaching","Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- White section bg
- Container: max-width 1200px centered, padding 96px 24px
- Header (centered): uppercase teal label · H2 · sub
- 2-column grid: 58% left (offer box) / 42% right (review cards), gap 40px, align-items start
- LEFT — offer box: white card, 2px teal border, rounded 16px, padding 32px
  - Title bold
  - 5 ✓ items (teal check + name + value)
  - 2 ★ bonuses (gold star + amber text)
  - Total value
  - Massive teal price (clamp 44-60px)
  - Plan + teal CTA pill (full width)
- RIGHT — 2 stacked review cards (gap 16px)
  - Each card: light gray bg, rounded 14px, padding 24px, subtle shadow
  - 5 gold stars (★★★★★) row
  - Italic quote (muted, line-height 1.5)
  - Avatar (32px colored circle with initials) + bold name + small muted location

=== ANIMATIONS ===
- Offer slides in from left
- Reviews stagger in from right
- Price count-up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Grid stacks single column (offer first)

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V5 (Offer + Social Proof · Health/Wellness) base component.

— BRAND COLORS —
--bg:           #FFFFFF
--accent:       #0F766E
--box-border:   #0F766E
--text:         #0F172A
--muted:        #64748B
--check:        #0F766E
--bonus:        #D97706
--price-color:  #0F766E
--star-color:   #F59E0B
--border:       #E2E8F0

— FONTS —
Heading & Body Font: DM Sans (Google Fonts)

— COPY —
Label: ENROLL TODAY
H2:    Join 500+ Clients Who Made This Decision.
Sub:   Here's exactly what you're getting — and what others say about it.

— OFFER BOX TITLE —
The Complete Transformation Package

— OFFER STACK (✓) —
✓ 12-Week Hormone Reset Protocol — $2,997
✓ Personalized Nutrition Framework — $997
✓ Weekly Live Q&A with Coach — $1,997
✓ The Supplement & Lab Guide — $297
✓ Progress Tracking Dashboard — $197

— BONUSES (★) —
★ Bonus: The Recipe & Meal Prep Bundle — $197
★ Bonus: Stress & Sleep Reset Guide — $97

— PRICING —
Total Value:   $6,779
Today's Price: $1,997
Plan:          or 2 × $1,097
CTA:           Start My Transformation →

— REVIEWS (★★★★★) —
Review 1:
  Quote: "Down 24 lbs in 8 weeks. My doctor took me off 2 medications."
  Name:  Sarah M., 47 — Phoenix, AZ
Review 2:
  Quote: "I've tried everything. This is the first thing that actually worked for my hormones."
  Name:  Jennifer K., 52 — Austin, TX`,
  },
  {
    id: "offer",
    number: "06f",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 6",
    description:
      "Accordion-style core + bonus reveal (dark neon). Clickable collapsible sections with purple price reveal. Outfit, premium SaaS.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v6-thumb.webp",
    funnelTypes: ["SaaS","Tech Coaching","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark navy bg (#0D0F1A)
- Container: max-width 760px centered, padding 100px 24px
- Header (centered): uppercase purple label · H2 · sub
- 2 accordion sections (both open by default), gap 16px:
  - Core Program section: dark card bg, 1px border var(--border)
    - Header (clickable): "Core Program" left + "$3,285 value" right + chevron
    - Body (open by default): 3 ✓ items (green check + name + value right-aligned, dashed border between)
  - Bonus section: bonus tint bg + amber border
    - Header: "★ Fast-Action Bonuses (expires soon)" left + "$591 value" right + chevron
    - Body: 3 ★ items (amber)
- Click header → toggle open/closed (smooth max-height transition)
- Chevron rotates 180° when open
- Below sections — price reveal block (centered, margin-top 32px):
  - Strikethrough total
  - "Your price today:" small muted
  - Massive purple price (clamp 56-80px) with subtle purple glow
  - Payment plan
  - Purple gradient CTA pill (full width)
  - Trust line muted

=== ANIMATIONS ===
- Sections slide up + fade on entry
- Price block fades in last
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Padding reduces
- Accordion behavior same

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V6 (Accordion Reveal · Dark Neon) base component.

— BRAND COLORS —
--bg:           #0D0F1A
--core-bg:      #131520
--bonus-bg:     rgba(245,158,11,0.05)
--bonus-border: rgba(245,158,11,0.25)
--accent:       #7C3AED
--text:         #FFFFFF
--muted:        #9AA0B0
--check:        #22C55E
--bonus:        #F59E0B
--price-color:  #A855F7
--border:       #1E2130

— FONTS —
Heading & Body Font: Outfit (Google Fonts)

— COPY —
Label: THE COMPLETE PACKAGE
H2:    Everything. No Exceptions.
Sub:   Every tool, every framework, every call — included.

— CORE PROGRAM ($3,285 value) —
✓ The Full 12-Week Curriculum — $1,997
✓ Weekly Live Group Calls — $997
✓ Private Members Community — $297

— FAST-ACTION BONUSES ($591 value) —
★ The Lead Generation Swipe File — $297
★ 90-Day Content Calendar — $197
★ The Pricing & Packaging Guide — $97

— PRICE REVEAL —
Strikethrough:  $3,876
Today's Price:  $1,997
Plan:           or 3 × $797
CTA:            GET INSTANT ACCESS →
Trust:          30-day full refund · Cancel anytime`,
  },
  {
    id: "offer",
    number: "06g",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 7",
    description:
      "Us vs competitors comparison table (fresh green wellness). 7 rows comparing features and prices. Nunito.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v7-thumb.webp",
    funnelTypes: ["Wellness","Coaching","Consulting"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Fresh light green bg (#F0FDF4)
- Container: max-width 980px centered, padding 96px 24px
- Header (centered): uppercase green label · H2 · sub
- Comparison table:
  - 3 columns: Feature (left, 50%) · US ✓ (25%, green) · Others ✗ (25%, red)
  - Header row: light green bg, bold
  - 7 data rows alternating bg (white / very-light-green)
  - "US" column: green ✓ icon, bold green text (or green checkmark + brief value)
  - "Others" column: red ✗ icon, muted
  - Price row: highlighted bg, bold
- Below table (centered, padding-top 48px):
  - H3 (large bold green)
  - Sub paragraph muted
  - Green pill CTA
  - Trust line muted

=== ANIMATIONS ===
- Table rows fade in top to bottom (staggered 0.08s)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Table allows horizontal scroll
- CTA stays centered

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V7 (Us vs Competitors · Fresh Wellness) base component.

— BRAND COLORS —
--bg:           #F0FDF4
--accent:       #16A34A
--us-color:     #16A34A
--them-color:   #DC2626
--text:         #14532D
--muted:        #4B5563
--border:       #D1FAE5
--table-header: #DCFCE7
--price-color:  #16A34A

— FONTS —
Heading & Body Font: Nunito (Google Fonts)

— COPY —
Label: HOW WE COMPARE
H2:    More Value. Better Results. Lower Investment.
Sub:   We've done the research so you don't have to. Here's how we stack up against the alternatives.

— TABLE HEADERS —
Feature | US ✓ | Others ✗

— ROWS —
Personalized protocol (not generic)        | ✓ | ✗
Weekly live coaching calls                 | ✓ | ✗
Private accountability community           | ✓ | ✗
Hormone-first nutrition approach           | ✓ | ✗
90-day results guarantee                   | ✓ | ✗
Ongoing support after program ends         | ✓ | ✗
Price                                       | $1,997 | $3,000–$15,000+

— BELOW TABLE —
H3:    The choice is clear.
Sub:   Half the price. Twice the support. Proven results.
CTA:   Choose Better →
Trust: 500+ clients transformed`,
  },
  {
    id: "offer",
    number: "06h",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 8",
    description:
      "Floating white offer card on dark navy bg with urgency badge + gold CTA. Space Grotesk + Inter, high-converting.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v8-thumb.webp",
    funnelTypes: ["High-Ticket","Agency","Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Dark navy section bg (#07091A) with subtle radial gradient
- Container: max-width 820px centered, padding 100px 24px
- Section header (centered, white text):
  - Uppercase gold label · H2 (Space Grotesk) · sub
- Floating white offer card below header:
  - max-width 560px centered, bg white, rounded 20px, padding 36px, MASSIVE drop shadow (60px blur)
  - Urgency badge (top-right corner, absolute): red pill "CLOSES FRIDAY", subtle pulse
  - Card title bold dark
  - 5 ✓ items (green check + dark name + dark value right-aligned)
  - 2 ★ bonuses (gold star + amber name + amber value)
  - Total value muted
  - Strikethrough regular price
  - Indigo today's price (clamp 48-64px bold)
  - Payment plan
  - GOLD CTA pill (full width of card, dark text bold)
  - Trust line muted

=== ANIMATIONS ===
- Dark section header fades in
- White card floats up from bottom + scale 0.97 → 1
- Urgency badge pulses gently (2.4s loop)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Card padding reduces
- Item rows wrap

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V8 (Floating Card · Bold Dark) base component.

— BRAND COLORS —
--bg:           #07091A
--card-bg:      #FFFFFF
--accent:       #F5C842
--text-dark:    #0F172A
--text-light:   #FFFFFF
--muted:        #9AA0B0
--check:        #16A34A
--bonus:        #D97706
--price-color:  #4F46E5
--urgency-bg:   rgba(239,68,68,0.15)
--border:       rgba(255,255,255,0.08)

— FONTS —
Heading Font: Space Grotesk (Google Fonts)
Body Font:    Inter (Google Fonts)

— SECTION HEADER (dark bg) —
Label: READY TO TRANSFORM?
H2:    This is the decision that changes everything.
Sub:   One program. One cohort. One chance at this price.

— FLOATING CARD —
Urgency: CLOSES FRIDAY
Title:   The Complete Agency System™

— OFFER STACK (✓) —
✓ 12-Week Agency Accelerator Program — $4,997
✓ Revenue Engine Video Series — $997
✓ Weekly Group Coaching Calls — $1,997
✓ Client Acquisition Playbook™ — $997
✓ Hiring & Delegation System — $497

— BONUSES (★) —
★ BONUS: DFY Proposal Templates — $297
★ BONUS: Cold Outreach Swipe File — $197

— PRICING —
Total Value:    $9,979
Strikethrough:  $9,997
Today's Price:  $4,997
Plan:           or 3 × $1,997
CTA:            ENROLL NOW — $4,997 →
Trust:          30-day refund · Secure checkout`,
  },
  {
    id: "offer",
    number: "06i",
    label: "OFFER POSITIONING",
    title: "Offer Positioning Variation 9",
    description:
      "Full-width mega offer reveal — 2-col grid (core / bonus) + dark bottom bar with massive gold price. Syne + Inter, bold agency.",
    labelClass: labelClasses.offer,
    previewSrc: "/private/offer-v9-thumb.webp",
    funnelTypes: ["Agency","Premium","Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Offer Positioning section. Production-ready, GHL-ready custom code block.

=== OUTPUT ===
File: 07-offer-12.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===
- Full dark bg (#0A0A14)
- Container: max-width 1240px centered, padding 100px 32px
- Header (centered): uppercase amber label · H2 (Syne) · sub
- 2-column grid (core + bonus), gap 24px, align-items start
- LEFT — Core Modules card: bg var(--core-bg), rounded 18px, padding 36px 32px
  - Section header (white uppercase bold, large)
  - 5 ✓ items (green check + white name + amber value right-aligned, dashed border between)
- RIGHT — Bonus card: bg var(--bonus-bg), 1px amber border, rounded 18px, padding 36px 32px
  - Section header (amber uppercase bold)
  - 4 ★ items (amber)
- Bottom bar (full container width below grid, margin-top 32px):
  - Dark card bg, padding 32px 36px, rounded 18px
  - Flex row: Total/Strikethrough (left) · Massive gold price (clamp 56-80px center) · CTA + plan (right)
  - On mobile: stacks vertically

=== ANIMATIONS ===
- Left card slides in from left, right slides in from right
- Bottom bar slides up + price count-up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Cols stack
- Bottom bar stacks (centered)

Total value must be 3–5x the price. Build the complete file now.`,
    varsPrompt: `Apply these client values to the Offer V9 (Mega Reveal · Bold Dark Agency) base component.

— BRAND COLORS —
--bg:           #0A0A14
--core-bg:      #111120
--bonus-bg:     #141408
--accent:       #F59E0B
--text:         #FFFFFF
--muted:        #9AA0B0
--check:        #22C55E
--bonus:        #F59E0B
--price-color:  #F5C842
--border:       #1E1E30

— FONTS —
Heading Font: Syne (Google Fonts)
Body Font:    Inter (Google Fonts)

— COPY —
Label: THE COMPLETE ARSENAL
H2:    We Didn't Hold Anything Back.
Sub:   Every tool, template, call, and community we have — yours.

— CORE MODULES (left, ✓) —
✓ The Flagship 12-Week Masterclass — $5,997
✓ The Revenue Architecture Framework™ — $1,997
✓ 12 Weekly Live Coaching Sessions — $3,600
✓ Private High-Level Community — $997
✓ Done-With-You Funnel Review — $997

— FAST-ACTION BONUSES (right, ★) —
★ 90-Day Revenue Sprint Roadmap — $497
★ Agency Proposal & Contract Pack — $397
★ The Objection Handler Swipe File — $297
★ Personal Brand Content System — $197

— BOTTOM BAR —
Total Value:    $14,976
Strikethrough:  $14,997
Today's Price:  $9,997
Plan:           or 3 × $3,997
CTA:            CLAIM YOUR SPOT →`,
  },
  {
    id: "social",
    number: "07a",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 1",
    description:
      "Classic 2×2 testimonial grid + brand bar (clean corporate). Aggregate header + 4 cards with star/quote/avatar. Inter, light bg.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v1-thumb.webp",
    funnelTypes: ["Corporate","Coaching","B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- White section bg, container max-width 1140px, padding 96px 24px
- Centered header: aggregate stat line · H2 · sub
- 2×2 grid of testimonial cards (gap 24px)
- Each card: light gray bg, rounded 16px, padding 28px, subtle shadow, hover-lift
  - Gold star row · italic quote · round avatar photo + bold name + muted title
- Brand bar below: grayscale CSS text logos, mixed font weights, centered
- Cards fade up staggered 0.1s

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V1 (2×2 Grid · Clean Corporate).

— BRAND COLORS —
--bg: #FFFFFF · --bg-alt: #F7F8FA · --accent: #2563EB · --star: #F59E0B · --text: #0E1116 · --muted: #4A5160 · --card-bg: #F7F8FA · --border: #E4E7EB

— FONTS —
Inter (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9/5 across 500+ reviews · 81% client success rate
H2: Real People. Real Results.
Sub: Not actors. Not made-up stories. These are verified clients who followed the system.
Use testimonials: A, B, C, D
Brand bar: Forbes | Entrepreneur | Inc. | Business Insider

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07b",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 2",
    description:
      "Dark masonry 3-column grid of 6 testimonials (premium exclusive). Space Grotesk, staggered columns.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v2-thumb.webp",
    funnelTypes: ["High-Ticket","Mastermind","Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Full dark bg (#0A0A0A), container max-width 1200px, padding 100px 24px
- Centered header: aggregate · H2
- 3-column masonry grid (middle column offset 20px down), 6 testimonial cards distributed
- Each card: dark card bg, rounded 14px, padding 26px, star row + italic quote + round avatar photo + name + title
- Brand bar below: muted white CSS text logos
- Columns fade in staggered

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V2 (Dark Masonry · Premium).

— BRAND COLORS —
--bg: #0A0A0A · --card-bg: #141414 · --accent: #F5C842 · --star: #F59E0B · --text: #FFFFFF · --muted: #9A9A9A · --border: #222222

— FONTS —
Space Grotesk (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9/5 · 500+ clients · $2M+ in revenue generated
H2: The Results Speak for Themselves.
Use testimonials: A, B, C, D, E, F (distribute across 3 columns)
Brand bar: Forbes | CNN | Inc. | Fast Company

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07c",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 3",
    description:
      "Horizontal scroll carousel with arrows + dot pagination + auto-scroll (modern SaaS). DM Sans, light bg.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v3-thumb.webp",
    funnelTypes: ["SaaS","Course","Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Light gray bg (#F8FAFC), container max-width 1200px, padding 96px 24px
- Centered header: aggregate · H2 · sub
- Horizontal scroll carousel (shows ~2.5 cards desktop, ~1.2 mobile)
  - Each card: white bg + shadow + star row + italic quote + avatar + name
- Prev/next arrow buttons + dot pagination below
- Auto-scroll every 4s (pause on hover), active dot indigo
- Carousel slides in from right on entry

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V3 (Carousel · Modern SaaS).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #4F46E5 · --star: #F59E0B · --text: #0F172A · --muted: #64748B · --card-bg: #FFFFFF · --border: #E2E8F0 · --dot-active: #4F46E5 · --dot-inactive: #CBD5E1

— FONTS —
DM Sans (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9 average · 500+ verified reviews
H2: What Our Community Is Saying.
Sub: Updated weekly with new results.
Use testimonials: A, B, C, D, E, F (all in carousel)
Brand bar: Forbes | Entrepreneur | Inc. | Business Insider

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07d",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 4",
    description:
      "Video testimonial thumbnails + lightbox + text testimonials below (dark neon video-first). Outfit, Unsplash thumbnails.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v4-thumb.webp",
    funnelTypes: ["Coaching","Personal Brand","Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Dark bg (#0F0F1A), container max-width 1200px, padding 100px 24px
- Centered header: aggregate · H2 · sub
- 3 video thumbnail cards in a row: thumbnail bg + dark overlay + purple play button + title + name
  - Hover: overlay lightens, play button grows
  - Click: open JS lightbox modal (placeholder video embed)
- 3 small text testimonials below (D, E, F)
- Brand bar: muted white CSS text
- Video cards scale up staggered on entry

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V4 (Video Thumbnails · Dark Neon).

— BRAND COLORS —
--bg: #0F0F1A · --card-bg: #1A1A2A · --accent: #A855F7 · --star: #F59E0B · --text: #FFFFFF · --muted: #9AA0B0 · --play-bg: rgba(168,85,247,0.9) · --border: #2A2A3A

— FONTS —
Outfit (Google Fonts)

— VIDEO THUMBNAILS (Unsplash) —
1: https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80
2: https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80
3: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80

— COPY —
Aggregate: ★★★★★ 4.9/5 · Watch real client stories
H2: Don't Take Our Word for It.
Sub: Watch what actually happened.
Video Card 1: "From $8K to $47K in 90 Days" — Marcus T.
Video Card 2: "Lost 24 lbs Without Starving" — Jennifer K.
Video Card 3: "Landed $152K Role at Meta" — David L.
Text testimonials below: D, E, F
Brand bar: Forbes | Inc. | CNN | Fast Company

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07e",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 5",
    description:
      "Big featured quote left + 2×2 smaller cards right (warm personal brand). Plus Jakarta Sans, cream bg.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v5-thumb.webp",
    funnelTypes: ["Personal Brand","Coach","Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Warm cream bg (#FFF8F3), container max-width 1200px, padding 96px 24px
- Centered header: aggregate · H2 · sub
- 2-col grid: LEFT 45% featured testimonial (warm tinted bg, orange left border, 56px avatar, large italic quote, bold name+title) | RIGHT 55% 2×2 grid of smaller white cards (star + quote + small avatar + name)
- Brand bar full width centered below
- Featured slides left, grid fades in staggered right

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V5 (Featured + Grid · Warm Personal).

— BRAND COLORS —
--bg: #FFF8F3 · --accent: #EA580C · --star: #F59E0B · --text: #1C1917 · --muted: #78716C · --card-bg: #FFFFFF · --featured-bg: #FFF1E8 · --border: #FED7AA

— FONTS —
Plus Jakarta Sans (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9/5 · 500+ lives changed
H2: Stories That Say It Better Than We Could.
Sub: Every result here is real. Every person verified.
Featured (left): FEATURED quote (Kevin R.)
Grid (right 2×2): A, B, C, D
Brand bar: Forbes | Entrepreneur | Inc. | Business Insider

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07f",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 6",
    description:
      "Stats bar (4 count-up stats) + 3 testimonials row (data-driven). Manrope, light bg + green stats band.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v6-thumb.webp",
    funnelTypes: ["Wellness","Corporate","Consulting"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- White bg, container max-width 1180px, padding 96px 24px
- Centered header: aggregate · H2
- Stats bar: light green bg band, 4 equal cells (big colored count-up number + muted label)
- 3 testimonials in a row below (card bg + star + quote + avatar + name)
- Brand bar centered muted
- Stats count up on entry, testimonials fade up staggered

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V6 (Stats Bar + Row · Data-Driven).

— BRAND COLORS —
--bg: #FFFFFF · --stats-bg: #F0FDF4 · --accent: #16A34A · --star: #F59E0B · --text: #0F172A · --muted: #64748B · --card-bg: #F8FAFC · --border: #E2E8F0 · --stat-1: #16A34A · --stat-2: #2563EB · --stat-3: #D97706 · --stat-4: #7C3AED

— FONTS —
Manrope (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9/5 · Verified by 500+ clients
H2: The Numbers Back the Stories.
Stats: 500+ Clients Transformed · 81% Hit Revenue Target · 4.9★ Average Rating · 90d Average to Results
Use testimonials: A, C, D
Brand bar: Forbes | Entrepreneur | Inc. | Business Insider | Fast Company

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07g",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 7",
    description:
      "Before/after result cards — 2×2 with star+result badge header (transformation-focused). Nunito, light bg.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v7-thumb.webp",
    funnelTypes: ["Wellness","Coaching","Transformation"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Light gray bg (#F8FAFC), container max-width 1140px, padding 96px 24px
- Centered header: aggregate · H2 · sub
- 2×2 grid of result cards
  - Each card header row: star rating LEFT + colored result badge RIGHT
  - Then italic quote body + avatar + name + title
  - White bg, subtle shadow, hover-lift + badge glow
- Brand bar centered below
- Cards fly in from bottom staggered 0.12s

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V7 (Result Cards · Transformation).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #0F766E · --star: #F59E0B · --text: #0F172A · --muted: #64748B · --card-bg: #FFFFFF · --border: #E2E8F0
Badge colors: green (#DCFCE7/#15803D) · blue (#DBEAFE/#1D4ED8) · amber (#FEF3C7/#B45309) · purple (#EDE9FE/#6D28D9)

— FONTS —
Nunito (Google Fonts)

— COPY —
Aggregate: ★★★★★ 4.9/5 · 500+ verified transformations
H2: Specific Results. Specific People. Specific Timeframes.
Sub: No vague success stories here. Every result is quantified.
Card 1 (green badge "+$39K/mo"): A
Card 2 (blue badge "-24 lbs"): B
Card 3 (amber badge "87 days"): C
Card 4 (purple badge "$50K/mo"): D
Brand bar: Forbes | Entrepreneur | Inc. | Business Insider

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "social",
    number: "07h",
    label: "SOCIAL PROOF",
    title: "Social Proof Variation 8",
    description:
      "Single centered hero testimonial that rotates (dark editorial). Syne + Inter, dot nav + auto-rotate + giant quote mark.",
    labelClass: labelClasses.social,
    previewSrc: "/private/proof-v8-thumb.webp",
    funnelTypes: ["Premium","Personal Brand","High-Ticket"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Social Proof section (Section 07 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Who else has this worked for?"

=== OUTPUT ===
File: 08-proof-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Aggregate stat in header (★★★★★ 4.9/5 across X reviews · Y% success)
- Minimum 4 testimonials, each: stars + specific outcome quote (must include numbers + timeframe) + round avatar photo + name + title/location
- Brand bar below (CSS text media logos, mixed weights, grayscale)
- All quotes italic
- Avatars: circular headshot photo — <img>, border-radius 50%, object-fit:cover (use the placeholder URLs from Client Variables; client swaps real client photos)

=== LAYOUT ===
- Dark bg (#0A0A14), container max-width 700px centered, padding 100px 24px, text-align center
- Centered header: aggregate · H2 · sub
- Single rotating testimonial display:
  - Huge gold CSS quote mark above
  - Centered gold star row · large italic quote (20px) · 56px avatar circle + bold name + muted title
- Dot navigation (5 dots) + prev/next arrows
- Auto-rotate every 5s, active dot gold
- Brand bar full width below
- Section fades in, quote transitions on rotate

=== ANIMATIONS (IntersectionObserver) ===
- Scroll-triggered fade/slide per the layout
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack gracefully, breakpoint 768px

Build the complete file now.`,
    varsPrompt: `Apply these client values to Social Proof V8 (Single Hero Rotating · Dark Editorial).

— BRAND COLORS —
--bg: #0A0A14 · --accent: #F5C842 · --star: #F59E0B · --text: #FFFFFF · --muted: #9AA0B0 · --quote-color: #F5C842 · --border: rgba(255,255,255,0.08) · --dot-active: #F5C842 · --dot-inactive: #2A2A3A

— FONTS —
Syne (headings) + Inter (body)

— COPY —
Aggregate: ★★★★★ 4.9/5 · 500+ clients · $2M+ generated
H2: One Story at a Time.
Sub: Every week, another life changed.
Rotating testimonials (5): FEATURED, A, B, C, D
Brand bar: Forbes | CNN | Inc. | Fast Company

— TESTIMONIAL COPY BANK (each line ends with a placeholder headshot URL — swap real client photos) —
A · ★★★★★ · "I went from $8K months to $47K in month 3. I genuinely didn't believe this was possible until I saw the deposit hit my account." — Marcus T., Business Coach — Austin, TX · badge: +$39K/mo · photo: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80
B · ★★★★★ · "Down 24 lbs in 8 weeks and my doctor took me off 2 medications. I've tried everything for 6 years. This is the only thing that worked." — Jennifer K., 47 — Phoenix, AZ · badge: -24 lbs · photo: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80
C · ★★★★★ · "I landed a $152K offer at Meta in 87 days. I had 1,400 rejections before this program. The system is just different." — David L., Software Engineer — San Francisco, CA · badge: $152K offer · photo: https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80
D · ★★★★★ · "Crossed $50K/mo in month 4. I was stuck at $12K for 18 months before joining. This is the first program that actually delivered." — Sarah M., Marketing Consultant — Chicago, IL · badge: $50K/mo · photo: https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80
E · ★★★★★ · "From zero clients to a fully booked practice in 90 days. The framework is unlike anything I've seen in 12 years of business." — Rachel B., Executive Coach — New York, NY · badge: Fully booked · photo: https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80
F · ★★★★★ · "My energy levels are back to what they were in my 30s. I lost 31 lbs without ever feeling deprived. Month 3 was the turning point." — Patricia W., 52 — Seattle, WA · badge: -31 lbs · photo: https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80
FEATURED · ★★★★★ · "I was the skeptic. I'd bought 4 programs before this one and got nothing. By week 6 I had closed my first $10K client. By month 3 I fired my boss. This program changed my life." — Kevin R., Agency Owner — Miami, FL · photo: https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80

— BRAND BAR (CSS text logos, grayscale) —
Forbes | Entrepreneur | Inc. | Business Insider | Fast Company | CNN`,
  },
  {
    id: "risk",
    number: "08a",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 1",
    description:
      "Classic centered guarantee card (clean corporate). Green seal · primary guarantee · secondary protections line · full-width CTA. Inter, light gray bg.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v1-thumb.webp",
    funnelTypes: ["Corporate", "Coaching", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Guarantee seal (96×96 circle)
- Risk-free label ("100% Risk-Free" or similar)
- H2 names the guarantee specifically
- Primary guarantee paragraph with specific terms
- TWO layers always: Layer 1 = 14-day no-questions refund · Layer 2 = outcome-based guarantee
- CTA button · min section height 420px

=== LAYOUT ===
- Light gray section bg, centered card (max-width 600px)
- Card: white, 2px green border, large drop shadow, rounded
- 96px green seal (top "$20K" + bottom "GUARANTEE") centered, H2 below
- Risk-free pill under H2
- Primary paragraph centered (outcome guarantee), secondary line smaller/muted/italic (14-day refund + day-90)
- CTA: green pill, full card width

=== ANIMATIONS (IntersectionObserver) ===
- Card scales 0.96 → 1.0 + fades in on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full-width card, reduced padding

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V1 (Classic Centered · Clean Corporate).

— BRAND COLORS —
--bg: #F7F8FA · --accent: #16A34A · --seal-bg: #DCFCE7 · --seal-border: #16A34A · --text: #0E1116 · --muted: #4A5160 · --border: #D1FAE5 · --cta-bg: #16A34A

— FONTS —
Inter (Google Fonts)

— COPY —
Label: THE $20K REVENUE GUARANTEE
Seal: $20K / GUARANTEE
H2: The $20K Revenue Guarantee
Risk-free label: 100% RISK-FREE ENROLLMENT
Primary guarantee: "If you complete all 12 weeks of the program, implement the frameworks as taught, and don't hit $20K in monthly revenue within 90 days of finishing — we will continue coaching you at no additional charge until you do. No time limits. No exceptions."
Secondary line (italic): "Plus: full 14-day no-questions-asked refund within your first two weeks — and our $20K outcome guarantee kicks in at day 90."
CTA: I'm In — Enroll Risk-Free →`,
  },
  {
    id: "risk",
    number: "08b",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 2",
    description:
      "Split layout — big seal left (light-blue panel) + text right with two layer cards. Manrope, executive/consulting trust-heavy.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v2-thumb.webp",
    funnelTypes: ["Consulting", "Executive", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Guarantee seal (96×96 circle)
- Risk-free label · H2 names the guarantee
- Primary guarantee paragraph with specific terms
- TWO layers always: Layer 1 = 14-day refund · Layer 2 = outcome guarantee (as two distinct cards)
- CTA button · min section height 420px

=== LAYOUT ===
- White section bg, single rounded bordered wrapper, 2-col grid
- LEFT 40%: light-blue panel, centered 96px seal ("$20K" / "REVENUE" / "GUARANTEE") with CSS ring effect
- RIGHT 60%: label + H2 + primary paragraph + two layer cards side by side + CTA
- Layer cards: number badge + title + body · L1 blue left border, L2 green left border
- CTA: blue pill

=== ANIMATIONS (IntersectionObserver) ===
- Seal rotates from slight angle to upright on entry · right content fades up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack (seal panel top, text below) · layer cards stack

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V2 (Split Seal + Text · Executive).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #2563EB · --seal-bg: #DBEAFE · --seal-border: #2563EB · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --cta-bg: #2563EB · --left-bg: #F0F7FF · L1: #2563EB · L2: #16A34A

— FONTS —
Manrope (Google Fonts)

— COPY —
Seal: $20K / REVENUE / GUARANTEE
Label: 100% RISK-FREE
H2: The $20K Revenue Guarantee
Primary: "Complete every module. Attend every call. Submit your work. If you don't cross $20K/mo within 90 days of graduation — we coach you personally until you do. Free. Forever."
Layer 1 — 14-Day Full Refund: "Try the entire program risk-free for 14 days. If it's not for you, email us once. Full refund, no questions asked."
Layer 2 — The $20K Outcome Guarantee: "Do the work and don't hit your goal? We keep working with you at zero cost until you do."
CTA: Enroll Risk-Free Today →`,
  },
  {
    id: "risk",
    number: "08c",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 3",
    description:
      "Dark premium guarantee card with green glow + two layer cards. Space Grotesk, high-ticket / exclusive vibe.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v3-thumb.webp",
    funnelTypes: ["High-Ticket", "Mastermind", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Guarantee seal (96×96 circle, green glow ring)
- Label · H2 names the guarantee
- Primary guarantee paragraph (contractual, specific terms)
- TWO layers always: Layer 1 = 14-day refund · Layer 2 = outcome guarantee (two dark cards)
- CTA button · min section height 420px

=== LAYOUT ===
- Very dark bg (near black), centered card (max-width 640px)
- Card: dark, green glowing border (box-shadow), rounded
- 96px seal with green glow ring ("$20K" / "GUARANTEED")
- Two layer cards below paragraph (dark, colored left border) · L1 blue, L2 green
- CTA: green pill with pulse-glow animation

=== ANIMATIONS (IntersectionObserver) ===
- Card rises from below + fades in · seal glow pulses once on entry · CTA glow loops
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full-width card · layer cards stack

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V3 (Dark Premium · High-Ticket).

— BRAND COLORS —
--bg: #050510 · --card-bg: #0D0D20 · --accent: #22C55E · --seal-bg: rgba(34,197,94,0.1) · --seal-border: rgba(34,197,94,0.4) · --text: #FFFFFF · --muted: #9AA0B0 · --border: rgba(34,197,94,0.2) · --glow: rgba(34,197,94,0.15) · --cta-bg: #16A34A · L1: #3B82F6

— FONTS —
Space Grotesk (Google Fonts)

— COPY —
Seal: $20K / GUARANTEED
Label: ZERO RISK. MAXIMUM UPSIDE.
H2: The $20K Revenue Guarantee
Primary: "We put our money where our mouth is. Complete the 12-week program, do the work, and if you haven't crossed $20K/mo within 90 days of finishing — we coach you for free until you do. Not a 'we'll try our best.' A contractual guarantee."
Layer 1 — 14-Day No-Questions Refund: "You have 14 full days to go through the material, attend a live call, and decide. If it's not right — one email and you get every dollar back."
Layer 2 — The $20K Outcome Guarantee: "Show up, do the work, follow the system. If $20K/mo doesn't happen within 90 days of finishing — we keep coaching you at zero cost. No cap. No excuses."
CTA: Lock In My Spot →`,
  },
  {
    id: "risk",
    number: "08d",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 4",
    description:
      "Trust-badges bar (4 icons) + centered guarantee text. Plus Jakarta Sans, fresh health/wellness, approachable.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v4-thumb.webp",
    funnelTypes: ["Wellness", "Health Coaching", "Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Row of 4 trust badges (inline-SVG icon + title + body)
- H2 names the protection
- Primary guarantee paragraph with specific terms
- TWO layers always: Layer 1 = 14-day refund (line) · Layer 2 = outcome guarantee (paragraph)
- CTA button · min section height 420px

=== LAYOUT ===
- Fresh light-green section bg
- 4 trust badges in a row: each a white card, colored rounded icon (green/blue/amber/purple), title + body
- Below badges: centered guarantee text block (max-width 600px) — outcome guarantee paragraph + 14-day italic line
- CTA: green pill centered

=== ANIMATIONS (IntersectionObserver) ===
- Badges fan in staggered · guarantee text fades up below
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Badges 2×2 · text full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V4 (Trust Badges Bar · Wellness).

— BRAND COLORS —
--bg: #F0FDF4 · --accent: #16A34A · --badge-bg: #FFFFFF · --seal-bg: #DCFCE7 · --text: #14532D · --muted: #4B5563 · --border: #D1FAE5 · --cta-bg: #16A34A · badge-1: #16A34A · badge-2: #2563EB · badge-3: #D97706 · badge-4: #7C3AED

— FONTS —
Plus Jakarta Sans (Google Fonts)

— COPY —
Label: YOUR INVESTMENT IS 100% PROTECTED
H2: Four Layers of Protection — Not Just One.
Badge 1 (shield-check, green): "30-Day Refund" / "Full refund, no questions"
Badge 2 (lock, blue): "Secure Checkout" / "256-bit SSL encryption"
Badge 3 (refresh, amber): "Outcome Guarantee" / "We work until you win"
Badge 4 (headset, purple): "Dedicated Support" / "Real humans, real help"
Primary: "Beyond the standard guarantees, we offer something most programs won't: the $20K Revenue Guarantee. Do the work. Follow the system. If you don't hit $20K/mo within 90 days of completing the program, we coach you for free until you do."
14-day line (italic): "Plus a full 14-day no-questions-asked refund. Try everything. If it's not right, you pay nothing."
CTA: Start Risk-Free →`,
  },
  {
    id: "risk",
    number: "08e",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 5",
    description:
      "With vs without guarantee comparison (red vs green columns). DM Sans, modern comparison-first consulting/SaaS.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v5-thumb.webp",
    funnelTypes: ["SaaS", "Consulting", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Centered header (label + H2 + sub)
- 2-col comparison: typical program (✗) vs our program (✓)
- TWO layers always present in the "our program" column: 14-day refund + outcome guarantee
- CTA button · min section height 420px

=== LAYOUT ===
- Light gray section bg
- 2-col comparison grid · LEFT red-tint bg + red border (✗ items), RIGHT green-tint bg + green border (✓ items)
- Each item: colored ✗/✓ mark + text, divider between rows
- Below grid: centered CTA

=== ANIMATIONS (IntersectionObserver) ===
- Left column slides in from left · right column slides in from right
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack (typical top, ours below)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V5 (With vs Without · Comparison).

— BRAND COLORS —
--bg: #FAFAFA · --accent: #4F46E5 · --old-bg: rgba(220,38,38,0.03) · --new-bg: rgba(22,163,74,0.03) · --old-border: rgba(220,38,38,0.25) · --new-border: rgba(22,163,74,0.25) · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --cta-bg: #4F46E5

— FONTS —
DM Sans (Google Fonts)

— COPY —
Label: WHY THIS IS DIFFERENT
H2: Most Programs Hope You Don't Ask for Your Money Back.
Sub: We built our guarantee to make asking unnecessary.
Typical Program (✗): "Vague 'satisfaction guarantee' buried in fine print" · "Refund requires jumping through hoops" · "No outcome guarantee — just vibes" · "You're on your own after purchase" · "Results not guaranteed in any way"
Our Program (✓): "14-day full refund — one email, done" · "The $20K Revenue Guarantee in writing" · "We coach you free until you hit $20K/mo" · "Dedicated support for every student" · "Results contractually backed"
CTA: Enroll Under the Guarantee →`,
  },
  {
    id: "risk",
    number: "08f",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 6",
    description:
      "Minimal text-first guarantee — large serif headline + two stacked layer cards. DM Serif Display + DM Sans, editorial luxury.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v6-thumb.webp",
    funnelTypes: ["Premium", "Personal Brand", "Editorial"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Label · large serif H2 + serif sub-line
- Body paragraph (authoritative)
- TWO layers always: Layer 1 = 14-day refund · Layer 2 = outcome guarantee (two stacked cards)
- CTA button · min section height 420px

=== LAYOUT ===
- Clean white bg, centered column (max-width 620px)
- Large serif headline + accent serif sub-line + body paragraph
- Two layer cards stacked, subtle gray bg, colored left accent border · L1 teal, L2 blue
- CTA: teal pill centered

=== ANIMATIONS (IntersectionObserver) ===
- Headline block fades up · layer cards slide in from bottom staggered
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V6 (Minimal Text-First · Editorial).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #0F766E · --layer-1: #0F766E · --layer-2: #2563EB · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --cta-bg: #0F766E

— FONTS —
DM Serif Display (headings) + DM Sans (body) — Google Fonts

— COPY —
Label: ZERO RISK ENROLLMENT
H2: We Guarantee Your Results.
H2 sub: Or We Work for Free.
Body: "We've been doing this long enough to know exactly what separates those who succeed from those who don't. If you do the work, follow the system, and show up — you will get results. That's not a hope. That's a guarantee we put in writing."
Layer 1 — The 14-Day Refund (teal border): "Try the full program for 14 days. Attend a live call. Go through the first two modules. If it's not everything we promised — one email gets your money back."
Layer 2 — The $20K Revenue Guarantee (blue border): "Complete the program, implement the system, and if you don't cross $20K/mo within 90 days — we coach you personally, at zero cost, until you do."
CTA: I'm In — Enroll Risk-Free →`,
  },
  {
    id: "risk",
    number: "08g",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 7",
    description:
      "Triple seals row (blue/green/amber, glowing) + layered protection text. Syne + Inter, dark bold agency.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v7-thumb.webp",
    funnelTypes: ["Agency", "High-Ticket", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Three 96px guarantee seals (each a colored circle with CSS glow matching its color)
- Label · H2 + sub
- Each seal has short body text below it
- TWO layers always: Seal 1 = 14-day refund · Seal 2 = outcome guarantee (Seal 3 = lifetime access bonus)
- Primary paragraph below all seals · CTA button · min section height 420px

=== LAYOUT ===
- Dark section bg
- 3 seals in a row, each a colored circle (blue / green / amber) with matching glow, short body below each
- Primary paragraph centered below all seals
- CTA: gold bg + dark text

=== ANIMATIONS (IntersectionObserver) ===
- Seals scale 0.8 → 1.0 staggered · each glows once on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Seals stay in a row (smaller) · body text stacks

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V7 (Triple Seals · Dark Agency).

— BRAND COLORS —
--bg: #0A0A14 · --accent: #F5C842 · --seal-1: #3B82F6 · --seal-2: #22C55E · --seal-3: #F59E0B · --text: #FFFFFF · --muted: #9AA0B0 · --border: rgba(255,255,255,0.08) · --card-bg: rgba(255,255,255,0.04) · --cta-bg: #F5C842 · --cta-text: #0A0A14

— FONTS —
Syne (headings) + Inter (body) — Google Fonts

— COPY —
Label: TRIPLE PROTECTION GUARANTEE
H2: Three Layers. Zero Excuses.
Sub: We stacked every protection we could think of — because we're that confident in the system.
Seal 1 (blue): "14-DAY" / "REFUND" — body: "Full refund in the first 14 days — no forms, no hoops, one email."
Seal 2 (green): "$20K" / "RESULT" — body: "Hit $20K/mo in 90 days or we coach you free until you do."
Seal 3 (amber): "LIFE-" / "TIME" — body: "Lifetime access to all program updates, new modules, resources."
Primary: "Three separate commitments. All in writing. All enforced. If this program doesn't deliver what we promised — you don't pay. Simple."
CTA: Accept All Three Guarantees →`,
  },
  {
    id: "risk",
    number: "08h",
    label: "RISK REVERSAL",
    title: "Risk Reversal Variation 8",
    description:
      "Guarantee card (left, animated SVG shield-check seal + covered list) + interactive mini-FAQ accordion (right). Outfit, modern friendly SaaS/coaching hybrid.",
    labelClass: labelClasses.risk,
    previewSrc: "/private/guarantee-v8-thumb.webp",
    funnelTypes: ["SaaS", "Coaching", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Risk Reversal / Guarantee section (Section 08 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "What if it doesn't work?"

=== OUTPUT ===
File: 09-guarantee-11.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Centered header (label with inline shield-check SVG + H2)
- Guarantee card: 96px seal containing an inline SVG shield-with-checkmark (not just text) + title + body + CTA
- TWO layers always — shown as a 2-item "covered" list with green check-circle SVGs (Layer 1 = 14-day refund · Layer 2 = outcome guarantee), reinforced in card body + FAQ
- Mini FAQ (3 Q&A) as an interactive accordion addressing refund / completion / free coaching
- min section height 420px

=== LAYOUT ===
- Light gray section bg
- 2-col grid · LEFT 55%: guarantee card (purple border) — seal block (animated SVG shield-check + "30-Day Refund" chip + ★★★★★ row) · title · body · 2-item covered list (green check-circle SVGs) · CTA with right-arrow SVG
- RIGHT 45%: small uppercase FAQ label + 3 accordion items. Each = button row (rounded icon tile with per-question SVG [clock / clipboard-check / calendar] + question + chevron SVG) and a collapsible answer panel
- First FAQ item open by default; single-open accordion

=== ANIMATIONS (IntersectionObserver) ===
- Card slides in from left
- Seal: spring scale-in (pop) + one-time ring pulse + checkmark draws itself (stroke-dashoffset)
- Covered-list items + FAQ items fade up staggered on entry
- Accordion: click toggles a single open item — chevron rotates 180°, icon tile fills with accent, answer panel height-transitions open; aria-expanded toggled
- CTA arrow nudges right on hover
- prefers-reduced-motion: skip all (accordion still works; first item open)

=== MOBILE (≤768px) ===
- Guarantee card top, FAQ below

=== WORKS WITHOUT JS ===
- Section renders fully; first FAQ answer visible by default

Build the complete file now.`,
    varsPrompt: `Apply these client values to Risk Reversal V8 (Guarantee + Mini FAQ · SaaS/Coaching).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #7C3AED · --seal-bg: #EDE9FE · --seal-border: #7C3AED · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --faq-border: #E2E8F0 · --cta-bg: #7C3AED

— FONTS —
Outfit (Google Fonts)

— COPY —
Label: EVERYTHING COVERED
H2: The Risk-Free Guarantee.
Seal: animated SVG shield + checkmark (96px circle) · chip "30-Day Refund Window" · ★★★★★ row
Guarantee title: The $20K Revenue Guarantee
Body: "Complete the program, implement the framework, and if you don't hit $20K/mo within 90 days — we coach you free until you do. Plus a full 14-day refund window from day one."
Covered list (green check-circle SVGs):
  Layer 1 — "Full 14-day refund window. One email, every dollar back."
  Layer 2 — "Free coaching until you cross $20K/mo. No cap, no time limit."
CTA: Enroll Risk-Free →  (button includes a right-arrow SVG)
FAQ icons — Q1: clock · Q2: clipboard-check · Q3: calendar (each in a rounded tile; accordion, first item open)
FAQ Q1: "What if I change my mind in week 1?" — A1: "Email us within 14 days for a full no-questions-asked refund."
FAQ Q2: "What counts as 'completing the program'?" — A2: "Attending 80%+ of calls, submitting weekly assignments, and implementing the core frameworks."
FAQ Q3: "How does the free coaching work?" — A3: "We schedule weekly calls until you hit $20K/mo. No time limits. No additional cost."`,
  },
  {
    id: "authority",
    number: "09a",
    label: "AUTHORITY",
    title: "Authority Variation 1",
    description:
      "Classic split — coach photo left + bio right (label, transformation H2, epiphany, 4 ✓ credentials, CTA). Inter, clean corporate.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v1-thumb.webp",
    funnelTypes: ["Corporate", "Coaching", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo (portrait, ~1:1.4)
- Label "Meet Your Coach"
- H2 = transformation arc ("From [old] → [new]")
- Epiphany paragraph (personal story, not just credentials)
- 4 ✓ credentials: quantified achievement · client count · media features · created/owns the method
- CTA button · min section height 500px

=== LAYOUT ===
- White bg, 2-col grid
- LEFT 40%: coach photo (tall, bottom-anchored, rounded, light-blue photo bg, blue gradient tint at bottom)
- RIGHT 60%: label → H2 (arc, accent color on the "→ new state") → epiphany → 4 green-✓ credentials → CTA

=== ANIMATIONS (IntersectionObserver) ===
- Photo slides in from left · right content fades up staggered
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Photo top (16:9), content below

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V1 (Classic Split · Clean Corporate).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #2563EB · --text: #0E1116 · --muted: #4A5160 · --border: #E4E7EB · --check: #16A34A · --photo-bg: #EFF6FF · --cta-bg: #2563EB

— FONTS —
Inter (Google Fonts)

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY (same coach, same story across all Authority variations) —
Label: Meet Your Coach
Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days   (accent the "→ $248K TC…" half)
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
CTA: Watch My Full Story →`,
  },
  {
    id: "authority",
    number: "09b",
    label: "AUTHORITY",
    title: "Authority Variation 2",
    description:
      "Dark bio + 4 count-up credential stats. Space Grotesk, high-ticket premium, gold accent.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v2-thumb.webp",
    funnelTypes: ["High-Ticket", "Mastermind", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo · Label "Meet Your Coach"
- H2 = transformation arc (gold accent on key phrase)
- Epiphany paragraph · 4 ✓ credentials (achievement · client count · media · method)
- CTA button · min section height 500px

=== LAYOUT ===
- Full dark bg
- TOP 2-col: LEFT label + H2 + epiphany + green-✓ credentials + gold CTA · RIGHT coach photo (rounded, dark tinted)
- BOTTOM: 4 stat cards in a row (colored number + label) — count up on scroll entry

=== ANIMATIONS (IntersectionObserver) ===
- Left slides up · right photo fades in · stats count up on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack (photo top, bio below) · stats 2×2

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V2 (Dark Bio + Stats · Premium).

— BRAND COLORS —
--bg: #0A0A0A · --bg-card: #141414 · --accent: #F5C842 · --text: #FFFFFF · --muted: #9A9A9A · --border: #222222 · --check: #22C55E · stat-1: #3B82F6 · stat-2: #F59E0B · stat-3: #22C55E · stat-4: #A855F7 · --cta-bg: #F5C842 · --cta-text: #0A0A0A

— FONTS —
Space Grotesk (Google Fonts)

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
Stats (count-up): 500+ Clients Coached · $2M+ Client Revenue Generated · 10yr Years Experience · 4.9★ Average Rating
CTA: Apply to Work With Me →`,
  },
  {
    id: "authority",
    number: "09c",
    label: "AUTHORITY",
    title: "Authority Variation 3",
    description:
      "Transformation-arc serif headline (centered) + 2-col story/photo. DM Serif Display + DM Sans, editorial story-forward.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v3-thumb.webp",
    funnelTypes: ["Personal Brand", "Coach", "Editorial"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo · Label "Meet Your Coach"
- H2 = transformation arc as a large serif headline (accent on "→ new state")
- Epiphany paragraph · 4 ✓ credentials · CTA · min section height 500px

=== LAYOUT ===
- Light gray bg
- Centered header: small uppercase label + large serif H2 (transformation arc, 2–3 lines, dramatic)
- Below: 2-col — LEFT 60% epiphany + green-✓ credentials + CTA · RIGHT 40% coach photo (portrait, tall, rounded, purple gradient overlay)

=== ANIMATIONS (IntersectionObserver) ===
- Header fades up · left content slides right · photo slides in from right
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Photo below header, content below

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V3 (Transformation Arc Headline · Editorial).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #7C3AED · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --check: #16A34A · --arc-color: #7C3AED · --cta-bg: #7C3AED

— FONTS —
DM Serif Display (headings) + DM Sans (body) — Google Fonts

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc, serif): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
CTA: Learn My Full Story →`,
  },
  {
    id: "authority",
    number: "09d",
    label: "AUTHORITY",
    title: "Authority Variation 4",
    description:
      "Story left + photo right (reversed) with floating stat badges. Plus Jakarta Sans, warm personal brand.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v4-thumb.webp",
    funnelTypes: ["Personal Brand", "Coach", "Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo · Label "Meet Your Coach"
- H2 = transformation arc · Epiphany paragraph
- 4 ✓ credentials · CTA · min section height 500px

=== LAYOUT ===
- Warm cream bg, 2-col
- LEFT 60%: label → H2 → epiphany → green-✓ credentials → CTA
- RIGHT 40%: coach photo (rounded, warm overlay) with two floating stat badges absolutely positioned on the photo: "500+ clients" (bottom-left) and "$2M+ generated" (top-right)

=== ANIMATIONS (IntersectionObserver) ===
- Left fades up staggered · photo slides in from right · stat badges float up after the photo
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Photo top, story below

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V4 (Story + Photo Reversed · Warm).

— BRAND COLORS —
--bg: #FFF8F3 · --accent: #EA580C · --text: #1C1917 · --muted: #78716C · --border: #FED7AA · --check: #16A34A · --photo-bg: #FFF1E8 · --cta-bg: #EA580C

— FONTS —
Plus Jakarta Sans (Google Fonts)

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
Floating badges: "500+ clients" · "$2M+ generated"
CTA: My Full Transformation →`,
  },
  {
    id: "authority",
    number: "09e",
    label: "AUTHORITY",
    title: "Authority Variation 5",
    description:
      "Full-bleed coach-on-stage background + transparent coach cutout (right) + content left with glass pill credentials. Outfit + Inter, cinematic.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v5-thumb.webp",
    funnelTypes: ["High-Ticket", "Event", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Full-bleed coach background photo · Label "Meet Your Coach"
- H2 = transformation arc · short epiphany (2–3 sentences)
- 4 credentials rendered as glass pill badges · CTA · min section height 500px

=== LAYOUT ===
- Full-width BG photo behind everything, dark overlay (heavier on the left for text legibility)
- Content positioned in the left ~55%: label → H2 → short epiphany → credential glass pills (white rgba bg) → CTA
- Transparent coach cutout (background-removed PNG/WebP) anchored bottom-right, standing in front of the bg; lighten the overlay on the right so the cutout reads clearly

=== ANIMATIONS (IntersectionObserver) ===
- Ken Burns slow zoom on bg · content fades up staggered · coach cutout fades/slides up on entry
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Single column, full width, overlay shifts to vertical gradient; hide the coach cutout

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V5 (Full BG Photo + Overlay · Cinematic).

— BRAND COLORS —
--bg: #050505 · --overlay: rgba(0,0,0,0.65) · --overlay-left: rgba(0,0,0,0.8) · --accent: #00E5CC · --text: #FFFFFF · --muted: #A0B0B0 · --check: #22C55E · --badge-bg: rgba(255,255,255,0.1) · --cta-bg: #00E5CC · --cta-text: #050505

— FONTS —
Outfit (headings) + Inter (body) — Google Fonts

— IMAGES —
BG photo (coach on stage — portable Unsplash placeholder): https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80
Coach cutout (transparent-background PNG/WebP, bottom-right — swap for the real coach): /private/authority-v5-coach.webp

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany (short): "I wasn't the smartest or most connected person in the room. What I had was a willingness to reverse-engineer the system everyone else was guessing at. Three years of failures, one breakthrough — and everything you'll learn here is what I wish I'd had at the start."
Credential pills (✓): "$0 → $2M client results in 36 months" · "500+ clients coached" · "Featured in Forbes, Inc. & Entrepreneur" · "Creator of The Revenue Architecture Framework™"
CTA: Watch My Story →`,
  },
  {
    id: "authority",
    number: "09f",
    label: "AUTHORITY",
    title: "Authority Variation 6",
    description:
      "Coach journey timeline (Struggle → Discovery → Today) — large coach portrait + credentials left, story + timeline right. Manrope, transformation-focused.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v6-thumb.webp",
    funnelTypes: ["Coaching", "Consulting", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Large coach portrait photo (not a small avatar) · Label "Meet Your Coach"
- H2 = transformation arc · Epiphany paragraph
- 4 ✓ credentials · CTA · min section height 500px
- Personal transformation shown explicitly via a 3-stage journey timeline

=== LAYOUT ===
- White bg, 2-col
- LEFT 38%: large coach portrait (tall, rounded, name + title caption over a bottom gradient) + 4 green-✓ credentials below it
- RIGHT 62%: label → H2 → epiphany → vertical timeline (3 stages, colored circles + dashed connectors: Stage 1 red · Stage 2 amber · Stage 3 green) → CTA

=== ANIMATIONS (IntersectionObserver) ===
- Left fades up · timeline stages pop in sequentially (~0.3s between each)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Timeline goes full width below content

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V6 (Journey Timeline · Transformation).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #0F766E · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --check: #16A34A · --struggle: #DC2626 · --discovery: #D97706 · --today: #16A34A · --cta-bg: #0F766E

— FONTS —
Manrope (Google Fonts)

— IMAGE —
Large coach portrait (swap for the real coach photo): /private/authority-v6-coach.webp · caption "Alex Rivera — Founder & Head Coach"

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera (Founder & Head Coach)
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
Timeline — Stage 1 "The Struggle" (Years 1–3): "1,400 job rejections. $97K salary. Grinding and getting nowhere." · Stage 2 "The Discovery" (Year 4): "Found the pattern every top earner used. Reverse-engineered it completely." · Stage 3 "Today" (Year 5–Now): "$248K TC at Meta. 500+ clients coached. System proven worldwide."
CTA: Start Your Transformation →`,
  },
  {
    id: "authority",
    number: "09g",
    label: "AUTHORITY",
    title: "Authority Variation 7",
    description:
      "Magazine editorial — full-height coach photo + caption (left), amber-accented bio (right). Syne + Inter, dark premium.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v7-thumb.webp",
    funnelTypes: ["Premium", "Personal Brand", "Agency"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo (tall editorial crop) · Label "Meet Your Coach"
- H2 = transformation arc (amber accent on key phrase)
- Epiphany paragraph · 4 ✓ credentials · CTA · min section height 500px

=== LAYOUT ===
- Dark bg, 2-col (50/50), full-bleed
- LEFT 50%: coach photo full height (bottom-anchored) with a semi-transparent caption bar: coach name bold + title muted
- RIGHT 50%: label → H2 (Syne, amber accent) → epiphany → 4 green-✓ credentials → amber CTA; subtle 2px amber left border on the panel

=== ANIMATIONS (IntersectionObserver) ===
- Photo slides up · right content staggered fade up
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Photo top (16:9), content below

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V7 (Magazine Editorial · Dark Premium).

— BRAND COLORS —
--bg: #0F0F1A · --overlay: rgba(0,0,0,0.5) · --accent: #F59E0B · --text: #FFFFFF · --muted: #9AA0B0 · --border: rgba(255,255,255,0.08) · --check: #22C55E · --photo-caption-bg: rgba(0,0,0,0.6) · --cta-bg: #F59E0B · --cta-text: #0F0F1A

— FONTS —
Syne (headings) + Inter (body) — Google Fonts

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80

— COPY —
Label: Meet Your Coach · Caption: Alex Rivera — Founder · The Revenue Architecture Framework™
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
CTA: Read My Full Story →`,
  },
  {
    id: "authority",
    number: "09h",
    label: "AUTHORITY",
    title: "Authority Variation 8",
    description:
      "3-column — photo (verified badge + rating caption) | bio card (mini-stats + signature) | icon credential tiles. DM Sans + Caveat, modern structured SaaS/consulting.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v8-thumb.webp",
    funnelTypes: ["SaaS", "Consulting", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo · Label "Meet Your Coach"
- H2 = transformation arc · Epiphany paragraph
- 4 credentials (each: colored SVG icon tile + bold title + muted body) · CTA · min section height 500px

=== LAYOUT ===
- Light gray bg, 3-col grid (30% | 1fr | 30%)
- LEFT: coach photo full height — "Verified Coach" pill (top-left) + bottom gradient caption with name + title + ★★★★★ 4.9 · 500+ coached
- MIDDLE: white bio card (subtle shadow) — eyebrow label → H2 (arc, 2 lines) → epiphany → mini-stat row (500+ · $2M+ · 10yr, divided) → handwritten signature + role → CTA at the bottom
- RIGHT: credentials column (nudged down ~34px to align with the bio) — label "Why Trust Alex" + 4 credential cards (colored SVG icon tile [trophy / users / newspaper / award] + bold title + muted body, hover-lift)

=== ANIMATIONS (IntersectionObserver) ===
- 3 columns fade in staggered (~0.1s each)
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack vertically (photo 16:9 top, bio mid, credentials bottom)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V8 (3-Column · Structured SaaS).

— BRAND COLORS —
--bg: #F7F8FA · --accent: #4F46E5 · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --check: #16A34A · --mid-bg: #FFFFFF · --cta-bg: #4F46E5 · --star: #F59E0B · icon tiles: #4F46E5 / #2563EB / #D97706 / #16A34A

— FONTS —
DM Sans (body/headings) + Caveat (signature) — Google Fonts

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (right col — bold title + muted body): "$0 → $2M in 36 months" / "Client results generated from a standing start" · "500+ clients coached" / "Professionals and business owners to their income goals" · "Featured in major media" / "Forbes, Entrepreneur, and Inc. Magazine" · "Created the method" / "The Revenue Architecture Framework™ — used in 12 countries"
CTA: Work With Alex →`,
  },
  {
    id: "authority",
    number: "09i",
    label: "AUTHORITY",
    title: "Authority Variation 9",
    description:
      "Bio (photo + story) over a full-width as-seen-in media bar. Nunito, warm community-driven health/life coaching.",
    labelClass: labelClasses.authority,
    previewSrc: "/private/authority-v9-thumb.webp",
    funnelTypes: ["Wellness", "Life Coaching", "Community"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Authority section (Section 09 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why should I believe you?"

=== OUTPUT ===
File: 10-authority-12.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Coach photo · Label "Meet Your Coach"
- H2 = transformation arc · Epiphany paragraph
- 4 ✓ credentials · CTA · min section height 500px
- Media credibility row ("As Seen In")

=== LAYOUT ===
- White bg, TOP 2-col: LEFT 38% coach photo (tall, rounded, warm tint) · RIGHT 62% label → H2 → epiphany → green-✓ credentials → CTA
- BOTTOM full-width gray band: centered "As Seen In" label + media logos row (CSS text, mixed weights, grayscale)

=== ANIMATIONS (IntersectionObserver) ===
- Bio fades up · media logos fade in staggered left → right
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Photo top (16:9), bio below, media logos wrap

Build the complete file now.`,
    varsPrompt: `Apply these client values to Authority V9 (Bio + As-Seen-In Media · Warm Community).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #16A34A · --text: #0E1116 · --muted: #4A5160 · --border: #E4E7EB · --check: #16A34A · --media-bg: #F7F8FA · --cta-bg: #16A34A

— FONTS —
Nunito (Google Fonts)

— IMAGE —
Coach photo (portable Unsplash placeholder — swap real coach photo): https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80

— COPY —
Label: Meet Your Coach · Coach: Alex Rivera
H2 (arc): From $97K and 1,400 Rejected Applications → $248K TC at Meta in 87 Days
Epiphany: "I wasn't the smartest person in the room. I wasn't the most connected. I wasn't even the most experienced. What I had was a willingness to reverse-engineer every part of the system everyone else was guessing at. Three years of failures. One breakthrough. Everything you'll learn in this program is exactly what I wish I'd had at the start."
Credentials (✓): "Grew from $0 to $2M in client results inside 36 months" · "Coached 500+ professionals and business owners to their income goals" · "Featured in Forbes, Entrepreneur, and Inc. Magazine" · "Creator of The Revenue Architecture Framework™ — used in 12 countries"
As Seen In: Forbes | Entrepreneur | Inc. | Business Insider | Fast Company
CTA: Start My Journey →`,
  },
  {
    id: "urgency",
    number: "10a",
    label: "URGENCY",
    title: "Urgency Variation 1",
    description:
      "Dark centered countdown — red radial glow, 4 timer boxes, scarcity + trust line. Space Grotesk, bold high-energy.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v1-thumb.webp",
    funnelTypes: ["Coaching", "Course", "Cohort"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background (override any light theme)
- Label (accent color, uppercase)
- H2 = specific deadline statement
- Sub-paragraph = what changes after the deadline
- Countdown timer: Days · Hrs · Min · Sec (large accent numbers, tabular-nums, uppercase labels)
- CTA button · scarcity line with a real number ("8 of 30 seats remaining")
- Stack 2+ urgency drivers (deadline + price increase + seat cap)
- min section height 500px

=== COUNTDOWN RULES ===
- Single JS variable: const DEADLINE = "2026-08-01T23:59:59"; (client edits this one line)
- Updates every second via setInterval(…,1000)
- When the deadline passes: hide the timer, show "Enrollment is now closed"
- Use font-variant-numeric: tabular-nums for stable digit width
- Works without JS: show a static deadline date as fallback

=== LAYOUT ===
- Full dark bg, centered column (max-width 700px), subtle red radial glow behind the timer
- Label (red pill) → H2 → sub → timer label → 4 dark timer boxes with red numbers + colon separators → red CTA (full width) → red scarcity line → small muted trust line

=== ANIMATIONS (IntersectionObserver) ===
- Section fades in · timer boxes scale 0.9 → 1.0 · timer ticks every second
- prefers-reduced-motion: skip entrance

=== MOBILE (≤768px) ===
- Boxes flex to full width, smaller separators

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V1 (Dark Centered Countdown).

— BRAND COLORS —
--bg: #050510 · --accent: #EF4444 · --timer-bg: #111122 · --timer-border: rgba(239,68,68,0.2) · --timer-num: #EF4444 · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #EF4444 · --cta-text: #FFFFFF

— FONTS —
Space Grotesk (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30;

— COPY —
Label: THIS COHORT CLOSES FRIDAY
H2: Your Last Chance at the Founding Member Price.
Sub: "After Friday at midnight, this cohort closes and the price increases to $9,997. The fast-action bonuses disappear permanently."
Timer label: Enrollment closes in:
CTA: CLAIM MY SPOT BEFORE MIDNIGHT →
Scarcity: ⚠ Only 8 of 30 seats remaining
Trust: 30-day guarantee · Secure checkout`,
  },
  {
    id: "urgency",
    number: "10b",
    label: "URGENCY",
    title: "Urgency Variation 2",
    description:
      "Split — urgency + gold timer (left) + mini offer card (right). Space Grotesk, dark gold high-ticket.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v2-thumb.webp",
    funnelTypes: ["High-Ticket", "Mastermind", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · Label (accent, uppercase) · H2 deadline statement · sub = what changes after
- Countdown timer (Days · Hrs · Min · Sec, tabular-nums) · CTA · real scarcity number
- Stack 2+ urgency drivers (deadline + price + seat cap) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show "Enrollment is now closed" when passed · tabular-nums · static fallback

=== LAYOUT ===
- Full dark split inside one bordered rounded wrapper
- LEFT 55%: label → H2 → sub → gold timer (gold numbers, gold box borders) → red scarcity line
- RIGHT 45%: mini offer card (darker bg) — header + 3 green-✓ items + "Price today: $4,997" + full-width gold CTA
- Subtle divider between columns

=== ANIMATIONS (IntersectionObserver) ===
- Left timer counts · right offer slides in from right · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack (urgency top, offer below)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V2 (Split Urgency + Mini Offer).

— BRAND COLORS —
--bg: #0A0A14 · --left-bg: #0D0D1A · --right-bg: #111120 · --accent: #F5C842 · --timer-num: #F5C842 · --timer-bg: rgba(245,200,66,0.08) · --timer-border: rgba(245,200,66,0.25) · --danger: #EF4444 · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #F5C842 · --cta-text: #0A0A14 · --border: rgba(255,255,255,0.06)

— FONTS —
Space Grotesk (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30;

— COPY —
LEFT — Label: ENROLLMENT CLOSES · H2: This Cohort Closes Friday. · Sub: "Price increases to $9,997 at midnight. Bonuses expire permanently." · Timer label: Time remaining: · Scarcity: ⚠ 8 of 30 seats remaining
RIGHT — Header: 8 SEATS LEFT AT THIS PRICE · Items (✓): "12-Week Agency Accelerator Program" · "All bonuses included (expires Friday)" · "Founding member pricing locked" · Price today: $4,997 · CTA: ENROLL NOW →`,
  },
  {
    id: "urgency",
    number: "10c",
    label: "URGENCY",
    title: "Urgency Variation 3",
    description:
      "Countdown + after-deadline loss/keep comparison (red vs green). Outfit, dark navy consequence-driven.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v3-thumb.webp",
    funnelTypes: ["Consulting", "SaaS", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-04.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · Label · H2 deadline statement · countdown timer (tabular-nums) · CTA · real scarcity number
- Stack 2+ urgency drivers (deadline + price + bonus) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Dark navy bg, centered timer (blue numbers)
- Below timer: 2-col loss/keep grid — LEFT red tint "After Friday you lose" (3 ✗) · RIGHT green tint "Enroll now and keep" (3 ✓)
- Blue CTA centered · red scarcity line below

=== ANIMATIONS (IntersectionObserver) ===
- Timer appears first · comparison grid fades up after a ~0.4s delay · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Timer top, grid stacks

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V3 (Countdown + What You Lose).

— BRAND COLORS —
--bg: #07091A · --accent: #3B82F6 · --timer-bg: rgba(59,130,246,0.08) · --timer-border: rgba(59,130,246,0.25) · --timer-num: #3B82F6 · --old-bg: rgba(220,38,38,0.05) · --old-border: rgba(220,38,38,0.2) · --new-bg: rgba(22,163,74,0.05) · --new-border: rgba(22,163,74,0.2) · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #3B82F6 · --danger: #EF4444 · --success: #22C55E

— FONTS —
Outfit (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30;

— COPY —
Label: THE CLOCK IS RUNNING · H2: What Changes When the Timer Hits Zero.
After Friday you lose (✗): "The $4,997 founding member price" · "Fast-action bonus pack ($591 value)" · "Access to the current cohort"
Enroll now and keep (✓): "Locked-in price — never increases" · "All fast-action bonuses included" · "Immediate access to onboarding"
CTA: LOCK IN MY SPOT → · Scarcity: ⚠ 8 of 30 seats remaining`,
  },
  {
    id: "urgency",
    number: "10d",
    label: "URGENCY",
    title: "Urgency Variation 4",
    description:
      "Seat-scarcity progress bar (green→red, animated fill) + price-reset timer. Inter, FOMO-driven dark.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v4-thumb.webp",
    funnelTypes: ["Cohort", "Course", "Membership"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · Label · H2 deadline/scarcity statement · sub = what changes after
- Countdown timer (tabular-nums) · CTA · real scarcity number (seats taken)
- Stack 2+ urgency drivers (seat cap + price reset) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Full dark bg, centered column (max-width 700px)
- Scarcity progress bar: full width, 12px tall, rounded, gradient fill green → red, fill = SEATS_TAKEN/SEATS_TOTAL (≈73%), animates from 0% on scroll entry
- Before/after labels above bar + red "seats remaining" warning below
- Timer below bar (green numbers) → green wide CTA → muted price note below

=== ANIMATIONS (IntersectionObserver) ===
- Bar fills on entry · timer appears after the bar · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V4 (Seat Scarcity Progress Bar).

— BRAND COLORS —
--bg: #050505 · --accent: #16A34A · --bar-from: #16A34A · --bar-to: #EF4444 · --timer-bg: rgba(22,163,74,0.08) · --timer-border: rgba(22,163,74,0.25) · --timer-num: #22C55E · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #16A34A · --danger: #EF4444

— FONTS —
Inter (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_TAKEN = 22; · const SEATS_TOTAL = 30; · const SEATS_LEFT = 8;

— COPY —
Label: LIMITED ENROLLMENT — CLOSING SOON · H2: 22 of 30 Seats Have Been Claimed.
Sub: "Once the final 8 spots are gone, enrollment closes until the next cohort — in 6 months."
Bar labels: "Seats taken" (left) · "22 of 30 filled" (right) · Warning: ⚠ 8 seats remaining
Timer label: Plus — price resets Friday:
CTA: CLAIM ONE OF THE 8 REMAINING SPOTS → · Note: Next cohort opens in 6 months at $9,997`,
  },
  {
    id: "urgency",
    number: "10e",
    label: "URGENCY",
    title: "Urgency Variation 5",
    description:
      "Three stacked urgency drivers (deadline / bonus / seats) + timer. DM Sans, decision-forcing dark.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v5-thumb.webp",
    funnelTypes: ["Coaching", "Consulting", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · Label · H2 · countdown timer (tabular-nums) · CTA · real scarcity number
- Stack 3 urgency drivers explicitly (deadline + bonus expiry + seat cap) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Full dark bg, centered header (label + H2)
- 3 driver rows stacked, each: icon circle + title + body + right-aligned colored badge; colored border + subtle tint (Driver 1 red / Driver 2 amber / Driver 3 blue)
- Timer centered below drivers (dark glass boxes, white numbers) → red CTA → scarcity line

=== ANIMATIONS (IntersectionObserver) ===
- Drivers slide up staggered (~0.15s each) · timer fades in last · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full-width stack

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V5 (Three Urgency Drivers).

— BRAND COLORS —
--bg: #0A0A10 · driver-1: rgba(239,68,68,…) red · driver-2: rgba(245,158,11,…) amber · driver-3: rgba(37,99,235,…) blue · --timer-bg: rgba(255,255,255,0.04) · --timer-border: rgba(255,255,255,0.1) · --timer-num: #FFFFFF · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #EF4444 · --accent: #EF4444

— FONTS —
DM Sans (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30;

— COPY —
Label: 3 REASONS TO DECIDE RIGHT NOW · H2: Every Day You Wait Costs You Something.
Driver 1 (red, ⏰): "Enrollment Closes Friday" / "This cohort closes at midnight. After that, you wait 6 months for the next opening." / badge CLOSES FRIDAY
Driver 2 (amber, 🎁): "Bonuses Expire at Midnight" / "The $591 fast-action bonus pack disappears permanently when the clock hits zero." / badge BONUS EXPIRES
Driver 3 (blue, 🪑): "Only 8 Seats Remaining" / "This cohort is capped at 30. 22 people have already enrolled. The last 8 fill fast." / badge 8 SEATS LEFT
Timer label: Enrollment closes in: · CTA: ENROLL BEFORE IT'S GONE → · Scarcity: ⚠ 8 of 30 seats · Price increases Friday`,
  },
  {
    id: "urgency",
    number: "10f",
    label: "URGENCY",
    title: "Urgency Variation 6",
    description:
      "Gold premium dark — gold glow behind gold-bordered timer, price-increase framing. Space Grotesk, exclusive.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v6-thumb.webp",
    funnelTypes: ["High-Ticket", "Premium", "Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · urgency badge · H2 deadline/price statement · sub = what changes after
- Countdown timer (tabular-nums) · CTA · real scarcity number
- Stack 2+ urgency drivers (price increase + bonus + closing) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Full black bg with gold radial glow behind the timer (CSS only) + subtle gold vignette
- Urgency badge (red pill) → H2 (gold accent on "$4,997") → sub → timer label → 4 gold-bordered boxes with gold numbers (44px) and gold glow box-shadow → gold CTA (black text) → red price note below → small muted scarcity

=== ANIMATIONS (IntersectionObserver) ===
- Glow pulses once · timer boxes scale in staggered · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Boxes flex to full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V6 (Gold Premium Dark).

— BRAND COLORS —
--bg: #050505 · --accent: #F5C842 · --glow: rgba(245,200,66,0.15) · --timer-bg: rgba(245,200,66,0.08) · --timer-border: rgba(245,200,66,0.3) · --timer-num: #F5C842 · --danger: #EF4444 · --text: #FFFFFF · --muted: #9A9A9A · --cta-bg: #F5C842 · --cta-text: #050505

— FONTS —
Space Grotesk (Google Fonts)

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30; · const PRICE_NOW = "$4,997"; · const PRICE_AFTER = "$9,997";

— COPY —
Urgency badge: ⚠ ENROLLMENT CLOSES FRIDAY
H2: This Is the Last Time We'll Offer This at $4,997.   (gold-accent the "$4,997")
Sub: "After Friday midnight, the price doubles to $9,997 — permanently. The bonuses disappear. This cohort closes."
Timer label: Time until price increase:
CTA: LOCK IN $4,997 BEFORE MIDNIGHT → · Below CTA: Price goes to $9,997 on Saturday · Scarcity: 8 of 30 seats · Closes Friday`,
  },
  {
    id: "urgency",
    number: "10g",
    label: "URGENCY",
    title: "Urgency Variation 7",
    description:
      "Price-increase anchor — today vs after price row + purple timer. Syne + Inter, neon decision-forcing.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v7-thumb.webp",
    funnelTypes: ["Course", "Coaching", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · Label · H2 (savings/price framing) · sub = only the price changes
- Countdown timer (tabular-nums) · CTA · real scarcity number
- Stack 2+ urgency drivers (price increase + seat cap) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Dark purple-black bg, label (purple pill) → H2 (Syne, large)
- Price comparison row (3-col flex): TODAY ONLY = large green price · red arrow → · AFTER FRIDAY = large red price with line-through
- Sub paragraph → timer label → purple-bordered timer (purple numbers) → purple CTA → red scarcity → trust line

=== ANIMATIONS (IntersectionObserver) ===
- Price row reveals · arrow pulsates on entry · timer ticks from load · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Price row stacks vertically (arrow rotates)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V7 (Price Increase Anchor).

— BRAND COLORS —
--bg: #0A0210 · --accent: #A855F7 · --timer-bg: rgba(168,85,247,0.08) · --timer-border: rgba(168,85,247,0.3) · --timer-num: #A855F7 · --price-now: #22C55E · --price-after: #EF4444 · --text: #FFFFFF · --muted: #9AA0B0 · --cta-bg: #A855F7 · --arrow-color: #EF4444

— FONTS —
Syne (headings) + Inter (body) — Google Fonts

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const PRICE_NOW = "$4,997"; · const PRICE_AFTER = "$9,997"; · const SAVINGS = "$5,000";

— COPY —
Label: PRICE INCREASES FRIDAY AT MIDNIGHT · H2: Save $5,000 by Deciding Today.
Price row: TODAY ONLY → $4,997 (green) · → · AFTER FRIDAY → $9,997 (red, line-through)
Sub: "The program doesn't change. The coaching doesn't change. Only the price does — permanently."
Timer label: This price locks in: · CTA: LOCK IN $4,997 NOW → · Scarcity: ⚠ 8 seats remaining at this price · Trust: 30-day guarantee · Secure checkout`,
  },
  {
    id: "urgency",
    number: "10h",
    label: "URGENCY",
    title: "Urgency Variation 8",
    description:
      "Neon dark + glowing purple timer (pulse loop), dual cap (seats or Friday). Outfit + Inter, tech-premium cohort.",
    labelClass: labelClasses.urgency,
    previewSrc: "/private/urgency-v8-thumb.webp",
    funnelTypes: ["Cohort", "SaaS", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Urgency section (Section 10 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: "Why now?"

=== OUTPUT ===
File: 11-urgency-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Dark background · badge · H2 (2 lines) · sub = dual cap (seats or deadline) + what's next
- Countdown timer (tabular-nums) · CTA · real scarcity number
- Stack 2+ urgency drivers (seat cap + deadline) · min height 500px

=== COUNTDOWN RULES ===
- const DEADLINE = "2026-08-01T23:59:59"; · setInterval(…,1000) · hide timer + show closed message when passed · tabular-nums · static fallback

=== LAYOUT ===
- Very dark bg (#04040C) with a purple neon radial glow in the center (CSS only)
- Badge (purple pill) → H2 (2 lines, line 2 purple accent) → sub → timer label → 4 boxes with purple border + purple numbers (44px) + purple glow box-shadow (subtle purple tint bg) → purple CTA → italic sub-CTA → small scarcity

=== ANIMATIONS (IntersectionObserver) ===
- Bg glow expands on entry · boxes scale 0.85 → 1.0 staggered · glow pulse loop (~2s) starts after entry · CTA glow intensifies on hover · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Urgency V8 (Neon Dark + Glow Timer).

— BRAND COLORS —
--bg: #04040C · --accent: #A855F7 · --glow-color: rgba(168,85,247,0.25) · --timer-bg: rgba(168,85,247,0.08) · --timer-border: rgba(168,85,247,0.35) · --timer-num: #A855F7 · --text: #FFFFFF · --muted: #8B8BA0 · --cta-bg: #A855F7 · --badge-bg: rgba(168,85,247,0.15)

— FONTS —
Outfit (headings) + Inter (body) — Google Fonts

— COUNTDOWN —
const DEADLINE = "2026-08-01T23:59:59"; · const SEATS_LEFT = 8; · const SEATS_TOTAL = 30;

— COPY —
Badge: LIMITED COHORT — CLOSING SOON
H2: The Window Is Closing.  /  (line 2, purple) Don't Miss This Cohort.
Sub: "Once the final 8 seats are taken or Friday hits — whichever comes first — enrollment closes. Next cohort: 6 months from now at a higher price."
Timer label: Enrollment closes in: · CTA: SECURE MY SPOT NOW → · Sub-CTA: Join 22 people already enrolled · Scarcity: 8 of 30 seats · Closes Friday`,
  },
  {
    id: "faq",
    number: "11a",
    label: "FAQ",
    title: "FAQ Variation 1",
    description:
      "Classic single-column accordion (8 items, first open). Inter, clean corporate · blue open-state + circle toggles.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v1-thumb.webp",
    funnelTypes: ["Corporate", "Coaching", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 ("Questions Before You Enroll")
- 6–8 FAQ items (first item OPEN by default)
- Each item: bold question (17px) + 28px circle toggle + muted answer (15px); border-bottom between items
- 6 MANDATORY topics present: who it's for · #1 audience objection · what's different · time/week · guarantee (restated) · start date
- Only ONE item open at a time; smooth max-height transition (not display)
- Works without JS: all answers show expanded · min section height 400px

=== LAYOUT ===
- White bg, centered column (max-width 760px), header (label + H2 + sub)
- Bordered accordion container; open item = light-blue tint bg + blue left border; toggle = blue circle (+ → −)

=== ANIMATIONS (IntersectionObserver) ===
- Items fade up staggered on entry · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V1 (Classic Single-Column · Clean Corporate).

— BRAND COLORS —
--bg: #FFFFFF · --bg-alt: #F7F8FA · --accent: #2563EB · --text: #0E1116 · --muted: #4A5160 · --border: #E4E7EB · --open-bg: #F0F7FF · --open-border: #2563EB · --toggle-bg: #EFF6FF · --toggle-color: #2563EB

— FONTS —
Inter (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll · Sub: Everything you need to know before joining — answered straight.

— FAQ COPY BANK (order Q1→Q8, Q1 open) —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11b",
    label: "FAQ",
    title: "FAQ Variation 2",
    description:
      "2-column accordion grid (independent columns). Manrope, consulting · teal open-state.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v2-thumb.webp",
    funnelTypes: ["Consulting", "B2B", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-02.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 · 8 FAQ items split across 2 columns (first item open)
- Each item: bold question + 28px circle toggle + muted answer; border-bottom between
- 6 MANDATORY topics present · only one item open per column · smooth max-height transition
- Works without JS: all answers expanded · min height 400px

=== LAYOUT ===
- Light gray bg, centered header, 2-col grid below (each col a separate bordered accordion)
- LEFT col: Q1 (open), Q3, Q5, Q7 · RIGHT col: Q2, Q4, Q6, Q8
- Open item: teal tint bg + teal left border; toggle = teal circle

=== ANIMATIONS (IntersectionObserver) ===
- Left col slides in from left · right col slides in from right · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack single column (left items, then right items)

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V2 (2-Column Accordion · Consulting).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #0F766E · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --open-bg: #F0FDFA · --open-border: #0F766E · --toggle-bg: #CCFBF1 · --toggle-color: #0F766E

— FONTS —
Manrope (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— COLUMN SPLIT —
Left: Q1 (open), Q3, Q5, Q7 · Right: Q2, Q4, Q6, Q8

— FAQ COPY BANK —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11c",
    label: "FAQ",
    title: "FAQ Variation 3",
    description:
      "Dark premium accordion (8 items, first open). Space Grotesk · gold toggles + gold-tinted open state.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v3-thumb.webp",
    funnelTypes: ["High-Ticket", "Premium", "Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 (white) · 8 FAQ items (first open)
- Each item: bold white question + 28px gold circle toggle + muted answer; border-bottom between
- 6 MANDATORY topics present · only one open at a time · smooth max-height transition
- Works without JS: all answers expanded · min height 400px

=== LAYOUT ===
- Full dark bg, centered column (max-width 760px), dark card accordion + subtle border
- Open item: very-dark gold-tinted bg + 2px gold left border; toggle = gold circle

=== ANIMATIONS (IntersectionObserver) ===
- Card slides up on section entry · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V3 (Dark Premium Accordion).

— BRAND COLORS —
--bg: #0A0A10 · --card-bg: #111118 · --accent: #F5C842 · --text: #FFFFFF · --muted: #9A9A9A · --border: #1E1E28 · --open-bg: #16160E · --open-border: rgba(245,200,66,0.4) · --toggle-bg: rgba(245,200,66,0.15) · --toggle-color: #F5C842

— FONTS —
Space Grotesk (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— FAQ COPY BANK (order Q1→Q8, Q1 open) —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11d",
    label: "FAQ",
    title: "FAQ Variation 4",
    description:
      "Categorized FAQ with tabs (Program · Results · Payment · Guarantee). DM Sans, modern SaaS · indigo.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v4-thumb.webp",
    funnelTypes: ["SaaS", "Course", "Consulting"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 · FAQ items grouped under category tabs (first item per tab open)
- Each item: bold question + 28px circle toggle + muted answer
- 6 MANDATORY topics present (across tabs) · only one open per tab · smooth max-height transition
- Works without JS: hide tabs, show all panels with answers expanded · min height 400px

=== LAYOUT ===
- White bg, centered header, row of 4 tab pills (active = indigo bg + white text)
- Accordion below shows only the active tab's questions; switching tabs = smooth fade
- Tabs → questions: Program (Q1, Q4, Q6) · Results (Q2, Q3) · Payment (Q7, Q8) · Guarantee (Q5); default tab Program
- Open item: indigo tint + indigo left border; toggle = indigo circle

=== ANIMATIONS (IntersectionObserver / JS) ===
- Tab switch fade · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Tabs scroll horizontally

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V4 (Categorized Tabs · Modern SaaS).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #4F46E5 · --tab-active: #4F46E5 · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --open-bg: #F8FAFF · --toggle-bg: #EEF2FF · --toggle-color: #4F46E5

— FONTS —
DM Sans (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— TABS → QUESTIONS —
Program: Q1, Q4, Q6 (Q1 open) · Results: Q2, Q3 (Q2 open) · Payment: Q7, Q8 (Q7 open) · Guarantee: Q5 (open) · Default tab: Program

— FAQ COPY BANK —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11e",
    label: "FAQ",
    title: "FAQ Variation 5",
    description:
      "Search-style FAQ with live filter (type to filter, no-results state). Plus Jakarta Sans, fresh wellness · green.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v5-thumb.webp",
    funnelTypes: ["Wellness", "Course", "Membership"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-06.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 · 8 FAQ items (first open)
- Each item: bold question + 28px circle toggle + muted answer; border-bottom between
- 6 MANDATORY topics present · only one open at a time · smooth max-height transition
- Works without JS: hide search, show all answers expanded · min height 400px

=== LAYOUT ===
- Light green bg, centered header, search input (magnifier + "Search questions...") below header
- JS filters questions as the user types (hide non-matching); show "No results found" when none match
- Open item: green tint bg + green left border; toggle = green circle

=== ANIMATIONS (IntersectionObserver) ===
- Search bar + items fade in on entry · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V5 (Search-Style Filter · Wellness).

— BRAND COLORS —
--bg: #F0FDF4 · --accent: #16A34A · --search-bg: #FFFFFF · --text: #14532D · --muted: #4B5563 · --border: #D1FAE5 · --open-bg: #DCFCE7 · --open-border: #16A34A · --toggle-bg: #BBFFD2 · --toggle-color: #16A34A

— FONTS —
Plus Jakarta Sans (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll · Search placeholder: "Search questions..." · No-results: "No results found. Try a different keyword."

— FAQ COPY BANK (order Q1→Q8, Q1 open) —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11f",
    label: "FAQ",
    title: "FAQ Variation 6",
    description:
      "Bold numbered FAQ list (colored 01–08 numerals). Outfit, dark neon · purple open-state.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v6-thumb.webp",
    funnelTypes: ["SaaS", "Premium", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-08.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 (white) · 8 FAQ items (first open)
- Each item: large colored number (left) + bold question + 28px circle toggle + muted answer; border-bottom between
- 6 MANDATORY topics present · only one open at a time · smooth max-height transition
- Works without JS: all answers expanded · min height 400px

=== LAYOUT ===
- Dark bg, centered column (max-width 700px)
- Each item: 32px bold colored numeral (01 blue · 02 amber · 03 green · 04 red · 05 purple · 06 teal · 07–08 repeat) + question + toggle, answer indented
- Open item: subtle purple tint bg

=== ANIMATIONS (IntersectionObserver) ===
- Items fly up staggered with the numeral lighting up · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Numerals stay visible, text wraps

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V6 (Bold Numbered List · Dark Neon).

— BRAND COLORS —
--bg: #0F0F1A · --accent: #A855F7 · num-1: #3B82F6 · num-2: #F59E0B · num-3: #22C55E · num-4: #EF4444 · num-5: #A855F7 · num-6: #0891B2 · --text: #FFFFFF · --muted: #9AA0B0 · --open-bg: rgba(168,85,247,0.06) · --open-border: rgba(168,85,247,0.3) · --border: rgba(255,255,255,0.06)

— FONTS —
Outfit (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— FAQ COPY BANK (numbered 01→08, 01 open) —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11g",
    label: "FAQ",
    title: "FAQ Variation 7",
    description:
      "Card-style FAQ grid (2×4 cards, one open at a time). Nunito, warm coaching · orange open-state.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v7-thumb.webp",
    funnelTypes: ["Coaching", "Wellness", "Community"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 · 8 FAQ cards in a 2×4 grid (first card open)
- Each card: bold question title + 28px circle toggle (top-right) + collapsible muted answer
- 6 MANDATORY topics present · only one card open at a time · smooth max-height transition
- Works without JS: all answers expanded · min height 400px

=== LAYOUT ===
- Light gray bg, 2×4 card grid; card order Q1,Q2 / Q3,Q4 / Q5,Q6 / Q7,Q8
- Each card: white bg + border; open card = warm-orange tint bg + orange border + soft shadow; toggle = orange circle

=== ANIMATIONS (IntersectionObserver) ===
- Cards fade up in pairs (row by row) · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Single column stack

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V7 (Card-Style Grid · Warm Coaching).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #EA580C · --card-bg: #FFFFFF · --open-card: #FFF7ED · --open-border: #EA580C · --text: #1C1917 · --muted: #78716C · --border: #E7E5E4 · --toggle-bg: #FED7AA · --toggle-color: #EA580C

— FONTS —
Nunito (Google Fonts)

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— CARD ORDER (2×4, Q1 open) —
Row 1: Q1, Q2 · Row 2: Q3, Q4 · Row 3: Q5, Q6 · Row 4: Q7, Q8

— FAQ COPY BANK —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."
Q7 — Are there payment plan options? — "Yes. You can pay in full at $4,997 or choose our 3-payment plan at $1,997/month. Both options include identical access to everything in the program."
Q8 — Do I need any specific tools or software? — "No specialized tools required. We use a simple tech stack that you likely already have: email, a calendar, and a basic CRM (we recommend free options). We walk you through setup on the onboarding call."`,
  },
  {
    id: "faq",
    number: "11h",
    label: "FAQ",
    title: "FAQ Variation 8",
    description:
      "FAQ accordion (Q1–Q6) + sticky contact widget (live chat + email + CTA card). DM Serif + DM Sans · purple.",
    labelClass: labelClasses.faq,
    previewSrc: "/private/faq-v8-thumb.webp",
    funnelTypes: ["Premium", "Coaching", "Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium FAQ section (Section 11 of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: pre-empts the final objections before enrollment.

=== OUTPUT ===
File: 12-faq-12.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Section head: label + H2 · FAQ accordion (Q1–Q6, first open) covering all 6 mandatory topics
- Each item: bold question + 28px circle toggle + muted answer; border-bottom between
- Only one open at a time · smooth max-height transition · works without JS (answers expanded) · min height 400px

=== LAYOUT ===
- White bg, 2-col · LEFT 62%: label + H2 (serif) + FAQ accordion (purple toggles, purple tint open)
- RIGHT 38%: sticky widget panel — "Still have a question?" + Live Chat option (purple icon) + Email option (green icon) + a CTA card (purple border + button)
- Widget stays sticky on desktop scroll

=== ANIMATIONS (IntersectionObserver) ===
- Left fades up · right widget slides in from right · prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- FAQ full width on top, widget below (not sticky)

Build the complete file now.`,
    varsPrompt: `Apply these client values to FAQ V8 (FAQ + Contact Widget · Premium Editorial).

— BRAND COLORS —
--bg: #FFFFFF · --accent: #7C3AED · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --open-bg: #FAF5FF · --open-border: #7C3AED · --toggle-bg: #EDE9FE · --toggle-color: #7C3AED · --widget-bg: #F8FAFC · --chat-color: #7C3AED · --email-color: #16A34A

— FONTS —
DM Serif Display (headings) + DM Sans (body) — Google Fonts

— HEADER —
Label: BEFORE YOU ENROLL · H2: Questions Before You Enroll

— FAQ COPY BANK (Q1–Q6, Q1 open) —
Q1 — Who is this perfect for? — "This is for coaches, consultants, and service providers doing $0–$15K/mo who are ready to build a predictable system to $30K–$50K/mo. If you're already above $50K/mo, this likely isn't the right fit — our advanced program would serve you better."
Q2 — What if I don't have a big audience or following? — "You don't need one. Our entire system is built around direct outreach and referral-based lead generation — not content creation or social media. Our highest-earning clients have under 500 followers on any platform."
Q3 — I've invested in programs before and got nothing. Why is this different? — "Most programs sell information. We sell implementation. Every week you have a live call where we work through YOUR specific situation — not a recording, not a template answer. Plus our $20K Revenue Guarantee means we keep working with you until results happen. No other program in this space offers that."
Q4 — How much time does this require per week? — "Plan for 4–6 hours per week. This includes two hours for the core curriculum, one weekly group call, and implementation time. We've designed the program around people who already have a full schedule — because the system works within your current hours, not on top of them."
Q5 — Is there a money-back guarantee? — "Yes — two layers. First, a full 14-day no-questions-asked refund. If within 14 days you decide it's not right for you, email us and receive a complete refund. Second, our $20K Revenue Guarantee: complete the program, implement the system, and if you don't hit $20K/mo within 90 days of finishing — we coach you for free until you do."
Q6 — When does it start and how does access work? — "You get immediate access to the full portal upon enrollment. The next live cohort begins the first Monday of next month. You'll receive a welcome email with your login, onboarding call schedule, and community access within 15 minutes of enrolling."

— CONTACT WIDGET —
Title: Still have a question? · Sub: We typically respond within 2 hours.
Live Chat (purple bubble icon): "Chat with our team right now" → "Start a conversation →"
Email Us (green mail icon): support@yourprogram.com → "Send an email →"
CTA card: "Ready to enroll?" · "Join 500+ clients already inside" · button "Enroll Now →"`,
  },
  {
    id: "footer",
    number: "12a",
    label: "FOOTER",
    title: "Footer Variation 1",
    description:
      "Classic final CTA + simple footer (logo · nav · ©). Inter, clean corporate · blue.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v1-thumb.webp",
    funnelTypes: ["Corporate", "Coaching", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-01.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- H2 restates the core promise as a directive
- Short paragraph restates audience + social proof
- CTA button includes the price in microcopy ("Enroll Now — $4,997 →")
- Trust line: refund + guarantee + payment plan
- Footer: logo (left) + nav links + © (right); nav = Privacy | Terms | Disclaimer | Contact
- min CTA height 300px

=== LAYOUT ===
- Light CTA section, centered column (max-width 760px): small uppercase label → large bold H2 → muted 18px sub → blue CTA pill (price in button) → small muted trust line
- Separator line, then footer (light-blue bg): logo left + nav links inline center + © right

=== ANIMATIONS (IntersectionObserver) ===
- CTA section fades up · CTA button pulses once on entry · footer links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Footer stacks; nav links wrap

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V1 (Classic Final CTA · Clean Corporate).

— BRAND COLORS —
--bg: #FFFFFF · --cta-bg: #F7F8FA · --accent: #2563EB · --text: #0E1116 · --muted: #4A5160 · --footer-bg: #F0F4FF · --border: #E4E7EB · --cta-btn: #2563EB

— FONTS —
Inter (Google Fonts)

— COPY —
Label: YOUR MOVE
H2: Stop Waiting for the Right Moment. This Is It.
Sub: "Join 500+ coaches, consultants, and service providers who made the same decision you're about to make. The program works. The guarantee protects you. The only question is whether you're ready."
CTA: Enroll Now — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Footer: Logo "Revenue Architecture" · nav: Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12b",
    label: "FOOTER",
    title: "Footer Variation 2",
    description:
      "Split final CTA (left) + 4 trust signals (right), dark footer. Manrope, trust-heavy · green.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v2-thumb.webp",
    funnelTypes: ["Corporate", "Consulting", "B2B"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-03.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- H2 directive · short paragraph (audience + social proof)
- CTA button with price microcopy · trust line (refund + guarantee + payment plan)
- Footer: logo + Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- Split CTA wrapper · LEFT 55% (white): H2 + sub + green CTA + trust line · RIGHT 45% (light green): 4 trust signals (icon + title + body each: 30-day refund · secure checkout · $20K guarantee · 500+ enrolled)
- Dark navy footer below: logo left + nav center + © right

=== ANIMATIONS (IntersectionObserver) ===
- Left slides up · right trust signals stagger in · CTA pulses once · footer links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stack (CTA top, trust signals below, dark footer)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V2 (Split CTA + Trust Signals · Trust-Heavy).

— BRAND COLORS —
--bg: #F8FAFC · --left-bg: #FFFFFF · --right-bg: #F0FDF4 · --accent: #16A34A · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --footer-bg: #0F172A · --footer-text: #94A3B8 · --cta-btn: #16A34A · signals: green/blue/amber/purple

— FONTS —
Manrope (Google Fonts)

— COPY —
H2: You Already Know What You Need to Do.
Sub: "Join 500+ coaches, consultants, and service providers who made the same decision you're about to make. The program works. The guarantee protects you. The only question is whether you're ready."
CTA: Claim My Spot — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Trust signals: "30-Day Money-Back Guarantee / Full refund, no questions asked" · "256-bit Secure Checkout / Your information is protected" · "$20K Revenue Guarantee / We coach you free until you win" · "500+ Clients Already Enrolled / Join a proven community"
Footer: Logo "Revenue Architecture" · Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12c",
    label: "FOOTER",
    title: "Footer Variation 3",
    description:
      "Minimal CTA + rich 4-column footer (Program / Support / Legal + social). DM Sans, modern SaaS · indigo.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v3-thumb.webp",
    funnelTypes: ["SaaS", "Agency", "Course"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-05.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- H2 directive · CTA with price microcopy · trust line
- Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- White CTA section: centered, minimal — H2 → indigo CTA button → trust line only
- Dark indigo footer, 4 columns: (1) logo + tagline + social icons · (2) Program links · (3) Support links · (4) Legal links (Privacy/Terms/Disclaimer/Cookie); bottom bar with centered ©

=== ANIMATIONS (IntersectionObserver) ===
- Footer columns fade up staggered · CTA pulses once · links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- CTA full width; footer 2×2 grid; bottom bar stacks

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V3 (Minimal CTA + Rich 4-Col Footer · Modern SaaS).

— BRAND COLORS —
--bg: #FFFFFF · --cta-bg: #F0F7FF · --accent: #4F46E5 · --text: #0F172A · --muted: #64748B · --footer-bg: #1E1B4B · --footer-muted: #A5B4FC · --border: #E2E8F0 · --cta-btn: #4F46E5

— FONTS —
DM Sans (Google Fonts)

— COPY —
H2: The Only Thing Between You and $50K/mo Is This Decision.
CTA: Yes, I'm Ready — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Footer Col 1: "Revenue Architecture" + "Building the future of professional coaching." + social (f · in · yt · x)
Col 2 Program: About the Method, Success Stories, The Guarantee, Start Here
Col 3 Support: FAQ, Contact Us, Refund Policy, Affiliate Program
Col 4 Legal: Privacy Policy, Terms of Service, Disclaimer, Cookie Policy
Bottom: © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12d",
    label: "FOOTER",
    title: "Footer Variation 4",
    description:
      "Gradient-accent CTA (animated shimmer) + minimal centered footer. Outfit, premium wellness · purple.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v4-thumb.webp",
    funnelTypes: ["Wellness", "Coaching", "Personal Brand"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-07.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Label + H2 directive · short paragraph (audience + social proof)
- CTA with price microcopy · trust line
- Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- CTA section with a subtle diagonal indigo→green gradient bg (animated shimmer via CSS keyframes), centered column
- Label (uppercase purple) → bold H2 → muted sub → purple CTA pill → small trust line
- Minimal footer: logo centered + nav links centered + © centered (3 stacked rows), white bg, light top border

=== ANIMATIONS (IntersectionObserver) ===
- Gradient shimmer loop · CTA glows on entry · links hover-underline
- prefers-reduced-motion: skip (freeze gradient)

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V4 (Gradient Accent CTA · Premium Wellness).

— BRAND COLORS —
--bg: #FAFAFA · --gradient-from: #EEF2FF · --gradient-to: #F0FDF4 · --accent: #7C3AED · --text: #0F172A · --muted: #64748B · --footer-bg: #FFFFFF · --border: #E5E7EB · --cta-btn: #7C3AED

— FONTS —
Outfit (Google Fonts)

— COPY —
Label: ONE LAST THING
H2: Every Day You Wait Is Another Day Someone Else Gets There First.
Sub: "Join 500+ coaches, consultants, and service providers who made the same decision you're about to make. The program works. The guarantee protects you. The only question is whether you're ready."
CTA: Start Today — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Footer: Logo "Revenue Architecture" · Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12e",
    label: "FOOTER",
    title: "Footer Variation 5",
    description:
      "Stats recap (4 count-up stats) + final CTA + dark footer. Space Grotesk, results-obsessed · gold.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v5-thumb.webp",
    funnelTypes: ["High-Ticket", "Premium", "Mastermind"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-09.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- H2 directive · short paragraph (audience + social proof)
- CTA with price microcopy · trust line
- Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- Full dark bg · stats bar: 4 colored count-up numbers in a row (count up on scroll entry)
- Below stats: centered H2 + sub + gold CTA (dark text) + muted trust line
- Dark footer (#080808): logo left + nav center + © right

=== ANIMATIONS (IntersectionObserver) ===
- Stats count up on entry · CTA section fades up after stats · CTA pulses once · links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Stats 2×2, full-width CTA

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V5 (Stats Recap + CTA · Results-Obsessed).

— BRAND COLORS —
--bg: #0A0A0A · --stats-bg: #111111 · --accent: #F5C842 · stat-1: #3B82F6 · stat-2: #22C55E · stat-3: #F59E0B · stat-4: #A855F7 · --text: #FFFFFF · --muted: #9A9A9A · --footer-bg: #080808 · --border: #222222 · --cta-btn: #F5C842 · --cta-text: #0A0A0A

— FONTS —
Space Grotesk (Google Fonts)

— COPY —
Stats (count-up): 500+ Clients Transformed · $2M+ Client Revenue Generated · 81% Success Rate · 4.9★ Average Rating
H2: The Numbers Don't Lie. Neither Do We.
Sub: "Join 500+ coaches, consultants, and service providers who made the same decision you're about to make. The program works. The guarantee protects you. The only question is whether you're ready."
CTA: Enroll Now — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Footer: Logo "Revenue Architecture" · Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12f",
    label: "FOOTER",
    title: "Footer Variation 6",
    description:
      "Gold neon dark final CTA (radial glow + price-increase line). Space Grotesk, exclusive high-ticket · gold.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v6-thumb.webp",
    funnelTypes: ["High-Ticket", "Mastermind", "Premium"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-10.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Badge + H2 directive (accent on last line) · short paragraph
- CTA with price microcopy · trust line · stack a price-increase urgency line
- Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- Full black bg with a gold radial glow behind the CTA (CSS only)
- Badge (gold pill) → H2 (white + gold accent on last line) → muted sub → gold CTA (black text) → red price-urgency line → muted trust line
- Very dark footer with a gold top border: logo left + nav center + © right (all muted)

=== ANIMATIONS (IntersectionObserver) ===
- Glow expands on entry · CTA pulses gold once · links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Full width

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V6 (Gold Neon Dark Final CTA · Exclusive).

— BRAND COLORS —
--bg: #050505 · --glow: rgba(245,200,66,0.12) · --accent: #F5C842 · --text: #FFFFFF · --muted: #9A9A9A · --footer-bg: #030303 · --border: rgba(255,255,255,0.06) · --cta-btn: #F5C842 · --cta-text: #050505 · --badge-bg: rgba(245,200,66,0.12) · --danger: #EF4444

— FONTS —
Space Grotesk (Google Fonts)

— COPY —
Badge: THE FINAL WORD
H2: Stop Waiting for the Right Moment. This Is It.   (gold-accent "This Is It.")
Sub: "Join 500+ coaches, consultants, and service providers who made the same decision you're about to make. The program works. The guarantee protects you. The only question is whether you're ready."
CTA: Claim My Spot — $4,997 →
Below CTA: Price increases to $9,997 on Friday
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Footer: Logo "Revenue Architecture" · Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
  {
    id: "footer",
    number: "12g",
    label: "FOOTER",
    title: "Footer Variation 7",
    description:
      "Editorial CTA + income-disclaimer box + 2-col dark footer. DM Serif + DM Sans, legal-conscious · teal.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v7-thumb.webp",
    funnelTypes: ["Premium", "Coaching", "Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — make the decision now.

=== OUTPUT ===
File: 13-footer-11.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Serif H2 directive · CTA with price microcopy · trust line
- Income disclaimer box (10px, very muted, max-width 760px)
- Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- White CTA section (max-width 760px, centered): large serif H2 → teal CTA → trust line → gray disclaimer box (small legal text)
- Dark navy footer, 2-col: LEFT logo + tagline + © · RIGHT 4 nav links stacked

=== ANIMATIONS (IntersectionObserver) ===
- CTA fades up · disclaimer fades in after · CTA pulses once · links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Footer stacks single column

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V7 (CTA + Disclaimer · Editorial Legal-Conscious).

— BRAND COLORS —
--bg: #FFFFFF · --disclaimer-bg: #F7F8FA · --accent: #0F766E · --text: #0F172A · --muted: #64748B · --disclaimer: #9CA3AF · --footer-bg: #0F172A · --footer-muted: #64748B · --border: #E2E8F0 · --cta-btn: #0F766E

— FONTS —
DM Serif Display (headings) + DM Sans (body) — Google Fonts

— COPY —
H2: The Decision That Changes Everything Is Always Simpler Than It Seems.
CTA: Enroll Now — $4,997 →
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available
Disclaimer: "INCOME DISCLAIMER: Results mentioned on this page are not typical. Individual results will vary significantly based on effort, experience, background, and market conditions. The testimonials and examples shown are exceptional results and are not intended to represent or guarantee that anyone will achieve the same or similar results. This program is not a get-rich scheme. Success requires real work, dedication, and execution."
Footer: Logo "Revenue Architecture" + "Building the future of professional coaching." + © 2026 · nav (stacked): Privacy Policy | Terms of Service | Disclaimer | Contact`,
  },
  {
    id: "footer",
    number: "12h",
    label: "FOOTER",
    title: "Footer Variation 8",
    description:
      "Two pricing-path CTAs (Group vs VIP, popular badge) + dark footer. Nunito, warm · buyer choice.",
    labelClass: labelClasses.footer,
    previewSrc: "/private/footer-v8-thumb.webp",
    funnelTypes: ["Coaching", "Course", "Service"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium Footer + Final CTA section (closing section of the 10P Framework). Production-ready, GHL-ready custom code block.

ANSWERS: the closing ask — pick a path and start now.

=== OUTPUT ===
File: 13-footer-12.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== 10P REQUIREMENTS ===
- Label + H2 directive + sub · two CTA option cards, each CTA button includes its price
- Trust line + guarantee · Footer includes Privacy | Terms | Disclaimer | Contact + © · min CTA height 300px

=== LAYOUT ===
- Light gray bg, centered header (label + H2 + sub)
- Two plan cards side by side (max-width 700px): Plan 1 Group (blue border) · Plan 2 VIP (green border + "Most Popular" badge + elevated shadow); each = name + price + feature list (✓ + a ★ bonus) + CTA (with price) + note
- Trust line + guarantee centered below cards
- Dark navy footer: logo left + nav center + © right

=== ANIMATIONS (IntersectionObserver) ===
- Plans scale up staggered (~0.15s) with Plan 2 highlighted · links hover-underline
- prefers-reduced-motion: skip

=== MOBILE (≤768px) ===
- Plans stack (Plan 2 / VIP first)

Build the complete file now.`,
    varsPrompt: `Apply these client values to Footer V8 (Two CTA Options · Warm Buyer-Choice).

— BRAND COLORS —
--bg: #F8FAFC · --accent: #2563EB · --plan-1: #2563EB · --plan-2: #16A34A · --text: #0F172A · --muted: #64748B · --border: #E2E8F0 · --footer-bg: #0F172A · --footer-muted: #64748B · --cta-1-btn: #2563EB · --cta-2-btn: #16A34A · star: #F59E0B

— FONTS —
Nunito (Google Fonts)

— COPY —
Label: CHOOSE YOUR PATH · H2: Two Ways to Get Started Today. · Sub: Same program. Same guarantee. Different levels of support.
Plan 1 — GROUP COACHING — $2,997: ✓ Full 12-Week Curriculum · ✓ Weekly Group Calls · ✓ Community Access · ★ All Fast-Action Bonuses · CTA: Join Group — $2,997 → · Note: Best for accountability + community
Plan 2 — VIP PRIVATE (badge MOST POPULAR) — $9,997: ✓ Everything in Group · ✓ Weekly 1:1 Coaching Calls · ✓ Done-With-You Buildout · ✓ Priority Support Access · ★ All Bonuses + Extended Support · CTA: Apply for VIP — $9,997 → · Note: Best for fastest results
Trust: 30-day money-back guarantee · $20K Revenue Guarantee · 3 payments of $1,997 available · Guarantee: 30-day refund · $20K guarantee
Footer: Logo "Revenue Architecture" · Privacy Policy | Terms of Service | Disclaimer | Contact · © 2026 Revenue Architecture. All rights reserved.`,
  },
];

const tabs: { id: TabId; label: string }[] = [
  { id: "builder", label: "🧩 Funnel Builder" },
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
];

function CopyButton({
  text,
  className = "",
  label = "📋 Copy Prompt",
}: {
  text: string;
  className?: string;
  label?: string;
}) {
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
      {copied ? "✓ Copied" : label}
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

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out animate-[fadeIn_.18s_ease]"
      style={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ["--tw-fade" as any]: "0",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1400px] max-h-[90vh] aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.6)] cursor-default"
      >
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" priority />
      </div>
    </div>
  );
}

type BuilderGroup = { id: SectionId; label: string; variations: Section[] };

const builderGroups: BuilderGroup[] = (() => {
  const order: SectionId[] = [];
  const byId = new Map<SectionId, Section[]>();
  for (const s of sections) {
    if (s.basePrompt.trim().toLowerCase().startsWith("coming soon")) continue;
    if (!byId.has(s.id)) {
      byId.set(s.id, []);
      order.push(s.id);
    }
    byId.get(s.id)!.push(s);
  }
  return order.map((id) => ({ id, label: byId.get(id)![0].label, variations: byId.get(id)! }));
})();

type BuilderSelection = { enabled: boolean; variation: string; copy: string };

function variationShortName(title: string) {
  const m = title.match(/Variation\s*\d+/i);
  return m ? m[0] : title;
}

const freshSelections = (): Record<string, BuilderSelection> =>
  Object.fromEntries(
    builderGroups.map((g) => [g.id, { enabled: false, variation: g.variations[0].number, copy: "" }])
  );

// Remove labeled blocks (e.g. "— BRAND COLORS —", "— FONTS —") from a varsPrompt
// so the variation's original palette can't compete with the client's brand kit.
function stripBrandBlocks(vars: string, labels: string[]): string {
  if (labels.length === 0) return vars;
  const upper = labels.map((l) => l.toUpperCase());
  const out: string[] = [];
  let skipping = false;
  for (const line of vars.split("\n")) {
    const t = line.trim();
    const isHeader = t.startsWith("—") && t.endsWith("—");
    if (isHeader) {
      const name = t.replace(/—/g, "").trim().toUpperCase();
      skipping = upper.some((l) => name.startsWith(l));
    }
    if (!skipping) out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// Adapt a per-file section basePrompt for single-page assembly:
// drop the intro + the "=== OUTPUT ===" (single-file) block + the trailing build line.
function sectionSpecForCombined(base: string): string {
  let t = base;
  const firstHeader = t.indexOf("=== ");
  if (firstHeader > 0) t = t.slice(firstHeader);
  t = t.replace(/=== OUTPUT ===[\s\S]*?(?=\n=== )/, "");
  t = t.replace(/\n*Build the complete file now\.?\s*$/i, "");
  return t.trim();
}

// ---- Brand Check color/font helpers ----
function normHex(hex: string): string | null {
  let h = hex.replace("#", "").toLowerCase();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length === 8) h = h.slice(0, 6);
  if (h.length !== 6 || /[^0-9a-f]/.test(h)) return null;
  return "#" + h;
}
function hexToRgb(hex: string): [number, number, number] | null {
  const n = normHex(hex);
  if (!n) return null;
  return [parseInt(n.slice(1, 3), 16), parseInt(n.slice(3, 5), 16), parseInt(n.slice(5, 7), 16)];
}
function nearestColor(hex: string, palette: string[]): string {
  let best = palette[0] ?? "";
  let bd = Infinity;
  const a = hexToRgb(hex);
  if (!a) return best;
  for (const p of palette) {
    const b = hexToRgb(p);
    if (!b) continue;
    const d = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
    if (d < bd) {
      bd = d;
      best = p;
    }
  }
  return best;
}
function hexToHsl(hex: string): [number, number, number] | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (((g - b) / d) % 6 + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return [h, s, l];
}
function hueDist(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}
function uniqHexes(text: string): string[] {
  const out: string[] = [];
  for (const m of text.match(/#[0-9a-fA-F]{3,8}\b/g) || []) {
    const n = normHex(m);
    if (n && !out.includes(n)) out.push(n);
  }
  return out;
}
function kitFonts(s: string): string[] {
  return s
    .replace(/\(google fonts\)/gi, "")
    .split(/[·,+:\n/]/)
    .map((x) => x.trim().replace(/['"]/g, ""))
    .filter((x) => x && !/^(headings?|body|fonts?|google|sans-serif|serif)$/i.test(x));
}
function usedFonts(html: string): string[] {
  const out = new Set<string>();
  for (const decl of html.match(/font-family\s*:\s*([^;}'"]+)/gi) || []) {
    const first = decl.replace(/font-family\s*:/i, "").split(",")[0].replace(/['"]/g, "").trim();
    if (first && !/^(inherit|initial|unset|sans-serif|serif|monospace)$/i.test(first) && !first.startsWith("var("))
      out.add(first);
  }
  for (const l of html.match(/family=([^&":)]+)/gi) || []) {
    const name = l.replace(/family=/i, "").split(":")[0].replace(/\+/g, " ").trim();
    if (name) out.add(name);
  }
  return Array.from(out);
}

function FunnelBuilder() {
  const [primary, setPrimary] = useState("");
  const [background, setBackground] = useState("");
  const [fontHead, setFontHead] = useState("");
  const [fontSub, setFontSub] = useState("");
  const [fontBody, setFontBody] = useState("");
  const [images, setImages] = useState("");
  const [includeRef, setIncludeRef] = useState(true);
  const [sel, setSel] = useState<Record<string, BuilderSelection>>(freshSelections);
  const [results, setResults] = useState<
    { id: string; heading: string; sub: string; text: string }[] | null
  >(null);
  const [fullPrompt, setFullPrompt] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [mode, setMode] = useState<"analyze" | "manual" | "check">("analyze");
  const [fullCopy, setFullCopy] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeErr, setAnalyzeErr] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [meta, setMeta] = useState<{ niche: string; vibe: string } | null>(null);
  const [htmlIn, setHtmlIn] = useState("");
  const [check, setCheck] = useState<{
    offColors: { hex: string; count: number; to: string }[];
    onCount: number;
    brandHexes: string[];
    fonts: string[];
    offFonts: string[];
  } | null>(null);
  const [fixedHtml, setFixedHtml] = useState<string | null>(null);

  const fieldCls =
    "w-full rounded-lg border border-[#2A2250] bg-[#0B091A] px-3 py-2.5 text-[13px] text-[#E8E4F5] placeholder-[#5A5478] focus:border-[#7C5CFC] focus:outline-none resize-y leading-[1.55]";
  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09AB8] mb-1.5";

  const enabledCount = builderGroups.filter((g) => sel[g.id]?.enabled).length;

  const update = (id: string, patch: Partial<BuilderSelection>) =>
    setSel((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const buildOutputs = useCallback(() => {
    const bar = "=".repeat(60);
    const hasColors = primary.trim().length > 0 || background.trim().length > 0;
    const hasFonts = fontHead.trim().length > 0 || fontSub.trim().length > 0 || fontBody.trim().length > 0;
    const hasBrand = hasColors || hasFonts;

    const colorBlock = hasColors
      ? `— BRAND COLORS (2-color kit — derive every supporting shade from these) —\n` +
        `Primary / accent: ${primary.trim() || "(pick one)"}\n` +
        `Background / base: ${background.trim() || "(pick one)"}\n` +
        `Derive on-brand from the two colors above: text, muted text, cards/surfaces, borders, hovers and gradients ` +
        `(use tints/shades of the brand colors + neutral white/black/grey). Use the primary for CTAs, links and highlights; ` +
        `the background as the page base. Do NOT introduce any unrelated hue.`
      : "";
    const fontBlock = hasFonts
      ? `— FONTS (apply each to its role; load via Google Fonts) —\n` +
        `Headline font: ${fontHead.trim() || "(strong display font)"}  → H1/H2 and section titles\n` +
        `Subheadline font: ${fontSub.trim() || "(use the body or headline font)"}  → eyebrows, sub-headings, labels\n` +
        `Body font: ${fontBody.trim() || "(clean readable sans)"}  → paragraphs, lists, buttons, UI text`
      : "";

    // Authoritative brand kit — leads the prompt so the building AI applies it
    // instead of the variation's illustrative example palette.
    const brandKit = hasBrand
      ? `╔══ BRAND KIT — AUTHORITATIVE · OVERRIDES EVERY COLOR & FONT BELOW ══╗\n` +
        `RULE: The spec below names specific colors and fonts — treat ALL of them as illustrative\n` +
        `placeholders only. Re-skin the ENTIRE section in this brand kit: backgrounds, text,\n` +
        `accents, buttons, borders, gradients, hovers — every color and font. Keep the spec's\n` +
        `LAYOUT, STRUCTURE and ANIMATIONS exactly; change only the palette + typography to this:\n\n` +
        `${colorBlock ? colorBlock + "\n\n" : ""}` +
        `${fontBlock ? fontBlock + "\n" : ""}` +
        `${images.trim() ? `\n— IMAGES / LOGO —\n${images.trim()}\n` : ""}` +
        `╚${"═".repeat(66)}╝\n\n`
      : "";

    const blocks: { id: string; heading: string; sub: string; text: string }[] = [];
    for (const g of builderGroups) {
      const s = sel[g.id];
      if (!s?.enabled) continue;
      const v = g.variations.find((x) => x.number === s.variation) ?? g.variations[0];
      const secNum = (v.number.match(/^\d+/) || ["?"])[0];
      const vName = variationShortName(v.title);
      const heading = `SECTION ${secNum} · ${g.label} — ${vName}`;

      let text: string;
      if (hasBrand) {
        text =
          brandKit +
          `${bar}\n${heading}\n${v.description}\n${bar}\n\n${v.basePrompt}\n\n` +
          `=== CLIENT COPY FOR THIS SECTION (use verbatim) ===\n${s.copy.trim() || "______"}`;
        if (includeRef) {
          const stripLabels = [...(hasColors ? ["BRAND COLORS"] : []), ...(hasFonts ? ["FONTS"] : [])];
          text +=
            `\n\n──────── REFERENCE · layout & copy-slot guide (palette removed — use the BRAND KIT above) ────────\n` +
            stripBrandBlocks(v.varsPrompt, stripLabels);
        }
      } else {
        const clientVars =
          `=== CLIENT VARIABLES — USE THESE (override any example values in the spec above) ===\n\n` +
          `— BRAND COLORS —\n______\n\n` +
          `— FONTS —\n______\n\n` +
          `— IMAGES —\nUse placeholder images first, then swap for the real assets.\n${
            images.trim() || "(no image notes — keep the section's built-in placeholder images)"
          }\n\n` +
          `— COPY —\n${s.copy.trim() || "______"}`;
        text = `${bar}\n${heading}\n${v.description}\n${bar}\n\n${v.basePrompt}\n\n${clientVars}`;
        if (includeRef) {
          text +=
            `\n\n──────── REFERENCE · original variation example (format guide only) ────────\n` +
            v.varsPrompt;
        }
      }
      blocks.push({ id: g.id, heading, sub: v.description, text });
    }

    // Combined master prompt → ONE single HTML page (full funnel)
    const ordered = builderGroups.filter((g) => sel[g.id]?.enabled);
    if (ordered.length === 0) {
      return { blocks, full: null as string | null };
    }
    const kitLines =
      (colorBlock || `— BRAND COLORS —\n(choose one clean, conversion-friendly palette and use it throughout)`) +
      `\n\n` +
      (fontBlock || `— FONTS —\n(choose 1–2 Google Fonts and use them throughout)`) +
      `\n${images.trim() ? `\n— IMAGES / LOGO —\n${images.trim()}\n` : ""}`;
    let full =
      `You are an expert frontend developer and funnel designer.\n\n` +
      `Build ONE complete, production-ready, single-file HTML landing page — the FULL funnel — by stacking the ${ordered.length} sections below IN THE GIVEN ORDER.\n\n` +
      `=== GLOBAL OUTPUT RULES ===\n` +
      `- Output ONE standalone HTML file. ALL CSS in a single <style>; ALL JS in a single <script>.\n` +
      `- No frameworks. Load every Google Font used once via <link>.\n` +
      `- ONE cohesive design system across every section: shared CSS variables (the brand kit), consistent buttons, spacing scale and section padding.\n` +
      `- Each section is a full-width <section> stacked top → bottom in order; the page must read as one continuous funnel.\n` +
      `- Fully responsive (breakpoint 768px), accessible, smooth-scrolling. Use IntersectionObserver for scroll animations.\n` +
      `- The section specs below were each originally written as standalone blocks — IGNORE any "output one file", "standalone", "File: …" or "Build the complete file now" wording inside them. They are section requirements only.\n\n` +
      `=== BRAND KIT — AUTHORITATIVE · applies to EVERY section ===\n` +
      `Render the ENTIRE page in this kit. Treat any colors/fonts named inside the section specs as illustrative placeholders and replace them with this kit:\n\n` +
      kitLines +
      `\n=== SECTIONS (build in this exact order) ===\n`;
    ordered.forEach((g, i) => {
      const s = sel[g.id];
      const v = g.variations.find((x) => x.number === s.variation) ?? g.variations[0];
      full +=
        `\n${"-".repeat(58)}\n` +
        `SECTION ${i + 1} — ${g.label} · ${variationShortName(v.title)} (${v.description})\n` +
        `${"-".repeat(58)}\n\n` +
        `${sectionSpecForCombined(v.basePrompt)}\n\n` +
        `— COPY FOR THIS SECTION (use verbatim) —\n${s.copy.trim() || "______"}\n`;
    });
    full +=
      `\n=== ASSEMBLY ===\n` +
      `Output the complete single HTML file now: all ${ordered.length} sections in order, sharing one brand kit and design system, fully responsive and animated. Nothing else.`;
    return { blocks, full: full as string | null };
  }, [sel, primary, background, fontHead, fontSub, fontBody, images, includeRef]);

  const generate = () => {
    const { blocks, full } = buildOutputs();
    setResults(blocks);
    setFullPrompt(full);
    setGenerated(true);
  };

  // Live-update the generated prompts whenever a variation, copy or the brand kit changes.
  useEffect(() => {
    if (!generated) return;
    const { blocks, full } = buildOutputs();
    setResults(blocks);
    setFullPrompt(full);
  }, [generated, buildOutputs]);

  const analyze = async () => {
    setAnalyzing(true);
    setAnalyzeErr(null);
    try {
      const catalog = builderGroups.map((g) => ({
        id: g.id,
        label: g.label,
        variations: g.variations.map((v) => ({
          number: v.number,
          title: v.title,
          description: v.description,
          funnelTypes: v.funnelTypes ?? [],
        })),
      }));
      const res = await fetch("/api/funnel-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ copy: fullCopy, catalog }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Analysis failed.");
      const next = freshSelections();
      const nextReasons: Record<string, string> = {};
      for (const s of (data.sections || []) as {
        sectionId: string;
        recommendedVariation: string;
        reason: string;
        copy: string;
      }[]) {
        if (!next[s.sectionId]) continue;
        const group = builderGroups.find((g) => g.id === s.sectionId);
        const variation = group?.variations.some((v) => v.number === s.recommendedVariation)
          ? s.recommendedVariation
          : group?.variations[0].number ?? "";
        next[s.sectionId] = { enabled: true, variation, copy: s.copy || "" };
        nextReasons[s.sectionId] = s.reason || "";
      }
      setSel(next);
      setReasons(nextReasons);
      setMeta({ niche: data.niche || "", vibe: data.vibe || "" });
      setResults(null);
      setFullPrompt(null);
      setGenerated(false);
    } catch (e) {
      setAnalyzeErr(e instanceof Error ? e.message : "Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const runCheck = () => {
    const brandHexes = uniqHexes(`${primary} ${background}`);
    const brandHues = brandHexes
      .map((h) => hexToHsl(h))
      .filter((x): x is [number, number, number] => !!x && x[1] >= 0.08)
      .map((x) => x[0]);
    const counts: Record<string, number> = {};
    for (const m of htmlIn.match(/#[0-9a-fA-F]{3,8}\b/g) || []) {
      const n = normHex(m);
      if (n) counts[n] = (counts[n] || 0) + 1;
    }
    const used = Object.keys(counts);
    const offColors: { hex: string; count: number; to: string }[] = [];
    let onCount = 0;
    if (brandHexes.length) {
      for (const h of used) {
        const hsl = hexToHsl(h);
        let onBrand = brandHexes.includes(h);
        if (!onBrand && hsl) {
          // neutral (white/black/grey) is always allowed; otherwise must share a brand hue (a tint/shade)
          if (hsl[1] < 0.1) onBrand = true;
          else if (brandHues.length && Math.min(...brandHues.map((bh) => hueDist(hsl[0], bh))) <= 30) onBrand = true;
        }
        if (onBrand) onCount++;
        else offColors.push({ hex: h, count: counts[h] || 0, to: nearestColor(h, brandHexes) });
      }
      offColors.sort((a, b) => b.count - a.count);
    }
    const kf = kitFonts([fontHead, fontSub, fontBody].join(" · "));
    const uf = usedFonts(htmlIn);
    const offFonts = uf.filter(
      (f) => !kf.some((b) => f.toLowerCase().includes(b.toLowerCase()) || b.toLowerCase().includes(f.toLowerCase()))
    );
    setCheck({ offColors, onCount, brandHexes, fonts: uf, offFonts });
    setFixedHtml(null);
  };

  const setSwap = (hex: string, to: string) =>
    setCheck((c) => (c ? { ...c, offColors: c.offColors.map((o) => (o.hex === hex ? { ...o, to } : o)) } : c));

  const applySwaps = () => {
    if (!check) return;
    const map = new Map(check.offColors.filter((o) => o.to).map((o) => [o.hex, o.to] as const));
    const out = htmlIn.replace(/#[0-9a-fA-F]{3,8}\b/g, (m) => {
      const n = normHex(m);
      return n && map.has(n) ? map.get(n)! : m;
    });
    setFixedHtml(out);
  };

  const reset = () => {
    setPrimary("");
    setBackground("");
    setFontHead("");
    setFontSub("");
    setFontBody("");
    setImages("");
    setSel(freshSelections());
    setResults(null);
    setFullPrompt(null);
    setGenerated(false);
    setFullCopy("");
    setReasons({});
    setMeta(null);
    setAnalyzeErr(null);
    setHtmlIn("");
    setCheck(null);
    setFixedHtml(null);
  };

  const combined = results ? results.map((r) => r.text).join("\n\n\n") : "";

  return (
    <div className="max-w-[920px] mx-auto px-6 pb-16">
      {/* Mode toggle */}
      <div className="flex justify-center mb-5">
        <div className="inline-flex rounded-lg border border-[#2A2250] bg-[#0B091A] p-1">
          <button
            type="button"
            onClick={() => setMode("analyze")}
            className={`px-4 py-1.5 text-[12.5px] font-semibold rounded-md transition ${
              mode === "analyze" ? "bg-[#7C5CFC] text-white" : "text-[#A09AB8] hover:text-white"
            }`}
          >
            ✨ Analyze Copy (AI)
          </button>
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={`px-4 py-1.5 text-[12.5px] font-semibold rounded-md transition ${
              mode === "manual" ? "bg-[#7C5CFC] text-white" : "text-[#A09AB8] hover:text-white"
            }`}
          >
            ✍️ Manual
          </button>
          <button
            type="button"
            onClick={() => setMode("check")}
            className={`px-4 py-1.5 text-[12.5px] font-semibold rounded-md transition ${
              mode === "check" ? "bg-[#7C5CFC] text-white" : "text-[#A09AB8] hover:text-white"
            }`}
          >
            🎨 Brand Check
          </button>
        </div>
      </div>

      <p className="text-[13px] text-[#A09AB8] leading-[1.6] mb-6 text-center">
        {mode === "analyze"
          ? "Paste the client's full funnel copy. AI splits it into the 10P sections, recommends the best-fit variation for each, and fills your copy in — review, tweak, then generate."
          : mode === "check"
          ? "Built the page already? Paste its HTML here and check it against your brand kit — it flags every off-brand color/font and one-click swaps them. Deterministic, no AI, no tokens."
          : "Pick a variation per section, drop in your brand + copy, and generate one ready-to-paste prompt for each section. Pure assembly — nothing leaves your browser."}
      </p>

      {/* 0 · Analyze (AI) */}
      {mode === "analyze" && (
        <section className="rounded-[14px] border border-[#2A2250] bg-[#161330] p-6 mb-5">
          <h2
            className="text-[15px] font-bold mb-1"
            style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
          >
            <span className="text-[#7C5CFC]">1 ·</span> Paste Full Funnel Copy
          </h2>
          <p className="text-[12px] text-[#A09AB8] mb-4">
            The whole thing — headlines, body, testimonials, offer, FAQ. AI maps it onto the 10P framework.
          </p>
          <textarea
            value={fullCopy}
            onChange={(e) => setFullCopy(e.target.value)}
            rows={9}
            placeholder="Paste the client's full sales-page / funnel copy here..."
            className={fieldCls}
          />
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-[11.5px] text-[#5A5478]">{fullCopy.trim().length.toLocaleString()} chars</span>
            {meta && (meta.niche || meta.vibe) && (
              <span className="text-[11.5px] text-[#A09AB8]">
                Detected: <span className="text-[#C0B8E0]">{[meta.niche, meta.vibe].filter(Boolean).join(" · ")}</span>
              </span>
            )}
            <button
              type="button"
              onClick={analyze}
              disabled={analyzing || fullCopy.trim().length < 40}
              className="ml-auto rounded-md bg-[#7C5CFC] text-white text-[12.5px] font-bold px-5 py-2.5 transition hover:brightness-110 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
            >
              {analyzing ? "Analyzing…" : "✨ Analyze & Recommend"}
            </button>
          </div>
          {analyzeErr && (
            <p className="text-[12.5px] text-[#F87171] mt-3">{analyzeErr}</p>
          )}
        </section>
      )}

      {/* 1 · Brand kit */}
      <section className="rounded-[14px] border border-[#2A2250] bg-[#161330] p-6 mb-5">
        <h2
          className="text-[15px] font-bold mb-1"
          style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
        >
          <span className="text-[#7C5CFC]">{mode === "analyze" ? "2 ·" : "1 ·"}</span> Brand Kit
        </h2>
        <p className="text-[12px] text-[#A09AB8] mb-4">
          Two brand colors + three font roles. The AI derives all supporting shades (text, muted,
          cards, borders) on-brand from your colors. Leave blank to keep the variation&apos;s defaults.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Primary / Accent</label>
            <input
              type="text"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              placeholder="#A8BFA2 Sage Green"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Background / Base</label>
            <input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="#F7F6F0 Ivory White"
              className={fieldCls}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          <div>
            <label className={labelCls}>Headline font</label>
            <input
              type="text"
              value={fontHead}
              onChange={(e) => setFontHead(e.target.value)}
              placeholder="Montserrat"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Subheadline font</label>
            <input
              type="text"
              value={fontSub}
              onChange={(e) => setFontSub(e.target.value)}
              placeholder="Inter"
              className={fieldCls}
            />
          </div>
          <div>
            <label className={labelCls}>Body font</label>
            <input
              type="text"
              value={fontBody}
              onChange={(e) => setFontBody(e.target.value)}
              placeholder="DM Sans"
              className={fieldCls}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>Images / Logo</label>
          <textarea
            value={images}
            onChange={(e) => setImages(e.target.value)}
            rows={2}
            placeholder="Placeholder-first. Add URLs/notes if you have them, e.g. Logo: ____ · Hero photo: ____"
            className={fieldCls}
          />
        </div>
      </section>

      {mode !== "check" && (
      <>
      {/* 2 · Sections */}
      <section className="rounded-[14px] border border-[#2A2250] bg-[#161330] p-6 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-[15px] font-bold"
            style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
          >
            <span className="text-[#7C5CFC]">{mode === "analyze" ? "3 ·" : "2 ·"}</span>{" "}
            {mode === "analyze" ? "Review AI Picks & Copy" : "Pick Sections & Copy"}
          </h2>
          <span className="text-[11.5px] font-semibold text-[#A09AB8]">
            {enabledCount} selected
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {builderGroups.map((g) => {
            const s = sel[g.id];
            return (
              <div
                key={g.id}
                className={`rounded-lg border p-3.5 transition ${
                  s.enabled
                    ? "border-[#7C5CFC] bg-[#1A1540]"
                    : "border-[#2A2250] bg-[#0B091A]"
                }`}
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={s.enabled}
                      onChange={(e) => update(g.id, { enabled: e.target.checked })}
                      className="h-4 w-4 accent-[#7C5CFC] cursor-pointer"
                    />
                    <span className="text-[13.5px] font-semibold">{g.label}</span>
                  </label>
                  <span className="text-[11px] text-[#5A5478]">
                    {g.variations.length} variation{g.variations.length > 1 ? "s" : ""}
                  </span>
                  {s.enabled && (
                    <select
                      value={s.variation}
                      onChange={(e) => update(g.id, { variation: e.target.value })}
                      className="ml-auto max-w-[60%] rounded-md border border-[#2A2250] bg-[#0B091A] px-2.5 py-1.5 text-[12px] text-[#E8E4F5] focus:border-[#7C5CFC] focus:outline-none"
                    >
                      {g.variations.map((v) => (
                        <option key={v.number} value={v.number}>
                          {variationShortName(v.title)} — {v.description.slice(0, 56)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                {s.enabled && reasons[g.id] && (
                  <div className="mt-2.5 text-[11.5px] leading-[1.5] flex gap-1.5">
                    <span className="font-bold text-[#9B82FF] shrink-0">★ AI pick:</span>
                    <span className="text-[#A09AB8]">{reasons[g.id]}</span>
                  </div>
                )}
                {s.enabled && (
                  <textarea
                    value={s.copy}
                    onChange={(e) => update(g.id, { copy: e.target.value })}
                    rows={3}
                    placeholder={`Copy for ${g.label} — headline, subhead, CTA, body, names...`}
                    className={`${fieldCls} mt-3`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Options + generate */}
      <div className="flex flex-wrap items-center gap-3 mb-7">
        <label className="flex items-center gap-2 text-[12.5px] text-[#A09AB8] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={includeRef}
            onChange={(e) => setIncludeRef(e.target.checked)}
            className="h-4 w-4 accent-[#7C5CFC] cursor-pointer"
          />
          Include template reference in each block
        </label>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-[#2A2250] text-[#A09AB8] text-[12.5px] px-4 py-2.5 transition hover:border-[#F87171] hover:text-[#F87171]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={generate}
            disabled={enabledCount === 0}
            className="rounded-md bg-[#7C5CFC] text-white text-[12.5px] font-bold px-5 py-2.5 transition hover:brightness-110 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
          >
            ⚡ Generate Prompts
          </button>
        </div>
      </div>

      {/* Results */}
      {results && results.length === 0 && (
        <p className="text-center text-[13px] text-[#A09AB8]">
          Select at least one section above, then generate.
        </p>
      )}
      {results && results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="min-w-0">
              <h2
                className="text-[15px] font-bold"
                style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
              >
                Generated · {results.length} section{results.length > 1 ? "s" : ""}
              </h2>
              <div className="text-[11px] text-[#A09AB8] mt-0.5">
                Updates live — change any variation or copy above and these refresh instantly.
              </div>
            </div>
            <CopyButton text={combined} label="📋 Copy All (separate)" className="shrink-0" />
          </div>

          {fullPrompt && (
            <div className="rounded-[14px] border-2 border-[#7C5CFC] bg-[#1A1540] mb-5 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#2A2250]">
                <div className="min-w-0">
                  <div className="text-[13px] font-bold">🧩 Full Funnel — One Single HTML</div>
                  <div className="text-[11.5px] text-[#A09AB8]">
                    All {results.length} sections combined into one page, sharing one brand kit.
                  </div>
                </div>
                <CopyButton text={fullPrompt} className="shrink-0" label="📋 Copy Full Prompt" />
              </div>
              <pre className="font-mono text-[11px] text-[#C0B8E0] leading-[1.7] whitespace-pre-wrap px-5 py-4 max-h-[360px] overflow-auto">
                {fullPrompt}
              </pre>
            </div>
          )}

          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09AB8] mb-2">
            Or build section-by-section
          </div>
          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-[14px] border border-[#2A2250] bg-[#161330] mb-4 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#2A2250]">
                <div className="min-w-0">
                  <div className="text-[13px] font-bold truncate">{r.heading}</div>
                  <div className="text-[11.5px] text-[#A09AB8] truncate">{r.sub}</div>
                </div>
                <CopyButton text={r.text} className="shrink-0" />
              </div>
              <pre className="font-mono text-[11px] text-[#C0B8E0] leading-[1.7] whitespace-pre-wrap px-5 py-4 max-h-[340px] overflow-auto">
                {r.text}
              </pre>
            </div>
          ))}
        </div>
      )}
      </>
      )}

      {/* Brand Check */}
      {mode === "check" && (
        <>
          <section className="rounded-[14px] border border-[#2A2250] bg-[#161330] p-6 mb-5">
            <h2
              className="text-[15px] font-bold mb-1"
              style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
            >
              <span className="text-[#7C5CFC]">2 ·</span> Paste Built HTML
            </h2>
            <p className="text-[12px] text-[#A09AB8] mb-4">
              Checked against the Brand Kit colors above — add your brand colors first so swaps can be suggested.
            </p>
            <textarea
              value={htmlIn}
              onChange={(e) => setHtmlIn(e.target.value)}
              rows={8}
              placeholder="Paste the generated section / page HTML here..."
              className={fieldCls}
            />
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-[11.5px] text-[#5A5478]">{htmlIn.trim().length.toLocaleString()} chars</span>
              <button
                type="button"
                onClick={runCheck}
                disabled={htmlIn.trim().length < 10}
                className="ml-auto rounded-md bg-[#7C5CFC] text-white text-[12.5px] font-bold px-5 py-2.5 transition hover:brightness-110 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-space-grotesk, 'Space Grotesk', sans-serif)" }}
              >
                🎨 Run Brand Check
              </button>
            </div>
          </section>

          {check && (
            <div>
              <div className="rounded-[14px] border border-[#2A2250] bg-[#161330] p-6 mb-5">
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12.5px]">
                  <span className="text-[#4ADE80] font-semibold">
                    {check.onCount} on-brand color{check.onCount === 1 ? "" : "s"}
                  </span>
                  <span className={check.offColors.length ? "text-[#F87171] font-semibold" : "text-[#A09AB8]"}>
                    {check.offColors.length} off-brand color{check.offColors.length === 1 ? "" : "s"}
                  </span>
                  <span className={check.offFonts.length ? "text-[#F5C842] font-semibold" : "text-[#A09AB8]"}>
                    {check.offFonts.length} off-brand font{check.offFonts.length === 1 ? "" : "s"}
                  </span>
                </div>
                {check.brandHexes.length === 0 && (
                  <p className="text-[12px] text-[#F5C842] mt-3">
                    Add your brand colors in the Brand Kit panel above to enable swap suggestions.
                  </p>
                )}

                {check.offColors.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09AB8] mb-2">
                      Off-brand colors → swap to
                    </div>
                    <div className="flex flex-col gap-2">
                      {check.offColors.map((o) => (
                        <div key={o.hex} className="flex items-center gap-2.5 text-[12.5px] flex-wrap">
                          <span className="inline-block w-5 h-5 rounded border border-white/15 shrink-0" style={{ background: o.hex }} />
                          <code className="text-[#C0B8E0]">{o.hex}</code>
                          <span className="text-[#5A5478]">×{o.count}</span>
                          <span className="text-[#5A5478]">→</span>
                          <span className="inline-block w-5 h-5 rounded border border-white/15 shrink-0" style={{ background: o.to || "transparent" }} />
                          <select
                            value={o.to}
                            onChange={(e) => setSwap(o.hex, e.target.value)}
                            className="rounded-md border border-[#2A2250] bg-[#0B091A] px-2 py-1 text-[12px] text-[#E8E4F5] focus:border-[#7C5CFC] focus:outline-none"
                          >
                            <option value="">keep as-is</option>
                            {check.brandHexes.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {check.offFonts.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#A09AB8] mb-2">
                      Off-brand fonts (replace manually)
                    </div>
                    <div className="text-[12.5px] text-[#C0B8E0]">{check.offFonts.join(" · ")}</div>
                  </div>
                )}

                {check.offColors.length === 0 && check.offFonts.length === 0 ? (
                  <p className="text-[13px] text-[#4ADE80] mt-3">
                    ✓ All colors and fonts match the brand kit. Nothing to fix.
                  </p>
                ) : (
                  check.offColors.some((o) => o.to) && (
                    <div className="flex gap-2 mt-5">
                      <button
                        type="button"
                        onClick={applySwaps}
                        className="rounded-md bg-[#4ADE80] text-[#0D0B1F] text-[12.5px] font-bold px-5 py-2.5 transition hover:brightness-110 active:scale-[0.97]"
                      >
                        ✓ Apply Swaps → Corrected HTML
                      </button>
                    </div>
                  )
                )}
              </div>

              {fixedHtml && (
                <div className="rounded-[14px] border border-[#2A2250] bg-[#161330] mb-4 overflow-hidden">
                  <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#2A2250]">
                    <div className="text-[13px] font-bold">Brand-corrected HTML</div>
                    <CopyButton text={fixedHtml} className="shrink-0" />
                  </div>
                  <pre className="font-mono text-[11px] text-[#C0B8E0] leading-[1.7] whitespace-pre-wrap px-5 py-4 max-h-[340px] overflow-auto">
                    {fixedHtml}
                  </pre>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function PrivateContent() {
  const [tab, setTab] = useState<TabId>("builder");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const showBuilder = tab === "builder";
  const visibleSections = sections.filter((s) => tab === s.id);

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
          <p className="text-[15px] text-[#A09AB8] leading-[1.65] max-w-[540px] mx-auto">
            Compose a full funnel section-by-section in the builder, or browse every variation&apos;s
            wireframe + copy-ready prompts.
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

        {/* Funnel Builder */}
        {showBuilder && <FunnelBuilder />}

        {/* Grid */}
        {!showBuilder && (
        <div className="grid gap-[22px] px-6 pb-14 max-w-[1180px] mx-auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {visibleSections.map((s) => (
            <article
              key={`${s.id}-${s.number}`}
              className="flex flex-col overflow-hidden rounded-[14px] border border-[#2A2250] bg-[#161330] transition-all hover:border-[#4A3A8A] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
            >
              {(s.preview || s.previewSrc) && (
                <div className="border-b border-[#2A2250] bg-[#0B091A] p-[18px_20px]">
                  {s.previewSrc ? (
                    <button
                      type="button"
                      onClick={() => setLightbox({ src: s.previewSrc!, alt: s.title })}
                      aria-label={`Open ${s.title} preview full screen`}
                      className="group relative block w-full aspect-[2/1] overflow-hidden rounded-md cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
                    >
                      <Image
                        src={s.previewSrc}
                        alt={`${s.title} thumbnail`}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
                      <span className="pointer-events-none absolute top-2 right-2 inline-flex items-center gap-1 rounded-md bg-black/55 backdrop-blur px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                        Expand
                      </span>
                    </button>
                  ) : (
                    <div className="[&_svg]:w-full [&_svg]:h-auto [&_svg]:block [&_svg]:rounded-md">
                      {s.preview}
                    </div>
                  )}
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className={`text-[10px] font-semibold uppercase tracking-[0.13em] mb-1.5 ${s.labelClass}`}>
                  {s.funnelTypes
                    ? s.funnelTypes.join(" · ").toUpperCase()
                    : `${s.number} · ${s.label}`}
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

        </div>
        )}

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

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
