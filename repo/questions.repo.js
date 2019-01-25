/**
 * requiring connection
 */
const connection = require('../db/dbconnection');

/**
 * define model 
 */
let Question = connection.getQuestion;

module.exports = {
    addQuestion: function (question_descrition, question_type, question_correct_answer,
        question_answer1, question_answer2, question_answer3, question_answer4) {
        return Question.create({
            question_descrition: question_descrition,
            question_type: question_type,
            question_correct_answer: question_correct_answer,
            question_answer1: question_answer1,
            question_answer2: question_answer2,
            question_answer3: question_answer3,
            question_answer4: question_answer4
        });
    },

    updateQuestion: function (question_id, question_descrition, question_type, question_correct_answer,
        question_answer1, question_answer2, question_answer3, question_answer4) {
        Question.find({
            where: { question_id: question_id }
        }).on('success', function (question) {
            if (question) {
                quize.update({
                    question_descrition: question_descrition,
                    question_type: question_type,
                    question_correct_answer: question_correct_answer,
                    question_answer1: question_answer1,
                    question_answer2: question_answer2,
                    question_answer3: question_answer3,
                    question_answer4: question_answer4
                }).success(function () { });;
            }
        });
    },

    deleteQuestion: function (question_id) {
        Question.destroy({
            where: { question_id: question_id }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllQuestion: function () {
        return new Promise(function (resolve, reject) {
            resolve(Question.findAll());
        });
    },

    searchQuestion: function (question_id) {
        return new Promise(function (resolve, reject) {
            resolve(Question.findById(question_id));
        });
    }
}