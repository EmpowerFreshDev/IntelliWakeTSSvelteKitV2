/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontSize: {
				'xxs': '0.6rem',
				'xxxs': '0.4rem'
			},
			colors: {
				primary: {
					main: '#004466',
					hover: '#195d80',
					faded: '#4d6e80',
					light: '#006699',
					lighter: '#0099e6',
					face: '#003b59',
					hands: '#002233'
				},
				secondary: {
					main: 'var(--red-color)',
					hover: '#0088cc',
					faded: '#638699',
					light: '#5cb8e6',
					lighter: '#91d2f2',
					face: '#206080',
					hands: '#004466'
				}
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100'
			}
		}
	},
	plugins: []
}
