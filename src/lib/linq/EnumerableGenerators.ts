import { Enumerable } from "./Enumerable";

export default class GeneratorIterable<T> extends Enumerable<T> {
  [Symbol.iterator](): IterableIterator<T> {
    return this.gen();
  }
  constructor(gen: () => IterableIterator<T>) {
    super();
    this.gen = gen;
  }
  gen: () => IterableIterator<T>;
}

export function fromGenerator<T>(gen: () => Iterable<T>): Enumerable<T> {
  return new GeneratorIterable<T>(function* () {
    const it = gen();
    for (const x of it) {
      yield x;
    }
  });
}

export function fromIterable<T>(value: Iterable<T>): Enumerable<T> {
  return fromGenerator(function* () {
    for (const x of value) {
      yield x;
    }
  });
}
