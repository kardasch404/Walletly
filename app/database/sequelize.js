const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'walletly',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'userpassword123',
  {
    host: process.env.DB_HOST || 'db',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      createdAt: 'created_at',
      updatedAt: false // We don't use updated_at in the schema
    }
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('✓ Sequelize database connection established successfully');
  })
  .catch(err => {
    console.error('✗ Unable to connect to the database:', err);
  });

module.exports = sequelize;
