# eslint-plugin-sort-properties

This plugin provides rules that enforce the sorting of properties in object expressions, object destructuring for JavaScript, and type literals, interface members for TypeScript.\
Inspired by [eslint-plugin-sort-keys-fix](https://www.npmjs.com/package/eslint-plugin-sort-keys-fix), it is designed to be auto-fixable but way faster by fixing misorder of properties at once. Also this plugin can be configured to include leading/trailing comments as part of the property, so there's less chance of breaking the placement of comments.\
Additionally, inspired by the [eslint-plugin-react/jsx-sort-props rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md), it supports giving higher priority to function properties when sorting.

![Demo GIF](https://raw.githubusercontent.com/haenah/eslint-plugin-sort-properties/refs/tags/v1.1.4/images/demo.gif?raw=true)

## Table of Contents

- [eslint-plugin-sort-properties](#eslint-plugin-sort-properties)
  - [Table of Contents](#table-of-contents)
  - [Rules](#rules)
  - [Installation](#installation)
  - [Configuration (legacy: `.eslintrc*`)](#configuration-legacy-eslintrc)
  - [Configuration (new: `eslint.config.js`)](#configuration-new-eslintconfigjs)
  - [Available configurations](#available-configurations)

## Rules

<!-- begin auto-generated rules list -->

⚠️ Configurations set to warn in.\
🌐 Set in the `all` configuration.\
🌏 Set in the `flatAll` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

| Name                                                             | Description                                              | ⚠️    | 🔧  | 💡  |
| :--------------------------------------------------------------- | :------------------------------------------------------- | :---- | :-- | :-- |
| [sort-interface](docs/rules/sort-interface.md)                   | Enforce interface members to be sorted.                  | 🌐 🌏 | 🔧  | 💡  |
| [sort-object-destructing](docs/rules/sort-object-destructing.md) | Enforce properties in object destructuring to be sorted. | 🌐 🌏 | 🔧  | 💡  |
| [sort-object-expression](docs/rules/sort-object-expression.md)   | Enforce properties in object expressions to be sorted.   | 🌐 🌏 | 🔧  | 💡  |
| [sort-type-literal](docs/rules/sort-type-literal.md)             | Enforce properties in type literals to be sorted.        | 🌐 🌏 | 🔧  | 💡  |

<!-- end auto-generated rules list -->

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-sort-properties`:

```bash
$ npm install eslint-plugin-sort-properties --save-dev
```

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
    "sort-properties/sort-object-expression": "warn",
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

Use `flatAll` to enable all rules. Here's an example configuration in your `eslint.config.js`:

```js
const sortPropertiesPlugin = require("eslint-plugin-sort-properties");

module.exports = [
  // ...
  sortPropertiesPlugin.configs.flatAll,
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
      "sort-properties/sort-object-expression": "warn",
      "sort-properties/sort-type-literal": "warn",
    },
  },
];
```

## Available configurations

<!-- begin auto-generated configs list -->

|     | Name      | Description                                                        |
| :-- | :-------- | :----------------------------------------------------------------- |
| 🌐  | `all`     | Apply all rules in the `sort-properties` plugin. Used in eslint<=8 |
| 🌏  | `flatAll` | Apply all rules in the `sort-properties` plugin. Used in eslint>=9 |

<!-- end auto-generated configs list -->
