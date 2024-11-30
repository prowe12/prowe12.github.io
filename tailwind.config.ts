import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
			  'base': 'rgb(245, 243, 241)', 
			  'oxfordblue': '#1D293D',
			  'slategray': '#778AA2',
			  'silver': '#C2C1C2',
			  'alabaster': '#EAE5DB', 
			  'firebrick': '#B13B27',
			},
			fontFamily: {
				serif: ['Playfair', 'serif'],
				sans: ['Roboto', 'sans-serif'],
			}
		}
	},

	plugins: [typography]
} satisfies Config;


// whitesmoke: '#f5f5f5',
