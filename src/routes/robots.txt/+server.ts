import type { RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET = (({ request, url }) => {
	const content = 
	`User-agent: *
	Disallow:
	sitemap: https://${url.origin}/sitemap.xml`;

	return new Response(content, {
		status: 200,
		statusText: 'OK',
		headers: {
			"Content-Type": "text/plain"
		}
	});
}) satisfies RequestHandler;