import { Enumerable, type IndexedPredicate } from '../Enumerable';

declare module '../Enumerable' {
	interface Enumerable<T> {
		any(this: Enumerable<T>): boolean;
		// tslint:disable-next-line:unified-signatures
		any(this: Enumerable<T>, pred: IndexedPredicate<T>): boolean;
	}
}

function any<T>(this: Enumerable<T>): boolean;
function any<T>(
	this: Enumerable<T>,
	pred: IndexedPredicate<T> = (x) => true,
): boolean {
	let i = 0;
	for (const item of this) {
		if (pred(item, i++)) {
			return true;
		}
	}
	return false;
}

Enumerable.prototype.any = any;
