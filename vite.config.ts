import { sveltekit } from '@sveltejs/kit/vite';
import mkcert from 'vite-plugin-mkcert'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), mkcert()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 5183,
		https: true,
		host: '0.0.0.0',
		strictPort: false
	},
	preview: {
		port: 5282,
		https: true,
		host: '0.0.0.0',
		strictPort: false
	}
});
