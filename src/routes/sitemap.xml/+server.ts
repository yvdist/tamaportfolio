import { profile } from '$lib/data/profile';
import { projects } from '$lib/data/projects';

export const prerender = true;

export function GET() {
	const paths = ['/', ...projects.map((p) => `/work/${p.slug}`)];
	const urls = paths.map((path) => `\t<url><loc>${profile.siteUrl}${path}</loc></url>`).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
