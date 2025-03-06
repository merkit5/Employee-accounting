const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
    },
    employment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    is_employed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Employee;