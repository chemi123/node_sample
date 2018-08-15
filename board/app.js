const express = require('express');
      logger = require('morgan');
      bodyParser = require('body-parser');
      post = require('./routes/post');
      app = express();
      connect = require('connect');
      methodOverride = require('method-override');
      cookieParser = require('cookie-parser');
      session = require('express-session');
      csurf = require('csurf');

// a deprecated feature in v4
// app.use(app.router);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
// app.use(methodOverride(function(req, req) {
//   console.log(req);
//   if (req.req.body && typeof req.req.body === 'object' && '_method' in req.req.body) {
//     var method = req.req.body._method;
//     delete req.req.body._method;
//     return method;
//   }
// }));

// app.use(cookieParser());
// app.use(session({secret: 'fffff', resave: false, saveUninitialized: false}));
// app.use(csurf({cookie: true}));
// app.use(function(req, res, next) {
//   res.locals.csrftoken = req.csrfToken();
//   next();
// });
app.use(function(err, req, res, next) {
  res.send(err.message);
});

// routing
app.get('/', post.index);
app.get('/posts/:id([0-9]+)',  post.show);
app.get('/posts/new', post.new);
app.post('/posts/create',  post.create);
app.get('/posts/:id([0-9]+)/edit',  post.edit);
app.put('/posts/:id',  post.update);
app.delete('/posts/:id',  post.destroy);

app.listen(3000);
console.log("server starting...");
