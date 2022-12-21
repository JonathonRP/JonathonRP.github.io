import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Post {
	_id: string;
	name: string;
	title: string;
	date: string;
	postContent: string;
	coverImage: SanityImageSource;
	slug: string
	author: {
		name: string;
		picture: SanityImageSource;
	}
}

export interface Resume {
    $schema: string,
    basics: {
        name: string,
        label: string,
        email: string,
        summary: string,
        profiles: {
            network: string,
            username: string,
            url: string
        }[]
    },
    work: {
        image: SanityImageSource,
        name: string,
        position: string,
        startDate: string,
        endDate?: string,
        highlights: string[]
    }[],
    certificates: {
        image: SanityImageSource,
        date: string,
        name: string,
        issuer: string
    }[],
    education: {
        image: SanityImageSource,
        startDate?: string,
        endDate: string,
        institution: string,
        area: string,
        studyType: string
    }[],
    skills: {
        slug?: string
        category: string,
        name: string,
        keywords: string[]
    }[],
    interests?: {
        tag?: string,
        name: string,
        keywords: string[]
    }[],
    projects: {
        type: string,
        name: string,
        description: string,
        url?: string
    }[]
}