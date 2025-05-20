import { decodeKey } from './chunks/1731093269578/astro/server.mjs';
import { NOOP_MIDDLEWARE_FN } from './chunks/1731093269578/astro-designed-error-pages.mjs';
import './chunks/1731093269578/astro/assets-service.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/JonathonRP.github.io/","adapterName":"","routes":[{"file":"file:///workspaces/JonathonRP.github.io/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///workspaces/JonathonRP.github.io/dist/500.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///workspaces/JonathonRP.github.io/dist/manifest.webmanifest","links":[],"scripts":[],"styles":[],"routeData":{"route":"/manifest.webmanifest","isIndex":false,"type":"endpoint","pattern":"^\\/manifest\\.webmanifest\\/?$","segments":[[{"content":"manifest.webmanifest","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/manifest.webmanifest.ts","pathname":"/manifest.webmanifest","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///workspaces/JonathonRP.github.io/dist/resume/template/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resume/template","isIndex":true,"type":"page","pattern":"^\\/resume\\/template\\/?$","segments":[[{"content":"resume","dynamic":false,"spread":false}],[{"content":"template","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resume/template/index.astro","pathname":"/resume/template","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///workspaces/JonathonRP.github.io/dist/resume/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/resume","isIndex":true,"type":"page","pattern":"^\\/resume\\/?$","segments":[[{"content":"resume","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/resume/index.astro","pathname":"/resume","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"file:///workspaces/JonathonRP.github.io/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://JonathonRP.github.io","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/JonathonRP.github.io/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/JonathonRP.github.io/src/pages/resume/index.astro",{"propagation":"none","containsHead":true}],["/workspaces/JonathonRP.github.io/src/pages/resume/download/[...file].ts",{"propagation":"none","containsHead":true}],["/workspaces/JonathonRP.github.io/src/pages/resume/template/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/manifest.webmanifest@_@ts":"pages/manifest.webmanifest.astro.mjs","\u0000@astro-page:src/pages/resume/download/[...file]@_@ts":"pages/resume/download/_---file_.astro.mjs","\u0000@astro-page:src/pages/resume/template/index@_@astro":"pages/resume/template.astro.mjs","\u0000@astro-page:src/pages/resume/index@_@astro":"pages/resume.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000virtual:empty-content":"_virtual_empty-content.mjs","\u0000@astro-renderers":"renderers.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/andromeeda.mjs":"chunks/1731093269578/andromeeda.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/aurora-x.mjs":"chunks/1731093269578/aurora-x.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/ayu-dark.mjs":"chunks/1731093269578/ayu-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/catppuccin-frappe.mjs":"chunks/1731093269578/catppuccin-frappe.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/catppuccin-latte.mjs":"chunks/1731093269578/catppuccin-latte.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/catppuccin-macchiato.mjs":"chunks/1731093269578/catppuccin-macchiato.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/catppuccin-mocha.mjs":"chunks/1731093269578/catppuccin-mocha.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/dark-plus.mjs":"chunks/1731093269578/dark-plus.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/dracula.mjs":"chunks/1731093269578/dracula.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/dracula-soft.mjs":"chunks/1731093269578/dracula-soft.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/everforest-dark.mjs":"chunks/1731093269578/everforest-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/everforest-light.mjs":"chunks/1731093269578/everforest-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-dark.mjs":"chunks/1731093269578/github-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-dark-default.mjs":"chunks/1731093269578/github-dark-default.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-dark-dimmed.mjs":"chunks/1731093269578/github-dark-dimmed.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-dark-high-contrast.mjs":"chunks/1731093269578/github-dark-high-contrast.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-light.mjs":"chunks/1731093269578/github-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-light-default.mjs":"chunks/1731093269578/github-light-default.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/github-light-high-contrast.mjs":"chunks/1731093269578/github-light-high-contrast.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/houston.mjs":"chunks/1731093269578/houston.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/kanagawa-dragon.mjs":"chunks/1731093269578/kanagawa-dragon.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/kanagawa-lotus.mjs":"chunks/1731093269578/kanagawa-lotus.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/kanagawa-wave.mjs":"chunks/1731093269578/kanagawa-wave.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/laserwave.mjs":"chunks/1731093269578/laserwave.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/light-plus.mjs":"chunks/1731093269578/light-plus.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/material-theme.mjs":"chunks/1731093269578/material-theme.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/material-theme-darker.mjs":"chunks/1731093269578/material-theme-darker.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/material-theme-lighter.mjs":"chunks/1731093269578/material-theme-lighter.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/material-theme-ocean.mjs":"chunks/1731093269578/material-theme-ocean.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/material-theme-palenight.mjs":"chunks/1731093269578/material-theme-palenight.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/min-dark.mjs":"chunks/1731093269578/min-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/min-light.mjs":"chunks/1731093269578/min-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/monokai.mjs":"chunks/1731093269578/monokai.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/night-owl.mjs":"chunks/1731093269578/night-owl.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/nord.mjs":"chunks/1731093269578/nord.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/one-dark-pro.mjs":"chunks/1731093269578/one-dark-pro.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/one-light.mjs":"chunks/1731093269578/one-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/plastic.mjs":"chunks/1731093269578/plastic.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/poimandres.mjs":"chunks/1731093269578/poimandres.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/red.mjs":"chunks/1731093269578/red.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/rose-pine.mjs":"chunks/1731093269578/rose-pine.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/rose-pine-dawn.mjs":"chunks/1731093269578/rose-pine-dawn.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/rose-pine-moon.mjs":"chunks/1731093269578/rose-pine-moon.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/slack-dark.mjs":"chunks/1731093269578/slack-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/slack-ochin.mjs":"chunks/1731093269578/slack-ochin.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/snazzy-light.mjs":"chunks/1731093269578/snazzy-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/solarized-dark.mjs":"chunks/1731093269578/solarized-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/solarized-light.mjs":"chunks/1731093269578/solarized-light.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/synthwave-84.mjs":"chunks/1731093269578/synthwave-84.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/tokyo-night.mjs":"chunks/1731093269578/tokyo-night.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/vesper.mjs":"chunks/1731093269578/vesper.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/vitesse-black.mjs":"chunks/1731093269578/vitesse-black.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/vitesse-dark.mjs":"chunks/1731093269578/vitesse-dark.mjs","/workspaces/JonathonRP.github.io/node_modules/.deno/shiki@1.22.1/node_modules/shiki/dist/themes/vitesse-light.mjs":"chunks/1731093269578/vitesse-light.mjs","\u0000@astrojs-manifest":"manifest_De1XApq7.mjs","@/components/SEO":"_astro/SEO.37jkIgAU.js","@/components/SEO/index.svelte":"_astro/index.37jkIgAU.js","/workspaces/JonathonRP.github.io/src/components/SEO/index.svelte":"_astro/index.BW7kDL7q.js","@/components/PWA.svelte":"_astro/PWA.DPZ75lr9.js","astro:scripts/page.js":"_astro/page.DFCllIDl.js","@astrojs/svelte/client-v5.js":"_astro/client-v5.BsVxN7ju.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/page.DFCllIDl.js","/file:///workspaces/JonathonRP.github.io/dist/404.html","/file:///workspaces/JonathonRP.github.io/dist/500.html","/file:///workspaces/JonathonRP.github.io/dist/manifest.webmanifest","/file:///workspaces/JonathonRP.github.io/dist/resume/template/index.html","/file:///workspaces/JonathonRP.github.io/dist/resume/index.html","/file:///workspaces/JonathonRP.github.io/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"zcqAzOPk9hvnv1rl+hqnOkvzXZA5L/w6e64ARRYPVtA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
