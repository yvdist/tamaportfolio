// Renders one 1200x630 social preview image per case study into static/og/<slug>.png,
// using the locally installed Chrome. Run again whenever a project's title or summary changes.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createServer } from 'vite';

const chrome =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!existsSync(chrome)) {
	console.error(`Chrome not found at ${chrome}. Set CHROME_PATH.`);
	process.exit(1);
}

// Vite loads the TypeScript data modules, so the images never drift from the site copy.
const vite = await createServer({
	server: { middlewareMode: true },
	appType: 'custom',
	optimizeDeps: { noDiscovery: true, include: [] }
});
const { projects } = await vite.ssrLoadModule('/src/lib/data/projects.ts');
const { profile } = await vite.ssrLoadModule('/src/lib/data/profile.ts');
await vite.close();

const font = (weight) =>
	pathToFileURL(
		resolve(`node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-${weight}-normal.woff2`)
	).href;

const escape = (text) =>
	text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function card(project) {
	const kind = project.kind === 'personal' ? 'personal project' : 'professional work';
	return `<!doctype html>
<html lang="en">
<meta charset="utf-8" />
<style>
	@font-face { font-family: 'EB Garamond'; src: url('${font(400)}') format('woff2'); }
	* { box-sizing: border-box; margin: 0; }
	body {
		width: 1200px; height: 630px; padding: 76px 88px;
		display: flex; flex-direction: column; justify-content: space-between;
		background: #faf9f7; color: #3d3935;
		font-family: 'Helvetica Neue', Arial, sans-serif;
	}
	.label { font-size: 17px; letter-spacing: 0.3em; text-transform: uppercase; color: #6c6966; }
	h1 { margin-top: 34px; font: 400 78px/1.12 'EB Garamond', serif; }
	.summary { margin-top: 28px; max-width: 900px; font: 400 31px/1.45 'EB Garamond', serif; color: #55514d; }
	.foot {
		display: flex; justify-content: space-between; padding-top: 26px;
		border-top: 1px solid #d9d5d0;
		font-size: 17px; letter-spacing: 0.3em; text-transform: uppercase; color: #6c6966;
	}
</style>
<body>
	<div>
		<p class="label">case study · ${kind}</p>
		<h1>${escape(project.title)}</h1>
		<p class="summary">${escape(project.summary)}</p>
	</div>
	<div class="foot">
		<span>${escape(profile.name)}</span>
		<span>${escape(profile.role)}</span>
	</div>
</body>
</html>`;
}

const work = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync('static/og', { recursive: true });

for (const project of projects) {
	const input = join(work, `${project.slug}.html`);
	const output = `static/og/${project.slug}.png`;
	writeFileSync(input, card(project));
	execFileSync(
		chrome,
		[
			'--headless=new',
			'--disable-gpu',
			'--hide-scrollbars',
			'--force-device-scale-factor=1',
			'--window-size=1200,630',
			`--screenshot=${resolve(output)}`,
			pathToFileURL(input).href
		],
		{ stdio: 'ignore' }
	);
	console.log(`wrote ${output}`);
}
