import { hashSequence } from "./hashSequence";
import { hashString } from "./hashString";

export const hash = <T>(value: T, visited?: Set<number>): number => {
  const visitedSet = visited || new Set<number>();
  const type = typeof value;
  switch (type) {
    case "string":
      return hashString(value as string);
  }

  if (type === "object") {
    if (value[Symbol.iterator]) {
      return hashSequence(value as Iterable<T>, visitedSet, hash);
    }
  }

  throw Error("not supported type: " + type);
};
