import { sveltekit } from '@sveltejs/kit/vite';
// import mkcert from 'vite-plugin-mkcert'
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
	
	plugins: [sveltekit()/*, mkcert()*/],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: 5183,
		host: '0.0.0.0',
		strictPort: false,
		proxy: {}
	},
	preview: {
		port: 5282,
		host: '0.0.0.0',
		strictPort: false,
		proxy: {}
	},
	resolve: {
    alias: {
      '@solidbasisventures/intelliwakesveltekitv2': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});




