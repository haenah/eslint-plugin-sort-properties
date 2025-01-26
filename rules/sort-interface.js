const { checkOrderAndReport } = require("./utils/order");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "Enforce interface members to be sorted.",
      recommended: true,
    },
    fixable: "code",
    hasSuggestions: true,
    type: "suggestion",
  },
  create(context) {
    return {
      TSInterfaceBody(node) {
        checkOrderAndReport(context, node.body, true);
      },
    };
  },
};
