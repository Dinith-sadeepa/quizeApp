const connection = require('../db/dbconnection');
let Quize = connection.getQuize;

module.exports = {
    addQuize: function (quize_code, quize_name) {
        return Quize.create({
            quize_code: quize_code,
            quize_name: quize_name
        });
    },

    updateQuize: function (quize_code, quize_name) {
        Quize.find({
            where: { quize_code: quize_code }
        }).on('success', function (quize) {
            if (quize) {
                quize.update({
                    quize_code: quize_code,
                    quize_name: quize_name
                }).success(function () { });;
            }
        });
    },

    deleteQuize: function (quize_code) {
        Quize.destroy({
            where: { quize_code: quize_code }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllQuizes: function () {
        return new Promise(function (resolve, reject) {
            resolve(Quize.findAll());
        });
    },

    searchQuize: function (quize_code) {
        return new Promise(function (resolve, reject) {
            resolve(Quize.findById(quize_code));
        });
    }
}