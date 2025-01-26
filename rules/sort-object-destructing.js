const { checkOrderAndReport } = require("./utils/order");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in object destructuring to be sorted.",
      recommended: true,
    },
    fixable: "code",
    hasSuggestions: true,
    type: "suggestion",
  },
  create(context) {
    return {
      ObjectPattern(node) {
        let properties = [];
        for (const p of node.properties) {
          if (p.type === "RestElement") break;
          properties.push(p);
        }
        checkOrderAndReport(context, properties);
      },
    };
  },
};
