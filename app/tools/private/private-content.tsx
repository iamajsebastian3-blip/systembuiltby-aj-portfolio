"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
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
  nav: "text-[#A09AB8]",
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
    label: "EMPATHY",
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
    label: "EMPATHY",
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
    label: "EMPATHY",
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
    label: "EMPATHY",
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
    label: "EMPATHY",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "OPPORTUNITY VEHICLE",
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
    label: "BEFORE VS AFTER",
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
    label: "BEFORE VS AFTER",
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
    label: "BEFORE VS AFTER",
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
    label: "BEFORE VS AFTER",
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
    label: "BEFORE VS AFTER",
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
    label: "BEFORE VS AFTER",
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
    label: "USP",
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
    label: "USP",
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
    label: "USP",
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
    label: "USP",
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
    label: "USP",
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
    label: "USP",
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
    label: "OFFER POSITIONING",
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
    label: "OFFER POSITIONING",
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
    label: "OFFER POSITIONING",
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
    label: "OFFER POSITIONING",
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
    label: "OFFER POSITIONING",
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
    label: "OFFER POSITIONING",
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
    label: "SOCIAL PROOF",
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
    label: "SOCIAL PROOF",
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
    label: "SOCIAL PROOF",
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
    label: "SOCIAL PROOF",
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
    label: "SOCIAL PROOF",
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
    label: "SOCIAL PROOF",
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
    label: "RISK REVERSAL",
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
    label: "RISK REVERSAL",
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
    label: "RISK REVERSAL",
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
    label: "RISK REVERSAL",
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
    label: "RISK REVERSAL",
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
    label: "RISK REVERSAL",
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
    label: "AUTHORITY",
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
    label: "AUTHORITY",
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
    label: "AUTHORITY",
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
    label: "AUTHORITY",
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
    label: "AUTHORITY",
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
    label: "AUTHORITY",
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
    label: "URGENCY",
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
    label: "URGENCY",
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
    label: "URGENCY",
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
    label: "URGENCY",
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
    label: "URGENCY",
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
    label: "URGENCY",
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

export function PrivateContent() {
  const [tab, setTab] = useState<TabId>("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

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

      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
