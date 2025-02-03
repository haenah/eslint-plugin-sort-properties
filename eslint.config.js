const eslintJs = require("@eslint/js");
const globals = require("globals");
const sortPropertiesPlugin = require(".");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
    },
  },
  eslintJs.configs.recommended,
  sortPropertiesPlugin.configs.flatAll,
];
