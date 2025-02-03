const baseMessage = require("./constants/base-message");
const { baseSchema } = require("./constants/base-option");
const { createCheck } = require("./utils/check");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    defaultOptions: [baseSchema.default],
    docs: {
      category: "Stylistic Issues",
      description: "Enforce interface members to be sorted.",
      recommended: true,
      url: "https://github.com/haenah/eslint-plugin-sort-properties/blob/HEAD/docs/rules/sort-interface.md",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: baseMessage,
    schema: [baseSchema],
    type: "suggestion",
  },
  create(context) {
    context.ts = true;
    const check = createCheck({ context });
    return {
      TSInterfaceBody(node) {
        check(node.body);
      },
    };
  },
};
