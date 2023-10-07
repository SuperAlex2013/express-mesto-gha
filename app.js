// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users-routes');
const cardsRoutes = require('./routes/card-routes');
const { NOT_FOUND } = require('./constants');

// Set default port to 3000 if not defined in environment variables
const { PORT = 3000 } = process.env;

// Define the MongoDB database URL
const DB = 'mongodb://127.0.0.1:27017/mestodb';

// Initialize the Express app
const app = express();

// Middleware to attach user information to the request object
// (For this example, the user id is hardcoded)
app.use((req, res, next) => {
  req.user = {
    _id: '65217a8d39cadf4df9d92478',
  };

  // Move on to the next middleware/route handler
  next();
});

// Use built-in express middleware to parse JSON bodies
app.use(express.json());

// Register user and card routes
app.use(usersRoutes);
app.use(cardsRoutes);

// Handle routes that are not explicitly defined (404 Not Found routes)
app.use('/*', (req, res, next) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена.' });

  next();
});

// Connect to MongoDB
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB '))  // Log on successful connection
  .catch((err) => console.log(`DB connection error: ${err}`));  // Log if there's any connection error

// Start the Express app
app.listen(PORT, (err) => {
  if (err) {
    // Log if there's an error starting the server
    console.log(err);
  } else {
    // Log the port on which the server is running
    console.log(`Listen port ${PORT}`);
  }
});
