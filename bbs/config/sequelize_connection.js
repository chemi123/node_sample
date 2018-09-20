const Sequelize = require('sequelize');
require('dotenv').config();

// トランザクション周りのモジュール
// この設定をやっておくと簡単にトランザクションが書けるようになるらしい
// 今回は使わないがメモしておく
// const cls = require('continuation-local-storage');
// const namespace = cls.createNamespace('my-namespace');
// Sequelize.useCLS(namespace);

console.log(process.env.DB_NAME);
console.log(process.env.USER_NAME);
console.log(process.env.USER_PASS);
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.USER_PASS, {
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
