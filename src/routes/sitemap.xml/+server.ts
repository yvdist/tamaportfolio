import { profile } from '$lib/data/profile';
import { projects } from '$lib/data/projects';
import { locales, localizePath } from '$lib/i18n/locale';

export const prerender = true;

export function GET() {
	const paths = ['/', ...projects.map((p) => `/work/${p.slug}`)];
	// Every page is listed once per language, each naming all of its language versions.
	const urls = paths
		.flatMap((path) => {
			const alternates = locales
				.map(
					(locale) =>
						`<xhtml:link rel="alternate" hreflang="${locale}" href="${profile.siteUrl}${localizePath(path, locale)}"/>`
				)
				.join('');
			return locales.map(
				(locale) =>
					`\t<url><loc>${profile.siteUrl}${localizePath(path, locale)}</loc>${alternates}</url>`
			);
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
