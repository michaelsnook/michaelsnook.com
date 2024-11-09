module.exports = {
	future: {
		purgeLayersByDefault: true,
		removeDeprecatedGapUtilities: true,
	},
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./lib/**/*.{js,jsx,ts,tsx}',
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
				// the brights https://play.tailwindcss.com/Kxp4dNNjfA
				// the subdued https://play.tailwindcss.com/eqbovlyvNA
				// all colors  https://play.tailwindcss.com/ayCV0YyCG6
				cyan: '#359fcc', //            dsat 40%, lighten 20%
				'cyan-bright': '#0087c1', //   start w the image cyan
				'cyan-content': '#1d5a73', //  dsat then darken 25%
				'cyan-soft': '#9acfe5', //     dsat then lighten 60%
				lilac: '#c6a7c7', //           start w the image lilac
				'lilac-bright': '#d696d8', //  saturated up 30% https://mdigi.tools/saturate-color/#c6a7c7
				'lilac-content': '#905d91', // sat then 35% darker
				'lilac-soft': '#e2d3e3', //    sat then 50% lighter
			},
			minHeight: {
				40: '10rem',
				64: '16rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
