import type { PageServerLoad } from './$types';
import { PUBLIC_AUTHOR as author } from '$env/static/public';

export const prerender = true;

export const load = ( async ({ url, route }) => {
    const pageTitle = 'Resume',
		metadescription = 'Hard working and detail oriented professional, seeking a software development position where I can use my skills and contribute to the growth of a company.',
		slug = route.id;

	const breadcrumbs = [
		{
			name: 'Home',
			slug: url.origin
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

    const resume = await (await fetch(await import('$lib/data/resume.json'))).json();

    return {
        seo,
        resume
    }
}) satisfies PageServerLoad;