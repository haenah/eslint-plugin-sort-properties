const baseMessage = require("./constants/base-message");
const { baseSchema } = require("./constants/base-option");
const { createCheck } = require("./utils/check");

const schema = {
  ...baseSchema,
  default: { ...baseSchema.default },
  properties: { ...baseSchema.properties },
};
delete schema.properties.functionOrder;
delete schema.default.functionOrder;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    defaultOptions: [schema.default],
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in object destructuring to be sorted.",
      recommended: true,
      url: "https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.2/docs/rules/sort-object-destructing.md",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: baseMessage,
    schema: [schema],
    type: "suggestion",
  },
  create(context) {
    const check = createCheck({
      context,
      breakWhen: (p) => p.type === "RestElement",
    });
    return {
      ObjectPattern(node) {
        check(node.properties);
      },
    };
  },
};
