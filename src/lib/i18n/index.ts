import { page } from '$app/state';
import { getContent } from '$lib/data/content';
import { en } from './en';
import { id } from './id';
import { langParam, localeOf } from './locale';

const messages = { en, id };

// Read these inside markup or `$derived`: `/` and `/id` share one mounted component tree, so a
// value copied into a plain `const` goes stale when the language is switched.
export const i18n = {
	get locale() {
		return localeOf(page.url.pathname);
	},
	/** Value for the optional `lang` route param in `resolve()`. */
	get lang() {
		return langParam(localeOf(page.url.pathname));
	},
	/** Interface strings. */
	get t() {
		return messages[localeOf(page.url.pathname)];
	},
	/** Profile, experience and projects in the current language. */
	get content() {
		return getContent(localeOf(page.url.pathname));
	}
};
