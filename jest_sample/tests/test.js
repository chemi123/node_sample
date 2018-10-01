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

it('callback test starts', done => {
  let callback = () => {
    let a = 10;
    expect(a).toBe(10);

    // jestの基本仕様はテストの最後の行(この例の場合だとsetTimeoutが呼ばれた時)に終了する
    // そのため、この例のcallback関数を呼びたいのであればdoneを呼んでおく必要がある
    done();
  }

  setTimeout(callback, 1000);
});
