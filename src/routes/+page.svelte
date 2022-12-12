<script lang="ts">
	import config from '../../website.config';
	import SEO from '$lib/components/SEO/index.svelte';
	import PWA from '$lib/components/PWA.svelte';

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

<h2>Portfolio Home</h2>