const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const Wallet = sequelize.define('Wallet', {
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
    cardNumber: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    mounth: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'wallets',
    timestamps: false
});

// Define associations
Wallet.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Wallet;
