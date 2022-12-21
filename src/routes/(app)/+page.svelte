<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/components/SEO';

	export let data:PageData;
</script>

<SEO {...data.seo} />

<h2>data.heading</h2>