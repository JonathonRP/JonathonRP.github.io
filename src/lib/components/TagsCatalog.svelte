<script lang="ts">
	export let labels: string[];
</script>

<ul>
	{#each labels as label}
		<li aria-label="{label}">
			<tag>{label}</tag>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '../styles/abstracts/mixins' as *;

	ul {
		padding: 0;
		color: var(--accent-color);

		tag {
			float: left;
			background-color: var(--resume-bg);
			border-radius: 3px;
			margin: var(--micro-size);
			padding: var(--tiny-size);
			font-size: 0.8rem;

			@include respond-to(lg) {
				background-color: var(--primary-color);
			}
		}
	}
</style>
