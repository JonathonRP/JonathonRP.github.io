<script lang="ts">
	import website from '$lib/config/website.config';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { PUBLIC_TWITTER_USERNAME } from '$env/static/public';
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';

	import defaultFeaturedImage from '/static/profile.png';
	import defaultOgImage from '/static/profile.png';
	import defaultOgSquareImage from '/static/profile.png';
	import defaultTwitterImage from '/static/profile.png';

	export let article:boolean = false;
	export let breadcrumbs: { name: string; slug: string }[] = [];
	export let entityMeta: any = null;
	export let lastUpdated = '';
	export let datePublished = '';
	export let metadescription: string;
	export let slug;
	export let title;
	export let timeToRead:number = 0;

	const defaultAlt = 'Profile image with avatar of Jonathon Reese Perry saying Namaste',
		siteUrl = PUBLIC_SITE_URL,
		twitterUsername = PUBLIC_TWITTER_USERNAME;

	// imported props with fallback defaults
	export let featuredImage = {
		url: defaultFeaturedImage,
		alt: defaultAlt,
		width: 672,
		height: 448,
		caption: 'Profile image'
	};
	export let ogImage = {
		url: defaultOgImage,
		alt: defaultAlt
	};
	export let ogSquareImage = {
		url: defaultOgSquareImage,
		alt: defaultAlt
	};
	export let twitterImage = {
		url: defaultTwitterImage,
		alt: defaultAlt,
	};

	const {
		author,
		ogLanguage,
		siteLanguage,
		siteTitleAlt,
		siteTitle,
		githubPage,
		linkedinProfile
	} = website;
	
	const pageTitle = `${siteTitle} | ${title}`;
	const url = `${siteUrl}/${slug}`;
	const openGraphProps = {
		article,
		datePublished,
		lastUpdated,
		image: ogImage,
		squareImage: ogSquareImage,
		metadescription,
		ogLanguage,
		pageTitle,
		siteTitle,
		url,
		...(article ? { datePublished, lastUpdated } : {})
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
    	entity: {author},
		lastUpdated,
		entityMeta,
		featuredImage,
		metadescription,
		siteLanguage,
		siteTitle,
		siteTitleAlt,
		siteUrl,
		title: pageTitle,
		url,
		githubPage,
		linkedinProfile
	};
	const twitterProps = {
		article,
		author,
		twitterUsername,
		image: twitterImage,
		timeToRead,
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta
		name="robots"
		content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
	/>
	<link rel="canonical" href={url} />
</svelte:head>
<SchemaOrg {...schemaOrgProps} />
<OpenGraph {...openGraphProps} />
<Twitter {...twitterProps} />
<html lang={siteLanguage} />
