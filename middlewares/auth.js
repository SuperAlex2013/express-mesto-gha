const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const devSecret = 'prpZUoYKk3YJ3nhemFHZ';

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Токен отсутствует!'));
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecret);
  } catch (err) {
    next(new UnauthorizedError('Ошибка при верификации токена!'));
    return;
  }

  req.user = payload;
  next();
};
