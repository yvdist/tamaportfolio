import { localizePeriod, type Locale } from '../i18n/locale';
import { experience, type Experience } from './experience';
import { alsoBuiltId, experienceId, profileId, projectsId } from './id';
import { profile } from './profile';
import { alsoBuilt, projects, type AlsoLink, type Project } from './projects';

export interface Content {
	profile: typeof profile;
	experience: Experience[];
	projects: Project[];
	alsoBuilt: AlsoLink[];
}

// There is no fallback to English: a missing or misaligned translation stops the build.
function need<T>(value: T | undefined, what: string): T {
	if (value === undefined) throw new Error(`Indonesian content is missing ${what}`);
	return value;
}

function aligned<T>(translated: T[], source: unknown[], what: string): T[] {
	if (translated.length !== source.length) {
		throw new Error(
			`Indonesian content has ${translated.length} of ${source.length} items in ${what}`
		);
	}
	return translated;
}

function indonesian(): Content {
	return {
		profile: { ...profile, ...profileId, about: aligned(profileId.about, profile.about, 'about') },
		experience: experience.map((job) => {
			const text = need(experienceId[job.company], `experience "${job.company}"`);
			aligned(text.points, job.roles, `roles of "${job.company}"`);
			return {
				...job,
				...(job.note ? { note: need(text.note, `the note of "${job.company}"`) } : {}),
				location: text.location,
				period: localizePeriod(job.period, 'id'),
				roles: job.roles.map((role, i) => ({
					...role,
					period: localizePeriod(role.period, 'id'),
					points: aligned(text.points[i], role.points, `"${role.title}" at "${job.company}"`)
				}))
			};
		}),
		projects: projects.map((project) => {
			const text = need(projectsId[project.slug], `project "${project.slug}"`);
			return {
				...project,
				summary: text.summary,
				role: text.role,
				problem: text.problem,
				approach: aligned(text.approach, project.approach, `approach of "${project.slug}"`),
				outcome: aligned(text.outcome, project.outcome, `outcome of "${project.slug}"`),
				...(project.shots
					? {
							shots: aligned(
								need(text.shotAlts, `shot alts of "${project.slug}"`),
								project.shots,
								`shot alts of "${project.slug}"`
							).map((alt, i) => ({ ...project.shots![i], alt }))
						}
					: {})
			};
		}),
		alsoBuilt: alsoBuilt.map((item) => ({
			...item,
			note: need(alsoBuiltId[item.url], `the note of "${item.title}"`)
		}))
	};
}

const content: Record<Locale, Content> = {
	en: { profile, experience, projects, alsoBuilt },
	id: indonesian()
};

export function getContent(locale: Locale): Content {
	return content[locale];
}
