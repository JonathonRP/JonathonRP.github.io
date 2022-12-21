import { PUBLIC_SITE_URL as siteUrl } from "$env/static/public";

const app = {
	appName: new URL(siteUrl).hostname.split('.')[0],
};

export { app as default };