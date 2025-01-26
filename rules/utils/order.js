/**
 *
 * @param {import('eslint').Rule.RuleContext} context
 * @param {import('eslint').Rule.Node[]} properties
 * @param {boolean} ts - Whether the node is TypeScript-only
 */
function checkOrderAndReport(context, properties, ts = false) {
  if (properties.length <= 1) return;
  properties.forEach((p) => {
    p.i = ts && (p.type === "TSIndexSignature" ? 1 : 0);
    p.f = +(!ts
      ? p.value?.type === "FunctionExpression" ||
        p.value?.type === "ArrowFunctionExpression"
      : p.type === "TSMethodSignature" ||
        p.typeAnnotation?.typeAnnotation?.type === "TSFunctionType");
    p.n = getStaticPropertyName(p) ?? "\0";
  });
  function compareProperties(a, b) {
    if (a.i !== b.i) return a.i - b.i;
    if (a.f !== b.f) return a.f - b.f;
    return naturalCompare(a.n, b.n);
  }
  const propertiesWithoutFirst = properties.slice(1);
  const outOfOrder = propertiesWithoutFirst.find(
    (p, i) => compareProperties(properties[i], p) > 0
  );
  if (outOfOrder) {
    context.report({
      message:
        "Object properties must be sorted. This key is out of order with the previous key.",
      node: outOfOrder.key,
      fix(fixer) {
        properties.forEach((p) => {
          const commentsBefore = context.sourceCode.getCommentsBefore(p);
          if (commentsBefore.length) p.range[0] = commentsBefore[0].range[0];
          p.text = context.sourceCode.getText(p);
        });
        if (ts) {
          const last = properties[properties.length - 1];
          // For the last property, a comma or semicolon may be missing. If it is missing, it may cause a parsing error after swapping, so add it.
          if (!last.text.endsWith(";") && !last.text.endsWith(",")) {
            last.text += ";";
          }
        }
        // Used to preserve whitespaces between properties.
        const textsInBetween = propertiesWithoutFirst.map((p, i) => {
          const prev = properties[i];
          return context.sourceCode.getText({
            range: [prev.range[1], p.range[0]],
          });
        });
        const sortedProperties = properties.slice().sort(compareProperties);
        const sortedText =
          sortedProperties[0].text +
          sortedProperties
            .slice(1)
            .map((p, i) => textsInBetween[i] + p.text)
            .join("");
        return fixer.replaceTextRange(
          [properties[0].range[0], properties[properties.length - 1].range[1]],
          sortedText
        );
      },
    });
  }
}

module.exports = { checkOrderAndReport };
