const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const passport = require('passport');
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
  let sql = mysql.format('SELECT ?? from posts', [['id', 'user', 'title', 'description']]);
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
    }

    let user_info;
    if (req.user) {
      user_info = req.user.name
    }

    res.render('show', { title: title,
                         post: results[req.params.id-1],
                         user_info: user_info});
  });
});

router.get('/login', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }

  let errorMsg = '';
  let error = req.flash().error;
  if (error) {
    errorMsg = error[0];
  }

  res.render('login', {title: title, msg: errorMsg});
});

router.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login',
                                   failureFlash: true, badRequestMessage: '入力値が空です' }),
  (req, res, next) => {
  }
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
