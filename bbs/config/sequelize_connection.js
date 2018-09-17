const Sequelize = require('sequelize');
require('dotenv').config();

// トランザクション周りのモジュール
// この設定をやっておくと簡単にトランザクションが書けるようになるらしい
// 今回は使わないがメモしておく
// const cls = require('continuation-local-storage');
// const namespace = cls.createNamespace('my-namespace');
// Sequelize.useCLS(namespace);

const sequelize = new Sequelize('post_db', 'chemi', process.env.USER_PASS, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // ないと警告が出る
  operatorsAliases: false
});

module.exports = sequelize;
