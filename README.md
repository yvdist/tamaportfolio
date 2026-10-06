# tama-portfolio

Personal portfolio of Yudistira Eka Pratama, senior software engineer in South Jakarta.

Live at [tamaportfolio.vercel.app](https://tamaportfolio.vercel.app).

## Stack

SvelteKit 2, Svelte 5, TypeScript and Tailwind CSS v4. Every route is prerendered and deployed to Vercel. Fonts and images are served from the repository, so the site makes no third-party requests.

## Develop

```sh
npm install
npm run dev
```

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the dev server                  |
| `npm run build`   | Build and prerender the site          |
| `npm run preview` | Serve the production build            |
| `npm run check`   | Type-check with `svelte-check`        |
| `npm run lint`    | Check formatting and run ESLint       |
| `npm run format`  | Format with Prettier                  |
| `npm test`        | Run the data integrity tests (Vitest) |

## Editing content

All copy lives in `src/lib/data/`. Components only render it.

| File            | Holds                                   |
| --------------- | --------------------------------------- |
| `profile.ts`    | Name, role, about text, contact links   |
| `experience.ts` | Work history                            |
| `skills.ts`     | Tech stack, grouped                     |
| `projects.ts`   | Case studies and the "also built" links |

### Add a case study

1. Append an entry to `projects` in `src/lib/data/projects.ts`.
2. Add a 1200×900 cover at `static/images/work-<name>.webp`.
3. For a personal project, optionally add 1440×900 screenshots under `static/images/` and list them in `shots`.

The home card, the `/work/<slug>` page and the sitemap entry are generated from that entry. `npm test` fails if a referenced image is missing.

### CV download

Place a PDF at `static/cv.pdf`. The "download cv" button appears on the next build; without the file it stays hidden.

## Photographs

Atmospheric photographs are from [Unsplash](https://unsplash.com).
