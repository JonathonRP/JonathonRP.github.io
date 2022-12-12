<script lang="ts">
	export let labels: string[] | '';
</script>

<ul>
	{#each labels as label}
		<li aria-label="{label}">
			<tag>{label}</tag>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use 'static/styles/abstracts/mixins' as *;

	ul {
		color: var(--accent-color);
		filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));

		tag {
			float: left;
			background-color: var(--resume-bg);
			border-radius: var(--large-space);
			margin: var(--micro-space);
			padding: var(--micro-space) var(--tiny-space);

			@include respond-to(sm) {
				background-color: var(--primary-color);
			}
		}

		@include respond-to(sm) {
			filter: none;
		}
	}
</style>
