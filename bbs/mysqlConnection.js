const mysql = require('mysql2');
const db_config = { 
  host     : 'localhost',
  user     : 'chemi',
  password : 'hogehoge',
  database : 'post_db'
}
const connection = mysql.createConnection(db_config);

module.exports = connection;
