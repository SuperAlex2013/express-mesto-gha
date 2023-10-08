const { SERVER_ERROR } = require('../errors/statusCode');

const serverLog = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    // Проверка статуса и установка соответствующего сообщения
    message: statusCode === SERVER_ERROR
      ? 'Произошла ошибка на сервере'
      : message,
  });

  next();
};

module.exports = {
  serverLog,
};
