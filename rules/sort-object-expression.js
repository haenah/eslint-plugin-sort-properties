const { checkOrderAndReport } = require("./utils/order");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    docs: {
      category: "Stylistic Issues",
      description: "Enforce properties in object expressions to be sorted.",
      recommended: true,
    },
    fixable: "code",
    hasSuggestions: true,
    type: "suggestion",
  },
  create(context) {
    return {
      ObjectExpression(node) {
        let properties = [];
        for (const p of node.properties) {
          if (p.type === "SpreadElement") {
            checkOrderAndReport(context, properties);
            properties = [];
            continue;
          }
          properties.push(p);
        }
        checkOrderAndReport(context, properties);
      },
    };
  },
};
