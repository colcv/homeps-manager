const { StatusCodes } = require('http-status-codes');
const APIError = require('./api-error');

class UnauthenticatedError extends APIError {
  constructor(message) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

module.exports = UnauthenticatedError;
