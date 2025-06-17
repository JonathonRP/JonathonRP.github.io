// import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { GIST_ID, GITHUB_TOKEN } from 'astro:env/server';

const resume = defineCollection({
	// loader: glob({ pattern: '**/[^_]*.{resume.jsonc,resume.json}', base: './src/data/resume' }),
	loader: {
		name: 'jsonresume-loader',
		load: async ({ logger, parseData, store }) => {
			const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
				headers: {
					'Accept': 'application/vnd.github.raw+json',
					'User-Agent': 'Astro Resume Loader',
					'Authorization': `Bearer ${GITHUB_TOKEN}`,
					'X-GitHub-Api-Version': '2022-11-28',
				},
			});

			const data = await response.json();
			if (!response.ok || !data.files || !data.files['resume.json']) {
				throw new Error(
					`Failed to fetch resume data from GitHub Gist: ${response.status} ${response.statusText} ${response.headers} ${response.url}`,
					{
						cause: data,
					},
				);
			}
			const id = data.files['resume.json'].filename;
			store.set({
				id,
				data: await parseData({ id, data: JSON.parse(data.files['resume.json'].content) }),
			});
			logger.info(`Loaded resume data from Gist: ${data.files['resume.json'].filename}`);
		},
		schema: z.object({
			basics: z.object({
				name: z.string(),
				label: z.string(),
				image: z.string().url().optional(),
				email: z.string().email(),
				phone: z.string().optional(),
				url: z.string().url().optional(),
				summary: z.string(),
				location: z.object({
					address: z.string(),
					postalCode: z.string(),
					city: z.string(),
					countryCode: z.string(),
					region: z.string(),
				}).optional(),
				profiles: z.array(z.object({
					network: z.string(),
					username: z.string(),
					url: z.string().url(),
				})),
			}).optional(),
			work: z.array(z.object({
				image: z.string(),
				name: z.string(),
				location: z.string().optional(),
				description: z.string().optional(),
				position: z.string().optional(),
				url: z.string().url().optional(),
				startDate: z.string().optional(),
				endDate: z.string().optional(),
				summary: z.string().optional(),
				highlights: z.array(z.string()),
			})).optional(),
			volunteer: z.array(z.object({
				organization: z.string(),
				position: z.string(),
				url: z.string().url(),
				startDate: z.string().date(),
				endDate: z.string().date(),
				summary: z.string(),
				hightlights: z.array(z.string()),
			})).optional(),
			education: z.array(z.object({
				image: z.string(),
				institution: z.string(),
				url: z.string().url().optional(),
				area: z.string(),
				studyType: z.string(),
				startDate: z.string().optional(),
				endDate: z.string().optional(),
				summary: z.string().optional(),
				score: z.string().optional(),
				courses: z.array(z.string()).optional(),
			})).optional(),
			awards: z.array(z.object({
				title: z.string(),
				date: z.string().date(),
				awarder: z.string(),
				summary: z.string(),
			})).optional(),
			certificates: z.array(z.object({
				image: z.string(),
				name: z.string(),
				date: z.string().optional(),
				url: z.string().url().optional(),
				issuer: z.string(),
			})).optional(),
			publications: z.array(z.object({})).optional(),
			skills: z.array(z.object({
				category: z.string(),
				categoryTag: z.string(),
				name: z.string(),
				level: z.string().optional(),
				tag: z.string(),
				keywords: z.array(z.string()),
			})).optional(),
			languages: z.array(z.object({})).optional(),
			interests: z.array(z.object({})).optional(),
			reference: z.array(z.object({})).optional(),
			projects: z.array(z.object({
				type: z.string(),
				name: z.string(),
				description: z.string(),
				hightlights: z.array(z.string()).optional(),
				keywords: z.array(z.string()).optional(),
				url: z.string().url().optional(),
				startDate: z.string().date().optional(),
				endDate: z.string().date().optional(),
				roles: z.array(z.string()).optional(),
				entity: z.string().optional(),
			})).optional(),
		}),
	},
});

export const collections = {
	resume,
};
