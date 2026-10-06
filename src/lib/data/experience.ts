export interface Experience {
	company: string;
	note?: string;
	location: string;
	period: string;
	roles: { title: string; period: string }[];
	points: string[];
	stack: string[];
}

export const experience: Experience[] = [
	{
		company: 'IGCY',
		note: 'Alturian group',
		location: 'South Jakarta',
		period: 'Jan 2024 – Present',
		roles: [
			{ title: 'Software Engineer Specialist', period: 'Mar 2026 – Present' },
			{ title: 'Senior Software Engineer', period: 'Mar 2025 – Feb 2026' },
			{ title: 'Junior Software Engineer', period: 'Jan 2024 – Feb 2025' }
		],
		points: [
			"Sole engineer in the AI-based project division, reporting to the CTO: planning, building and deploying AI-driven applications for clients and for the company's first in-house product.",
			'Designed and built an interactive mall directory for a major retail group: multi-floor wayfinding in 2D and 3D, with an admin panel the mall team runs themselves.',
			'Built customer-service chatbots that read live business data, document pipelines combining OCR with language models, and retrieval-augmented assistants, across OpenAI, Claude and Gemini.',
			"As senior engineer, delivered ERP, merchandising, loyalty, HRIS and recruitment systems with Laravel and Angular, designed their architecture and reviewed teammates' code.",
			'Refactored a conversation-classification job to batch requests and drop repeated calls, lowering token usage.'
		],
		stack: ['PHP', 'Laravel', 'Angular', 'React', 'TypeScript', 'three.js', 'MySQL', 'LLM APIs']
	},
	{
		company: 'The Prime',
		location: 'Cianjur, West Java',
		period: 'Aug 2022 – Dec 2023',
		roles: [
			{ title: 'Back End Developer', period: 'Aug 2022 – Dec 2023' },
			{ title: 'Mobile Application Developer', period: 'Nov 2022 – Feb 2023' }
		],
		points: [
			'Built REST APIs and backend features in Laravel at a software house serving local businesses, schools and government-affiliated clients.',
			'Projects included a regional transport app with ticketing and top-ups, an e-commerce and inventory system, and a teacher assignment platform for a Ministry of Education unit. Integrated payment gateways and digital product APIs.',
			'In parallel, built cross-platform Flutter apps using BLoC and GetX.'
		],
		stack: ['PHP', 'Laravel', 'MySQL', 'REST API', 'Dart', 'Flutter']
	},
	{
		company: 'Freelance',
		location: 'Cianjur, West Java',
		period: '2022',
		roles: [{ title: 'Web Developer', period: '2022' }],
		points: ['Built landing pages and small websites for paying clients before joining The Prime.'],
		stack: []
	}
];
