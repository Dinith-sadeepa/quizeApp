/**
 * requiring sequelize package
 */
const Sequelize = require('sequelize');

const config = require('../config/server.db');

/**
 * initialize the connection
 */
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: config.pool,
    operatorsAliases: config.operatorsAliases
});

/**
 * define the employee table
 */
let Employee = sequelize.define('employee', {
    employee_id: {
        type: Sequelize.STRING
    },
    mobile_no: {
        type: Sequelize.STRING
    },
    sim_type: {
        type: Sequelize.STRING
    }
});

module.exports = {
    getConnetion: sequelize,
    getEmployee: Employee
}

/**
 * checking the connection
 */
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established..');
    })
    .catch(err => {
        console.log('Unable to connect with the database', err);
    });