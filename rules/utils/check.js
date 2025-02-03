const naturalCompare = require("natural-compare");
const { getStaticPropertyName } = require("./ast-utils");

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {(property: import('estree').Property) => boolean} breakWhen If true, the check will stop and ignore the current property.
 * @param {(property: import('estree').Property, previousProperty?: import('estree').Property) => boolean} splitWhen
 * If true, the check will split the properties ignoring the current one.\
 * previousProperty is undefined if the current property is the first one or if the previous property was ignored.
 */
function createCheck({ breakWhen, context, splitWhen, ts }) {
  const {
    options: [
      {
        allowLineSeperatedGroups = true,
        includeComments = "leading",
        minKeys = 2,

        // Sort options
        caseSensitive = true,
        functionOrder = "higher",
        natural = true,
        order = "asc",
      },
    ],
  } = context;
  const orderCoeff = order === "asc" ? 1 : -1;
  const funcCoeff =
    functionOrder === "higher" ? 1 : functionOrder === "lower" ? -1 : 0;

  /** Hydrate properties with caching flags and name for saving time in comparison. */
  function hydrateProperty(p) {
    if (ts) {
      p.i = p.type === "TSIndexSignature" ? 1 : 0;
      p.f =
        funcCoeff *
        (p.type === "TSMethodSignature" ||
          p.typeAnnotation?.typeAnnotation.type === "TSFunctionType");
    } else {
      p.f =
        funcCoeff *
        (p.value?.type === "FunctionExpression" ||
          p.value?.type === "ArrowFunctionExpression");
    }
    p.n = getStaticPropertyName(p) ?? "\0";
    if (caseSensitive) {
      p.n = p.n.toLowerCase();
    }
  }
  function compareProperties(a, b) {
    if (a.i !== b.i) return a.i - b.i;
    if (a.f !== b.f) return a.f - b.f;
    if (natural) return naturalCompare(a.n, b.n);
    return a.n < b.n ? -1 : a.n > b.n ? 1 : 0;
  }
  function checkSlice(properties) {
    if (properties.length <= 1) return;
    properties.forEach(hydrateProperty);
    const propertiesWithoutFirst = properties.slice(1);
    const outOfOrder = propertiesWithoutFirst.find(
      (p, i) => orderCoeff * compareProperties(properties[i], p) > 0
    );
    if (outOfOrder) {
      context.report({
        data: { name: getStaticPropertyName(outOfOrder) },
        messageId: "outOfOrder",
        node: outOfOrder.key,
        fix(fixer) {
          properties.forEach((p) => (p.text = context.sourceCode.getText(p)));
          if (ts) {
            const last = properties[properties.length - 1];
            if (!last.text.endsWith(";") && !last.text.endsWith(",")) {
              last.text += ";";
            }
          }
          // Used to preserve whitespaces between properties.
          const textsInBetween = propertiesWithoutFirst.map((p, i) =>
            context.sourceCode.getText({
              range: [properties[i].range[1], p.range[0]],
            })
          );
          const sortedProperties = properties
            .slice()
            .sort((a, b) => orderCoeff * compareProperties(a, b));
          const sortedText =
            sortedProperties[0].text +
            sortedProperties
              .slice(1)
              .map((p, i) => textsInBetween[i] + p.text)
              .join("");
          return fixer.replaceTextRange(
            [
              properties[0].range[0],
              properties[properties.length - 1].range[1],
            ],
            sortedText
          );
        },
      });
    }
  }
  return function check(properties) {
    if (properties.length < minKeys) return;
    properties.forEach((p) => {
      // include comments in the range
      if (includeComments.startsWith("l")) {
        const commentsBefore = context.sourceCode.getCommentsBefore(p);
        if (commentsBefore.length) {
          p.range[0] = commentsBefore[0].range[0];
          p.loc.start = commentsBefore[0].loc.start;
        }
      } else if (includeComments.startsWith("f")) {
        const comments = context.sourceCode.getCommentsAfter(p);
        if (comments.length) {
          p.range[1] = comments[comments.length - 1].range[1];
          p.loc.end = comments[comments.length - 1].loc.end;
        }
      }
    });
    let slice = [];
    for (const p of properties) {
      if (breakWhen?.(p)) {
        break;
      }
      const prev = slice[slice.length - 1];
      if (splitWhen?.(p, prev)) {
        checkSlice(slice);
        slice = [];
        continue;
      }
      if (
        allowLineSeperatedGroups &&
        prev &&
        prev.loc.end.line < p.loc.start.line - 1
      ) {
        checkSlice(slice);
        slice = [p];
        continue;
      }
      slice.push(p);
    }
    checkSlice(slice);
  };
}

module.exports = { createCheck };
