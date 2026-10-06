# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every piece of dummy content in the portfolio with real data from the March 2026 CV, add an Experience section and six case-study pages, and polish typography, imagery and SEO for a Senior Full-Stack job hunt.

**Architecture:** All content moves into typed TypeScript modules under `src/lib/data/`; Svelte components only render. The site becomes fully prerendered: a single home page plus `/work/[slug]` case-study pages generated from `projects.ts`. Fonts and images are served from the repo, not third-party hosts.

**Tech Stack:** SvelteKit 2, Svelte 5 (runes), TypeScript, Tailwind CSS v4, `@sveltejs/adapter-vercel`, `@fontsource`, Vitest, `lucide-svelte`.

**Spec:** `docs/superpowers/specs/2026-10-06-portfolio-refresh-design.md`

## Global Constraints

- Positioning: Senior Full-Stack (Laravel + SvelteKit); AI integration is a supporting strength.
- No client names anywhere. Employer names (IGCY, Alturian Indonesia, Atara SaQT Group, The Prime) are allowed.
- No number or claim that is not in the CV or in a project's public README.
- No screenshots for professional work.
- GitHub handle is `yvdist`. Email is `yudistiraeka.pratama012@gmail.com`. LinkedIn is `in/yudistira-eka-pratama`. Site URL is `https://tamaportfolio.vercel.app`.
- No phone number on the site.
- No request to `images.unsplash.com` or `fonts.googleapis.com` at runtime.
- Readability floor: labels at least 11px, body copy 15–16px, any text meant to be read at least `charcoal/60`.
- Every component touched uses Svelte 5 runes (`$props`, `$state`, `$derived`, `onclick`). No `on:` directives, no `export let`.
- Formatting follows `.prettierrc` (tabs, single quotes, no trailing commas, 100 columns). Run `npm run format` before each commit.
- Work happens on branch `feat/portfolio-refresh`. Stage files by explicit path; never `git add -A` (the working tree holds an unrelated `.gitignore` change).
- Two deliberate departures from the spec wording: `hasCv` is computed at build time in `src/routes/+page.server.ts` rather than stored in `profile.ts`, and `kind` is `'professional' | 'personal'` rather than `'client' | 'personal'` (the HRIS platform is internal, not client work). Photo credit is a single "Photographs via Unsplash" line.

## File Map

| File                                     | Responsibility                                     |
| ---------------------------------------- | -------------------------------------------------- |
| `src/lib/data/profile.ts`                | Identity, about copy, contact links, site URL      |
| `src/lib/data/experience.ts`             | Work history entries                               |
| `src/lib/data/skills.ts`                 | Grouped tech stack                                 |
| `src/lib/data/projects.ts`               | Case studies, `getProject`, secondary "also" links |
| `src/lib/data/projects.test.ts`          | Data integrity tests                               |
| `src/lib/actions/reveal.ts`              | Scroll fade-in action                              |
| `src/lib/components/Seo.svelte`          | Head metadata for any page                         |
| `src/lib/components/Experience.svelte`   | Experience section                                 |
| `src/lib/components/SelectedWork.svelte` | Project cards + "also" list                        |
| `src/routes/+layout.ts`                  | `prerender = true`                                 |
| `src/routes/+page.server.ts`             | Build-time `hasCv`                                 |
| `src/routes/work/[slug]/+page.ts`        | Slug lookup, 404, `entries()`                      |
| `src/routes/work/[slug]/+page.svelte`    | Case-study page                                    |
| `src/routes/sitemap.xml/+server.ts`      | Prerendered sitemap                                |
| `static/images/*.webp`, `static/og.jpg`  | Local imagery                                      |

---

### Task 1: Data layer and test tooling

**Files:**

- Modify: `package.json`, `vite.config.ts`
- Create: `src/lib/data/profile.ts`, `src/lib/data/experience.ts`, `src/lib/data/skills.ts`, `src/lib/data/projects.test.ts`
- Replace: `src/lib/data/projects.ts`

**Interfaces:**

- Produces: `profile` (object), `experience: Experience[]`, `skills: SkillGroup[]`, `projects: Project[]`, `alsoBuilt: AlsoLink[]`, `getProject(slug: string): Project | undefined`, types `Project`, `Experience`, `SkillGroup`, `AlsoLink`.

- [ ] **Step 1: Create the branch and install Vitest**

```bash
git checkout -b feat/portfolio-refresh
npm install -D vitest
```

- [ ] **Step 2: Wire Vitest**

Replace `vite.config.ts` with:

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: { include: ['src/**/*.test.ts'] }
});
```

In `package.json` `scripts`, add after `"lint"`:

```json
"test": "vitest run"
```

- [ ] **Step 3: Write the failing test**

Create `src/lib/data/projects.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { alsoBuilt, getProject, projects } from './projects';

describe('projects data', () => {
	it('lists the six case studies in display order', () => {
		expect(projects.map((p) => p.slug)).toEqual([
			'hris-platform',
			'recruitment-platform',
			'ai-conversation-classification',
			'mall-ai-helper',
			'petakin',
			'kikoeru-lab'
		]);
	});

	it('has unique slugs', () => {
		const slugs = projects.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('finds a project by slug and returns undefined for unknown slugs', () => {
		expect(getProject('petakin')?.title).toBe('Petakin');
		expect(getProject('does-not-exist')).toBeUndefined();
	});

	it('gives every project the content a case-study page needs', () => {
		for (const p of projects) {
			expect(p.summary.length, p.slug).toBeGreaterThan(20);
			expect(p.problem.length, p.slug).toBeGreaterThan(20);
			expect(p.approach.length, p.slug).toBeGreaterThan(0);
			expect(p.outcome.length, p.slug).toBeGreaterThan(0);
			expect(p.stack.length, p.slug).toBeGreaterThan(0);
			expect(p.cover, p.slug).toMatch(/^\/images\/work-[a-z-]+\.webp$/);
		}
	});

	it('links demo and repo only for personal projects', () => {
		for (const p of projects) {
			if (p.kind === 'personal') {
				expect(p.links?.repo, p.slug).toMatch(/^https:\/\/github\.com\/yvdist\//);
			} else {
				expect(p.links, p.slug).toBeUndefined();
			}
		}
	});

	it('keeps secondary links external', () => {
		expect(alsoBuilt.length).toBe(2);
		for (const a of alsoBuilt) expect(a.url).toMatch(/^https:\/\//);
	});
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL. `alsoBuilt` and `getProject` are not exported from `./projects`.

- [ ] **Step 5: Write `src/lib/data/projects.ts`**

```ts
export interface Project {
	slug: string;
	kind: 'professional' | 'personal';
	title: string;
	summary: string;
	period: string;
	role: string;
	stack: string[];
	problem: string;
	approach: string[];
	outcome: string[];
	links?: { demo?: string; repo: string };
	cover: string;
}

export interface AlsoLink {
	title: string;
	note: string;
	url: string;
}

export const projects: Project[] = [
	{
		slug: 'hris-platform',
		kind: 'professional',
		title: 'HRIS Platform',
		summary:
			'An internal HR platform built from the ground up, covering the working life of around 80 employees.',
		period: '2024 – present',
		role: 'Full-stack engineer, UI and backend',
		stack: ['PHP', 'Laravel', 'TypeScript', 'SvelteKit', 'MySQL', 'REST API'],
		problem:
			'The company needed one internal home for day-to-day HR operations: attendance, leave, KPI monitoring, payslips, the org chart and employee profiles.',
		approach: [
			'Built the platform from the ground up, responsible for both the interface and the backend implementation.',
			'Delivered the employee-facing modules: attendance tracking, leave management, KPI monitoring, payslip generation, org chart and profiles.',
			'Developed a separate admin dashboard with role-based access control, employee and payslip management, and operational monitoring.'
		],
		outcome: [
			'Supports around 80 employees.',
			'Attendance, leave, KPIs, payslips, org chart and profiles live in a single platform.'
		],
		cover: '/images/work-hris.webp'
	},
	{
		slug: 'recruitment-platform',
		kind: 'professional',
		title: 'Recruitment Platform',
		summary:
			'A hiring platform for internal and external recruitment, with AI that reads uploaded CVs.',
		period: '2024 – present',
		role: 'Full-stack engineer',
		stack: ['PHP', 'Laravel', 'TypeScript', 'SvelteKit', 'MySQL', 'OpenAI API'],
		problem:
			'CVs arrive as unstructured documents. Candidate biodata, work history and skills had to be pulled out of each one before a recruiter could work with it.',
		approach: [
			'Built the recruitment platform for both internal and external hiring.',
			'Introduced AI-powered CV parsing that extracts candidate biodata, work history and skills from uploaded documents automatically.'
		],
		outcome: ['Shipped and currently live in production.'],
		cover: '/images/work-recruitment.webp'
	},
	{
		slug: 'ai-conversation-classification',
		kind: 'professional',
		title: 'Conversation Classification at Scale',
		summary:
			'A batch pipeline that classified more than 100,000 conversation records and cut AI API costs by over 90%.',
		period: '2025 – present',
		role: 'Senior software engineer',
		stack: ['PHP', 'Laravel', 'OpenAI API', 'DeepSeek API', 'MySQL'],
		problem:
			'More than 100,000 conversation records had to be classified and mapped to the store each one belonged to, and the AI API bill for doing it was too high.',
		approach: [
			'Reworked classification into optimized batches instead of one call per record.',
			'Eliminated redundant API calls.',
			'Mapped each conversation accurately to its store context.'
		],
		outcome: [
			'AI API operational costs reduced by over 90%.',
			'100,000+ conversation records classified.'
		],
		cover: '/images/work-classification.webp'
	},
	{
		slug: 'mall-ai-helper',
		kind: 'professional',
		title: 'AI Helper for a Retail Mall',
		summary:
			"An AI assistant answering real-time questions from shoppers and staff at one of Malaysia's largest retail malls.",
		period: '2025 – present',
		role: 'Senior software engineer',
		stack: ['PHP', 'Laravel', 'OpenAI API', 'RAG', 'Prompt Engineering', 'MySQL'],
		problem:
			'Shoppers and staff at a very large mall ask questions in natural language and expect an accurate answer immediately.',
		approach: [
			'Built the AI Helper to handle real-time NLP-based queries.',
			'Integrated and managed LLM APIs inside a scalable Laravel backend.',
			'Used retrieval over indexed documents as the context source, and tuned for consistent responses, instruction following, prompt-abuse prevention and accurate intent handling.'
		],
		outcome: [
			'In use by shoppers and staff for real-time queries.',
			'Document-grounded answers significantly reduced hallucinations.'
		],
		cover: '/images/work-mall.webp'
	},
	{
		slug: 'petakin',
		kind: 'personal',
		title: 'Petakin',
		summary: 'Turns raster mall floor plans into clean, editable SVG unit maps.',
		period: '2026',
		role: 'Design and engineering',
		stack: ['Python', 'FastAPI', 'OpenCV', 'NumPy', 'Next.js', 'TypeScript', 'Tailwind CSS'],
		problem:
			'Mall floor plans come as screenshots or PDF exports full of unit codes, facility icons and watermarks. Generic tracers follow the text and produce fragmented paths, and a mall has several floors that must all look identical.',
		approach: [
			'Segments the image per colour family: detect the palette, classify each pixel to its nearest colour within a tolerance, then extract connected components as units.',
			'Fills small interior holes to remove text and icon remnants, then simplifies each contour into one polygon per unit.',
			'Emits a grouped, transparent SVG with named paths per category, editable in a live browser editor with merge, delete and recolour.',
			'Stores palette, parameters and badge in presets so every floor of a mall stays style-identical; batch mode exports a ZIP of SVG and PNG per floor.'
		],
		outcome: [
			'Validated on a five-floor mall: 101 units extracted on the busiest floor.',
			'Under 10 seconds per image.',
			'Runs locally with no third-party services.'
		],
		links: { demo: 'https://petakin.vercel.app', repo: 'https://github.com/yvdist/petakin' },
		cover: '/images/work-petakin.webp'
	},
	{
		slug: 'kikoeru-lab',
		kind: 'personal',
		title: 'Kikoeru Lab',
		summary:
			'Mines real user complaints from Hacker News and Reddit and ranks the project ideas hidden in them.',
		period: '2026',
		role: 'Design and engineering',
		stack: ['Next.js', 'TypeScript', 'Supabase Postgres', 'Google Gemini', 'Zod', 'GitHub Actions'],
		problem:
			'Good project ideas start from real complaints, but reading forums by hand does not scale and an LLM asked to rank ideas gives a different answer every time.',
		approach: [
			'Source adapters pull posts from Hacker News and Reddit; a failing source records an error and never crashes the run.',
			'Google Gemini extracts candidate ideas from each batch of posts.',
			'Urgency is scored deterministically in code, not by the model, so rankings are repeatable.',
			'A daily GitHub Actions cron triggers ingestion; every run is recorded, and the database is locked down with row-level security and a server-only key.'
		],
		outcome: [
			'Live dashboard of ranked ideas, refreshed daily.',
			'Unit tests run without network access, using fixtures and injected fakes.'
		],
		links: {
			demo: 'https://kikoeru-lab.vercel.app',
			repo: 'https://github.com/yvdist/kikoeru-lab'
		},
		cover: '/images/work-kikoeru.webp'
	}
];

export const alsoBuilt: AlsoLink[] = [
	{
		title: 'Discover Al-Maarif',
		note: 'Information portal for a mosque and its community programs',
		url: 'https://discover-almaarif.vercel.app/'
	},
	{
		title: 'Omah',
		note: 'Landing page for property presentation',
		url: 'https://omah-house.vercel.app/'
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 6 tests.

- [ ] **Step 7: Write `src/lib/data/profile.ts`**

```ts
export const profile = {
	name: 'Yudistira Eka Pratama',
	role: 'Senior Software Engineer',
	focus: 'Full-stack · Laravel & SvelteKit · AI integration',
	location: 'South Jakarta, Indonesia',
	description:
		'Senior software engineer in South Jakarta with 4+ years building full-stack web applications, AI-integrated systems and enterprise software with Laravel and SvelteKit.',
	about: [
		"I'm Yudistira Eka Pratama, a senior software engineer based in South Jakarta. For more than four years I have designed and delivered full-stack web applications, AI-integrated systems and enterprise software for clients across Indonesia and Malaysia.",
		'Most of my work lives where a business requirement becomes a reliable, production-ready system: PHP and Laravel on the backend, TypeScript and SvelteKit on the frontend, and LLM integration where it earns its place.',
		'When not immersed in code, I find inspiration in music, photography, and the quiet beauty of everyday moments.'
	],
	email: 'yudistiraeka.pratama012@gmail.com',
	github: { handle: 'yvdist', url: 'https://github.com/yvdist' },
	linkedin: {
		handle: 'yudistira-eka-pratama',
		url: 'https://www.linkedin.com/in/yudistira-eka-pratama'
	},
	siteUrl: 'https://tamaportfolio.vercel.app',
	cvPath: '/cv.pdf'
};
```

- [ ] **Step 8: Write `src/lib/data/experience.ts`**

```ts
export interface Experience {
	role: string;
	company: string;
	location: string;
	period: string;
	points: string[];
	stack: string[];
}

export const experience: Experience[] = [
	{
		role: 'Senior Software Engineer',
		company: 'IGCY',
		location: 'South Jakarta',
		period: 'Nov 2025 – Present',
		points: [
			'Lead development of AI-integrated applications on Laravel backends for enterprise clients: chatbots, AI helpers and workflow automation.',
			'Cut AI API operating costs by over 90% by batch-classifying 100,000+ conversation records and removing redundant calls.',
			'Built RAG pipelines that index PDFs, manuals and safety documents as context, significantly reducing hallucinations.'
		],
		stack: ['PHP', 'Laravel', 'OpenAI API', 'RAG', 'TypeScript', 'SvelteKit', 'MySQL']
	},
	{
		role: 'Software Engineer',
		company: 'Alturian Indonesia',
		location: 'South Jakarta',
		period: 'Jan 2024 – Present',
		points: [
			'Built an internal HRIS platform from the ground up for around 80 employees, owning both UI and backend.',
			'Built a recruitment platform with AI-powered CV parsing, shipped and live in production.',
			'Maintain a custom frameworkless ERP, a merchandising application and a loyalty program across 3–4 major enterprise clients.'
		],
		stack: ['PHP', 'Laravel', 'TypeScript', 'SvelteKit', 'Angular', 'Ionic', 'MySQL']
	},
	{
		role: 'Senior Software Engineer',
		company: 'Atara SaQT Group',
		location: 'South Jakarta',
		period: 'Jul 2024 – Nov 2025',
		points: [
			'Backend engineering across enterprise client projects in retail, HR and business operations.',
			'Applied the Repository Pattern, OOP and design patterns to keep production systems scalable and maintainable.'
		],
		stack: ['PHP', 'Laravel', 'Design Patterns', 'REST API', 'MySQL']
	},
	{
		role: 'Back End Developer',
		company: 'The Prime',
		location: 'Cianjur, West Java',
		period: 'Aug 2022 – Dec 2023',
		points: [
			'Delivered e-commerce platforms, a government employee assignment system for the Ministry of Education, PPOB services and a cloud storage application.',
			'Handled up to 5 active client projects in a single month; integrated payment gateway and PPOB services into production.'
		],
		stack: ['PHP', 'Laravel', 'MySQL', 'REST API']
	},
	{
		role: 'Mobile Application Developer',
		company: 'The Prime',
		location: 'Cianjur, West Java',
		period: 'Nov 2022 – Feb 2023',
		points: [
			'Built cross-platform Flutter apps including an Al-Quran reader, an MSME marketplace and a train booking app commissioned by the South Sulawesi Provincial Government.'
		],
		stack: ['Dart', 'Flutter', 'GetX', 'BLoC']
	}
];
```

- [ ] **Step 9: Write `src/lib/data/skills.ts`**

```ts
export interface SkillGroup {
	label: string;
	items: string[];
}

export const skills: SkillGroup[] = [
	{
		label: 'Backend',
		items: ['PHP', 'Laravel', 'Lumen', 'Node.js', 'Express.js', 'REST API', 'MySQL', 'JWT']
	},
	{
		label: 'Frontend',
		items: [
			'TypeScript',
			'JavaScript',
			'SvelteKit',
			'Angular',
			'Ionic',
			'React.js',
			'Next.js',
			'Tailwind CSS'
		]
	},
	{
		label: 'AI & LLM',
		items: ['OpenAI API', 'DeepSeek API', 'RAG', 'LLM Fine-Tuning', 'Prompt Engineering', 'NLP']
	},
	{ label: 'Mobile', items: ['Dart', 'Flutter', 'GetX', 'BLoC'] },
	{ label: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'Algolia', 'SFTP Integration', 'Golang'] }
];
```

- [ ] **Step 10: Verify and commit**

Run: `npm run format && npm test && npm run check`
Expected: tests PASS; `svelte-check` reports 0 errors.

```bash
git add package.json package-lock.json vite.config.ts src/lib/data
git commit -m "feat: add typed content data from CV"
```

---

### Task 2: Fonts, theme tokens, reveal action, local images

**Files:**

- Modify: `package.json`, `src/routes/layout.css`, `src/routes/+layout.svelte`, `src/lib/data/projects.test.ts`
- Create: `src/lib/actions/reveal.ts`, `static/images/*.webp`, `static/og.jpg`
- Replace: `src/lib/assets/favicon.svg`

**Interfaces:**

- Consumes: `projects` from `src/lib/data/projects.ts`.
- Produces: `reveal(node: HTMLElement, delay?: number)` Svelte action; Tailwind utilities `font-serif` (EB Garamond) and `font-mincho` (Shippori Mincho); image files `/images/hero.webp` (2000×1333), `/images/interlude.webp` (2000×1125), `/images/divider.webp` (1680×720), `/images/work-{hris,recruitment,classification,mall,petakin,kikoeru}.webp` (1200×900), `/og.jpg` (1200×630).

- [ ] **Step 1: Add a failing test that every cover exists on disk**

Append inside the `describe` block of `src/lib/data/projects.test.ts`, and add the import at the top:

```ts
import { existsSync } from 'node:fs';
```

```ts
it('has a cover image file for every project', () => {
	for (const p of projects) {
		expect(existsSync(`static${p.cover}`), p.cover).toBe(true);
	}
});
```

Run: `npm test`
Expected: FAIL on `/images/work-hris.webp`.

- [ ] **Step 2: Download the images**

```bash
mkdir -p static/images
dl() { curl -fsSL "https://images.unsplash.com/photo-$1?w=$2&h=$3&fit=crop&q=78&fm=$4" -o "$5"; }
dl 1506905925346-21bda4d32df4 2000 1333 webp static/images/hero.webp
dl 1519681393784-d120267933ba 2000 1125 webp static/images/interlude.webp
dl 1464822759023-fed622ff2c3b 1680 720  webp static/images/divider.webp
dl 1441974231531-c6227db76b6e 1200 900  webp static/images/work-hris.webp
dl 1470071459604-3b5ec3a7fe05 1200 900  webp static/images/work-recruitment.webp
dl 1501594907352-04cda38ebc29 1200 900  webp static/images/work-classification.webp
dl 1475924156734-496f6cac6ec1 1200 900  webp static/images/work-mall.webp
dl 1447752875215-b2761acb3c5d 1200 900  webp static/images/work-petakin.webp
dl 1472214103451-9374bd1c798e 1200 900  webp static/images/work-kikoeru.webp
dl 1506905925346-21bda4d32df4 1200 630  jpg  static/og.jpg
ls -l static/images static/og.jpg
```

Expected: ten files, each larger than 20 KB. `curl -f` exits non-zero on an HTTP error.

- [ ] **Step 3: Curate for one tone**

Open each file in `static/images/` and look at it. The set should read as one quiet, muted, natural series. If any image fails to download or clashes (saturated colour, people, text, hard contrast), pick another nature photograph on unsplash.com, take the `photo-…` id from its image URL, and re-run the matching `dl` line with the same width, height and output path. File names and dimensions must not change.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 7 tests.

- [ ] **Step 5: Install self-hosted fonts**

```bash
npm install @fontsource/eb-garamond @fontsource/shippori-mincho
```

- [ ] **Step 6: Replace `src/routes/layout.css`**

```css
@import 'tailwindcss';

@theme {
	--color-cream: #faf9f7;
	--color-sand: #e8e6e3;
	--color-warmgray: #a39e99;
	--color-charcoal: #3d3935;

	--font-serif: 'EB Garamond', 'Shippori Mincho', 'Times New Roman', serif;
	--font-mincho: 'Shippori Mincho', 'EB Garamond', serif;
}

@layer base {
	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	html {
		scroll-behavior: smooth;
	}

	body {
		@apply bg-cream text-charcoal;
		font-family: 'Helvetica Neue', Arial, sans-serif;
		font-size: 15px;
		line-height: 1.8;
		letter-spacing: 0.02em;
	}

	h1,
	h2,
	h3 {
		font-family: var(--font-serif);
		font-weight: 400;
	}

	:focus-visible {
		outline: 1px solid var(--color-charcoal);
		outline-offset: 4px;
	}
}

.reveal {
	opacity: 0;
	transform: translateY(12px);
	transition:
		opacity 1.2s ease,
		transform 1.2s ease;
}

.reveal.is-visible {
	opacity: 1;
	transform: none;
}

@media (prefers-reduced-motion: reduce) {
	html {
		scroll-behavior: auto;
	}
}
```

- [ ] **Step 7: Replace `src/routes/+layout.svelte`**

```svelte
<script lang="ts">
	import '@fontsource/eb-garamond/400.css';
	import '@fontsource/eb-garamond/400-italic.css';
	import '@fontsource/eb-garamond/500.css';
	import '@fontsource/shippori-mincho/400.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
```

- [ ] **Step 8: Replace `src/lib/assets/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
	<rect width="64" height="64" rx="14" fill="#faf9f7" />
	<circle cx="32" cy="32" r="13" fill="none" stroke="#3d3935" stroke-width="3" />
	<circle cx="32" cy="32" r="3.5" fill="#3d3935" />
</svg>
```

- [ ] **Step 9: Write `src/lib/actions/reveal.ts`**

The class is added by JavaScript, so content stays visible without JS and for users who prefer reduced motion.

```ts
export function reveal(node: HTMLElement, delay = 0) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.classList.add('reveal');
	node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			observer.disconnect();
		},
		{ threshold: 0.15 }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
}
```

- [ ] **Step 10: Verify and commit**

Run: `npm run format && npm test && npm run check && npm run build`
Expected: all pass; build completes.

```bash
git add package.json package-lock.json src/routes/layout.css src/routes/+layout.svelte src/lib/assets/favicon.svg src/lib/actions src/lib/data/projects.test.ts static/images static/og.jpg
git commit -m "feat: self-host fonts and images, add reveal action"
```

---

### Task 3: Home page sections

**Files:**

- Create: `src/lib/components/Seo.svelte`, `src/lib/components/Experience.svelte`, `src/lib/components/SelectedWork.svelte`, `src/routes/+layout.ts`, `src/routes/+page.server.ts`
- Replace: `src/routes/+page.svelte`, and in `src/lib/components/`: `Navbar.svelte`, `Hero.svelte`, `About.svelte`, `Skills.svelte`, `ExploreMyWork.svelte`, `Divider.svelte`, `Contact.svelte`, `Footer.svelte`
- Delete: `src/lib/components/Projects.svelte`, `src/lib/components/Work.svelte`

**Interfaces:**

- Consumes: `profile`, `experience`, `skills`, `projects`, `alsoBuilt` (Task 1); `reveal`, `font-mincho`, image paths (Task 2).
- Produces: `<Seo title description path? image? />`; `<Navbar solid? />` (`solid: boolean`, default `false`); `<Contact hasCv />` (`hasCv: boolean`); section ids `about`, `experience`, `works`, `contact`.

- [ ] **Step 1: Prerender everything**

Create `src/routes/+layout.ts`:

```ts
export const prerender = true;
```

Create `src/routes/+page.server.ts` (runs at build time because the page is prerendered):

```ts
import { existsSync } from 'node:fs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ hasCv: existsSync('static/cv.pdf') });
```

- [ ] **Step 2: Write `src/lib/components/Seo.svelte`**

```svelte
<script lang="ts">
	import { profile } from '$lib/data/profile';

	let {
		title,
		description,
		path = '/',
		image = '/og.jpg'
	}: { title: string; description: string; path?: string; image?: string } = $props();

	const url = $derived(profile.siteUrl + path);
	const imageUrl = $derived(profile.siteUrl + image);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={profile.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
```

- [ ] **Step 3: Replace `src/lib/components/Navbar.svelte`**

Links are root-relative (`/#about`) so they work from case-study pages. `solid` is for pages without a photo hero.

```svelte
<script lang="ts">
	import { profile } from '$lib/data/profile';

	let { solid = false }: { solid?: boolean } = $props();

	let menuOpen = $state(false);
	let scrollY = $state(0);

	const filled = $derived(solid || scrollY > 100);

	const links = [
		{ href: '/#about', label: 'about' },
		{ href: '/#experience', label: 'experience' },
		{ href: '/#works', label: 'works' },
		{ href: '/#contact', label: 'contact' }
	];
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed top-0 z-50 w-full transition-all duration-500 {filled
		? 'bg-cream/95 backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-16">
		<a
			href="/"
			class="text-[12px] tracking-[0.3em] transition-opacity hover:opacity-70 {filled
				? 'text-charcoal'
				: 'text-white'}"
		>
			{profile.name.toLowerCase()}
		</a>

		<div class="hidden gap-10 text-[11px] tracking-[0.3em] uppercase md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="transition-opacity hover:opacity-100 {filled
						? 'text-charcoal/70'
						: 'text-white/85'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<button
			type="button"
			aria-expanded={menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (menuOpen = !menuOpen)}
			class="text-[11px] tracking-[0.3em] uppercase md:hidden {filled
				? 'text-charcoal'
				: 'text-white'}"
		>
			{menuOpen ? 'close' : 'menu'}
		</button>
	</div>

	{#if menuOpen}
		<div id="mobile-menu" class="border-t border-warmgray/10 bg-cream px-8 py-10 md:hidden">
			<div class="flex flex-col gap-6 text-center text-[12px] tracking-[0.3em] uppercase">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (menuOpen = false)}
						class="text-charcoal/70 hover:text-charcoal"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
```

- [ ] **Step 4: Replace `src/lib/components/Hero.svelte`**

```svelte
<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<section class="relative h-svh w-full overflow-hidden">
	<img
		src="/images/hero.webp"
		alt=""
		width="2000"
		height="1333"
		fetchpriority="high"
		class="h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-linear-to-b from-black/45 via-black/25 to-black/55"></div>

	<div
		class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white"
	>
		<p lang="ja" class="font-mincho mb-8 text-[13px] tracking-[0.5em] opacity-80">
			ソフトウェアエンジニア
		</p>
		<h1 class="mb-6 font-serif text-[40px] leading-[1.15] md:text-[68px]">{profile.name}</h1>
		<p class="mb-3 text-[13px] tracking-[0.25em] uppercase md:text-[14px]">{profile.role}</p>
		<p class="mb-12 text-[12px] tracking-[0.18em] opacity-85 md:text-[13px]">{profile.focus}</p>
		<a
			href="#works"
			class="border border-white/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase backdrop-blur-sm transition-all hover:bg-white/10"
		>
			selected work
		</a>
	</div>
</section>
```

- [ ] **Step 5: Replace `src/lib/components/About.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/profile';
</script>

<section id="about" class="px-8 py-32 md:py-40">
	<div use:reveal class="mx-auto max-w-[720px] text-center">
		<h2 class="mb-12 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">about</h2>
		<div class="space-y-8">
			{#each profile.about as paragraph, i (i)}
				<p
					class={i === 0
						? 'font-serif text-[20px] leading-[1.8] text-charcoal/90 md:text-[22px]'
						: 'text-[15px] leading-[2.1] text-charcoal/70'}
				>
					{paragraph}
				</p>
			{/each}
		</div>
		<p class="mt-12 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			{profile.location}
		</p>
	</div>
</section>
```

- [ ] **Step 6: Write `src/lib/components/Experience.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience } from '$lib/data/experience';
</script>

<section id="experience" class="px-8 py-32 md:py-40">
	<div class="mx-auto max-w-[960px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			experience
		</h2>

		<ol class="divide-y divide-warmgray/20">
			{#each experience as job (job.company + job.role)}
				<li use:reveal class="grid gap-4 py-12 md:grid-cols-[200px_1fr] md:gap-12">
					<p class="pt-2 text-[11px] tracking-[0.2em] text-charcoal/60 uppercase">
						{job.period}
					</p>
					<div>
						<h3 class="font-serif text-[24px] leading-[1.3] text-charcoal/90">{job.role}</h3>
						<p class="mt-1 text-[12px] tracking-[0.15em] text-charcoal/60">
							{job.company} · {job.location}
						</p>
						<ul class="mt-6 space-y-3 text-[15px] leading-[1.9] text-charcoal/75">
							{#each job.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						<p class="mt-6 text-[11px] tracking-[0.15em] text-charcoal/60">
							{job.stack.join(' · ')}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
```

- [ ] **Step 7: Write `src/lib/components/SelectedWork.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { alsoBuilt, projects } from '$lib/data/projects';
</script>

<section id="works" class="px-6 py-32 md:px-8 md:py-40">
	<div class="mx-auto max-w-[1200px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			selected work
		</h2>

		<div class="grid gap-x-12 gap-y-20 md:grid-cols-2">
			{#each projects as project, i (project.slug)}
				<a use:reveal={(i % 2) * 150} href="/work/{project.slug}" class="group block">
					<div class="mb-6 aspect-4/3 overflow-hidden rounded-sm bg-sand/50">
						<img
							src={project.cover}
							alt=""
							width="1200"
							height="900"
							loading="lazy"
							class="h-full w-full object-cover opacity-90 saturate-[0.85] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
						/>
					</div>
					<p class="mb-3 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
						{project.kind === 'personal' ? 'personal project' : 'professional work'} · {project.period}
					</p>
					<h3 class="mb-3 font-serif text-[26px] leading-[1.3] text-charcoal/90">
						{project.title}
					</h3>
					<p class="text-[15px] leading-[1.9] text-charcoal/70">{project.summary}</p>
					<p
						class="mt-5 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase transition-colors group-hover:text-charcoal"
					>
						read case study
					</p>
				</a>
			{/each}
		</div>

		<div use:reveal class="mt-28 border-t border-warmgray/20 pt-12 text-center">
			<p class="mb-8 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">also built</p>
			<ul class="space-y-4">
				{#each alsoBuilt as item (item.url)}
					<li class="text-[15px]">
						<a
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							class="font-serif text-[18px] text-charcoal/90 underline-offset-4 hover:underline"
						>
							{item.title}
						</a>
						<span class="text-charcoal/60"> · {item.note}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
```

- [ ] **Step 8: Replace `src/lib/components/Skills.svelte`**

```svelte
<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skills } from '$lib/data/skills';
</script>

<section class="px-8 py-32">
	<div class="mx-auto max-w-[960px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			stack
		</h2>

		<dl class="divide-y divide-warmgray/20">
			{#each skills as group (group.label)}
				<div use:reveal class="grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-12">
					<dt class="text-[11px] tracking-[0.3em] text-charcoal/60 uppercase md:pt-1">
						{group.label}
					</dt>
					<dd class="text-[15px] leading-[1.9] text-charcoal/80">{group.items.join(' · ')}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
```

- [ ] **Step 9: Replace `src/lib/components/ExploreMyWork.svelte` and `Divider.svelte`**

`ExploreMyWork.svelte` becomes a wordless photographic pause between Experience and Selected Work:

```svelte
<section class="relative h-[60vh] w-full overflow-hidden md:h-[75vh]" aria-hidden="true">
	<img
		src="/images/interlude.webp"
		alt=""
		width="2000"
		height="1125"
		loading="lazy"
		class="h-full w-full object-cover opacity-85 saturate-[0.85]"
	/>
</section>
```

`Divider.svelte`:

```svelte
<section class="px-8 py-20" aria-hidden="true">
	<div class="mx-auto max-w-[1400px]">
		<div class="aspect-21/9 overflow-hidden bg-sand/50">
			<img
				src="/images/divider.webp"
				alt=""
				width="1680"
				height="720"
				loading="lazy"
				class="h-full w-full object-cover opacity-80 saturate-[0.85]"
			/>
		</div>
	</div>
</section>
```

- [ ] **Step 10: Replace `src/lib/components/Contact.svelte`**

```svelte
<script lang="ts">
	import { Github, Linkedin } from 'lucide-svelte';
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/profile';

	let { hasCv }: { hasCv: boolean } = $props();
</script>

<section id="contact" class="px-8 py-32 md:py-44">
	<div use:reveal class="mx-auto max-w-[800px] text-center">
		<h2 class="mb-10 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">contact</h2>
		<p class="mb-6 font-serif text-[28px] leading-[1.4] text-charcoal/90 md:text-[36px]">
			Let's build something together
		</p>
		<p class="mb-14 text-[15px] leading-[2] text-charcoal/70">
			Open to senior full-stack roles, on-site in Jakarta or remote.
		</p>

		<a
			href="mailto:{profile.email}"
			class="font-serif text-[20px] break-all text-charcoal/90 underline-offset-8 hover:underline md:text-[26px]"
		>
			{profile.email}
		</a>

		<div
			class="mt-14 flex flex-col items-center justify-center gap-6 text-[12px] tracking-[0.2em] md:flex-row md:gap-12"
		>
			<a
				href={profile.linkedin.url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-3 text-charcoal/70 transition-colors hover:text-charcoal"
			>
				<Linkedin size={16} aria-hidden="true" />
				<span>linkedin.com/in/{profile.linkedin.handle}</span>
			</a>
			<a
				href={profile.github.url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-3 text-charcoal/70 transition-colors hover:text-charcoal"
			>
				<Github size={16} aria-hidden="true" />
				<span>github.com/{profile.github.handle}</span>
			</a>
		</div>

		{#if hasCv}
			<a
				href={profile.cvPath}
				download
				class="mt-16 inline-block border border-charcoal/30 px-10 py-4 text-[11px] tracking-[0.3em] text-charcoal/80 uppercase transition-colors hover:bg-charcoal hover:text-cream"
			>
				download cv
			</a>
		{/if}
	</div>
</section>
```

- [ ] **Step 11: Replace `src/lib/components/Footer.svelte`**

```svelte
<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<footer class="border-t border-warmgray/20 px-8 py-14">
	<div
		class="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[11px] tracking-[0.25em] text-charcoal/60 uppercase md:flex-row"
	>
		<p>© {new Date().getFullYear()} {profile.name}</p>
		<p>
			Photographs via
			<a
				href="https://unsplash.com"
				target="_blank"
				rel="noopener noreferrer"
				class="underline-offset-4 hover:underline">Unsplash</a
			>
		</p>
	</div>
</footer>
```

- [ ] **Step 12: Replace `src/routes/+page.svelte` and delete the merged components**

```svelte
<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import ExploreMyWork from '$lib/components/ExploreMyWork.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SelectedWork from '$lib/components/SelectedWork.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import { profile } from '$lib/data/profile';

	let { data } = $props();
</script>

<Seo title="{profile.name} · {profile.role}" description={profile.description} />

<Navbar />
<main>
	<Hero />
	<About />
	<Experience />
	<ExploreMyWork />
	<SelectedWork />
	<Skills />
	<Divider />
	<Contact hasCv={data.hasCv} />
</main>
<Footer />
```

```bash
git rm src/lib/components/Projects.svelte src/lib/components/Work.svelte
```

- [ ] **Step 13: Verify**

Run: `npm run format && npm run check && npm run lint && npm test`
Expected: 0 errors, lint clean, 7 tests pass.

Run: `npm run dev`, open the printed URL, and confirm at 390px and 1440px widths: hero shows the name and role, all four navbar links scroll to their sections, Experience lists five roles, Selected Work shows six cards, Contact shows the real email and no form, no CV button appears.

Run:

```bash
grep -rnE "example\.com|github\.com/yudistira|images\.unsplash\.com|fonts\.googleapis|on:(click|submit)" src
```

Expected: no output.

- [ ] **Step 14: Commit**

```bash
git add src/routes/+layout.ts src/routes/+page.server.ts src/routes/+page.svelte src/lib/components
git commit -m "feat: rebuild home page from real profile data"
```

---

### Task 4: Case-study pages

**Files:**

- Create: `src/routes/work/[slug]/+page.ts`, `src/routes/work/[slug]/+page.svelte`

**Interfaces:**

- Consumes: `projects`, `getProject`, `Project` (Task 1); `Navbar solid`, `Seo`, `Footer` (Task 3).
- Produces: routes `/work/<slug>` for each of the six slugs; page data `{ project: Project; next: Project }`.

- [ ] **Step 1: Write `src/routes/work/[slug]/+page.ts`**

```ts
import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Case study not found');

	const next = projects[(projects.indexOf(project) + 1) % projects.length];
	return { project, next };
};
```

- [ ] **Step 2: Write `src/routes/work/[slug]/+page.svelte`**

```svelte
<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { profile } from '$lib/data/profile';

	let { data } = $props();

	const project = $derived(data.project);
	const next = $derived(data.next);
</script>

<Seo
	title="{project.title} · {profile.name}"
	description={project.summary}
	path="/work/{project.slug}"
/>

<Navbar solid />

<main class="px-8 pt-40 pb-32 md:pt-48">
	<article class="mx-auto max-w-[760px]">
		<p class="mb-8 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			<a href="/#works" class="underline-offset-4 hover:text-charcoal hover:underline">works</a>
			· {project.kind === 'personal' ? 'personal project' : 'professional work'}
		</p>

		<h1 class="mb-8 font-serif text-[40px] leading-[1.2] text-charcoal/90 md:text-[56px]">
			{project.title}
		</h1>
		<p class="font-serif text-[20px] leading-[1.7] text-charcoal/80 md:text-[22px]">
			{project.summary}
		</p>

		<dl
			class="mt-14 grid gap-8 border-y border-warmgray/20 py-10 text-[15px] text-charcoal/80 md:grid-cols-3"
		>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">period</dt>
				<dd>{project.period}</dd>
			</div>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">role</dt>
				<dd>{project.role}</dd>
			</div>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">stack</dt>
				<dd>{project.stack.join(' · ')}</dd>
			</div>
		</dl>

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
				the problem
			</h2>
			<p class="text-[16px] leading-[2] text-charcoal/80">{project.problem}</p>
		</section>

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
				the approach
			</h2>
			<ul class="space-y-5 text-[16px] leading-[2] text-charcoal/80">
				{#each project.approach as step (step)}
					<li>{step}</li>
				{/each}
			</ul>
		</section>

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
				the outcome
			</h2>
			<ul class="space-y-4 font-serif text-[20px] leading-[1.6] text-charcoal/90">
				{#each project.outcome as result (result)}
					<li>{result}</li>
				{/each}
			</ul>
		</section>

		{#if project.links}
			<div class="mt-16 flex flex-wrap gap-4 text-[11px] tracking-[0.3em] uppercase">
				{#if project.links.demo}
					<a
						href={project.links.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-charcoal/90 px-8 py-4 text-cream transition-colors hover:bg-charcoal"
					>
						live demo
					</a>
				{/if}
				<a
					href={project.links.repo}
					target="_blank"
					rel="noopener noreferrer"
					class="border border-charcoal/30 px-8 py-4 text-charcoal/80 transition-colors hover:bg-charcoal hover:text-cream"
				>
					source code
				</a>
			</div>
		{:else}
			<p class="mt-16 text-[13px] leading-[1.9] text-charcoal/60">
				Professional work. Client details and screens are withheld; happy to walk through it in
				conversation.
			</p>
		{/if}
	</article>

	<nav class="mx-auto mt-28 max-w-[760px] border-t border-warmgray/20 pt-12 text-center">
		<p class="mb-4 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">next</p>
		<a
			href="/work/{next.slug}"
			class="font-serif text-[28px] text-charcoal/90 underline-offset-8 hover:underline"
		>
			{next.title}
		</a>
	</nav>
</main>

<Footer />
```

- [ ] **Step 3: Verify the build prerenders all six pages**

Run: `npm run format && npm run check && npm run lint && npm run build`
Expected: all pass.

Run:

```bash
ls .svelte-kit/output/prerendered/pages/work
```

Expected: six entries, one per slug (`hris-platform.html`, `recruitment-platform.html`, `ai-conversation-classification.html`, `mall-ai-helper.html`, `petakin.html`, `kikoeru-lab.html`).

- [ ] **Step 4: Verify in the browser**

Run: `npm run preview`. Check `/work/petakin` (demo and source buttons present), `/work/hris-platform` (no buttons, the "withheld" note present), the navbar is solid and its links return to home sections, "next" cycles from `kikoeru-lab` back to `hris-platform`, and `/work/nope` returns 404.

- [ ] **Step 5: Commit**

```bash
git add src/routes/work
git commit -m "feat: add case study pages"
```

---

### Task 5: Sitemap, docs, final verification

**Files:**

- Create: `src/routes/sitemap.xml/+server.ts`
- Modify: `static/robots.txt`, `CLAUDE.md`

**Interfaces:**

- Consumes: `profile.siteUrl`, `projects`.
- Produces: `/sitemap.xml`.

- [ ] **Step 1: Write `src/routes/sitemap.xml/+server.ts`**

```ts
import { profile } from '$lib/data/profile';
import { projects } from '$lib/data/projects';

export const prerender = true;

export function GET() {
	const paths = ['/', ...projects.map((p) => `/work/${p.slug}`)];
	const urls = paths.map((path) => `\t<url><loc>${profile.siteUrl}${path}</loc></url>`).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
```

- [ ] **Step 2: Point robots.txt at the sitemap**

Append to `static/robots.txt`:

```
Sitemap: https://tamaportfolio.vercel.app/sitemap.xml
```

- [ ] **Step 3: Update `CLAUDE.md`**

Make these changes:

- Commands block: add `npm test          # vitest run (data integrity tests in src/**/*.test.ts)` and replace the "no test runner" sentence with: `Run a single test file with npx vitest run src/lib/data/projects.test.ts.`
- Architecture: replace the bullet list with:

```markdown
- Fully prerendered (`src/routes/+layout.ts` sets `prerender = true`). Routes: `/` and `/work/[slug]`, plus a prerendered `/sitemap.xml`.
- Content lives in `src/lib/data/` (`profile.ts`, `experience.ts`, `skills.ts`, `projects.ts`). Components render that data and hold no copy of their own. To add a case study, append to `projects` and add a 1200×900 cover at `static/images/work-<name>.webp`; the page, home card, sitemap entry and prerender entry follow automatically.
- `src/routes/+page.svelte` stacks section components from `src/lib/components/` in page order. Navbar links are root-relative (`/#about`, `/#experience`, `/#works`, `/#contact`) and must match the `id` on each section root. Pages without a photo hero pass `solid` to `Navbar`.
- The "download cv" button renders only when `static/cv.pdf` exists; `src/routes/+page.server.ts` checks at build time.
- No client names, no phone number, and no runtime requests to third-party font or image hosts. Fonts come from `@fontsource`; images are in `static/images/`.
```

- Svelte syntax section: replace its body with: `All components use Svelte 5 runes ($props, $state, $derived, onclick). Do not introduce legacy syntax (export let, on: directives).`
- Styling section: change the theme bullet to also list `--font-serif` (EB Garamond) and `--font-mincho` (Shippori Mincho), replace the micro-text bullet with: `Readability floor: labels at least 11px, body 15–16px, readable text at least charcoal/60. Scroll fade-in uses the reveal action in src/lib/actions/reveal.ts.`

- [ ] **Step 4: Full verification**

Run: `npm run format && npm run check && npm run lint && npm test && npm run build`
Expected: 0 type errors, lint clean, 7 tests pass, build succeeds.

Run:

```bash
ls .svelte-kit/output/prerendered/pages .svelte-kit/output/prerendered/pages/work
find .svelte-kit/output/prerendered -name sitemap.xml
grep -rnE "example\.com|github\.com/yudistira|tamathecxder|images\.unsplash\.com|fonts\.googleapis|Lorem|woodland|Horizon Dashboard" src static/robots.txt
```

Expected: `index.html` and six work pages listed; `find` prints one `sitemap.xml` path (endpoints are written under `prerendered/dependencies`); grep prints nothing.

Run `npm run preview` and, in the browser at 390px and 1440px: scroll the home page top to bottom, open every case study from its card, confirm the Network panel shows no request to `images.unsplash.com` or `fonts.googleapis.com`, and confirm no CV button is shown.

- [ ] **Step 5: Commit**

```bash
git add src/routes/sitemap.xml static/robots.txt CLAUDE.md
git commit -m "feat: add sitemap and update project docs"
```

---

## Content to confirm with Yudistira before merge

These are drafted from the CV and READMEs; none can be verified from the sources alone.

1. Stack per professional project (the CV lists stacks per employer, not per project). HRIS and Recruitment are listed with Laravel + SvelteKit.
2. `period` values for professional work use the employer's date range.
3. `mall-ai-helper` attributes RAG and tuning to the mall project; the CV lists them as IGCY work in general.
4. Contact line "Open to senior full-stack roles, on-site in Jakarta or remote."
5. `static/cv.pdf`: public version without the phone number and with `github.com/yvdist`.
