import "./aggregate";
import WrapperIterable from "../WrapperIterable";
import ArrayIterable from "../ArrayIterable";
import {
  Enumerable,
  type EqualityComparer,
  type IndexedSelector,
} from "../Enumerable";
import { createHashTable } from "../hash-table/createHashTable";

class MapIterable<TKey, TValue> extends WrapperIterable<[TKey, TValue]> {
  private _underlyingMap: Map<TKey, TValue>;
  constructor(map: Map<TKey, TValue>) {
    /* istanbul ignore next */
    {
      super(map);
    }
    this._underlyingMap = map;
  }

  keys() {
    return new WrapperIterable(this._underlyingMap.keys());
  }

  entries() {
    return new WrapperIterable(this._underlyingMap.entries());
  }

  values() {
    return new WrapperIterable(this._underlyingMap.values());
  }

  has(v: TKey) {
    return this._underlyingMap.has(v);
  }

  get(key: TKey) {
    return this._underlyingMap.get(key);
  }

  convertToObject(this: MapIterable<string, TValue>) {
    return this.entries().aggregate({}, (acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    });
  }
}

declare module "../Enumerable" {
  interface Enumerable<T> {
    toLookup<TKey>(
      this: Enumerable<T>,
      keySelector: IndexedSelector<T, TKey>,
      equalityComparer?: EqualityComparer<TKey>,
    ): MapIterable<TKey, Enumerable<T>>;
    toLookup<TKey, TValue>(
      this: Enumerable<T>,
      keySelector: IndexedSelector<T, TKey>,
      valueSelector: IndexedSelector<T, TValue>,
      equalityComparer?: EqualityComparer<TKey>,
    ): MapIterable<TKey, Enumerable<TValue>>;
  }
}

export const isEqualityComparer = <T>(obj: any): obj is EqualityComparer<T> =>
  obj != null && typeof obj.equals === "function" &&
  typeof obj.getHashCode === "function";

const isValueSelector = <T, TValue>(
  obj: any,
): obj is IndexedSelector<T, TValue> => typeof obj === "function";

export const createComparerMap = <K, V>(
  capacity: number = 0,
  comparer?: {
    getHashCode: (value: K) => number;
    equals: (a: K, b: K) => boolean;
  },
): Map<K, V> => {
  if (!comparer) {
    return new Map<K, V>();
  }
  return createHashTable(capacity, comparer);
};

function toLookup<T, TKey>(
  this: Enumerable<T>,
  keySelector: IndexedSelector<T, TKey>,
  equalityComparer?: EqualityComparer<TKey>,
): MapIterable<TKey, Enumerable<T>>;
function toLookup<T, TKey, TValue>(
  this: Enumerable<T>,
  keySelector: IndexedSelector<T, TKey>,
  valueSelector: IndexedSelector<T, TValue>,
  equalityComparer?: EqualityComparer<TKey>,
): MapIterable<TKey, Enumerable<TValue>>;
function toLookup<T, TKey, TValue = TKey>(
  this: Enumerable<T>,
  keySelector: IndexedSelector<T, TKey>,
  valueSelectorOrEqualityComparer?:
    | IndexedSelector<T, TValue>
    | EqualityComparer<TKey>,
  equalityComparer?: EqualityComparer<TKey>,
): MapIterable<TKey, Enumerable<T | TValue>> {
  let comparer: EqualityComparer<TKey> | undefined;
  let valueSelector: IndexedSelector<T, TValue> | undefined;
  if (isEqualityComparer(valueSelectorOrEqualityComparer)) {
    comparer = valueSelectorOrEqualityComparer;
  } else {
    comparer = equalityComparer;
    if (isValueSelector<T, TValue>(valueSelectorOrEqualityComparer)) {
      valueSelector = valueSelectorOrEqualityComparer;
    }
  }

  const vs: (v: T, i: number) => T | TValue = valueSelector || ((x) => x);

  const map: Map<TKey, ArrayIterable<T | TValue>> = createComparerMap(
    0,
    comparer,
  );
  let i = 0;
  for (const item of this) {
    const currentIdx = i++;
    const key = keySelector(item, currentIdx);
    const arr: ArrayIterable<T | TValue> = map.get(key) ||
      new ArrayIterable<T | TValue>([]);
    map.set(key, arr);
    arr.push(vs(item, currentIdx));
  }
  return new MapIterable<TKey, Enumerable<T | TValue>>(map);
}
Enumerable.prototype.toLookup = toLookup;
