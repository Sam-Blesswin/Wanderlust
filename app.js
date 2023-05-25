//Additional packages
const express = require('express');

const app = express();

const morgan = require('morgan');

//custom packages
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

/**
 * Middleware
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

/**
 * Middle ware to use static files
 */
app.use(express.static(`${__dirname}/public`));

//Custom Middlewares
app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Routes
 */
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//Mounting the Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/*
 * Handling unhandled routes
 */
//Note : This middleware is written in the last because it will catch all the unhandled routes

//app.all() //runs for all http methods
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); //if we pass an error in next() it will be skipping all other middlewares and go to the error handling middleware
});

app.use(globalErrorHandler);

module.exports = app;
