/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: { name: "sort-properties" },
  rules: {
    "sort-object-expression": require("./rules/sort-object-expression"),
    "sort-object-destructing": require("./rules/sort-object-destructing"),
    "sort-type-literal": require("./rules/sort-type-literal"),
    "sort-interface": require("./rules/sort-interface"),
  },
  configs: {
    all: {
      plugins: ["sort-properties"],
      rules: {
        "sort-properties/sort-object-expression": ["warn"],
        "sort-properties/sort-object-destructing": ["warn"],
        "sort-properties/sort-type-literal": ["warn"],
        "sort-properties/sort-interface": ["warn"],
      },
    },
  },
};

module.exports.configs.flatAll = {
  plugins: { "sort-properties": module.exports },
  rules: {
    "sort-properties/sort-object-expression": ["warn"],
    "sort-properties/sort-object-destructing": ["warn"],
    "sort-properties/sort-type-literal": ["warn"],
    "sort-properties/sort-interface": ["warn"],
  },
};
