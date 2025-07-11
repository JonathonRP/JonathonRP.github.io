const unitRegex = /"[^"]+"|'[^']+'|url\([^)]+\)|var\([^)]+\)|(\d*\.?\d+)(px|pt|pc|cm|mm|in|%|em|rem|ch|vh|vw|vmin|vmax|ex)/g;

const filterPropList = {
  exact: list => list.filter(m => m.match(/^[^*!]+$/)),
  contain: list =>
    list.filter(m => m.match(/^\*.+\*$/)).map(m => m.substr(1, m.length - 2)),
  endWith: list => list.filter(m => m.match(/^\*[^*]+$/)).map(m => m.substr(1)),
  startWith: list =>
    list.filter(m => m.match(/^[^*!]+\*$/)).map(m => m.substr(0, m.length - 1)),
  notExact: list =>
    list.filter(m => m.match(/^![^*].*$/)).map(m => m.substr(1)),
  notContain: list =>
    list.filter(m => m.match(/^!\*.+\*$/)).map(m => m.substr(2, m.length - 3)),
  notEndWith: list =>
    list.filter(m => m.match(/^!\*[^*]+$/)).map(m => m.substr(2)),
  notStartWith: list =>
    list.filter(m => m.match(/^![^*]+\*$/)).map(m => m.substr(1, m.length - 2))
};

const typeToString = s =>
  Object.prototype.toString
    .call(s)
    .slice(8, -1)
    .toLowerCase();

const types = [
  "String",
  "Array",
  "Undefined",
  "Boolean",
  "Number",
  "Function",
  "Symbol",
  "Object"
];

const type = types.reduce((acc, str) => {
  acc["is" + str] = val => typeToString(val) === str.toLowerCase();
  return acc;
}, {});

const defaults = {
  processor: (value) => value,
  unitPrecision: 5,
  selectorBlackList: [],
  propList: ['*'],
  replace: true,
  mediaQuery: false,
  exclude: /node_modules/i
};

function createUnitReplace(processor, unitPrecision, root) {
  return (node) => (m, $1, $2) => {
    if (!$1) {
      return m;
    }

    const value = parseFloat($1);
    const unit = $2;
    const result = processor(value, unit, node, root);

    let newValue, newUnit;
    if (type.isObject(result) && result !== null) {
      newValue = parseFloat(result.value) || 0;
      newUnit = result.unit || unit;
    }
    else if (type.isNumber(result) || type.isString(result)) {
      newValue = parseFloat(result) || 0;
      newUnit = unit;
    }
    else {
      newValue = value;
      newUnit = unit;
    }

    const fixedVal = toFixed(newValue, unitPrecision);

    return fixedVal === 0 ? "0" : fixedVal + newUnit;
  };
}

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function blacklistedSelector(blacklist, selector) {
  if (typeof selector !== "string") {
    return;
  }

  return blacklist.some(regex => {
    if (typeof regex === "string") {
      return selector.indexOf(regex) !== -1;
    }

    return selector.match(regex);
  });
}

function createPropListMatcher(propList) {
  const hasWild = propList.indexOf("*") > -1;
  const matchAll = hasWild && propList.length === 1;
  const lists = {
    exact: filterPropList.exact(propList),
    contain: filterPropList.contain(propList),
    startWith: filterPropList.startWith(propList),
    endWith: filterPropList.endWith(propList),
    notExact: filterPropList.notExact(propList),
    notContain: filterPropList.notContain(propList),
    notStartWith: filterPropList.notStartWith(propList),
    notEndWith: filterPropList.notEndWith(propList)
  };

  return prop => {
    if (matchAll) {
      return true;
    }

    return (
      (hasWild ||
        lists.exact.indexOf(prop) > -1 ||
        lists.contain.some(function(m) {
          return prop.indexOf(m) > -1;
        }) ||
        lists.startWith.some(function(m) {
          return prop.indexOf(m) === 0;
        }) ||
        lists.endWith.some(function(m) {
          return prop.indexOf(m) === prop.length - m.length;
        })) &&
      !(
        lists.notExact.indexOf(prop) > -1 ||
        lists.notContain.some(function(m) {
          return prop.indexOf(m) > -1;
        }) ||
        lists.notStartWith.some(function(m) {
          return prop.indexOf(m) === 0;
        }) ||
        lists.notEndWith.some(function(m) {
          return prop.indexOf(m) === prop.length - m.length;
        })
      )
    );
  };
}

const unitProcessor = (options = {}) => {
  const opts = Object.assign({}, defaults, options);
  const satisfyPropList = createPropListMatcher(opts.propList);
  const exclude = opts.exclude;
  let isExcludeFile = false;
  let unitReplace;

  return {
    postcssPlugin: "postcss-unit-processor",

    Once(css) {
      const filePath = css.source.input.file;

      if (
        exclude &&
        ((type.isFunction(exclude) && exclude(filePath)) ||
          (type.isString(exclude) && filePath.indexOf(exclude) !== -1) ||
          filePath.match(exclude) !== null)
      ) {
        isExcludeFile = true;
      } else {
        isExcludeFile = false;
      }

      unitReplace = createUnitReplace(opts.processor, opts.unitPrecision, css);
    },

    Declaration(decl) {
      if (isExcludeFile) {
        return;
      }

      if (
        !unitRegex.test(decl.value) ||
        !satisfyPropList(decl.prop) ||
        blacklistedSelector(opts.selectorBlackList, decl.parent.selector)
      ) {
        return;
      }

      const value = decl.value.replace(unitRegex, unitReplace(decl));

      // if unit already processed, do not add or replace
      if (decl.__unitProcessorFinished === true) {
        return;
      }

      if (opts.replace) {
        decl.__unitProcessorFinished = true;
        decl.value = value;
      }
      else {
        decl.cloneBefore({ value, __unitProcessorFinished: true });
      }
    },

    AtRule(atRule) {
      if (isExcludeFile) {
        return;
      }

      if (opts.mediaQuery && atRule.name === "media") {
        if (atRule.__unitProcessorFinished === true || !unitRegex.test(atRule.params)) {
          return;
        }
        atRule.__unitProcessorFinished = true;
        atRule.params = atRule.params.replace(unitRegex, unitReplace(atRule));
      }
    }
  };
};

const sassUnicodeRootCustomProperties = (opts = { }) => {

  // Work with options here

  const rootSelectorRegExp = /^:root$/i;
  const customPropertyRegExp = /^--[A-z][\w-]*$/;
  return (root, result) => {

    root.walkRules(function(rule) {
      if (rule.type === 'rule' && rule.selector.split(',').some(item => rootSelectorRegExp.test(item)) && Object(rule.nodes).length) {
        rule.walkDecls(customPropertyRegExp,function(decl) {
          let input = decl.value;

          let new_value = input;
          if(input.charCodeAt(1) > 255) {
            new_value = "\"\\" + input.codePointAt(input.length - 2).toString(16) + "\"";
            // console.log(input,input.toString(),input.charCodeAt(1),new_value);
          }

          decl.value = new_value;

        });
      }
    });

  }
};

module.exports = {
  plugins: [
    require('postcss-sass-unicode'),
    sassUnicodeRootCustomProperties(),
    require('postcss-preset-env')({
      "minimumVendorImplementations": 1,
      "preserve": true
    }),
    unitProcessor({
      replace: false,
      propList: ['width', 'max-width'],
      processor: (value, unit) => {
        if(unit === 'ch') {
          return {
            value: require('to-px')(`${value}${unit}`) * 1.082 ,
            unit: 'px'
          };
        }
      }
    }),
    // require('doiuse')({
    //   onFeatureUsage: (usageInfo) => {
    //     console.log(usageInfo.message);
    //   }
    // })
  ],
};