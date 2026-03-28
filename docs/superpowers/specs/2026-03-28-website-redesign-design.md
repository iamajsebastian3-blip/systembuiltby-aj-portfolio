# System Built by AJ — Website Redesign Spec

**Date:** 2026-03-28
**Status:** Draft
**Approach:** Full redesign + rebuild (Approach B)

---

## 1. Overview

Rebuild the current single-file HTML SPA into a production-grade Next.js 16 application deployed on Vercel. All existing content is preserved — the upgrade focuses on architecture, visual polish, animations, interactivity, and SEO.

### Goals
- Convert from single HTML file to Next.js App Router with real routing
- Implement shadcn/ui + Tailwind CSS design system with custom dark theme
- Add polished Framer Motion animations (intentional, not overdone)
- Improve mobile experience with proper responsive design + mobile menu
- Add SEO metadata, Open Graph tags per route
- Deploy on Vercel with zero-config

### Non-Goals (for now)
- Blog/CMS
- Contact form with server actions
- Analytics dashboard
- Admin panel
- Booking widget embed (user will add later)

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSR, file routing, SEO, Vercel-optimized |
| Styling | Tailwind CSS + shadcn/ui | Consistent components, dark theme tokens |
| Fonts | Inter via `next/font/google` | Matches current brand, optimized loading |
| Animations | Framer Motion | Spring physics, scroll triggers, page transitions |
| Icons | Lucide React | Clean, consistent, tree-shakeable |
| Deployment | Vercel | Zero-config, preview URLs, CDN |

### Dependencies
```
next react react-dom
tailwindcss @tailwindcss/postcss
framer-motion
lucide-react
```
Plus shadcn/ui components installed via CLI.

---

## 3. Architecture

### Route Structure
```
app/
  layout.tsx              — Root layout: navbar, footer, fonts, metadata
  page.tsx                — Homepage (/)
  about/page.tsx          — About AJ (/about)
  projects/page.tsx       — Portfolio (/projects)
  revenue/page.tsx        — Revenue Tools (/revenue)
  packages/page.tsx       — Pricing (/packages)
  consult/page.tsx        — Consultation (/consult)
  portfolio/page.tsx      — Featured Work (/portfolio)
```

### Component Structure
```
components/
  layout/
    navbar.tsx            — Fixed nav with dropdowns, mobile menu
    mobile-menu.tsx       — Slide-out drawer for mobile
    footer.tsx            — Simple footer
  sections/
    hero.tsx              — Homepage hero with profile card
    vault.tsx             — "Is This You?" dual cards
    philosophy.tsx        — 4-card philosophy grid
    services.tsx          — 6-card services grid with SVG icons
    testimonials.tsx      — 3-card testimonial grid
    hl-banner.tsx         — "New to HighLevel?" CTA banner
    faq.tsx               — Accordion FAQ
    final-cta.tsx         — Bottom CTA section
  interactive/
    revenue-calculator.tsx — Sliders + real-time results
    roi-scorecard.tsx     — 3-card ROI grid with counters
    audit-tracker.tsx     — 4-card audit grid with progress bars
  ui/                     — shadcn/ui primitives (Button, Card, Badge, Accordion, Tabs, etc.)
  motion/
    scroll-reveal.tsx     — Reusable scroll-triggered animation wrapper
    stagger-children.tsx  — Stagger container for card grids
    counter.tsx           — Animated number counter
    page-transition.tsx   — Route transition wrapper
```

---

## 4. Navigation

The navbar replicates the current design exactly:

```
[Logo: yellow 01/10 block] SYSTEM-BUILT BY AJ

Home | Solutions v | Revenue Tools | Work v        [moon] [Free Consultation]
              |                            |
              +-- About                    +-- Featured Funnel
              +-- Portfolio                +-- Featured Website
              +-- Services                 +-- --------
              +-- Packages                 +-- Automations
                                           +-- Apps & Tools
```

### Behavior
- Fixed position, blur backdrop, scroll shadow on scroll
- Dropdown menus: open on click, close on outside click, smooth fade+slide animation
- Active state: purple highlight on current route's parent nav item
- Mobile (< 768px): hamburger icon opens slide-out drawer with all items
- "Free Consultation" yellow CTA button always visible
- Theme toggle button (moon/sun) — dark mode default

### Route Mapping for Nav Highlights
| Route | Active Nav Item |
|---|---|
| `/` | Home |
| `/about` | Solutions |
| `/projects` | Solutions |
| `/packages` | Solutions |
| `/revenue` | Revenue Tools |
| `/consult` | Home |
| `/portfolio` | Work |

---

## 5. Design System

### Color Tokens (Tailwind config)
```
background:   #000000
surface:      #0d0d0d
card:         #141414
border:       rgba(255,255,255,0.10)
border-hover: rgba(255,255,255,0.18)
persian:      #5e17eb (primary)
persian-dark: #4d0fd4
persian-light:#7c3aed
yellow:       #f6cb1f (accent)
yellow-dark:  #d4a800
text:         #ffffff
text-muted:   rgba(255,255,255,0.65)
text-faint:   rgba(255,255,255,0.35)
```

### Typography (Inter)
| Role | Size | Weight | Tracking |
|---|---|---|---|
| Hero title | clamp(2.4rem, 5.5vw, 4.2rem) | 900 | -0.03em |
| Section title | clamp(1.8rem, 3.5vw, 3rem) | 900 | -0.03em |
| Card title | 1.1rem | 800 | -0.01em |
| Body | 1rem | 400 | normal |
| Body small | 0.82rem | 400 | normal |
| Eyebrow | 0.68rem | 800 | 0.14em, uppercase |
| Stat number | 2.35rem | 900 | -0.03em |

### Component Style: Hybrid
- **Default state**: `bg-[#141414]` with `border border-white/[0.08]` rounded-2xl
- **Hover state**: `border-purple-500/40` with `shadow-[0_8px_32px_rgba(94,23,235,0.15)]` and `translateY(-2px)`
- **Transition**: 250ms ease on all properties
- White-background sections (Vault, FAQ) use inverted tokens

### Buttons
| Variant | Style |
|---|---|
| Primary (persian) | `bg-persian text-white` hover: darken + lift + shadow |
| Yellow CTA | `bg-yellow text-black font-800` hover: darken + lift + glow |
| Ghost white | transparent + white border, hover: white/10 bg |
| Ghost persian | transparent + persian border, hover: persian/10 bg |

---

## 6. Animation System

All animations use Framer Motion.

### Page Transitions
- Wrap route content in `<PageTransition>` component
- Enter: `opacity: 0 -> 1`, `y: 12 -> 0`, duration 400ms
- Exit: `opacity: 1 -> 0`, duration 200ms

### Scroll Reveal (`<ScrollReveal>`)
- Reusable wrapper component
- Triggers when element enters viewport (threshold: 0.1, rootMargin: -40px)
- Variants: `fade-up` (default), `fade-left`, `fade-right`
- Spring config: `{ stiffness: 100, damping: 20 }`

### Stagger Children (`<StaggerChildren>`)
- Wraps card grids
- Each child animates with 80ms delay
- Same spring config as ScrollReveal

### Animated Counter (`<Counter>`)
- Animates from 0 to target value on scroll
- Duration: 1.5s with ease-out
- Supports suffixes (%, x, +, /mo)
- Used in: hero stats, ROI cards, audit percentages, pricing

### Hover Effects (CSS + Framer)
- Cards: `whileHover={{ y: -3 }}` + CSS border-color and shadow transition
- Buttons: `whileHover={{ y: -2 }}` + `whileTap={{ scale: 0.98 }}`
- Service SVG icons: `whileHover={{ scale: 1.1, rotate: -3 }}` + golden glow filter

### FAQ Accordion
- `AnimatePresence` with height animation
- Content fades in as height expands
- Only one item open at a time

### Project Tabs
- Animated underline indicator that slides to active tab position
- Content: crossfade with `AnimatePresence` mode="wait"

### Revenue Calculator
- Number values use `motion.span` with `animate` on value change
- Bar width transitions with `layout` animation
- Smooth, not instant

### What We Skip
- No parallax scrolling
- No cursor follower effects
- No auto-playing carousels
- No particle effects
- `prefers-reduced-motion`: all animations disabled

---

## 7. Page Specifications

### `/` — Homepage

**Sections in order:**
1. **Hero** — 2-column grid (text left, profile card right)
   - Eyebrow: "Available for new clients" with pulsing dot
   - Title: word-by-word staggered reveal
   - Subtitle: fade in after title
   - 2 CTA buttons: stagger in
   - Stats row: counter animation (5+, 12mo, GHL)
   - Profile card: slides in from right, has tilt-on-mousemove effect
   - Background: radial gradients + dot grid pattern (keep current)

2. **Vault** — "Is This You?" section
   - White/light background section for contrast
   - 2-column: "System Operational" vs "System Needs Engineering"
   - Cards slide in from left/right
   - Keep the checkmark/exclamation styling

3. **Philosophy** — "The System-First Philosophy"
   - Dark background, yellow accents
   - 2x2 grid with MOD_01 through MOD_04
   - Staggered card reveal on scroll

4. **Services** — "HighLevel Setup & Optimization"
   - Dark background, 3-column grid
   - 6 service cards with SVG icons
   - Icon glow + scale animation on hover
   - Keep all current SVG icons

5. **Testimonials** — "What Clients Say"
   - White outer card container with 3-column grid inside
   - Keep SVG avatar illustrations
   - Staggered card entrance
   - Star ratings animate in

6. **HL Banner** — "New to HighLevel?"
   - Purple gradient banner, centered
   - Keep current design, add button pulse

7. **FAQ** — "System Inquiries"
   - White background section
   - shadcn/ui Accordion with smooth height animation
   - 8 FAQ items, all current content preserved

8. **Final CTA** — "If Your Growth Feels Forced..."
   - Dark background, centered text
   - Title reveal animation
   - Yellow CTA button

### `/about` — About AJ
- 2-column layout: bio content left, sticky sidebar right
- Left: eyebrow, title (staggered reveal), body paragraphs, skill chips (staggered), flow diagram, quote, CTA button
- Right: SVG illustration (keep current), category stack with hover effects
- All current content preserved exactly

### `/projects` — Portfolio
- Purple hero header with eyebrow + title
- Tab system: Automations | Funnels | Websites | Apps
- Animated tab indicator + content crossfade
- **Automations tab**: 2-column grid of dark purple cards (keep current dark style)
- **Funnels tab**: 3-column grid with gradient thumbnails
- **Websites tab**: 3-column grid with wireframe thumbnails
- **Apps tab**: 3-column grid with emoji thumbnails
- All placeholder content preserved

### `/revenue` — Revenue Tools
- Purple hero header
- **Revenue Calculator**: sliders + real-time results with animated numbers
- **ROI Scorecard**: 3-card grid with animated counters (4.2x, 3.8x, 3.1x)
- **Audit Tracker**: 4-card grid (2x2) with animated progress bars
- All calculation logic preserved from current JS

### `/packages` — Pricing
- Dark background, centered header with yellow eyebrow
- 3-column grid of white cards (Starter $197, Growth $597, Scale $1,497)
- Staggered card entrance
- Checkmark feature lists
- Purple CTA buttons

### `/consult` — Consultation
- Full purple background
- Centered layout: badge, title (staggered), subtitle, 2 buttons, note, 3 info cards
- External booking link: `https://solution13.online/booking`
- Email: `aj@systembuiltbyaj.com`

### `/portfolio` — Featured Work
- Purple hero header
- Featured Funnel: 2-column card (preview left, body right)
- Featured Website: 2-column card (body left, preview right)
- "More coming soon" placeholder
- All placeholder content preserved for future replacement

---

## 8. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| Desktop (> 1024px) | Full layouts as designed |
| Tablet (768-1024px) | 2-column grids collapse to 1-2 columns, sidebar layouts stack |
| Mobile (< 768px) | Single column, hamburger menu, adjusted typography |

### Mobile-Specific
- Navbar: hamburger icon replaces nav items, opens slide-out drawer
- Hero: single column, profile card below text
- All grids: single column
- Stats: wrap to 2x2 or single column
- FAQ: full width
- Calculator: stacked layout (inputs above, results below)

### Accessibility
- `prefers-reduced-motion`: disable all animations
- Proper heading hierarchy per page
- Focus-visible styles on interactive elements
- Semantic HTML (nav, main, section, article)
- Alt text on SVG illustrations
- Keyboard-navigable dropdowns and accordion

---

## 9. SEO

Each route exports `metadata` with:
- `title`: "Page Name | System Built by AJ"
- `description`: relevant page description
- `openGraph`: title, description, type, url
- Root layout sets `metadataBase`, default OG image, and site-wide defaults

---

## 10. File Structure Summary

```
system-built-by-aj/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    projects/page.tsx
    revenue/page.tsx
    packages/page.tsx
    consult/page.tsx
    portfolio/page.tsx
    globals.css
  components/
    layout/
      navbar.tsx
      mobile-menu.tsx
      footer.tsx
    sections/
      hero.tsx
      vault.tsx
      philosophy.tsx
      services.tsx
      testimonials.tsx
      hl-banner.tsx
      faq.tsx
      final-cta.tsx
    interactive/
      revenue-calculator.tsx
      roi-scorecard.tsx
      audit-tracker.tsx
    motion/
      scroll-reveal.tsx
      stagger-children.tsx
      counter.tsx
      page-transition.tsx
    ui/
      (shadcn components)
  lib/
    utils.ts             — cn() helper
  public/
    (static assets if needed)
  tailwind.config.ts
  next.config.ts
  package.json
  tsconfig.json
```
