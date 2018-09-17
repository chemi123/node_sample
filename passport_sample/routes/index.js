const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  let errorMsg = '';
  let error = req.flash().error;
  if (error) {
    errorMsg = error[0];
  }

  res.render('index', { title: 'Express', msg: errorMsg });
});

router.post(
  '/login',
  passport.authenticate('local', { successRedirect: '/mypage', failureRedirect: '/',
                                   failureFlash: true, badRequestMessage: '入力値が空です' }),
  (req, res, next) => {
    // 認証成功した場合のコールバック
    // 成功時のredirectはsuccessRedirectで指定してる
    console.log('login succeeded');
  }
);

router.get('/mypage', (req, res, next) => {
  console.log('mypage');
  console.log(req.user);

  if (req.user) {
    res.render('mypage', { title: 'Mypage' });
  } else {
    res.redirect('/');
  }
});

router.get('/setting', (req, res, next) => {
  console.log('setting');
  console.log(req.user);

  if (req.user) {
    res.render('setting', { title: 'Setting' });
  } else {
    res.redirect('/');
  }
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
