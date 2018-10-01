describe('callback', () => {
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
});
