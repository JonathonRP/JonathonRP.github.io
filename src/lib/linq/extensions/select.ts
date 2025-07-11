import { Enumerable, type IndexedSelector } from '../Enumerable';
import GeneratorIterable from '../EnumerableGenerators';

declare module '../Enumerable' {
	interface Enumerable<T> {
		select<TOut>(
			this: Enumerable<T>,
			selector: IndexedSelector<T, TOut>,
		): Enumerable<TOut>;
	}
}

function select<T, TOut>(
	this: Enumerable<T>,
	selector: IndexedSelector<T, TOut>,
): Enumerable<TOut> {
	const src = this;
	return new GeneratorIterable(function* () {
		let c = 0;
		for (const x of src) {
			yield selector(x, c++);
		}
	});
}
Enumerable.prototype.select = select;
