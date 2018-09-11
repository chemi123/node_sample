const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const connect = require('connect');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');

const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const loginRouter = require('./routes/login');
const editRouter = require('./routes/edit');
const connection = require('./mysqlConnection'); 
const app = express();

// -----passport settings begin-----
app.use(flash());

app.use(require('express-session')({
  secret: 'oidjfoajdfoafjapoj',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// authentication logic
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'pass'
    },
    (email, password, done) => {
      let sql = mysql.format('SELECT ?? FROM users WHERE email = ? limit 1;',
                             [['username', 'email', 'password'], email]);
      connection.query(sql, (err, results) => {
        if (results.length === 1) {
          if (email === results[0].email && password === results[0].password) {
            return done(null, results[0]);
          }
        }

        return done(null, false, { message: 'ID or Passwordが間違っています' });
      });
    }
  )
);

passport.serializeUser((username, done) => {
  console.log('serialize user');
  done(null, username);
});

passport.deserializeUser((username, done) => {
  console.log('deserialize user');
  done(null, { name: username });
});
// -----passport settings end-------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// routing
app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/new', postRouter);
app.use('/edit', editRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
