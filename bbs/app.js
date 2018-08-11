const http = require('http');
      qs = require('querystring');
      mongodb = require('mongodb');
      assert = require('assert');
      settings = require('./settings'); 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  // res.writeHeader(200, 'Content-Type', 'text/html; charset=UTF-8');

  switch (req.url) {
    case '/':
      topPage(req, res);
      break;
    case '/up': upPage(req, res)
      break;
    default:
      notFoundPage(req, res);
      break;
  }
});

var MongoClient = mongodb.MongoClient;
var DB;
var posts = [];

let header = (req, res) => {
  res.write('<html><head><title>掲示板</title><style>* {box-sizing:border-box;}</style></head><body style="position:relative;height:100%;">');
  res.write('<header style="border:1px solid #888;padding:40px;">掲示板</header>');
  res.write('<nav><ul><li><a href="/">トップ</a></li><li><a href="/up">投稿</a></li></nav>');
}

let footer = (req, res) => {
  res.write('<footer style="position:absolute;bottom:0;width:100%;border:1px solid #888;text-align:center;padding:20px;">フッター</footer>\n'); // 共通のフッター
  res.end('</body></html>'); // res.endでもコンテンツを返せる
}

// トップページ
let topPage = (req,res) => {
  header(req,res);
  res.write('<h2>トップページ</h2>\n');
  // footer(req,res);

  getKakikomi((posts) => {
    res.write('<ul>');

    for (let row of posts) {
      console.log(row);
      res.write('<li>' + row.kakikomi + '</li>\n');
    }

    res.write('</ul>');
    footer(req, res);
  });
}

let upPage = (req,res) => {
  header(req,res);

  if (req.method === 'GET') {
    res.write('<h2>投稿します</h2>\n');
    res.write('<form action="/up" method="post"><div><textarea name="kakikomi" style="width:80%;height:100px"></textarea><div><div><input type="submit" value="投稿"></div></form>');
    footer(req,res);
    return;
  }

  if (req.method === 'POST') {
    let body = []; req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      parsedBody = qs.parse(body);
      console.log(parsedBody);

      if (parsedBody) {
        postKakikomi(parsedBody, () => {
          res.write('<h2>投稿しました</h2>\n');
          res.write(decodeURIComponent(parsedBody.kakikomi));
          footer(req,res);
        });
      }
    });
  }
}

// その他のページ
let notFoundPage = (req,res) => {
  res.statusCode = 404;
  header(req,res);
  res.write('<h2>ページはありません</h2>');
  footer(req,res);
}

let getKakikomi = (callback) => {
  DB.collection('posts').find().toArray((err, docs) => {
    callback(docs);
  });
}

let postKakikomi = (json, callback) => {
  DB.collection('posts').insertOne(json, () => {
    console.log('inserted');
    callback();
  });
}

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  assert.equal(null, err);
  console.log("Connected successfully to mongod server");
  DB = client.db('app1');
});

server.listen(settings.port, settings.host, () => {
  console.log('server listening...');
})
