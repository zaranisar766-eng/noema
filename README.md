# NOEMA — Neural Fitness System

Marketing site for a fictional premium mental-fitness brand: a six-channel dry EEG
band and an adaptive training OS. Built as an award-submission-grade experience —
cinematic motion, a live signal field, and a disciplined design system.

Two builds live in this repo:

| Build | File | Use it for |
|---|---|---|
| **Preview** | `noema-preview.html` | Open it in a browser. Zero install, zero deps, the full site. |
| **Production** | everything else | The real Next.js app you'd deploy and extend. |

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 18.18+ required. No environment variables needed to run.

**Optional — drop the 3D:** the R3F band object is the only heavy dependency
group. If you don't want it:

```bash
npm uninstall three @react-three/fiber @react-three/drei
rm components/canvas/BandObject.jsx
```

Nothing else imports it. The hero's signal field is 2D canvas and stays.

---

## Folder structure

```
noema/
├── app/                          # Next.js App Router
│   ├── layout.jsx                # Fonts, metadata, JSON-LD, global chrome
│   ├── page.jsx                  # Section composition — read this first
│   ├── globals.css               # Design tokens + component layer
│   ├── sitemap.js                # Generated sitemap
│   └── robots.js                 # Generated robots.txt
│
├── components/
│   ├── providers/
│   │   └── SmoothScroll.jsx      # Lenis wrapper (sticky-safe, reduced-motion aware)
│   │
│   ├── ui/                       # Primitives — no brand copy lives here
│   │   ├── Preloader.jsx         # Waveform fill → six-panel curtain lift
│   │   ├── Cursor.jsx            # Dot + lagging ring, difference blend
│   │   ├── ScrollProgress.jsx    # Spring-damped top bar
│   │   ├── Reveal.jsx            # Scroll-triggered reveal (up/fade/left/scale)
│   │   ├── MaskText.jsx          # Per-line clipped headline reveal
│   │   ├── Magnetic.jsx          # Pointer-attracted wrapper
│   │   ├── Counter.jsx           # Count-up on first view
│   │   ├── WaveRule.jsx          # Waveform section divider
│   │   ├── Avatar.jsx            # Gradient initials avatar
│   │   └── SectionHead.jsx       # Shared eyebrow + masked headline + lede
│   │
│   ├── layout/
│   │   ├── Nav.jsx               # Glass nav, hide-on-scroll, mobile clip-path sheet
│   │   ├── Footer.jsx            # Outlined wordmark, link columns, live status
│   │   └── Logo.jsx              # The aperture mark
│   │
│   ├── canvas/
│   │   ├── NeuralField.jsx       # Hero signal field (2D canvas, ~2KB)
│   │   └── BandObject.jsx        # Optional R3F band — opt-in, lazy, ssr:false
│   │
│   └── sections/                 # One file per page section
│       ├── Hero.jsx  Proof.jsx  Story.jsx  Timeline.jsx  Values.jsx
│       ├── System.jsx  FeatureCard.jsx  FeatureIcon.jsx  Comparison.jsx
│       ├── Pricing.jsx  Voices.jsx  Insights.jsx  ArtVisual.jsx
│       └── Contact.jsx  Field.jsx
│
├── lib/
│   ├── content.js                # ALL copy and data — swap for a CMS here
│   └── motion.js                 # Shared variants + the one easing curve
│
├── public/                       # Put og.jpg + favicons here
├── tailwind.config.js            # Brand tokens as Tailwind theme
├── next.config.mjs
├── postcss.config.mjs
└── jsconfig.json                 # @/ path alias
```

**The rule:** `lib/content.js` holds every string and number on the site.
Components hold structure and motion, never copy. Changing the brand's words
should never require opening a component.

---

## Design system

### Palette

| Token | Hex | Role |
|---|---|---|
| `obsidian` | `#05070A` | Page ground |
| `carbon` | `#0D1116` | Raised surfaces, cards |
| `graphite` | `#151A21` | Third level |
| `bone` | `#F2EDE3` | Primary text |
| `ash` | `#8C939E` | Secondary text |
| `aurum` | `#E9B872` | **Primary accent** — CTAs, live signal |
| `verdant` / `verdant-lit` | `#1E6A5C` / `#3FA890` | Recovery, calm, success |
| `pulse` | `#FF6F4E` | Strain, alerts, form errors |

Warm metals against cold black. Deliberately not the blue-violet gradient every
neurotech and AI product ships with — NOEMA should read closer to a high-end
spa than a dashboard.

### Type

| Role | Face | Where |
|---|---|---|
| Display | **Instrument Serif** | Headlines, prices, quotes, stat values |
| Body / UI | **Inter** (300–600) | Paragraphs, buttons, nav |
| Utility | **JetBrains Mono** | Eyebrows, data labels, timestamps, readouts |

A serif display on a hardware brand is the site's one aesthetic risk. It's what
keeps it from looking like every other wearable startup, and it's why the mono
labels matter — they supply the instrument credibility the serif deliberately
gives up. All three load via `next/font` (self-hosted, zero layout shift).

Scale lives in `tailwind.config.js` as `text-d-xl` → `text-d-sm`, all `clamp()`-based
so nothing needs a mobile override.

### Signature motif

**The waveform.** It's the preloader's fill, the hero's live field, the
section dividers, the timeline spine, and the newsletter icon. One idea, repeated
with discipline — not five unrelated effects.

---

## Motion

Everything runs on one easing curve, `cubic-bezier(.22,1,.36,1)`, exported as
`EASE` from `lib/motion.js`. Consistency of curve is what separates "designed"
from "animated."

| Effect | Where | How |
|---|---|---|
| Page-load sequence | `Preloader` | Waveform stroke-dash fill → six panels lift, staggered 55ms |
| Headline reveal | `MaskText` | Per-line overflow clip, child slides from `105%` |
| Scroll reveal | `Reveal` | `whileInView`, `once: true`, 8% bottom margin |
| Smooth scroll | `SmoothScroll` | Lenis — drives real scroll so `sticky` survives |
| Parallax | `Hero` | `useScroll` + `useTransform` on aurora blobs and readout cards |
| Magnetic buttons | `Magnetic` | Spring-damped pointer offset, desktop only |
| 3D tilt + spotlight | `FeatureCard` | `rotateX/Y` springs + a CSS radial that tracks the cursor |
| Cursor | `Cursor` | Instant dot, `lerp 0.16` ring, `mix-blend-mode: difference` |
| Scroll-linked spine | `Timeline` | `useScroll` target offsets drive a gradient fill height |
| Shared-element toggle | `Pricing` | `layoutId` thumb slides between billing periods |
| Filter transitions | `Insights` | `layout` + `AnimatePresence mode="popLayout"` |
| Marquee | `Proof` | Pure CSS, pauses on hover |

### Accessibility floor

- `prefers-reduced-motion` disables Lenis, the preloader, the canvas animation
  loop, and every transition — the site still works fully.
- Every interactive element has a visible `:focus-visible` ring in `aurum`.
- Carousel and filters are real buttons with `role="tab"` / `aria-selected`.
- Form errors set `aria-invalid`; success messages use `role="status"`.
- Decorative SVG and canvas are `aria-hidden`.

---

## Performance

- **Hero field is 2D canvas, not WebGL.** ~2KB against ~600KB for three.js, runs
  on a low-end phone, and gains nothing from a third dimension. The 3D budget is
  spent only where an object needs to be turned — `BandObject`, lazy and opt-in.
- **Canvas pauses off-screen** via `IntersectionObserver`. Node count scales to
  viewport area; DPR is capped at 2.
- **Article artwork is generated SVG** from each post's hue. Zero image requests,
  and the cards are unmistakably this brand rather than stock photography.
- Fonts self-hosted through `next/font` with `display: swap`.
- `optimizePackageImports` on `framer-motion` and `drei`.
- Server Components by default; `'use client'` only where there's real interaction
  (11 of 26 components).

---

## SEO

Configured in `app/layout.jsx`:

- Title template, description, keywords, canonical
- Open Graph + Twitter card (drop a 1200×630 `og.jpg` into `public/`)
- `Product` JSON-LD with `aggregateRating` and `offers`
- Generated `sitemap.xml` and `robots.txt` from `lib/content.js`
- Semantic landmarks, one `h1`, ordered heading levels, `<ol>` for the chronology

---

## Extending it

**Add a section** — build it in `components/sections/`, add its copy to
`lib/content.js`, drop it into `app/page.jsx`.

**Wire the form** — `Contact.jsx` has a marked `await new Promise(...)`. Replace
with `fetch('/api/reserve', { method: 'POST', body: data })` and add the route.

**Add the 3D band** — `BandObject` responds to `state.pointer` and is ready to mount:

```jsx
import dynamic from 'next/dynamic';
const BandObject = dynamic(() => import('@/components/canvas/BandObject'), { ssr: false });

<BandObject className="h-[420px] w-full" />
```

**Real blog** — articles already carry slugs. Add `app/insights/[slug]/page.jsx`
and generate from `lib/content.js` or a CMS; the cards already link there.

---

© 2026 NOEMA Systems AG — fictional brand, built as a design exercise.
