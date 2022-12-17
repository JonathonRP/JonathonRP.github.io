<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
</script>

<Navbar>
	{#if $page.url.pathname == '/resume' }
		<span slot="action-bar">
			<a  id="pdf" class="download pdf" href="/api/pdf"  title="download pdf" data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager">
				download pdf
			</a>
			<a id="word" class="download word" href="/api/word" title="download word" data-sveltekit-preload-data="hover" data-sveltekit-preload-code="eager">
				download word
			</a>
		</span>
	{/if}
</Navbar>

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