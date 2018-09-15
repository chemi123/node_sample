const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize_connection');

const models = {
  Users: sequelize.define('users', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  }),

  Posts: sequelize.define('posts', {
    user: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  })
}

module.exports = models;
