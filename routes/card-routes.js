const router = require('express').Router();

const {
  getCards, createCard, deleteCards, likeCard, dislikeCard,
} = require('../controllers/card-controller');

// Retrieve information about all cards
router.get('/cards', getCards);

// Add a new card
router.post('/cards', createCard);

// Remove a card
router.delete('/cards/:cardId', deleteCards);

// Add a like to a card
router.put('/cards/:cardId/likes', likeCard);

// Remove a like from a card
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
