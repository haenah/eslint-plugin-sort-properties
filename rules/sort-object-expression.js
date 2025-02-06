const baseMessage = require("./constants/base-message");
const { baseSchema } = require("./constants/base-option");
const { createCheck } = require("./utils/check");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    defaultOptions: [baseSchema.default],
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in object expressions to be sorted.",
      recommended: true,
      url: "https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.9/docs/rules/sort-object-expression.md",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: baseMessage,
    schema: [baseSchema],
    type: "suggestion",
  },
  create(context) {
    const check = createCheck({
      context,
      splitWhen: (p) => p.type === "SpreadElement",
    });
    return {
      ObjectExpression(node) {
        check(node.properties);
      },
    };
  },
};
