const connection = require('../db/dbconnection');
let Employee = connection.getEmployee;

module.exports = {
    addEmployee: function (employee_id, mobile_no, sim_type) {
        return Employee.create({
            employee_id: employee_id,
            mobile_no: mobile_no,
            sim_type: sim_type
        });
    },

    updateEmployee: function (employee_id, mobile_no, sim_type) {
        Employee.find({
            where: { employee_id: employee_id }
        }).on('success', function (employee) {
            if (employee) {
                employee.update({
                    mobile_no: mobile_no,
                    sim_type: sim_type
                }).success(function () { });;
            }
        });
    },

    deleteEmployee: function (employee_id) {
        Employee.destroy({
            where: { employee_id: employee_id }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllEmployees: function () {
        return new Promise(function (resolve, reject) {
            resolve(Employee.findAll());
        });
    },

    searchEmployee: function (employee_id) {
        return new Promise(function (resolve, reject) {
            resolve(Employee.findById(employee_id));
        });
    }
}