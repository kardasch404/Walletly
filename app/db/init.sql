CREATE DATABASE IF NOT EXISTS walletly;
USE walletly;

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(255),
    password VARCHAR(255),
    image VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);