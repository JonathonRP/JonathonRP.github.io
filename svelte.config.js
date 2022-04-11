import { site_root, in_prod } from './src/lib/utils/constants.js';
import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import image from 'svelte-image';

var app_root = in_prod ? "/Resume" : "";

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
		prerender: {
			default: true,
			crawl: true,
			enabled:true,
			onError: 'fail',
			entries: ['*']
		},
		target: "#svelteApp"
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
		base: app_root,
		assets: app_root
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true,
			scss: true,
			sass: true,
			typescript: true,
			renderSync: true
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