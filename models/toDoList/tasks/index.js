const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');
const todolistModel = require('./../main/index');

const toDoListTasks = connection.define('toDoListTasks', {

    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    status: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }


});

toDoListTasks.belongsTo(usersModel);
usersModel.hasMany(toDoListTasks)
toDoListTasks.belongsTo(usersModel);
todolistModel.hasMany(toDoListTasks)
toDoListTasks.belongsTo(todolistModel);
//toDoListTasks.sync({ force: false });

module.exports = toDoListTasks;
