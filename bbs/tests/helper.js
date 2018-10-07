const models = require('../models/models');

class Helper {
  constructor() {}

  async selectTestDataId() {
    try {
      const result = await models.Posts.findOne({
        where: {
          user: 'test user'
        }
      });

      return result.id;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }

  async insertTestData() {
    try {
      const result = await models.Posts.create({
        user: 'test user',
        title: 'test title',
        description: 'It is a test'
      });

      return result.id;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }

  async destroyTestData(id) {
    try {
      await models.Posts.destroy({
        where: {
          id: id
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Helper;
