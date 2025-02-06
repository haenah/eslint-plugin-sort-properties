module.exports = {
  title: "Object expression<br/>4 depth object with 10 keys each",
  create() {
    const obj = {};

    for (let i = 10; i > 0; i--) {
      const l0 = {};
      for (let j = 10; j > 0; j--) {
        const l1 = {};
        for (let k = 10; k > 0; k--) {
          const l2 = {};
          for (let l = 10; l > 0; l--) {
            l2[`key${l}`] = l;
          }
          l1[`key${k}`] = l2;
        }
        l0[`key${j}`] = l1;
      }
      obj[`key${i}`] = l0;
    }

    return `const test = ${JSON.stringify(obj)};`;
  },
};
