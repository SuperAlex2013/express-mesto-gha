const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  updateUserAvatar
} = require('../controllers/users-controller');

// Get details of all users
router.get('/users', getUsers);

// Get details of a specific user by ID
router.get('/users/:userId', getUser);

// Add a new user's details
router.post('/users', addUser);

// Update current user's details
router.patch('/users/me', updateUser);

// Update current user's avatar
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
