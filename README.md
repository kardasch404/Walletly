<div align="center">

# 💰 Walletly

### Modern Personal Budget Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7-orange.svg)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7.svg)](https://sequelize.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Documentation](#-api-documentation)
- [Security](#-security)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Walletly is a comprehensive personal finance management platform built with modern web technologies. It provides users with powerful tools to track expenses, manage budgets, analyze spending patterns, and achieve financial goals.

### Key Highlights

- 🏗️ **Clean Architecture**: MVC pattern with Repository & Service layers
- 🔐 **Secure**: bcrypt password hashing, session management, input validation
- 📊 **Analytics**: Real-time financial insights and spending analytics
- 🎯 **Goal Tracking**: Set and monitor savings goals
- 📱 **Responsive**: Modern UI built with Tailwind CSS
- 🐳 **Docker Ready**: Containerized for easy deployment
- 🔄 **ORM**: Full Sequelize implementation for database operations

---

## ✨ Features

---

## ✨ Features

### 👤 User Management
- **Authentication**: Secure registration and login system
- **Profile Management**: Update personal information and profile photos
- **Password Security**: Change password with validation
- **Session Management**: Persistent login sessions

### 💳 Financial Operations
- **Transaction Tracking**: Record income and expenses with categories
- **Budget Management**: Set monthly spending limits per category
- **Wallet System**: Manage multiple payment methods and cards
- **Category Organization**: Custom categories for transaction classification

### 📊 Analytics & Insights
- **Real-time Dashboard**: Overview of financial status
- **Spending Analysis**: Visualize spending patterns by category
- **Monthly Reports**: Track income vs expenses over time
- **Financial Score**: AI-powered financial health scoring
- **Trend Analysis**: Identify spending trends and patterns

### 🎯 Goal Management
- **Savings Goals**: Set and track financial goals
- **Progress Monitoring**: Visual progress indicators
- **Goal Completion**: Automatic status updates
- **Multiple Goals**: Manage several goals simultaneously

### 🔍 Advanced Features
- **AJAX Search**: Real-time transaction filtering
- **Date Filtering**: Filter by custom date ranges
- **Export Data**: Download financial reports
- **Responsive Design**: Works on all devices

---

## 🛠️ Technology Stack

### Backend Technologies
```
Node.js 20.x        → JavaScript runtime
Express.js 4.x      → Web application framework
Sequelize 6.x       → ORM for database operations
MySQL 5.7           → Relational database
EJS                 → Server-side templating
```

### Security & Validation
```
bcrypt              → Password hashing
Joi                 → Schema validation
express-session     → Session management
express-validator   → Input validation
helmet              → Security headers
```

### Development Tools
```
Docker              → Containerization
Docker Compose      → Multi-container orchestration
phpMyAdmin          → Database administration
Morgan              → HTTP request logger
Nodemon             → Auto-restart on changes
```

### Frontend
```
Tailwind CSS        → Utility-first CSS framework
Chart.js            → Data visualization
FontAwesome         → Icon library
Vanilla JavaScript  → Client-side interactions
```

---

## 🏗️ Architecture
---

## 🏗️ Architecture

Walletly follows a **layered architecture** pattern ensuring separation of concerns, maintainability, and scalability.

### Architecture Diagram

```
┌───────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                              │
│                    (Browser / HTTP Client)                         │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │    ROUTES LAYER       │
                    │  (Express Routing)    │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   MIDDLEWARE LAYER    │
                    │ (Auth, Validation)    │
                    └───────────┬───────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                       CONTROLLER LAYER                             │
│              (Request Handling & Response)                         │
│  AuthController │ TransactionController │ BudgetController         │
└───────────────────────────────┬───────────────────────────────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                        SERVICE LAYER                               │
│                     (Business Logic)                               │
│   UserService │ TransactionService │ BudgetService │ ...           │
└───────────────────────────────┬───────────────────────────────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                      REPOSITORY LAYER                              │
│                  (Data Access & ORM)                               │
│  UserRepository │ TransactionRepository │ BudgetRepository         │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │     ORM LAYER         │
                    │    (Sequelize)        │
                    └───────────┬───────────┘
                                │
┌───────────────────────────────▼───────────────────────────────────┐
│                       DATABASE LAYER                               │
│                      (MySQL 5.7)                                   │
└───────────────────────────────────────────────────────────────────┘
```

### Design Patterns

#### 1. **MVC Pattern**
```javascript
// Model - Data structure
const User = sequelize.define('User', { ... });

// View - EJS Templates
<!-- dashboard/pages/index.ejs -->

// Controller - Request handling
class AuthController {
    async login(req, res) { ... }
}
```

#### 2. **Repository Pattern**
```javascript
class TransactionRepository {
    async create(data) {
        return await Transaction.create(data);
    }
    
    async findByUserId(userId) {
        return await Transaction.findAll({
            where: { user_id: userId }
        });
    }
}
```

#### 3. **Service Layer Pattern**
```javascript
class TransactionService {
    constructor() {
        this.repository = new TransactionRepository();
    }
    
    async createTransaction(data, userId) {
        // Business logic
        const validation = this.validate(data);
        if (!validation.success) throw new Error();
        
        // Data access through repository
        return await this.repository.create({ ...data, user_id: userId });
    }
}
```

#### 4. **Dependency Injection**
```javascript
class TransactionController {
    constructor() {
        this.service = new TransactionService();
    }
    
    async store(req, res) {
        const result = await this.service.createTransaction(
            req.body, 
            req.session.userId
        );
    }
}
```

---

## 🚀 Quick Start

### Prerequisites
- **Docker** >= 20.10
- **Docker Compose** >= 2.0
- **Git**

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/kardasch404/Walletly.git
cd Walletly
```

2. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start with Docker Compose**
```bash
docker-compose up --build -d
```

4. **Access the application**
- Application: http://localhost:8080
- phpMyAdmin: http://localhost:8001
- Database: localhost:3308

5. **Create first user**
- Navigate to http://localhost:8080/register
- Fill in registration form
- Login and start managing finances

### Manual Installation (Without Docker)

```bash
# Install dependencies
npm install --legacy-peer-deps

# Configure database
mysql -u root -p < app/db/init.sql

# Start application
npm start
```

---

## 📁 Project Structure

---

## 📁 Project Structure

```
Walletly/
│
├── 📂 app/                          # Application core
│   │
│   ├── 📂 controllers/              # HTTP request handlers
│   │   ├── AuthController.js        # Authentication logic
│   │   ├── TransactionController.js # Transaction management
│   │   ├── BudgetController.js      # Budget operations
│   │   ├── CategoryController.js    # Category CRUD
│   │   └── WalletController.js      # Wallet management
│   │
│   ├── 📂 services/                 # Business logic layer
│   │   ├── UserService.js           # User operations
│   │   ├── TransactionService.js    # Transaction business logic
│   │   ├── BudgetService.js         # Budget calculations
│   │   ├── CategoryService.js       # Category management
│   │   └── WalletService.js         # Wallet operations
│   │
│   ├── 📂 repositories/             # Data access layer (ORM)
│   │   ├── UserRepository.js        # User database operations
│   │   ├── TransactionRepository.js # Transaction queries
│   │   ├── BudgetRepository.js      # Budget data access
│   │   ├── CategoryRepository.js    # Category queries
│   │   ├── WalletRepository.js      # Wallet data access
│   │   └── SavingGoalRepository.js  # Goals data access
│   │
│   ├── 📂 models/                   # Sequelize models
│   │   ├── User.js                  # User model
│   │   ├── Transaction.js           # Transaction model
│   │   ├── Budget.js                # Budget model
│   │   ├── Category.js              # Category model
│   │   ├── Wallet.js                # Wallet model
│   │   ├── SavingGoal.js           # Savings goal model
│   │   └── Rappot.js               # Report model
│   │
│   ├── 📂 http/                     # HTTP layer
│   │   └── 📂 requests/             # Validation schemas
│   │       ├── LoginRequest.js
│   │       ├── RegisterRequest.js
│   │       ├── TransactionStoreRequest.js
│   │       ├── BudgetStoreRequest.js
│   │       └── ...
│   │
│   ├── 📂 views/                    # EJS templates
│   │   ├── 📂 dashboard/            # Authenticated views
│   │   │   ├── 📂 layouts/
│   │   │   │   └── main.ejs         # Main dashboard layout
│   │   │   ├── 📂 pages/
│   │   │   │   ├── index.ejs        # Dashboard home
│   │   │   │   ├── transactions.ejs # Transaction list
│   │   │   │   ├── budget.ejs       # Budget management
│   │   │   │   ├── categories.ejs   # Categories page
│   │   │   │   ├── wallet.ejs       # Wallet management
│   │   │   │   ├── analytics.ejs    # Financial analytics
│   │   │   │   ├── goals.ejs        # Savings goals
│   │   │   │   └── settings.ejs     # User settings
│   │   │   ├── 📂 partials/
│   │   │   │   ├── header.ejs       # Dashboard header
│   │   │   │   ├── sidebar.ejs      # Navigation sidebar
│   │   │   │   ├── modals.ejs       # Modal components
│   │   │   │   ├── scripts.ejs      # JavaScript imports
│   │   │   │   └── styles.ejs       # CSS imports
│   │   │   └── 📂 components/
│   │   │       ├── metrics-grid.ejs
│   │   │       ├── charts-section.ejs
│   │   │       └── recent-transactions.ejs
│   │   │
│   │   ├── 📂 pages/                # Public pages
│   │   │   ├── home.ejs
│   │   │   ├── about.ejs
│   │   │   ├── features.ejs
│   │   │   └── contact.ejs
│   │   │
│   │   ├── 📂 components/           # Shared components
│   │   ├── 📂 layouts/              # Page layouts
│   │   ├── login.ejs                # Login page
│   │   ├── register.ejs             # Registration page
│   │   └── index.ejs                # Landing page
│   │
│   ├── 📂 routes/                   # Express routes
│   │   ├── index.js                 # Main routes
│   │   ├── users.js                 # User routes
│   │   ├── categories.js            # Category routes
│   │   ├── budgets.js               # Budget routes
│   │   ├── transactions.js          # Transaction routes
│   │   └── savinggoals.js          # Goals routes
│   │
│   ├── 📂 database/                 # Database configuration
│   │   ├── mysql.js                 # MySQL connection
│   │   └── sequelize.js            # Sequelize ORM setup
│   │
│   ├── 📂 db/                       # Database scripts
│   │   └── init.sql                 # Database initialization
│   │
│   └── 📂 middleware/               # Express middleware
│       └── App.js                   # Application middleware
│
├── 📂 public/                       # Static assets
│   ├── 📂 css/
│   │   └── style.css                # Custom styles
│   ├── 📂 javascripts/
│   │   └── main.js                  # Client-side JS
│   └── 📂 uploads/                  # User uploads
│
├── 📂 bin/
│   └── www                          # Application entry point
│
├── 🐳 docker-compose.yml            # Docker services
├── 🐳 Dockerfile                    # Container definition
├── 📦 package.json                  # Dependencies
├── 🔐 .env                          # Environment variables
└── 📖 README.md                     # Documentation
```

---

## 🗄️ Database Schema 


---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│     users       │         │   categories    │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │◄───┐    │ id (PK)         │
│ fname           │    │    │ name            │
│ lname           │    │    │ description     │
│ email           │    │    │ type            │
│ password        │    │    │ user_id (FK) ───┼──┐
│ photo           │    │    │ created_at      │  │
│ created_at      │    │    └─────────────────┘  │
└─────────────────┘    │                         │
         │             │    ┌─────────────────┐  │
         │             │    │   budgets       │  │
         │             │    ├─────────────────┤  │
         │             ├────┤ id (PK)         │  │
         │             │    │ user_id (FK)    │  │
         │             │    │ category_id (FK)├──┘
         │             │    │ monthlyLimit    │
         │             │    │ mounth          │
         │             │    │ year            │
         │             │    │ created_at      │
         │             │    └─────────────────┘
         │             │
         │             │    ┌─────────────────┐
         │             │    │  transactions   │
         │             │    ├─────────────────┤
         │             ├────┤ id (PK)         │
         │             │    │ user_id (FK)    │
         │             │    │ category_id (FK)├──┐
         │             │    │ wallet_id (FK)  │  │
         │             │    │ amount          │  │
         │             │    │ description     │  │
         │             │    │ type            │  │
         │             │    │ transactionDate │  │
         │             │    │ created_at      │  │
         │             │    └─────────────────┘  │
         │             │                         │
         │             │    ┌─────────────────┐  │
         │             │    │    wallets      │  │
         │             │    ├─────────────────┤  │
         │             ├────┤ id (PK)         │  │
         │             │    │ user_id (FK)    │  │
         │             │    │ cardNumber      │◄─┘
         │             │    │ amount          │
         │             │    │ mounth          │
         │             │    │ year            │
         │             │    │ created_at      │
         │             │    └─────────────────┘
         │             │
         │             │    ┌─────────────────┐
         │             │    │  saving_goals   │
         │             │    ├─────────────────┤
         │             └────┤ id (PK)         │
                           │ user_id (FK)    │
                           │ title           │
                           │ description     │
                           │ goalAmount      │
                           │ currentAmount   │
                           │ targetDate      │
                           │ status          │
                           │ icon            │
                           │ created_at      │
                           └─────────────────┘
```

### Table Details

#### `users`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| fname | VARCHAR(50) | First name |
| lname | VARCHAR(50) | Last name |
| email | VARCHAR(100) | Unique email |
| password | VARCHAR(255) | Hashed password |
| photo | VARCHAR(255) | Profile photo path |
| created_at | TIMESTAMP | Account creation |

#### `categories`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| name | VARCHAR(100) | Category name |
| description | TEXT | Category description |
| type | ENUM | 'income' or 'expense' |
| user_id | VARCHAR(36) | Foreign key to users |
| created_at | TIMESTAMP | Creation timestamp |

#### `transactions`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| user_id | VARCHAR(36) | Foreign key to users |
| category_id | VARCHAR(36) | Foreign key to categories |
| wallet_id | VARCHAR(36) | Foreign key to wallets |
| amount | DECIMAL(10,2) | Transaction amount |
| description | TEXT | Transaction note |
| type | ENUM | 'income' or 'expense' |
| transactionDate | DATE | Transaction date |
| created_at | TIMESTAMP | Record creation |

#### `budgets`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| user_id | VARCHAR(36) | Foreign key to users |
| category_id | VARCHAR(36) | Foreign key to categories |
| monthlyLimit | DECIMAL(10,2) | Budget limit |
| mounth | INT | Month (1-12) |
| year | INT | Year |
| created_at | TIMESTAMP | Creation timestamp |

#### `wallets`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| user_id | VARCHAR(36) | Foreign key to users |
| cardNumber | VARCHAR(16) | Card number |
| amount | DECIMAL(10,2) | Wallet balance |
| mounth | INT | Card expiry month |
| year | INT | Card expiry year |
| created_at | TIMESTAMP | Creation timestamp |

#### `saving_goals`
| Column | Type | Description |
|--------|------|-------------|
| id | VARCHAR(36) | Primary key (UUID) |
| user_id | VARCHAR(36) | Foreign key to users |
| title | VARCHAR(255) | Goal title |
| description | TEXT | Goal description |
| goalAmount | DECIMAL(10,2) | Target amount |
| currentAmount | DECIMAL(10,2) | Current savings |
| targetDate | DATE | Goal deadline |
| status | ENUM | 'active', 'completed', 'cancelled' |
| icon | VARCHAR(50) | FontAwesome icon |
| created_at | TIMESTAMP | Creation timestamp |

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/x-www-form-urlencoded

fname=John&lname=Doe&email=john@example.com&password=securePass123
```

#### Login
```http
POST /login
Content-Type: application/x-www-form-urlencoded

email=john@example.com&password=securePass123
```

#### Logout
```http
POST /logout
```

### Transaction Endpoints

#### Create Transaction
```http
POST /api/transactions
Content-Type: application/json
Cookie: sessionId=xxx

{
  "amount": 100.50,
  "description": "Grocery shopping",
  "type": "expense",
  "category_id": "uuid-here",
  "transactionDate": "2025-10-26"
}
```

#### Get All Transactions
```http
GET /api/transactions
Cookie: sessionId=xxx
```

#### Search & Filter Transactions (AJAX)
```http
GET /api/transactions/search?term=grocery&type=expense
Cookie: sessionId=xxx
```

### Budget Endpoints

#### Create Budget
```http
POST /api/budgets
Content-Type: application/json
Cookie: sessionId=xxx

{
  "category_id": "uuid-here",
  "monthlyLimit": 500.00,
  "mounth": 10,
  "year": 2025
}
```

#### Get User Budgets
```http
GET /api/budgets
Cookie: sessionId=xxx
```

### Category Endpoints

#### Create Category
```http
POST /api/categories
Content-Type: application/json
Cookie: sessionId=xxx

{
  "name": "Groceries",
  "description": "Food and household items",
  "type": "expense"
}
```

#### Get Categories
```http
GET /api/categories
Cookie: sessionId=xxx
```

### Savings Goals Endpoints

#### Create Goal
```http
POST /api/goals
Content-Type: application/json
Cookie: sessionId=xxx

{
  "title": "Emergency Fund",
  "description": "6 months expenses",
  "goalAmount": 10000.00,
  "targetDate": "2026-12-31",
  "icon": "fa-piggy-bank"
}
```

#### Add Funds to Goal
```http
PUT /api/goals/:id/add-funds
Content-Type: application/json
Cookie: sessionId=xxx

{
  "amount": 500.00
}
```

#### Get All Goals
```http
GET /api/goals
Cookie: sessionId=xxx
```

---

## 🔐 Security

### Implementation Details

#### Password Security
```javascript
// Hashing with bcrypt (16 salt rounds)
const hashedPassword = await bcrypt.hash(password, 16);

// Verification
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

#### Session Management
```javascript
// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
```

#### Input Validation
```javascript
// Joi validation schema
const transactionSchema = Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().max(500).required(),
    type: Joi.string().valid('income', 'expense').required(),
    category_id: Joi.string().uuid().required(),
    transactionDate: Joi.date().required()
});
```

#### SQL Injection Prevention
```javascript
// Sequelize parameterized queries
const transactions = await Transaction.findAll({
    where: { 
        user_id: userId,
        type: 'expense'
    }
});
// No raw SQL - fully protected by ORM
```

#### File Upload Security
```javascript
// Multer configuration
const upload = multer({
    dest: 'public/uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif/;
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.test(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});
```

### Security Best Practices

✅ **Password Hashing**: bcrypt with 16 salt rounds  
✅ **Session Security**: HttpOnly cookies, secure flags  
✅ **Input Validation**: Joi schemas for all inputs  
✅ **SQL Injection**: Sequelize ORM (no raw SQL)  
✅ **XSS Protection**: EJS auto-escaping  
✅ **CSRF Protection**: Session-based tokens  
✅ **File Upload**: Type and size validation  
✅ **Environment Variables**: Sensitive data in .env  

---

## 💻 Development

### Local Development Setup

1. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

2. **Configure database**
```bash
# Create .env file
cp .env.example .env

# Edit .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=walletly
SESSION_SECRET=your-secret-key
```

3. **Initialize database**
```bash
mysql -u root -p < app/db/init.sql
```

4. **Start development server**
```bash
npm run dev  # With nodemon
# or
npm start    # Standard
```

### Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f www

# Restart specific service
docker-compose restart www

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d
```

### Database Management

```bash
# Access MySQL container
docker exec -it walletly-db-1 mysql -u user -p

# Backup database
docker exec walletly-db-1 mysqldump -u user -ppassword walletly > backup.sql

# Restore database
docker exec -i walletly-db-1 mysql -u user -ppassword walletly < backup.sql
```

### Code Structure Guidelines

#### Repository Pattern
```javascript
// ✅ Good - Uses Sequelize ORM
class UserRepository {
    async findById(id) {
        return await User.findByPk(id);
    }
}

// ❌ Avoid - Raw SQL
class UserRepository {
    async findById(id) {
        return await db.query('SELECT * FROM users WHERE id = ?', [id]);
    }
}
```

#### Service Layer
```javascript
// ✅ Good - Business logic in service
class TransactionService {
    async createTransaction(data, userId) {
        // Validation
        const validated = this.validate(data);
        
        // Business logic
        if (data.type === 'expense' && data.amount > 10000) {
            throw new Error('Large expense requires approval');
        }
        
        // Data access
        return await this.repository.create({ ...data, user_id: userId });
    }
}
```

---

## 🚀 Deployment

### Docker Production Deployment

1. **Build production image**
```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Start services**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Environment configuration**
```env
# Production .env
NODE_ENV=production
DB_HOST=production-db-host
DB_USER=prod_user
DB_PASSWORD=strong-password
SESSION_SECRET=random-secure-string
```

### Manual Deployment

1. **Server requirements**
   - Node.js 20.x
   - MySQL 5.7+
   - Nginx (recommended)
   - SSL certificate

2. **Install dependencies**
```bash
npm install --production --legacy-peer-deps
```

3. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Start with PM2**
```bash
npm install -g pm2
pm2 start bin/www --name walletly
pm2 save
pm2 startup
```

### Environment-Specific Configuration

| Variable | Development | Production |
|----------|-------------|------------|
| NODE_ENV | development | production |
| DB_HOST | localhost | prod-db-host |
| SESSION_SECURE | false | true |
| LOG_LEVEL | debug | error |

---

## 🤝 Contributing

### Git Workflow

1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit**
```bash
git add .
git commit -m "feat: add new feature description"
```

3. **Push to repository**
```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request**

### Commit Message Convention

```
<type>: <description>

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add transaction filtering by date range"
git commit -m "fix: resolve budget calculation error"
git commit -m "docs: update API documentation"
```

### Code Style

- Use **2 spaces** for indentation
- Follow **ES6+** syntax
- Use **async/await** over callbacks
- Add **JSDoc comments** for functions
- Keep **functions small** and focused
- Use **meaningful variable names**

---

## 📊 Project Management

### Resources

- **GitHub Repository**: [https://github.com/kardasch404/Walletly](https://github.com/kardasch404/Walletly)
- **Jira Board**: [Sprint Board](https://kardasch.atlassian.net/jira/software/projects/WAL/boards/34)
- **UML Diagram**: [Lucidchart](https://lucid.app/lucidchart/81f39136-b146-4191-9827-fefd6cdf1082/edit)

### Development Workflow

1. **Sprint Planning** → Define features
2. **Design** → UML diagrams
3. **Development** → Feature branches
4. **Testing** → Manual testing
5. **Review** → Code review
6. **Deploy** → Docker deployment

---

## 📄 License

This project is **private** and proprietary.  
© 2025 [kardasch404](https://github.com/kardasch404). All rights reserved.

---

## 👥 Authors & Contributors

**Lead Developer**: [kardasch404](https://github.com/kardasch404)

---

## 🎯 Roadmap

### Version 1.1 (Planned)
- [ ] Mobile application (React Native)
- [ ] Receipt scanning with OCR
- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Budget alerts and notifications

### Version 1.2 (Future)
- [ ] Bank account integration
- [ ] Investment tracking
- [ ] Tax report generation
- [ ] Collaborative budgets
- [ ] API for third-party integrations

---

<div align="center">

### 💰 Walletly - Smart Financial Management

**Built with ❤️ using Node.js, Express, MySQL & Sequelize**

[⬆ Back to Top](#-walletly)

</div>