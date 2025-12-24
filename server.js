require('dotenv').config();
const app = require('./app');
const { initializeDatabase } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
  try {
    // Connect to database and create table
    console.log('🔄 Initializing database...');
    await initializeDatabase();
    
    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════╗
║   User REST API with PostgreSQL Started            ║
╠════════════════════════════════════════════════════╣
║  Environment: ${process.env.NODE_ENV || 'development'}                          ║
║  Port: ${PORT}                                        ║
║  Database: PostgreSQL (${process.env.DB_NAME || 'user-data'})                  ║
║  URL: http://localhost:${PORT}                        ║
║  Health: http://localhost:${PORT}/health              ║
║  API: http://localhost:${PORT}/api/users              ║
╚════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();