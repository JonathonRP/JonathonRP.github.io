import * as EnumerableGenerators from "./EnumerableGenerators";
import "./extensions";

export { hash } from "./hashing";

export function linq<T>(it: Iterable<T>) {
  return EnumerableGenerators.fromIterable(it);
}
