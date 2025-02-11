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
        allowLineSeparatedGroups = true,
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

  const getPropertyName = caseSensitive
    ? (name) => getStaticPropertyName(name) ?? "\0"
    : (name) => getStaticPropertyName(name)?.toLowerCase() ?? "\0";

  /** Hydrate properties with caching flags and name for saving time in comparison. */
  const hydrateProperty = ts
    ? function hydrateTsProperty(p) {
        p.i = p.type === "TSIndexSignature" ? 1 : 0;
        p.f =
          funcCoeff *
          (p.type === "TSMethodSignature" ||
            p.typeAnnotation?.typeAnnotation.type === "TSFunctionType");
        p.n = getPropertyName(p);
      }
    : function hydrateJsProperty(p) {
        p.f =
          funcCoeff *
          (p.value?.type === "FunctionExpression" ||
            p.value?.type === "ArrowFunctionExpression");
        p.n = getPropertyName(p);
      };

  function hydrateComment(p) {
    if (includeComments.startsWith("l")) {
      // Include leading comments
      const comments = context.sourceCode.getCommentsBefore(p);
      if (comments.length) {
        const comment = comments[0];
        p.range[0] = comment.range[0];
        p.loc.start = comment.loc.start;
      }
    } else if (includeComments.startsWith("t")) {
      // Include trailing comments
      const comments = context.sourceCode.getCommentsAfter(p);
      if (comments.length) {
        const comment = comments[comments.length - 1];
        p.range[1] = comment.range[1];
        p.loc.end = comment.loc;
      }
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
    hydrateProperty(properties[0]);
    const propertiesWithoutFirst = properties.slice(1);
    const outOfOrderIdx = propertiesWithoutFirst.findIndex((p, i) => {
      hydrateProperty(p);
      return orderCoeff * compareProperties(properties[i], p) > 0;
    });
    if (outOfOrderIdx >= 0) {
      context.report({
        data: {
          name: getStaticPropertyName(propertiesWithoutFirst[outOfOrderIdx]),
        },
        messageId: "outOfOrder",
        node: propertiesWithoutFirst[outOfOrderIdx].key,
        fix(fixer) {
          // hydrate rest of the properties
          propertiesWithoutFirst.slice(outOfOrderIdx).forEach(hydrateProperty);
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
    let slice = [];
    for (const p of properties) {
      hydrateComment(p);
      if (breakWhen?.(p)) break;
      const prev = slice[slice.length - 1];
      if (splitWhen?.(p, prev)) {
        checkSlice(slice);
        slice = [];
        continue;
      }
      if (
        allowLineSeparatedGroups &&
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
