import type { PageServerLoad } from './$types';
import { PUBLIC_AUTHOR as author } from "$env/static/public";

export const prerender = true;


export const load = (async ({ url }) => {
    const pageTitle = 'Portfolio Landing',
		metadescription = 'Portfolio',
		slug = url.origin;

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

	const heading = await new Promise((resolve, reject) => resolve(pageTitle));

    return {
        seo,
		heading
    }
}) satisfies PageServerLoad