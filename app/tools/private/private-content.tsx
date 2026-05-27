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
      "5-layer premium hero: full BG + sticky nav + centered copy + person silhouette with overlay play button + featured-in logo bar.",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v4-thumb.webp",
    funnelTypes: ["VSL", "Speaker Page", "Coaching"],
    basePrompt: `You are an expert frontend developer and funnel designer.

Build a premium funnel hero section based on the exact structured layout below. Production-ready, GHL-ready.

=== OUTPUT ===
File: 02-hero-centered.html
All CSS in <style> | All JS in <script>
Google Fonts only | GHL standalone custom code block

=== FIXED LAYOUT STRUCTURE ===

LAYER 1 — Full Background
- BG_IMAGE fills entire section
- var(--overlay) dark layer on top
- Subtle blue radial glow center for depth

LAYER 2 — Sticky Nav (var(--nav-height))
- LOGO left
- NAV_LINKS center
- Search icon right
- Transparent → dark blur on scroll
- Mobile: hamburger

LAYER 3 — Hero Content (centered)
- EYEBROW — small, muted, uppercase
- HEADLINE_1 + HEADLINE_2 — large bold white
- CTA button — var(--accent), dark text, uppercase

LAYER 4 — Person + Play Button
- PERSON_IMG centered below CTA
- Overlapping hero and featured section
- Play button circle on chest area of person
- On click: open VIDEO_URL in lightbox

LAYER 5 — Featured In Bar
- Dark semi-transparent bg
- FEATURED_LABEL — small muted uppercase text
- FEATURED_LOGOS — grayscale, inline row

=== ANIMATIONS ===
- Background: slow Ken Burns zoom
- Eyebrow: fade up (0.2s)
- Headlines: fade up staggered (0.3s, 0.4s)
- CTA: fade up (0.5s)
- Person: fade in + slight scale (0.7s)
- Play button: pulse glow loop
- Featured logos: fade in (1s)

=== MOBILE ===
- Breakpoint: 768px
- Nav → hamburger
- Text scales down
- Person image scales down
- Featured logos wrap to 2 rows

=== OUTPUT RULES ===
- All colors, fonts, copy, asset paths driven by the CLIENT VARIABLES block at the top
- Comment block at top with numbered edit steps
- One file, no frameworks, no build step

Build the complete file now.`,
    varsPrompt: `Apply these client values to the Hero Variation 4 (5-layer premium hero) base component.

/* ============================================
   CLIENT VARIABLES — EDIT BEFORE LAUNCH

   1. BG_IMAGE      → hero background photo URL
   2. PERSON_IMG    → silhouette/person photo URL
   3. VIDEO_URL     → video link (opens on play click)
   4. LOGO_TEXT     → client name or brand
   5. Update COLORS to match client brand kit
   6. Update all COPY
   7. Update FEATURED_IN logos/names
   ============================================ */

— BRAND COLORS (CSS custom properties) —
--bg:           #050A14
--accent:       #00E5CC
--text:         #FFFFFF
--muted:        #A0B0C0
--overlay:      rgba(0, 0, 0, 0.55)
--nav-height:   60px

— ASSETS —
const BG_IMAGE      = "/private/hero-v4-thumb.webp";   ← swap for client image
const PERSON_IMG    = "______";                        ← transparent PNG silhouette of speaker
const VIDEO_URL     = "______";                        ← YouTube / Vimeo / Wistia URL
const LOGO_TEXT     = "______";                        ← client brand name
const LOGO_IMG      = "______";                        ← optional logo image

— COPY —
const EYEBROW       = "______";                        ← short eyebrow line
const HEADLINE_1    = "______";                        ← first line of big headline
const HEADLINE_2    = "______";                        ← second line of big headline
const CTA_TEXT      = "______";                        ← CTA button text

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

— FEATURED IN —
const FEATURED_LABEL = "______ Has Been Featured In:";
const FEATURED_LOGOS = [
  { name: "SUCCESS", url: "______" },
  { name: "Inc.",    url: "______" },
  { name: "Forbes",  url: "______" },
  { name: "Fortune", url: "______" }
];`,
  },
  {
    id: "hero",
    number: "01e",
    label: "HERO",
    title: "Hero Variation 5",
    description:
      "Fullscreen split-photo hero: left half + right half BG, massive 3-line headline centered, minimal nav, 3-column footer bar (scroll arrow · featured-in · testimonial quote).",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v5-thumb.webp",
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
    varsPrompt: `Apply these client values to the Hero Variation 5 (Fullscreen Split-Photo) base component.

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
const BG_LEFT    = "/private/hero-v5-bg-left.webp";    ← swap for client image
const BG_RIGHT   = "/private/hero-v5-bg-right.webp";   ← swap for client image
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
    number: "01f",
    label: "HERO",
    title: "Hero Variation 6",
    description:
      "Big Promise / Above-the-fold. What will I get and is it for me?",
    labelClass: labelClasses.hero,
    previewSrc: "/private/hero-v6-thumb.webp",
    basePrompt: `Coming soon.

The Base prompt (technical build instructions, CSS variables, layout spec) will be added once we finalize the wireframe and structural pattern for this variation.`,
    varsPrompt: `Coming soon.

The Client Variables fill-in-the-blank brief will be added once the Base prompt above is finalized.`,
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
