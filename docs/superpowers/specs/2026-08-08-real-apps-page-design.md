# Real Apps page + system-builds Section 05 — Design

**Date:** 2026-08-08
**Status:** Approved

## Goal

Give the two shipped MVP apps a home page of their own at `/real-apps`, reachable
from the existing Real Apps nav dropdown, and add an n8n section to
`/system-builds` as a placeholder for work not yet recorded.

## Scope

1. New route `/real-apps` — video block at top, one card section below.
2. Nav: `All Real Apps` entry added to the Real Apps dropdown.
3. New `AppCard` component for link-out app cards.
4. Two Desktop screenshots converted to `.webp` assets.
5. `/system-builds`: new Section 05, n8n Test Project, one Coming Soon card.

Explicitly out of scope: the `/tools` Build & Learn Hub section, which now
duplicates `/real-apps`. Left as-is by decision, not oversight.

---

## 1. Route and files

```
app/real-apps/page.tsx              # server component, metadata + delegate
app/real-apps/real-apps-content.tsx # client component, page body
app/real-apps/app-card.tsx          # AppCard, co-located
public/real-apps/funnel-builder.webp
public/real-apps/ai-learning-hub.webp
```

Follows the existing convention: `app/[route]/page.tsx` delegates to a
co-located `*-content.tsx` client component. Page copy stays inlined in the
content file, as everywhere else in this codebase.

## 2. Navigation

`workDropdown` in `components/layout/navbar.tsx` gains a first item and a
divider, matching the shape `toolsDropdown` already uses:

```js
const workDropdown: NavDropdown = {
  label: "Real Apps",
  items: [
    { label: "All Real Apps", emoji: "\u{1F5C2}", href: "/real-apps",
      description: "Every app I've shipped" },
    { label: "Funnel Builder", ... },      // unchanged, still links out
    { label: "AI Learning Hub", ... },     // unchanged, still links out
  ],
  dividerAfter: 0,
};
```

`routeToActiveNav` gets a `/real-apps` → `Real Apps` entry so the nav
highlights correctly on the new page.

## 3. Page structure

No violet hero band. The page opens with the video block, modelled on
`components/sections/intro-video.tsx`:

- Kicker: `REAL APPS, NOT DEMOS`
- H1: `Products I Built, Shipped, And Actually Run.` with
  `Actually Run.` in `text-persian-light`
- Subcopy: not automations or templates — full apps with auth, databases,
  and real users
- Frame label: `WALKTHROUGH COMING SOON`
- Frame: same `aspect-video`, `rounded-2xl`, `#1a1245 → #0f0a25 → black`
  gradient as `IntroVideo`

The frame renders **no play button and no iframe** because there is no video
yet. In its place sits the same yellow Coming Soon pill that `BuildCard`
already uses (`bg-yellow/15`, `text-yellow`, `border-yellow/25`), so "soon"
is visually identical across the site.

Adding the video later means supplying a video ID and restoring the
play-button branch — the surrounding markup does not change.

Below the video: one section, `Section 01 / Live Apps`, three cards in the
existing `sm:grid-cols-2 lg:grid-cols-3` grid.

## 4. AppCard

New component, separate from `BuildCard` by decision. `BuildCard` is
video-first: clicking it mounts a YouTube iframe in place. App cards need the
opposite — the whole card is an outbound link. Rather than add a
link-or-player mode flag to a component that currently does one thing, the
two live side by side.

```ts
type App = {
  title: string;
  category: string;
  description: string;
  image?: string;
  emoji: string;
  href?: string;   // absent → renders the SOON state, not clickable
  cta?: string;
};
```

Behaviour:

- With `href`: renders `<a target="_blank" rel="noopener noreferrer">`
  wrapping the whole card. Screenshot on top, then category label, title,
  description, and a yellow `{cta} →` row echoing the /tools cards.
- Without `href`: renders a non-interactive `<div>`, emoji instead of a
  screenshot, and the Coming Soon pill. No CTA row.

Visual language (border, gradient, hover lift, radius) is borrowed from the
existing `/tools` card styles so the page reads as part of the same site.

## 5. Card content

| Card | Category | href | Image |
|---|---|---|---|
| Funnel Builder | Live App | funnel-section-builder.vercel.app | funnel-builder.webp |
| AI Learning Hub | Live | ai-specialist-learning-hub.vercel.app | ai-learning-hub.webp |
| Next app | In Build | — | — (emoji + SOON) |

Descriptions for the two live apps reuse the copy already written on the
`/tools` cards. The third card reads:

> **Next App In Build** — Another full-stack build is in progress. Same
> approach: a real problem, a real database, and a real app you can sign
> up for.

## 6. Assets

A temporary `sharp` script converts the two Desktop screenshots. `sharp`
0.34.5 is already present as a Next.js dependency — no new package.

| Source | Treatment | Output |
|---|---|---|
| `~/Desktop/Funnel Thumbnail.png` (1195×932) | trim dead space around the card, fit to 16:9 | `public/real-apps/funnel-builder.webp` |
| `~/Desktop/Leaning Thumbnail.png` (1042×637) | already tight, fit to 16:9 | `public/real-apps/ai-learning-hub.webp` |

Both are fitted onto a `#08060e` canvas at identical 16:9 dimensions, so the
grid stays even and the letterbox bars disappear against the page background.
Quality 82, matching the other `.webp` assets.

The script is deleted once it has run. No build-time image processing is
added.

## 7. system-builds Section 05

A new exported array in `app/system-builds/system-builds-content.tsx`:

```js
export const n8nProjects: SystemBuild[] = [
  {
    title: "Self-Hosted n8n Workflow",
    category: "n8n Automation",
    description:
      "Building automations on self-hosted n8n — webhooks, scheduled jobs, " +
      "and API chains running on my own infrastructure instead of a SaaS " +
      "plan. Walkthrough recording in progress.",
    emoji: "🔗",
    // no videoId → BuildCard renders Coming Soon automatically
  },
];
```

Section heading: `n8n` + `Test Project` (accent), with subcopy
"Self-hosted n8n builds, running on my own infrastructure."

Then a section block identical in structure to Sections 01–04, inserted
after Section 04 and before the footnote, with accent `text-[#EA4B71]`.

`#EA4B71` is n8n's brand colour. It reads pink-red rather than pure red;
this was raised and accepted. It sits alongside the existing section accents:
yellow (01), `#5B9DF9` (02), `#D97757` (03), `#FF8A3D` (04).

No change to `BuildCard` is required — omitting `videoId` already produces
the Coming Soon state.

## 8. Verification

- `npm run build` passes.
- `npm run lint` shows no new problems against the current 18-problem baseline.
- Dev server check: nav dropdown shows the divider and new entry; `/real-apps`
  renders three cards with two opening the live apps in a new tab; Section 05
  appears on `/system-builds` in n8n pink-red with one Coming Soon card.
- Both new `.webp` files load without layout shift.
