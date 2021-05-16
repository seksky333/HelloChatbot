const express = require('express');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');

momentTimeZone.tz.setDefault('Australia/Melbourne');

const path = require('path');
const recommendationRoutes = require('./routes/recommendationRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// GLOBAL MIDDLEWARES
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// to support JSON-encoded bodies
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = moment().format();
  next();
});

app.use((req, res, next) => {
  const { method, body, query } = req;
  const { pathname } = req._parsedUrl;
  let content = '';
  if (body.constructor === Object && Object.keys(body).length !== 0) {
    content = JSON.stringify(body);
  } else {
    content = query;
  }
  console.log(`Req method:${method}`);
  console.log(`Req pathname:${pathname}`);
  // console.log(JSON.stringify(content));
  next();
});

/*
Routes
*/
app.get('/', (req, res) => {
  res.status(200).render('base');
});
app.use('/api/v1/recommendation', recommendationRoutes);

app.all('*', (req, res, next) => {
  // res.status(200).render('base');
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`
  // });
  next(
    new AppError(`Undefined page ${req.originalUrl} not on this server!`, 404)
  );
});
/*
Erro handling middleware
*/
app.use((err, req, res, next) => {
  //test to check if the error is Undefined page
  const uPRegex = new RegExp('Undefined page*');
  const isUPError = uPRegex.test(err.message);
  //if the error is not Undefined page error
  //log the error stacktace
  if (!isUPError) {
    console.log(err.stack);
  }

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

app.use(globalErrorHandler);

module.exports = app;
