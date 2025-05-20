import { createAstro, createComponent, renderTemplate, renderComponent, maybeRenderHead, renderSlot, Fragment, defineStyleVars, addAttribute } from '../chunks/1731093269578/astro/server.mjs';
import { website } from '../chunks/1731093269578/website.config.mjs';
import { SEO } from '../chunks/1731093269578/index3.mjs';
/* empty css                                      */
import { $$Image } from '../chunks/1731093269578/basic.mjs';
import { $$App } from '../chunks/1731093269578/app.mjs';
export { renderers } from '../chunks/1731093269578/_@astro-renderers.mjs';
import '../chunks/1731093269578/astro/assets-service.mjs';
import '../chunks/1731093269578/index.mjs';
import '../content/entry.mjs';
import 'date-fns/max';
import 'object-hash';
import '../chunks/1731093269578/index.b8273d72.mjs';
/* empty css                                      */

const $$Astro$4 = createAstro("https://JonathonRP.github.io");
const $$Content = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Content;
  const { title, body } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-mmkdsxac": true }, { "default": ($$result2) => renderTemplate`${title && renderTemplate`${maybeRenderHead()}<h2 id="title" class="title" data-astro-cid-mmkdsxac>${title}</h2>`}${body && renderTemplate`<p class="body" data-astro-cid-mmkdsxac>${body}</p>`}${renderSlot($$result2, $$slots["default"])}` })}`;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/card/Content.astro", void 0);

const $$Astro$3 = createAstro("https://JonathonRP.github.io");
const $$Index$3 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const { title, body, colSpan, rowSpan, href, colorText, height } = Astro2.props;
  const $$definedVars = defineStyleVars([{ height, colSpan, rowSpan }]);
  return renderTemplate`${maybeRenderHead()}<div class="card" data-astro-cid-3kvn2bbj${addAttribute($$definedVars, "style")}> ${renderComponent($$result, "Content", $$Content, { "title": title, "body": body, "data-astro-cid-3kvn2bbj": true }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div> `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/card/index.astro", void 0);

const $$Astro$2 = createAstro("https://JonathonRP.github.io");
const $$AboutMe = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AboutMe;
  return renderTemplate`${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 6, "title": "About me", "data-astro-cid-ogo2ci3l": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="about" aria-labelledby="title" data-astro-cid-ogo2ci3l> <div class="about__header" data-astro-cid-ogo2ci3l> <p data-astro-cid-ogo2ci3l>
I'm Reese, a full stack software developer.
<br data-astro-cid-ogo2ci3l>
My primary tools of choice includes:
</p> <ul role="list" data-astro-cid-ogo2ci3l> <li data-astro-cid-ogo2ci3l>C#</li> <li data-astro-cid-ogo2ci3l>ASP.Net</li> <li data-astro-cid-ogo2ci3l>svelte</li> <li data-astro-cid-ogo2ci3l>Astro</li> <li data-astro-cid-ogo2ci3l>Deno</li> <li data-astro-cid-ogo2ci3l>Bun</li> </ul> </div> <p data-astro-cid-ogo2ci3l>
Beyond coding, I'm passionate about design, architecture, animation and my family. A hobby of mine is play and
			collecting video games.
</p> <p data-astro-cid-ogo2ci3l>
While I have some preferred tools, I always choose the best one for the job, even if it's not on my usual list. My
			goal is to find the right solution for each project.
</p> </section> ` })} `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/AboutMe.astro", void 0);

const $$ContactsCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 4, "data-astro-cid-s2phahbk": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="contacts" aria-label="Contact Info" data-astro-cid-s2phahbk> <header data-astro-cid-s2phahbk> <h1 data-astro-cid-s2phahbk>
Let's start working together!
</h1> </header> <address data-astro-cid-s2phahbk> <h2 data-astro-cid-s2phahbk>Contact Details</h2> <p data-astro-cid-s2phahbk>jreesep@gmail.com</p> </address> <div class="contacts__links" data-astro-cid-s2phahbk> <h2 data-astro-cid-s2phahbk>Socials</h2> <ul role="list" data-astro-cid-s2phahbk> <li data-astro-cid-s2phahbk> <a${addAttribute(website.linkedinProfile, "href")} target="_blank" data-astro-cid-s2phahbk>Linkedin</a> </li> <li data-astro-cid-s2phahbk> <a${addAttribute(website.githubPage, "href")} target="_blank" data-astro-cid-s2phahbk>Github</a> </li> </ul> </div> </section> ` })} `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/ContactsCard.astro", void 0);

const $$Astro$1 = createAstro("https://JonathonRP.github.io");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const { rounded } = Astro2.props;
  const $$definedVars = defineStyleVars([{ rounded }]);
  return renderTemplate`${maybeRenderHead()}<button class="btn" data-astro-cid-n34i6mkd${addAttribute($$definedVars, "style")}> ${renderSlot($$result, $$slots["default"])} </button> `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/Button.astro", void 0);

const $$IntroCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Card", $$Index$3, { "colSpan": 3, "rowSpan": 4, "data-astro-cid-lj6tpa3g": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="intro" aria-label="Introduction" data-astro-cid-lj6tpa3g> <div class="intro__container" data-astro-cid-lj6tpa3g> <div class="intro__header" data-astro-cid-lj6tpa3g> <h6 data-astro-cid-lj6tpa3g>welcome</h6> <p data-astro-cid-lj6tpa3g>
I'm <b style="font-weight: 700" data-astro-cid-lj6tpa3g>Jonathon Reese Perry</b>, a software developer with a passion for user
					experience, animations and micro interactions
</p> </div> <div class="intro__links" data-astro-cid-lj6tpa3g> <a class="link"${addAttribute(website.githubPage, "href")} aria-label="github profile" target="_blank" data-astro-cid-lj6tpa3g> ${renderComponent($$result2, "Button", $$Button, { "aria-label": "github profile", "data-astro-cid-lj6tpa3g": true }, { "default": ($$result3) => renderTemplate` <span class="github" style="display: block; height: 1.5rem; width: 1.25rem" data-astro-cid-lj6tpa3g></span> <span data-sr-only data-astro-cid-lj6tpa3g>GitHub Profile</span> ` })} </a> <a class="link"${addAttribute(website.linkedinProfile, "href")} aria-label="linkedin profile" target="_blank" data-astro-cid-lj6tpa3g> ${renderComponent($$result2, "Button", $$Button, { "aria-label": "linkedin profile", "data-astro-cid-lj6tpa3g": true }, { "default": ($$result3) => renderTemplate` <span class="linkedin" style="display: block; height: 1.5rem; width: 1.25rem" data-astro-cid-lj6tpa3g></span> <span data-sr-only data-astro-cid-lj6tpa3g>Linkedin Profile</span> ` })} </a> </div> </div> ${renderComponent($$result2, "Image", $$Image, { "width": "300", "height": "300", "src": "/me.png", "format": "webp", "class": "intro__image", "alt": "bitmoji of Jonathon Reese Perry", "loading": "eager", "decoding": "sync", "data-astro-cid-lj6tpa3g": true })} </section> ` })} `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/IntroCard.astro", void 0);

const $$Pulse = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span class="pulse" data-astro-cid-7zzgbv55> <span class="pulse__dot" data-astro-cid-7zzgbv55></span> <span class="pulse__static-dot" data-astro-cid-7zzgbv55></span> </span> `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/Pulse.astro", void 0);

const $$Now = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 2, "data-astro-cid-duv63ooy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="now" aria-label="Now" data-astro-cid-duv63ooy> <h2 class="now__header" data-astro-cid-duv63ooy>
Now
<span data-astro-cid-duv63ooy>-</span> <a href="https://sive.rs/nowff" target="_blank" data-astro-cid-duv63ooy> <span data-astro-cid-duv63ooy>why?</span> </a> </h2> ${renderComponent($$result2, "Pulse", $$Pulse, { "data-astro-cid-duv63ooy": true })} </section> <p data-astro-cid-duv63ooy>Currently working at HealthStream.</p> ` })} `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/Now.astro", void 0);

const $$Feature = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Card", $$Index$3, { "colSpan": 2, "rowSpan": 2, "title": "" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div style="width: 100%"></div> ` })}`;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/projects/feature.astro", void 0);

const $$Feature2 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- title="Blog"
href="/blog" -->${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 2, "data-astro-cid-g43pbnot": true })} `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/projects/feature2.astro", void 0);

const $$Project2 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- title="Countries I visited"
href="travel"
colorText="text-neutral-900" -->${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 1 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="h-full w-full absolute inset-0 -z-10"></div> ` })}`;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/projects/project2.astro", void 0);

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$Index$2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index$2;
  const pageTitle = "Portfolio", metadescription = "Portfolio Showcase", slug = Astro2.url.origin, { author } = website;
  const breadcrumbs = [
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
  return renderTemplate`${renderComponent($$result, "SEO", SEO, { ...seo, "client:load": true, "client:component-hydration": "load", "client:component-path": "/workspaces/JonathonRP.github.io/src/components/SEO/index.svelte", "client:component-export": "default" })} ${maybeRenderHead()}<section aria-label="Portfolio"> <div class="bento-box"> ${renderComponent($$result, "IntroCard", $$IntroCard, {})} ${renderComponent($$result, "AboutMe", $$AboutMe, {})} ${renderComponent($$result, "ContactsCard", $$ContactsCard, {})} ${renderComponent($$result, "Feature", $$Feature, {})} <!-- projects --> ${renderComponent($$result, "Now", $$Now, {})} ${renderComponent($$result, "Project2", $$Project2, {})} ${renderComponent($$result, "Feature2", $$Feature2, {})} ${renderComponent($$result, "Card", $$Index$3, { "colSpan": 1, "rowSpan": 1 }, { "default": ($$result2) => renderTemplate` <p style="font-size: 0.75rem; line-height: 1rem">
© 2024 · Crafted with ♥️ using <a href="https://astro.build/" target="_blank" style="--link-color: rgb(245 120 120 / 1); color: var(--link-color); text-decoration: none">Astro</a> by Jonathon Reese Perry.
</p> ` })} </div> </section> `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/index.astro", void 0);

const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section aria-label="heading" data-astro-cid-kzd2vuja> <h2 id="heading" data-astro-cid-kzd2vuja>Projects</h2> <div class="projects" data-astro-cid-kzd2vuja></div> <!-- <img src="/me.png" />
    <img src="/profile.png" />
    <img src="/me.png" /> --> </section> `;
}, "/workspaces/JonathonRP.github.io/src/components/portfolio/projects/index.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AppLayout", $$App, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Portfolio", $$Index$2, {})} ${renderComponent($$result2, "ProjectsGallery", $$Index$1, {})} ` })} `;
}, "/workspaces/JonathonRP.github.io/src/pages/index.astro", void 0);

const $$file = "/workspaces/JonathonRP.github.io/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
