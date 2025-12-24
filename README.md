# User REST API with PostgreSQL Database

A professional REST API built with Node.js, Express, and PostgreSQL for managing User entities with full CRUD operations and persistent data storage.

## 🌟 New Features (v2.0)

- ✅ **PostgreSQL Database Integration** - Data persists across server restarts
- ✅ **SQL Queries** - Direct database operations for Create, Read, Update, Delete
- ✅ **Search Functionality** - Search users by name or email
- ✅ **Automatic Table Creation** - Database schema setup on startup
- ✅ **Sample Data Seeding** - Pre-populated test data
- ✅ **Unique Email Constraint** - Database-level email uniqueness
- ✅ **Timestamps** - Automatic created_at and updated_at fields
- ✅ **Database Connection Pooling** - Efficient connection management

## 📋 Features

- Complete CRUD operations (Create, Read, Update, Delete)
- PostgreSQL database for persistent data storage
- Input validation and sanitization
- Email uniqueness enforcement (database constraint)
- Proper error handling with meaningful messages
- Security headers (Helmet)
- CORS enabled
- Request logging (Morgan)
- RESTful API design
- Professional MVC architecture

## 🗂️ Project Structure

```
user-rest-api/
├── config/
│   ├── database.js           # PostgreSQL connection & config
│   └── setupDatabase.js      # Database setup script
├── controllers/
│   └── userController.js     # Request handlers
├── models/
│   └── User.js               # User model with validation
├── routes/
│   └── userRoutes.js         # API routes
├── services/
│   └── userService.js        # Business logic with SQL queries
├── middleware/
│   └── errorHandler.js       # Error handling middleware
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── package.json              # Dependencies
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
└── README.md                 # This file
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/

2. **PostgreSQL** (v12 or higher)
   - **Windows**: Download from https://www.postgresql.org/download/windows/
   - **macOS**: Use Homebrew: `brew install postgresql`
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`

3. **npm** (comes with Node.js)

## 📥 Installation

### Step 1: Navigate to Project Folder
```bash
cd user-rest-api
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express (web framework)
- pg (PostgreSQL client)
- dotenv (environment variables)
- cors (cross-origin resource sharing)
- helmet (security)
- morgan (logging)
- nodemon (auto-reload for development)

### Step 3: Configure PostgreSQL

#### 3.1 Start PostgreSQL Service

**Windows:**
```bash
# PostgreSQL should start automatically after installation
# If not, start it from Services or use:
net start postgresql-x64-14
```

**macOS:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo service postgresql start
```

#### 3.2 Create Database

Open PostgreSQL command line:

**Windows:**
```bash
# Open SQL Shell (psql) from Start menu
# Or use pgAdmin GUI
```

**macOS/Linux:**
```bash
psql -U postgres
```

Then create the database:
```sql
CREATE DATABASE "user-data";
\q
```

**Using pgAdmin (GUI Method):**
1. Open pgAdmin
2. Right-click "Databases"
3. Click "Create" → "Database"
4. Name: `user-data`
5. Click "Save"

### Step 4: Configure Environment Variables

The `.env` file is already configured with default values:

```env
PORT=3000
NODE_ENV=development

# PostgreSQL Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=user-data
DB_PASSWORD=123456
DB_PORT=5432
```

**⚠️ IMPORTANT:** Update `DB_PASSWORD` if your PostgreSQL password is different!

### Step 5: Setup Database (Create Table & Sample Data)

Run the database setup script:
```bash
npm run setup-db
```

This will:
- Connect to PostgreSQL
- Create the `users` table
- Insert 3 sample users
- Verify the setup

**Expected Output:**
```
🔄 Connecting to PostgreSQL...
✅ Connected to PostgreSQL!
🔄 Creating users table...
✅ Users table created successfully!
🔄 Inserting sample data...
✅ Sample data inserted!
✅ Total users in database: 3
🎉 Database setup completed successfully!
```

### Step 6: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

**Expected Output:**
```
🔄 Initializing database...
✅ PostgreSQL Database Connected Successfully!
📊 Database: user-data
🏠 Host: localhost:5432
✅ Users table ready

╔════════════════════════════════════════════════════╗
║   User REST API with PostgreSQL Started            ║
╠════════════════════════════════════════════════════╣
║  Environment: development                          ║
║  Port: 3000                                        ║
║  Database: PostgreSQL (user-data)                  ║
║  URL: http://localhost:3000                        ║
║  Health: http://localhost:3000/health              ║
║  API: http://localhost:3000/api/users              ║
╚════════════════════════════════════════════════════╝
```

### Step 7: Verify Installation

Open your browser and visit: `http://localhost:3000`

You should see the API welcome message!

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api/users`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/users` | Get all users | - |
| GET | `/api/users/:id` | Get user by ID | - |
| GET | `/api/users/search?q=term` | Search users | - |
| POST | `/api/users` | Create new user | `{ name, email, age }` |
| PUT | `/api/users/:id` | Update user (full) | `{ name, email, age }` |
| PATCH | `/api/users/:id` | Update user (partial) | `{ name?, email?, age? }` |
| DELETE | `/api/users/:id` | Delete user | - |

### Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Object Structure

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "created_at": "2024-01-01T00:00:00.000Z",
  "updated_at": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 API Usage Examples

### 1. Get All Users
```bash
curl http://localhost:3000/api/users
```

**SQL Query Used:**
```sql
SELECT * FROM users ORDER BY id ASC;
```

### 2. Get User by ID
```bash
curl http://localhost:3000/api/users/1
```

**SQL Query Used:**
```sql
SELECT * FROM users WHERE id = $1;
```

### 3. Create New User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Williams",
    "email": "alice@example.com",
    "age": 28
  }'
```

**SQL Query Used:**
```sql
INSERT INTO users (name, email, age)
VALUES ($1, $2, $3)
RETURNING *;
```

### 4. Update User (Full - PUT)
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 31
  }'
```

**SQL Query Used:**
```sql
UPDATE users 
SET name = $1, email = $2, age = $3, updated_at = CURRENT_TIMESTAMP
WHERE id = $4
RETURNING *;
```

### 5. Update User (Partial - PATCH)
```bash
curl -X PATCH http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 32
  }'
```

**SQL Query Used:**
```sql
UPDATE users 
SET age = $1, updated_at = CURRENT_TIMESTAMP
WHERE id = $2
RETURNING *;
```

### 6. Delete User
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

**SQL Query Used:**
```sql
DELETE FROM users WHERE id = $1 RETURNING *;
```

### 7. Search Users
```bash
curl "http://localhost:3000/api/users/search?q=john"
```

**SQL Query Used:**
```sql
SELECT * FROM users 
WHERE name ILIKE $1 OR email ILIKE $1
ORDER BY id ASC;
```

## 🔍 SQL Queries Reference

All SQL queries used in this API:

| Operation | SQL Query |
|-----------|-----------|
| **Create User** | `INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *;` |
| **Get All Users** | `SELECT * FROM users ORDER BY id ASC;` |
| **Get User by ID** | `SELECT * FROM users WHERE id = $1;` |
| **Update User** | `UPDATE users SET name = $1, email = $2, age = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *;` |
| **Delete User** | `DELETE FROM users WHERE id = $1 RETURNING *;` |
| **Search Users** | `SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY id ASC;` |
| **Count Users** | `SELECT COUNT(*) as count FROM users;` |

## 🛡️ Validation Rules

- **Name**: Required, must be non-empty string
- **Email**: Required, valid email format, must be unique (enforced by database)
- **Age**: Required, integer between 0-150

## 🐛 Troubleshooting

### PostgreSQL Connection Issues

**Problem:** "Connection refused" or "could not connect to server"

**Solutions:**
1. Check if PostgreSQL is running:
   ```bash
   # Windows
   net start postgresql-x64-14
   
   # macOS
   brew services list
   
   # Linux
   sudo service postgresql status
   ```

2. Verify credentials in `.env` file
3. Check if database "user-data" exists
4. Ensure port 5432 is not blocked by firewall

### Database Doesn't Exist

**Problem:** `database "user-data" does not exist`

**Solution:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE "user-data";

# Verify
\l

# Exit
\q
```

### Authentication Failed

**Problem:** `password authentication failed for user "postgres"`

**Solution:**
1. Update `DB_PASSWORD` in `.env` file with your PostgreSQL password
2. Or reset PostgreSQL password:
   ```sql
   ALTER USER postgres PASSWORD '123456';
   ```

### Table Already Exists Error

**Solution:**
Run the setup script again:
```bash
npm run setup-db
```

This will drop and recreate the table.

### Port Already in Use

**Problem:** `Port 3000 already in use`

**Solution:**
1. Change PORT in `.env` file, or
2. Kill the process:
   ```bash
   # Find process
   lsof -ti:3000
   
   # Kill it
   lsof -ti:3000 | xargs kill -9
   ```

## 🧪 Testing with Postman

Import the included `User_REST_API.postman_collection.json` file into Postman for quick testing!

See `POSTMAN_TESTING_GUIDE.md` for detailed testing instructions.

## 📊 Database Management

### View Data Using psql
```bash
# Connect to database
psql -U postgres -d user-data

# View all users
SELECT * FROM users;

# Count users
SELECT COUNT(*) FROM users;

# Exit
\q
```

### View Data Using pgAdmin
1. Open pgAdmin
2. Navigate to: Servers → PostgreSQL → Databases → user-data → Schemas → public → Tables → users
3. Right-click on "users" → View/Edit Data → All Rows

### Backup Database
```bash
pg_dump -U postgres user-data > backup.sql
```

### Restore Database
```bash
psql -U postgres user-data < backup.sql
```

## 🚀 Differences from In-Memory Version

| Feature | In-Memory (v1.0) | PostgreSQL (v2.0) |
|---------|------------------|-------------------|
| Data Persistence | ❌ Lost on restart | ✅ Permanent storage |
| Database | JavaScript Map | PostgreSQL |
| Queries | Array methods | SQL queries |
| Email Uniqueness | App-level check | Database constraint |
| Timestamps | JavaScript Date | PostgreSQL TIMESTAMP |
| Search | Not available | ✅ ILIKE search |
| Scalability | Limited | Production-ready |

## 📚 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **morgan** - HTTP request logger

## 🎓 Key Learning Points

This project demonstrates:
- PostgreSQL database integration with Node.js
- SQL query writing (INSERT, SELECT, UPDATE, DELETE)
- Database schema design
- Parameterized queries (SQL injection prevention)
- Database constraints (UNIQUE, CHECK)
- Connection pooling
- Error handling with databases
- Async/await patterns
- RESTful API with persistent storage

## 🔮 Future Enhancements

- [ ] Add user authentication (JWT)
- [ ] Implement pagination
- [ ] Add filtering and sorting options
- [ ] Create database indexes for performance
- [ ] Add connection pooling
- [ ] Implement database migrations
- [ ] Add unit and integration tests
- [ ] Add API rate limiting
- [ ] Generate API documentation (Swagger)
- [ ] Add user roles and permissions

## 📄 License

ISC

## 👨‍💻 Author

Shubhadip Das

---

**Happy Coding with PostgreSQL! 🚀**