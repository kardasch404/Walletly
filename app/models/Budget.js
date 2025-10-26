const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');
const Category = require('./Category');

const Budget = sequelize.define('Budget', {
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
    monthlyLimit: {
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
    tableName: 'budgets',
    timestamps: false
});

// Define associations
Budget.belongsTo(User, { foreignKey: 'user_id' });
Budget.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Budget;
