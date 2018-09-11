const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const connection = require('../mysqlConnection');

let title = 'BBS'; 
router.get('/:id([0-9]+)', (req, res, next) => {
  let sql = mysql.format('SELECT ?? FROM posts WHERE id = ? LIMIT 1;',
                        [['id', 'user', 'title', 'description'], req.params.id]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    if (results.length < 1) {
      next();
    }

    let user_info;
    if (req.user) {
      user_info = req.user.name;
    }

    res.render('edit', { title: title,
                         post_data: results[0],
                         user_info: user_info });
  });
});

router.put('/:id([0-9]+)', (req, res, next) => {
  let sql = mysql.format('UPDATE posts SET title = ?, description = ? WHERE id = ?',
                         [req.body.title, req.body.description, req.params.id]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    res.redirect('/' + req.params.id);
  });
});

module.exports = router;
