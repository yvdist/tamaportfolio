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
			'Prompt Engineering',
			'OCR & document processing'
		]
	},
	{ label: 'Mobile', items: ['Dart', 'Flutter', 'GetX', 'BLoC'] },
	{
		label: 'Tools',
		items: ['Git', 'GitHub', 'GitLab CI', 'Docker', 'PHPUnit', 'Vitest', 'Playwright', 'Algolia']
	}
];
