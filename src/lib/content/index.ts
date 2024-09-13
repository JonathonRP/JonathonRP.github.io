import { getCollection } from "astro:content";

export class Content {
    static async getLatestResumeData() {
        let max: number = 0;
        let current = 0;
        const entries = await getCollection('resume', ({id}) => {
            if((current = Number(id.split('/')[0])) > max) {
                max = current
            }
            return id.startsWith(`${max}/`);
        });

        return entries[0]?.data;
    }
}