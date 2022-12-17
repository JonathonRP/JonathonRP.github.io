/// <reference types="@auth/sveltekit" />

declare global {
    type Group<T, K extends Extract<keyof T, string | number | symbol>> = Record<K, T[]>;

    interface Array<T> {
        /**
         * Group array of objects on property indicated by func
         * @param func: property to group on.
         * @returns Group
         */
        groupBy<K extends Extract<keyof T, string | number | symbol>>(func: (item: T) => string | number | symbol): Group<T, K>
    }

    interface String {
        /**
         * kebab case
         * @returns a normalized all lower case letters with hyponized spaces string
         */
        asSlug:() => string
    }

    interface JsonResume {
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
            image: string,
            name: string,
            position: string,
            startDate: string,
            endDate?: string,
            highlights: string[]
        }[],
        certificates: {
            image: string,
            date: string,
            name: string,
            issuer: string
        }[],
        education: {
            image: string,
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
}

export {};