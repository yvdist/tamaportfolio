// Builds two PDFs from cv/cv.html with the locally installed Chrome:
//   static/cv.pdf                                   public, contact details marked data-private removed
//   .hiddendocs/cv/Yudistira-Eka-Pratama-CV.pdf     for applications, includes the phone number
// The phone number is read from .hiddendocs/cv-private.json, which is git-ignored.
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

print(source.replace(privateSpan, ''), 'static/cv.pdf');

if (existsSync(privateFile)) {
	const { phone } = JSON.parse(readFileSync(privateFile, 'utf8'));
	print(source.replaceAll('{{PHONE}}', phone), '.hiddendocs/cv/Yudistira-Eka-Pratama-CV.pdf');
} else {
	console.log(`skipped the application copy: ${privateFile} not found`);
}
