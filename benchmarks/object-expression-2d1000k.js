module.exports = {
  title: "Object expression<br/>2 depth object with 1000 keys each",
  create() {
    const obj = {};

    for (let i = 1000; i > 0; i--) {
      const l0 = {};
      for (let j = 1000; j > 0; j--) {
        const l1 = {};
        l1[`key${j}`] = l1;
      }
      obj[`key${i}`] = l0;
    }

    return `const test = ${JSON.stringify(obj)};`;
  },
};
