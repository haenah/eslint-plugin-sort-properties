const { checkOrderAndReport } = require("./utils/order");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in type literals to be sorted.",
      recommended: true,
    },
    fixable: "code",
    hasSuggestions: true,
    type: "suggestion",
  },
  create(context) {
    return {
      TSTypeLiteral(node) {
        if (node.members.some((p) => p.key?.type === "BinaryExpression"))
          return;
        checkOrderAndReport(context, node.members, true);
      },
    };
  },
};
