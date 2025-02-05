# sort-properties/sort-type-literal

⚠️ This rule _warns_ in the following configs: 🌐 `all`, 🌏 `flat/all`.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/latest/use/core-concepts#rule-suggestions).

<!-- end auto-generated rule header -->

## Examples

👎 Examples of **incorrect** code for this **rule**:

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

## Options

<!-- begin auto-generated rule options list -->

| Name                       | Description                                                                                                                                                                               | Type    | Choices                    | Default   |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------------------------- | :-------- |
| `allowLineSeparatedGroups` | If true, properties are separated independently by line breaks. Works same as [eslint sort-keys rule](https://eslint.org/docs/latest/rules/sort-keys#rule-details).                       | Boolean |                            | `true`    |
| `caseSensitive`            | Whether the comparison is case sensitive.                                                                                                                                                 | Boolean |                            | `true`    |
| `functionOrder`            | The priority of properties which values are either method or arrow function. For example, if order is 'asc' and functionOrder is 'higher', function properties will be placed at the end. |         | `higher`, `lower`, `equal` | `higher`  |
| `includeComments`          | Position of comments to consider as part of the property.                                                                                                                                 |         | `leading`, `trailing`      | `leading` |
| `minKeys`                  | Minimum number of keys to check order.                                                                                                                                                    | Integer |                            | `2`       |
| `natural`                  | Whether the comparison is using a natural order. See [natural-compare](https://www.npmjs.com/package/natural-compare)                                                                     | Boolean |                            | `true`    |
| `order`                    | The order of properties.                                                                                                                                                                  | String  | `asc`, `desc`              | `asc`     |

<!-- end auto-generated rule options list -->

### Option Examples

```json
{
  "sort-properties/sort-type-literal": [
    "error",
    {
      "order": "asc",
      "caseSensitive": false,
      "natural": false,
      "allowLineSeparatedGroups": false,
      "ignoreComputedKeys": true,
      "minKeys": 3,
      "functionPriority": "higher"
    }
  ]
}
```
