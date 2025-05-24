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
				grayOne: '#edeff3',
				graySecond: '#D7DDE6',
				grayThird: '#C9CFD9',
				greenAccent: '#22C55E',
				redAccent: '#EF4444',
			},
			screens: {
				sm400: '400px',
				sm500: '500px',
				sm600: '600px',
			},
			boxShadow: {
				myShadow: ' 0px 0px 50px -20px rgba(10, 10, 10, 0.2)',
			},
		},
	},
	plugins: [],
};
export default config;
