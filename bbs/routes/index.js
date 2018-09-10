const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../mysqlConnection');

let title = 'BBS'; 
router.get('/', (req, res, next) => {
  let sql = mysql.format('SELECT ?? from posts', [['id', 'user', 'title', 'description']]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    let user_info;
    if (req.user) {
      user_info = req.user.name
    }

    res.render('index', { title: title,
                          posts: results,
                          user_info: user_info});
  });
});

router.get('/:id([0-9]+)', (req, res, next) => {
  let sql = mysql.format('SELECT ?? from posts WHERE id = ? limit 1',
                         [['id', 'user', 'title', 'description'], req.params.id]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    if (results.length < 1) {
      console.log('no exists');
      next();
    }

    let user_info;
    if (req.user) {
      user_info = req.user.name
    }

    res.render('show', { title: title,
                         post: results[0],
                         user_info: user_info});
  });
});

module.exports = router;
