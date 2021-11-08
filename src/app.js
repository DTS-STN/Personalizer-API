const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const authenticateToken = require('./middlewares/auth');

require('dotenv/config');
const personalizaion = require('./routes/v1/personalization_route');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const config = require('./config/config');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.get('/', (req, res) => {
  res.json({
    status: 'server is up',
  });
});

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

if (config.env === 'dev') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

if (config.env === 'prod') {
  app.use('/api/v1', authenticateToken);
}

// actual business endpoints
app.use('/api/v1', personalizaion);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
