const { ESLint } = require("eslint");

async function getTimesToFix(
  /** @type {import('eslint').Linter.Config} */ config,
  /** @type string */ code
) {
  const eslint = new ESLint({
    baseConfig: config,
    fix: true,
    fixTypes: ["suggestion"],
    stats: true,
  });
  const ruleName = Object.keys(config.rules)[0];
  const result = (await eslint.lintText(code))[0];
  return {
    fix: result.stats.times.passes.reduce(
      (acc, pass) => acc + pass.fix.total,
      0
    ),
    parse: result.stats.times.passes.reduce(
      (acc, pass) => acc + pass.parse.total,
      0
    ),
    rule: result.stats.times.passes.reduce(
      (acc, pass) => acc + pass.rules[ruleName].total,
      0
    ),
    total: result.stats.times.passes.reduce((acc, pass) => acc + pass.total, 0),
  };
}

async function main() {
  const testObject = {};

  // 4 depth object with 10 keys each
  for (let i = 10; i > 0; i--) {
    const level1 = {};
    for (let j = 10; j > 0; j--) {
      const level2 = {};
      for (let k = 10; k > 0; k--) {
        const level3 = {};
        for (let l = 10; l > 0; l--) {
          level3[`key${l}`] = l;
        }
        level2[`key${k}`] = level3;
      }
      level1[`key${j}`] = level2;
    }
    testObject[`key${i}`] = level1;
  }

  const code = "const test = " + JSON.stringify(testObject);
  console.log(
    "sort-keys-fix: ",
    await getTimesToFix(
      {
        plugins: {
          "sort-keys-fix": require("eslint-plugin-sort-keys-fix"),
        },
        rules: {
          "sort-keys-fix/sort-keys-fix": "error",
        },
      },
      code
    )
  );
  console.log(
    "sort-properties: ",
    await getTimesToFix(
      {
        plugins: {
          "sort-properties": require(".."),
        },
        rules: {
          "sort-properties/sort-object-expression": "error",
        },
      },
      code
    )
  );
}

main();
