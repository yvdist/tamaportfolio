import { existsSync } from 'node:fs';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => [{}, { lang: 'id' }];

export const load: PageServerLoad = () => ({ hasCv: existsSync('static/cv.pdf') });
