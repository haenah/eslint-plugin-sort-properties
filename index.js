/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  meta: { name: "sort-properties" },
  rules: {
    "sort-object-expression": require("./rules/sort-object-expression"),
    "sort-object-destructing": require("./rules/sort-object-destructing"),
    "sort-type-literal": require("./rules/sort-type-literal"),
    "sort-interface": reqiuire("./rules/sort-interface"),
  },
};
