import { BUILD_PATH as site_root } from '$env/static/private';
import { PUBLIC_SITE_URL as siteUrl } from '$env/static/public';
import adapter from 'https://esm.sh/@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import autoprefixer from 'https://esm.sh/autoprefixer';
import { purgecss } from 'https://esm.sh/@fullhuman/postcss-purgecss';
import { cssnano } from 'https://esm.sh/cssnano';

const in_dev = Deno.args.includes('dev');

/** @deno-type {import('https://esm.sh/@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: site_root,
			asserts: site_root,
			fallback: '404.html'
		}),
		alias: {
			'$styles': '$lib/assets/styles',
			'$images': '$lib/assets/images' // this may not be needed after sanity.io v3 included
		},
		csp: {
			directives : {
				'script-src': ['self']
			}
		},
		prerender: {
			default: false,
			origin: siteUrl,
			entries: [
				'*',
				'/resume.pdf',
				'/resume.docx',
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
				syntax: 'postcss-scss',
				plugins: [
					// purgecss({ content: ['./public/*.html'] }),
					autoprefixer({ cascade: in_dev }),
					!in_dev && cssnano({ preset: 'advanced' })
				]
			},
			preserve: ['ld+json', 'module'],
			renderSync: true,
			scss: true,
			sass: true,
			typescript: true
		})
	],

	vitePlugin: {
		experamental: {
			inspector: true
		}
	}
};

export default config;