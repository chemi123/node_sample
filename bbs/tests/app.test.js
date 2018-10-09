const request = require('supertest');
const app = require('../app');
const Helper = require('./helper');
const sequelize = require('../config/sequelize_connection');

const helper = new Helper();

describe('Root path test(/)', () => {
  it('Request to root path returns 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('Request to existing id path returns 200', async () => {
    await helper.insertTestData().then(async id => {
      await request(app).get('/' + id).expect(200);
    }).catch(err => {
      fail();
    });
  });

  // 正しくセッションがある場合は削除されるテストもしたい
  it('Delete request without session fails', async () => {
    await helper.selectTestDataId().then(async id => {
      await request(app).delete('/' + id).expect(500);
    });
  });

  it('Request to no existing id path returns 404', async () => {
    await helper.selectTestDataId().then(async id => {
      await helper.destroyTestData(id);
      await request(app).get('/' + id).expect(404);
    });
  });
});

describe('Edit path test(/edit)', () => {
  afterAll(() => { sequelize.close(); });

  // セッションがないので実際にデータがなくても弾かれる
  it('', async () => {
    await request(app).get('/edit/1').expect(403);
  });

  it('Put request without session fails', async () => {
    await request(app).put('/edit/1').expect(403);
  });
});
