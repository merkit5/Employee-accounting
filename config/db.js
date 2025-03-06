const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('employee_db', 'hr_user', '123', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
