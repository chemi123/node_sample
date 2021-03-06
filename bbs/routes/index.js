const express = require('express');
const router = express.Router();
const math = require('mathjs')
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

    let current_page;
    if (req.query.page && req.query.page !== '0') {
      if (isNaN(req.query.page)) {
        console.log('invalid request parameter');
        return next();
      }

      current_page = req.query.page;
    } else {
      current_page = '1';
    }

    res.render('index', { title: title,
                          posts: posts,
                          page_num: math.ceil(posts.length/5),
                          current_page: current_page,
                          user_info: user_info });
  }).catch(err => {
    next(err);
  });
});

router.get('/:id([0-9]+)', (req, res, next) => {
  models.Posts.findById(req.params.id).then(post => {
    if (!post) {
      return next();
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
  if (!req.user || req.user.name.username !== req.body.username) {
    return next(createError(403));
  }

  models.Posts.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    next(err);
  });
});

module.exports = router;
