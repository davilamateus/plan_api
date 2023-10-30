const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');
const todolistModel = require('../main/index');

const toDoListComments = connection.define('toDoListComments', {

    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }


});

toDoListComments.belongsTo(usersModel);
usersModel.hasMany(toDoListComments)
toDoListComments.belongsTo(usersModel);
todolistModel.hasMany(toDoListComments)
toDoListComments.belongsTo(todolistModel);
//toDoListComments.sync({ force: false });

module.exports = toDoListComments;
