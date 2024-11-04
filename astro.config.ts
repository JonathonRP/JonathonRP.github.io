import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import deno from '@deno/vite-plugin';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';
import path from 'node:path';

export default defineConfig({
	// your configuration options here...
	// https://docs.astro.build/en/reference/configuration-reference/
	site: 'https://JonathonRP.github.io',
	integrations: [
		sitemap(),
		robotsTxt({
			sitemap: [
				'https://JonathonRP.github.io/sitemap-index.xml',
				'https://JonathonRP.github.io/sitemap-0.xml',
			],
		}),
		svelte(),
	],
	prefetch: {
		prefetchAll: false,
	},
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(import.meta.dirname || import.meta.url, 'src'),
			},
		},
		// server: {
		// 	watch: {
		// 		usePolling: true,
		// 	},
		// },
		plugins: [
			deno(),
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
