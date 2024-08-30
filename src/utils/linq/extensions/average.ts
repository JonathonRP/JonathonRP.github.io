import { Enumerable } from '../Enumerable';

declare module '../Enumerable' {
	interface Enumerable<T> {
		average(this: Enumerable<T>): number;
	}
}

function average<T extends number>(this: Enumerable<T>): number {
	const f = this.aggregate(
		{
			tot: 0,
			count: 0,
		},
		(acc, val) => {
			acc.tot += val;
			acc.count++;
			return acc;
		}
	);
	if (f.count === 0) {
		throw Error('sequence contains no elements');
	}
	return f.tot / f.count;
}

Enumerable.prototype.average = average;
