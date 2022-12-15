<script lang="ts">
	import config from '../../../website.config';
	import SEO from '$lib/components/SEO/index.svelte';
	import PWA from '$lib/components/PWA.svelte';
    import Navbar from './Navbar.svelte';

	$: ({ author, siteUrl } = config);

	let title = 'Home',
	metadescription = 'Portfolio';

	const breadcrumbs = [
		{
			name: 'Home',
			slug: '/'
		}
	];

	const entityMeta = {
		url: `${siteUrl}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};

	const seo = {
		article: false,
		title,
		slug: '',
		entityMeta,
		breadcrumbs,
		metadescription
	};
</script>

<svelte:head>
	<SEO {...seo} />
	<PWA />
</svelte:head>

<Navbar />

<slot />

<style lang="scss" global>
	@use '$styles/abstracts' as *;
	@use '$styles' as *;

	// theme
	:root {
		&[data-theme='dark'] {
			@each $color, $value in $light {
				--#{$color}-color: #{$value};
			}
		}

		@media (prefers-color-scheme: dark) {
			@each $color, $value in $light {
				--#{$color}-color: #{$value};
			}
		}
	}
</style>