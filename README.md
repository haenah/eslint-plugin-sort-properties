# eslint-plugin-sort-properties

This plugin provides rules that enforce the sorting of properties in object expressions, object destructuring for JavaScript, and type literals, interface members for TypeScript.\
Inspired by [eslint-plugin-sort-keys-fix](https://www.npmjs.com/package/eslint-plugin-sort-keys-fix), it is designed to be auto-fixable but way faster by fixing misorder of properties at once. It is about **15x faster to fix, 5x to apply rule, 2x to parse and 3x in total.**<sub>[benchmark code](https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.6/benchmarks/object-expression.js)</sub>\
And this plugin can be configured to include leading/trailing comments as part of the property, so there's less chance of breaking the placement of comments.\
Additionally, inspired by the [eslint-plugin-react/jsx-sort-props rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md), it supports giving higher priority to function properties when sorting.

![Demo GIF](https://raw.githubusercontent.com/haenah/eslint-plugin-sort-properties/refs/tags/v1.1.6/images/demo.gif?raw=true)

## Table of Contents

- [Rules](#rules)
- [Installation](#installation)
- [Available configurations](#available-configurations)
- [Configuration (legacy: `.eslintrc*`)](#configuration-legacy-eslintrc)
- [Configuration (new: `eslint.config.js`)](#configuration-new-eslintconfigjs)
- [Options](#options)

## Rules

<!-- begin auto-generated rules list -->

⚠️ Configurations set to warn in.\
🌐 Set in the `all` configuration.\
🌏 Set in the `flat/all` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                                                                                                 | Description                                              | ⚠️    | 🔧  | 💡  |
| :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :---- | :-- | :-- |
| [sort-interface](https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.6/docs/rules/sort-interface.md)                   | Enforce interface members to be sorted.                  | 🌐 🌏 | 🔧  | 💡  |
| [sort-object-destructing](https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.6/docs/rules/sort-object-destructing.md) | Enforce properties in object destructuring to be sorted. | 🌐 🌏 | 🔧  | 💡  |
| [sort-object-expression](https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.6/docs/rules/sort-object-expression.md)   | Enforce properties in object expressions to be sorted.   | 🌐 🌏 | 🔧  | 💡  |
| [sort-type-literal](https://github.com/haenah/eslint-plugin-sort-properties/blob/v1.1.6/docs/rules/sort-type-literal.md)             | Enforce properties in type literals to be sorted.        | 🌐 🌏 | 🔧  | 💡  |

<!-- end auto-generated rules list -->

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm install eslint --save-dev
```

Next, install `eslint-plugin-sort-properties`:

```bash
npm install eslint-plugin-sort-properties --save-dev
```

## Available configurations

<!-- begin auto-generated configs list -->

|     | Name       | Description                                                        |
| :-- | :--------- | :----------------------------------------------------------------- |
| 🌐  | `all`      | Apply all rules in the `sort-properties` plugin. Used in eslint<=8 |
| 🌏  | `flat/all` | Apply all rules in the `sort-properties` plugin. Used in eslint>=9 |

<!-- end auto-generated configs list -->

## Configuration (legacy: `.eslintrc*`)

> **⚠️ Important note**\
> To use rules for typescript(`sort-interface`, `sort-type-literal`), you must specify the parser as `@typescript-eslint/parser`.

```js
module.exports = {
  // ...
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
```

Use `all` to enable all rules. Here's an example configuration in your `.eslintrc`:

```js
module.exports = {
  extends: ["plugin:sort-properties/all"],
};
```

or you can enable specific rules:

```js
module.exports = {
  plugins: ["sort-properties"],
  rules: {
    "sort-properties/sort-interface": "warn",
    "sort-properties/sort-object-destructing": "warn",
    "sort-properties/sort-object-expression": [
      "warn",
      // See the options section below for more information
      {
        allowLineSeparatedGroups: false,
        caseSensitive: true,
        functionOrder: "higher",
        includeComments: "leading",
        minKeys: 2,
        natural: true,
        order: "asc",
      },
    ],
    "sort-properties/sort-type-literal": "warn",
  },
};
```

## Configuration (new: `eslint.config.js`)

> **⚠️ Important note**\
> To use rules for typescript(`sort-interface`, `sort-type-literal`), you must specify the parser as `@typescript-eslint/parser`.

```js
const tseslint = require("typescript-eslint");

// Use utility function for typescript-eslint
module.exports = tseslint.config(
  { ... }
);

// Or manually specify the parser
module.exports = [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
    },
  },
];
```

Use `flat/all` to enable all rules. Here's an example configuration in your `eslint.config.js`:

```js
const sortPropertiesPlugin = require("eslint-plugin-sort-properties");

module.exports = [
  // ...
  sortPropertiesPlugin.configs["flat/all"],
];
```

or you can enable specific rules:

```js
module.exports = [
  // ...
  {
    plugins: {
      "sort-properties": require("eslint-plugin-sort-properties"),
    },
    rules: {
      "sort-properties/sort-interface": "warn",
      "sort-properties/sort-object-destructing": "warn",
      "sort-properties/sort-object-expression": [
        "warn",
        // See the options section below for more information
        {
          allowLineSeparatedGroups: false,
          caseSensitive: true,
          functionOrder: "higher",
          includeComments: "leading",
          minKeys: 2,
          natural: true,
          order: "asc",
        },
      ],
      "sort-properties/sort-type-literal": "warn",
    },
  },
];
```

## Options

All four rules shares most of the options below:

| Name                       | Description                                                                                                                                                                                                                                                | Type    | Choices                    | Default   |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------------------------- | :-------- |
| `allowLineSeparatedGroups` | If true, properties are separated independently by line breaks. Works same as [eslint sort-keys rule](https://eslint.org/docs/latest/rules/sort-keys#rule-details).                                                                                        | Boolean |                            | `true`    |
| `caseSensitive`            | Whether the comparison is case sensitive.                                                                                                                                                                                                                  | Boolean |                            | `true`    |
| `functionOrder`            | The priority of properties which values are either method or arrow function. For example, if order is 'asc' and functionOrder is 'higher', function properties will be placed at the end. this option is not available for `sort-object-destructing` rule. |         | `higher`, `lower`, `equal` | `higher`  |
| `includeComments`          | Position of comments to consider as part of the property.                                                                                                                                                                                                  |         | `leading`, `trailing`      | `leading` |
| `minKeys`                  | Minimum number of keys to check order.                                                                                                                                                                                                                     | Integer |                            | `2`       |
| `natural`                  | Whether the comparison is using a natural order. See [natural-compare](https://www.npmjs.com/package/natural-compare)                                                                                                                                      | Boolean |                            | `true`    |
| `order`                    | The order of properties.                                                                                                                                                                                                                                   | String  | `asc`, `desc`              | `asc`     |
