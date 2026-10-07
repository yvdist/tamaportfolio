import { error } from '@sveltejs/kit';
import { getContent } from '$lib/data/content';
import { projects as allProjects } from '$lib/data/projects';
import { localeOf } from '$lib/i18n/locale';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	allProjects.flatMap((p) => [{ slug: p.slug }, { lang: 'id', slug: p.slug }]);

export const load: PageLoad = ({ params, url }) => {
	const { projects } = getContent(localeOf(url.pathname));
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Case study not found');

	const next = projects[(projects.indexOf(project) + 1) % projects.length];
	return { project, next };
};
