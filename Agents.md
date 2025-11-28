# Agents.md — Project Playbook

Authoritative checklist for any AI agent working in this repo. Read this first, then Claude.md, then the code.

## 1) Baseline Stack (verify, don’t assume)
- Next.js 16.0.5 (App Router, Turbopack default), React 19.2.0, React DOM 19.2.0
- Tailwind CSS v4 (CSS-first), @tailwindcss/postcss v4
- TypeScript ^5, ESLint ^9 (no `next lint`), eslint-config-next 16.0.5
- Framer Motion 12.23.24, three ^0.181.2, react-force-graph-3d ^1.29.0
- Node 20+ recommended; check `package.json` before adding/upgrading anything

## 2) Research-First Protocol (non-negotiable)
1. Search latest stable versions before coding: `"next.js latest version 2025"`, `"tailwind css v4 latest"`, `"framer-motion release notes"`.
2. Use Context7 for official docs: `@context7 next.js app router`, `@context7 tailwind css v4 configuration`, `@context7 framer-motion scroll animations`, `@context7 react-three-fiber getting started`.
3. If a newer stable version exists than what's listed, prefer it unless explicitly pinned; check migration notes.
4. Confirm compatibility with current deps and Node 20+; avoid downgrades.
5. Document any version decisions in PR/notes.

## 3) Next.js 16 Guardrails
- App Router only; async `params`/`searchParams` are Promises: `export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; }`.
- Turbopack is default; no custom flag needed.
- `middleware.ts` deprecated → use `proxy.ts` if middleware behavior required.
- `next lint` removed — run `eslint`.
- React 19.2 features available (View Transitions, `useEffectEvent`, Activity API); no `import React` needed (`jsx: "react-jsx"`).

## 4) Tailwind CSS v4 Rules (critical)
- No `tailwind.config.js`; configuration lives in `app/globals.css` with `@theme` and `@utility`.
- Import once at top: `@import "tailwindcss";`
- Use v4 syntax: `bg-(--var)` (not `bg-[var(--var)]`); renamed utilities: `shadow-sm`→`shadow-xs`, `shadow`→`shadow-sm`, `rounded-sm`→`rounded-xs`, `rounded`→`rounded-sm`, `ring`→`ring-3`.
- PostCSS uses `@tailwindcss/postcss` only; do not add `postcss-import` or `autoprefixer`.
- Keep custom utilities and tokens consistent with `app/globals.css` (glass, dot-grid, headings, animations, reduced-motion media query).

## 5) UI/Animation Defaults
- Always animate with Framer Motion (`motion.*`, `AnimatePresence`, `useScroll`, `useTransform`); respect `prefers-reduced-motion`.
- Pull interaction/flow inspiration from Mobbin; compose components per React Bits patterns.
- 3D/WebGL via R3F + drei + three when needed; prefer declarative over imperative.
- For complex timelines consider GSAP; for designer assets use Lottie/Rive; for lightweight auto transitions consider Auto-Animate.
- Target 60fps; apply `will-change` judiciously on animated elements.

## 6) Code & File Conventions
- Naming: Components PascalCase, utilities camelCase, types `*.types.ts`, routes `page.tsx`/`layout.tsx`/`loading.tsx`/`error.tsx`.
- Import order: React hooks/types → Next (Image/Link) → external libs → internal modules (`@/lib/...`) → components → types → styles.
- Server Components by default; add `'use client';` only when needed (state, effects, event handlers, or client-only libs like `react-force-graph-3d`).
- Prefer dynamic imports for heavy/SSR-unsafe packages (see `app/page.tsx` ForceGraph3D pattern).
- Keep comments sparse and explanatory near complex logic/animation variants.

## 7) Workflow Checklist for Any Task
1. Read Claude.md and this file; inspect `package.json` for versions.
2. Research latest docs/versions via Context7; note breaking changes.
3. Review relevant files (`app/page.tsx`, `app/globals.css`, `postcss.config.mjs`, `next.config.ts`) before editing.
4. Draft a brief plan (unless trivial); keep changes minimal and aligned with existing patterns.
5. Implement with Tailwind v4 + Framer Motion; ensure accessibility (semantic HTML, ARIA where needed, focus states preserved).
6. Validate: run `npm run lint` when possible; sanity-check layout/animations for mobile-first responsiveness.
7. Document outcomes in final message with file paths, rationale, and suggested follow-ups.

## 8) Commands
- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — start prod server
- `npm run lint` — ESLint (replace `next lint`)

## 9) Common Gotchas
- Do not add `tailwind.config.*`; keep all tokens/utilities in CSS.
- Use v4 utility names and CSS variable syntax; avoid v3-era `@layer utilities`.
- Async params/searchParams are Promises in Next 16; don’t destructure synchronously.
- Respect reduced-motion preference; animations already defined in `globals.css`.
- Watch tree-shaking: lazy-load heavy 3D/animation libs when possible.

## 10) Quick References
```css
/* Tailwind v4 import and theme (app/globals.css) */
@import "tailwindcss";
@theme {
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --color-primary-emerald: oklch(0.70 0.17 162);
  --shadow-glow-emerald: 0 20px 50px oklch(0.70 0.17 162 / 0.3);
}
@utility glass { background: oklch(1 0 0 / 0.05); backdrop-filter: blur(20px); }
```
```tsx
// Framer Motion pattern
import { motion, AnimatePresence } from "framer-motion";
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } } };
```

Keep this playbook updated whenever versions change or new patterns land. If anything conflicts, align with the latest official docs and update both Agents.md and Claude.md.
