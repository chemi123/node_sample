const Util = require('../util');

describe('describe1', () => {
  const util = new Util(0);
  test('(1 + 2) equals 3', () => {
    expect(util.add(1, 2)).toBe(3);
  });

  test('(1 * 2) equals 2', () => {
    expect(util.mul(1, 2)).toBe(2);
  });
  
});

describe('describe2', () => {
  const util = new Util(10);
  // itはtestのaliasなので全く同じ
  // https://jestjs.io/docs/en/api.html#testname-fn-timeout
  it('Util instance value is 10', () => {
    expect(util.value).toBe(10);
  });
});
