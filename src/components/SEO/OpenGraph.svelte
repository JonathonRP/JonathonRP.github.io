<svelte:options runes />
<script lang="ts">
	const {
		article = false,
		datePublished,
		lastUpdated,
		facebookAuthorPage = '',
		facebookPage = '',
		image,
		squareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
	}: {
		article: boolean;
		datePublished: string;
		lastUpdated: string;
		facebookAuthorPage?: string;
		facebookPage?: string;
		image: { url: string; alt: string };
		squareImage: { url: string; alt: string };
		metadescription: string;
		ogLanguage: string;
		pageTitle: string;
		siteTitle: string;
		url: string;
	} = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:locale" content={ogLanguage} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={article ? 'article' : 'website'} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metadescription} />
	{#if image}
		<meta property="og:image" content={image.url} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="627" />
		<meta property="og:image:alt" content={image.alt} />
	{/if}
	{#if squareImage}
		<meta property="og:image" content={squareImage.url} />
		<meta property="og:image:width" content="400" />
		<meta property="og:image:height" content="400" />
		<meta property="og:image:alt" content={squareImage.alt} />
	{/if}
	{#if article}
		<meta property="article:publisher" content={facebookPage} />
		<meta property="article:author" content={facebookAuthorPage} />
		<meta property="article:published_time" content={datePublished} />
		<meta property="article:modified_time" content={lastUpdated} />
	{/if}
</svelte:head>
