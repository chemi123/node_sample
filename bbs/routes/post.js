const express = require('express');
const router = express.Router();
const models = require('../models/models');

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

  models.Posts.create({
    user: req.user.name.username,
    title: req.body.title,
    description: req.body.description
  }).then(result => {
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
