import { createComponent, renderTemplate, maybeRenderHead, renderComponent, addAttribute, renderSlot } from './astro/server.mjs';
import { website } from './website.config.mjs';
/* empty css                */
import { push, head, pop, attr } from './_@astro-renderers.mjs';
import { $$Basic } from './basic.mjs';

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<input class="theme-switch" id="theme-switcher" type="checkbox" hidden data-astro-cid-x3pjskd3> <label for="theme-switcher" class="theme-switch__label" aria-label="switch theme between 'light' or 'dark'" title="theme toggle" data-astro-cid-x3pjskd3></label> `;
}, "/workspaces/JonathonRP.github.io/src/components/ThemeToggle.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const { author } = website;
  return renderTemplate`${maybeRenderHead()}<nav class="navbar" data-astro-cid-5blmo7yk> <div class="nav" data-astro-cid-5blmo7yk> <a id="home" title="home" href="/" data-astro-preload data-astro-cid-5blmo7yk>Home</a> <a id="resume" title="resume" href="/resume" data-astro-preload data-astro-cid-5blmo7yk>Resume</a> </div> <div class="actions" data-astro-cid-5blmo7yk> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-5blmo7yk": true })} <a id="pdf" class="download pdf" href="resume/download/pdf"${addAttribute(`${author} Resume`, "download")} title="download resume/cv pdf" data-astro-prefetch="hover" data-astro-preload data-astro-cid-5blmo7yk></a> <a id="word" class="download word" href="resume/download/docx"${addAttribute(`${author} Resume`, "download")} title="download resume/cv word" data-astro-prefetch="hover" data-astro-preload data-astro-cid-5blmo7yk></a> </div> </nav> `;
}, "/workspaces/JonathonRP.github.io/src/components/Navbar.astro", void 0);

function PWA($$payload, $$props) {
	push();

	head($$payload, ($$payload) => {
		$$payload.out += `<meta name="theme-color"${attr("content", website.themeColor)}> <link rel="apple-touch-icon" href="/favicon.ico">`;
	});

	pop();
}

const $$App = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BasicLayout", $$Basic, {}, { "default": ($$result2) => renderTemplate`    ${renderSlot($$result2, $$slots["default"])} `, "head": ($$result2) => renderTemplate`${renderComponent($$result2, "PWA", PWA, { "slot": "head", "client:load": "svelte", "client:component-hydration": "load", "client:component-path": "@/components/PWA.svelte", "client:component-export": "default" })}${renderSlot($$result2, $$slots["head"])}`, "nav": ($$result2) => renderTemplate`${renderComponent($$result2, "Navbar", $$Navbar, { "slot": "nav" })}` })}`;
}, "/workspaces/JonathonRP.github.io/src/layouts/app.astro", void 0);

export { $$App };
