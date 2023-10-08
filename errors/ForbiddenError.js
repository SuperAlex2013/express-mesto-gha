const { FORBIDDEN } = require('./statusCode');

class ForbiddenError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
