<svelte:options runes />
<script lang="ts">
	import website from '@/website.config';

	import defaultFeaturedImage from '@/images/profile.png';
	import defaultOgImage from '@/images/profile.png';
	import defaultOgSquareImage from '@/images/profile.png';
	import defaultTwitterImage from '@/images/profile.png';

	import OpenGraph from './OpenGraph.svelte';
	import SchemaOrg from './SchemaOrg.svelte';
	import Twitter from './Twitter.svelte';

	const defaultAlt = 'Profile image with avatar of Jonathon Reese Perry saying Namaste';
	const siteUrl = import.meta.env?.BASE_URL;
	const { author } = website;

	const {
		article = false,
		breadcrumbs = [],
		entityMeta = null,
		lastUpdated = '',
		datePublished = '',
		metadescription,
		slug,
		title,
		timeToRead = 0,
		featuredImage = {
			url: defaultFeaturedImage.src,
			alt: defaultAlt,
			width: 672,
			height: 448,
			caption: 'Profile image',
		},
		ogImage = {
			url: defaultOgImage.src,
			alt: defaultAlt,
		},
		ogSquareImage = {
			url: defaultOgSquareImage.src,
			alt: defaultAlt,
		},
		twitterImage = {
			url: defaultTwitterImage.src,
			alt: defaultAlt,
		}
	}: {
		article: boolean;
		breadcrumbs: { name: string; slug: string }[];
		entityMeta: unknown;
		lastUpdated: string;
		datePublished: string;
		metadescription: string;
		slug: string;
		title: string;
		timeToRead: number;
		featuredImage: {
			url: typeof defaultFeaturedImage.src,
			alt: string,
			width: number,
			height: number,
			caption: string,
		};
		ogImage: {
			url: typeof defaultOgImage.src,
			alt: string,
		};
		ogSquareImage: {
			url: typeof defaultOgSquareImage.src,
			alt: string,
		};
		twitterImage: {
			url: typeof defaultTwitterImage.src,
			alt: string,
		}
	} = $props();

	const { ogLanguage, siteLanguage, siteTitleAlt, siteTitle, githubPage, linkedinProfile } = website;

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
		...(article ? { datePublished, lastUpdated } : {}),
	};
	const schemaOrgProps = {
		article,
		author,
		breadcrumbs,
		datePublished,
		entity: { author },
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
		linkedinProfile,
	};
	const twitterProps = {
		article,
		author,
		image: twitterImage,
		timeToRead,
	};
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	<link rel="canonical" href={url} />
</svelte:head>
<SchemaOrg {...schemaOrgProps} />
<OpenGraph {...openGraphProps} />
<Twitter {...twitterProps} />
