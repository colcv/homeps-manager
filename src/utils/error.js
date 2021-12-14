const { BadRequestError, UnauthenticatedError } = require('../errors');
const { capitalizeFirstLetter } = require('./string');

const createMongooseCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new BadRequestError(message);
};

const createMongooseDuplicateKeyError = (err) => {
  const field = capitalizeFirstLetter(Object.keys(err.keyValue)[0]);
  // const value = Object.values(err.keyValue)[0];
  const message = `${field} has already been taken. Please use another one.`;
  return new BadRequestError(message);
};

const createMongooseValidationError = (err) => {
  const errors = Object.values(err.errors).map((item) => item.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new BadRequestError(message);
};

const createInvalidTokenError = () =>
  new UnauthenticatedError('Invalid token. Please log in again.');

const createExpiredTokenError = () =>
  new UnauthenticatedError('Your token has expired. Please log in again');

module.exports = {
  createInvalidTokenError,
  createExpiredTokenError,
  createMongooseValidationError,
  createMongooseDuplicateKeyError,
  createMongooseCastError,
};
