const packageVersion = require("./package.json").version;

/** @type {import('eslint-doc-generator').GenerateOptions} */
module.exports = {
  configEmoji: [
    [
      "js",
      "![JavaScript](https://img.shields.io/badge/-JS-F7DF1E?style=flat-square)",
    ],
    [
      "ts",
      "![TypeScript](https://img.shields.io/badge/-TS-007ACC?style=flat-square)",
    ],
  ],
  ruleDocTitleFormat: "prefix-name",
  urlRuleDoc: `https://github.com/haenah/eslint-plugin-sort-properties/blob/v${packageVersion}/docs/rules/{name}.md`,
};
