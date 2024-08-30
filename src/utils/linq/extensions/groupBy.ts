import { Enumerable, type HandleImplConst, type EqualityComparer, type IndexedSelector } from '../Enumerable';
import WrapperIterable from '../WrapperIterable';

class GroupedIterable<TKey, TValue> extends WrapperIterable<TValue> {
	private _key: any;
	get key(): TKey {
		return this._key;
	}
	constructor(key: TKey, it: Iterable<TValue>) {
		/* istanbul ignore next */
		{
			super(it);
		}
		this._key = key;
	}
}

declare module '../Enumerable' {
	interface Enumerable<T> {
		groupBy<TKey>(
			this: Enumerable<T>,
			keySelector: IndexedSelector<T, TKey>,
			equalityComparer?: EqualityComparer<TKey>
		): Enumerable<HandleImplConst<GroupedIterable<TKey, T>>>;
	}
}

function groupBy<T, TKey>(
	this: Enumerable<T>,
	keySelector: IndexedSelector<T, TKey>,
	equalityComparer?: EqualityComparer<TKey>
): Enumerable<HandleImplConst<GroupedIterable<TKey, T>>> {
	const lookup = this.toLookup(keySelector, equalityComparer);

	return lookup.select(([key, value]) => {
		return new GroupedIterable(key, value);
	});
}

Enumerable.prototype.groupBy = groupBy;
