const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../mysqlConnection');

let title = 'BBS';
router.get('/', (req, res, next) => {
  if (req.user) {
    res.render('new', { title: title,
                        user_info: req.user.name });
  } else {
    res.redirect('/login');
  }
});

router.post('/post', (req, res, next) => {
  if (!req.user) {
    console.error('not in session');
    res.redirect('/login');
  }

  let sql = mysql.format('INSERT INTO post_db.posts (user, title, description) VALUES (?, ?, ?);',
                         [req.user.name.username, req.body.title, req.body.description]);
  connection.query(sql, err => {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  });
});

module.exports = router;
