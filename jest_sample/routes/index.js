const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
  // res.status(200).send('Hello World!');
});

module.exports = router;
