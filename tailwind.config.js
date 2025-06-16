/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // Important for dark mode toggle
	theme: {
		extend: {}
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
