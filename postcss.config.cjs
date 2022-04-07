const autoprefixer = require('autoprefixer'),
	purgecss = require('@fullhuman/postcss-purgecss'),
	cssnano = require('cssnano'),
	in_dev = process.env.NODE_ENV === "development";

module.exports = {
	syntax: 'postcss-scss',
	plugins: [
		// purgecss({ content: ['./public/*.html'] }),
		autoprefixer({ cascade: in_dev }),
		!in_dev && cssnano({ preset: 'advanced' })
	]
};