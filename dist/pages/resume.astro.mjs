import { createAstro, createComponent, renderTemplate, renderComponent, maybeRenderHead } from '../chunks/1731093269578/astro/server.mjs';
import { website } from '../chunks/1731093269578/website.config.mjs';
import { $$Index as $$Index$1 } from '../chunks/1731093269578/index2.mjs';
import { SEO } from '../chunks/1731093269578/index3.mjs';
import { $$Picture, resume } from '../chunks/1731093269578/basic.mjs';
import { $$App } from '../chunks/1731093269578/app.mjs';
import { Content } from '../chunks/1731093269578/index.mjs';
/* empty css                                      */
export { renderers } from '../chunks/1731093269578/_@astro-renderers.mjs';
import '../chunks/1731093269578/astro/assets-service.mjs';
import 'date-fns';
import 'object-hash';
import '../chunks/1731093269578/index.b8273d72.mjs';
/* empty css                                      */
import '../content/entry.mjs';
import 'date-fns/max';

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageTitle = "Resume", metadescription = "Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.", slug = "/Resume", { author } = website;
  const breadcrumbs = [
    {
      name: "Home",
      slug: Astro2.url.origin
    },
    {
      name: pageTitle,
      slug
    }
  ];
  const entityMeta = {
    url: slug,
    faviconWidth: 512,
    faviconHeight: 512,
    caption: author
  };
  const seo = {
    article: false,
    title: pageTitle,
    slug,
    entityMeta,
    breadcrumbs,
    metadescription
  };
  const data = await Content.getLatestResumeData();
  return renderTemplate`${renderComponent($$result, "AppLayout", $$App, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SEO", SEO, { ...seo, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SEO/index.svelte", "client:component-export": "default" })} ${maybeRenderHead()}<div class="resume:hidden"> ${renderComponent($$result2, "Picture", $$Picture, { "src": resume, "formats": ["avif", "webp"], "widths": [720, 1080, resume.width], "sizes": `(max-width: 360px) 720px, (max-width: 720px) 1080px, (max-width: 1080px) ${resume.width}px`, "alt": "Resume", "loading": "eager", "decoding": "async" })} </div>  ${renderComponent($$result2, "Resume", $$Index$1, { "data": data })} ` })} `;
}, "/workspaces/JonathonRP.github.io/src/pages/resume/index.astro", void 0);

const $$file = "/workspaces/JonathonRP.github.io/src/pages/resume/index.astro";
const $$url = "/resume";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
