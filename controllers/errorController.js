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

/*
 *Error handling middleware
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
