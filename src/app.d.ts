/// <reference types="@sveltejs/kit" />

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

    namespace App {
        interface Error {}
        interface Locals {}
        interface PageData {}
        interface Platform {}
    }
}

export {}