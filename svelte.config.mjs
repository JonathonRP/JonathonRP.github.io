import { site_root } from './src/lib/utils/constants.ts';
import adapter from 'npm:@sveltejs/adapter-static';
import { vitePreprocess } from 'npm:@sveltejs/kit/vite';
import { image } from 'npm:svelte-image';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: site_root,
			asserts: site_root,
			fallback: null
		}),
		alias: {
			'$styles': '$lib/assets/styles',
			'$images': '$lib/assets/images'
		},
		csp: {
			directives : {
				'script-src': ['self']
			}
		},
		prerender: {
			default: true,
			entries: [
				'*',
				'/robots.txt',
				'/sitemap.xml',
				'/manifest.webmanifest'
			]
		}
	},
	
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		vitePreprocess({
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
	],

	vitePlugin: {
		experamental: {
			inspector: true
		}
	}
};

export default config;