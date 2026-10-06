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
| `npm run cv`      | Build the CV PDFs from `cv/cv.html`   |

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

### CV

The CV is written once in `cv/cv.html` and printed to PDF with the locally installed Chrome:

```sh
npm run cv
```

This writes the public copy to `static/cv.pdf`, which makes the "download cv" button appear on the next build. Contact details wrapped in `<span data-private>` are left out of the public copy. If `.hiddendocs/cv-private.json` exists (`{ "phone": "..." }`, git-ignored), a second copy with the phone number is written to `.hiddendocs/cv/` for job applications.

## Photographs

Atmospheric photographs are from [Unsplash](https://unsplash.com).
