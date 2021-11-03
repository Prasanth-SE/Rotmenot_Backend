let createError = require('http-errors');
let express = require('express');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let appRouter = require('./routes/v1');
const db = require('./config/db.config');
const responseMiddleWare = require('./middlewares/response.middleware');
const passportMiddleWare = require('./middlewares/passport.middleware');
const adminMiddleware = require('./middlewares/admin.middleware');
const cors = require("./middlewares/cors.middleware");
const { ProductCategory } = require('./models');

let app = express();
app.use(cors.allowCrossDomainRequests);
app.use(responseMiddleWare);
app.use(express.static(path.join(__dirname, 'public')));

//Helper function
const asyncForEach = async function (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

if (process.env.NODE_ENV === 'development') {
  const morganBody = require('morgan-body');
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  morganBody(app, {
    theme: 'darkened'
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints Base Route
app.use('/v1/auth', appRouter.authRouter);
app.use('/v1/ingredient', passportMiddleWare.jwtAuth, appRouter.ingredientRouter);
app.use('/v1/recipe', passportMiddleWare.jwtAuth, appRouter.recipeRouter);

// admin endpoint base routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;