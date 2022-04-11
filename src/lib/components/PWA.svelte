<script lang="ts">
	import config from '../../website.config.js';
	const { themeColor } = config;
</script>

<svelte:head>
	<meta name="theme-color" content={themeColor} />
	<link rel="apple-touch-icon" href="/static/profile.png" />
</svelte:head>