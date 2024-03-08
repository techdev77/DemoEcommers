const { Sequelize, DataTypes } = require('sequelize');
const connectDB = require('../connections/database.connection');
const sequelizeInstance = connectDB.getSequelize();

const CategoryModel = sequelizeInstance.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'categories',
    timestamps: false
});

module.exports = CategoryModel;
