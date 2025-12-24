const { Client } = require('pg');
require('dotenv').config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "user-data",
  password: process.env.DB_PASSWORD || "123456",
  port: process.env.DB_PORT || 5432,
};

// Create a new PostgreSQL client
const db = new Client(dbConfig);

// Connect to the database
const connectDB = async () => {
  try {
    await db.connect();
    console.log('✅ PostgreSQL Database Connected Successfully!');
    console.log(`📊 Database: ${dbConfig.database}`);
    console.log(`🏠 Host: ${dbConfig.host}:${dbConfig.port}`);
    return db;
  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
    console.error('💡 Make sure PostgreSQL is running and credentials are correct');
    process.exit(1);
  }
};

// Create users table if it doesn't exist
const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await db.query(createTableQuery);
    console.log('✅ Users table ready');
  } catch (error) {
    console.error('❌ Error creating users table:', error.message);
    throw error;
  }
};

// Initialize database (connect and create table)
const initializeDatabase = async () => {
  await connectDB();
  await createUsersTable();
};

module.exports = {
  db,
  dbConfig,
  connectDB,
  createUsersTable,
  initializeDatabase
};