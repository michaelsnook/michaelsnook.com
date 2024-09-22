const colors = require('tailwindcss/colors')
const production = process.env.NODE_ENV === 'production'

module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./pages/**/*.js',
		'./components/**/*.js',
		'./styles/globals.css',
	],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
		},
		container: {
			center: true,
			padding: '1.25rem',
		},
		fontFamily: {
			sans: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'Oxygen-Sans',
				'Ubuntu',
				'Cantarell',
				'"Helvetica Neue"',
				'sans-serif',
			],
			display: ['"Exo 2"', 'ui-serif'],
		},
		extend: {
			colors: {
				cyan: colors.cyan,
			},
			minHeight: {
				40: '10rem',
				64: '16rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
