// Fonts are bundled locally with @fontsource so renders work offline and never fail on a font fetch.
// To use another font: `npm i @fontsource/<font>` and import its weight CSS here.
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/800.css';
import '@fontsource/lalezar/400.css';
import {continueRender, delayRender} from 'remotion';

// Hold rendering until the Arabic glyphs are actually loaded (otherwise the first frames use a fallback font).
if (typeof document !== 'undefined') {
	const handle = delayRender('Loading Arabic fonts');
	Promise.all(
		['600 40px Cairo', '800 40px Cairo', '400 40px Lalezar'].map((f) => document.fonts.load(f, 'أبجد')),
	).then(() => continueRender(handle), () => continueRender(handle));
}

export const fonts = {
	body: "'Cairo', sans-serif",
	display: "'Lalezar', 'Cairo', sans-serif",
};

export type Brand = {
	bg: string;
	surface: string;
	primary: string;
	accent: string;
	text: string;
	muted: string;
};

// Default brand: warm explainer palette. Swap per client.
export const defaultBrand: Brand = {
	bg: '#FBE5C4',
	surface: '#FFF6E8',
	primary: '#A15E3E',
	accent: '#E8A33D',
	text: '#4A2B1C',
	muted: '#C99A7A',
};

// Kinetic collage palette.
export const kineticBrand: Brand = {
	bg: '#232323',
	surface: '#2E2E2E',
	primary: '#B6F23A',
	accent: '#FFFFFF',
	text: '#F2F2F2',
	muted: '#6B6B6B',
};

// 9:16 safe area (see references/rtl-arabic.md).
export const SAFE = {top: 250, bottom: 350, side: 80};
