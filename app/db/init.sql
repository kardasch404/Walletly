CREATE DATABASE IF NOT EXISTS walletly;

USE walletly;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MAD',
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(255),
    image VARCHAR(1000),
    type VARCHAR(50),
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    category_id VARCHAR(36),
    amount DECIMAL(10, 2),
    description VARCHAR(255),
    type VARCHAR(50),
    transactionDate TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE budgets (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    category_id VARCHAR(36),
    monthlyLimit DECIMAL(10, 2),
    mounth int,
    year int,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

CREATE TABLE SavingsGoals (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(255),
    user_id VARCHAR(36),
    goalAmount DECIMAL(10, 2),
    currentAmount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE Rapports (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    rapportType VARCHAR(50),
    rapportData json,
    startDate TIMESTAMP NULL,
    endDate TIMESTAMP NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);