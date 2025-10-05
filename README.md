# Walletly
Personal Budget Management Platform

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> Architecture Overview

Walletly is built using a **Model-View-Controller (MVC)** architecture with a **Repository Pattern** for data access and **Service Layer** for business logic.

### Architecture Layers
```
┌─────────────────────────────────────────────────────────────┐
│                        Views (EJS)                          │
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│                      Controllers                            │
│                   Request Handling                          │
├─────────────────────────────────────────────────────────────┤
│                       Services                              │
│                   Business Logic                            │
├─────────────────────────────────────────────────────────────┤
│                    Repositories                             │
│                    Data Access                              │
├─────────────────────────────────────────────────────────────┤
│                      Database                               │
│                   MySQL Storage                             │
└─────────────────────────────────────────────────────────────┘
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3.09 8.26L12 22L20.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Installation
```bash
git clone https://github.com/kardasch404/Walletly
cd Walletly
docker-compose up -d
```

### Access Points
- **Application**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8001

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 19A2 2 0 0 1 20 21H4A2 2 0 0 1 2 19V5A2 2 0 0 1 4 3H9L11 6H20A2 2 0 0 1 22 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> Project Structure

```
Walletly/
├── app/
│   ├── controllers/          
│   │   ├── AuthController.js
│   │   ├── BudgetController.js
│   │   ├── CategoryController.js
│   │   ├── TransactionController.js
│   │   └── WalletController.js
│   ├── services/
│   │   ├── UserService.js
│   │   ├── BudgetService.js
│   │   ├── CategoryService.js
│   │   ├── TransactionService.js
│   │   └── WalletService.js
│   ├── repositories/         
│   │   ├── UserRepository.js
│   │   ├── BudgetRepository.js
│   │   ├── CategoryRepository.js
│   │   ├── TransactionRepository.js
│   │   └── WalletRepository.js
│   ├── http/requests/        
│   │   ├── LoginRequest.js
│   │   ├── RegisterRequest.js
│   │   ├── CategoryStoreRequest.js
│   │   ├── BudgetStoreRequest.js
│   │   ├── BudgetUpdateRequest.js
│   │   ├── CategoryUpdaterequest.js
│   │   ├── TransactionStoreRequest.js
│   │   ├── WalletStoreRequest.js
│   │   ├── userUpdateRequest.js
│   │   ├── UserPhotoUpdateRequest.js
│   │   └── UserUpdatePasswordRequest.js
│   ├── models/               
│   │   ├── User.js
│   │   ├── Category.js
│   │   ├── Budget.js
│   │   ├── Transaction.js
│   │   └── SavingGoal.js
│   ├── views/                
│   │   ├── dashboard/
│   │   │   ├── layouts/
│   │   │   │   └── main.ejs
│   │   │   ├── pages/        
│   │   │   │   ├── index.ejs
│   │   │   │   ├── transactions.ejs
│   │   │   │   ├── budget.ejs
│   │   │   │   ├── categories.ejs
│   │   │   │   ├── wallet.ejs
│   │   │   │   ├── analytics.ejs
│   │   │   │   ├── goals.ejs
│   │   │   │   └── settings.ejs
│   │   │   ├── partials/
│   │   │   │   ├── header.ejs
│   │   │   │   ├── sidebar.ejs
│   │   │   │   ├── modals.ejs
│   │   │   │   ├── scripts.ejs
│   │   │   │   └── styles.ejs
│   │   │   └── components/   
│   │   │       ├── metrics-grid.ejs
│   │   │       ├── charts-section.ejs
│   │   │       └── recent-transactions.ejs
│   │   ├── pages/            
│   │   │   ├── home.ejs
│   │   │   ├── about.ejs
│   │   │   ├── features.ejs
│   │   │   └── contact.ejs
│   │   ├── components/       
│   │   │   ├── navbar.ejs
│   │   │   ├── hero.ejs
│   │   │   ├── footer.ejs
│   │   │   ├── about.ejs
│   │   │   └── features.ejs
│   │   ├── layouts/          
│   │   ├── partials/         
│   │   ├── documentation/
│   │   ├── support/          
│   │   ├── login.ejs         
│   │   ├── register.ejs
│   │   └── index.ejs         
│   ├── routes/               
│   │   ├── index.js          
│   │   ├── users.js
│   │   ├── categories.js
│   │   ├── budgets.js
│   │   └── transactions.js
│   ├── database/             
│   │   └── mysql.js
│   ├── db/                   
│   │   └── init.sql
│   └── middleware/           
│       └── App.js
├── public/                   
│   ├── css/
│   │   └── style.css
│   ├── javascripts/
│   │   └── main.js
│   └── uploads/
├── bin/
│   └── www
├── .env                      
├── docker-compose.yml        
├── Dockerfile               
├── package.json             
└── README.md
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3A1 1 0 0 0 13 5H9A1 1 0 0 0 7.3 6.3L4.3 9.3A1 1 0 0 0 4 10V20A1 1 0 0 0 5 21H19A1 1 0 0 0 20 20V10A1 1 0 0 0 19.7 9.3L16.7 6.3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 21V12H15V21" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> Technology Stack

### Backend
- **Node.js** 
- **Express.js** 
- **MySQL** 
- **EJS** 

### Security & Validation
- **bcrypt** 
- **Joi** 
- **express-session** 

### File Handling & Utilities
- **multer** 
- **uuid** 
- **dotenv** 
- **cookie-parser** 
- **morgan** 
- **debug** 

### Development
- **Docker** 
- **phpMyAdmin** 

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="2"/><path d="M21 12C21 13.66 16.97 15 12 15S3 13.66 3 12" stroke="currentColor" stroke-width="2"/><path d="M3 5V19C3 20.66 7.03 22 12 22S21 20.66 21 19V5" stroke="currentColor" stroke-width="2"/></svg> Database Schema

### Core Tables
- **users** 
- **categories** 
- **budgets** 
- **transactions** 
- **wallets** 


## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" stroke="currentColor" stroke-width="2"/></svg> Core Features

### Authentication
- User registration and login
- Password hashing with bcrypt
- Session management
- Profile management with photo upload
- Password change functionality

### Financial Management
- **Categories**: Organize transactions
- **Budgets**: Set monthly spending limits
- **Transactions**: Track income and expenses
- **Wallets**: Manage payment methods
- **Dashboard**: Real-time financial overview

### Data Validation
- Server-side validation using Joi
- Input sanitization
- Error handling

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7 6.3A1 1 0 0 0 13 5H9A1 1 0 0 0 7.3 6.3L4.3 9.3A1 1 0 0 0 4 10V20A1 1 0 0 0 5 21H19A1 1 0 0 0 20 20V10A1 1 0 0 0 19.7 9.3L16.7 6.3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="16" r="1" fill="currentColor"/><path d="M12 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Development Setup

### Environment Variables
```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=walletly
SESSION_SECRET=your-secret-key 
```

### Docker Services
- **db** 
- **www**
- **phpmyadmin**

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9L12 6L16 10L21 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Project Management

- **Repository**: [GitHub](https://github.com/kardasch404/Walletly)
- **Project Board**: [Jira Sprint Board](https://kardasch.atlassian.net/jira/software/projects/WAL/boards/34?sprintStarted=true)
- **UML Design**: [Lucidchart Diagram](https://lucid.app/lucidchart/81f39136-b146-4191-9827-fefd6cdf1082/edit?viewport_loc=-2248%2C-982%2C3043%2C1440%2C0_0)

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2L3 6V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V6L18 2H6Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M3 6H21" stroke="currentColor" stroke-width="2"/><path d="M16 10A4 4 0 0 1 8 10" stroke="currentColor" stroke-width="2"/></svg> Design Patterns

### Repository Pattern
Separates data access logic from business logic
```javascript
class TransactionRepository {
    async create(data) { /* SQL operations */ }
    async getAllByUserId(userId) { /* SQL operations */ }
}
```

### Service Layer Pattern
Encapsulates business logic
```javascript
class TransactionService {
    async create(data, userId) { /* Business logic */ }
    async getTotalIncome(userId) { /* Calculations */ }
}
```

### MVC Pattern
- **Models** 
- **Views**
- **Controllers**

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22S8 18 8 12V7L12 5L16 7V12C16 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg> Security Features

- **Password Security**: bcrypt hashing with 16 salt rounds
- **Authentication**: Express session-based authentication
- **Input Validation**: Comprehensive Joi validation schemas
- **Database Security**: Parameterized queries preventing SQL injection
- **File Upload Security**: Multer with file type and size restrictions
- **Session Management**: Secure session handling with express-session
- **CSRF Protection**: Session-based CSRF protection

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" stroke-width="2"/><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> User Interface

- **Responsive Design**: Custom Tailwind CSS implementation
- **Modular Architecture**: 
  - Reusable EJS components and partials
  - Separate dashboard and public page layouts
  - Component-based UI structure
- **Dashboard Features**:
  - Real-time financial metrics
  - Interactive transaction management
  - Dynamic budget tracking
  - Wallet management with card visualization
- **Forms & Validation**: 
  - Client-side and server-side validation
  - Modal-based forms for CRUD operations
- **Navigation**: 
  - Dynamic sidebar with active page states
  - Responsive header and navigation components

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Deployment

The application is containerized using Docker for easy deployment:

```bash
# Development
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

## <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Future Enhancements


---

**Developed by**: [kardasch404](https://github.com/kardasch404)  
**License**: Private  
**Version**: 1.0.0