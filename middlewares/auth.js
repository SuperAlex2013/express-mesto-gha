const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация!'));
  }

  jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'prpZUoYKk3YJ3nhemFHZ', (err, payload) => {
    if (err) {
      return next(new UnauthorizedError('Необходима авторизация!'));
    }

    req.user = payload;
    next();
  });
};
