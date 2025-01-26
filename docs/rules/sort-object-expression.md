# sort-properties/sort-object-expression

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Examples

👎 Examples of **incorrect** code for this rule:

```ts
const obj = {
  method() {},
  callback: () => {},
  b: 1,
  a: 2,
};
```

👍 Examples of **correct** code for this rule:

```ts
const obj = {
  a: 2,
  b: 1,
  callback: () => {}, // Function properties will be placed after regular properties.
  method() {},
};
```
