//The AppError class is used to create custom errors.

class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // It passes the message parameter to the parent class constructor, allowing the Error class to handle the error message.
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; //This property can be used to determine whether the error is an operational error (something that can be handled) or a programming error (something that should not happen and may require debugging).
    Error.captureStackTrace(this, this.constructor); //method is used to capture and store a stack trace in the AppError instance.
  }
}

module.exports = AppError;
