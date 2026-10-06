# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Before changing content, read `.hiddendocs/PROJECT_LOG.md` if it exists. It is a log of content decisions, their reasons and open items, and should be updated whenever something ships.

`.hiddendocs/` is ignored by this repository and is its own git repository with a private remote. After updating the log or anything else in that folder, commit it there (`git -C .hiddendocs add -A && git -C .hiddendocs commit -m "..."`) and ask the owner to push. On a fresh clone the folder is absent; the owner restores it by cloning the private repository into `.hiddendocs`.

## Ground rules

- Commits and pull requests are authored by the repository owner only. Do not add co-author trailers or tool attributions to commit messages or PR descriptions.
- Never name a client, and never add screenshots of client work. Screenshots are for personal projects only.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # production build (Vercel adapter), prerenders every route
npm run preview   # serve the production build
npm run check     # svelte-kit sync + svelte-check (type checking)
npm run lint      # prettier --check . && eslint .
npm run format    # prettier --write .
npm test          # vitest run (data integrity tests in src/**/*.test.ts)
npm run cv        # build static/cv.pdf (public) and the private application copy from cv/cv.html
```

Run a single test file with `npx vitest run src/lib/data/projects.test.ts`.

`.npmrc` sets `engine-strict=true`.

## Architecture

Personal portfolio: SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v4, deployed with `@sveltejs/adapter-vercel`.

- Fully prerendered (`src/routes/+layout.ts` sets `prerender = true`). Routes: `/` and `/work/[slug]`, plus a prerendered `/sitemap.xml`.
- Content lives in `src/lib/data/` (`profile.ts`, `experience.ts`, `skills.ts`, `projects.ts`). Components render that data and hold no copy of their own. To add a case study, append to `projects` and add a 1200×900 cover at `static/images/work-<name>.webp` (personal projects may also list 1440×900 screenshots in `shots`; professional work never has screenshots); the page, home card, sitemap entry and prerender entry follow automatically.
- `src/routes/+page.svelte` stacks section components from `src/lib/components/` in page order. Navbar links resolve to `/#about`, `/#experience`, `/#works`, `/#contact` and must match the `id` on each section root. Pages without a photo hero pass `solid` to `Navbar`.
- The "download cv" button renders only when `static/cv.pdf` exists; `src/routes/+page.server.ts` checks at build time.
- The CV has one source, `cv/cv.html`, printed to PDF by `scripts/build-cv.mjs` using the locally installed Chrome. Anything inside `<span data-private>` is stripped from the public PDF; the phone number comes from the git-ignored `.hiddendocs/cv-private.json` and must never be committed. Keep `cv/cv.html` and `src/lib/data/` telling the same story (titles, dates, claims).
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
