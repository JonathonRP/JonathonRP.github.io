<svelte:options runes />
<script lang="ts">
	const {
		article = false,
		author,
		twitterUsername = undefined,
		image,
		timeToRead = 0,
	}: {
		article: boolean;
		author: string;
		twitterUsername: string | undefined;
		image: { url: string; alt: string };
		timeToRead: number;
	} = $props();

	/*
	 * When there is an equivalent og tag present, Twitter takes that so check OpenGraph before
	 * adding additional tags, unless you want to override OpenGraph.
	 */
</script>

<svelte:head>
	<meta name="twitter:card" content="summary_large_image" />
	{#if image}
		<meta name="twitter:image" content={image.url} />
	{/if}
	{#if twitterUsername}
		<meta name="twitter:creator" content={`@${twitterUsername}`} />
		<meta name="twitter:site" content={`@${twitterUsername}`} />
	{/if}
	<meta name="twitter:label1" content="Written by" />
	<meta name="twitter:data1" content={author} />
	{#if article && timeToRead > 0}
		<meta name="twitter:label2" content="Est. reading time" />
		<meta
			name="twitter:data2"
			content={timeToRead !== 1 ? `${timeToRead} minutes` : '1 minute'}
		/>
	{/if}
</svelte:head>
