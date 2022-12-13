import { site_root } from './src/lib/utils/constants.ts';
import adapter from '@sveltejs/adapter-auto';
import { preprocess } from 'npm:svelte-preprocess';
import { image } from 'npm:svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: site_root,
			asserts: site_root,
			fallback: null
		}),
		csp: {
			directives : {
				'script-src': ['self']
			}
		},
		alias: {
			'$styles': '$lib/assets/styles',
			'$images': '$lib/assets/images'
		}
	},
	
	vitePlugin: {
		experamental: {
			inspector: true
		}
	},

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				configFilePath: "./postcss.config.mjs"
			},
			preserve: ['ld+json', 'module'],
			renderSync: true,
			scss: true,
			sass: true,
			typescript: true
		}),
		image({
			componentExtensions: ["jfif", "png"],
			compressionLevel: 1,
			imgTagExtensions: ["jfif", "png"],
			outputDir: 'images',
			publicDir: site_root,
			quality: 80,
			webpOptions: {
				quality: 80,
				lossless: true,
				force: true
			}
		})
	]
};

export default config;