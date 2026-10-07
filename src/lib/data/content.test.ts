import { describe, expect, it } from 'vitest';
import { localeOf, localizePath, localizePeriod } from '../i18n/locale';
import { getContent } from './content';
import { experience } from './experience';
import { alsoBuiltId, experienceId, projectsId } from './id';
import { alsoBuilt, projects } from './projects';

describe('indonesian content', () => {
	const id = getContent('id');

	it('has no entries for things that no longer exist', () => {
		expect(Object.keys(projectsId).sort()).toEqual(projects.map((p) => p.slug).sort());
		expect(Object.keys(experienceId).sort()).toEqual(experience.map((job) => job.company).sort());
		expect(Object.keys(alsoBuiltId).sort()).toEqual(alsoBuilt.map((item) => item.url).sort());
	});

	it('keeps structure, names and links from the english data', () => {
		expect(id.projects.map((p) => p.slug)).toEqual(projects.map((p) => p.slug));
		for (const [i, p] of id.projects.entries()) {
			const source = projects[i];
			expect(p.title).toBe(source.title);
			expect(p.stack).toEqual(source.stack);
			expect(p.cover).toBe(source.cover);
			expect(p.links).toEqual(source.links);
			expect(p.shots?.map((shot) => shot.src)).toEqual(source.shots?.map((shot) => shot.src));
		}
		expect(id.experience.flatMap((job) => job.roles.map((role) => role.title))).toEqual(
			experience.flatMap((job) => job.roles.map((role) => role.title))
		);
	});

	it('translates every long text', () => {
		for (const [i, p] of id.projects.entries()) {
			const source = projects[i];
			expect(p.summary, p.slug).not.toBe(source.summary);
			expect(p.problem, p.slug).not.toBe(source.problem);
			expect(p.summary.length, p.slug).toBeGreaterThan(20);
			expect(p.problem.length, p.slug).toBeGreaterThan(20);
			for (const shot of p.shots ?? []) expect(shot.alt.length, shot.src).toBeGreaterThan(10);
		}
		expect(getContent('en').projects).toBe(projects);
	});

	it('never names the client or overstates the mall directory', () => {
		const all = JSON.stringify(id);
		for (const banned of ['AEON', 'Aeon', '90%', '90 persen', 'Sulawesi']) {
			expect(all.includes(banned), banned).toBe(false);
		}

		const directory = JSON.stringify(
			id.projects.find((p) => p.slug === 'interactive-mall-directory')
		);
		for (const banned of [
			'A*',
			'turn-by-turn',
			'role-based',
			'berbasis peran',
			'offline',
			'luring',
			'Docker'
		]) {
			expect(directory.includes(banned), banned).toBe(false);
		}
	});

	it('writes periods in indonesian without touching the english ones', () => {
		expect(localizePeriod('Aug 2022 – Dec 2023', 'id')).toBe('Agu 2022 – Des 2023');
		expect(localizePeriod('Jan 2024 – Present', 'id')).toBe('Jan 2024 – Sekarang');
		expect(localizePeriod('Jan 2024 – Present', 'en')).toBe('Jan 2024 – Present');
		expect(JSON.stringify(id.experience)).not.toMatch(/Present|\b(Aug|Dec|May|Oct) \d{4}/);
	});
});

describe('locale from the url', () => {
	it('treats only /id and paths under it as indonesian', () => {
		expect(localeOf('/')).toBe('en');
		expect(localeOf('/work/petakin')).toBe('en');
		expect(localeOf('/idea')).toBe('en');
		expect(localeOf('/id')).toBe('id');
		expect(localeOf('/id/work/petakin')).toBe('id');
		expect(localeOf('/id/nothing')).toBe('id');
	});

	it('maps an english path to its indonesian page', () => {
		expect(localizePath('/', 'id')).toBe('/id');
		expect(localizePath('/work/petakin', 'id')).toBe('/id/work/petakin');
		expect(localizePath('/work/petakin', 'en')).toBe('/work/petakin');
	});
});
