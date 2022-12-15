<script lang="ts">
	import config from '../../../website.config';
	import SEO from '$lib/components/SEO/index.svelte';
	import PWA from '$lib/components/PWA.svelte';
    import Navbar from '../Navbar.svelte';

	$: ({ author, siteUrl } = config);

	let title = 'Resume',
	metadescription = 'Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.';

	const breadcrumbs = [
		{
			name: 'Home',
			slug: '/'
		},
		{
			name: title,
			slug: 'resume'
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

<Navbar>
	<span slot="action-bar">
		<a  id="pdf" class="download pdf" href="/api/pdf"  title="download pdf" data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager">
			download pdf
		</a>
		<a id="word" class="download word" href="/api/word" title="download word" data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager">
			download word
		</a>
	</span>
</Navbar>

<slot />

<style lang="scss" global>
	@use '$styles/abstracts' as *;
	@use '$styles' as *;

	.download {
		position: relative;
		padding-inline: var(--default-space);
		cursor: pointer;

		&::before,
		&::after {
			margin-block: 0.425rem;
		}

		&::before {
			position: absolute;
			top: 0;
			left: calc(var(--small-space) + var(--small-space));
			transform: translate(50%, 50%);
			color: var(--text-color);
		}

		&::after {
			content: ' ';
			display: inline-block;
			height: var(--xlarge-space);
			width: var(--xlarge-space);
			border-radius: var(--small-space);
			box-shadow: 0 0 8px rgb(255 255 255 / 0.3);
			clear: both;
	
		}
	}
	
	.word::after {
		background-color: #5174a8;
	}
	.pdf::after {
		background-color: #c05757;
	}
</style>