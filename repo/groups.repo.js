const connection = require('../db/dbconnection');
let Group = connection.getGroup;

module.exports = {
    addGroup: function (group_name) {
        return Group.create({
            group_name: group_name
        });
    },

    updateGroup: function (group_id, group_name) {
        Group.find({
            where: { group_id: group_id }
        }).on('success', function (group) {
            if (group) {
                group.update({
                    group_name: group_name
                }).success(function () { });;
            }
        });
    },

    deleteGroup: function (group_id) {
        Group.destroy({
            where: { group_id: group_id }
        }).then(function (deleted) {
            if (deleted === 1) {
                return true;
            } else {
                return false;
            }
        });
    },

    getAllGroup: function () {
        return new Promise(function (resolve, reject) {
            resolve(Group.findAll());
        });
    },

    searchGroup: function (group_id) {
        return new Promise(function (resolve, reject) {
            resolve(Group.findById(group_id));
        });
    }
}