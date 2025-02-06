const { ESLint } = require("eslint");

async function getTimesToFix(
  /** @type {import('eslint').Rule.RuleModule} */ rule,
  /** @type string */ code
) {
  const eslint = new ESLint({
    baseConfig: {
      plugins: {
        p: { rules: { r: rule } },
      },
      rules: { "p/r": "error" },
    },
    fix: true,
    fixTypes: ["suggestion"],
    stats: true,
  });
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
      (acc, pass) => acc + pass.rules["p/r"].total,
      0
    ),
    total: result.stats.times.passes.reduce((acc, pass) => acc + pass.total, 0),
  };
}

module.exports = { getTimesToFix };
