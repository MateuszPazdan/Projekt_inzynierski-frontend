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
				black: '#0a0a0a',
				greenAccent: '#22C55E',
				redAccent: '#EF4444',
			},
		},
	},
	plugins: [],
};
export default config;
