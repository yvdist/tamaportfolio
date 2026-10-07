export interface Role {
	title: string;
	period: string;
	points: string[];
}

export interface Experience {
	company: string;
	note?: string;
	location: string;
	period: string;
	roles: Role[];
	stack: string[];
}

export const experience: Experience[] = [
	{
		company: 'IGCY',
		note: 'Alturian group',
		location: 'South Jakarta',
		period: 'Jan 2024 – Present',
		roles: [
			{
				title: 'Software Engineer Specialist',
				period: 'Mar 2026 – Present',
				points: [
					'Sole engineer in the AI-based project division, reporting to the CTO: planning, building and deploying AI-driven applications for clients and for the company.',
					'Designed and built an interactive mall directory for a major retail group, now live in several malls: multi-floor wayfinding in 2D and 3D, with an admin panel the mall team runs themselves.',
					"Built the company's first in-house product alone: a multi-tenant AI platform with a Laravel core and a Python agent service, serving assistants on web, Telegram and WhatsApp.",
					'Lead engineer on an AI shopping assistant for store and mall kiosks. Also built customer-service chatbots that read live business data, an employee assistant whose handbook answers cite their page numbers, and document pipelines with OCR, across OpenAI, Claude and Gemini.'
				]
			},
			{
				title: 'Senior Software Engineer',
				period: 'Mar 2025 – Feb 2026',
				points: [
					'Built a job portal for a fashion retailer alone, from an empty repository to production. Candidates fill in their profile by hand or have it filled from an uploaded CV.',
					"Adapted the HR platform built for that client into the company's internal HRIS for around 80 employees, with an employee PWA in Angular and Ionic and an admin dashboard with role-based access.",
					"Designed the architecture and technical workflow for new client projects, and reviewed teammates' code."
				]
			},
			{
				title: 'Junior Software Engineer',
				period: 'Jan 2024 – Feb 2025',
				points: [
					"Joined a fashion retailer's ERP already well underway and worked across its modules, continuing into the senior role: procurement, vendor invoices, credit and debit notes, payroll, shift management and journal uploads.",
					"Built features for the same retailer's loyalty app and its back office: points, rewards, raffles, birthday rewards and member tiers.",
					'Worked on a merchandising application for a grocery client, covering inventory and stock workflows.'
				]
			}
		],
		stack: ['PHP', 'Laravel', 'Angular', 'Ionic', 'React', 'TypeScript', 'three.js', 'MySQL']
	},
	{
		company: 'The Prime',
		location: 'Cianjur, West Java',
		period: 'Aug 2022 – Dec 2023',
		roles: [
			{
				title: 'Back End Developer',
				period: 'Aug 2022 – Dec 2023',
				points: [
					'Built REST APIs and backend features in Laravel at a software house serving local businesses, schools and government-affiliated clients, with up to five projects active in a month.',
					'Projects included a regional transport app with ticketing and top-ups, an e-commerce and inventory system, and a teacher assignment platform for a Ministry of Education unit. Integrated payment gateways and digital product APIs.'
				]
			},
			{
				title: 'Mobile Application Developer',
				period: 'Nov 2022 – Feb 2023',
				points: [
					'Alongside the backend role, built cross-platform Flutter apps with BLoC and GetX, including a train booking app commissioned by a provincial government.'
				]
			}
		],
		stack: ['PHP', 'Laravel', 'MySQL', 'REST API', 'Dart', 'Flutter']
	},
	{
		company: 'Freelance',
		location: 'Cianjur, West Java',
		period: 'Feb 2022 – Jul 2022',
		roles: [
			{
				title: 'Web Developer',
				period: 'Feb 2022 – Jul 2022',
				points: [
					'Took paid work while finishing vocational school: landing pages, turning UI designs into HTML and CSS, small Laravel applications, and portfolio sites and templates.'
				]
			}
		],
		stack: ['HTML', 'CSS', 'JavaScript', 'Laravel']
	}
];
