import { Enumerable, type IndexedPredicate } from '../Enumerable';

declare module '../Enumerable' {
	interface Enumerable<T> {
		singleOrDefault(this: Enumerable<T>): T | undefined;
		// tslint:disable-next-line:unified-signatures
		singleOrDefault(
			this: Enumerable<T>,
			pred: IndexedPredicate<T>,
		): T | undefined;
	}
}

const dummy: any = {};

function singleOrDefault<T>(
	this: Enumerable<T>,
	pred: IndexedPredicate<T> = (x) => true,
): T | undefined {
	let itemCount = 0;
	let foundItem = dummy;
	let i = 0;
	for (const item of this) {
		if (pred(item, i++)) {
			++itemCount;
			if (itemCount > 1) {
				throw Error('sequence contains more than one element');
			}
			foundItem = item;
		}
	}
	if (itemCount === 1) {
		return foundItem;
	}
	return undefined;
}
Enumerable.prototype.singleOrDefault = singleOrDefault;
