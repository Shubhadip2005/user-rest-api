const userService = require('../services/userService');

class UserController {
  // GET /api/users - Get all users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
        message: error.message
      });
    }
  }

  // GET /api/users/:id - Get user by ID
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error',
          message: error.message
        });
      }
    }
  }

  // POST /api/users - Create new user
  async createUser(req, res) {
    try {
      const { name, email, age } = req.body;
      const user = await userService.createUser({ name, email, age });
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      if (error.message.includes('Email already exists') || 
          error.message.includes('required') ||
          error.message.includes('must be')) {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error',
          message: error.message
        });
      }
    }
  }

  // PUT /api/users/:id - Update user (full update)
  async updateUser(req, res) {
    try {
      const { name, email, age } = req.body;
      const user = await userService.updateUser(req.params.id, { name, email, age });
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: error.message
        });
      } else if (error.message.includes('Email already exists') || 
                 error.message.includes('required') ||
                 error.message.includes('must be')) {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error',
          message: error.message
        });
      }
    }
  }

  // PATCH /api/users/:id - Partial update user
  async patchUser(req, res) {
    try {
      const updates = req.body;
      const user = await userService.updateUser(req.params.id, updates);
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: error.message
        });
      } else if (error.message.includes('Email already exists') || 
                 error.message.includes('required') ||
                 error.message.includes('must be')) {
        res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error',
          message: error.message
        });
      }
    }
  }

  // DELETE /api/users/:id - Delete user
  async deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: user
      });
    } catch (error) {
      if (error.message === 'User not found') {
        res.status(404).json({
          success: false,
          error: 'Not Found',
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error',
          message: error.message
        });
      }
    }
  }

  // GET /api/users/search?q=searchTerm - Search users
  async searchUsers(req, res) {
    try {
      const searchTerm = req.query.q;
      
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Search term (q) is required'
        });
      }

      const users = await userService.searchUsers(searchTerm);
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Server Error',
        message: error.message
      });
    }
  }
}

module.exports = new UserController();