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
