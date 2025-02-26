import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				main: '#3c37ff',
				second: '#2520e3',
				third: '#add7f6',
				blackOne: '#0a0a0a',
				grayOne: '#D7DDE6',
				greenAccent: '#22C55E',
				redAccent: '#EF4444',
			},
			screens: {
				sm400: '400px',
			},
		},
	},
	plugins: [],
};
export default config;
