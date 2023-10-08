const router = require('express').Router();

// Middleware
const {
  validationUserId,
  validationUpdateUser,
  validationUpdateAvatar,
} = require('../middlewares/validation');

// Controllers
const {
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users-controller');

// Routes

// Получение всех пользователей
router.get('/', getUsers);

// Получение текущего пользователя
router.get('/me', getCurrentUser);

// Получение пользователя по ID
router.get('/:userId', validationUserId, getUser);

// Обновление профиля пользователя
router.patch('/me', validationUpdateUser, updateUser);

// Обновление аватара пользователя
router.patch('/me/avatar', validationUpdateAvatar, updateUserAvatar);

module.exports = router;
