import deno from '@deno/vite-plugin';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@/': `${path.resolve(import.meta.dirname || import.meta.url, '../src')}/`,
		},
	},
	plugins: [enhancedImages(), deno(), svelte()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: `@use "@/styles/abstracts" as *;`,
				// @use "${path.resolve(import.meta.dirname || import.meta.url, './src/styles/global/root')}" as *;`,
			},
		},
	},
	build: {
		target: 'ES2022',
		lib: {
			entry: resolve(__dirname, 'main.ts'),
			name: 'json-resume-theme-emerald',
			formats: ['es'],
			fileName: 'index',
		},
		rollupOptions: {
			//   external: ["svelte"],
		},
	},
});
