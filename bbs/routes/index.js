const express = require('express');
const router = express.Router();
const models = require('../models/models');

let title = 'BBS'; 

// req.userのフォーマット
// { name:
//    { username: 'chemi',
//      email: 'chemi@chemi.com',
//      password: 'hogehoge' } }
router.get('/', (req, res, next) => {
  models.Posts.findAll({
    order: [ ['updatedAt', 'DESC'] ]
  }).then(posts => {
    let user_info;
    if (req.user) {
      user_info = req.user.name
    }

    res.render('index', { title: title,
                          posts: posts,
                          user_info: user_info });
  }).catch(err => {
    next(err);
  });
});

router.get('/:id([0-9]+)', (req, res, next) => {
  models.Posts.findById(req.params.id).then(post => {
    if (!post) {
      console.log('no exists');
      next();
    }

    let user_info;
    let is_my_post = false;
    if (req.user) {
      user_info = req.user.name
      is_my_post = (req.user.name.username === post.user) ? true : false;
    }

    res.render('show', { title: title,
                         post_data: post,
                         user_info: user_info,
                         is_my_post: is_my_post });
  }).catch(err => {
    next(err);
  });
});

router.delete('/:id([0-9]+)', (req, res, next) => {
  models.Posts.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    next();
  });
});

module.exports = router;
