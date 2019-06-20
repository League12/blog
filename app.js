var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let homeRouter = require('./routes/home');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let blogRouter = require('./routes/blog');
let loginBsr = require('./routes/loginBsr');

let session = require("express-session");

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/blogTest');

var app = express();

app.use(session({
  resave : false,
  name:"test1903sessionId-key",
  secret:"yibayan",
  cookie:{maxAge:1000*3600},
  saveUninitialized:true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/register',registerRouter);
app.use('/blog',blogRouter);
app.use('/loginBsr',loginBsr);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
