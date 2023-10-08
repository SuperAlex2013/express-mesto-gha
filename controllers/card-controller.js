const Card = require('../models/card');
const { CREATED, handleResult } = require('../errors/statusCode');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const handleValidationError = (err, next) => {
  if (err.name === 'ValidationError') {
    next(new BadRequestError('Неверные данные при создании карточки.'));
    return true;
  }
  return false;
};

const handleCastError = (err, next, message = 'Неверные данные') => {
  if (err.name === 'CastError') {
    next(new BadRequestError(message));
    return true;
  }
  return false;
};

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => handleResult(res, cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const newCard = new Card({ name, link, owner: req.user._id });

  newCard.save()
    .then((result) => res.status(CREATED).json(result))
    .catch((err) => {
      if (!handleValidationError(err, next)) {
        next(err);
      }
    });
};

const deleteCards = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным _id не обнаружена.');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаление чужой карточки запрещено');
      }
      return Card.findByIdAndRemove(cardId).then(() => res.send({ message: 'Карточка успешно удалена' }));
    })
    .catch((err) => {
      if (!handleCastError(err, next, 'Неправильный _id')) {
        next(err);
      }
    });
};

const updateLikes = (req, res, next, action) => {
  const updateOperation = action === 'like' ? { $addToSet: { likes: req.user._id } } : { $pull: { likes: req.user._id } };

  Card.findByIdAndUpdate(req.params.cardId, updateOperation, { new: true })
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Карточка с данным _id не обнаружена.');
      }
      handleResult(res, result);
    })
    .catch(((err) => {
      if (!handleCastError(err, next, 'Неправильные данные для лайка/дизлайка')) {
        next(err);
      }
    }));
};

const likeCard = (req, res, next) => updateLikes(req, res, next, 'like');

const dislikeCard = (req, res, next) => updateLikes(req, res, next, 'dislike');

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
