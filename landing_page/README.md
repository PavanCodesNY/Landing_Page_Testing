# N-Mapper Landing Page — Tailwind CSS v4

Production-ready landing page built with **Next.js 16**, **React 19.2**, **Tailwind CSS v4**, and **Framer Motion 12**.

## What's New in Tailwind v4

This project uses the CSS-first configuration approach introduced in Tailwind v4:

- ❌ **No `tailwind.config.js`** — Configuration lives in CSS
- ✅ **`@theme` directive** — Define design tokens directly in CSS
- ✅ **`@utility` directive** — Create custom utilities in CSS
- ✅ **`@import "tailwindcss"`** — Single import replaces `@tailwind` directives
- ✅ **`@tailwindcss/postcss`** — New PostCSS plugin package
- ✅ **OKLCH colors** — Modern color space for vibrant colors

## Project Structure

```
nmapper-v4/
├── page.tsx            # Landing page component (app/page.tsx)
├── layout.tsx          # Root layout with fonts (app/layout.tsx)
├── globals.css         # Tailwind v4 config + styles (app/globals.css)
├── postcss.config.mjs  # PostCSS config for Tailwind v4
├── package.json        # Dependencies
└── README.md           # This file
```

## Quick Start

### 1. Create a new Next.js 16 project

```bash
npx create-next-app@latest my-nmapper
cd my-nmapper
```

When prompted:
- TypeScript? **Yes**
- ESLint? **Yes**
- Tailwind CSS? **Yes**
- `src/` directory? **No**
- App Router? **Yes**
- Turbopack? **Yes** (default in Next.js 16)
- React Compiler? **No** (optional, can cause issues with some libs)
- Customize import alias? **No**

### 2. Install additional dependencies

```bash
npm install framer-motion react-force-graph-3d three
```

### 3. Copy the files

```bash
# Copy to your app directory
cp page.tsx app/page.tsx
cp layout.tsx app/layout.tsx
cp globals.css app/globals.css
cp postcss.config.mjs postcss.config.mjs
```

### 4. Run the dev server

```bash
npm run dev
```

## Key Tailwind v4 Features Used

### @theme Directive

All design tokens are defined in `globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Custom fonts */
  --font-sans: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  
  /* Custom colors using OKLCH */
  --color-primary-dark: oklch(0.13 0.02 264);
  --color-primary-emerald: oklch(0.70 0.17 162);
  
  /* Custom shadows */
  --shadow-glow-emerald: 0 20px 50px oklch(0.70 0.17 162 / 0.3);
}
```

### @utility Directive

Custom utilities replace the old `@layer utilities` approach:

```css
@utility glass {
  background: oklch(1 0 0 / 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid oklch(1 0 0 / 0.1);
}

@utility dot-grid {
  background-image: radial-gradient(oklch(1 0 0 / 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### CSS Variable Syntax

Tailwind v4 uses `--variable` syntax in classes:

```jsx
// Old v3 syntax (no longer works)
<div className="bg-[var(--color-primary-dark)]">

// New v4 syntax
<div className="bg-(--color-primary-dark)">
```

### Updated Utility Names

Some utilities were renamed in v4:

| v3 | v4 |
|----|----|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `rounded-sm` | `rounded-xs` |
| `rounded` | `rounded-sm` |
| `ring` | `ring-3` (ring is now 1px) |

## PostCSS Configuration

The `postcss.config.mjs` uses the new `@tailwindcss/postcss` package:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Note: `postcss-import` and `autoprefixer` are no longer needed — Tailwind v4 handles imports and vendor prefixes automatically.

## Sections Included

1. **Hero** — Gradient orb animation, dot grid background, main CTA
2. **Graph Preview** — Interactive 3D force-directed graph demo
3. **Feature Cards** — 3-column grid with glassmorphism
4. **Dashboard Mockup** — Browser frame with screenshot placeholder
5. **Social Proof** — University logos
6. **Final CTA** — Glassmorphic card with dual CTAs
7. **Footer** — Links and branding

## Browser Support

Tailwind CSS v4 requires modern browsers:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

For older browser support, use Tailwind v3.

## Adding Your Dashboard Screenshot

Replace the placeholder in `DashboardMockupSection` with:

```jsx
import Image from "next/image";

<Image
  src="/images/dashboard.png"
  alt="N-Mapper Dashboard"
  fill
  className="object-cover"
  priority
/>
```

## Customizing Colors

Edit the `@theme` block in `globals.css`:

```css
@theme {
  /* Override or add colors */
  --color-primary-emerald: oklch(0.75 0.20 150); /* Different green */
  --color-brand: oklch(0.60 0.25 280);           /* New purple */
}
```

Then use in your components:

```jsx
<div className="bg-brand text-primary-emerald">
```

## Performance Notes

- 3D graph is dynamically imported to reduce initial bundle
- Framer Motion animations respect `prefers-reduced-motion`
- Next.js fonts use `next/font` for optimal loading
- Turbopack enabled for faster dev builds

## License

MIT
