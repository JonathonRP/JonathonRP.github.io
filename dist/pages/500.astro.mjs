import { createAstro, createComponent, renderTemplate, maybeRenderHead, addAttribute } from '../chunks/1731093269578/astro/server.mjs';
/* empty css                                    */
export { renderers } from '../chunks/1731093269578/_@astro-renderers.mjs';
import '../chunks/1731093269578/astro/assets-service.mjs';

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { returnTo } = Astro2.params;
  return renderTemplate`${maybeRenderHead()}<main data-astro-cid-5v2qf5k4> <div class="banner" data-astro-cid-5v2qf5k4> <h4 data-astro-cid-5v2qf5k4>500</h4> <div data-astro-cid-5v2qf5k4> <div data-astro-cid-5v2qf5k4>deja vu!</div> <div data-astro-cid-5v2qf5k4>Seems there was glitch in the Matrix!</div> </div> </div> <button type="button" style="color: rgba(255, 0, 0, 0.356)" data-astro-cid-5v2qf5k4> <a href="/" data-astro-cid-5v2qf5k4>Return home</a> </button> <button type="button" style="color: rgba(0, 0, 255, 0.356)" data-astro-cid-5v2qf5k4> <a${addAttribute(returnTo, "href")} data-astro-cid-5v2qf5k4>Return to previous page</a> </button> </main> `;
}, "/workspaces/JonathonRP.github.io/src/pages/500.astro", void 0);

const $$file = "/workspaces/JonathonRP.github.io/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$500,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
