var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectRedis = require("connect-redis")
var mongoose = require("mongoose")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var REDIS_OPTIONS = require("./config/cache");
var app = express();
var SESSION_OPTIONS = require("./config/session")
const Redis = require('redis')
const session = require('express-session');
const MONGO_URI = require("./config/db")
 ;(async () => {
  //  await mongoose.connect(MONGO_URI);
   // mongoose.connect()
 let RedisStore = connectRedis(session);
// let client = new Redis(REDIS_OPTIONS);
let client = Redis.createClient({
  ...REDIS_OPTIONS 
});
app.use(
  session({
    ...SESSION_OPTIONS,
    store: new RedisStore({ client })
  })
)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user', authRouter);

//catch 404 and forward to error handler
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
})
 })()

module.exports = app;
