import svelte from '@astrojs/svelte';
import deno from '@deno/vite-plugin';
import { defineConfig } from 'astro/config';
import path from 'node:path';

export default defineConfig({
	// your configuration options here...
	// https://docs.astro.build/en/reference/configuration-reference/
	site: 'https://JonathonRP.github.io',
	integrations: [svelte()],
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(import.meta.dirname || import.meta.url, 'src'),
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
		},
		plugins: [
			deno(),
			// viteCss(),
		],
		css: {
			preprocessorOptions: {
				sass: {
					api: 'modern-compiler',
				},
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	},
	// build: {
	// 	inlineStylesheets: 'always',
	// },
	experimental: {
		serverIslands: true,
		contentLayer: true,
	},
});
