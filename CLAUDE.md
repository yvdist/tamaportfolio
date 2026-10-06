# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Vite dev server
npm run build     # production build (Vercel adapter)
npm run preview   # serve the production build
npm run check     # svelte-kit sync + svelte-check (type checking)
npm run lint      # prettier --check . && eslint .
npm run format    # prettier --write .
```

There is no test runner configured. `npm run check` and `npm run lint` are the only verification gates.

`.npmrc` sets `engine-strict=true`.

## Architecture

Single-page personal portfolio: SvelteKit 2 + Svelte 5 + TypeScript + Tailwind CSS v4, deployed with `@sveltejs/adapter-vercel`.

- `src/routes/+page.svelte` is the only route. It contains no markup of its own; it stacks section components from `src/lib/components/` in page order (Navbar, Hero, About, Projects, Skills, ExploreMyWork, Work, Divider, Contact, Footer). Adding or reordering a section means editing that file.
- Navigation is in-page anchors. `Navbar.svelte` links to `#about`, `#works`, `#contact`, which must match the `id` on the `<section>` root in `About.svelte`, `Work.svelte`, `Contact.svelte`.
- Section components take no props and hold their content inline (copy, Unsplash image URLs, inline arrays in `{#each}`). `src/lib/data/projects.ts` exports a typed `projects` array but nothing imports it yet; `Projects.svelte` uses its own inline list.
- The contact form in `Contact.svelte` has no backend: `handleSubmit` only shows an `alert` and resets local state.
- No server code (`+page.server.ts`, `+server.ts`, hooks) and no stores exist.

### Svelte syntax

The project runs on Svelte 5, but the components are written in legacy syntax: plain `let` for reactive state, `on:click` / `on:submit` directives, `onMount`. Only `src/routes/+layout.svelte` uses runes (`$props()`, `{@render children()}`). Legacy and runes syntax cannot be mixed within one component, so match whichever the file already uses.

### Styling

- Tailwind v4 is configured in CSS, not in a `tailwind.config.*` file. `src/routes/layout.css` holds the `@import 'tailwindcss'`, the `@theme` block, and base-layer styles; it is imported once in `+layout.svelte`.
- Theme colors defined there: `cream`, `sand`, `warmgray`, `charcoal` (used as `bg-cream`, `text-charcoal/60`, etc.). Add new design tokens to that `@theme` block.
- Base typography is set globally: sans-serif body at 14px, `h1`–`h3` in Times New Roman. Components layer on a consistent look of very small uppercase text with wide tracking (`text-[9px]`–`text-[11px]`, `tracking-[0.3em]`) and arbitrary-value utilities.
- Prettier uses `prettier-plugin-tailwindcss` with `tailwindStylesheet` pointed at `src/routes/layout.css`, so class order is auto-sorted by `npm run format`. Formatting is tabs, single quotes, no trailing commas, 100 columns.
- Icons come from `lucide-svelte`.
