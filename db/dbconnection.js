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
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    mobile_no: {
        type: Sequelize.STRING
    },
    sim_type: {
        type: Sequelize.STRING
    }
});

/**
 * define the group table
 */
let Group = sequelize.define('groups', {
    group_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group_name: {
        type: Sequelize.STRING
    }
}, {
        name: {
            singular: 'group',
            plural: 'groups',
        }
    });

/**
* define the employeegroup association table
*/
let EmployeeGroup = sequelize.define('employee_group');

/**
 * define the quize table
 */
let Quize = sequelize.define('quize', {
    quize_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quize_code: {
        type: Sequelize.STRING
    },
    quize_name: {
        type: Sequelize.STRING
    }
}, {
        name: {
            singular: 'quize',
            plural: 'quizes',
        }
    });

/**
* define the groupquize association table
*/
let GroupQuize = sequelize.define('group_quize');

/**
 * define the question table
 */
let Question = sequelize.define('question', {
    question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question_descrition: {
        type: Sequelize.STRING
    },
    question_type: {
        type: Sequelize.STRING
    },
    question_correct_answer: {
        type: Sequelize.STRING
    },
    question_answer1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question_answer2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question_answer3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    question_answer4: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
        name: {
            singular: 'question',
            plural: 'questions',
        }
    });

/**
* define the completeQuestion association table
*/
let CompleteQuestion = sequelize.define('complete_question', {
    user_answer: {
        type: Sequelize.STRING
    }
});

/**
 * initializing the relationships between tables
 */
/**
 * employee and group table many to many
 */
Employee.belongsToMany(Group, { as: 'employee', through: EmployeeGroup, foreignKey: 'employee_id', otherKey: 'group_id' });
Group.belongsToMany(Employee, { through: EmployeeGroup, foreignKey: 'group_id', otherKey: 'employee_id' });

/**
 * group and quize table many to many
 */
Group.belongsToMany(Quize, { through: GroupQuize, foreignKey: 'group_id', otherKey: 'quize_id' });
Quize.belongsToMany(Group, { as: 'quizes', through: GroupQuize, foreignKey: 'quize_id', otherKey: 'group_id' });

/**
 * quize and question table one to many
 */
Quize.hasMany(Question, { as: 'quize', foreignKey: 'quize_id' });
Question.belongsTo(Quize, { foreignKey: 'quize_id' });

/**
 * employee and question table many to many
 * this table used to define the employee's answer
 */
Employee.belongsToMany(Quize, { through: CompleteQuestion, foreignKey: 'employee_id', otherKey: 'question_id' });
Question.belongsToMany(Group, { as: 'questions', through: CompleteQuestion, foreignKey: 'question_id', otherKey: 'employee_id' });

/**
 * creating tables
 */
Employee.sync();
Group.sync();
EmployeeGroup.sync();
Quize.sync();
GroupQuize.sync();
Question.sync();
CompleteQuestion.sync();

module.exports = {
    getConnetion: sequelize,
    getEmployee: Employee,
    getGroup: Group,
    getQuize: Quize,
    getQuestion: Question,
    getEmployeeGroup: EmployeeGroup,
    getGroupQuize: GroupQuize,
    getCompleteQuestions: CompleteQuestion
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