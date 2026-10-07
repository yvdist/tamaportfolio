import type { Handle } from '@sveltejs/kit';
import { localeOf } from '$lib/i18n/locale';

// Fills <html lang> in app.html. Runs while prerendering and for the server-rendered error page.
export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', localeOf(event.url.pathname))
	});
