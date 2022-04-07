import { site_root, in_prod } from './src/lib/utils/constants.js';
import static_adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import image from 'svelte-image';

var app_root = in_prod ? "/Resume" : "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: static_adapter({
			pages: site_root,
			assets: site_root,
			fallback: undefined
		}),
		prerender: {
			default: true,
			crawl: true,
			enabled:true,
			onError: 'fail',
			entries: ['*']
		}
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
			typescript: true
		}),
		image({
			breakpoints: [700, 800, 960, 1280],
			componentExtensions: ["jfif", "png"],
			compressionLevel: 1,
			imgTagExtensions: ["jfif", "png"],
			outputDir: 'images',
			publicDir: `.${site_root}/`,
			placeholder: "blur",
			quality: 80,
			sizes: [200, 400, 800, 1000, 1200],
			webpOptions: {
				quality: 80,
				lossless: true,
				force: true
			}
		})
	]
};

export default config;