declare module "./Enumerable" {
  type IndexedSelector<T, TOut> = (x: T, i: number) => TOut;
  type IndexedPredicate<T> = (x: T, i: number) => boolean;
  type Comparer<T> = (a: T, b: T) => number;
  type HandleImplConst<T> = T extends
    [Array<keyof T>, Array<Partial<T[keyof T]>>]
    ? readonly [[keyof T][number], Array<Partial<T[keyof T]>>]
    : T;

  interface EqualityComparer<T> {
    getHashCode: (value: T) => number;
    equals: (a: T, b: T) => boolean;
  }
}

import "./Enumerable";

/**
 * base type for all operations, can be created using the EnumerableGenerators module
 */
export abstract class Enumerable<T> implements Iterable<T> {
  public abstract [Symbol.iterator](): IterableIterator<T>;
}
