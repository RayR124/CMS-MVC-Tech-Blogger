const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        PORT: process.env.PORT || 3001,
    }
);

//const PORT = process.env.PORT || 3001;

module.exports = sequelize;