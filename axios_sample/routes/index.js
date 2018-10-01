const express = require('express');
const axiosBase = require('axios');

const axios = axiosBase.create({
  baseURL: 'http://localhost:3000', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'text/plain',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'text'
});

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  axios.get('/axios')
    .catch(error => {
      // error handling
      console.error(error.response.data.err);
    })
    // this is called whether succeed or fail
    .then(response => {
      let axios_data;
      if (response) {
        axios_data = response.data;
      }

      res.render('index', { title: 'Express',
                            axios_data: axios_data });
    });
});

router.get('/axios', (req, res, next) => {
  res.send('hoge');
  // res.status(500).send({ err: "error!" });
});

module.exports = router;
