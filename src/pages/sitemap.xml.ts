import type { APIRoute } from "astro";

const render = (pages: Array<string>): string =>
  `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
	>
	${
    pages
      .map(
        (element) => `
	<url>
	  <loc>${element}</loc>
	  <lastmod>${import.meta.env.VITE_BUILD_TIME}</lastmod>
	</url>`,
      )
      .join("\n")
  }
</urlset>`;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const xml = render(["", "/Resume"]);

    return new Response(xml, {
      status: 200,
      statusText: "OK",
      headers: {
        "Cache-Control": `max-age=0, s-max-age=600`,
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error(`Error in sitemap.xml: ${err}`);
    return new Response(err, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
