const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users/search?q=searchTerm - Search users (must be before /:id route)
router.get('/search', userController.searchUsers.bind(userController));

// GET /api/users - Get all users
router.get('/', userController.getAllUsers.bind(userController));

// GET /api/users/:id - Get user by ID
router.get('/:id', userController.getUserById.bind(userController));

// POST /api/users - Create new user
router.post('/', userController.createUser.bind(userController));

// PUT /api/users/:id - Update user (full update)
router.put('/:id', userController.updateUser.bind(userController));

// PATCH /api/users/:id - Partial update user
router.patch('/:id', userController.patchUser.bind(userController));

// DELETE /api/users/:id - Delete user
router.delete('/:id', userController.deleteUser.bind(userController));

module.exports = router;