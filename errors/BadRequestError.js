const { BAD_REQUEST } = require('./statusCode');

class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = BAD_REQUEST;
  }
}
module.exports = BadRequestError;
