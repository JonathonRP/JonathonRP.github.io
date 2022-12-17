import type { RequestHandler } from "@sveltejs/kit";

export const GET = (({ request }) => {
	const content = 
	`User-agent: *
	Disallow:`;

	return new Response(content, {
		status: 200,
		statusText: 'OK',
		headers: {
			"Content-Type": "text/plain"
		}
	});
}) satisfies RequestHandler;