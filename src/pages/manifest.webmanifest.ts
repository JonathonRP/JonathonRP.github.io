import type { APIRoute } from 'astro';
import website from '@/website.config';

export const GET: APIRoute = async () => {
	const { backgroundColor, siteTitle, themeColor, siteTitleAlt } = website;

	const manifest = {
		name: siteTitle,
		short_name: siteTitleAlt,
		description: siteTitle,
		start_url: '/',
		background_color: backgroundColor,
		theme_color: themeColor,
		display: 'standalone',
		icons: [
			// { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
			// { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
		],
	};

	return new Response(JSON.stringify(manifest), {
		status: 200,
		statusText: 'OK',
		headers: { 'Content-Type': 'application/json' },
	});
};
