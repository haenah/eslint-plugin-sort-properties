# sort-properties/sort-type-literal

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Examples

👎 Examples of **incorrect** code for this rule:

```ts
type Foo = {
  [key: string]: string;
  method(): void;
  callback: () => void;
  b: string;
  a: string;
};
```

👍 Examples of **correct** code for this rule:

```ts
type Foo = {
  a: string;
  b: string;
  callback: () => void; // Function properties will be placed after regular properties.
  method(): void;
  [key: string]: string; // Index signature will always be last
};
```
