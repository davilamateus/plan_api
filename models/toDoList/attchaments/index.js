const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');
const todolistModel = require('../main/index');

const toDoListAttchaments = connection.define('toDoListAttchaments', {

    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    link: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }


});

toDoListAttchaments.belongsTo(usersModel);
usersModel.hasMany(toDoListAttchaments)
toDoListAttchaments.belongsTo(usersModel);
todolistModel.hasMany(toDoListAttchaments)
toDoListAttchaments.belongsTo(todolistModel);
//toDoListAttchaments.sync({ force: false });

module.exports = toDoListAttchaments;
