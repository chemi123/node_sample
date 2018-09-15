const express = require('express');
const router = express.Router();
const models = require('../models/models');

let title = 'BBS'; 

router.get('/:id([0-9]+)', (req, res, next) => {
  models.Posts.findById(req.params.id).then(post => {
    if (!post) {
      console.log('no exists');
      next();
    }

    let user_info;
    if (req.user) {
      user_info = req.user.name;
    }

    res.render('edit', { title: title,
                         post_data: post,
                         user_info: user_info });
  }).catch(err => {
    console.error(err);
    next();
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
    next();
  });
});

module.exports = router;
