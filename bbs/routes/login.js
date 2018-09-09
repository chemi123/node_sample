const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const passport = require('passport');
const connection = require('../mysqlConnection');

let title = 'BBS';

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
  '/logout',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/',
                                   failureFlash: true, badRequestMessage: '入力値が空です' }),
  (req, res, next) => {
  }
);

module.exports = router;
