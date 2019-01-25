const Sequelize = require('sequelize');

const config = require('./config/server.db');

/**
 * initialize the connection
 */
let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: config.pool,
    operatorsAliases: config.operatorsAliases
});

const Project = sequelize.define('project', {
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    }
});

const User = sequelize.define('user', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    age: {
        type: Sequelize.INTEGER
    }
});

const UserProject = sequelize.define('UserProject',{
    name:{
        type: Sequelize.SMALLINT
    }
});

// Project.associate = function (models) {
    
// };

// User.associate = function (models) {
    
// };
Project.belongsToMany(User, { through: UserProject });
User.belongsToMany(Project, { through: UserProject });


// User.addProject(Project, { role: 'manager', transaction: t });
// Project.create({ id: 11 }).then(function (project) {
//     User.addProjects([project, 12]);
//   });

Project.sync();
User.sync();
UserProject.sync();

const express = require('express');
// const employee = require('./controller/employee.controller');
// const connection = require('./db/dbconnection');
const port = require('./config/server.port');


// User.create({
//     firstname: "Jack",
//     lastname: "Davis",
//     age: 37		
// }).then(jack => {
//         let users = [jack];

//         return User.create({
//             firstname: "Mary",
//             lastname: "Taylor",
//             age: 21
//         }).then(mary => {
//             users.push(mary);
//             return users;
//         })
// }).then(users => {
//     Project.create({
//         code: 'P-123',
//         name: 'JSA - Branding Development'
//     }).then(p123 => {
//         // p123.setWorkers(users);
//     })

//     Project.create({
//         code: 'P-456',
//         name: 'JSA - DataEntry Development'
//     }).then(p456 => {
//         // p456.setWorkers(users);
//     })
// }).then(() => {
//     // res.send("OK");
// });




/**
 * initialize the app
 */
let app = express();

/**
 * initializing the routes
 */
// app.use('/', employee);

// connection.getEmployee.sync().then(() => {
//     return connection.getEmployee.create({
//         employee_id: 10,
//         mobile_no: 6565656,
//         sim_type: 'dialog'
//     });
// });

/**
 * start the server
 */
app.listen(port, () => {
    console.log('server is starting');
});