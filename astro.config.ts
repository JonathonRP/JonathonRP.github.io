import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import deno from '@deno/vite-plugin';
import { enhancedImages } from '@sveltejs/enhanced-img';
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
		defaultStrategy: 'viewport',
		prefetchAll: true,
	},
	image: {
		// cacheDir: './.cache/image',
		// defaultFormat: 'webp',
	},
	vite: {
		resolve: {
			alias: {
				'@/': `${path.resolve(import.meta.dirname || import.meta.url, 'src')}/`,
			},
		},
		// server: {
		// 	watch: {
		// 		usePolling: true,
		// 	},
		// },
		plugins: [
			enhancedImages(),
			deno(),
		],
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
					additionalData: `@use "@/styles/abstracts" as *;`,
					// @use "${path.resolve(import.meta.dirname || import.meta.url, './src/styles/global/root')}" as *;`,
				},
			},
		},
	},
	// build: {
	// 	inlineStylesheets: 'always',
	// },
	experimental: {
		contentIntellisense: true,
		clientPrerender: true,
	},
});
