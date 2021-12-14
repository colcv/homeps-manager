const jwt = require('jsonwebtoken');

/**
 * Create payload for (JWT) token based on logging in user
 * @param {object} user
 * @returns {object} Payload with user's name, ID and role
 */
const createUserTokenPayload = (user) => {
  const payload = {
    name: user.name,
    userID: user._id,
    role: user.role,
  };
  return payload;
};

/**
 * Create (JWT) token with input payload
 * @param {object} payload
 * @returns {object} (JWT) Token
 */
const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

/**
 * Attach cookies to response
 * @param {object} res - Response
 * @param {object} token - (JWT) Token
 */
const attachCookiesToResponse = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_LIFETIME * 86400000),
    signed: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

module.exports = {
  createUserTokenPayload,
  createToken,
  attachCookiesToResponse,
};
