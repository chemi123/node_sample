const express = require('express');
const router = express.Router();
const models = require('../models/models');

const DUPLICATE_KEY_ERR = 1062;
const DUPLICATE_EMAIL_ERROR_MESSAGE = 'すでに使われているusername or emailです';

let title = 'BBS';

router.get('/', (req, res, next) => {
  if (req.user) {
    res.redirect('/');
  }

  res.render('register', { title: title });
});

router.post('/', (req, res, next) => {
  if (req.body.pass1 !== req.body.pass2) {
    return res.render('register', { title: title, msg : 'パスワードが一致しません' });
  }

  models.Users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.pass1
  }).then(task => {
    res.redirect('/login');
  }).catch(err => {
    res.render('register', { title: title,
                             msg : (err.original.errno === DUPLICATE_KEY_ERR) ?
                                   DUPLICATE_EMAIL_ERROR_MESSAGE : err });
  }); 
});

module.exports = router;
