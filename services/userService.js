const { db } = require('../config/database');
const User = require('../models/User');

class UserService {
  // Create a new user
  async createUser(userData) {
    // Validate input
    const validation = User.validate(userData);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // SQL query to insert user
    const query = `
      INSERT INTO users (name, email, age)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [
      userData.name.trim(),
      userData.email.toLowerCase().trim(),
      userData.age
    ];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      // Handle duplicate email error
      if (error.code === '23505') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    const query = 'SELECT * FROM users ORDER BY id ASC;';
    
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  // Get user by ID
  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1;';
    
    try {
      const result = await db.query(query, [parseInt(id)]);
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error.message === 'User not found') {
        throw error;
      }
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  // Update user
  async updateUser(id, userData) {
    // First, get the existing user
    const existingUser = await this.getUserById(id);

    // Prepare data to validate
    const dataToValidate = {
      name: userData.name !== undefined ? userData.name : existingUser.name,
      email: userData.email !== undefined ? userData.email : existingUser.email,
      age: userData.age !== undefined ? userData.age : existingUser.age
    };

    // Validate
    const validation = User.validate(dataToValidate);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (userData.name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(userData.name.trim());
      paramCount++;
    }

    if (userData.email !== undefined) {
      updates.push(`email = $${paramCount}`);
      values.push(userData.email.toLowerCase().trim());
      paramCount++;
    }

    if (userData.age !== undefined) {
      updates.push(`age = $${paramCount}`);
      values.push(userData.age);
      paramCount++;
    }

    // Add updated_at timestamp
    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    // Add id to values array
    values.push(parseInt(id));

    // Build final query
    const query = `
      UPDATE users 
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *;
    `;

    try {
      const result = await db.query(query, values);
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      
      return result.rows[0];
    } catch (error) {
      // Handle duplicate email error
      if (error.code === '23505') {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  // Delete user
  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    
    try {
      const result = await db.query(query, [parseInt(id)]);
      
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error.message === 'User not found') {
        throw error;
      }
      throw new Error('Error deleting user: ' + error.message);
    }
  }

  // Get users count
  async getUsersCount() {
    const query = 'SELECT COUNT(*) as count FROM users;';
    
    try {
      const result = await db.query(query);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw new Error('Error counting users: ' + error.message);
    }
  }

  // Search users by name or email
  async searchUsers(searchTerm) {
    const query = `
      SELECT * FROM users 
      WHERE name ILIKE $1 OR email ILIKE $1
      ORDER BY id ASC;
    `;
    
    try {
      const result = await db.query(query, [`%${searchTerm}%`]);
      return result.rows;
    } catch (error) {
      throw new Error('Error searching users: ' + error.message);
    }
  }
}

// Export singleton instance
module.exports = new UserService();