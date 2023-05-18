//Additional packages
const express = require('express');
const app = express();

const morgan = require('morgan');

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

module.exports = app;
