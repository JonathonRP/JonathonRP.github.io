import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const resume = defineCollection({
    loader: glob({ pattern: "**\/*.json", base: "./src/data/resume" }),
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
        }),
        work: z.array(z.object({
            image: z.string(),
            name: z.string(),
            location: z.string().optional(),
            description: z.string().optional(),
            position: z.string().optional(),
            url: z.string().url().optional(),
            startDate: z.string(),
            endDate: z.string().optional(),
            useSummary: z.boolean(),
            summary: z.string(),
            highlights: z.array(z.string())
        })),
        volunteer: z.array(z.object({
            organization: z.string(),
            position: z.string(),
            url: z.string().url(),
            startDate: z.string().date(),
            endDate: z.string().date(),
            summary: z.string(),
            hightlights: z.array(z.string())
        })).optional(),
        education: z.array(z.object({
            image: z.string(),
            institution: z.string(),
            url: z.string().url().optional(),
            area: z.string(),
            studyType: z.string(),
            startDate: z.string().date().optional(),
            endDate: z.string(),
            summary: z.string().optional(),
            score: z.string().optional(),
            courses: z.array(z.string()).optional()
        })),
        awards: z.array(z.object({
            title: z.string(),
            date: z.string().date(),
            awarder: z.string(),
            summary: z.string()
        })).optional(),
        certificates: z.array(z.object({
            image: z.string(),
            name: z.string(),
            date: z.string().date(),
            url: z.string().url().optional(),
            issuer: z.string()
        })),
        publications: z.array(z.object({})).optional(),
        skills: z.array(z.object({
            category: z.string(),
            categoryTag: z.string(),
            name: z.string(),
            level: z.string().optional(),
            tag: z.string(),
            keywords: z.array(z.string())
        })),
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
        }))
    })
});

export const collections = {
    resume
}