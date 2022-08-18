<script lang="ts">
    import { base } from '$app/paths';
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    import { page } from '$app/stores';
</script>

<div class="action bar">
	<ThemeToggle />
    {#if $page.url === base}
    <a sveltekit:prefetch id="pdf" class="download pdf" href="./pdf"  title="download pdf">download pdf</a>
    <a sveltekit:prefetch id="word" class="download word" href="./word" title="download word">download word</a>
    {/if}
</div>

<slot />

<style lang="scss" global>
	@use 'static/styles/abstracts' as *;
	@use 'static/styles' as *;

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