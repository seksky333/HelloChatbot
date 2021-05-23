const express = require('express');
const moment = require('moment');
const momentTimeZone = require('moment-timezone');

momentTimeZone.tz.setDefault('Australia/Melbourne');

const path = require('path');
const historyController = require('./controllers/historyController');
const recommendationRoutes = require('./routes/recommendationRoutes');
const globalErrorHandler = require('./controllers/errorController');
const encryptionController = require('./controllers/encryptionController');
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

// Allowing Access-Control-Allow-Origin from http://localhost:8080
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
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
//reset all the historical data in the storage
historyController.reset();
//import and load restaurant history data to the server-side data storage
historyController.loadEatOutHistoryData();
module.exports = app;
