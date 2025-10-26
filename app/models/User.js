const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false
    },
    fname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'fname'
    },
    lname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'lname'
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING(3),
        defaultValue: 'MAD'
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;