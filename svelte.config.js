import { site_root } from './src/lib/utils/constants.js';
import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import image from 'svelte-image';

var app_root = "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: static_adapter({
			fallback: undefined,
			pages: site_root
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
	endpointExtensions: ['.js', '.ts'],
	outDir: site_root,
	paths: {
		base: site_root,
		assets: site_root
	},
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
};

export default config;