var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var catalogController = require('./controllers/catalogController');
var profileController = require('./controllers/profileController');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

//app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//set the path for static resources to be accessible
app.use('/resources', express.static('resources'));

//post handling
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//session handling
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({secret: "nbad session secret"}));

//  routes defining
//  define the routes and add the controllers
app.use('/', catalogController);
app.use('/', profileController);

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

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

app.listen(3000, '127.0.0.1');
