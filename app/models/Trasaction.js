const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');
const Category = require('./Category');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    wallet_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'wallets',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'transactions',
    timestamps: false
});

// Define associations
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Transaction;