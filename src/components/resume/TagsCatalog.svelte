<svelte:options runes />
<script lang="ts">
	const { labels }: { labels: string[] | string } = $props();
</script>

<p>
	{#each labels as label}
		<cite aria-label={label}>{label}</cite>
	{/each}
</p>

<style lang="scss">

	p {
		color: var(--accent-color);
		// filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
		margin-inline-start: var(--tiny-space);

		cite {
			font-style: normal;
			float: left;
			// background-color: var(--resume-bg);
			background-color: var(--primary-color);
			border-radius: var(--large-space);
			margin: var(--micro-space);
			padding: var(--micro-space) var(--tiny-space);

			// @include respond-to(sm) {
			// 	background-color: var(--primary-color);
			// }
		}

		// @include respond-to(sm) {
		// 	filter: none;
		// }
	}
</style>
