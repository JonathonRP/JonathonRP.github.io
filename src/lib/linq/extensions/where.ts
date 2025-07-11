import { Enumerable, type IndexedPredicate } from '../Enumerable';

import * as EnumerableGenerators from '../EnumerableGenerators';

declare module '../Enumerable' {
	interface Enumerable<T> {
		where(this: Enumerable<T>, pred: IndexedPredicate<T>): Enumerable<T>;
	}
}

function where<T>(
	this: Enumerable<T>,
	pred: IndexedPredicate<T>,
): Enumerable<T> {
	const src = this;
	return EnumerableGenerators.fromGenerator(function* () {
		let i = 0;
		for (const x of src) {
			if (pred(x, i++)) {
				yield x;
			}
		}
	});
}
Enumerable.prototype.where = where;
