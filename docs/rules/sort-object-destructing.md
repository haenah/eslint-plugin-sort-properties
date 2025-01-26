# sort-properties/sort-object-destructing

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Examples

👎 Examples of **incorrect** code for this rule:

```ts
const { b, a } = obj;
```

👍 Examples of **correct** code for this rule:

```ts
const { a, b } = obj;
```
