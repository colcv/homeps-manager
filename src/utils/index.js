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

const { filterObject } = require('./object');

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
  filterObject,
};
