import { website } from '../chunks/1731093269578/website.config.mjs';
export { renderers } from '../chunks/1731093269578/_@astro-renderers.mjs';
import '../chunks/1731093269578/index.mjs';
import '../content/entry.mjs';
import 'date-fns/max';

const GET = async () => {
  const { backgroundColor, siteTitle, themeColor, siteTitleAlt } = website;
  const manifest = {
    name: siteTitle,
    short_name: siteTitleAlt,
    description: siteTitle,
    start_url: "/",
    background_color: backgroundColor,
    theme_color: themeColor,
    display: "standalone",
    icons: [
      // { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      // { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ]
  };
  return await new Response(JSON.stringify(manifest), {
    status: 200,
    statusText: "OK",
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
