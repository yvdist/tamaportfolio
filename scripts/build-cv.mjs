// Builds two PDFs from cv/cv.html with the locally installed Chrome:
//   static/cv.pdf                                   public, contact details marked data-private removed
//   .hiddendocs/cv/Yudistira-Eka-Pratama-CV.pdf     for applications, includes the phone number
// The phone number is read from .hiddendocs/cv-private.json, which is git-ignored.
// With --source and --out it builds one tailored variant instead (see below).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const privateFile = '.hiddendocs/cv-private.json';
const privateSpan = /\s*<span data-private>[\s\S]*?<\/span>/g;

if (!existsSync(chrome)) {
	console.error(`Chrome not found at ${chrome}. Set CHROME_PATH.`);
	process.exit(1);
}

const source = readFileSync('cv/cv.html', 'utf8');
const work = mkdtempSync(join(tmpdir(), 'cv-'));

function print(html, output) {
	const input = join(work, 'cv.html');
	writeFileSync(input, html);
	mkdirSync(resolve(output, '..'), { recursive: true });
	execFileSync(
		chrome,
		[
			'--headless=new',
			'--disable-gpu',
			'--no-pdf-header-footer',
			`--print-to-pdf=${resolve(output)}`,
			pathToFileURL(input).href
		],
		{ stdio: 'ignore' }
	);
	console.log(`wrote ${output}`);
}

const phone = existsSync(privateFile)
	? JSON.parse(readFileSync(privateFile, 'utf8')).phone
	: undefined;
const withPhone = (html) => html.replaceAll('{{PHONE}}', phone);

// A tailored variant: node scripts/build-cv.mjs --source <cv.html> --out <cv.pdf>
// builds only that file and leaves the master PDFs alone.
const arg = (name) => {
	const i = process.argv.indexOf(name);
	return i === -1 ? undefined : process.argv[i + 1];
};
const variantSource = arg('--source');
const variantOut = arg('--out');

if (variantSource || variantOut) {
	if (!variantSource || !variantOut || !phone) {
		console.error(`Usage: --source <cv.html> --out <cv.pdf> (needs ${privateFile})`);
		process.exit(1);
	}
	print(withPhone(readFileSync(variantSource, 'utf8')), variantOut);
	process.exit(0);
}

print(source.replace(privateSpan, ''), 'static/cv.pdf');

if (phone) {
	print(withPhone(source), '.hiddendocs/cv/Yudistira-Eka-Pratama-CV.pdf');
} else {
	console.log(`skipped the application copy: ${privateFile} not found`);
}
