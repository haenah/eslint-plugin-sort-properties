const packageVersion = require("./package.json").version;

/** @type {import('eslint-doc-generator').GenerateOptions} */
module.exports = {
  configEmoji: [["flat/all", "🌏"]],
  ruleDocTitleFormat: "prefix-name",
  urlRuleDoc: `https://github.com/haenah/eslint-plugin-sort-properties/blob/v${packageVersion}/docs/rules/{name}.md`,
};
