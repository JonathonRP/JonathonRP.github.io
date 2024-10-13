import GeneratorIterable from '../EnumerableGenerators';
import { type Comparer, Enumerable } from '../Enumerable';

export interface BuildableComparer<T> {
	build(): Comparer<T>;
}
interface BaseComparerBuilder<T> extends BuildableComparer<T> {
	sortKey<TComparable>(selector: (x: T) => TComparable): ThenComparerBuilder<T>;
	sortKeyDescending<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T>;
}
export interface ThenComparerBuilder<T> extends BuildableComparer<T> {
	thenKey<TComparable>(selector: (x: T) => TComparable): ThenComparerBuilder<T>;
	thenKeyDescending<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T>;
}
export class ComparerBuilder<T> implements BaseComparerBuilder<T>, ThenComparerBuilder<T> {
	static create<T>(): ComparerBuilder<T> {
		return new ComparerBuilder<T>();
	}
	thenKey<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T> {
		return this.sortKey(selector);
	}
	thenKeyDescending<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T> {
		return this.sortKeyDescending(selector);
	}
	private comparers: Comparer<T>[];

	constructor(comparers: Array<Comparer<T>> | undefined = undefined) {
		this.comparers = comparers || [];
	}
	sortKey<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T> {
		const c = this.createComparer(
			selector,
			(a, b) => (a < b ? -1 : a > b ? 1 : 0),
		);
		const newComparers = [...this.comparers];
		newComparers.push(c);
		return new ComparerBuilder<T>(newComparers);
	}
	sortKeyDescending<TComparable>(
		selector: (x: T) => TComparable,
	): ThenComparerBuilder<T> {
		const c = this.createComparer(
			selector,
			(a, b) => (a < b ? 1 : a > b ? -1 : 0),
		);
		const newComparers = [...this.comparers];
		newComparers.push(c);
		return new ComparerBuilder<T>(newComparers);
	}

	private createComparer<TComparable>(
		selector: (x: T) => TComparable,
		comparer: Comparer<TComparable>,
	): Comparer<T> {
		return (a, b) => {
			const cmpA = selector(a);
			const cmpB = selector(b);
			return comparer(cmpA, cmpB);
		};
	}

	build(): Comparer<T> {
		return (a, b) => {
			for (let i = 0; i < this.comparers.length; i++) {
				const comparer = this.comparers[i];
				const comparison = comparer(a, b);
				if (comparison !== 0) {
					return comparison;
				}
			}

			return 0;
		};
	}
}

export interface OrderedItem<T> {
	item: T;
	orders: any[];
}
export default class OrderedIterable<T> extends GeneratorIterable<T> {
	private src: Enumerable<OrderedItem<T>>;
	private comparerBuilder: ThenComparerBuilder<OrderedItem<T>>;
	private depth: number;
	constructor(
		src: Enumerable<OrderedItem<T>>,
		comparerBuilder: ThenComparerBuilder<OrderedItem<T>>,
		depth: number = 0,
	) {
		const comparer = comparerBuilder.build();
		/* istanbul ignore next */
		{
			super(function* () {
				const arr = [...src].sort(comparer);
				for (const x of arr) {
					yield x.item;
				}
			});
		}
		this.src = src;
		this.comparerBuilder = comparerBuilder;
		this.depth = depth;
	}

	public thenBy<TCmp>(selector: (x: T) => TCmp): OrderedIterable<T> {
		const wrapped: Enumerable<OrderedItem<T>> = this.src.select((item) => ({
			...item,
			orders: [...item.orders, selector(item.item)],
		}));
		const newBuilder = this.comparerBuilder.thenKey((x) => x.orders[this.depth + 1]);
		return new OrderedIterable(wrapped, newBuilder, this.depth + 1);
	}
	public thenByDescending<TCmp>(selector: (x: T) => TCmp): OrderedIterable<T> {
		const wrapped: Enumerable<OrderedItem<T>> = this.src.select((item) => ({
			...item,
			orders: [...item.orders, selector(item.item)],
		}));
		const newBuilder = this.comparerBuilder.thenKeyDescending((x) => x.orders[this.depth + 1]);
		return new OrderedIterable(wrapped, newBuilder, this.depth + 1);
	}
}

declare module '../Enumerable' {
	interface Enumerable<T> {
		orderBy<TCmp>(
			this: Enumerable<T>,
			selector: (x: T) => TCmp,
		): OrderedIterable<T>;
	}
}

function orderBy<T, TCmp>(
	this: Enumerable<T>,
	selector: (x: T) => TCmp,
): OrderedIterable<T> {
	const wrapped: Enumerable<OrderedItem<T>> = this.select((item) => ({
		item,
		orders: [selector(item)],
	}));
	const builder = ComparerBuilder.create<OrderedItem<T>>().sortKey((x) => x.orders[0]);
	return new OrderedIterable<T>(wrapped, builder);
}
Enumerable.prototype.orderBy = orderBy;
