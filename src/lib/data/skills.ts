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
