# Next.js Project Context Template

Use this document when starting a new Next.js project with Claude. Copy, fill in the blanks, and paste at the start of your conversation.

---

## Current Environment

```json
{
  "next": "16.0.5",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "typescript": "^5",
  "eslint": "^9",
  "eslint-config-next": "16.0.5"
}
```

**Update these versions** by running `npm list` or checking your `package.json` after `create-next-app`.

---

## Project Setup Choices

When I ran `npx create-next-app@latest`, I selected:

| Prompt | My Choice |
|--------|-----------|
| TypeScript | Yes |
| ESLint | Yes |
| Tailwind CSS | Yes |
| `src/` directory | No |
| App Router | Yes |
| Turbopack | Yes |
| React Compiler | No |
| Import alias | @/* (default) |

---

## Tailwind CSS v4 Notes

**This project uses Tailwind v4, which is CSS-first:**

- ❌ No `tailwind.config.js` or `tailwind.config.ts`
- ✅ Configuration goes in `globals.css` using `@theme` directive
- ✅ Custom utilities use `@utility` directive (not `@layer utilities`)
- ✅ Import with `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- ✅ PostCSS uses `@tailwindcss/postcss` package
- ✅ CSS variables in classes use `bg-(--my-var)` syntax (not `bg-[var(--my-var)]`)

**Renamed utilities in v4:**
- `shadow-sm` → `shadow-xs`
- `shadow` → `shadow-sm`  
- `rounded-sm` → `rounded-xs`
- `rounded` → `rounded-sm`
- `ring` → `ring-3` (ring is now 1px by default)

---

## Next.js 16 Notes

- Turbopack is the default bundler (no `--turbopack` flag needed)
- `next lint` removed — use `eslint` directly
- `middleware.ts` deprecated → use `proxy.ts`
- React 19.2 features available (View Transitions, useEffectEvent, Activity)
- Async params/searchParams required in page components

---

## My package.json

```json
{paste your current package.json here}
```

---

## Project Requirements

**What I'm building:**
[Describe your project - e.g., "A landing page for a SaaS product with hero, features, pricing, and contact sections"]

**Design style:**
[Describe the aesthetic - e.g., "Dark mode, glassmorphism, emerald accent color, Space Grotesk font"]

**Key features needed:**
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

**Additional libraries to use:**
- [ ] Framer Motion (animations)
- [ ] react-force-graph-3d (3D graphs)
- [ ] Other: ___

---

## Files I Already Have

If you've already set up the project, paste the contents of key files:

**postcss.config.mjs:**
```js
// paste here
```

**app/globals.css:**
```css
// paste here (especially the @theme block)
```

**app/layout.tsx:**
```tsx
// paste here
```

---

## Instructions for Claude

1. **Check my versions first** — Don't assume older versions
2. **Use Tailwind v4 syntax** — `@theme`, `@utility`, no config file
3. **Use Next.js 16 patterns** — App Router, async params, no `next lint`
4. **Research if unsure** — Search for latest docs before implementing
5. **Match my existing setup** — Don't add dependencies I don't need
6. **Keep code modern** — Use React 19 features where appropriate

---

## Example: Minimal Context for Quick Tasks

For simple tasks, this shorter version works:

```
Stack: Next.js 16.0.5, React 19.2, Tailwind v4 (CSS-first, no config file), TypeScript

My package.json:
{paste it}

Task: [what you want to build]
```

---

## Checklist Before Starting

- [ ] Ran `create-next-app` and noted my choices
- [ ] Copied my `package.json` into this document  
- [ ] Described what I'm building
- [ ] Listed any specific libraries needed
- [ ] Pasted existing config files if applicable
