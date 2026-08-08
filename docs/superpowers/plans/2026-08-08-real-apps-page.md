# Real Apps Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/real-apps` page listing the shipped MVP apps, linked from the Real Apps nav dropdown, and add an n8n Section 05 to `/system-builds`.

**Architecture:** New route follows the existing `app/[route]/page.tsx` → co-located `*-content.tsx` convention. A new `AppCard` component handles link-out app cards; the existing `BuildCard` is reused untouched for the n8n section. Two Desktop screenshots become `.webp` assets via a throwaway `sharp` script.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, framer-motion, sharp 0.34.5 (already installed).

**Spec:** `docs/superpowers/specs/2026-08-08-real-apps-page-design.md`

## Global Constraints

- **No new dependencies.** `sharp` 0.34.5 is already present via Next.js. Do not install anything.
- **Brand invariants:** violet `#5e17eb` (`persian`), gold `#f6cb1f` (`yellow`), bg `#08060e`. Inter only. Do not introduce new fonts or brand colors. The one permitted new accent is `#EA4B71` (n8n brand) used only for Section 05.
- **No test suite exists in this project.** Verification for every task is: `npm run build` passes, `npm run lint` shows no NEW problems, and a dev-server visual check. Do not add a test framework.
- **Lint baseline is 18 problems (8 errors, 10 warnings).** All pre-existing. A task is only done if the count is still 18.
- ES modules, `async/await`, 2-space indent.
- Assets are `.webp`. Card thumbnails render at `aspect-[3/2]`.
- Page copy stays inlined in the content file. There is no `content/` folder.
- Commit after each task. Do not push; AJ pushes.

---

### Task 1: Convert the two screenshots to webp assets

**Files:**
- Create: `scripts/convert-real-apps-thumbs.mjs` (temporary, deleted in this task)
- Create: `public/real-apps/funnel-builder.webp`
- Create: `public/real-apps/ai-learning-hub.webp`

**Interfaces:**
- Consumes: nothing.
- Produces: two image paths used by Task 2 — `/real-apps/funnel-builder.webp` and `/real-apps/ai-learning-hub.webp`, both 1200×800 (3:2).

**Source files** (already on disk, verified):
- `~/Desktop/Funnel Thumbnail.png` — 1195×932, app card floats in a large dark margin, needs cropping
- `~/Desktop/Leaning Thumbnail.png` — 1042×637, already tight (note: filename is "Leaning", not "Learning")

- [ ] **Step 1: Write the conversion script**

Create `scripts/convert-real-apps-thumbs.mjs`:

```js
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const desktop = path.join(os.homedir(), "Desktop");
const outDir = "public/real-apps";
await mkdir(outDir, { recursive: true });

// Page background, so letterbox bars vanish against the page
const BG = { r: 8, g: 6, b: 14, alpha: 1 }; // #08060e
const WIDTH = 1200;
const HEIGHT = 800; // 3:2, matches the card's aspect-[3/2] thumbnail frame

// The funnel screenshot has ~350px of dead space above the card and
// ~130px below it. Crop to the card plus a small margin before fitting.
await sharp(path.join(desktop, "Funnel Thumbnail.png"))
  .extract({ left: 150, top: 335, width: 900, height: 490 })
  .resize(WIDTH, HEIGHT, { fit: "contain", background: BG })
  .webp({ quality: 82 })
  .toFile(path.join(outDir, "funnel-builder.webp"));

// Already framed tightly, no crop needed
await sharp(path.join(desktop, "Leaning Thumbnail.png"))
  .resize(WIDTH, HEIGHT, { fit: "contain", background: BG })
  .webp({ quality: 82 })
  .toFile(path.join(outDir, "ai-learning-hub.webp"));

console.log("done");
```

- [ ] **Step 2: Run the script**

Run: `node scripts/convert-real-apps-thumbs.mjs`
Expected: prints `done`, no errors.

- [ ] **Step 3: Verify the output files exist and are the right size**

Run: `node -e "const s=require('sharp');for(const f of ['funnel-builder','ai-learning-hub']){s('public/real-apps/'+f+'.webp').metadata().then(m=>console.log(f,m.width+'x'+m.height,m.format,Math.round(require('fs').statSync('public/real-apps/'+f+'.webp').size/1024)+'KB'))}"`

Expected: both report `1200x800 webp`, each well under 200KB.

- [ ] **Step 4: Visually verify the crop**

Open `public/real-apps/funnel-builder.webp` with the Read tool. The login card must be fully visible and roughly fill the frame — not cut off at any edge, not floating in a large empty margin.

If the crop is wrong, adjust the `extract` values in the script, re-run Step 2, and re-check. Common fixes: increase `height` if the card bottom is clipped; decrease `top` if the header is clipped.

- [ ] **Step 5: Delete the temporary script**

```bash
rm scripts/convert-real-apps-thumbs.mjs
```

The project keeps no dead code. Conversion is a one-off, not a build step.

- [ ] **Step 6: Commit**

```bash
git add public/real-apps
git commit -m "feat(real-apps): add app screenshot assets"
```

---

### Task 2: AppCard component and the /real-apps route

**Files:**
- Create: `app/real-apps/app-card.tsx`
- Create: `app/real-apps/real-apps-content.tsx`
- Create: `app/real-apps/page.tsx`

**Interfaces:**
- Consumes: the two webp paths from Task 1.
- Produces: route `/real-apps`, referenced by Task 3's nav entry. Exports `AppCard` and type `App` from `app/real-apps/app-card.tsx`.

- [ ] **Step 1: Create the AppCard component**

Create `app/real-apps/app-card.tsx`:

```tsx
"use client";

import Image from "next/image";
import { StaggerItem } from "@/components/motion/stagger-children";

export type App = {
  title: string;
  category: string;
  description: string;
  emoji: string;
  image?: string;
  href?: string;
  cta?: string;
};

const cardCls =
  "group flex h-full flex-col rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(94,23,235,0.12)]";

export function AppCard({ app }: { app: App }) {
  const inner = (
    <>
      <div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br from-persian/20 via-[#1a0845]/40 to-[#2a0f6a]/30">
        {app.image ? (
          <Image
            src={app.image}
            alt={app.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.18)_0%,transparent_70%)]" />
            <span className="relative text-5xl opacity-60">{app.emoji}</span>
          </>
        )}

        {!app.href && (
          <span className="absolute top-3 right-3 rounded-full border border-yellow/25 bg-yellow/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow backdrop-blur-sm">
            Coming Soon
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-yellow">
          {app.category}
        </p>
        <h3 className="mb-2 text-base font-bold leading-snug text-white">
          {app.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-white/55">
          {app.description}
        </p>

        {app.href && app.cta && (
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-yellow transition-colors group-hover:text-yellow-dark">
            {app.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  return (
    <StaggerItem>
      {app.href ? (
        <a href={app.href} target="_blank" rel="noopener noreferrer" className={cardCls}>
          {inner}
        </a>
      ) : (
        <div className={cardCls}>{inner}</div>
      )}
    </StaggerItem>
  );
}
```

Note `mt-auto` on the CTA row: it pins the CTA to the card bottom so all cards in a row align regardless of description length.

- [ ] **Step 2: Create the page content**

Create `app/real-apps/real-apps-content.tsx`:

```tsx
"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren } from "@/components/motion/stagger-children";
import { AppCard, type App } from "./app-card";

const apps: App[] = [
  {
    title: "Funnel Builder",
    category: "Live App",
    description:
      "A full-stack app I built, turn the 10P framework into copy-ready AI prompts for every funnel section. Sign up and try it.",
    emoji: "🧩",
    image: "/real-apps/funnel-builder.webp",
    href: "https://funnel-section-builder.vercel.app/",
    cta: "Open Builder",
  },
  {
    title: "AI Learning Hub",
    category: "Live App",
    description:
      "My personal learning hub for mastering AI-specialist skills, lessons, references, and resources.",
    emoji: "🎓",
    image: "/real-apps/ai-learning-hub.webp",
    href: "https://ai-specialist-learning-hub.vercel.app/",
    cta: "Open Learning Hub",
  },
  {
    title: "Next App In Build",
    category: "In Build",
    description:
      "Another full-stack build is in progress. Same approach, a real problem, a real database, and a real app you can sign up for.",
    emoji: "🚧",
  },
];

export function RealAppsContent() {
  return (
    <PageTransition>
      {/* Intro + video (no video yet, frame shows Coming Soon) */}
      <section className="relative px-6 pt-20 pb-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              Real Apps, Not Demos
            </p>
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Products I Built, Shipped, And{" "}
              <span className="text-persian-light">Actually Run.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
              Not automations or templates, full apps with auth, databases, and
              real users. Sign up, click around, and see how they work.
            </p>
          </div>

          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Walkthrough Coming Soon
          </p>

          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl
              border border-white/[0.08] bg-gradient-to-br from-[#1a1245] via-[#0f0a25] to-black
              shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,23,235,0.18)_0%,transparent_70%)]" />
            <span className="relative rounded-full border border-yellow/25 bg-yellow/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-yellow backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Section 01, the apps */}
      <section className="relative px-5 py-14 sm:px-6 md:py-20">
        <div className="pointer-events-none absolute top-1/3 left-[15%] h-[400px] w-[400px] rounded-full bg-persian/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-8 md:mb-10">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow md:text-xs">
                Section 01
              </p>
              <h2 className="mb-2 text-2xl font-bold leading-tight text-white md:text-4xl">
                Live <span className="text-yellow">Apps</span>
              </h2>
              <p className="max-w-xl text-[14px] leading-relaxed text-white/55 md:text-base">
                Full products I designed, built, and deployed end to end.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.title} app={app} />
            ))}
          </StaggerChildren>
        </div>
      </section>
    </PageTransition>
  );
}
```

- [ ] **Step 3: Create the route**

Create `app/real-apps/page.tsx`:

```tsx
import type { Metadata } from "next";
import { RealAppsContent } from "./real-apps-content";

export const metadata: Metadata = {
  title: "Real Apps",
  description:
    "Full-stack apps I built, shipped, and run, not automations or templates. Sign up and try them.",
};

export default function RealAppsPage() {
  return <RealAppsContent />;
}
```

- [ ] **Step 4: Verify the build passes**

Run: `npm run build 2>&1 | tail -25`
Expected: build completes; `/real-apps` appears in the route list.

- [ ] **Step 5: Verify lint has no new problems**

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)` — unchanged from baseline. If higher, fix the new problems before continuing.

- [ ] **Step 6: Visual check on the dev server**

Run `npm run dev`, open `http://localhost:3000/real-apps`. Confirm:
- Headline renders with "Actually Run." in violet
- Video frame shows the yellow Coming Soon pill, no play button
- Three cards: two with screenshots filling the 3:2 frame edge to edge, one with the 🚧 emoji and a Coming Soon badge
- Clicking either live card opens the app in a new tab
- The third card is not clickable and shows no CTA arrow

- [ ] **Step 7: Commit**

```bash
git add app/real-apps
git commit -m "feat(real-apps): add /real-apps page with AppCard grid"
```

---

### Task 3: Wire the nav dropdown

**Files:**
- Modify: `components/layout/navbar.tsx:34-40` (workDropdown), `:54-68` (routeToActiveNav)

**Interfaces:**
- Consumes: route `/real-apps` from Task 2.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the All Real Apps entry and divider**

In `components/layout/navbar.tsx`, replace the `workDropdown` block:

```js
const workDropdown: NavDropdown = {
  label: "Real Apps",
  items: [
    { label: "All Real Apps", emoji: "\u{1F5C2}", href: "/real-apps", description: "Every app I've shipped" },
    { label: "Funnel Builder", emoji: "\u{1F9E9}", href: "https://funnel-section-builder.vercel.app/", description: "Full-stack AI funnel prompt builder (live app)" },
    { label: "AI Learning Hub", emoji: "\u{1F393}", href: "https://ai-specialist-learning-hub.vercel.app/", description: "My AI-specialist learning hub" },
  ],
  dividerAfter: 0,
};
```

`dividerAfter: 0` draws a separator after the first item — the same pattern `toolsDropdown` already uses at line 51.

- [ ] **Step 2: Register the route for nav highlighting**

In the `routeToActiveNav` map, add this entry after the `"/services": "Gallery",` line:

```js
  "/real-apps": "Real Apps",
```

The value must match `workDropdown.label` exactly, or the nav item will not highlight when the page is open.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build 2>&1 | tail -10`
Expected: build completes with no errors.

- [ ] **Step 4: Verify lint has no new problems**

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 5: Visual check on the dev server**

Open `http://localhost:3000`. Hover the Real Apps nav item. Confirm:
- Three items, with a divider line under "All Real Apps"
- "All Real Apps" navigates to `/real-apps` without leaving the site
- The other two still open their live apps in a new tab
- On `/real-apps`, the "Real Apps" nav label shows its active state
- Open the mobile menu at a narrow width and confirm the new entry appears there too

- [ ] **Step 6: Commit**

```bash
git add components/layout/navbar.tsx
git commit -m "feat(nav): link Real Apps dropdown to the new /real-apps page"
```

---

### Task 4: Add Section 05, n8n Test Project

**Files:**
- Modify: `app/system-builds/system-builds-content.tsx` — add an array after `zapierTutorials`, add a section block after Section 04

**Interfaces:**
- Consumes: the existing `SystemBuild` type and `BuildCard` component, both already in this file. Neither is modified.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the n8n data array**

In `app/system-builds/system-builds-content.tsx`, immediately after the `zapierTutorials` array closes and before `function BuildCard(`, add:

```ts
export const n8nProjects: SystemBuild[] = [
  {
    title: "Self-Hosted n8n Workflow",
    category: "n8n Automation",
    description:
      "Building automations on self-hosted n8n, webhooks, scheduled jobs, and API chains running on my own infrastructure instead of a SaaS plan. Walkthrough recording in progress.",
    emoji: "🔗",
  },
];
```

Omitting `videoId` is what makes `BuildCard` render the Coming Soon badge — see the `hasVideo` branch at line 276. Do not modify `BuildCard`.

- [ ] **Step 2: Add the Section 05 block**

In `SystemBuildsContent`, after the Section 4 `</div>` closes and before the `{/* Footnote */}` comment, add:

```tsx
          {/* Section 5, n8n Test Project (n8n pink-red) */}
          <div>
            <ScrollReveal>
              <div className="mb-8 md:mb-10">
                <p className="text-[#EA4B71] text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Section 05
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  n8n <span className="text-[#EA4B71]">Test Project</span>
                </h2>
                <p className="text-white/55 text-[14px] md:text-base max-w-xl leading-relaxed">
                  Self-hosted n8n builds, running on my own infrastructure.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren className="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {n8nProjects.map((build) => (
                <BuildCard key={build.title} build={build} accent="text-[#EA4B71]" />
              ))}
            </StaggerChildren>
          </div>
```

This mirrors Sections 01–04 exactly, differing only in the accent color, the numbers, and the array name.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build 2>&1 | tail -10`
Expected: build completes with no errors.

- [ ] **Step 4: Verify lint has no new problems**

Run: `npm run lint 2>&1 | tail -3`
Expected: `✖ 18 problems (8 errors, 10 warnings)`.

- [ ] **Step 5: Visual check on the dev server**

Open `http://localhost:3000/system-builds` and scroll past Section 04. Confirm:
- "Section 05" and "Test Project" render in pink-red `#EA4B71`
- One card with a 🔗 emoji and a yellow Coming Soon badge in its top-right
- The card has no play button
- The footnote still sits below Section 05

- [ ] **Step 6: Commit**

```bash
git add app/system-builds/system-builds-content.tsx
git commit -m "feat(system-builds): add Section 05 for n8n test projects"
```

---

## Final Verification

After all four tasks:

- [ ] `npm run build` passes
- [ ] `npm run lint` reports exactly 18 problems
- [ ] `git status` is clean and `scripts/convert-real-apps-thumbs.mjs` no longer exists
- [ ] `/real-apps` renders correctly at desktop and mobile widths
- [ ] `/system-builds` Section 05 renders correctly
- [ ] Report to AJ for review before pushing. AJ pushes to master and verifies on Vercel.
