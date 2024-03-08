const { Sequelize, DataTypes } = require('sequelize');
const connectDB  = require('../connections/database.connection');
// connectDB.init();
const sequelizeInstance = connectDB.getSequelize();

  
const UserModel =sequelizeInstance.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    auth_type: DataTypes.STRING,
    social_id: DataTypes.STRING,
    auth_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    fcm_token: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },
    contact: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    profile_pic: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    activated: DataTypes.INTEGER,
    deactivation_reason: DataTypes.STRING,
    email_verified: DataTypes.INTEGER,
    otp: DataTypes.STRING,
    time_zone: DataTypes.STRING,
    my_refer_code: DataTypes.STRING,
    referred_by: DataTypes.STRING,
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'users',
    timestamps: false 
});

module.exports = UserModel;
