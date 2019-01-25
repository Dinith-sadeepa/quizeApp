const connection = require('../db/dbconnection');
let EmployeeGroup = connection.getEmployeeGroup;

module.exports = {
    addEmployeeGroup: function (employee_id, group_id) {
        return EmployeeGroup.create({
            employee_id: employee_id,
            group_id: group_id
        });
    },

    updateEmployeeGroup: function (employee_id, group_id) {
        EmployeeGroup.find({
            where: {
                employee_id: employee_id,
                group_id: group_id
            }
        }).on('success', function (employeeGroup) {
            if (employeeGroup) {
                employeeGroup.update({
                    employee_id: employee_id,
                    group_id: group_id
                }).success(function () { });;
            }
        });
    },

    deleteEmployeeGroup: function (employee_id, group_id) {
        EmployeeGroup.destroy({
            where: {
                employee_id: employee_id,
                group_id: group_id
            }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllEmployeesGroup: function () {
        return new Promise(function (resolve, reject) {
            resolve(EmployeeGroup.findAll());
        });
    },

    searchEmployeeGroup: function (employee_id, group_id) {
        return new Promise(function (resolve, reject) {
            resolve(EmployeeGroup.findAll({
                where: {
                    group_id: group_id,
                    employee_id: employee_id
                }
            }));
        });
    }
}