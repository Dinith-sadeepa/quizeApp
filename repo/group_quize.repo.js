const connection = require('../db/dbconnection');
let GroupQuize = connection.getGroupQuize;

module.exports = {
    addGroupQuize: function (group_id, quize_id) {
        return GroupQuize.create({
            quize_id: quize_id,
            group_id: group_id
        });
    },

    updateGroupQuize: function (quize_id, group_id) {
        GroupQuize.find({
            where: {
                quize_id: quize_id,
                group_id: group_id
            }
        }).on('success', function (groupQuize) {
            if (groupQuize) {
                groupQuize.update({
                    quize_id: quize_id,
                    group_id: group_id
                }).success(function () { });;
            }
        });
    },

    deleteGroupQuize: function (quize_id, group_id) {
        GroupQuize.destroy({
            where: {
                quize_id: quize_id,
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

    getAllGroupQuize: function () {
        return new Promise(function (resolve, reject) {
            resolve(GroupQuize.findAll());
        });
    },

    searchGroupQuize: function (quize_id, group_id) {
        return new Promise(function (resolve, reject) {
            resolve(GroupQuize.findAll({
                where: {
                    quize_id: quize_id,
                    group_id: group_id
                }
            }));
        });
    }
}