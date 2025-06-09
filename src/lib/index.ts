export { hash, linq } from './linq/index.ts';

export type TimelineType = {
	work: Work;
	education: Education;
	certificates: Certificates;
};

export class Work {
	heading = undefined;
	icon = 'work' as const;
	experienceKind = 'professional' as const;
}

export class Education {
	heading = {
		id: 'ed',
		title: 'Education',
	} as const;
	icon = 'education' as const;
	experienceKind = undefined;
}

export class Certificates {
	heading = {
		id: 'cert',
		title: 'Certificates',
	} as const;
	icon = 'certificates' as const;
	experienceKind = undefined;
}

export function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
	return promise.then((data) => {
		return [undefined, data] as [undefined, T];
	})
		.catch((error) => {
			return [error];
		});
}

export const createLoadObserver = (handler) => {
	let waiting = 0;

	const onload = (el) => {
		waiting++;
		el.addEventListener('load', () => {
			waiting--;
			if (waiting === 0) {
				handler();
			}
		});
	};

	return onload;
};
