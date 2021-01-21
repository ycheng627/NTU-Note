var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');
var {dbpath} = require('./config');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var noteRouter = require('./routes/notes');

var app = express();
mongoose.connect(dbpath, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to mongodb!');
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'some secret key',
  resave: true,
  saveUninitialized: true,
  cookie: {secure: false}
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/api/notes', noteRouter);
app.use('*', indexRouter);

module.exports = app;
