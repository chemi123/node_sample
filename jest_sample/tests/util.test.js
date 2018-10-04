const Util = require('../util');
const Util2 = require('../util2');

describe('util test', () => {
  const util = new Util(0);
  test('(1 + 2) equals 3', () => {
    expect(util.add(1, 2)).toBe(3);
  });

  test('(1 * 2) equals 2', () => {
    expect(util.mul(1, 2)).toBe(2);
  });
  
});

describe('util2 test', () => {
  const util2 = new Util2(10);

  it('this.value of util2 is 10', () => {
    expect(util2.getValue).toBe(10);
  });

  it('this.value of util2 is 20 after set to 20', () => {
    util2.setValue = 20;
    expect(util2.getValue).toBe(20);
  });

  it('(1 + 2) equals 3', () => {
    expect(util2.add(1, 2)).toBe(3);
  });

  it('(1 * 2) equals 2', () => {
    expect(util2.mul(1, 2)).toBe(2);
  });
});
