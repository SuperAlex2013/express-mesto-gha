const router = require('express').Router();
const { validationCreateCard, validationCardById } = require('../middlewares/validation');
const {
  getCards, createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/card-controller');

// Получение информации о карточках
router.get('/', getCards);

// Добавление карточки
router.post('/', validationCreateCard, createCard);

// Удаление карточки
router.delete('/:cardId', validationCardById, deleteCards);

// Лайк карточки
router.put('/:cardId/likes', validationCardById, likeCard);

// Дизлайк карточки
router.delete('/:cardId/likes', validationCardById, dislikeCard);

module.exports = router;
