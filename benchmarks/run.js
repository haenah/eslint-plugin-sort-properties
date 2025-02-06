const os = require("os");
const { createShuffledObject, getTimesToFix } = require("./utils");

const rules = {
  "sort-object-expression": require("../rules/sort-object-expression"),

  "sort-keys-fix/sort-keys-fix": require("eslint-plugin-sort-keys-fix").rules[
    "sort-keys-fix"
  ],
};

const benchmarks = [
  [
    {
      title: "Object expression:<br/>1 depth object with 10000 keys each",
      create(iterations) {
        return Array.from(
          { length: iterations },
          (_, i) =>
            `const obj${i} = ${JSON.stringify(createShuffledObject(10000, 1))};`
        ).join("\n");
      },
    },
    ["sort-object-expression", "sort-keys-fix/sort-keys-fix"],
  ],
  [
    {
      title: "Object expression:<br/>2 depth object with 100 keys each",
      create(iterations) {
        return Array.from(
          { length: iterations },
          (_, i) =>
            `const obj${i} = ${JSON.stringify(createShuffledObject(100, 2))};`
        ).join("\n");
      },
    },
    ["sort-object-expression", "sort-keys-fix/sort-keys-fix"],
  ],
  [
    {
      title: "Object expression:<br/>4 depth object with 10 keys each",
      create(iterations) {
        return Array.from(
          { length: iterations },
          (_, i) =>
            `const obj${i} = ${JSON.stringify(createShuffledObject(10, 4))};`
        ).join("\n");
      },
    },
    ["sort-object-expression", "sort-keys-fix/sort-keys-fix"],
  ],
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
  const allRuleIds = Object.keys(rules);
  const header = ["Benchmark", "Time(ms)", ...allRuleIds]
    .map((cell) => cell.th("center"))
    .join("")
    .tr();

  const iterations = 5;
  const rows = await Promise.all(
    benchmarks.map(async ([benchmark, ruleIds]) => {
      const times = {};
      await Promise.all(
        ruleIds.map(async (ruleId) => {
          const rule = rules[ruleId];
          times[ruleId] = await getTimesToFix(
            rule,
            benchmark.create(iterations)
          );
        })
      );
      return ["fix", "parse", "rule", "total"]
        .map((key, i, arr) => {
          return [
            !i ? benchmark.title.td(null, arr.length) : "",
            key.td("center"),
            ...allRuleIds.map((ruleId) => {
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
    ]
      .map(([label, value]) => `- ${label}: ${value}`)
      .join("\n")
  );
  console.log("## Comparison");
  console.log(`<table>${[header, ...rows].join("")}</table>`);
}

run();
