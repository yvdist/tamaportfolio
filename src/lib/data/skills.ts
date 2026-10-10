export interface SkillGroup {
	label: string;
	items: string[];
}

export const skills: SkillGroup[] = [
	{
		label: 'Backend',
		items: [
			'PHP',
			'Laravel',
			'Lumen',
			'Node.js',
			'Express.js',
			'Python (FastAPI)',
			'REST API',
			'MySQL',
			'PostgreSQL',
			'MongoDB',
			'Redis'
		]
	},
	{
		label: 'Frontend',
		items: [
			'TypeScript',
			'JavaScript',
			'React',
			'Next.js',
			'Svelte / SvelteKit',
			'Angular',
			'Ionic',
			'Alpine.js',
			'three.js',
			'Leaflet',
			'Tailwind CSS'
		]
	},
	{
		label: 'AI',
		items: [
			'OpenAI',
			'Anthropic Claude',
			'Google Gemini',
			'DeepSeek',
			'RAG',
			'Qdrant',
			'Prompt Engineering',
			'OCR & document processing'
		]
	},
	{ label: 'Mobile', items: ['Dart', 'Flutter', 'React Native', 'GetX', 'BLoC'] },
	{
		label: 'AI coding tools',
		items: ['Claude Code', 'Codex', 'OpenCode', 'Cursor', 'Antigravity']
	},
	{
		label: 'Infrastructure',
		items: ['Docker', 'Docker Compose', 'AWS', 'GitLab CI', 'Vercel']
	},
	{ label: 'Tools', items: ['Git', 'GitHub', 'PHPUnit', 'Vitest', 'Playwright', 'Algolia'] }
];
