const connection = require('../db/dbconnection');
let CompleteQuestion = connection.getCompleteQuestions;

module.exports = {
    addEmployeeQuestion: function (employee_id, question_id, user_answer) {
        return CompleteQuestion.create({
            employee_id: employee_id,
            question_id: question_id,
            user_answer: user_answer
        });
    },

    updateEmployeeQuestion: function (employee_id, question_id, user_answer) {
        CompleteQuestion.find({
            where: {
                employee_id: employee_id,
                question_id: question_id
            }
        }).on('success', function (completeQuestion) {
            if (completeQuestion) {
                completeQuestion.update({
                    employee_id: employee_id,
                    question_id: question_id,
                    user_answer: user_answer
                }).success(function () { });;
            }
        });
    },

    deleteEmployeeQuestion: function (employee_id, question_id) {
        CompleteQuestion.destroy({
            where: {
                employee_id: employee_id,
                question_id: question_id
            }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllEmployeeQuestion: function () {
        return new Promise(function (resolve, reject) {
            resolve(CompleteQuestion.findAll());
        });
    },

    searchEmployeeQuestion: function (employee_id, question_id) {
        return new Promise(function (resolve, reject) {
            resolve(CompleteQuestion.findAll({
                where: {
                    employee_id: employee_id,
                    question_id: question_id
                }
            }));
        });
    }
}