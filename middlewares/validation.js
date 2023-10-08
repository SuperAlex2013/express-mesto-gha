const { celebrate, Joi } = require('celebrate');
const { IS_URL } = require('../util/constants');

// ---------------------------------------- User Validations --------------------------- /

// Регистрация пользователя
const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(IS_URL),
  }),
});

// Вход в систему
const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

// Получение информации о пользователе по id
const validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

// Обновление профиля пользователя
const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// Обновление аватара пользователя
const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(IS_URL).required(),
  }),
});

// ---------------------------------------- Card Validations --------------------------- /

// Создание новой карточки
const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(IS_URL).required(),
  }),
});

// Валидация карточки по id
const validationCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validationCreateUser,
  validationLogin,
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardById
};
