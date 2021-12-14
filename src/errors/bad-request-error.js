const { StatusCodes } = require('http-status-codes');
const APIError = require('./api-error');

class BadRequestError extends APIError {
  constructor(message) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
