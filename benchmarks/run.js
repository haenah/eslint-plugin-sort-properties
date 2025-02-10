const os = require("os");
const {
  createShuffledObjectDestructing,
  createShuffledObjectExpression,
  getTimesToFix,
} = require("./utils");

const rules = {
  "sort-properties": {
    "sort-object-destructing": require("../rules/sort-object-destructing"),
    "️sort-object-expression": require("../rules/sort-object-expression"),
  },

  "sort-keys-fix": {
    rule: require("eslint-plugin-sort-keys-fix").rules["sort-keys-fix"],
    url: "https://npmjs.com/package/eslint-plugin-sort-keys-fix",
  },

  "sort-destructure-keys": {
    rule: require("eslint-plugin-sort-destructure-keys").rules[
      "sort-destructure-keys"
    ],
    url: "https://npmjs.com/package/eslint-plugin-sort-destructure-keys",
  },
};

const benchmarks = [
  ...[
    [4096, 1],
    [64, 2],
    [8, 4],
  ].map(([keys, depth]) => [
    `Object expression:<br/>${depth} depth object with ${keys} keys each`,
    () => `const obj = ${createShuffledObjectExpression(keys, depth)};`,
    ["sort-properties/️sort-object-expression", "sort-keys-fix"],
  ]),
  ...[
    [4096, 1],
    [64, 2],
    [8, 4],
  ].map(([keys, depth]) => [
    `Object destructuring:<br/>${depth} depth object with ${keys} keys each`,
    () => `const ${createShuffledObjectDestructing(keys, depth)} = obj;`,
    ["sort-properties/sort-object-destructing", "sort-destructure-keys"],
  ]),
];

String.prototype.th = function (align) {
  return `<th ${align ? `style="text-align:${align};"` : ""}>${this}</th>`;
};
String.prototype.td = function (align, rowspan) {
  return `<td ${[
    align && `style="text-align:${align}";`,
    rowspan && `rowspan="${rowspan}"`,
  ]
    .filter(Boolean)
    .join(" ")}>${this}</td>`;
};
String.prototype.tr = function () {
  return `<tr>${this}</tr>`;
};

async function run() {
  const ruleEntries = Object.entries(rules);
  const header = [
    "Benchmark",
    "Time(ms)",
    ...ruleEntries.map(([groupName, group]) =>
      group.url ? `<a href="${group.url}">${groupName}</a>` : groupName
    ),
  ]
    .map((cell) => cell.th("center"))
    .join("")
    .tr();

  const iterations = 10;
  const rows = await Promise.all(
    benchmarks.map(async ([title, create, ruleIds]) => {
      const times = {};
      await Promise.all(
        ruleIds.map(async (ruleId) => {
          let groupName, rule;
          const [displayNamegroupN, ruleName] = ruleId.split("/");
          [groupName, rule] = [
            displayNamegroupN,
            rules[displayNamegroupN][ruleName || "rule"],
          ];
          const results = await Promise.all(
            Array.from({ length: iterations }, () =>
              getTimesToFix(rule, create())
            )
          );
          times[groupName] = {
            fix:
              results.reduce((acc, result) => acc + result.fix, 0) / iterations,
            parse:
              results.reduce((acc, result) => acc + result.parse, 0) /
              iterations,
            rule:
              results.reduce((acc, result) => acc + result.rule, 0) /
              iterations,
            total:
              results.reduce((acc, result) => acc + result.total, 0) /
              iterations,
          };
        })
      );
      return ["fix", "parse", "rule", "total"]
        .map((key, i, arr) => {
          return [
            !i ? title.td(null, arr.length) : "",
            key.td("center"),
            ...ruleEntries.map(([ruleId]) => {
              const time = times[ruleId];
              return time?.[key]?.toFixed(2)?.td("end") ?? "".td("center");
            }),
          ]
            .join("")
            .tr();
        })
        .join("");
    })
  );

  console.log("# Benchmark results");
  console.log("See [benchmark runner code](run.js) for more information.");
  console.log(`## Running environment`);
  console.log(
    [
      ["Node.js", process.version],
      ["Architecture", os.arch()],
      ["Platform", os.platform()],
      ["CPU", os.cpus()[0].model],
      ["OS", `${os.type()} ${os.release()}`],
      ["\\# of iterations", iterations],
    ]
      .map(([label, value]) => `- ${label}: ${value}`)
      .join("\n")
  );
  console.log("## Comparison");
  console.log(`<table>${[header, ...rows].join("")}</table>`);
}

run();
