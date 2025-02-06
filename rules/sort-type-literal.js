const baseMessage = require("./constants/base-message");
const { baseSchema } = require("./constants/base-option");
const { createCheck } = require("./utils/check");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    defaultOptions: [baseSchema.default],
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in type literals to be sorted.",
      recommended: true,
      url: "https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.9/docs/rules/sort-type-literal.md",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: baseMessage,
    schema: [baseSchema],
    type: "suggestion",
  },
  create(context) {
    context.ts = true;
    const check = createCheck({ context, ts: true });
    return {
      TSTypeLiteral(node) {
        // Exclude {[key: {Key}]: {Value}} pattern because this type of signature can exist only once.
        if (node.members.some((p) => p.key?.type === "BinaryExpression"))
          return;
        check(node.members);
      },
    };
  },
};
