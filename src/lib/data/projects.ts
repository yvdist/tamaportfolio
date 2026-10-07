import { photo } from './photos';

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
	shots?: { src: string; alt: string }[];
	cover: string;
}

export interface AlsoLink {
	title: string;
	note: string;
	url: string;
}

export const projects: Project[] = [
	{
		slug: 'interactive-mall-directory',
		kind: 'professional',
		title: 'Interactive Mall Directory',
		summary:
			'A touchscreen wayfinding system for shopping malls: search for a store and watch the route drawn across floors, in 2D or 3D.',
		period: '2026',
		role: 'Lead engineer, backend and frontend',
		stack: ['PHP', 'Laravel', 'Alpine.js', 'Leaflet', 'three.js', 'React', 'TypeScript', 'MySQL'],
		problem:
			'Visitors to a large multi-floor mall need to find a store and get there, from a kiosk or from their own phone. The mall team, in turn, needs to keep floors, tenants and routes current without calling an engineer.',
		approach: [
			'Routes are computed on the server with Dijkstra over a graph of waypoints and corridors. A multi-floor route travels through lifts, escalators and stairs weighted by travel time, never passes through the same floor twice, and skips any corridor segment that would cut through a unit.',
			'The default view is a 2D map built on Leaflet, with search on an on-screen keyboard, category browsing and one-tap routes to the nearest facility. The route is drawn and animated floor by floor.',
			'A 3D view built with three.js is extruded from the same floor plans and loaded only when opened, with a walking character following the route. Geometry is merged and labels come from a single texture atlas, so it holds up on kiosk hardware.',
			'The admin panel lets the mall team do the rest themselves: a visual waypoint and corridor editor, an inter-floor connection manager, a 3D geometry editor, a floor-plan designer, tenant, advertisement and kiosk management, and an application health dashboard.',
			"Each kiosk knows where it stands, so every route starts from its own position. A signed QR code hands the route over to the visitor's phone, and the interface runs in English, Malay and Chinese."
		],
		outcome: [
			'Live in production across several malls of a major retail group in Malaysia, served from one installation.',
			'Wayfinding in 2D and 3D across seven floors, from kiosks and phones.',
			'Routing, geometry and the editors are covered by PHPUnit and Vitest suites.'
		],
		cover: photo('work-directory.webp')
	},
	{
		slug: 'multi-tenant-ai-platform',
		kind: 'professional',
		title: 'Multi-Tenant AI Platform',
		summary:
			'A platform that gives service and retail businesses their own AI assistant, connected to their branches, catalogue and bookings.',
		period: '2026',
		role: 'Sole engineer',
		stack: ['PHP', 'Laravel', 'Python', 'FastAPI', 'Qdrant', 'Redis', 'Docker'],
		problem:
			'A clinic or a salon wants an assistant that answers customers on the web, Telegram and WhatsApp from its own data. Each business has to stay completely separate from the others.',
		approach: [
			'Split the system in two. A Laravel application is the system of record for tenants, branches, catalogues, bookings, complaints, FAQs and broadcasts. A separate Python service runs the reasoning agent and keeps no state of its own.',
			'The agent reaches business data only by calling back into Laravel through tool endpoints signed with HMAC, so every answer passes the same tenant and role checks as the web application.',
			'Retrieval runs on a vector database. Before choosing one, I built a small tool to compare two candidates on the same documents.',
			'Guardrails keep the assistant on topic and refuse what falls outside a business, and answers stream to the customer as they are generated.'
		],
		outcome: [
			"The company's first in-house product, designed and built by one engineer.",
			'One assistant per business across web, Telegram and WhatsApp, with tenants isolated from each other.',
			'Automated tests and evaluation reports on both the PHP and the Python side.'
		],
		cover: photo('work-platform.webp')
	},
	{
		slug: 'hris-platform',
		kind: 'professional',
		title: 'HRIS Platform',
		summary:
			'An HR platform first built for a fashion retailer, then adapted into an internal HRIS for around 80 employees.',
		period: '2024 – 2025',
		role: 'Full-stack engineer, UI and backend',
		stack: ['PHP', 'Laravel', 'Angular', 'Ionic', 'TypeScript', 'MySQL'],
		problem:
			'Two organisations needed one home for day-to-day HR: attendance, leave, KPI monitoring, payslips, the org chart and employee profiles. The second had its own way of working and its own look.',
		approach: [
			'Built the HR modules for a fashion retailer in Malaysia: attendance tracking, leave management, KPI monitoring, payslip generation, org chart and profiles.',
			"Adapted the same foundation into my own company's internal HRIS, reworking the flows and the design to fit how the company operates.",
			'Delivered an employee-facing PWA in Angular and Ionic, and an admin dashboard with role-based access control, employee and payslip management, and operational monitoring.'
		],
		outcome: [
			'The internal HRIS supports around 80 employees.',
			'Two organisations run on one shared foundation.'
		],
		cover: photo('work-hris.webp')
	},
	{
		slug: 'recruitment-platform',
		kind: 'professional',
		title: 'Recruitment Platform',
		summary:
			'A job portal for a fashion retailer, built alone from an empty repository to production, where an uploaded CV fills in the candidate profile.',
		period: '2024 – 2025',
		role: 'Sole engineer',
		stack: ['PHP', 'Laravel', 'Angular', 'TypeScript', 'MySQL', 'OpenAI API'],
		problem:
			'Internal staff and outside applicants both needed one place to apply. A full profile covers biodata, experience, certifications, skills and education, which is slow to type out when most candidates already have it all in a PDF.',
		approach: [
			'Built the portal from scratch for both internal and external hiring.',
			'Candidates can complete each section of their profile by hand, or upload their CV as a PDF and have the sections filled in for them to review.',
			'The parsing step uses a language model to turn the unstructured document into structured profile data.'
		],
		outcome: ['Taken from nothing to live in production by one engineer.'],
		cover: photo('work-recruitment.webp')
	},
	{
		slug: 'mall-ai-helper',
		kind: 'professional',
		title: 'AI Shopping Assistant for Kiosks',
		summary:
			'An AI assistant on touchscreen kiosks that answers shoppers about products, promotions, tenants and events in stores and malls.',
		period: '2025 – 2026',
		role: 'Lead engineer since joining the project',
		stack: ['PHP', 'Laravel', 'JavaScript', 'OpenAI API', 'DeepSeek API', 'RAG'],
		problem:
			'Some questions do not fit a map or a catalogue. Shoppers and staff ask them in their own words, at a kiosk, and expect a correct answer straight away.',
		approach: [
			'Answers stream to the screen as they are generated, with the system prompt and behaviour set per store.',
			'Product search is combined with current promotion pricing, so answers quote promotional prices where they apply.',
			'Scheduled scrapers keep mall promotions and events current, and one content area is answered through retrieval over indexed documents.',
			'Prompts are tuned for consistent answers and for refusing attempts at prompt abuse, backed by a spam guard.',
			'The assistant is also embedded in the Interactive Mall Directory as a chat panel.'
		],
		outcome: [
			'Used by shoppers and staff, with a separate configuration for each store.',
			'Took over an existing codebase and became its main engineer.'
		],
		cover: photo('work-mall.webp')
	},
	{
		slug: 'petakin',
		kind: 'personal',
		title: 'Petakin',
		summary: 'Turns raster mall floor plans into clean, editable SVG unit maps.',
		period: '2026',
		role: 'Design and engineering',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'OpenCV'],
		problem:
			'Mall floor plans come as screenshots or PDF exports full of unit codes, facility icons and watermarks. Generic tracers follow the text and produce fragmented paths, and a mall has several floors that must all look identical.',
		approach: [
			'A manual mapping editor sits on top of the vendor floor plan as an underlay: draw each unit with rectangle, ellipse or polygon tools, curves included, on a snap grid.',
			'Units are organised into layers and categories, with one tab per floor and a uniform style across floors; work autosaves in the browser.',
			'Export is pure vector: one path per unit, selectable in Figma, transparent, with no embedded raster image.',
			'An automatic mode segments the plan per colour family with OpenCV to extract units without drawing. It is being rebuilt while segmentation and presets are tightened.'
		],
		outcome: [
			'Manual mapping is live in the browser.',
			'Automatic extraction was validated on a five-floor mall: 101 units on the busiest floor, under 10 seconds per image.'
		],
		links: { demo: 'https://petakin.vercel.app', repo: 'https://github.com/yvdist/petakin' },
		shots: [
			{
				src: '/images/shot-petakin-1.webp',
				alt: 'Petakin landing page showing a colour-coded mall floor plan inside the mapping editor'
			},
			{
				src: '/images/shot-petakin-2.webp',
				alt: 'Petakin manual mapping editor with drawing tools, floor tabs, categories and a layers panel'
			}
		],
		cover: photo('work-petakin.webp')
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
		shots: [
			{
				src: '/images/shot-kikoeru-1.webp',
				alt: 'Kikoeru Lab landing page with the line: ideas you can hear before they exist'
			},
			{
				src: '/images/shot-kikoeru-2.webp',
				alt: 'Kikoeru Lab dashboard listing ranked ideas with status, effort and source filters'
			}
		],
		cover: photo('work-kikoeru.webp')
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
