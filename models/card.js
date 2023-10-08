const mongoose = require('mongoose');
const { IS_URL } = require('../util/constants');

// Define the card schema for MongoDB
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      // Check if the provided link is a valid URL
      validator: (url) => IS_URL.test(url),
      message: (props) => `${props.value} - некорректная ссылка!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Reference to the user model
    required: true,  // Owner is a required field
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],  // Array of users who liked the card
    default: [],  // Default is an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Default creation date is the current date and time
  },
});

// Create a Mongoose model for the card schema
const Card = mongoose.model('card', cardSchema);

// Export the Card model
module.exports = Card;
