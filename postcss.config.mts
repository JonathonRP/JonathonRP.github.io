import { autoprefixer } from "npm:autoprefixer";
import { purgecss } from 'npm:@fullhuman/postcss-purgecss';
import { cssnano } from 'npm:cssnano';

const in_dev = Deno.env.get("STAGE") === "development";

export default {
	syntax: 'postcss-scss',
	plugins: [
		// purgecss({ content: ['./public/*.html'] }),
		autoprefixer({ cascade: in_dev }),
		!in_dev && cssnano({ preset: 'advanced' })
	]
};