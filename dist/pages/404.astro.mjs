import { createAstro, createComponent, renderTemplate, maybeRenderHead, addAttribute } from '../chunks/1731093269578/astro/server.mjs';
/* empty css                                    */
export { renderers } from '../chunks/1731093269578/_@astro-renderers.mjs';
import '../chunks/1731093269578/astro/assets-service.mjs';

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { returnTo } = Astro2.params;
  return renderTemplate`${maybeRenderHead()}<main data-astro-cid-zetdm5md> <div class="banner" data-astro-cid-zetdm5md> <h4 data-astro-cid-zetdm5md>404</h4> <div data-astro-cid-zetdm5md> <div data-astro-cid-zetdm5md>deja vu!</div> <div data-astro-cid-zetdm5md>Seems there was glitch in the Matrix!</div> </div> </div> <button type="button" style="color: rgba(255, 0, 0, 0.356)" data-astro-cid-zetdm5md> <a href="/" data-astro-cid-zetdm5md>Return home</a> </button> <button type="button" style="color: rgba(0, 0, 255, 0.356)" data-astro-cid-zetdm5md> <a${addAttribute(returnTo, "href")} data-astro-cid-zetdm5md>Return to previous page</a> </button> </main> `;
}, "/workspaces/JonathonRP.github.io/src/pages/404.astro", void 0);

const $$file = "/workspaces/JonathonRP.github.io/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
