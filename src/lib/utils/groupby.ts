export default Array.prototype.groupBy = function<T, K extends Extract<keyof T, string | number | symbol>>(predicate: (item: T) => K) {
    return this.reduce((hash, obj, _, __, k = predicate(obj)) => Object.assign(hash, {[k]: (hash[k] || []).concat(obj)}), {} as Record<K, T[]>);
}