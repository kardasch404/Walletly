const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const SavingGoal = sequelize.define('SavingGoal', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    user_id: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    goalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    currentAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    targetDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING(50),
        defaultValue: 'fa-bullseye'
    },
    status: {
        type: DataTypes.ENUM('active', 'completed', 'cancelled'),
        defaultValue: 'active'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'savingsGoals',
    timestamps: false
});

// Define associations
SavingGoal.belongsTo(User, { foreignKey: 'user_id' });

// Instance methods
SavingGoal.prototype.getProgress = function() {
    if (this.goalAmount === 0) return 0;
    return Math.min(100, (this.currentAmount / this.goalAmount) * 100);
};

SavingGoal.prototype.getRemainingAmount = function() {
    return Math.max(0, this.goalAmount - this.currentAmount);
};

SavingGoal.prototype.isCompleted = function() {
    return this.currentAmount >= this.goalAmount || this.status === 'completed';
};

module.exports = SavingGoal;