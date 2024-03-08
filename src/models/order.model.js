const { Sequelize, DataTypes } = require('sequelize');
const connectDB = require('../connections/database.connection');
const sequelizeInstance = connectDB.getSequelize();

const OrderModel = sequelizeInstance.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.DOUBLE,
        defaultValue: null
    },
    status: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELED'
    },
    order_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shipping_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    billing_address: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    payment_method: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'CARD, UPI, cash on delivery'
    },
    payment_status: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'PAID, PENDING, FAILED'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = OrderModel;
