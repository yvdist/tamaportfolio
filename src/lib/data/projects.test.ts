import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { alsoBuilt, getProject, projects } from './projects';

describe('projects data', () => {
	it('lists the six case studies in display order', () => {
		expect(projects.map((p) => p.slug)).toEqual([
			'hris-platform',
			'recruitment-platform',
			'ai-conversation-classification',
			'mall-ai-helper',
			'petakin',
			'kikoeru-lab'
		]);
	});

	it('has unique slugs', () => {
		const slugs = projects.map((p) => p.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('finds a project by slug and returns undefined for unknown slugs', () => {
		expect(getProject('petakin')?.title).toBe('Petakin');
		expect(getProject('does-not-exist')).toBeUndefined();
	});

	it('gives every project the content a case-study page needs', () => {
		for (const p of projects) {
			expect(p.summary.length, p.slug).toBeGreaterThan(20);
			expect(p.problem.length, p.slug).toBeGreaterThan(20);
			expect(p.approach.length, p.slug).toBeGreaterThan(0);
			expect(p.outcome.length, p.slug).toBeGreaterThan(0);
			expect(p.stack.length, p.slug).toBeGreaterThan(0);
			expect(p.cover, p.slug).toMatch(/^\/images\/work-[a-z-]+\.webp$/);
		}
	});

	it('links demo and repo only for personal projects', () => {
		for (const p of projects) {
			if (p.kind === 'personal') {
				expect(p.links?.repo, p.slug).toMatch(/^https:\/\/github\.com\/yvdist\//);
			} else {
				expect(p.links, p.slug).toBeUndefined();
			}
		}
	});

	it('keeps secondary links external', () => {
		expect(alsoBuilt.length).toBe(2);
		for (const a of alsoBuilt) expect(a.url).toMatch(/^https:\/\//);
	});

	it('has a cover image file for every project', () => {
		for (const p of projects) {
			expect(existsSync(`static${p.cover}`), p.cover).toBe(true);
		}
	});

	it('shows screenshots only for personal projects, and every file exists', () => {
		for (const p of projects) {
			if (p.kind === 'professional') {
				expect(p.shots, p.slug).toBeUndefined();
				continue;
			}
			expect(p.shots?.length, p.slug).toBeGreaterThan(0);
			for (const shot of p.shots ?? []) {
				expect(shot.alt.length, shot.src).toBeGreaterThan(10);
				expect(existsSync(`static${shot.src}`), shot.src).toBe(true);
			}
		}
	});
});
