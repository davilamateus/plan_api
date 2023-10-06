const Sequelize = require('sequelize');
const connection = require('../../../database/db');
const usersModel = require('../../users');
const financesGoals = require('../goals');

const financesExpense = connection.define('financesExpense', {

    type: {
        type: Sequelize.INTEGER,
        allowNull: false

    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

usersModel.hasMany(financesExpense)
financesExpense.belongsTo(usersModel);
financesGoals.hasMany(financesExpense)
financesExpense.belongsTo(financesGoals);
//financesExpense.sync({ force: true });

module.exports = financesExpense;
