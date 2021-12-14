const { StatusCodes } = require('http-status-codes');
const APIError = require('./api-error');

class NotFoundError extends APIError {
  constructor(message) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
