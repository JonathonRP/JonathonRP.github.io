import { site_root } from './src/lib/utils/constants.ts';
import { Config } from '@sveltejs/kit';
import { adapter } from 'adapter';
import { preprocess } from 'npm:svelte-preprocess';
import { image } from 'npm:svelte-image';

const app_root = "";

const config = Config({
	kit: {
		adapter: adapter({
			pages: site_root,
			asserts: site_root,
			fallback: null
		}),
		paths: {
			base: app_root
		},
	},
	amp: true,
	csp: {
		directives : {
			'script-src': ['self']
		}
	},
	endpointExtensions: ['.ts'],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
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
			publicDir: `.${site_root}/`,
			quality: 80,
			webpOptions: {
				quality: 80,
				lossless: true,
				force: true
			}
		})
	]
});

export default config;