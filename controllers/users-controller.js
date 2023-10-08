const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { OK } = require('../errors/statusCode');

const handleResponse = (res, data, statusCode = OK) => res.status(statusCode).json(data);

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => handleResponse(res, users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => handleResponse(res, user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по данному _id не обнаружен.');
      }
      handleResponse(res, user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Неправильный формат Id'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по данному _id не обнаружен.');
      }
      handleResponse(res, result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибочные данные при обновлении профиля.'));
        return;
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователь по данному _id не обнаружен.');
      }
      handleResponse(res, result);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибочные данные при обновлении аватара.'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
};
