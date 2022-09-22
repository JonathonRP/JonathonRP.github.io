<script lang="ts">
	import config from '../../website.config.js';
	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';

	import defaultFeaturedImage from '/static/profile.png';
	import defaultOgImage from '/static/profile.png';
	import defaultOgSquareImage from '/static/profile.png';

	const {
		author,
		ogLanguage,
		siteLanguage,
		siteShortTitle,
		siteTitle,
		siteUrl,
		githubPage,
		linkedinProfile
	} = config;

	export let article:boolean = false;
	export let breadcrumbs: { name: string; slug: string }[] = [];
	export let entityMeta: any = null;
	export let lastUpdated = '';
	export let datePublished = '';
	export let metadescription: string;
	export let slug;
	export let title;

	const defaultAlt = 'Profile image with avatar of Jonathon Reese Perry saying Namaste';

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
		siteTitleAlt: siteShortTitle,
		siteUrl,
		title: pageTitle,
		url,
		githubPage,
		linkedinProfile
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
<Twitter />
<OpenGraph {...openGraphProps} />
<SchemaOrg {...schemaOrgProps} />
