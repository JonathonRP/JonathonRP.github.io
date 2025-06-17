import { getEntry } from 'astro:content';

export class Content {
	static async getLatestResumeData() {
		const entry = await getEntry('resume', 'resume.json');
		return entry?.data;
	}
}
