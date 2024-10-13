export { hash, linq } from './linq/index.ts';

export class Work {
	heading = undefined;
	icon = 'work';
	work = true;
	education = false;
	certificates = false;
	experience = 'professional';
}

export class Education {
	heading = {
		id: 'ed',
		title: 'Education',
	};
	icon = 'education';
	work = false;
	education = true;
	certificates = false;
	experience = undefined;
}

export class Certificates {
	heading = {
		id: 'cert',
		title: 'Certificates',
	};
	icon = 'certificates';
	work = false;
	education = false;
	certificates = true;
	experience = undefined;
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
