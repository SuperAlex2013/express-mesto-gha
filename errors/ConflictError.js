const { CONFLICT_ERROR } = require('./statusCode');

class ConflictError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
