const { StatusCodes } = require('http-status-codes');
const utils = require('../utils');

module.exports = async (err, req, res, next) => {
  let customError = {};

  if (err.isOperational) {
    customError = err;
  } else if (err.name === 'CastError') {
    customError = utils.createMongooseCastError(err);
  } else if (err.code === 11000) {
    customError = utils.createMongooseDuplicateKeyError(err);
  } else if (err.name === 'ValidationError') {
    customError = utils.createMongooseValidationError(err);
  } else if (err.name === 'JsonWebTokenError') {
    customError = utils.createInvalidTokenError();
  } else if (err.name === 'TokenExpiredError') {
    customError = utils.createExpiredTokenError();
  }

  res.status(customError.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: customError.status || 'error',
    message:
      customError.message || 'Something went wrong, please try again later.',
    error: process.env.NODE_ENV === 'production' ? undefined : err,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
