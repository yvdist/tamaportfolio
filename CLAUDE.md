# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # production build (Vercel adapter), prerenders every route
npm run preview   # serve the production build
npm run check     # svelte-kit sync + svelte-check (type checking)
npm run lint      # prettier --check . && eslint .
npm run format    # prettier --write .
npm test          # vitest run (data integrity tests in src/**/*.test.ts)
```

Run a single test file with `npx vitest run src/lib/data/projects.test.ts`.

`.npmrc` sets `engine-strict=true`.

## Architecture

Personal portfolio: SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v4, deployed with `@sveltejs/adapter-vercel`.

- Fully prerendered (`src/routes/+layout.ts` sets `prerender = true`). Routes: `/` and `/work/[slug]`, plus a prerendered `/sitemap.xml`.
- Content lives in `src/lib/data/` (`profile.ts`, `experience.ts`, `skills.ts`, `projects.ts`). Components render that data and hold no copy of their own. To add a case study, append to `projects` and add a 1200×900 cover at `static/images/work-<name>.webp`; the page, home card, sitemap entry and prerender entry follow automatically.
- `src/routes/+page.svelte` stacks section components from `src/lib/components/` in page order. Navbar links resolve to `/#about`, `/#experience`, `/#works`, `/#contact` and must match the `id` on each section root. Pages without a photo hero pass `solid` to `Navbar`.
- The "download cv" button renders only when `static/cv.pdf` exists; `src/routes/+page.server.ts` checks at build time.
- No client names, no phone number, and no runtime requests to third-party font or image hosts. Fonts come from `@fontsource`; images are in `static/images/`.
- ESLint enforces `svelte/no-navigation-without-resolve`: internal links use `resolve()` from `$app/paths`; external links go through `ExternalLink.svelte`, which holds the one suppression.

### Svelte syntax

All components use Svelte 5 runes (`$props`, `$state`, `$derived`, `onclick`). Do not introduce legacy syntax (`export let`, `on:` directives).

### Styling

- Tailwind v4 is configured in CSS, not in a `tailwind.config.*` file. `src/routes/layout.css` holds the `@import 'tailwindcss'`, the `@theme` block, and base-layer styles; it is imported once in `+layout.svelte`.
- Theme tokens defined there: colors `cream`, `sand`, `warmgray`, `charcoal`; fonts `--font-serif` (EB Garamond, `font-serif`) and `--font-mincho` (Shippori Mincho, `font-mincho`). Add new design tokens to that `@theme` block.
- Readability floor: labels at least 11px, body 15–16px, readable text at least `charcoal/60`. Scroll fade-in uses the `reveal` action in `src/lib/actions/reveal.ts`, which is a no-op under `prefers-reduced-motion`.
- Prettier uses `prettier-plugin-tailwindcss` with `tailwindStylesheet` pointed at `src/routes/layout.css`, so class order is auto-sorted by `npm run format`. Formatting is tabs, single quotes, no trailing commas, 100 columns.
- Icons come from `lucide-svelte`.
