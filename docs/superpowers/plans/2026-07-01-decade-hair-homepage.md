# Decade Hair Design Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards-quality, black-and-white editorial homepage mockup for Decade Hair Design (DHD) by Nat Lewis, using real assets pulled from https://github.com/Kirans0615/Decade-Hair, with rich Framer Motion choreography, Lenis smooth scroll, and a shadcn-style component architecture.

**Architecture:** Vite + React + TypeScript SPA. Tailwind CSS drives the monochrome design system via CSS variables. All reusable primitives live in `/components/ui` (shadcn convention — separates dumb, composable UI atoms from page-specific section composition, so any piece can be reused, tested, or swapped without touching layout code). Page sections live in `/components/sections` and are assembled by `App.tsx`. A single `lib/animation-variants.ts` centralizes all Framer Motion variants/easings so choreography stays consistent and DRY across sections. Lenis is wired once at the app root and drives both native scroll and Framer's `useScroll`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, Framer Motion, Lenis, lucide-react, clsx, tailwind-merge.

## Global Constraints

- Palette: background `#0a0a0a` (near-black), foreground `#fafafa` (near-white), gray scale for secondary text/dividers — defined as CSS variables in `src/index.css`, referenced only via Tailwind theme tokens (`bg-background`, `text-foreground`, `border-border`, etc.), never hardcoded hex in components.
- Fonts: `Inter` (weights 100–700) for UI/body/logo, `Fraunces` (weight 300 + italic) for editorial display headlines. Loaded via `@fontsource` packages (no runtime Google Fonts request, works offline).
- All interactive elements must have visible hover and focus-visible states.
- Every section-level motion must wrap in a check against `useReducedMotion()` (custom hook, Task 3) and fall back to a simple opacity fade with no transform/parallax when reduced motion is requested.
- This is a visual mockup, not a tested production app: there is no meaningful pure business logic to unit test in a component tree that is 95% layout/animation. The **test cycle for every task in this plan is:** `npm run typecheck` (must pass with zero errors) → `npm run build` (must succeed) → manual check in the running dev server against the specific expected behavior described in that task's steps. The two exceptions are `lib/utils.ts` (`cn`) and the asset manifest (`lib/assets.ts`), which get real Vitest unit tests because they are pure functions/data with checkable invariants.
- All real image/video assets come from `https://raw.githubusercontent.com/Kirans0615/Decade-Hair/main/<original-filename>`. Final local filenames and section assignments are fixed in Task 4 — do not rename or reassign elsewhere.
- Placeholder copy (services, testimonials, address/hours/phone, social handles) is realistic but fictional. Every placeholder value is collected into `ASSETS_AND_COPY_TODO.md` (Task 19) for the client to replace.
- No git init, no GitHub push, no deploy — local dev server only, per explicit instruction.

---

## File Structure

```
decade-hair-design/
├── ASSETS_AND_COPY_TODO.md
├── components.json
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       ├── hero/hero-video.mp4, hero-poster.jpg
│       ├── gallery/gallery-01.jpg … gallery-06.jpg
│       ├── products/product-tins.jpg, product-cape.jpg
│       ├── atmosphere/atmosphere-booth.jpg
│       └── about/about-portrait.jpg
├── scripts/
│   └── fetch-assets.sh
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── lib/
    │   ├── utils.ts (+ utils.test.ts)
    │   ├── assets.ts (+ assets.test.ts)
    │   └── animation-variants.ts
    ├── hooks/
    │   ├── useReducedMotion.ts
    │   ├── useLenis.ts
    │   └── useMagneticCursor.ts
    ├── components/
    │   ├── ui/
    │   │   ├── dhd-logo.tsx
    │   │   ├── button.tsx
    │   │   ├── magnetic-button.tsx
    │   │   ├── section-heading.tsx
    │   │   ├── divider.tsx
    │   │   ├── grain-overlay.tsx
    │   │   ├── scroll-progress.tsx
    │   │   ├── marquee.tsx
    │   │   └── cursor.tsx
    │   └── sections/
    │       ├── navbar.tsx
    │       ├── hero.tsx
    │       ├── about.tsx
    │       ├── services.tsx
    │       ├── gallery.tsx
    │       ├── lightbox.tsx
    │       ├── products.tsx
    │       ├── atmosphere.tsx
    │       ├── testimonials.tsx
    │       ├── booking-cta.tsx
    │       └── footer.tsx
    └── data/
        ├── services.ts
        ├── testimonials.ts
        └── contact.ts
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `.gitignore`
- Create: `src/main.tsx`, `src/vite-env.d.ts`, `src/App.tsx` (temporary placeholder), `src/index.css` (temporary)
- Create: `components.json`

**Interfaces:**
- Produces: `@/` path alias resolving to `src/`, working `npm run dev` / `npm run build` / `npm run typecheck` scripts.

- [ ] **Step 1: Scaffold Vite + React + TS**

```bash
cd ~/decade-hair-design
npm create vite@latest . -- --template react-ts
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install framer-motion lenis lucide-react clsx tailwind-merge class-variance-authority @fontsource/inter @fontsource/fraunces
npm install -D tailwindcss postcss autoprefixer @types/node vitest
npx tailwindcss init -p
```

- [ ] **Step 3: Configure `@/` path alias**

Edit `tsconfig.json` (add inside `compilerOptions`):

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Edit `vite.config.ts`:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```

- [ ] **Step 4: Add scripts to `package.json`**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "typecheck": "tsc --noEmit",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

- [ ] **Step 5: Create `components.json` (shadcn-style manifest)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

- [ ] **Step 6: Verify scaffold builds**

Run: `npm run typecheck`
Expected: exits 0, no errors (default Vite template compiles clean).

- [ ] **Step 7: Commit**

```bash
git init -q 2>/dev/null || true
```

(No git push — local scaffold only, per project constraints. Skip commit if user has not asked for git; instead just confirm `npm run dev` boots.)

Run: `npm run dev -- --port 5173 &` then `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173` — expect `200`. Stop the dev server after checking.

---

### Task 2: Design Tokens & Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Tailwind theme tokens `bg-background`, `text-foreground`, `text-muted`, `border-border`, `font-sans` (Inter), `font-display` (Fraunces), keyframes `fade-up`, `draw-line`, `marquee`, `grain`.

- [ ] **Step 1: Write `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "30%": { transform: "translate(3%,2%)" },
          "50%": { transform: "translate(-1%,4%)" },
          "70%": { transform: "translate(2%,-2%)" },
          "90%": { transform: "translate(-3%,1%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "draw-line": "draw-line 1.2s cubic-bezier(0.65,0,0.35,1) forwards",
        marquee: "marquee 22s linear infinite",
        grain: "grain 1.2s steps(6) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 2: Write `src/index.css`**

```css
@import "@fontsource/inter/100.css";
@import "@fontsource/inter/300.css";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/fraunces/300.css";
@import "@fontsource/fraunces/300-italic.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 63%;
  --border: 0 0% 20%;
  --accent: 0 0% 98%;
}

* { @apply border-border; }

body {
  @apply bg-background text-foreground font-sans antialiased;
  overscroll-behavior: none;
}

.grain-layer {
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 60;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 1.2s steps(6) infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed with zero errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/index.css
git commit -m "chore: configure monochrome design tokens and global styles"
```

---

### Task 3: Core Utilities & Hooks

**Files:**
- Create: `src/lib/utils.ts`, `src/lib/utils.test.ts`
- Create: `src/lib/animation-variants.ts`
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useLenis.ts`
- Create: `src/hooks/useMagneticCursor.ts`

**Interfaces:**
- Produces: `cn(...classes: ClassValue[]): string`; `useReducedMotion(): boolean`; `useLenis(): void`; `useMagneticCursor<T extends HTMLElement>(strength?: number): { ref: RefObject<T>, x: MotionValue<number>, y: MotionValue<number> }`; variants object `{ fadeUp, staggerContainer, letterContainer, letterChild, underlineDraw, scaleIn }` from `animation-variants.ts`, each a Framer Motion `Variants` object.
- Consumes: nothing (foundation layer).

- [ ] **Step 1: Write failing test for `cn`**

```ts
// src/lib/utils.test.ts
import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })
  it("drops falsy values", () => {
    expect(cn("a", false, undefined, "b")).toBe("a b")
  })
})
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npx vitest run src/lib/utils.test.ts`
Expected: FAIL — `Cannot find module './utils'`

- [ ] **Step 3: Implement `cn`**

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `npx vitest run src/lib/utils.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Write `animation-variants.ts`**

```ts
// src/lib/animation-variants.ts
import type { Variants } from "framer-motion"

export const easeEditorial = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeEditorial } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

export const letterContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
}

export const letterChild: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotate: 4 },
  show: { opacity: 1, y: "0em", rotate: 0, transition: { duration: 0.7, ease: easeEditorial } },
}

export const underlineDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.3 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeEditorial } },
}
```

- [ ] **Step 6: Write `useReducedMotion` hook**

```ts
// src/hooks/useReducedMotion.ts
import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener("change", listener)
    return () => query.removeEventListener("change", listener)
  }, [])

  return reduced
}
```

- [ ] **Step 7: Write `useLenis` hook**

```ts
// src/hooks/useLenis.ts
import { useEffect } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "./useReducedMotion"

export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [reduced])
}
```

- [ ] **Step 8: Write `useMagneticCursor` hook**

```ts
// src/hooks/useMagneticCursor.ts
import { useRef } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "./useReducedMotion"

export function useMagneticCursor<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 200, damping: 15, mass: 0.4 })

  function onMouseMove(e: React.MouseEvent<T>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left - rect.width / 2) * strength)
    rawY.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return { ref, x, y, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 9: Verify everything compiles**

Run: `npm run typecheck && npx vitest run`
Expected: typecheck passes, all vitest tests pass (2/2).

- [ ] **Step 10: Commit**

```bash
git add src/lib src/hooks
git commit -m "feat: add cn utility, animation variants, and motion hooks"
```

---

### Task 4: Asset Pipeline

**Files:**
- Create: `scripts/fetch-assets.sh`
- Create: `src/lib/assets.ts`, `src/lib/assets.test.ts`
- Create (via script): `public/assets/hero/hero-video.mp4`, `public/assets/hero/hero-poster.jpg`, `public/assets/gallery/gallery-01.jpg` … `gallery-06.jpg`, `public/assets/products/product-tins.jpg`, `public/assets/products/product-cape.jpg`, `public/assets/atmosphere/atmosphere-booth.jpg`, `public/assets/about/about-portrait.jpg`

**Interfaces:**
- Produces: typed manifest `ASSETS` object from `src/lib/assets.ts` with keys `hero.video`, `hero.poster`, `gallery: string[]` (6 entries), `products.tins`, `products.cape`, `atmosphere.booth`, `about.portrait` — all string paths rooted at `/assets/...`. Every downstream section imports paths only from this manifest, never a raw string literal.

**Fixed source → destination mapping (from github.com/Kirans0615/Decade-Hair, verified by direct visual inspection):**

| Source filename | Destination | Content |
|---|---|---|
| `7626891-hd_1920_1080_25fps.mp4` | `hero/hero-video.mp4` | Hero background video |
| `34816662_1002183139956932_268397896510996480_n.jpg` | `gallery/gallery-01.jpg` | Pixie cut, side profile |
| `67772588_1348847475290495_1072938355878002688_n.jpg` | `gallery/gallery-02.jpg` | Curly afro, client smiling |
| `67921574_1348847538623822_2535553407985385472_n.jpg` | `gallery/gallery-03.jpg` | Blonde curly tapered undercut |
| `68712885_1348847428623833_4504660338263719936_n.jpg` | `gallery/gallery-04.jpg` | White/gray pixie, window+greenery bg |
| `68868596_1348847341957175_8884867397761105920_n.jpg` | `gallery/gallery-05.jpg` | Gray curled bob, back view |
| `68992248_1348847308623845_9059985807263137792_n.jpg` | `gallery/gallery-06.jpg` | Blonde/white pixie, back view |
| `34845489_1002182296623683_5343590081078755328_n.jpg` | `products/product-tins.jpg` | DHD Smooth product tins flat-lay |
| `35062787_1002182216623691_8259452011217420288_n.jpg` | `products/product-cape.jpg` | DHD branded styling cape |
| `480437054_938564061814182_7834755833444122254_n.jpg` | `atmosphere/atmosphere-booth.jpg` | Trade-show booth w/ Nat Lewis banner |
| `68831057_1348847498623826_2417591959402053632_n.jpg` | `about/about-portrait.jpg` | Mirror selfie, stylist + client, fleur-de-lis wall décor |

Note: `300963850_371484078522186_1154440752414809913_n.jpg` is a byte-identical duplicate of `34816662_...` — intentionally excluded.

- [ ] **Step 1: Write `scripts/fetch-assets.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail
BASE="https://raw.githubusercontent.com/Kirans0615/Decade-Hair/main"
DEST="public/assets"

mkdir -p "$DEST/hero" "$DEST/gallery" "$DEST/products" "$DEST/atmosphere" "$DEST/about"

curl -sL -o "$DEST/hero/hero-video.mp4" "$BASE/7626891-hd_1920_1080_25fps.mp4"
curl -sL -o "$DEST/gallery/gallery-01.jpg" "$BASE/34816662_1002183139956932_268397896510996480_n.jpg"
curl -sL -o "$DEST/gallery/gallery-02.jpg" "$BASE/67772588_1348847475290495_1072938355878002688_n.jpg"
curl -sL -o "$DEST/gallery/gallery-03.jpg" "$BASE/67921574_1348847538623822_2535553407985385472_n.jpg"
curl -sL -o "$DEST/gallery/gallery-04.jpg" "$BASE/68712885_1348847428623833_4504660338263719936_n.jpg"
curl -sL -o "$DEST/gallery/gallery-05.jpg" "$BASE/68868596_1348847341957175_8884867397761105920_n.jpg"
curl -sL -o "$DEST/gallery/gallery-06.jpg" "$BASE/68992248_1348847308623845_9059985807263137792_n.jpg"
curl -sL -o "$DEST/products/product-tins.jpg" "$BASE/34845489_1002182296623683_5343590081078755328_n.jpg"
curl -sL -o "$DEST/products/product-cape.jpg" "$BASE/35062787_1002182216623691_8259452011217420288_n.jpg"
curl -sL -o "$DEST/atmosphere/atmosphere-booth.jpg" "$BASE/480437054_938564061814182_7834755833444122254_n.jpg"
curl -sL -o "$DEST/about/about-portrait.jpg" "$BASE/68831057_1348847498623826_2417591959402053632_n.jpg"

ffmpeg -y -i "$DEST/hero/hero-video.mp4" -vf "select=eq(n\,0)" -q:v 3 -frames:v 1 "$DEST/hero/hero-poster.jpg"

echo "Assets fetched into $DEST"
```

- [ ] **Step 2: Run the fetch script**

Run: `chmod +x scripts/fetch-assets.sh && ./scripts/fetch-assets.sh`
Expected: prints `Assets fetched into public/assets`; `ls public/assets/gallery` shows 6 files; `ls public/assets/hero` shows `hero-video.mp4` and `hero-poster.jpg`.

- [ ] **Step 3: Write failing test for the manifest**

```ts
// src/lib/assets.test.ts
import { describe, it, expect } from "vitest"
import { ASSETS } from "./assets"

describe("ASSETS manifest", () => {
  it("has exactly 6 gallery images", () => {
    expect(ASSETS.gallery).toHaveLength(6)
  })
  it("exposes hero video and poster paths", () => {
    expect(ASSETS.hero.video).toBe("/assets/hero/hero-video.mp4")
    expect(ASSETS.hero.poster).toBe("/assets/hero/hero-poster.jpg")
  })
  it("exposes exactly 2 product images", () => {
    expect(Object.keys(ASSETS.products)).toHaveLength(2)
  })
})
```

- [ ] **Step 4: Run test, verify it fails**

Run: `npx vitest run src/lib/assets.test.ts`
Expected: FAIL — `Cannot find module './assets'`

- [ ] **Step 5: Implement `src/lib/assets.ts`**

```ts
// src/lib/assets.ts
export const ASSETS = {
  hero: {
    video: "/assets/hero/hero-video.mp4",
    poster: "/assets/hero/hero-poster.jpg",
  },
  gallery: [
    "/assets/gallery/gallery-01.jpg",
    "/assets/gallery/gallery-02.jpg",
    "/assets/gallery/gallery-03.jpg",
    "/assets/gallery/gallery-04.jpg",
    "/assets/gallery/gallery-05.jpg",
    "/assets/gallery/gallery-06.jpg",
  ] as const,
  products: {
    tins: "/assets/products/product-tins.jpg",
    cape: "/assets/products/product-cape.jpg",
  },
  atmosphere: {
    booth: "/assets/atmosphere/atmosphere-booth.jpg",
  },
  about: {
    portrait: "/assets/about/about-portrait.jpg",
  },
} as const
```

- [ ] **Step 6: Run test, verify it passes**

Run: `npx vitest run src/lib/assets.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 7: Commit**

```bash
git add scripts/fetch-assets.sh src/lib/assets.ts src/lib/assets.test.ts public/assets
git commit -m "feat: pull real DHD assets from source repo and add typed manifest"
```

---

### Task 5: DHDLogo Component

**Files:**
- Create: `src/components/ui/dhd-logo.tsx`

**Interfaces:**
- Consumes: `letterChild`, `letterContainer`, `underlineDraw` from `@/lib/animation-variants`.
- Produces: `<DHDLogo size="sm" | "md" | "lg" animate={boolean} />`, default `animate=true`, default `size="md"`.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/ui/dhd-logo.tsx
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { letterContainer, letterChild, underlineDraw } from "@/lib/animation-variants"

const SIZES = {
  sm: { mark: "text-lg", crest: "h-4 w-4", sub: "text-[9px]" },
  md: { mark: "text-3xl", crest: "h-6 w-6", sub: "text-[11px]" },
  lg: { mark: "text-6xl md:text-8xl", crest: "h-10 w-10 md:h-14 md:w-14", sub: "text-sm md:text-base" },
} as const

interface DHDLogoProps {
  size?: keyof typeof SIZES
  animate?: boolean
  className?: string
}

const LETTERS = ["D", "H", "D"]

export function DHDLogo({ size = "md", animate = true, className }: DHDLogoProps) {
  const s = SIZES[size]

  return (
    <div className={cn("inline-flex flex-col items-center gap-1 text-foreground", className)}>
      <FleurDeLis className={cn(s.crest, "opacity-90")} />
      <motion.div
        className={cn("flex font-display font-light tracking-[0.25em]", s.mark)}
        variants={letterContainer}
        initial={animate ? "hidden" : "show"}
        animate="show"
      >
        {LETTERS.map((letter, i) => (
          <motion.span key={`${letter}-${i}`} variants={letterChild}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="h-px w-full origin-left bg-foreground/70"
        variants={underlineDraw}
        initial={animate ? "hidden" : "show"}
        animate="show"
      />
      <span className={cn("font-sans font-light uppercase tracking-[0.4em] text-muted", s.sub)}>
        Hair Design
      </span>
    </div>
  )
}

function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className={className}>
      <path d="M12 2c1.5 2 1.5 4.5 0 6.5C10.5 6.5 10.5 4 12 2Z" />
      <path d="M12 8.5c2.5-3 6-2.5 7 0-1.5 2.5-4.5 3-7 0Z" />
      <path d="M12 8.5c-2.5-3-6-2.5-7 0 1.5 2.5 4.5 3 7 0Z" />
      <path d="M12 8.5v9M9 15h6M9 20h6" />
      <path d="M12 17.5c-1 1-2.5 1-3-.3M12 17.5c1 1 2.5 1 3-.3" />
    </svg>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: passes with zero errors.

- [ ] **Step 3: Manual visual check**

Temporarily render `<DHDLogo size="lg" />` in `src/App.tsx`, run `npm run dev`, open browser: confirm the fleur-de-lis crest, letterspaced "DHD," underline, and "HAIR DESIGN" subline all render in white-on-black, and the letters/underline animate in on load. Revert the temporary render.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/dhd-logo.tsx
git commit -m "feat: add animated DHD logo component"
```

---

### Task 6: UI Primitives — Button, MagneticButton, SectionHeading, Divider

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/magnetic-button.tsx`
- Create: `src/components/ui/section-heading.tsx`
- Create: `src/components/ui/divider.tsx`

**Interfaces:**
- Consumes: `cn`, `useMagneticCursor`, `fadeUp`/`letterContainer`/`letterChild` variants.
- Produces: `<Button variant="solid"|"outline" size="default"|"lg">`, `<MagneticButton>` (wraps Button + magnetic effect), `<SectionHeading eyebrow? title lines?>` (word-stagger reveal), `<Divider animated? />`.

- [ ] **Step 1: Implement `button.tsx`**

```tsx
// src/components/ui/button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-sans uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-foreground disabled:opacity-40",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background hover:bg-foreground/85",
        outline: "border border-foreground/50 text-foreground hover:border-foreground",
        ghost: "text-foreground hover:text-muted",
      },
      size: {
        default: "px-7 py-3 text-xs",
        lg: "px-10 py-4 text-sm",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
)
Button.displayName = "Button"
```

- [ ] **Step 2: Implement `magnetic-button.tsx`**

```tsx
// src/components/ui/magnetic-button.tsx
import { motion } from "framer-motion"
import { useMagneticCursor } from "@/hooks/useMagneticCursor"
import { Button, type ButtonProps } from "./button"

export function MagneticButton(props: ButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticCursor<HTMLButtonElement>(0.3)

  return (
    <motion.div style={{ x, y }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      <Button ref={ref} {...props} />
    </motion.div>
  )
}
```

- [ ] **Step 3: Implement `section-heading.tsx`**

```tsx
// src/components/ui/section-heading.tsx
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { letterContainer, letterChild } from "@/lib/animation-variants"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ eyebrow, title, align = "left", className }: SectionHeadingProps) {
  const words = title.split(" ")

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-muted">{eyebrow}</p>
      )}
      <motion.h2
        className={cn(
          "flex flex-wrap gap-x-4 font-display text-4xl font-light italic leading-[1.05] md:text-6xl",
          align === "center" && "justify-center"
        )}
        variants={letterContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} variants={letterChild} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  )
}
```

- [ ] **Step 4: Implement `divider.tsx`**

```tsx
// src/components/ui/divider.tsx
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Divider({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <motion.div
      className={cn("h-px w-full origin-left bg-border", className)}
      initial={animated ? { scaleX: 0 } : undefined}
      whileInView={animated ? { scaleX: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck`
Expected: passes with zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/button.tsx src/components/ui/magnetic-button.tsx src/components/ui/section-heading.tsx src/components/ui/divider.tsx
git commit -m "feat: add button, magnetic button, section heading, and divider primitives"
```

---

### Task 7: Global Chrome — GrainOverlay, ScrollProgress, Marquee, Cursor

**Files:**
- Create: `src/components/ui/grain-overlay.tsx`
- Create: `src/components/ui/scroll-progress.tsx`
- Create: `src/components/ui/marquee.tsx`
- Create: `src/components/ui/cursor.tsx`

**Interfaces:**
- Produces: `<GrainOverlay />`, `<ScrollProgress />` (fixed top bar bound to `useScroll`), `<Marquee items={string[]} />`, `<Cursor />` (fixed custom dot/ring that follows the pointer and scales up over interactive elements).

- [ ] **Step 1: Implement `grain-overlay.tsx`**

```tsx
// src/components/ui/grain-overlay.tsx
export function GrainOverlay() {
  return <div className="grain-layer" aria-hidden="true" />
}
```

- [ ] **Step 2: Implement `scroll-progress.tsx`**

```tsx
// src/components/ui/scroll-progress.tsx
import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-foreground"
    />
  )
}
```

- [ ] **Step 3: Implement `marquee.tsx`**

```tsx
// src/components/ui/marquee.tsx
import { cn } from "@/lib/utils"

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const loop = [...items, ...items]

  return (
    <div className={cn("overflow-hidden border-y border-border py-6", className)}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {loop.map((item, i) => (
          <span key={i} className="font-display text-3xl italic text-muted md:text-5xl">
            {item} <span className="not-italic text-foreground/30">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Implement `cursor.tsx`**

```tsx
// src/components/ui/cursor.tsx
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export function Cursor() {
  const reduced = useReducedMotion()
  const [hovering, setHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 300, damping: 30 })
  const sy = useSpring(y, { stiffness: 300, damping: 30 })

  useEffect(() => {
    if (reduced) return

    function move(e: MouseEvent) {
      x.set(e.clientX - 12)
      y.set(e.clientY - 12)
      const target = e.target as HTMLElement
      setHovering(!!target.closest("a, button, [data-cursor-hover]"))
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-6 w-6 rounded-full border border-foreground mix-blend-difference md:block"
      style={{ x: sx, y: sy }}
      animate={{ scale: hovering ? 2.2 : 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck`
Expected: passes with zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/grain-overlay.tsx src/components/ui/scroll-progress.tsx src/components/ui/marquee.tsx src/components/ui/cursor.tsx
git commit -m "feat: add grain overlay, scroll progress bar, marquee, and magnetic cursor"
```

---

### Task 8: Navbar

**Files:**
- Create: `src/components/sections/navbar.tsx`

**Interfaces:**
- Consumes: `DHDLogo`, `MagneticButton`, `cn`, `lucide-react` (`Menu`, `X`).
- Produces: `<Navbar />` — fixed top nav, transparent over hero, blurred/solid after scroll threshold, mobile hamburger opens full-screen overlay with staggered link reveals.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/navbar.tsx
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { staggerContainer, fadeUp } from "@/lib/animation-variants"

const LINKS = [
  { href: "#about", label: "Studio" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#products", label: "Products" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" aria-label="Decade Hair Design home">
            <DHDLogo size="sm" animate={false} />
          </a>
          <nav className="hidden gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <MagneticButton size="default" variant="outline">
              Book Now
            </MagneticButton>
          </div>
          <button
            aria-label="Open menu"
            className="text-foreground md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <DHDLogo size="sm" animate={false} />
              <button aria-label="Close menu" className="text-foreground" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <motion.nav
              className="flex flex-1 flex-col items-center justify-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={fadeUp}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl italic text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render `<Navbar />` at the top of `App.tsx` over a tall placeholder div, run `npm run dev`: confirm navbar is transparent at scroll top, gains a blurred background after ~40px of scroll, and the mobile hamburger (resize viewport <768px) opens a full-screen overlay with staggered link fade-ups and closes on X or link click.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/navbar.tsx
git commit -m "feat: add sticky navbar with animated mobile overlay menu"
```

---

### Task 9: Hero Section

**Files:**
- Create: `src/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `ASSETS.hero`, `DHDLogo`, `MagneticButton`, `letterContainer`/`letterChild`/`fadeUp` variants, `useReducedMotion`, `lucide-react` (`ChevronDown`).
- Produces: `<Hero />` — full-viewport video hero with layered gradient/vignette overlay, animated logo, staggered headline, CTA, scroll cue.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/hero.tsx
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ASSETS } from "@/lib/assets"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { letterContainer, letterChild, fadeUp } from "@/lib/animation-variants"

const HEADLINE = "Hair, Sculpted."

export function Hero() {
  const reduced = useReducedMotion()
  const [videoReady, setVideoReady] = useState(false)
  const words = HEADLINE.split(" ")

  return (
    <section id="top" className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${ASSETS.hero.poster})`, opacity: videoReady ? 0 : 1 }}
      />
      {!reduced && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={ASSETS.hero.video}
          poster={ASSETS.hero.poster}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/35 to-background/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.6)]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <DHDLogo size="lg" />

        <motion.h1
          className="mt-10 flex flex-wrap justify-center gap-x-5 font-display text-5xl font-light italic leading-[1.05] md:text-8xl"
          variants={letterContainer}
          initial="hidden"
          animate="show"
        >
          {words.map((word, i) => (
            <motion.span key={`${word}-${i}`} variants={letterChild} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-md font-sans text-sm uppercase tracking-[0.35em] text-muted md:text-base"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
        >
          Editorial cuts &amp; color, by Nat Lewis
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1 }}
          className="mt-10"
        >
          <MagneticButton size="lg" variant="solid">
            Book Now
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-foreground/70"
        animate={reduced ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render `<Hero />` in `App.tsx`, run `npm run dev`: confirm the video autoplays full-bleed with no letterboxing, the poster frame shows briefly before `onCanPlay` swaps it out, the gradient/vignette keeps the logo and headline legible, the headline staggers in word-by-word, and the chevron bobs at the bottom. Toggle OS "reduce motion" and confirm the video is replaced by the static poster with no bobbing chevron.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero.tsx
git commit -m "feat: add cinematic full-bleed video hero section"
```

---

### Task 10: About Section

**Files:**
- Create: `src/components/sections/about.tsx`

**Interfaces:**
- Consumes: `ASSETS.about.portrait`, `SectionHeading`, `Divider`, `fadeUp` variant, `useScroll`/`useTransform` (parallax).
- Produces: `<About />`.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/about.tsx
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { Divider } from "@/components/ui/divider"
import { fadeUp } from "@/lib/animation-variants"

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="about" ref={ref} className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-sm md:order-1">
          <motion.img
            src={ASSETS.about.portrait}
            alt="Nat Lewis with a client at the DHD studio"
            className="h-[520px] w-full object-cover"
            style={{ y }}
          />
        </div>
        <motion.div
          className="order-1 md:order-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <SectionHeading eyebrow="The Studio" title="Precision is a Language" />
          <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted md:text-lg">
            Nat Lewis built Decade Hair Design around a simple idea: a haircut is
            architecture. Every line is intentional, every finish is considered,
            and every client leaves looking like a sharper version of themselves.
          </p>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-muted md:text-lg">
            A decade of craft, distilled into a black-and-white studio built for
            focus — no noise, no trends chasing themselves. Just cut, color, and
            finish, done right.
          </p>
          <Divider className="mt-10" />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render in `App.tsx` below Hero, scroll through it in the dev server: confirm the portrait parallaxes slightly against scroll, the copy block fades/rises in on scroll-into-view once, and the divider draws in.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/about.tsx
git commit -m "feat: add about/studio section with parallax portrait"
```

---

### Task 11: Services Section

**Files:**
- Create: `src/data/services.ts`
- Create: `src/components/sections/services.tsx`

**Interfaces:**
- Produces: `SERVICES: { title: string; description: string; price: string }[]` (4 entries); `<Services />`.

- [ ] **Step 1: Write `src/data/services.ts`**

```ts
// src/data/services.ts
export interface Service {
  title: string
  description: string
  price: string
}

export const SERVICES: Service[] = [
  {
    title: "Precision Cutting",
    description: "Sculpted, editorial cuts built around your face and your life.",
    price: "from $85",
  },
  {
    title: "Color & Balayage",
    description: "Hand-painted color — soft grow-out blondes to deep tonal richness.",
    price: "from $150",
  },
  {
    title: "Silk Press & Styling",
    description: "Smooth, glass-finish styling engineered to hold and move.",
    price: "from $95",
  },
  {
    title: "Restorative Treatments",
    description: "Bond-repair and deep conditioning for hair that's been through it.",
    price: "from $65",
  },
]
```

- [ ] **Step 2: Implement `services.tsx`**

```tsx
// src/components/sections/services.tsx
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/ui/section-heading"
import { Divider } from "@/components/ui/divider"
import { SERVICES } from "@/data/services"
import { fadeUp, staggerContainer } from "@/lib/animation-variants"

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="What We Do" title="A Considered Menu" />

      <motion.div
        className="mt-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.title}
            variants={fadeUp}
            className="group grid grid-cols-1 items-baseline gap-3 border-b border-border py-8 transition-colors hover:border-foreground/40 md:grid-cols-[1fr_auto_auto] md:gap-8"
          >
            <h3 className="font-display text-2xl italic transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-sm font-sans text-sm text-muted md:text-base">
              {service.description}
            </p>
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-muted">
              {service.price}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <Divider className="mt-16" />
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 4: Manual visual check**

Render in `App.tsx`, scroll to it: confirm rows stagger in on scroll, and hovering a row slides its title right with a smooth transition and brightens the row's bottom border.

- [ ] **Step 5: Commit**

```bash
git add src/data/services.ts src/components/sections/services.tsx
git commit -m "feat: add services section with hover micro-interactions"
```

---

### Task 12: Gallery + Lightbox

**Files:**
- Create: `src/components/sections/lightbox.tsx`
- Create: `src/components/sections/gallery.tsx`

**Interfaces:**
- Consumes: `ASSETS.gallery`.
- Produces: `<Lightbox images={string[]} openIndex={number|null} onClose={() => void} onNavigate={(i:number)=>void} />`; `<Gallery />` (bento masonry grid, click opens Lightbox, keyboard `Escape`/`ArrowLeft`/`ArrowRight` supported inside Lightbox).

- [ ] **Step 1: Implement `lightbox.tsx`**

```tsx
// src/components/sections/lightbox.tsx
import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface LightboxProps {
  images: readonly string[]
  openIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ images, openIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    if (openIndex === null) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNavigate(((openIndex ?? 0) + 1) % images.length)
      if (e.key === "ArrowLeft") onNavigate(((openIndex ?? 0) - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [openIndex, images.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {openIndex !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button aria-label="Close lightbox" className="absolute right-6 top-6 text-foreground" onClick={onClose}>
            <X className="h-7 w-7" />
          </button>
          <button
            aria-label="Previous image"
            className="absolute left-4 text-foreground md:left-10"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((openIndex - 1 + images.length) % images.length)
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <motion.img
            key={openIndex}
            src={images[openIndex]}
            alt="DHD gallery selection"
            className="max-h-[85vh] max-w-[85vw] object-contain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            aria-label="Next image"
            className="absolute right-4 text-foreground md:right-10"
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((openIndex + 1) % images.length)
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Implement `gallery.tsx`**

```tsx
// src/components/sections/gallery.tsx
import { useState } from "react"
import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { Lightbox } from "./lightbox"
import { staggerContainer, scaleIn } from "@/lib/animation-variants"

const SPANS = ["md:row-span-2", "", "", "md:row-span-2", "", ""]

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="Portfolio" title="Recent Work" />

      <motion.div
        className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 md:[grid-auto-rows:220px]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {ASSETS.gallery.map((src, i) => (
          <motion.button
            key={src}
            variants={scaleIn}
            className={`group relative overflow-hidden rounded-sm ${SPANS[i] ?? ""}`}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open gallery image ${i + 1}`}
          >
            <img
              src={src}
              loading="lazy"
              alt={`DHD styling result ${i + 1}`}
              className="h-full w-full scale-100 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/10" />
          </motion.button>
        ))}
      </motion.div>

      <Lightbox
        images={ASSETS.gallery}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 4: Manual visual check**

Render in `App.tsx`: confirm the 6 images render in a bento grid with staggered scale-in reveal, hovering zooms an image smoothly, clicking opens the lightbox, arrow keys and on-screen chevrons navigate, and `Escape` closes it.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/lightbox.tsx src/components/sections/gallery.tsx
git commit -m "feat: add bento gallery with keyboard-navigable lightbox"
```

---

### Task 13: Products Section

**Files:**
- Create: `src/components/sections/products.tsx`

**Interfaces:**
- Consumes: `ASSETS.products`.
- Produces: `<Products />` — 2-item editorial showcase (not a large grid, per confirmed real asset count).

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/products.tsx
import { motion } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { staggerContainer, fadeUp } from "@/lib/animation-variants"

const PRODUCTS = [
  { src: ASSETS.products.tins, name: "DHD Smooth", note: "Signature smoothing balm, house line" },
  { src: ASSETS.products.cape, name: "DHD Studio Cape", note: "The cape every client wears" },
]

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading eyebrow="House Line" title="Made for the Craft" />

      <motion.div
        className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {PRODUCTS.map((product) => (
          <motion.div key={product.name} variants={fadeUp} className="group">
            <div className="overflow-hidden rounded-sm">
              <img
                src={product.src}
                alt={product.name}
                loading="lazy"
                className="h-[420px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
            </div>
            <h3 className="mt-6 font-display text-2xl italic">{product.name}</h3>
            <p className="mt-1 font-sans text-sm text-muted">{product.note}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render in `App.tsx`: confirm both product images fade/rise in on scroll and zoom slightly on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/products.tsx
git commit -m "feat: add products showcase section"
```

---

### Task 14: Atmosphere Section

**Files:**
- Create: `src/components/sections/atmosphere.tsx`

**Interfaces:**
- Consumes: `ASSETS.atmosphere.booth`, `ASSETS.gallery[2]` (gallery-03, checkered wall bg), `ASSETS.gallery[3]` (gallery-04, window/greenery bg).
- Produces: `<Atmosphere />` — large immersive lead image + two secondary parallax texture panels cropped via `object-position`, with copy block.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/atmosphere.tsx
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ASSETS } from "@/lib/assets"
import { SectionHeading } from "@/components/ui/section-heading"
import { fadeUp } from "@/lib/animation-variants"

export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const yLead = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"])
  const ySide = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])

  return (
    <section id="atmosphere" ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Inside DHD" title="Built for Focus" align="center" />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
          <div className="overflow-hidden rounded-sm md:col-span-2 md:row-span-2">
            <motion.img
              src={ASSETS.atmosphere.booth}
              alt="DHD at a trade show, Nat Lewis backdrop and product display"
              className="h-[340px] w-full object-cover md:h-[600px]"
              style={{ y: yLead }}
            />
          </div>
          <div className="overflow-hidden rounded-sm">
            <motion.img
              src={ASSETS.gallery[2]}
              alt="Studio interior detail, checkered accent wall"
              className="h-[280px] w-full object-cover object-left"
              style={{ y: ySide }}
            />
          </div>
          <div className="overflow-hidden rounded-sm">
            <motion.img
              src={ASSETS.gallery[3]}
              alt="Studio interior detail, natural light and wood floors"
              className="h-[280px] w-full object-cover object-right"
              style={{ y: ySide }}
            />
          </div>
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-2xl text-center font-sans text-base leading-relaxed text-muted md:text-lg"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Natural light, wood floors, and a black-and-white palette built to
          disappear — so the only thing you notice is the work.
        </motion.p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render in `App.tsx`: confirm the three images parallax at slightly different rates on scroll and the copy fades in centered beneath.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/atmosphere.tsx
git commit -m "feat: add atmosphere section with parallax interior imagery"
```

---

### Task 15: Testimonials Section

**Files:**
- Create: `src/data/testimonials.ts`
- Create: `src/components/sections/testimonials.tsx`

**Interfaces:**
- Produces: `TESTIMONIALS: { quote: string; author: string }[]` (3 entries); `<Testimonials />` — auto-advancing crossfade carousel, pauses on hover.

- [ ] **Step 1: Write `src/data/testimonials.ts`**

```ts
// src/data/testimonials.ts
export interface Testimonial {
  quote: string
  author: string
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Nat doesn't just cut hair — she reads it.", author: "R. Monroe" },
  { quote: "Every visit feels like a reset. I walk out looking like the best version of myself.", author: "A. Whitfield" },
  { quote: "The most precise silk press I've ever had. Bar none.", author: "J. Carrington" },
]
```

- [ ] **Step 2: Implement `testimonials.tsx`**

```tsx
// src/components/sections/testimonials.tsx
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TESTIMONIALS } from "@/data/testimonials"
import { SectionHeading } from "@/components/ui/section-heading"

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const current = TESTIMONIALS[index]

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-4xl px-6 py-28 text-center md:px-10 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading eyebrow="Word of Mouth" title="From the Chair" align="center" />

      <div className="relative mt-16 flex h-48 items-center justify-center md:h-40">
        <AnimatePresence mode="wait">
          <motion.figure
            key={current.author}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="font-display text-2xl italic leading-snug md:text-4xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-muted">
              {current.author}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.author}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-foreground" : "bg-border"}`}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 4: Manual visual check**

Render in `App.tsx`: confirm quotes auto-advance every 5s with a crossfade, hovering the section pauses auto-advance, and clicking a dot jumps to that quote.

- [ ] **Step 5: Commit**

```bash
git add src/data/testimonials.ts src/components/sections/testimonials.tsx
git commit -m "feat: add auto-advancing testimonials carousel"
```

---

### Task 16: Booking CTA Band

**Files:**
- Create: `src/components/sections/booking-cta.tsx`

**Interfaces:**
- Consumes: `MagneticButton`, `Marquee`, `SectionHeading`.
- Produces: `<BookingCta />`.

- [ ] **Step 1: Implement the component**

```tsx
// src/components/sections/booking-cta.tsx
import { motion } from "framer-motion"
import { Marquee } from "@/components/ui/marquee"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { fadeUp } from "@/lib/animation-variants"

export function BookingCta() {
  return (
    <section className="border-y border-border bg-background py-28 md:py-36">
      <Marquee items={["Cut", "Color", "Style", "Treat", "Repeat"]} className="mb-16" />

      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <h2 className="font-display text-4xl italic leading-tight md:text-6xl">
          Your next look starts here.
        </h2>
        <p className="mt-6 max-w-md font-sans text-base text-muted">
          Limited chair availability — book your appointment with Nat Lewis today.
        </p>
        <div className="mt-10">
          <MagneticButton size="lg" variant="solid">
            Book Now
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 3: Manual visual check**

Render in `App.tsx`: confirm the marquee scrolls continuously and the CTA copy/button fade in on scroll-into-view.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/booking-cta.tsx
git commit -m "feat: add booking CTA band with service marquee"
```

---

### Task 17: Footer

**Files:**
- Create: `src/data/contact.ts`
- Create: `src/components/sections/footer.tsx`

**Interfaces:**
- Produces: `CONTACT: { address: string; hoursLines: string[]; phone: string; instagram: string; facebook: string }`; `<Footer />`.

- [ ] **Step 1: Write `src/data/contact.ts`**

```ts
// src/data/contact.ts
export const CONTACT = {
  address: "1420 Rittenhouse Ave, Baltimore, MD 21217",
  hoursLines: ["Tue – Fri: 10am – 7pm", "Sat: 9am – 5pm", "Sun – Mon: Closed"],
  phone: "(410) 555-0142",
  instagram: "@decadehairdesign",
  facebook: "/DecadeHairDesign",
}
```

- [ ] **Step 2: Implement `footer.tsx`**

```tsx
// src/components/sections/footer.tsx
import { Instagram, Facebook, MapPin } from "lucide-react"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { Divider } from "@/components/ui/divider"
import { CONTACT } from "@/data/contact"

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-7xl px-6 pb-14 pt-24 md:px-10">
      <Divider className="mb-16" />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <DHDLogo size="md" animate={false} />
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Visit</h4>
          <p className="flex items-start gap-2 font-sans text-sm text-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" /> {CONTACT.address}
          </p>
          <p className="mt-3 font-sans text-sm text-foreground">{CONTACT.phone}</p>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Hours</h4>
          {CONTACT.hoursLines.map((line) => (
            <p key={line} className="font-sans text-sm text-foreground">{line}</p>
          ))}
        </div>
        <div>
          <h4 className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted">Follow</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="text-foreground transition-transform hover:scale-110 hover:text-muted">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-foreground transition-transform hover:scale-110 hover:text-muted">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <p className="mt-16 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-muted">
        © 2026 Decade Hair Design. All rights reserved.
      </p>
    </footer>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: zero errors.

- [ ] **Step 4: Manual visual check**

Render in `App.tsx`: confirm the footer shows logo, address/hours/phone, and social icons scale slightly on hover.

- [ ] **Step 5: Commit**

```bash
git add src/data/contact.ts src/components/sections/footer.tsx
git commit -m "feat: add footer with contact, hours, and social links"
```

---

### Task 18: App Composition — Load Sequence, Lenis, Full Assembly

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: every section component from Tasks 8–17, `useLenis`, `Cursor`, `ScrollProgress`, `GrainOverlay`.
- Produces: fully assembled page at `/`, with a branded load intro that wipes away into the hero.

- [ ] **Step 1: Implement `src/App.tsx`**

```tsx
// src/App.tsx
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useLenis } from "@/hooks/useLenis"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { DHDLogo } from "@/components/ui/dhd-logo"
import { Cursor } from "@/components/ui/cursor"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { GrainOverlay } from "@/components/ui/grain-overlay"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Gallery } from "@/components/sections/gallery"
import { Products } from "@/components/sections/products"
import { Atmosphere } from "@/components/sections/atmosphere"
import { Testimonials } from "@/components/sections/testimonials"
import { BookingCta } from "@/components/sections/booking-cta"
import { Footer } from "@/components/sections/footer"

export default function App() {
  useLenis()
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(!reduced)

  useEffect(() => {
    if (reduced) return
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [reduced])

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            <DHDLogo size="md" />
          </motion.div>
        )}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <GrainOverlay />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Products />
        <Atmosphere />
        <Testimonials />
        <BookingCta />
        <Footer />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Confirm `src/main.tsx` mounts `App` and imports `index.css`**

```tsx
// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed with zero errors.

- [ ] **Step 4: Full manual verification**

Run: `npm run dev`, open the printed local URL in a browser:
- Confirm the branded loader wipes away into the hero within ~1.4s.
- Confirm the hero video autoplays full-bleed with legible logo/headline over the gradient+vignette.
- Scroll the entire page top to bottom: confirm every section reveals on scroll once, the navbar blurs after the hero, the scroll-progress bar at the very top fills proportionally, and the grain overlay is faintly visible throughout.
- Click into the gallery lightbox, navigate with arrow keys, close with Escape.
- Resize to a mobile width (375px) and confirm the hamburger menu, stacked layouts, and touch-sized tap targets all work.
- Toggle OS-level "prefers reduced motion" and reload: confirm the loader, parallax, cursor, and scroll-cue bob are all disabled, replaced by simple static/opacity states.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: assemble full homepage with branded load-in sequence"
```

---

### Task 19: Final Asset/Copy Checklist

**Files:**
- Create: `ASSETS_AND_COPY_TODO.md`

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Write the checklist**

```markdown
# Decade Hair Design — Assets & Copy To Confirm

## Real assets already wired in (from github.com/Kirans0615/Decade-Hair)
- [x] Hero video: `public/assets/hero/hero-video.mp4`
- [x] Hero poster (auto-extracted first frame): `public/assets/hero/hero-poster.jpg`
- [x] Gallery (6): `public/assets/gallery/gallery-01.jpg` … `gallery-06.jpg`
- [x] Products (2): `public/assets/products/product-tins.jpg`, `product-cape.jpg`
- [x] Atmosphere lead image: `public/assets/atmosphere/atmosphere-booth.jpg`
- [x] About portrait: `public/assets/about/about-portrait.jpg`

## Placeholder copy to replace with real information
- [ ] `src/data/services.ts` — service names/descriptions/prices are placeholder, confirm real menu + pricing
- [ ] `src/data/testimonials.ts` — all 3 quotes are fictional placeholders, replace with real client reviews
- [ ] `src/data/contact.ts` — address, phone, hours, and social handles are placeholders, replace with real info
- [ ] `src/components/sections/footer.tsx` — Instagram/Facebook `<a href="#">` links need real URLs

## Known asset gaps
- No dedicated storefront exterior photo exists in the source repo — none was fabricated. If you have one, add it to `public/assets/atmosphere/` and wire it into `src/components/sections/atmosphere.tsx`.
- Only 2 real product photos exist; the Products section is intentionally a small 2-item showcase rather than a full grid. Add more images to `public/assets/products/` and extend `src/components/sections/products.tsx`'s `PRODUCTS` array if more product photography becomes available.
```

- [ ] **Step 2: Commit**

```bash
git add ASSETS_AND_COPY_TODO.md
git commit -m "docs: add asset and placeholder-copy checklist for client review"
```
