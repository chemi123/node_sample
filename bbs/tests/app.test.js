const request = require('supertest');
const app = require('../app');
const Helper = require('./helper');
const sequelize = require('../config/sequelize_connection');

const helper = new Helper();

describe('root test', () => {
  it('Request to root path returns 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Request to root/:id test', () => {
  afterAll(() => { sequelize.close(); });

  it('Request to existing id path returns 200', async () => {
    await helper.insertTestData().then(async id => {
      await request(app).get('/' + id).expect(200);
    }).catch(err => {
      fail();
    });
  });

  it('Request to no existing id path returns 404', async () => {
    await helper.selectTestDataId().then(async id => {
      await request(app).delete('/' + id).expect(302);
      await request(app).get('/' + id).expect(404);
    });
  });
});
