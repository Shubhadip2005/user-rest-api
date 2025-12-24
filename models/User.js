class User {
  constructor(id, name, email, age, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Validation methods
  static validate(userData) {
    const errors = [];

    if (!userData.name || typeof userData.name !== 'string' || userData.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }

    if (!userData.email || typeof userData.email !== 'string') {
      errors.push('Email is required and must be a string');
    } else if (!this.isValidEmail(userData.email)) {
      errors.push('Email must be a valid email address');
    }

    if (userData.age === undefined || userData.age === null) {
      errors.push('Age is required');
    } else if (typeof userData.age !== 'number' || !Number.isInteger(userData.age)) {
      errors.push('Age must be an integer');
    } else if (userData.age < 0 || userData.age > 150) {
      errors.push('Age must be between 0 and 150');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = User;