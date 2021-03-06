var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var apiTest = require('./routes/test');

var apiCategory = require('./routes/category');
var apiComment = require('./routes/comment');
var apiCompany = require('./routes/company');
var apiPortfolio = require('./routes/portfolio');
var apiPublication = require('./routes/publication');
var apiUser = require('./routes/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next){
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'content-type');
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
//  });

app.use('/', indexRouter);
app.use('/test', apiTest);

//app.use('/api', apiRouter);
app.use('/api/category', apiCategory);
app.use('/api/comment', apiComment);
app.use('/api/company', apiCompany);
app.use('/api/portfolio', apiPortfolio);
app.use('/api/publication', apiPublication);
app.use('/api/user', apiUser);


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


var PORT = process.env.PORT || '3000';
app.listen(PORT, function() {
  console.log('Server listening on port %d', PORT);
});

//var opn = require('opn');
//opn(`http://localhost:${PORT}`);

module.exports = app;


