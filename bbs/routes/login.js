const express = require('express');
const router = express.Router();
const passport = require('passport');

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
