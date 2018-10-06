const request = require('supertest');
const app = require('../app');
const Helper = require('./helper');
const sequelize = require('../config/sequelize_connection');

const helper = new Helper();

describe('root test', () => {
  afterAll(() => { sequelize.close(); });

  it('Request to root path returns 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('Request to existing/nonexisting id path returns 200/404', async () => {
    await helper.insertTestData().then(async id => {
      let response = await request(app).get('/' + id);
      expect(response.statusCode).toBe(200);

      await helper.destroyTestData(id);
      response = await request(app).get('/' + id);
      expect(response.statusCode).toBe(404);
    }).catch(err => {
      console.error(err);
    });
  });
});
