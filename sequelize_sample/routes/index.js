const express = require('express');
const router = express.Router();
const database = require('../database');
const Users = database.models.Users;
const Posts = database.models.Posts;

router.get('/', (req, res, next) => {
  // where, limit等の書き方
  // Posts.findAll({
  //   where: {
  //     id: 2
  //   },
  //   limit: 1
  // }).then(posts => {
  //   console.log(posts);
  //   res.render('index', { title: 'Express' });
  // });

  // idはprimary keyであるためこっちで十分
  Posts.findById(2).then(post => {
    console.log(post.dataValues);
    res.render('index', { title: 'Express' });
  });
});

router.get('/get', (req, res, next) => {
  // idはprimary keyであるためこっちで十分
  console.log('select');
  Posts.findById(1).then(post => {
    console.log(post.dataValues);
    res.render('index', { title: 'Express' });
  }).catch(err => {
    console.error(err);
    res.render('index', { title: 'Express' });
  });
});

router.get('/post', (req, res, next) => {
  console.log('insert');
  Posts.create({
    title: 'hoge',
    created_at: new Date()
  }).then(task => {
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.redirect('/');
  });
});

router.get('/put', (req, res, next) => {
  console.log('update');
  Posts.update({
    title: 'youtuber hikakin!',
    created_at: new Date()
  }, {
    where: { id: 1 }
  }).then(result => {
    console.log(result);
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.redirect('/');
  });
});

router.get('/delete', (req, res, next) => {
  console.log('delete');
  Posts.destroy({
    where: {
      id: 11
    }
  }).then(result => {
    console.log(result);
    res.redirect('/');
  }).catch(err => {
    console.error(err);
    res.redirect('/');
  });
});

module.exports = router;
