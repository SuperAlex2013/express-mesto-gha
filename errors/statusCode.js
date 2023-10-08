// Successful responses
const OK = 200;
const CREATED = 201;

// Client error responses
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;

// Server error responses
const SERVER_ERROR = 500;

const respondWithSuccess = (response, payload) => {
  response.status(OK).json(payload);
};

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT_ERROR,
  SERVER_ERROR,
  respondWithSuccess,
};
