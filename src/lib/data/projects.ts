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
			'Built for a major retail group in Malaysia; one installation serves more than one mall.',
			'Wayfinding in 2D and 3D across seven floors, from kiosks and phones.',
			'Routing, geometry and the editors are covered by PHPUnit and Vitest suites.'
		],
		cover: '/images/work-directory.webp'
	},
	{
		slug: 'hris-platform',
		kind: 'professional',
		title: 'HRIS Platform',
		summary:
			'An internal HR platform built from the ground up, covering the working life of around 80 employees.',
		period: '2025 – 2026',
		role: 'Full-stack engineer, UI and backend',
		stack: ['PHP', 'Laravel', 'Angular', 'TypeScript', 'MySQL', 'REST API'],
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
		period: '2025 – 2026',
		role: 'Full-stack engineer',
		stack: ['PHP', 'Laravel', 'Angular', 'TypeScript', 'MySQL', 'OpenAI API'],
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
		slug: 'mall-ai-helper',
		kind: 'professional',
		title: 'Mall AI Assistant',
		summary:
			'A conversational assistant that answers shoppers and staff about tenants, locations and services at a large retail mall.',
		period: '2026',
		role: 'Engineer, backend and AI',
		stack: ['PHP', 'Laravel', 'OpenAI API', 'RAG', 'Prompt Engineering', 'MySQL'],
		problem:
			'Some questions do not fit a map. Shoppers and staff ask them in their own words and expect a correct answer straight away.',
		approach: [
			'Built the assistant to handle natural-language questions about tenants, locations and services.',
			"Answers are grounded in the mall's own data and indexed documents through retrieval, not in what the model happens to remember.",
			'Prompts are tuned for consistent answers, for following instructions closely and for refusing attempts at prompt abuse.',
			'The assistant is embedded in the Interactive Mall Directory as a chat panel.'
		],
		outcome: [
			'Used by shoppers and staff alongside the directory.',
			'Grounding answers in documents reduced hallucinated replies.'
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
