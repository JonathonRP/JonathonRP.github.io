export default Array.prototype.groupBy = function<T, K extends Extract<keyof T, V>, V>(func: (item: T) => V) {

    return this.reduce((hash, obj) => {
        const key = func(obj);

        if(obj[key] === undefined) return hash;

        return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)})
    }, new Map<T[K], T[]>());
}

// let map = new Map<T[K], T[]>();

// array.forEach(item => {
//     let itemKey = item[func(item)];

//     if(!map.has(itemKey)) {
//         map.set(itemKey, array.filter(i => i[func(item)] === item[func(item)]));
//     }
// });

// return map;