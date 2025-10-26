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
    type VARCHAR(50),
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallets (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    cardNumber VARCHAR(16),
    amount DECIMAL(10, 2),
    mounth INT,
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE transactions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    category_id VARCHAR(36),
    wallet_id VARCHAR(36),
    amount DECIMAL(10, 2),
    description VARCHAR(255),
    type VARCHAR(50),
    transactionDate TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (wallet_id) REFERENCES wallets (id)
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

CREATE TABLE savingsGoals (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(100),
    description VARCHAR(255),
    user_id VARCHAR(36),
    goalAmount DECIMAL(10, 2),
    currentAmount DECIMAL(10, 2) DEFAULT 0,
    targetDate DATE,
    icon VARCHAR(50) DEFAULT 'fa-bullseye',
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE rapports (
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

-- Insert sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (id, fname, lname, email, password, currency) VALUES
('tjmt5pke1j', 'John', 'Doe', 'john@example.com', '$2b$10$d3NuDyPj2mUGfHs5mVDGhOXrjbfRRcobNQfpiWC1zUugGNshEUHNO', 'USD')
ON DUPLICATE KEY UPDATE id=id;

-- Insert saving goals 
INSERT INTO savingsGoals (id, title, description, user_id, goalAmount, currentAmount, targetDate, icon, status) VALUES
('goal1', 'MacBook Pro', 'Saving for a new MacBook Pro for work', 'tjmt5pke1j', 1650.00, 1650.00, '2025-10-31', 'fa-laptop', 'completed'),
('goal2', 'New Car', 'Down payment for a new car', 'tjmt5pke1j', 60000.00, 27000.00, '2025-06-30', 'fa-car', 'active'),
('goal3', 'New House', 'Down payment for dream house', 'tjmt5pke1j', 150000.00, 18000.00, '2026-12-31', 'fa-home', 'active')
ON DUPLICATE KEY UPDATE id=id;