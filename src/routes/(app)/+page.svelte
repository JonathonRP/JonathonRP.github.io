<script lang="ts">
	import website from '$lib/config/website.config';
	import SEO from '$lib/components/SEO';
	import PWA from '$lib/components/PWA.svelte';

	const { author } = website,
	pageTitle = 'Home',
	metadescription = 'Portfolio';

	const breadcrumbs = [
		{
			name: pageTitle,
			slug: '/'
		}
	];

	const entityMeta = {
		url: `${import.meta.env.PUBLIC_SITE_URL}/`,
		faviconWidth: 512,
		faviconHeight: 512,
		caption: author
	};

	const seo = {
		article: false,
		title: pageTitle,
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

<h2>Portfolio Home</h2>