const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../mysqlConnection');

let title = 'BBS';
router.get('/', (req, res) => {
  res.render('new', { title: title });
});

router.post('/post', (req, res) => {
  let sql = mysql.format('INSERT INTO post_db.posts (user, title, description) VALUES (?, ?, ?);',
                         ['chemi', req.body.title, req.body.description]);
  connection.query(sql, err => {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  });
});

module.exports = router;
