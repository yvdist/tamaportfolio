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
