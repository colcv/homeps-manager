const {
  createToken,
  createUserTokenPayload,
  attachCookiesToResponse,
} = require('./token');

const { capitalizeFirstLetter } = require('./string');

const {
  createInvalidTokenError,
  createExpiredTokenError,
  createMongooseValidationError,
  createMongooseDuplicateKeyError,
  createMongooseCastError,
} = require('./error');

module.exports = {
  createToken,
  createUserTokenPayload,
  attachCookiesToResponse,
  capitalizeFirstLetter,
  createInvalidTokenError,
  createExpiredTokenError,
  createMongooseValidationError,
  createMongooseDuplicateKeyError,
  createMongooseCastError,
};
