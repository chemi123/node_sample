const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const ECT = require('ect');
const mysql = require('mysql2');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connection = require('./mysqlConnection');

const app = express();

//---------ここからpassport-----------
app.use(flash());

app.use(require('express-session')({
  secret: 'fjaiofjfiafkldsfkadjkafk',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// 認証ロジック
passport.use(
  new LocalStrategy(
    {
      // Viewのアカウント入力フォームのname属性を指定する
      usernameField: 'user_name',
      passwordField: 'user_password',
    },
    (username, password, done) => {
      // routerのpassport.authenticate()が呼ばれたらここの処理が走る。
      console.log('authentication logic');
      let sql = mysql.format('SELECT ?? from sample_db.users WHERE user_name = ? limit 1;', 
                              [['user_name', 'password'], username]);
      connection.query(sql, (err, results) => {
        if (results) {
          if (username === results[0].user_name && password === results[0].password) {
            // ログイン成功
            return done(null, username);
          }
        }

        // ログイン失敗
        return done(null, false, { message: 'ID or Passwordが間違っています' });
      });
    }
  )
);

// 認証した際のオブジェクトをシリアライズしてセッションに保存する。
passport.serializeUser((username, done) => {
  console.log('serializeUser');
  done(null, username);
});

// 認証時にシリアライズしてセッションに保存したオブジェクトをデシリアライズする。
// デシリアライズしたオブジェクトは各routerの req.user で参照できる。
passport.deserializeUser((username, done) => {
  console.log('deserializeUser');
  done(null, { name: username, msg: 'my message' });
});

//---------ここまでpassport-----------
//
const ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext: '.ect' });
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  console.log(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
