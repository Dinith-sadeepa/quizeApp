/**
 * requiring important packages
 */
const express = require('express');
const employee = require('./controller/employee.controller');
const connection = require('./db/dbconnection');
const port = require('./config/server.port');

/**
 * initialize the app
 */
let app = express();

/**
 * initializing the routes
 */
app.use('/', employee);

connection.getEmployee.sync().then(() => {
    return connection.getEmployee.create({
        employee_id: 10,
        mobile_no: 6565656,
        sim_type: 'dialog'
    });
});

/**
 * start the server
 */
app.listen(port, () => {
    console.log('server is starting');
});