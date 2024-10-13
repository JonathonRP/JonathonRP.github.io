import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
	// your configuration options here...
	// https://docs.astro.build/en/reference/configuration-reference/
	site: 'https://JonathonRP.github.io',
	integrations: [svelte()],
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},
	experimental: {
		serverIslands: true,
		contentLayer: true,
	},
});
