const { NotFoundError } = require('../errors');

module.exports = (req, res) => {
  throw new NotFoundError(
    `Can't ${req.method} ${req.originalUrl} on this server`
  );
};
