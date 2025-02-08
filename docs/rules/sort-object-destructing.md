# sort-properties/sort-object-destructing

⚠️ This rule _warns_ in the following configs: 🌐 `all`, ![JavaScript](https://img.shields.io/badge/-JS-F7DF1E?style=flat-square) `js`.

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

## Options

<!-- begin auto-generated rule options list -->

| Name                       | Description                                                                                                                                                         | Type    | Choices               | Default   |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ | :-------------------- | :-------- |
| `allowLineSeparatedGroups` | If true, properties are separated independently by line breaks. Works same as [eslint sort-keys rule](https://eslint.org/docs/latest/rules/sort-keys#rule-details). | Boolean |                       | `true`    |
| `caseSensitive`            | Whether the comparison is case sensitive.                                                                                                                           | Boolean |                       | `true`    |
| `includeComments`          | Position of comments to consider as part of the property.                                                                                                           |         | `leading`, `trailing` | `leading` |
| `minKeys`                  | Minimum number of keys to check order.                                                                                                                              | Integer |                       | `2`       |
| `natural`                  | Whether the comparison is using a natural order. See [natural-compare](https://www.npmjs.com/package/natural-compare)                                               | Boolean |                       | `true`    |
| `order`                    | The order of properties.                                                                                                                                            | String  | `asc`, `desc`         | `asc`     |

<!-- end auto-generated rule options list -->

### Option Examples

```json
{
  "sort-properties/sort-interface": [
    "error",
    {
      "order": "desc",
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
