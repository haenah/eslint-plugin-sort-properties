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
  const [result] = await eslint.lintText(code);
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
      (acc, pass) => acc + (pass.rules?.["p/r"]?.total ?? 0),
      0
    ),
    total: result.stats.times.passes.reduce((acc, pass) => acc + pass.total, 0),
  };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function createShuffledObjectExpression(length, depth) {
  if (!depth) return "value";
  return `{${shuffleArray(
    Array.from(
      { length },
      (_, i) => `key${i}: ${createShuffledObjectExpression(length, depth - 1)}`
    )
  ).join(",")}}`;
}
function createShuffledObjectDestructing(length, depth, prefix = "value") {
  if (!depth) return prefix;
  return `{${shuffleArray(
    Array.from(
      { length },
      (_, i) =>
        `key${i}: ${createShuffledObjectDestructing(
          length,
          depth - 1,
          `${prefix}_${i}`
        )}`
    )
  ).join(",")}}`;
}

module.exports = {
  createShuffledObjectDestructing,
  createShuffledObjectExpression,
  getTimesToFix,
};
