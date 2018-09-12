const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../mysqlConnection');

let title = 'BBS'; 

// req.userのフォーマット
// { name:
//    { username: 'chemi',
//      email: 'chemi@chemi.com',
//      password: 'hogehoge' } }
router.get('/', (req, res, next) => {
  let sql = mysql.format('SELECT ?? FROM posts;', [['id', 'user', 'title', 'description']]);
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
  let sql = mysql.format('SELECT ?? FROM posts WHERE id = ? LIMIT 1;',
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
    let is_my_post = false;
    if (req.user) {
      user_info = req.user.name
      is_my_post = (req.user.name.username === results[0].user) ? true : false;
    }

    res.render('show', { title: title,
                         post_data: results[0],
                         user_info: user_info,
                         is_my_post: is_my_post});
  });
});

router.delete('/:id([0-9]+)', (req, res, next) => {
  let sql = mysql.format('DELETE FROM posts WHERE id = ?;',
                         [req.params.id]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  });
});

module.exports = router;
