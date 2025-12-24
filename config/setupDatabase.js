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

async function setupDatabase() {
  const client = new Client(dbConfig);

  try {
    console.log('🔄 Connecting to PostgreSQL...');
    await client.connect();
    console.log('✅ Connected to PostgreSQL!');

    // Drop existing table (optional - comment out if you want to keep existing data)
    console.log('🔄 Dropping existing users table (if exists)...');
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    console.log('✅ Old table dropped');

    // Create users table
    console.log('🔄 Creating users table...');
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
    await client.query(createTableQuery);
    console.log('✅ Users table created successfully!');

    // Insert sample data
    console.log('🔄 Inserting sample data...');
    const insertQuery = `
      INSERT INTO users (name, email, age) VALUES
        ('John Doe', 'john@example.com', 30),
        ('Jane Smith', 'jane@example.com', 25),
        ('Bob Johnson', 'bob@example.com', 35)
      ON CONFLICT (email) DO NOTHING;
    `;
    await client.query(insertQuery);
    console.log('✅ Sample data inserted!');

    // Verify data
    const result = await client.query('SELECT COUNT(*) as count FROM users;');
    console.log(`✅ Total users in database: ${result.rows[0].count}`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Database Information:');
    console.log(`   Database: ${dbConfig.database}`);
    console.log(`   Host: ${dbConfig.host}`);
    console.log(`   Port: ${dbConfig.port}`);
    console.log(`   User: ${dbConfig.user}`);
    console.log('\n✨ You can now start the server with: npm start');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Make sure PostgreSQL is installed and running');
    console.error('   2. Check if database "user-data" exists (create it if not)');
    console.error('   3. Verify credentials in .env file');
    console.error('   4. Check if port 5432 is correct');
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n👋 Database connection closed');
  }
}

// Run the setup
setupDatabase();