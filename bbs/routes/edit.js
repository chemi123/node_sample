const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const models = require('../models/models');

let title = 'BBS'; 

router.get('/:id([0-9]+)', (req, res, next) => {
  models.Posts.findById(req.params.id).then(post => {
    if (!post) {
      console.log('no exists');
      return next();
    }

    let user_info;
    if (!req.user || req.user.name.username !== post.user) {
      return next(createError(403));
    }
    user_info = req.user.name;

    res.render('edit', { title: title,
                         post_data: post,
                         user_info: user_info });
  }).catch(err => {
    console.error(err);
    next(err);
  });
});

router.put('/:id([0-9]+)', (req, res, next) => {
  models.Posts.update({
    title: req.body.title,
    description: req.body.description
  }, {
    where: { id: req.params.id }
  }).then(result => {
    res.redirect('/' + req.params.id);
  }).catch(err => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
