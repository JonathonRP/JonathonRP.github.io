import { getCollection } from 'astro:content';
import { max as maximumBetween } from 'date-fns/max';

export class Content {
	static async getLatestResumeData() {
		let max: string;
		let current: string;
		const entries = await getCollection('resume', ({ id }) => {
			current = id ?? '';
			if (maximumBetween([current, max])) {
				max = current;
			}

			return id === max;
		});

		return entries[0]?.data;
	}
}
