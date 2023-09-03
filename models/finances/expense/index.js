const Sequelize = require('sequelize');
const connection = require('./../../../database/db');
const usersModel = require('./../../users');
const financesCategories = require('../categories');

const financesExpense = connection.define('financesExpense', {

    type: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    financesHomeCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recurrent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    date: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }


});

financesExpense.belongsTo(usersModel);
financesExpense.belongsTo(financesCategories);
financesCategories.hasMany(financesExpense)
//financesExpense.sync({ force: true });

module.exports = financesExpense;
