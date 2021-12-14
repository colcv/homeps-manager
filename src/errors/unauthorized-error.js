const { StatusCodes } = require('http-status-codes');
const APIError = require('./api-error');

class UnauthorizedError extends APIError {
  constructor(message) {
    super(StatusCodes.FORBIDDEN, message);
  }
}

module.exports = UnauthorizedError;
