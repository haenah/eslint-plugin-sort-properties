/** @type {import('json-schema').JSONSchema4} */
const baseSchema = {
  additionalProperties: false,
  default: {
    allowLineSeparatedGroups: true,
    caseSensitive: true,
    functionOrder: "higher",
    includeComments: "leading",
    minKeys: 2,
    natural: true,
    order: "asc",
  },
  properties: {
    allowLineSeparatedGroups: {
      default: true,
      description:
        "If true, properties are separated independently by line breaks.",
      type: "boolean",
    },
    caseSensitive: {
      default: true,
      description: "Whether the comparison is case sensitive.",
      type: "boolean",
    },
    functionOrder: {
      default: "higher",
      description:
        "The priority of properties which values are either method or arrow function. For example, if order is 'asc' and functionOrder is 'higher', function properties will be placed at the end.",
      enum: ["higher", "lower", "equal"],
    },
    includeComments: {
      default: "leading",
      description: "Position of comments to consider as part of the property.",
      enum: ["leading", "trailing"],
      required: false,
    },
    minKeys: {
      default: 2,
      description: "Minimum number of keys to check order.",
      minimum: 2,
      type: "integer",
    },
    natural: {
      default: true,
      description:
        "Whether the comparison is using a natural order. See [natural-compare](https://www.npmjs.com/package/natural-compare)",
      type: "boolean",
    },
    order: {
      default: "asc",
      description: "The order of properties.",
      enum: ["asc", "desc"],
      type: "string",
    },
  },
  type: "object",
};

module.exports = {
  baseSchema,
};
