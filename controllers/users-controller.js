const User = require('../models/user');
const {
  BAD_REQUEST, NOT_FOUND, SERVER_ERROR, OK, CREATED,
} = require('../constants');

const sendErrorResponse = (res, error, status, message) => {
  res.status(status || SERVER_ERROR).send({ message: message || `Произошла ошибка: ${error.message}` });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(OK).json(users);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return sendErrorResponse(res, null, NOT_FOUND, 'Пользователь с указанным _id не найден.');
    }
    res.status(OK).json(user);
  } catch (error) {
    if (error.name === 'CastError') {
      return sendErrorResponse(res, error, BAD_REQUEST, 'Некорректный id ползователя.');
    }
    sendErrorResponse(res, error);
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    res.status(CREATED).json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendErrorResponse(res, error, BAD_REQUEST, 'Переданы некорректные данные');
    }
    sendErrorResponse(res, error);
  }
};

const updateUserDetails = async (req, res, details, errorMsg) => {
  try {
    const result = await User.findByIdAndUpdate(req.user._id, details, { new: true, runValidators: true });
    if (!result) {
      return sendErrorResponse(res, null, NOT_FOUND, 'Пользователь с указанным _id не найден.');
    }
    res.status(OK).json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendErrorResponse(res, error, BAD_REQUEST, errorMsg);
    }
    sendErrorResponse(res, error);
  }
};

const updateUser = (req, res) => updateUserDetails(req, res, { name: req.body.name, about: req.body.about }, 'Переданы некорректные данные при обновлении профиля.');

const updateUserAvatar = (req, res) => updateUserDetails(req, res, { avatar: req.body.avatar }, 'Переданы некорректные данные при обновлении аватара.');

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateUserAvatar,
};
