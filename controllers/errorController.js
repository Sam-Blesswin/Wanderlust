const AppError = require('../utils/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (!err.isOperational) {
    //Non-operational errors
    //errors caused by the program or other unkown error: we dont want to leak error details

    //Log to console for dev
    console.error('ERROR 😵', err);

    //send generic message to client
    res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });
  } else {
    //Operational errors
    //trusted errors. We can send details to client

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const key = Object.keys(err.keyValue);
  const value = Object.values(err.keyValue);
  const message = `Duplicate field value ${key} : ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors);
  const errorMessages = errors.map((error) => error.message);
  const message = `Invalid input data. ${errorMessages.join('. ')}`;
  return new AppError(message, 400);
};

/*
 *Error handling middleware
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    //let error = err; //shallow copy //reference
    let error = Object.assign(err); //deep copy

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
