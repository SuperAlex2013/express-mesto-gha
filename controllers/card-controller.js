const Card = require('../models/card');
const {
  BAD_REQUEST, NOT_FOUND, SERVER_ERROR, OK, CREATED,
} = require('../constants');

const handleError = (res, error, code = SERVER_ERROR) => {
  res.status(code).send({ message: `Произошла ошибка: ${error.message}` });
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(OK).json(cards);
  } catch (error) {
    handleError(res, error);
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link, owner: req.user._id });
    const savedCard = await newCard.save();

    if (savedCard.name === 'ValidationError') {
      return handleError(res, savedCard, BAD_REQUEST);
    }

    res.status(CREATED).json(savedCard);
  } catch (error) {
    handleError(res, error);
  }
};

const deleteCards = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);

    if (!deletedCard) {
      return handleError(res, new Error('Карточка с указанным _id не найдена.'), NOT_FOUND);
    }

    res.status(OK).json(deletedCard);
  } catch (error) {
    if (error.name === 'CastError') {
      return handleError(res, error, BAD_REQUEST);
    }
    handleError(res, error);
  }
};

const updateCardLikes = async (req, res, action) => {
  try {
    const method = action === 'like' ? '$addToSet' : '$pull';
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { [method]: { likes: req.user._id } },
      { new: true },
    );

    if (!updatedCard) {
      return handleError(res, new Error('Передан несуществующий _id карточки.'), NOT_FOUND);
    }

    res.status(OK).json(updatedCard);
  } catch (error) {
    if (error.name === 'CastError') {
      return handleError(res, error, BAD_REQUEST);
    }
    handleError(res, error);
  }
};

const likeCard = (req, res) => updateCardLikes(req, res, 'like');
const dislikeCard = (req, res) => updateCardLikes(req, res, 'dislike');

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
