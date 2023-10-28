const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');

const toDoList = connection.define('toDoList', {


    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    icon: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

toDoList.belongsTo(usersModel);
//toDoList.sync({ force: true });

module.exports = toDoList;
