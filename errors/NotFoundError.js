const { NOT_FOUND } = require('./statusCode');

class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundError;
