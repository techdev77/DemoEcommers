require('dotenv').config();

module.exports.Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3331,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || '',
    DB_DATABASE: process.env.DB_DATABASE || 'test',
    AUTH_SECRET_JWT: process.env.AUTH_SECRET_JWT || "",
    SEND_EMAIL_PASSWORD:process.env.SEND_EMAIL_PASSWORD || "",
    // SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "SENDGRID_API_KEY",
    // SENDGRID_SENDER: process.env.SENDGRID_SENDER || "FROM_EMAIL"
};