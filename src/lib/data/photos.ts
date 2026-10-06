// Atmospheric photographs come in interchangeable sets under static/images/sets/<name>/.
// Every set holds the same file names, so switching sets is a one-line change to PHOTO_SET.
const sets = {
	unsplash: { credit: { label: 'Unsplash', url: 'https://unsplash.com' } },
	own: { credit: null }
} as const;

export const PHOTO_SET: keyof typeof sets = 'unsplash';

export const photoCredit: { label: string; url: string } | null = sets[PHOTO_SET].credit;

export function photo(name: string): string {
	return `/images/sets/${PHOTO_SET}/${name}`;
}
