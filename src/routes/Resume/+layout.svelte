<script lang="ts">
	import config from '../../../website.config';
	import SEO from '$lib/components/SEO/index.svelte';
	import PWA from '$lib/components/PWA.svelte';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';

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

<div class="action bar">
	<ThemeToggle />
    <a data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager" id="pdf" class="download pdf" href="./pdf"  title="download pdf">
		download pdf
	</a>
    <a data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager" id="word" class="download word" href="./word" title="download word">
		download word
	</a>
</div>

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