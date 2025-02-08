const allRules = {
  "sort-properties/sort-interface": ["warn"],
  "sort-properties/sort-object-destructing": ["warn"],
  "sort-properties/sort-object-expression": ["warn"],
  "sort-properties/sort-type-literal": ["warn"],
};

const jsRules = {
  "sort-properties/sort-object-destructing": ["warn"],
  "sort-properties/sort-object-expression": ["warn"],
};

const tsRules = {
  "sort-properties/sort-interface": ["warn"],
  "sort-properties/sort-type-literal": ["warn"],
};

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  configs: {
    all: {
      plugins: ["sort-properties"],
      rules: allRules,
    },
    js: {
      plugins: ["sort-properties"],
      rules: jsRules,
    },
    ts: {
      plugins: ["sort-properties"],
      rules: tsRules,
    },
  },
  meta: { name: "sort-properties" },
  rules: {
    "sort-interface": require("./rules/sort-interface"),
    "sort-object-destructing": require("./rules/sort-object-destructing"),
    "sort-object-expression": require("./rules/sort-object-expression"),
    "sort-type-literal": require("./rules/sort-type-literal"),
  },
};
if (process?.env?.DOCGEN) {
  module.exports.configs.all.meta = {
    docs: {
      description:
        "Apply all rules in the `sort-properties` plugin. Use `flat/all` in eslint>=9",
    },
  };
  module.exports.configs.js.meta = {
    docs: {
      description:
        "Apply JavaScript rules in the `sort-properties` plugin. Use `flat/js` in eslint>=9",
    },
  };
  module.exports.configs.ts.meta = {
    docs: {
      description:
        "Apply TypeScript rules in the `sort-properties` plugin. Use `flat/ts` in eslint>=9",
    },
  };
}

if (!process?.env?.DOCGEN) {
  module.exports.configs["flat/all"] = {
    plugins: { "sort-properties": module.exports },
    rules: allRules,
  };
  module.exports.configs["flat/js"] = {
    plugins: { "sort-properties": module.exports },
    rules: jsRules,
  };
  module.exports.configs["flat/ts"] = {
    plugins: { "sort-properties": module.exports },
    rules: tsRules,
  };
}
