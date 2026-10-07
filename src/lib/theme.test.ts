import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/routes/layout.css', 'utf8');

type Rgb = [number, number, number];

function palette(block: RegExp): Record<string, Rgb> {
	const body = css.match(block)?.[1] ?? '';
	const colors: Record<string, Rgb> = {};
	for (const [, name, hex] of body.matchAll(/--color-([a-z]+):\s*#([0-9a-f]{6})/gi)) {
		colors[name] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
	}
	return colors;
}

function luminance(rgb: Rgb): number {
	const [r, g, b] = rgb.map((value) => {
		const channel = value / 255;
		return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(text: Rgb, background: Rgb, alpha: number): number {
	const blended = text.map((value, i) => value * alpha + background[i] * (1 - alpha)) as Rgb;
	const [light, dark] = [luminance(blended), luminance(background)].sort((a, b) => b - a);
	return (light + 0.05) / (dark + 0.05);
}

const themes = {
	light: palette(/@theme\s*\{([^}]*)\}/),
	dark: palette(/:root\[data-theme='dark'\]\s*\{([^}]*)\}/)
};

describe('theme palettes', () => {
	it.each(Object.entries(themes))('%s defines every colour token', (_name, colors) => {
		expect(Object.keys(colors).sort()).toEqual(['charcoal', 'cream', 'sand', 'warmgray']);
	});

	it.each(Object.entries(themes))(
		'%s keeps charcoal/75 on cream at WCAG AA contrast',
		(_name, colors) => {
			expect(contrast(colors.charcoal, colors.cream, 0.75)).toBeGreaterThanOrEqual(4.5);
		}
	);

	it('uses no charcoal text lighter than charcoal/75', () => {
		const tooLight = readdirSync('src', { recursive: true, encoding: 'utf8' })
			.filter((file) => file.endsWith('.svelte'))
			.flatMap((file) =>
				[...readFileSync(`src/${file}`, 'utf8').matchAll(/(?<![\w:-])text-charcoal\/(\d+)/g)]
					.filter(([, alpha]) => Number(alpha) < 75)
					.map(([match]) => `${file}: ${match}`)
			);
		expect(tooLight).toEqual([]);
	});
});
