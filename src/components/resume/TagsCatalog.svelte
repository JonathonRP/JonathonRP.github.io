<svelte:options runes />
<script lang="ts">
	const { labels }: { labels: string[] | string } = $props();
</script>

<p>
	{#each labels as label}
		<cite aria-label={label}>{label}</cite>
	{/each}
</p>
