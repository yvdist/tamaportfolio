export type Locale = 'en' | 'id';

export const locales: Locale[] = ['en', 'id'];

// English lives at the root and Indonesian under /id. The pathname is the one source of the
// locale, so unmatched URLs such as /id/nothing still get an Indonesian error page.
export function localeOf(pathname: string): Locale {
	return pathname === '/id' || pathname.startsWith('/id/') ? 'id' : 'en';
}

/** Value for the optional `lang` route param. */
export function langParam(locale: Locale): 'id' | undefined {
	return locale === 'id' ? 'id' : undefined;
}

/** Turns an English path (`/`, `/work/x`) into the same page in `locale`. */
export function localizePath(path: string, locale: Locale): string {
	if (locale === 'en') return path;
	return path === '/' ? '/id' : `/id${path}`;
}

const periodWords: Record<string, string> = {
	Aug: 'Agu',
	Dec: 'Des',
	May: 'Mei',
	Oct: 'Okt',
	Present: 'Sekarang'
};

/** Periods are written once, in English; only the words that differ in Indonesian are swapped. */
export function localizePeriod(period: string, locale: Locale): string {
	if (locale === 'en') return period;
	return period.replace(/\b(Aug|Dec|May|Oct|Present)\b/g, (word) => periodWords[word]);
}
