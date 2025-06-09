<svelte:options runes />
<script lang="ts">
	const { labels }: { labels: string[] | string } = $props();
</script>

<p>
	{#each labels as label}
		<cite aria-label={label}>{label}{'\u0020'}</cite>
	{/each}
</p>

<style lang="scss">
	@import '@/styles/blocks/resume/_tags-catalog.scss';
</style>
