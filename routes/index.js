const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const usersRoutes = require('./users-routes');
const cardsRoutes = require('./card-routes');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
