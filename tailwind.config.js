/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // Important for dark mode toggle
	theme: {
		extend: {
			animation: {
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			boxShadow: {
				'glow': '0 0 15px 2px rgba(56, 189, 248, 0.3)',
				'glow-lg': '0 0 25px 5px rgba(56, 189, 248, 0.4)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
