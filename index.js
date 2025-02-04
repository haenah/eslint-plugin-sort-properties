/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  configs: {
    all: {
      plugins: ["sort-properties"],
      rules: {
        "sort-properties/sort-interface": ["warn"],
        "sort-properties/sort-object-destructing": ["warn"],
        "sort-properties/sort-object-expression": ["warn"],
        "sort-properties/sort-type-literal": ["warn"],
      },
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
        "Apply all rules in the `sort-properties` plugin. Used in eslint<=8",
    },
  };
}

module.exports.configs["flat/all"] = {
  plugins: { "sort-properties": module.exports },
  rules: {
    "sort-properties/sort-interface": ["warn"],
    "sort-properties/sort-object-destructing": ["warn"],
    "sort-properties/sort-object-expression": ["warn"],
    "sort-properties/sort-type-literal": ["warn"],
  },
};
if (process?.env?.DOCGEN) {
  module.exports.configs["flat/all"].meta = {
    docs: {
      description:
        "Apply all rules in the `sort-properties` plugin. Used in eslint>=9",
    },
  };
}
