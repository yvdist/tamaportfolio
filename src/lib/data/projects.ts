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
