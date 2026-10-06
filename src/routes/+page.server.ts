import { existsSync } from 'node:fs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ hasCv: existsSync('static/cv.pdf') });
