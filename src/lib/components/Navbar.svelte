<script lang="ts">
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<nav class="navbar">
	<div class="actions">
		<ThemeToggle />
		<slot name="action-bar" />
	</div>
</nav>