import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const content = `User-agent: *
	Disallow:
	sitemap: https://${url.origin}/sitemap.xml`;

  return new Response(content, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
