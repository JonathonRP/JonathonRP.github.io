import { type EqualityComparer } from "../Enumerable";
import { initializeArrayForCapacity } from "./initializeArrayForCapacity";
import { HashTable } from "./HashTable";

export const createHashTable = <TKey, TValue>(
  capacity: number,
  comparer: EqualityComparer<TKey>,
): HashTable<TKey, TValue> => {
  const count = 0;
  const avgBucketFill = 2;
  const idealNumBuckets = (capacity / avgBucketFill) | 0;
  const buckets: KeyValuePair<TKey, TValue>[][] = initializeArrayForCapacity<
    KeyValuePair<TKey, TValue>[]
  >(
    idealNumBuckets,
  );
  return new HashTable<TKey, TValue>(
    buckets,
    count,
    avgBucketFill,
    capacity,
    comparer,
    createHashTable,
  );
};
