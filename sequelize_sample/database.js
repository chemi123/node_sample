const Sequelize = require('sequelize');

// トランザクション周りのモジュール
// この設定をやっておくと簡単にトランザクションが書けるようになるらしい
// 今回は使わないがメモしておく
// const cls = require('continuation-local-storage');
// const namespace = cls.createNamespace('my-namespace');
// Sequelize.useCLS(namespace);

const sequelize = new Sequelize('sample_db', 'chemi', 'hogehoge', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: false
});

const models = {
  Users: sequelize.define(
    'users', {
      user_id: {
        type: Sequelize.INTEGER,
	primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    }, {
      // デフォルトでcreated_at及びupdated_atのカラムをselectするので要らない場合はfalseにする
      timestamps: false
    }
  ),
  Posts: sequelize.define(
    'posts', {
      title: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      }
    }, {
      timestamps: false
    }
  )
}

module.exports = {
  sequelize: sequelize,
  models: models
}
