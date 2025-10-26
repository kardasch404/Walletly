const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const Rapport = sequelize.define('Rapport', {
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
    rapportType: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    rapportData: {
        type: DataTypes.JSON,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    generated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'rapports',
    timestamps: false
});

// Define associations
Rapport.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Rapport;
