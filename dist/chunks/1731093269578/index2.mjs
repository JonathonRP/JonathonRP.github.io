import { createAstro, createComponent, renderTemplate, maybeRenderHead, addAttribute, renderComponent, Fragment } from './astro/server.mjs';
import { spread_attributes, attr, escape_html, stringify, ensure_array_like } from './_@astro-renderers.mjs';
import { $$Image } from './basic.mjs';
import { format, parseISO } from 'date-fns';

class Enumerable {
}

class GeneratorIterable extends Enumerable {
  [Symbol.iterator]() {
    return this.gen();
  }
  constructor(gen) {
    super();
    this.gen = gen;
  }
  gen;
}
function fromGenerator(gen) {
  return new GeneratorIterable(function* () {
    const it = gen();
    for (const x of it) {
      yield x;
    }
  });
}
function fromIterable(value) {
  return fromGenerator(function* () {
    for (const x of value) {
      yield x;
    }
  });
}

function aggregate(seed, aggFunc) {
  let v = seed;
  let i = 0;
  for (const item of this) {
    v = aggFunc(v, item, i++);
  }
  return v;
}
Enumerable.prototype.aggregate = aggregate;

function any(pred = (x) => true) {
  let i = 0;
  for (const item of this) {
    if (pred(item, i++)) {
      return true;
    }
  }
  return false;
}
Enumerable.prototype.any = any;

function average() {
  const f = this.aggregate(
    {
      tot: 0,
      count: 0
    },
    (acc, val) => {
      acc.tot += val;
      acc.count++;
      return acc;
    }
  );
  if (f.count === 0) {
    throw Error("sequence contains no elements");
  }
  return f.tot / f.count;
}
Enumerable.prototype.average = average;

function forEach(action) {
  const src = this;
  let i = 0;
  for (const x of src) {
    const currentIdx = i++;
    action(x, currentIdx);
  }
}
Enumerable.prototype.forEach = forEach;

class WrapperIterable extends GeneratorIterable {
  constructor(it) {
    {
      super(function* () {
        for (const x of it) {
          yield x;
        }
      });
    }
  }
}

class GroupedIterable extends WrapperIterable {
  _key;
  get key() {
    return this._key;
  }
  constructor(key, it) {
    {
      super(it);
    }
    this._key = key;
  }
}
function groupBy(keySelector, equalityComparer) {
  const lookup = this.toLookup(keySelector, equalityComparer);
  return lookup.select(([key, value]) => {
    return new GroupedIterable(key, value);
  });
}
Enumerable.prototype.groupBy = groupBy;

function where(pred) {
  const src = this;
  return fromGenerator(function* () {
    let i = 0;
    for (const x of src) {
      if (pred(x, i++)) {
        yield x;
      }
    }
  });
}
Enumerable.prototype.where = where;

class ComparerBuilder {
  static create() {
    return new ComparerBuilder();
  }
  thenKey(selector) {
    return this.sortKey(selector);
  }
  thenKeyDescending(selector) {
    return this.sortKeyDescending(selector);
  }
  comparers;
  constructor(comparers = void 0) {
    this.comparers = comparers || [];
  }
  sortKey(selector) {
    const c = this.createComparer(
      selector,
      (a, b) => a < b ? -1 : a > b ? 1 : 0
    );
    const newComparers = [...this.comparers];
    newComparers.push(c);
    return new ComparerBuilder(newComparers);
  }
  sortKeyDescending(selector) {
    const c = this.createComparer(
      selector,
      (a, b) => a < b ? 1 : a > b ? -1 : 0
    );
    const newComparers = [...this.comparers];
    newComparers.push(c);
    return new ComparerBuilder(newComparers);
  }
  createComparer(selector, comparer) {
    return (a, b) => {
      const cmpA = selector(a);
      const cmpB = selector(b);
      return comparer(cmpA, cmpB);
    };
  }
  build() {
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
class OrderedIterable extends GeneratorIterable {
  src;
  comparerBuilder;
  depth;
  constructor(src, comparerBuilder, depth = 0) {
    const comparer = comparerBuilder.build();
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
  thenBy(selector) {
    const wrapped = this.src.select((item) => ({
      ...item,
      orders: [...item.orders, selector(item.item)]
    }));
    const newBuilder = this.comparerBuilder.thenKey((x) => x.orders[this.depth + 1]);
    return new OrderedIterable(wrapped, newBuilder, this.depth + 1);
  }
  thenByDescending(selector) {
    const wrapped = this.src.select((item) => ({
      ...item,
      orders: [...item.orders, selector(item.item)]
    }));
    const newBuilder = this.comparerBuilder.thenKeyDescending((x) => x.orders[this.depth + 1]);
    return new OrderedIterable(wrapped, newBuilder, this.depth + 1);
  }
}
function orderBy(selector) {
  const wrapped = this.select((item) => ({
    item,
    orders: [selector(item)]
  }));
  const builder = ComparerBuilder.create().sortKey((x) => x.orders[0]);
  return new OrderedIterable(wrapped, builder);
}
Enumerable.prototype.orderBy = orderBy;

function select(selector) {
  const src = this;
  return new GeneratorIterable(function* () {
    let c = 0;
    for (const x of src) {
      yield selector(x, c++);
    }
  });
}
Enumerable.prototype.select = select;

function selectMany(selector) {
  const src = this;
  return fromGenerator(function* () {
    let i = 0;
    for (const seq of src) {
      for (const item of selector(seq, i++)) {
        yield item;
      }
    }
  });
}
Enumerable.prototype.selectMany = selectMany;

function firstOrDefault(pred = () => true) {
  let i = 0;
  for (const item of this) {
    if (pred(item, i++)) {
      return item;
    }
  }
  return void 0;
}
Enumerable.prototype.firstOrDefault = firstOrDefault;

const dummy = {};
function singleOrDefault(pred = (x) => true) {
  let itemCount = 0;
  let foundItem = dummy;
  let i = 0;
  for (const item of this) {
    if (pred(item, i++)) {
      ++itemCount;
      if (itemCount > 1) {
        throw Error("sequence contains more than one element");
      }
      foundItem = item;
    }
  }
  if (itemCount === 1) {
    return foundItem;
  }
  return void 0;
}
Enumerable.prototype.singleOrDefault = singleOrDefault;

function toArray() {
  return [...this];
}
Enumerable.prototype.toArray = toArray;

class ArrayIterable extends GeneratorIterable {
  // @propertyIsEnumerable(false)
  _underlyingArray;
  constructor(arr) {
    {
      super(function* () {
        for (const x of arr) {
          yield x;
        }
      });
    }
    this._underlyingArray = arr;
  }
  push(item) {
    this._underlyingArray.push(item);
  }
}

const primes = [
  3,
  7,
  11,
  17,
  23,
  29,
  37,
  47,
  59,
  71,
  89,
  107,
  131,
  163,
  197,
  239,
  293,
  353,
  431,
  521,
  631,
  761,
  919,
  1103,
  1327,
  1597,
  1931,
  2333,
  2801,
  3371,
  4049,
  4861,
  5839,
  7013,
  8419,
  10103,
  12143,
  14591,
  17519,
  21023,
  25229,
  30293,
  36353,
  43627,
  52361,
  62851,
  75431,
  90523,
  108631,
  130363,
  156437,
  187751,
  225307,
  270371,
  324449,
  389357,
  467237,
  560689,
  672827,
  807403,
  968897,
  1162687,
  1395263,
  1674319,
  2009191,
  2411033,
  2893249,
  3471899,
  4166287,
  4999559,
  5999471,
  7199369
];

const initializeArrayForCapacity = (capacity) => {
  for (const p of primes) {
    if (p >= capacity) {
      return new Array(p);
    }
  }
  throw Error("too large");
};

const mod = (x, n) => (x % n + n) % n;
const getBucket = (key, buckets, { getHashCode }, create = false) => {
  const h = getHashCode(key);
  const bucketIndex = mod(h, buckets.length);
  const bucket = buckets[bucketIndex];
  return bucket ? bucket : create ? buckets[bucketIndex] = [] : null;
};

const resize = (count, buckets, { equals, getHashCode }, hashTableFactory) => {
  const keyValuePairs = fromIterable(buckets).where((b) => typeof b !== "undefined").selectMany((b) => b);
  const newHashTable = hashTableFactory(count, { equals, getHashCode });
  keyValuePairs.forEach(([k, v, i]) => newHashTable.add(k, v, i));
  return newHashTable.buckets;
};

class HashTable {
  buckets;
  count;
  avgBucketFill;
  comparer;
  insertCount;
  initialCapacity;
  hashTableFactory;
  constructor(buckets, count, avgBucketFill, initialCapacity, comparer, hashTableFactory) {
    this.buckets = buckets;
    this.count = count;
    this.avgBucketFill = avgBucketFill;
    this.comparer = comparer;
    this.insertCount = 0;
    this.initialCapacity = initialCapacity;
    this.hashTableFactory = hashTableFactory;
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  entries() {
    const r = [
      ...fromIterable(this.buckets).selectMany((x) => x || []).orderBy(([, , i]) => i).select(([k, v]) => [k, v])
    ];
    return r[Symbol.iterator]();
  }
  keys() {
    const r = [...fromIterable(this.entries()).select(([k]) => k)];
    return r[Symbol.iterator]();
  }
  values() {
    const r = [...fromIterable(this.entries()).select(([, v]) => v)];
    return r[Symbol.iterator]();
  }
  clear() {
    const buckets = this.hashTableFactory(this.initialCapacity, this.comparer).buckets;
    this.buckets = buckets;
    this.count = 0;
    this.insertCount = 0;
  }
  delete(key) {
    const bucket = getBucket(key, this.buckets, this.comparer);
    if (bucket === null) {
      return false;
    }
    const idx = fromIterable(bucket).select(([k, v], i) => ({ k, v, i })).where(({ k }) => this.comparer.equals(k, key)).select(({ i }) => i).singleOrDefault();
    if (typeof idx === "undefined") {
      return false;
    }
    bucket.splice(idx, 1);
    --this.count;
    return true;
  }
  forEach(callbackfn, thisArg) {
    const cb = thisArg ? callbackfn.bind(thisArg) : callbackfn;
    fromIterable(this.entries()).forEach(([k, v]) => cb(v, k, this));
  }
  set(key, value) {
    this.add(key, value);
    return this;
  }
  has(key) {
    const bucket = getBucket(key, this.buckets, this.comparer);
    if (bucket === null) {
      return false;
    }
    return fromIterable(bucket).any(([k]) => this.comparer.equals(k, key));
  }
  get size() {
    return this.count;
  }
  add(key, value, insertIndex) {
    const idealNumBuckets = this.count / this.avgBucketFill | 0;
    if (idealNumBuckets >= this.buckets.length) {
      this.buckets = resize(
        this.count * 2,
        this.buckets,
        this.comparer,
        this.hashTableFactory
      );
    }
    const bucket = getBucket(key, this.buckets, this.comparer, true);
    const keyExists = !bucket.every(([bkey]) => !this.comparer.equals(key, bkey));
    if (keyExists) {
      return false;
    }
    this.count++;
    bucket.push([
      key,
      value,
      typeof insertIndex === "undefined" ? this.insertCount++ : insertIndex
    ]);
    return true;
  }
  get(key) {
    const bucket = getBucket(key, this.buckets, this.comparer);
    return bucket ? fromIterable(bucket).where(([k]) => this.comparer.equals(k, key)).select(([, v]) => v).firstOrDefault() : void 0;
  }
  [Symbol.toStringTag];
  /* istanbul ignore next */
  toString() {
    const counts = fromIterable(this.buckets).select((b) => b ? b.length : 0);
    const avgBucketFill = counts.average();
    return JSON.stringify(
      { counts: [...counts].join(","), avgBucketFill },
      null,
      2
    );
  }
}

const createHashTable = (capacity, comparer) => {
  const count = 0;
  const avgBucketFill = 2;
  const idealNumBuckets = capacity / avgBucketFill | 0;
  const buckets = initializeArrayForCapacity(
    idealNumBuckets
  );
  return new HashTable(
    buckets,
    count,
    avgBucketFill,
    capacity,
    comparer,
    createHashTable
  );
};

class MapIterable extends WrapperIterable {
  _underlyingMap;
  constructor(map) {
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
  has(v) {
    return this._underlyingMap.has(v);
  }
  get(key) {
    return this._underlyingMap.get(key);
  }
  convertToObject() {
    return this.entries().aggregate({}, (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    });
  }
}
const isEqualityComparer = (obj) => obj != null && typeof obj.equals === "function" && typeof obj.getHashCode === "function";
const isValueSelector = (obj) => typeof obj === "function";
const createComparerMap = (capacity = 0, comparer) => {
  if (!comparer) {
    return /* @__PURE__ */ new Map();
  }
  return createHashTable(capacity, comparer);
};
function toLookup(keySelector, valueSelectorOrEqualityComparer, equalityComparer) {
  let comparer;
  let valueSelector;
  if (isEqualityComparer(valueSelectorOrEqualityComparer)) {
    comparer = valueSelectorOrEqualityComparer;
  } else {
    comparer = equalityComparer;
    if (isValueSelector(valueSelectorOrEqualityComparer)) {
      valueSelector = valueSelectorOrEqualityComparer;
    }
  }
  const vs = valueSelector || ((x) => x);
  const map = createComparerMap(
    0,
    comparer
  );
  let i = 0;
  for (const item of this) {
    const currentIdx = i++;
    const key = keySelector(item, currentIdx);
    const arr = map.get(key) || new ArrayIterable([]);
    map.set(key, arr);
    arr.push(vs(item, currentIdx));
  }
  return new MapIterable(map);
}
Enumerable.prototype.toLookup = toLookup;

const hashSequence = (items, visited, hash) => [...items].reduce(
  (hashcode, curr) => Math.imul(hashcode, 31) + hash(curr, visited),
  1
);

const seed = 737245463;
const hashString = (value) => value.length === 0 ? seed : value.split("").reduce(
  (hash, curr) => (hash << 5) - hash + curr.charCodeAt(0) | 0,
  seed
);

const hash = (value, visited) => {
  const visitedSet = visited || /* @__PURE__ */ new Set();
  const type = typeof value;
  switch (type) {
    case "string":
      return hashString(value);
  }
  if (type === "object") {
    if (value[Symbol.iterator]) {
      return hashSequence(value, visitedSet, hash);
    }
  }
  throw Error("not supported type: " + type);
};

function linq(it) {
  return fromIterable(it);
}

class Work {
  heading = void 0;
  icon = "work";
  work = true;
  education = false;
  certificates = false;
  experience = "professional";
}
class Education {
  heading = {
    id: "ed",
    title: "Education"
  };
  icon = "education";
  work = false;
  education = true;
  certificates = false;
  experience = void 0;
}
class Certificates {
  heading = {
    id: "cert",
    title: "Certificates"
  };
  icon = "certificates";
  work = false;
  education = false;
  certificates = true;
  experience = void 0;
}

function ContactDetails($$payload, $$props) {
	const { basics, $$slots, $$events, ...restProps } = $$props;
	const { location, phone, email, profiles = [] } = basics;

	$$payload.out += `<section${spread_attributes({ class: "contact-details", ...restProps })}><table${attr("border", 0)}${attr("width", 175.47)}><tbody>`;

	if (location) {
		$$payload.out += "<!--[-->";
		$$payload.out += `<tr><td colspan="2" style="width: 170px" class="contact-details__text"${attr("aria-label", `${location.city}, ${location.region}`)}><p>${escape_html(location.city)}, ${escape_html(location.region)}</p></td><td style="width: 18px" class="contact-details__icon location"></td></tr>`;
	} else {
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]-->`;

	if (phone) {
		$$payload.out += "<!--[-->";
		$$payload.out += `<tr><td colspan="2" style="width: 170px" class="contact-details__text"><p>${escape_html(phone)}</p></td><td style="width: 18px" class="contact-details__icon phone"></td></tr>`;
	} else {
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]-->`;

	if (email) {
		$$payload.out += "<!--[-->";
		$$payload.out += `<tr><td colspan="2" style="width: 170px" class="contact-details__link"><a class="contact-email"${attr("href", `mailto:${stringify(email)}`)} rel="external nofollow noopener noreferrer" target="blank">${escape_html(email)}</a></td><td style="width: 18px" class="contact-details__icon email"></td></tr>`;
	} else {
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]-->`;

	if (profiles) {
		$$payload.out += "<!--[-->";

		const each_array = ensure_array_like(profiles);

		$$payload.out += `<!--[-->`;

		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let profile = each_array[$$index];

			$$payload.out += `<tr><td colspan="2" style="width: 170px" class="contact-details__link"><a class="contact-profile"${attr("href", profile.url)} rel="external nofollow noopener noreferrer" target="blank">${escape_html(profile.username)}</a></td><td style="width: 18px"${attr("class", `contact-details__icon ${stringify(profile.network.toLowerCase())}`)}></td></tr>`;
		}

		$$payload.out += `<!--]-->`;
	} else {
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--></tbody></table></section>`;
}

const $$Astro$1 = createAstro("https://JonathonRP.github.io");
const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Timeline;
  const {
    experiences,
    type
  } = Astro2.props;
  return renderTemplate`${type.heading && renderTemplate`${maybeRenderHead()}<h2 id="{type.heading.id}-title" class="timeline__section-heading">${type.heading.title}</h2>` || renderTemplate`<h2 class="timeline__section-heading" data-sr-only>
Experience
</h2>`}<div class="timeline"${addAttribute(type.experience, "data-type")}> ${experiences.map(({
    startDate,
    endDate,
    date,
    eventDate = format(
      parseISO(
        (type.work ? startDate : type.certificates ? date : endDate) ?? ""
      ),
      "MMM yyyy"
    ),
    ...experience
  }, indx) => {
    const alt = experience.image.split(".").reverse().pop() + " Logo.";
    return renderTemplate`<div class="timeline__item"> <time class="timeline__duration"${addAttribute(eventDate, "datetime")}>${eventDate}</time> ${experience.image && renderTemplate`<div class="timeline__logo"> ${renderComponent($$result, "Image", $$Image, { "src": `/logos/${experience.image}`, "`": true, "format": "webp", "alt": alt, "width": "42", "height": "42", "loading": indx < 2 ? "eager" : "lazy", "decoding": "sync" })} </div>` || renderTemplate`<div class="timeline__point"></div>`} <div class="timeline__content"> <div style="width: 100%"> <h3 class="timeline__header"> ${type.education ? experience.institution : experience.name} </h3> <div class="timeline__body"> ${type.work && renderTemplate`<h4 class="timeline__sub">${experience.position}</h4>
									${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${experience.useSummary && renderTemplate`<p>${experience.summary}</p>`}${experience.highlights && renderTemplate`<ul class="timeline__responsabilities-achievements [ flow ]"> ${experience?.highlights?.map((highlight) => renderTemplate`<li> ${highlight} </li>`)} </ul>`}` })}` || type.certificates && renderTemplate`<p class="timeline__issuer"> ${experience.issuer} </p>` || type.education && renderTemplate`<h4 class="timeline__sub">${experience.area}</h4>
									<p class="timeline__degree"> ${experience.studyType} </p>`} </div> </div> <span class="timeline__icon"${addAttribute(type.icon, "data-icon")}></span> </div> </div>`;
  })} </div>`;
}, "/workspaces/JonathonRP.github.io/src/components/resume/Timeline.astro", void 0);

function TagsCatalog($$payload, $$props) {
	const { labels } = $$props;
	const each_array = ensure_array_like(labels);

	$$payload.out += `<p><!--[-->`;

	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let label = each_array[$$index];

		$$payload.out += `<cite${attr("aria-label", label)}>${escape_html(label)}</cite>`;
	}

	$$payload.out += `<!--]--></p>`;
}

const $$Astro = createAstro("https://JonathonRP.github.io");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const {
    data: {
      basics,
      work,
      certificates,
      education,
      skills,
      projects
    }
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section id="resume" class="resume"> <table${addAttribute(0, "border")}${addAttribute(0, "cellspacing")}${addAttribute(0, "cellpadding")}> <tbody> <!-- Profile --> <tr class="profile"> <th colspan="5" style="width: 592.91px" class="[ flow ]"> <!-- Introduction --> <div aria-label="Introduction"> <h1${addAttribute(basics.name, "aria-label")}>${basics.name}</h1> <h2${addAttribute(basics.label, "aria-label")}>${basics.label}</h2> </div> <!-- Objective Statement --> <p class="text-accent"> ${basics.summary} </p> </th> <th colspan="1" style="width: 175.47px" align="right"> <!-- Contact Details --> ${renderComponent($$result, "ContactDetails", ContactDetails, { "basics": basics, "aria-label": "Details" })} </th> </tr> <tr> <!-- Relevant Experience History --> <td colspan="4" style="width: 500px" class="[ grid-column ]" aria-label="Relevant Experience History"> <section class="experience" aria-label="Relevant Professional Experience"> ${renderComponent($$result, "Timeline", $$Timeline, { "experiences": work, "type": new Work() })} </section> <!-- Certificates --> <section class="experience" aria-labelledby="cert-title"> ${renderComponent($$result, "Timeline", $$Timeline, { "experiences": certificates, "type": new Certificates() })} </section> <!-- Education --> <section class="experience" aria-labelledby="ed-title"> ${renderComponent($$result, "Timeline", $$Timeline, { "experiences": education, "type": new Education() })} </section> </td> <td colspan="2" style="width: 280px" class="[ grid-column ]"> <!-- Skills --> <section class="skills [ tags-catalog extend ] [ bg-none ]" aria-label="skills"> ${linq(skills).groupBy(({ category, categoryTag }) => [category, categoryTag], {
    equals: ([a, b], [c, d]) => a === c && b === d,
    getHashCode: hash
  }).select(
    (g) => [
      g.key,
      g.select((s) => ({ tag: s.tag, name: s.name, keywords: s.keywords })).toArray()
    ]
  ).select(([[category, categoryTag], collectiveSkills]) => renderTemplate`<section${addAttribute(["category", { "extend": collectiveSkills.length > 1 }], "class:list")}${addAttribute(categoryTag, "aria-labelledby")}> <h2${addAttribute(categoryTag, "id")} class="heading__icon heading"${addAttribute(categoryTag, "data-icon")}> ${collectiveSkills.length === 1 ? collectiveSkills[0]?.name : collectiveSkills.length > 1 ? category : ""} </h2>${collectiveSkills.length === 1 ? renderTemplate`${renderComponent($$result, "TagsCatalog", TagsCatalog, { "labels": collectiveSkills[0]?.keywords ?? "" })}` : collectiveSkills.length > 1 ? collectiveSkills.map((skill) => renderTemplate`<div class="sub-category"${addAttribute(skill.tag, "aria-labelledby")}> <h3${addAttribute(skill.tag, "id")} class="subheading">${skill.name}:</h3> ${renderComponent($$result, "TagsCatalog", TagsCatalog, { "labels": skill.keywords.sort() })} </div>`) : null} </section>`)} </section> <!-- Interests --> <!-- {#if interests}
							<section
							class="interests [ tags-catalog ]"
							class:extend={interests.length > 1}
							aria-labelledby="interests-title"
							>
							<h2 id="interests-title" class="heading__icon heading" data-icon="interests">Interests</h2>
							{#if interests.length === 1}
							<TagsCatalog labels={interests[0]?.keywords ?? ''} />
							{:else if interests.length > 1}
							{#each interests as interest ((interest.tag = slug(interest.name)))}
							<div class="sub-category" aria-labelledby="{interest.tag}-title">
								<h4 id="{interest.tag}-title" class="subheading">{interest.name}:</h4>
											<TagsCatalog labels={interest.keywords} />
										</div>
									{/each}
								{/if}
							</section>
						{/if} --> <!-- Projects --> <section class="personal-projects" aria-labelledby="personal-projects-title"> <h2 id="personal-projects-title" class="heading__icon heading" data-icon="personal-projects">
Projects
</h2> <div class="project gallery"> ${projects.map((project) => renderTemplate`<header> ${project.url ? renderTemplate`<a${addAttribute(project.url, "href")} rel="external nofollow noopener noreferrer" target="blank"> ${project.name} </a>` : renderTemplate`<span> ${project.name} </span>`} </header>
									<div> <img alt="{project.name} screen-shot"> </div>
									<div> <p> ${project.description} </p> <!-- project_used-technologies --> </div>`)} </div> </section> </td> </tr> </tbody> </table> </section>`;
}, "/workspaces/JonathonRP.github.io/src/components/resume/index.astro", void 0);

export { $$Index };
