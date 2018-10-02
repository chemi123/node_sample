const request = require('supertest');
const app = require('../app');

describe('callback', () => {
  it('callback test with done', done => {
    request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);

      // done()を呼び出しておかないと非同期処理が行われずにテスト完了の扱いとなる
      done();
    });
  });

  it('callback test in promise way', () => {
    return request(app).get('/').then(response => {
      expect(response.statusCode).toBe(200);
    });
  });

  it('callback test with async', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('expect 404 status', async() => {
    const response = await request(app).get('/noexist');
    expect(response.status).toBe(404);
  });
});
