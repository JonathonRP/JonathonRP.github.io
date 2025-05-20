import { createAstro, createComponent, renderTemplate, renderComponent } from '../../chunks/1731093269578/astro/server.mjs';
import { $$Index as $$Index$1 } from '../../chunks/1731093269578/index2.mjs';
import { SEO } from '../../chunks/1731093269578/index3.mjs';
import { $$Basic } from '../../chunks/1731093269578/basic.mjs';
import { Content } from '../../chunks/1731093269578/index.mjs';
import { website } from '../../chunks/1731093269578/website.config.mjs';
/* empty css                                         */
export { renderers } from '../../chunks/1731093269578/_@astro-renderers.mjs';
import '../../chunks/1731093269578/astro/assets-service.mjs';
import 'date-fns';
import 'object-hash';
import '../../chunks/1731093269578/index.b8273d72.mjs';
import '../../content/entry.mjs';
import 'date-fns/max';

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageTitle = "Resume Template", metadescription = "Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.", slug = "/template", { author } = website;
  const breadcrumbs = [
    {
      name: "Home",
      slug: Astro2.url.origin
    },
    {
      name: "Resume",
      slug: "/resume"
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
  return renderTemplate`${renderComponent($$result, "SEO", SEO, { ...seo, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SEO", "client:component-export": "default", "data-astro-cid-albppvrq": true })} ${renderComponent($$result, "BasicLayout", $$Basic, { "data-astro-cid-albppvrq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Resume", $$Index$1, { "data": data, "data-astro-cid-albppvrq": true })} ` })} `;
}, "/workspaces/JonathonRP.github.io/src/pages/resume/template/index.astro", void 0);

const $$file = "/workspaces/JonathonRP.github.io/src/pages/resume/template/index.astro";
const $$url = "/resume/template";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
